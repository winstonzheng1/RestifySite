from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import get_list_or_404
from requests import Response
from rest_framework import permissions, status
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, get_object_or_404, \
    RetrieveAPIView, DestroyAPIView
# Create your views here.
from rest_framework.exceptions import APIException

from blogs.serializers.blogpostserializer import BlogPostSerializer, BlogPostLikeSerializer
from blogs.models import Notification
from blogs.serializers.notificationserializer import NotificationSerializer


class NotificationView(CreateAPIView):
    model = Notification
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_object(self):
        return get_object_or_404(self.model.objects.filter(owner=self.request.user))

class ListNotificationApiView(ListAPIView):
    model = Notification
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return get_list_or_404(Notification.objects.filter(receiver__id=self.kwargs['user_id']).order_by('receiver'))

class NotificationDeleteView(RetrieveUpdateDestroyAPIView):
    def delete(self,request, *args, **kwargs):

        #Make sure that you are deleting a notification that belongs to the logged-in user


        #Get the commnet id from the user
        notification_id = self.kwargs.get('id')

        #Get the notification object
        notification = Notification.objects.filter(id=notification_id)

        #Delete the notification object
        notification.delete()
        return HttpResponse(status=204)

