from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserListCreate.as_view(), name = 'api-users-list-create'),
    path('users/<int:pk>/', views.UserGetUpdateDelete.as_view(), name = 'api-users-get-update-delete'),
    path('errands/', views.ErrandListCreate.as_view(), name = 'api-errands-list-create'),
    path('errands/<int:pk>/', views.ErrandGetUpdateDelete.as_view(), name = 'api-errands-get-update-delete'),
]
