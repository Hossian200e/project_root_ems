# custom_auth/models.py

from django.db import models

class AdminUser(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class StudentUser(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(null=True, blank=True)
    roll_no = models.CharField(max_length=20)
    student_class = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

class TeacherUser(models.Model):
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=255)
    email = models.EmailField(null=True, blank=True)
    subject = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
