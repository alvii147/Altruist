from rest_framework import serializers
from .models import User
from .models import Errand

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ErrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Errand
        fields = '__all__'