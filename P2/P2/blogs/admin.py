from django.contrib import admin

# Register your models here.
from blogs.models import BlogPost
from blogs.models import BlogPostLike
from blogs.models import Notification

admin.site.register(BlogPost)
admin.site.register(BlogPostLike)
admin.site.register(Notification)