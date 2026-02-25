# PocketPulse

A modern, responsive, and visually clean web application to track personal expenses. Feel the rhythm of your finances! Built with Django, Bootstrap 5, and Chart.js.

## Features
- **User Authentication:** Secure Registration, Login, and Logout using Django's built-in system.
- **Expense Management (CRUD):** Add, View, Edit, and Delete your expenses efficiently.
- **Modern Dashboard:** Summary cards, an interactive Chart.js bar graph for categorizing expenses, and a 30-Day Spending Trend line chart.
- **Advanced Filtering & Export:** Filter expenses by Date Range, Category, Search by Title, and export the filtered list to CSV.
- **Pagination:** Handles large datasets smoothly.
- **Premium UI/UX:** Developed with modern web aesthetics including glassmorphism cards, Google Fonts (Montserrat), vibrant accents, custom svg icons, and smooth transitions.

## Instructions to Run the Project Locally

1. **Activate the Virtual Environment:**
   ```bash
   # On Windows
   venv\Scripts\activate
   # On macOS/Linux
   source venv/bin/activate
   ```

2. **Install Dependencies (if not already installed):**
   ```bash
   pip install -r requirements.txt
   ```

3. **Apply Database Migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Run the Development Server:**
   ```bash
   python manage.py runserver
   ```

5. **Access the App:**
   Open your browser and navigate to `http://127.0.0.1:8000/`. You can register a new account to start tracking expenses.

## Additional Steps
- **Add Categories:** You might want to create categories like "Food", "Travel", "Rent", etc., via the Django admin panel (`http://127.0.0.1:8000/admin/`). First, create a superuser using `python manage.py createsuperuser`.

"# Expense-Pocket" 
