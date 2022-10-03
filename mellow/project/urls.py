from unicodedata import name
from django.urls import path
from . import views
urlpatterns = [
    path('<str:name>/', views.view_projects, name='projects'),
    path('star/<int:project_id>/', views.pin_projects, name="star project"),
    path('<int:project_id>/user/<int:user_id>/', views.get_project, name="get project"),
    path('view/members/<int:project_id>/', views.get_members, name = "memebers"),
]
