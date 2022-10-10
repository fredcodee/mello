from .models import Project, Card , Comment
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProjectSerializer
from account.models import CustomUser
from account.serializers import CustomUserSerializer


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

@api_view(['POST'])
def create_project(request, user_id):
    owner = CustomUser.objects.get(pk = user_id)
    data =  request.data
    project = Project.objects.create(
        owner = owner, name = data['projectname'], description = data['projectdetails']
    )
    project.members.add(owner)
    project.admins.add(owner)
    project.save()
    serializers =ProjectSerializer(project, many = False)
    return Response(serializers.data)

@api_view(['GET'])
def get_users(request):
    users= CustomUser.objects.all()
    serializers = CustomUserSerializer(users, many =True)
    return Response(serializers.data)

