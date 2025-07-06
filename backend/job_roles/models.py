# backend/job_roles/models.py

from django.db import models
from skills.models import Skill  # Import the Skill model from your skills app


class JobRole(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    # Many-to-many relationship with Skill model
    # A JobRole can have multiple Skills, and a Skill can be required by multiple JobRoles.
    required_skills = models.ManyToManyField(Skill, related_name="job_roles")

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]  # Order job roles alphabetically by name
