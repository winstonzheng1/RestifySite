from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from blogs.models import Notification
from comments.models import Comment
from restaurants.models import Restaurant
from django.shortcuts import get_object_or_404


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('restaurant_id', 'content', 'comment_create_time', 'user_id', 'commentUsername')
        read_only_fields = ['comment_create_time']

    def create(self, validated_data):
        # Get user id
        user_id = self.context['request'].user.id

        print('xxxx')
        print(validated_data)

        # Get Restaurant id
        #  restaurant_id = validated_data['restaurant_id']
        restaurant_id = self.context.get('view').kwargs.get('id')

        # Get specific restaurant object from restaurant ID
        target_restaurant = get_object_or_404(Restaurant, id=restaurant_id)

        #Get username from current user
        user_name = self.context['request'].user.username

        # Create restaurant comment object in database
        #commentUsername placeholder value
        restaurantComment = Comment.objects.create(restaurant=target_restaurant, user=self.context['request'].user, content=validated_data['content'], commentUsername=user_name)

        # Add a notification
        Notification.objects.create(receiver=target_restaurant.owner, userNotifier=self.context['request'].user, description='New comment on your restaurant')

        return restaurantComment

