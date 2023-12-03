from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ReadOnlyField
from ..models import Shelter, Seeker, CustomUser

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        read_only_fields = ['id']

class ShelterSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Shelter
        fields = "__all__"

class SeekerSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Seeker  
        fields = "__all__"

class UserShelterSerializer(UserSerializer):
    shelter = ShelterSerializer()

class UserSeekerSerializer(UserSerializer):
    seeker = SeekerSerializer()