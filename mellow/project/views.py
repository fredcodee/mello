from tabnanny import check
from .models import Project, Card , Comment
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProjectSerializer
from account.models import CustomUser
from account.serializers import CustomUserSerializer
from rest_framework import status
import uuid


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
        event = status.status.HTTP_200_OK
    else:
        getProject.pin = True
        getProject.save()
        event = status.status.HTTP_200_OK
    return Response(status = event)

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
    #create ref link code
    code = str(uuid.uuid4()).replace("-","")[:12]

    #check if ref code already exists
    check_refCode = True
    while check_refCode:
        code = str(uuid.uuid4()).replace("-","")[:12]
        check_refCode = Project.objects.filter(ref_code = code).exists()

    project = Project.objects.create(
        owner = owner, name = data['projectname'], description = data['projectdetails'], ref_code = code)
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

@api_view(['PUT', 'GET'])
def add_member(request, name, project_id, user_id):
    user = CustomUser.objects.get(pk = user_id)
    member_toAdd = CustomUser.objects.get(name = name)
    project = Project.objects.get(pk = project_id)

    if isUser_admin(user, project):
        project.members.add(member_toAdd)
        project.save()
        http_status = status.HTTP_200_OK
    else:
        http_status = status.HTTP_401_UNAUTHORIZED
    return Response(status=http_status)
    
@api_view(['PUT','GET'])
def invite_link(request, code, user_id):
    project= Project.objects.filter(ref_code = code)
    getUser = CustomUser.objects.filter(pk = user_id)
    event = ""

    if project.exists() and getUser.exists():
        project = project.first()
        getUser = getUser.first()

        check = project.members.filter(pk = getUser.id)
        if not check.exists():
            #add user to team
            project.members.add(getUser)
            project.save()
            event = { 'event':"you have joined this Project", 'code':"success"}
        else:
            event = { 'event':"You are already a member of this Project", 'code':"member"}
    else:
        event = { 'event':"Invite Link Error", 'code':'error'}
    
    return Response(event)
    
@api_view(['PUT','GET'])
def remove_member(request, project_id, admin_id, user_id):
    project  = Project.objects.filter(pk = project_id)
    admin = CustomUser.objects.filter(pk = admin_id)
    user = CustomUser.objects.filter(pk = user_id)
    event = ''

    if project.exists() and admin.exists() and user.exists():
        if isUser_admin(admin.first(), project.first()) and isUser_member(user.first(), project.first()):
            project = project.first()
            project.members.remove(user.first())
            project.save()
            event = 'You removed user from this project'
    else:
        event = 'Authorized Access Not Granted!'
    
    return Response(event)


#exit project
#as owner
#as member
