from django.db import models

from apps.util.models import AbstractBaseModel
from apps.user.models import User

class Search(AbstractBaseModel):
    query = models.CharField(max_length=128)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.id} - {self.query}"
