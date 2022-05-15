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
from blogs.models import BlogPost, BlogPostLike


#Done
class CreatePostApiView(CreateAPIView):
    model = BlogPost
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BlogPostSerializer


#Need to turn this into a retrieveupdatedestroyapiview
#Users should have ability to delete a blog post
class ViewPostApiView(RetrieveUpdateDestroyAPIView):
    model = BlogPost
    #Don't need authentication to see a single blog post
    serializer_class = BlogPostSerializer
    lookup_url_kwarg = 'id'
    queryset = BlogPost.objects.all()

    def get_object(self):
        return get_object_or_404(BlogPost, id=self.kwargs['id'])

    def destroy(self, request, *args, **kwargs):
        obj = self.get_object()
        if obj.post_restaurant.owner.username != request.user.username:
            return HttpResponse(status=400)
        self.perform_destroy(obj)
        return HttpResponse(status=204)


#Get a list of blogposts from one restaurant
class ListPostApiView(ListAPIView):
    model = BlogPost
    serializer_class = BlogPostSerializer
    #lookup_url_kwarg = 'id'
    #queryset = BlogPost.objects.all.filter()

    #Get all restaurants with the id specified by kwargs['id], since post_restaurant is an object, need __id to access
    #its id field
    def get_queryset(self):
        return get_list_or_404(BlogPost.objects.filter(post_restaurant__id=self.kwargs['id']).order_by('-post_create_time'))


class PostLikeView(CreateAPIView):
    model = BlogPostLike
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BlogPostLikeSerializer

class PostUnlikeView(RetrieveUpdateDestroyAPIView):
    # model = BlogPostLike
    # serializer_class = BlogPostLikeSerializer
    # lookup_url_kwarg = 'id'
    # queryset = BlogPostLike.objects.all()

    #Check if you are unliking your own like (you must be the creator of the like)
    def delete(self, request, *args, **kwargs):
        print('XXXX')
        post_id = self.kwargs.get('id')
        print(post_id)
        print(request.user.username)
        post_likes = BlogPostLike.objects.filter(post__id=post_id, user__username=request.user.username)
        if post_likes.count() == 0:
            return HttpResponse(status=400)

        post_like = post_likes[0]
        print('ccc')
        #print(post_like)
        print('XXXXYYY')
        #obj = self.get_object()
        if post_like.user.username != request.user.username:
            return HttpResponse(status=400)
        print('XXXXYYYssss')
        post_like.delete()
        print('XXXXYYYddd')

        #Increment post like count by one
        post = BlogPost.objects.get(id=post_id)
        post.post_likes -= 1
        post.save()

        return HttpResponse(status=204)

    #Currently unlike id is the blogpostlike id not the blog id










