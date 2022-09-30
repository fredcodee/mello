from django.shortcuts import render
from django.http import HttpResponse
from .models import Project, Card , Comment
from account.models import CustomUser


def view_projects(request):
    projects = Project.objects.all()
    return HttpResponse('<h1>Porjects page </h1>')






