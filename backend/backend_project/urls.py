from django.contrib import admin
from django.urls import path, include
from .views import home  # import the home view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('custom_auth.urls')),  # if you have custom auth urls
    path('', home),  # this handles the root URL
]
