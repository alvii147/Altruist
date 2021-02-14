from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('register/', views.register, name = 'accounts-register'),
    path('login/', auth_views.LoginView.as_view(template_name = 'Altruist/login.html'), name = 'accounts-login'),
    path('logout/', auth_views.LogoutView.as_view(template_name = 'Altruist/logout.html'), name = 'accounts-logout'),
]
