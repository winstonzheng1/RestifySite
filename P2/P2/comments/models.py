from django.db import models

# Create your models here.
from django.db import models
from django.db.models import CASCADE
from django.utils import timezone

from accounts.models import User
from restaurants.models import Restaurant


class Comment(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)
    user = models.ForeignKey(to=User, on_delete=CASCADE)
    content = models.TextField()
    comment_create_time = models.DateTimeField(auto_now_add=True, blank=True)

