from django.db import models
from .user import Shelter

class Pet(models.Model):
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, blank=False)
    name = models.CharField(max_length=200, blank=False)
    age = models.PositiveIntegerField(blank=False)
    species = models.CharField(max_length=200, blank=False)
    breed = models.CharField(max_length=200, blank=False)
    size = models.PositiveIntegerField(blank=False)
    gender = models.CharField(max_length=200, blank=False)
    photo = models.ImageField(upload_to='pet/', null=True, blank=False)
    status = models.CharField(max_length=200, blank=False)
    birthday = models.DateField(null=True, blank=True)
    medical_history = models.CharField(max_length=200, blank=True)
    special_needs = models.CharField(max_length=200, blank=True)
    personality = models.CharField(max_length=200, blank=True)
    others = models.CharField(max_length=200, blank=True)
    posted_date = models.DateField(auto_now_add=True, blank=False)
