from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from accounts.models import User
from blogs.models import RestaurantLike, RestaurantFollow, Notification
from restaurants.models import Restaurant




class RestaurantLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = RestaurantLike
        fields = ()



    def create(self, validated_data):

        #Get user id
        user_id = self.context['request'].user.id
        #print(user_id)

        #Get restaurant id
        restaurant_id = self.context.get('view').kwargs.get('id')

        #Get specific restaurant object from restaurant ID
        restaurant = Restaurant.objects.get(id=restaurant_id)

        #Check to make sure you can only like once
        if RestaurantLike.objects.filter(restaurant__id=restaurant_id, user__username=self.context['request'].user.username).exists():
            raise ValidationError("You already liked this restaurant")

        #Create restaurant like object in database
        restaurantLike = RestaurantLike.objects.create(user=self.context['request'].user, restaurant=restaurant)

        #Increment restaurant like count by one
        restaurant.number_likes += 1
        restaurant.save()

        # Add a notification
        Notification.objects.create(receiver=restaurant.owner, userNotifier=self.context['request'].user, description='New restaurant like')


        return restaurantLike


class RestaurantFollowSerializer(serializers.ModelSerializer):

    class Meta:
        model = RestaurantFollow
        fields = ()



    def create(self, validated_data):

        #Get user id
        user_id = self.context['request'].user.id
        #print(user_id)

        #Get restaurant id
        restaurant_id = self.context.get('view').kwargs.get('id')

        #Get specific restaurant object from restaurant ID
        restaurant = Restaurant.objects.get(id=restaurant_id)

        if RestaurantFollow.objects.filter(restaurant__id=restaurant_id, user__username=self.context['request'].user.username).exists():
            raise ValidationError("You already follow this restaurant")

        #Create restaurant follow object in database
        restaurantFollow = RestaurantFollow.objects.create(user=self.context['request'].user, restaurant=restaurant)

        #Increment restaurant follow count by one
        restaurant.number_follows += 1
        restaurant.save()

        # Add a notification
        Notification.objects.create(receiver=restaurant.owner, userNotifier=self.context['request'].user, description='New follower')


        return restaurantFollow









