import subprocess
import sys

python_exe = sys.executable
print(f"Using python: {python_exe}")
subprocess.run([python_exe, '-m', 'pip', 'install', 'gunicorn', 'whitenoise', 'dj-database-url'])
print("Done installing packages")

# also freeze
with open("requirements.txt", "w") as f:
    subprocess.run([python_exe, '-m', 'pip', 'freeze'], stdout=f)
print("Done freezing")
