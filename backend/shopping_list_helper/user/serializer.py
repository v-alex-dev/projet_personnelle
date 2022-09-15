from curses import meta
from curses.ascii import US
from dataclasses import field
from pyexpat import model
from django.contrib.auth.models import User, Group
from rest_framework import serializers

class UserSerializer (serializers.Serializer):
    class Meta:
        model = User
        fields = '__all__'
