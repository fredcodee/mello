from django.urls import path
from . import views
urlpatterns = [
    path('<str:name>/', views.view_projects, name='projects'),
    path('star/<int:project_id>/', views.pin_projects, name="star project"),

]
