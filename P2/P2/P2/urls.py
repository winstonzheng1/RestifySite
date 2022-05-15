from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('restaurants/', include('restaurants.urls', namespace='restaurants')),
    path('blogs/', include('blogs.urls', namespace='blogs')),
    path('comments/', include('comments.urls', namespace='comments'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
