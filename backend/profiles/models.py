# backend/profiles/models.py

from django.db import models
from django.contrib.auth.models import User
from skills.models import Skill
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)

    last_updated = models.DateTimeField(auto_now=True)
    source = models.CharField(max_length=255, blank=True, null=True)

    skills = models.ManyToManyField(Skill, blank=True)

    def __str__(self):
        return self.user.username
