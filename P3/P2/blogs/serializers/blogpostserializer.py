from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from accounts.models import User
from blogs.models import BlogPost, BlogPostLike, RestaurantLike, Notification, RestaurantFollow
from restaurants.models import Restaurant
from django.shortcuts import get_object_or_404



class BlogPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogPost
        fields = ('post_restaurant', 'restaurant_name', 'post_title', 'post_description', 'post_media', 'post_likes',
                  'post_create_time')
        read_only_fields = ['post_likes', 'post_create_time']

    #Checking input
    #From attrs get the value of post_restaurant
    #Compare it with the restaurant id of the restaurant owned by the current user
    #If it is not, then no good
    def validate(self, attrs):
        #print (self.context['request'])
        user = self.context['request'].user
        #print(user.username)
        post_restaurant = attrs['post_restaurant']
        #print(post_restaurant)
        #print(post_restaurant.owner.username)
        if post_restaurant.owner.username != user.username:
            raise serializers.ValidationError(
                {'You do not own this restaurant'})
        return super().validate(attrs)


    #Change this
    def create(self, validated_data):

        #Get restaurant name

        #Need to explicitly mention restaurant name
        #newPost = BlogPost.objects.create(**validated_data)


        #Need post_restaurant, restaurant_name, post_title, post_description
        #newPost = BlogPost.objects.create(**validated_data)

        #How to get restaurant name?

        #Ok, just need a way to get the restaurant ID of the restaurant that is making the post
        restaurant_id = validated_data['post_restaurant'].id
        target_restaurant_name = get_object_or_404(Restaurant, id=restaurant_id).name

        newPost = BlogPost.objects.create(restaurant_name=target_restaurant_name, post_restaurant=validated_data['post_restaurant'], post_title=validated_data['post_title'], post_description=validated_data['post_description'])

        # Get the follower of the restaurant
        restaurant_id = newPost.post_restaurant.id
        follows = RestaurantFollow.objects.filter(restaurant__id=restaurant_id)
        for follow in follows:
            # Add a notification
            Notification.objects.create(receiver=follow.user, userNotifier=self.context['request'].user,
                                        description='New blog post')

        return newPost

    # def create(self, validated_data):
    #     # Get user id
    #     user = self.context['request'].user
    #
    #     # Get Restaurant id
    #     #  restaurant_id = validated_data['restaurant_id']
    #     restaurant_id = self.context.get('view').kwargs.get('id')
    #
    #     # Get specific restaurant object from restaurant ID
    #     target_restaurant = get_object_or_404(Restaurant, id=restaurant_id)
    #
    #     # Create restaurant comment object in database
    #     restaurantComment = Comment.objects.create(restaurant=target_restaurant, user=self.context['request'].user, content=validated_data['content'])
    #
    #     # Add a notification
    #     Notification.objects.create(receiver=target_restaurant.owner, userNotifier=self.context['request'].user, description='New comment on your restaurant')
    #
    #     return restaurantComment

class BlogPostLikeSerializer(serializers.ModelSerializer):
    #user_id = serializers.SerializerMethodField()
    #post_id = serializers.SerializerMethodField()

    class Meta:
        model = BlogPostLike
        fields = ()

    def get_user_id(self, instance):
        return instance.user.id

    def get_post_id(self, instance):
        return self.kwargs['id']


    def create(self, validated_data):

        #Get user id
        user_id = self.context['request'].user.id
        #print(user_id)

        #Get post id
        post_id = self.context.get('view').kwargs.get('id')
        #post_id = self.kwargs['id']
        #print(post_id)

        #Get specific post object from post ID
        post = BlogPost.objects.get(id=post_id)

        #Check to make sure you can only like once
        if BlogPostLike.objects.filter(post__id=post_id, user__username=self.context['request'].user.username).exists():
            raise ValidationError("You already liked this post")

        #Create post like object in database
        postLike = BlogPostLike.objects.create(user=self.context['request'].user, post=post)

        #Increment post like count by one
        post.post_likes += 1
        post.save()

        # Add a notification
        Notification.objects.create(receiver=post.post_restaurant.owner, userNotifier=self.context['request'].user, description='New like on your blog post')


        return postLike




     #Get blog id from url








