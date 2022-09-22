from django.shortcuts import render
from django.http import HttpResponse
from .models import Project, Card


def projects(request):
    projects = Project.objects.all()
    return HttpResponse('<h1>Porjects page </h1>')



