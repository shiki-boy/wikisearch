from django.urls import include, path, re_path
from rest_framework.routers import DefaultRouter
from apps.user.views import (
    UserInfoView, GoogleLogin
)

router = DefaultRouter()
# router.register('profile', UserProfileViewset)
urlpatterns = router.urls

app_name = 'apps.auth'

urlpatterns += [
    path(f"", include("dj_rest_auth.urls")),

    path('google/verify/', GoogleLogin.as_view(), name='google_login'),

    path('user-info/', UserInfoView.as_view(), name='user-info'),
]
