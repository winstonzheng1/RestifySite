from rest_framework import serializers
##
#More info on serializers from rest_framework can be found at https://www.cdrf.co/3.12/rest_framework.serializers/Serializer.html
##
from rest_framework.exceptions import ValidationError

from restaurants.models import Restaurant, Day, Time, RestaurantImage, FoodItem
from blogs.models import RestaurantLike, RestaurantFollow


class RestaurantSerializer(serializers.ModelSerializer):
    owner_id = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()
    followed = serializers.SerializerMethodField()

    class Meta:
        model = Restaurant
        fields = (
            'id', 'owner_id', 'name', 'address', 'description', 'theme', 'primary_image', 'image', 'banner', 
            'phone', 'fax', 'website', 'email', 'number_likes', 'number_follows', 'liked', 'followed' 
        )
        extra_args = {
            'number_likes': {'read_only': True},
            'number_followers': {'read_only': True},
        }

    def create(self, validated_data):
        if self.Meta.model.objects.filter(owner=validated_data['owner']).exists():  #check if user already is an owner of a restaurant
            raise ValidationError("You can only own 1 restaurant per account")
        instance = self.Meta.model(**validated_data)  
        instance.save() #save instance
        for day in Day:  #get the menu through each day
            time = Time(restaurant=instance, day=day)
            time.save()  #save hours
        return instance

    #update an instance given that the data is validated already
    def update(self, instance, validated_data):
        validated_data.pop('owner')
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    #validate the restaurant
    def validate(self, attrs):
        attrs['owner'] = self.context['request'].user
        return super().validate(attrs)

    def get_owner_id(self, instance):
        return instance.owner.id

    def get_liked(self, instance):
        request = self.context.get('request', None)
        if request and request.user:
            if RestaurantLike.objects.filter(user=request.user).exists():
                return True
            else:
                return False
        else:
            return None

    def get_followed(self, instance):
        request = self.context.get('request', None)
        if request and request.user:
            if RestaurantFollow.objects.filter(user=request.user).exists():
                return True
            else:
                return False
        else:
            return None
    



class RestaurantImageSerializer(serializers.ModelSerializer):
    restaurant_id = serializers.SerializerMethodField()

    class Meta:
        model = RestaurantImage
        fields = ('id', 'restaurant_id', 'image', 'position')

    def update(self, instance, validated_data):
        validated_data.pop('restaurant')
        for key, value in validated_data.items():  #update the data
            setattr(instance, key, value)
        instance.save()
        return instance

    def validate(self, attrs):  #validate the data
        attrs['restaurant'] = self.context['restaurant']
        return super().validate(attrs)

    def get_restaurant_id(self, instance):
        return instance.restaurant.id





class FoodItemSerializer(serializers.ModelSerializer):
    restaurant_id = serializers.SerializerMethodField()

    class Meta:
        model = FoodItem
        fields = ('id', 'restaurant_id', 'name', 'details', 'price', 'position')
        extra_args = {
            'time': {'read_only': True}
        }

    def update(self, instance, validated_data):
        validated_data.pop('restaurant')
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance

    def validate(self, attrs):
        attrs['restaurant'] = self.context['restaurant']
        return super().validate(attrs)

    def get_restaurant_id(self, instance):
        return instance.restaurant.id


class TimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Time
        fields = ('day', 'open_time', 'close_time')
        extra_kwargs = {
            'day': {'read_only': True},
        }

    def update(self, instance, validated_data):
        for key, value in validated_data.items():                #edit made here
            setattr(instance, key, value)
        instance.save()
        return instance

    def validate(self, attrs):
        if 'open' in attrs and 'close' in attrs:  #if both are specified
            if attrs['open'].replace(tzinfo=None) >= attrs['close'].replace(tzinfo=None):  #verrify that restaurant opens before it closes
                raise ValidationError('Times given are invalid')
        elif 'open' in attrs or 'close' in attrs:  #check for XOR open and close
            raise ValidationError('Must specify BOTH open and close')  
        return super().validate(attrs)  #otherwise, all is good and we validate the data
