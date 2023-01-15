from django.urls import path
from . import views
urlpatterns = [
    path('<str:name>/', views.view_projects, name='projects'),
    path('star/<int:project_id>/', views.pin_projects, name="star project"),
    path('all/members/', views.get_users, name="all users"),
    path('<int:project_id>/user/<int:user_id>/', views.get_project, name="get project"),
    path('view/members/<int:project_id>/', views.get_members, name = "memebers"),
    path('create/<int:user_id>/', views.create_project, name=' create project'),
    path('add/<str:name>/<int:project_id>/<int:user_id>/', views.add_member, name="add member"),
    path('remove/<int:project_id>/<int:admin_id>/<int:user_id>/', views.remove_member, name='remove member'),
    path('role/<int:project_id>/<int:admin_id>/<int:user_id>/', views.change_role, name='change row'),
    path('exit/<int:project_id>/<int:user_id>/', views.exit_project, name="exit project"),
    path('delete/<int:project_id>/<int:owner_id>/', views.delete_project, name="delete project"),
    path('edit/<int:project_id>/<int:owner_id>/', views.edit_project, name='edit project'),
    path('cards/view/<int:project_id>', views.view_cards, name="view cards"),
    path('cards/asign/users/<int:card_id>/<int:user_id>', views.asign_users, name=' asign users'),
    path('cards/unasign/users/<int:card_id>/<int:user_id>', views.unasign_member,name="unasign user"),
    path('cards/create/<int:project_id>/<int:user_id>', views.create_card, name="create card"),
    path('cards/delete/<int:card_id>/<int:user_id>', views.delete_card, name="delete card"),
    path('cards/edit/<int:card_id>/<int:user_id>', views.edit_card, name="edit card"),
    path('cards/comments/view/<int:project_id>/<int:card_id>/<int:user_id>', views.view_comment, name="view comments"),
]
