from rest_framework.routers import DefaultRouter

from django.urls import path, include

from apps.search.views import SearchViewset

router = DefaultRouter()
router.register(r'', SearchViewset)

urlpatterns = [
    path('', include(router.urls)),
]
