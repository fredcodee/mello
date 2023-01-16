from .models import Project, Card, Comment
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ProjectSerializer, CardSerializer, CommentSerializer
from account.models import CustomUser
from account.serializers import CustomUserSerializer
from rest_framework import status
import uuid
import datetime


def isUser_member(user, project):
    project = project.members.all()
    if user in project:
        return True


def isUser_admin(user, project):
    project = project.admins.all()
    if user in project:
        return True


@api_view(['GET'])
def view_projects(request, name):
    getUser = CustomUser.objects.get(name=name)
    projects = getUser.team.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def pin_projects(request, project_id):
    getProject = Project.objects.get(pk=project_id)
    if getProject.pin:
        getProject.pin = False
        getProject.save()
        event = status.HTTP_200_OK
    else:
        getProject.pin = True
        getProject.save()
        event = status.HTTP_200_OK
    return Response(status=event)


@api_view(['GET'])
def get_project(request, project_id, user_id):
    getUser = CustomUser.objects.get(pk=user_id)
    getProject = Project.objects.get(pk=project_id)
    event = "Access Denied"
    if isUser_member(getUser, getProject):
        serializer = ProjectSerializer(getProject, many=False)
        event = serializer.data

    return Response(event)


@api_view(['GET'])
def get_members(request, project_id):
    getProject = Project.objects.get(pk=project_id)
    team = getProject.members
    serializers = ProjectSerializer(team, many=True)

    return Response(serializers.data)


@api_view(['POST'])
def create_project(request, user_id):
    owner = CustomUser.objects.get(pk=user_id)
    data = request.data
    code = str(uuid.uuid4()).replace("-", "")[:12]

    #check if ref code already exists
    check_refCode = True
    while check_refCode:
        code = str(uuid.uuid4()).replace("-", "")[:12]
        check_refCode = Project.objects.filter(ref_code=code).exists()

    project = Project.objects.create(
        owner=owner, name=data['projectname'], description=data['projectdetails'], ref_code=code)
    project.members.add(owner)
    project.admins.add(owner)
    project.save()
    serializers = ProjectSerializer(project, many=False)
    return Response(serializers.data)


@api_view(['GET'])
def get_users(request):
    users = CustomUser.objects.all()
    serializers = CustomUserSerializer(users, many=True)
    return Response(serializers.data)


@api_view(['PUT', 'GET'])
def add_member(request, name, project_id, user_id):
    user = CustomUser.objects.get(pk=user_id)
    member_toAdd = CustomUser.objects.get(name=name)
    project = Project.objects.get(pk=project_id)

    if isUser_admin(user, project):
        project.members.add(member_toAdd)
        project.save()
        http_status = status.HTTP_200_OK
    else:
        http_status = status.HTTP_401_UNAUTHORIZED
    return Response(status=http_status)


@api_view(['PUT', 'GET'])
def invite_link(request, code, user_id):
    project = Project.objects.filter(ref_code=code)
    getUser = CustomUser.objects.filter(pk=user_id)
    event = ""

    if project.exists() and getUser.exists():
        project = project.first()
        getUser = getUser.first()

        check = project.members.filter(pk=getUser.id)
        if not check.exists():
            #add user to team
            project.members.add(getUser)
            project.save()
            event = {'event': "you have joined this Project", 'code': "success"}
        else:
            event = {
                'event': "You are already a member of this Project", 'code': "member"}
    else:
        event = {'event': "Invite Link Error", 'code': 'error'}

    return Response(event)


@api_view(['PUT', 'GET'])
def remove_member(request, project_id, admin_id, user_id):
    project = Project.objects.filter(pk=project_id)
    admin = CustomUser.objects.filter(pk=admin_id)
    user = CustomUser.objects.filter(pk=user_id)
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


@api_view(['PUT', 'GET'])
def change_role(request, project_id, admin_id, user_id):
    project = Project.objects.filter(pk=project_id)
    admin = CustomUser.objects.filter(pk=admin_id)
    user = CustomUser.objects.filter(pk=user_id)
    event = ''

    if project.exists() and admin.exists() and user.exists():
        if isUser_admin(admin.first(), project.first()) and isUser_member(user.first(), project.first()) and not isUser_admin(user.first(), project.first()):
            project = project.first()
            project.admins.add(user.first())
            project.save()
            event = 'You Appointed user as admin of this project'
    else:
        event = 'Authorized Access Not Granted!'

    return Response(event)


