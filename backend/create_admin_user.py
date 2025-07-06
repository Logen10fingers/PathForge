import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

USERNAME = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'mynewadminuser')
EMAIL = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
PASSWORD = os.environ.get('DJANGO_SUPERUSER_PASSWORD', 'MyStrongTempPassword123!')

if not User.objects.filter(username=USERNAME).exists():
    print(f'Creating superuser: {USERNAME}')
    User.objects.create_superuser(USERNAME, EMAIL, PASSWORD)
    print(f'Superuser {USERNAME} created successfully!')
else:
    print(f'Superuser {USERNAME} already exists. Skipping creation.')