from django.db import models
from .user import CustomUser
from .application import Application
from .comment import Comment, ShelterComment, ApplicationComment

# types of notifications: shelter_comment, new_application, application_comment, application_status_update
class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False)
    content = models.CharField(max_length=200, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, blank=False)
    is_read = models.BooleanField(default=False)
    notification_type = models.CharField(max_length=200, blank=False)
    application = models.ForeignKey(Application, on_delete=models.CASCADE, null=True, blank=True)
    shelter_comment = models.ForeignKey(ShelterComment, on_delete=models.CASCADE, null=True, blank=True)
    application_comment = models.ForeignKey(ApplicationComment, on_delete=models.CASCADE, null=True, blank=True)
    url = models.CharField(max_length=200, blank=False)