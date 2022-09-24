from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    Email_Address = models.EmailField(verbose_name="email", max_length=90, unique=True, blank=True, null=True, default=None)
    name = models.CharField(max_length=30, blank=True, null=True)

    USERNAME_FIELD = 'Email_Address'

    def __str__(self):
        return self.name
