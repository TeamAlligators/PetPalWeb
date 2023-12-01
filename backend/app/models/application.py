from django.db import models
from .user import Shelter, Seeker
from .pet import Pet

class Application(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE, blank=True, null=True)
    seeker = models.ForeignKey(Seeker, on_delete=models.CASCADE, blank=True, null=True)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, blank=True, null=True)
    application_date = models.DateField(auto_now_add=True, blank=False)
    first_name = models.CharField(max_length=200, blank=False)
    last_name = models.CharField(max_length=200, blank=False)
    phone = models.CharField(max_length=200, blank=False)
    email = models.EmailField(blank=False)
    address = models.CharField(max_length=200, blank=False)
    country = models.CharField(max_length=200, blank=False)
    province = models.CharField(max_length=200, blank=False)
    postal_code = models.CharField(max_length=200, blank=False)
    status = models.CharField(max_length=200, blank=False, default='pending')
    last_updated = models.DateTimeField(auto_now=True)