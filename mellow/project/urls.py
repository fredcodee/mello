from django.urls import path
from . import views
urlpatterns = [
    path('', views.view_projects, name="projects"),

]
