from getpass import getuser
from .models import Project, Card , Comment
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProjectSerializer
from account.models import CustomUser


@api_view(['GET'])
def view_projects(request,name):
    getUser = CustomUser.objects.get(name = name)
    projects = getUser.team.all()
    serializer = ProjectSerializer(projects,many = True)
    return Response(serializer.data)


@api_view(['GET'])
def pin_projects(request,project_id):
    getProject = Project.objects.get(pk = project_id)
    if getProject.pin:
        getProject.pin = False
        getProject.save()
        event = "Project unstarred"
    else:
        getProject.pin = True
        getProject.save()
        event = "Project starred"
    return Response(event)






