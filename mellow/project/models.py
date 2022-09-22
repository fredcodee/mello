from turtle import title
from unicodedata import name
from django.db import models

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    

class Card(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
