from django.db import models
from .user import CustomUser, Shelter
from .application import Application

class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False)
    user_name = models.CharField(max_length=200, blank=False)
    user_type = models.CharField(max_length=200, blank=False)
    rating = models.IntegerField(null=True, blank=True)
    content = models.CharField(max_length=200, blank=False)
    comment_type = models.CharField(max_length=200, blank=False)
    creation_time = models.DateTimeField(auto_now_add=True)

class ShelterComment(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=False)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE, blank=False)
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)

class ApplicationComment(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, blank=False)
    application = models.ForeignKey(Application, on_delete=models.CASCADE, blank=False)
