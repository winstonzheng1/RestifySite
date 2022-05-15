from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from accounts.models import User
from blogs.models import BlogPost, BlogPostLike, RestaurantLike, Notification
from restaurants.models import Restaurant


class NotificationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notification
        fields = ('id', 'receiver', 'userNotifier', 'restaurantNotifier', 'description', 'href')
        read_only_fields = ['receiver', 'UserNotifier', 'RestaurantNotifier', 'description, href']

    def validate(self, attrs):
        user = self.context['request'].user
        userNotifier = attrs['userNotifier']
        restaurantNotifier = attrs['restaurantNotifier']
        #check that only one notifier
        if not (bool(userNotifier) != bool(restaurantNotifier)):
            raise serializers.ValidationErro(
                {'A user and restaurant cannot create the same notification'})
        

        return super().validate(attrs)
    
    def create(self, validated_data):
        notif = self.Meta.model(**validated_data)
        notif.save()  
        return instance

    def get_notif_id(self, instance):
        return instance.notification.id





class BlogPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogPost
        fields = ('post_restaurant', 'post_title', 'post_description', 'post_media', 'post_likes', 'post_shares',
                  'post_create_time')
        read_only_fields = ['post_likes', 'post_shares', 'post_create_time']

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


        return postLike




     #Get blog id from url








