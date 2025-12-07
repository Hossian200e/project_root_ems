from rest_framework import serializers
from .models import AdminUser, StudentUser, TeacherUser

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = '__all__'

class StudentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = '__all__'

class TeacherUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherUser
        fields = '__all__'
