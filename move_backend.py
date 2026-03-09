import os
import shutil

backend_dir = r"c:\Users\nayak\OneDrive\Desktop\all projects\expense tracker\backend"
files_to_move = [
    "expense_tracker",
    "expenses",
    "templates",
    "static",
    "manage.py",
    "requirements.txt",
    "build.sh"
]

if not os.path.exists(backend_dir):
    os.makedirs(backend_dir)

for item in files_to_move:
    src = os.path.join(r"c:\Users\nayak\OneDrive\Desktop\all projects\expense tracker", item)
    dst = os.path.join(backend_dir, item)
    if os.path.exists(src):
        try:
            shutil.move(src, dst)
        except Exception as e:
            print(f"Failed to move {item}: {e}")
