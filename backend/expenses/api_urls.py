from django.urls import path
from . import api_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Auth
    path('auth/register/', api_views.RegisterView.as_view(), name='api-register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='api-login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='api-refresh'),
    path('auth/me/', api_views.CurrentUserView.as_view(), name='api-me'),

    # Data
    path('dashboard/', api_views.DashboardView.as_view(), name='api-dashboard'),
    path('categories/', api_views.CategoryListView.as_view(), name='api-categories'),
    path('categories/<int:pk>/', api_views.CategoryRetrieveUpdateDestroyView.as_view(), name='api-category-detail'),
    path('expenses/', api_views.ExpenseListCreateView.as_view(), name='api-expenses'),
    path('expenses/<int:pk>/', api_views.ExpenseRetrieveUpdateDestroyView.as_view(), name='api-expense-detail'),
]
