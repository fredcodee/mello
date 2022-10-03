from .models import Project, Card , Comment
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProjectSerializer
from account.models import CustomUser


#funcs
def isUser_member(user, project):
    project = project.members.all()
    if user in project:
        return True

def isUser_admin(user, project):
    project = project.admins.all()
    if user in project:
        return True



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

@api_view(['GET'])
def get_project(request,project_id, user_id):
    getUser = CustomUser.objects.get(pk = user_id)
    getProject = Project.objects.get(pk = project_id)
    event= "Access Denied"
    if isUser_member(getUser, getProject):
        serializer = ProjectSerializer(getProject, many = False)
        event = serializer.data
        
    return Response(event)


@api_view(['GET'])
def get_members(request, project_id):
    getProject = Project.objects.get(pk = project_id)
    team  =getProject.members
    serializers = ProjectSerializer(team, many = True)

    return Response(serializers.data)




