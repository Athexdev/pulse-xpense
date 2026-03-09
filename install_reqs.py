import subprocess
with open('install_log.txt', 'w') as f:
    result = subprocess.run([r'venv\Scripts\python.exe', '-m', 'pip', 'install', 'pymysql', 'cryptography'], stdout=f, stderr=subprocess.STDOUT)
    f.write(f"\nExit code: {result.returncode}")
