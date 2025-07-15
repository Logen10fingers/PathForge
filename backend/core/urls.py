#C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\backend\core\urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token # Import this for login endpoint

urlpatterns = [
    path('admin/', admin.site.urls),
    # API authentication endpoint
    path('api/token/login/', obtain_auth_token, name='api_token_auth'), # Matches frontend's loginUser call

    # Your app API endpoints
    # Ensure your 'profiles' and 'skills' apps have their own urls.py files
    # and define the actual API views there.
    path('api/', include('profiles.urls')), # Includes URLs from your profiles app
    path('api/', include('skills.urls')),   # Includes URLs from your skills app

    # Example for other endpoints that might be directly under /api/
    # path('api/suggest-skill-category/', your_app.views.suggest_skill_category_view, name='suggest_skill_category'),
    # path('api/import-data/', your_app.views.import_data_view, name='import_data'),
]