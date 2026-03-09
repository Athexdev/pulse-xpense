import subprocess
import sys

python_exe = sys.executable
print(f"Using python: {python_exe}")
subprocess.run([python_exe, '-m', 'pip', 'install', 'djangorestframework', 'django-cors-headers', 'djangorestframework-simplejwt'])
print("Done installing REST framework and CORS headers")

# also freeze
with open("requirements.txt", "w") as f:
    subprocess.run([python_exe, '-m', 'pip', 'freeze'], stdout=f)
print("Done freezing")
