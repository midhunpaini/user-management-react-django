from django.urls import path
from . import views

urlpatterns = [
    path('register', views.RegisterView.as_view(), name='register'),
    path('login', views.Login.as_view(), name='login'),
    path('user', views.UserViews.as_view(), name='user'),
    path('logout', views.LogoutView.as_view(), name='logout'),
    path('djadmin', views.AdminDash.as_view(), name='djadmin'),
    path('delete_user', views.DeleteUser.as_view(), name='delete_user'),
    path('edit_user', views.EditUser.as_view(), name='edit_user'),
    path('addimage', views.AddImageView.as_view(), name='addimage'),
]
