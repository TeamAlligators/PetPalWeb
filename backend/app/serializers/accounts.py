from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ..models import Shelter, Seeker, CustomUser

class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = [ 'groups', 'user_permissions', 'last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined', ]

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