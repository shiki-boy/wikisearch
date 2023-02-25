from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

from apps.search.models import Search
from apps.search.serializers import SearchSerializer


class SearchViewset(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = SearchSerializer
    queryset = Search.objects.all().order_by('-created')
    lookup_field = "uid"
    lookup_url_kwarg = "uid"
    lookup_value_regix = "[0-9a-f-]{36}"

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
