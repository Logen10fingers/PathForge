# backend/job_roles/admin.py

from django.contrib import admin
from .models import JobRole

@admin.register(JobRole)
class JobRoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    filter_horizontal = ('required_skills',) # Allows easy management of many-to-many relationship