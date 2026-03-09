import pymysql
import sys

try:
    connection = pymysql.connect(
        host='mysql-113bba00-xamlde787-1125.g.aivencloud.com',
        user='avnadmin',
        password='YOUR_AIVEN_PASSWORD',
        database='defaultdb',
        port=13362,
        ssl={'check_hostname': False}
    )
    print("SUCCESS: Connected to Aiven MySQL!")
    connection.close()
    sys.exit(0)
except Exception as e:
    print(f"FAILED: {e}")
    sys.exit(1)
