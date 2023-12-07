from rest_framework.serializers import ModelSerializer
from ..models import Comment

# from rest_framework import serializers
from ..models import Comment, ShelterComment, ApplicationComment

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['user', 'user_name', 'user_type', 'comment_type', 'creation_time']

class ShelterSerializer(ModelSerializer):
    class Meta:
        model = ShelterComment
        fields = '__all__'

class ApplicationSerializer(ModelSerializer):
    class Meta:
        model = ApplicationComment
        fields = '__all__'

class ShelterCommentSerializer(CommentSerializer):
    shelter_comment = ShelterSerializer(read_only=True)


class ApplicationCommentSerializer(CommentSerializer):
    application_comment = ApplicationSerializer(read_only=True)