from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

class CustomUser(AbstractUser):
    id = models.AutoField(primary_key=True)
    username = None
    first_name = models.CharField(max_length=200, blank=False)
    last_name = models.CharField(max_length=200, blank=False)
    email = models.EmailField(unique=True, blank=False)
    account_type = models.CharField(max_length=200, blank=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

class Shelter(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, blank=False)
    phone = models.CharField(max_length=200, blank=False)
    country = models.CharField(max_length=200, blank=False)
    province = models.CharField(max_length=200, blank=False)
    address = models.CharField(max_length=200, blank=False)
    postal_code = models.CharField(max_length=200, blank=False)
    mission = models.CharField(max_length=200, blank=False)
    photo = models.ImageField(upload_to='profile/', null=True, blank=True)

class Seeker(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='profile/', null=True, blank=True)