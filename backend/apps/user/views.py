from google.oauth2 import id_token
from google.auth.transport import requests
from dj_rest_auth.utils import jwt_encode

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.utils.translation import gettext_lazy as _
from django.conf import settings

from apps.user.serializers import (
    UserProfileSerializer,
)
from apps.user.models import User


class GoogleLogin(APIView):
    def create_token(self, user):
        # client can set the cookies' expires by decoding jwt
        self.access_token, self.refresh_token = jwt_encode(user)

    def get_response(self):
        self.create_token(self.user)
        data = {
            "user": self.user.info,
            "access_token": str(self.access_token),
            "refresh_token": str(self.refresh_token),
        }
        return data

    def post(self, request, *args, **kwargs):
        token = request.data.get("access_token", None)
        if not token:
            return Response({"message": "No token provided"}, status=400)

        # verify token
        try:
            user_info = id_token.verify_oauth2_token(
                token, requests.Request(), settings.GOOGLE_CLIENT_ID
            )
            # ID token is valid.
            # check if the user exists or not
            user_exists = User.objects.filter(email=user_info["email"]).exists()

            if user_exists:
                self.user = User.objects.get(email=user_info["email"])
            else:
                # create user
                new_user = User(
                    email=user_info["email"],
                    first_name=user_info["given_name"],
                    last_name=user_info["family_name"],
                )
                new_user.set_unusable_password()
                new_user.save()
                self.user = new_user

            response_data = self.get_response()
            return Response(response_data, status=status.HTTP_200_OK)
        except ValueError:
            return Response({"message": "Invalid token"}, status=401)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = User.objects.filter(email=request.user.email).first()
        return Response(
            {
                **user.info,
            },
            status=status.HTTP_200_OK,
        )


class UserProfileViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer
    queryset = User.objects.all()
    lookup_field = "uid"
    lookup_url_kwarg = "uid"
    lookup_value_regix = "[0-9a-f-]{36}"
