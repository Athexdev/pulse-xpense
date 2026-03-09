import os
import subprocess
import sys

# 1. Remove sqlite3
db_file = 'db.sqlite3'
if os.path.exists(db_file):
    os.remove(db_file)
    print(f"Removed {db_file}")

# 2. Install pymysql
python_exe = sys.executable
print(f"Using python: {python_exe}")
subprocess.run([python_exe, '-m', 'pip', 'install', 'pymysql', 'cryptography'])
print("Done")
