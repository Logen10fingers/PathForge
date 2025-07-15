#C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\backend\core\settings.py

import os
from pathlib import Path
import dj_database_url
import json

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# Using os.environ.get for SECRET_KEY is good practice.
SECRET_KEY = os.environ.get("SECRET_KEY", "django-insecure-!!&($^yeg^6f0icne3x$8x^n@yy+ch+um8ui^3$^mjzp)nm=%q")


# SECURITY WARNING: don't run with debug turned on in production!
# IMPORTANT: For local development, DEBUG should be True
DEBUG = os.environ.get("DEBUG", "True").lower() == "true" # Default to True locally

# ALLOWED_HOSTS for local development
# In DEBUG mode, this ensures your local development server works.
# For Render, RENDER_EXTERNAL_HOSTNAME handles it.
if DEBUG:
    ALLOWED_HOSTS = ['localhost', '127.0.0.1']
else:
    ALLOWED_HOSTS = []
    # Production settings for Render
    RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
    if RENDER_EXTERNAL_HOSTNAME:
        ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)
    # If your frontend on Render has a specific hostname that needs to talk to this backend
    # you might add it here, e.g., ALLOWED_HOSTS.append('your-frontend-on-render.com')


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # My Apps & Third-Party Apps
    "rest_framework",
    "corsheaders",
    "rest_framework.authtoken", # Make sure this is always here if using TokenAuthentication
    "skills",
    "profiles",
    "ai_skills",
    "job_roles",
    "importer",
    "django_filters" # Ensure this is installed: pip install django-filter
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    # WhiteNoise should be after SecurityMiddleware for proper header handling
    "whitenoise.middleware.WhiteNoiseMiddleware", # Ensure whitenoise is installed: pip install whitenoise
    # CorsMiddleware should be as high as possible, definitely before CommonMiddleware
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database
# Use SQLite for local development by default
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Override with PostgreSQL on Render if DATABASE_URL is set
DATABASE_URL = os.environ.get('DATABASE_URL')
if not DEBUG and DATABASE_URL: # Only use remote DB in production (when DEBUG is False)
    DATABASES['default'] = dj_database_url.parse(DATABASE_URL)


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# Use WhiteNoise to serve static files in production
if not DEBUG:
    STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
# In development, Django's staticfiles app handles it automatically


# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# CORS Settings
# IMPORTANT: For local development, explicitly allow http://localhost:5173
CORS_ALLOWED_ORIGINS = []

# During development, explicitly add local origins
if DEBUG:
    CORS_ALLOWED_ORIGINS.append("http://localhost:5173")
    CORS_ALLOWED_ORIGINS.append("http://127.0.0.1:5173")
    # You can comment out or remove CORS_ALLOWED_ORIGINS=[] and the json.loads logic below
    # if you are ONLY developing locally for now.
    # CORS_ALLOW_ALL_ORIGINS = True # <- This is simpler for local dev, but less explicit.
                                  # If you use this, comment out CORS_ALLOWED_ORIGINS entirely.
else:
    # Production CORS settings: parse from environment variable
    cors_origins_env = os.environ.get('CORS_ALLOWED_ORIGINS')
    if cors_origins_env:
        try:
            CORS_ALLOWED_ORIGINS = json.loads(cors_origins_env)
        except json.JSONDecodeError:
            CORS_ALLOWED_ORIGINS = [origin.strip() for origin in cors_origins_env.split(',') if origin.strip()]

    # Add your deployed frontend URL here if it's not managed by the env var
    # E.g., CORS_ALLOWED_ORIGINS.append('https://your-frontend-app.onrender.com')


# Configure Django to trust the X-Forwarded-Proto header for HTTPS on Render
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    # Uncomment and configure these for production as needed:
    # SECURE_SSL_REDIRECT = True
    # SESSION_COOKIE_SECURE = True
    # CSRF_COOKIE_SECURE = True
    # SECURE_HSTS_SECONDS = 31536000
    # SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    # SECURE_HSTS_PRELOAD = True
    # SECURE_BROWSER_XSS_FILTER = True
    # X_FRAME_OPTIONS = 'DENY'

# Django REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.SessionAuthentication', # Recommended for browsable API during dev
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated', # Require authentication for all views by default
        # If you want some views (like public profile lists) to be viewable without auth,
        # you'll override this in those specific views using permission_classes = [AllowAny]
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,  # Default page size, can be adjusted as needed
}
