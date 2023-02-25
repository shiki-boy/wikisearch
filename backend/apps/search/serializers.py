from rest_framework import serializers

from apps.search.models import Search


class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Search
        fields = ['uid', 'query', 'created' ]
