from django.db import models
from account.models import CustomUser

# Create your models here.

class Project(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE,  null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(max_length=500, blank=True)
    pin = models.BooleanField(default=False)
    #admins
    #members
    dateCreated = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.name
    

class Card(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE,  null=True)
    labels = models.CharField(max_length=200, null=True, blank=True)
    #members_asigned_To
    deadlineDate = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):
        return self.title




class Comment(models.Model):
    comment =models.TextField(max_length=400, null=True, blank=True)
    timePosted = models.DateTimeField(auto_now_add=True)
    cardId =models.ForeignKey(Card, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE,  null=True)

    def __str__(self):
        return self.user