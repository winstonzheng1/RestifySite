from django.db import models

# Create your models here.
from django.db.models import ForeignKey, CASCADE

from accounts.models import User
from restaurants.models import Restaurant


class BlogPost(models.Model):

    #Restaurant, title, description are required
    #Rest is optional or system/user determined
    post_restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)
    post_title = models.CharField(max_length=150)
    post_description = models.TextField()
    post_media = models.ImageField(blank=True)
    post_likes = models.IntegerField(default=0, blank=True)
    post_create_time = models.DateTimeField(auto_now_add=True, blank=True)
    restaurant_name = models.CharField(max_length=150, null=True)

class BlogPostLike(models.Model):
    post = models.ForeignKey(to=BlogPost, on_delete=CASCADE)
    user = models.ForeignKey(to=User, on_delete=CASCADE)

class RestaurantLike(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)
    user = models.ForeignKey(to=User, on_delete=CASCADE)

class RestaurantFollow(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)
    user = models.ForeignKey(to=User, on_delete=CASCADE)

class Notification(models.Model):
    receiver = models.ForeignKey(to=User, on_delete=CASCADE, related_name="receiver")
    #two foreign keys with option to be blank. Hence, choose the one that signifies who triggered the notif
    userNotifier = models.ForeignKey(to=User, null=True, blank=True, default=None, on_delete=CASCADE, related_name="userNotifier")
    restaurantNotifier = models.ForeignKey(to=Restaurant, null=True, blank=True, default=None, on_delete=CASCADE)
    description = models.TextField(blank=True)
    href = models.URLField(blank=True, max_length=128)


