from rest_framework.serializers import ModelSerializer
from .models import Project, Card, Comment, Notifications

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


class Notifications(ModelSerializer):
    class Meta:
        model = Notifications
        fields = '__all__'