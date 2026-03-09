from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import Category, Expense
from .serializers import UserSerializer, RegisterSerializer, CategorySerializer, ExpenseSerializer
from django.db.models import Sum
from datetime import datetime

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        expenses = Expense.objects.filter(user=user)
        total_expenses = expenses.aggregate(Sum('amount'))['amount__sum'] or 0
        
        current_month = datetime.now().month
        current_year = datetime.now().year
        current_month_expenses = expenses.filter(date__year=current_year, date__month=current_month).aggregate(Sum('amount'))['amount__sum'] or 0
        
        # categories for chart
        categories = expenses.values('category__name').annotate(total=Sum('amount')).order_by('-total')
        category_data = [
            {'category': item['category__name'] or 'Uncategorized', 'value': float(item['total'])} 
            for item in categories
        ]
        
        # Recent
        recent = expenses.order_by('-date')[:5]
        recent_data = ExpenseSerializer(recent, many=True).data
        
        return Response({
            'total_expenses': float(total_expenses),
            'current_month_expenses': float(current_month_expenses),
            'category_data': category_data,
            'recent_expenses': recent_data
        })

class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ExpenseListCreateView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExpenseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)
