from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AdminUser, StudentUser, TeacherUser

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Check admin
    try:
        user = AdminUser.objects.get(username=username, password=password)
        return Response({"status": "success", "user_type": "admin", "username": user.username})
    except AdminUser.DoesNotExist:
        pass

    # Check student
    try:
        user = StudentUser.objects.get(username=username, password=password)
        return Response({"status": "success", "user_type": "student", "username": user.username})
    except StudentUser.DoesNotExist:
        pass

    # Check teacher
    try:
        user = TeacherUser.objects.get(username=username, password=password)
        return Response({"status": "success", "user_type": "teacher", "username": user.username})
    except TeacherUser.DoesNotExist:
        pass

    return Response({"status": "error", "message": "Invalid credentials"}, status=401)
