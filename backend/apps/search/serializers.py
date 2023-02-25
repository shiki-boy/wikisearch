from rest_framework import serializers

from apps.search.models import Search
from apps.user.models import User
from apps.util.serializers import UIDField


class SearchSerializer(serializers.ModelSerializer):
    # user = UIDField(model=User)

    class Meta:
        model = Search
        fields = ['uid', 'query', ]
