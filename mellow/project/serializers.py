from rest_framework.serializers import ModelSerializer
from .models import Project, Card, Comment

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class CardSerializer(ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'