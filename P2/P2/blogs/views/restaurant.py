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
from blogs.models import BlogPost, BlogPostLike, RestaurantLike, RestaurantFollow
from blogs.serializers.restaurantsocialserializer import RestaurantLikeSerializer, RestaurantFollowSerializer
from restaurants.models import Restaurant


class RestaurantLikeView(CreateAPIView):
    model = RestaurantLike
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RestaurantLikeSerializer

class RestaurantUnlikeView(RetrieveUpdateDestroyAPIView):
    # model = BlogPostLike
    # serializer_class = BlogPostLikeSerializer
    # lookup_url_kwarg = 'id'
    # queryset = BlogPostLike.objects.all()

    #Check if you are unliking your own like (you must be the creator of the like)
    def delete(self, request, *args, **kwargs):
        #print('XXXX')
        restaurant_id = self.kwargs.get('id')
        #print(post_id)
        #print(request.user.username)
        restaurant_likes = RestaurantLike.objects.filter(restaurant__id=restaurant_id, user__username=request.user.username)
        if restaurant_likes.count() == 0:
            return HttpResponse(status=400)

        restaurant_like = restaurant_likes[0]

        if restaurant_like.user.username != request.user.username:
            return HttpResponse(status=400)

        restaurant_like.delete()

        #Decrement restaurant like count by one
        restaurant = Restaurant.objects.get(id=restaurant_id)
        restaurant.number_likes -= 1
        restaurant.save()

        return HttpResponse(status=204)


class RestaurantFollowView(CreateAPIView):
    model = RestaurantFollow
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RestaurantFollowSerializer

class RestaurantUnfollowView(RetrieveUpdateDestroyAPIView):

    #Check if you are unfollowing a restaurant that you follow
    def delete(self, request, *args, **kwargs):

        restaurant_id = self.kwargs.get('id')
        restaurant_follows = RestaurantFollow.objects.filter(restaurant__id=restaurant_id, user__username=request.user.username)
        if restaurant_follows.count() == 0:
            return HttpResponse(status=400)

        restaurant_follow = restaurant_follows[0]

        if restaurant_follow.user.username != request.user.username:
            return HttpResponse(status=400)

        restaurant_follow.delete()

        #Decrement restaurant follow count by one
        restaurant = Restaurant.objects.get(id=restaurant_id)
        restaurant.number_follows -= 1
        restaurant.save()

        return HttpResponse(status=204)












