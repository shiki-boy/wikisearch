from datetime import timedelta

from allauth.account.adapter import get_adapter
from allauth.account.forms import default_token_generator
from allauth.account.models import EmailAddress
from allauth.account.utils import user_pk_to_url_str
from allauth.utils import build_absolute_uri
from dj_rest_auth.serializers import PasswordChangeSerializer
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from django.core.management import call_command
from django.db import transaction
from django.urls import reverse
from django.utils import timezone
from rest_framework import serializers

from apps.user.models import User
from apps.util.utils import send_email


class RegisterSerializer(serializers.ModelSerializer):
    invite_code = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name',
                  'phone', 'password', ]

    @transaction.atomic
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

    def save(self, request):
        return super().save()


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('uid', 'email', 'first_name', 'last_name')
        read_only_fields = ('email',)


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('uid', 'email', 'first_name', 'last_name',
                  'phone_number', 'is_active', 'full_name')

