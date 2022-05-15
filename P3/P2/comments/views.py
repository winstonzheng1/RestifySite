from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import get_list_or_404
from requests import Response
from rest_framework import permissions, status
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, get_object_or_404, \
    RetrieveAPIView, DestroyAPIView
from rest_framework.exceptions import APIException

# Create your views here.
from comments.models import Comment
from comments.serializers import CommentSerializer


class CreateCommentView(CreateAPIView):
    model = Comment
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CommentSerializer


class ViewCommentView(RetrieveAPIView):
    model = Comment
    serializer_class = CommentSerializer
    lookup_url_kwarg = 'id'

    def get_object(self):
        return get_object_or_404(Comment, id=self.kwargs['id'])

#List of comments for a restaurant
class ListCommentView(ListAPIView):
    model = Comment
    serializer_class = CommentSerializer

    def get_queryset(self):
        return get_list_or_404(
            Comment.objects.filter(restaurant__id=self.kwargs['id']).order_by('-comment_create_time'))