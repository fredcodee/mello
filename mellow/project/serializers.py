from ast import Mod
from rest_framework.serializers import ModelSerializer
from .models import Project, Card, Comment

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'