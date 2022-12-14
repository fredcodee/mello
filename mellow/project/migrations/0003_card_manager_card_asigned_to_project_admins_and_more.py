# Generated by Django 4.1.1 on 2022-09-30 05:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('project', '0002_card_deadlinedate_card_labels_card_project_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='Manager',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='card',
            name='asigned_To',
            field=models.ManyToManyField(blank=True, related_name='asignedMembers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='project',
            name='admins',
            field=models.ManyToManyField(blank=True, related_name='adminMembers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='project',
            name='members',
            field=models.ManyToManyField(blank=True, related_name='team', to=settings.AUTH_USER_MODEL),
        ),
    ]