@api_view(['PUT', 'GET'])
def exit_project(request, project_id, user_id):
    project = Project.objects.filter(pk=project_id)
    user = CustomUser.objects.filter(pk=user_id)

    if project.exists() and user.exists():
        project = project.first()
        if isUser_member(user.first(), project):
            #admins
            if isUser_admin(user.first(), project):
                project.admins.remove(user.first())
            #members
            project.members.remove(user.first())
            project.save()
            event = 'You left this project'
    else:
        event = 'Authorized Access Not Granted!'

    return Response(event)


@api_view(['GET', 'DELETE'])
def delete_project(request, project_id, owner_id):
    project = Project.objects.get(pk=project_id)
    owner = CustomUser.objects.get(pk=owner_id)

    if project.owner == owner:
        project.delete()
        event = 'Project Deleted'
    return Response(event)


@api_view(['PUT'])
def edit_project(request, project_id, owner_id):
    owner = CustomUser.objects.get(pk=owner_id)
    project = Project.objects.get(pk=project_id)
    data = request.data

    if project.owner == owner:
        project.name = data['cpn']
        project.description = data['cpd']
        project.save()
        serializers = ProjectSerializer(project, many=False)
        return Response(serializers.data)


@api_view(['GET'])
def view_cards(request, project_id):
    project = Project.objects.get(pk = project_id)
    cards = Card.objects.filter(project = project).all()
    serializer = CardSerializer(cards, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def asign_users(request, card_id, user_id):
    card = Card.objects.get(pk=card_id)
    user =CustomUser.objects.get(pk =user_id)

    card.asigned_To.add(user)
    card.save()
    http_status = status.HTTP_200_OK
    return Response(status=http_status)


@api_view(['PUT', 'GET'])
def unasign_member(request, card_id, user_id):
    card = Card.objects.get(pk=card_id)
    user = CustomUser.objects.get(pk = user_id)

    card.asigned_To.remove(user)
    card.save()
    http_status = status.HTTP_200_OK
    return Response(status=http_status)

@api_view(['POST'])
def create_card(request, project_id,  user_id):
    manager = CustomUser.objects.get(pk=user_id)
    project = Project.objects.get(pk=project_id)
    data = request.data
    date = data["deadlineDate"]
    date_obj = datetime.datetime.strptime(date, '%Y-%m-%d')

    card = Card(Manager=manager, title=data['title'], project=project, labels=data['labels'], label_color=data["labelColor"], deadlineDate=date_obj)
    card.save()

    http_status = status.HTTP_200_OK
    return Response(status=http_status)


@api_view(['DELETE'])
def delete_card(request, card_id, user_id):
    card = Card.objects.get(pk=card_id)
    user =CustomUser.objects.get(pk=user_id)
    if card.Manager == user or isUser_admin(user):
        card.delete()
        http_status = status.HTTP_200_OK
    else:
        http_status = status.HTTP_403_FORBIDDEN

    return Response(status=http_status)

@api_view(['PUT'])
def edit_card(request, card_id, user_id):
    card = Card.objects.get(pk=card_id)
    user = CustomUser.objects.get(pk=user_id)

    if card.Manager == user or isUser_admin(user):
        data = request.data
        date = data["deadlineDate"]
        date_obj = datetime.datetime.strptime(date, '%Y-%m-%d')
        card.title = data['title']
        card.labels = data['labels']
        card.label_color = data["labelColor"]
        card.deadlineDate = date_obj
        card.save()
        http_status = status.HTTP_200_OK
    else:
        http_status = status.HTTP_403_FORBIDDEN

    return Response(status=http_status)


@api_view(['GET'])
def view_comment(request, card_id, ):
    card = Card.objects.get(pk = card_id)
    if card:
        #get all comments in the card
        comments = Comment.objects.filter(card = card).all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    return Response(status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def create_comment(request,user_id, card_id, project_id):
    user = CustomUser.get.objects(pk = user_id)
    #check if user is in project and user is asigned the card
    