from django.contrib import admin

# Register your models here.
from blogs.models import BlogPost
from blogs.models import BlogPostLike
from blogs.models import Notification
from blogs.models import RestaurantFollow

admin.site.register(BlogPost)
admin.site.register(BlogPostLike)
admin.site.register(Notification)
admin.site.register(RestaurantFollow)