from django.shortcuts import render

from rest_framework import permissions, mixins
from rest_framework.generics import get_object_or_404, ListAPIView, RetrieveAPIView, RetrieveUpdateAPIView, CreateAPIView, GenericAPIView, RetrieveDestroyAPIView, RetrieveUpdateDestroyAPIView


#edit: missing import
from restaurants.models import Day  
from rest_framework.exceptions import NotFound, ValidationError
from django.shortcuts import get_list_or_404  

##
# A list of attributes and functions for the above rest_framework generics can be found at the following sources.
#https://www.cdrf.co/3.1/rest_framework.generics/RetrieveUpdateDestroyAPIView.html
#https://www.cdrf.co/3.12/rest_framework.generics/RetrieveDestroyAPIView.html
#https://www.cdrf.co/3.12/rest_framework.generics/GenericAPIView.html
#https://www.cdrf.co/3.12/rest_framework.generics/CreateAPIView.html
#https://www.cdrf.co/3.12/rest_framework.generics/RetrieveUpdateAPIView.html
#https://www.cdrf.co/3.12/rest_framework.generics/RetrieveAPIView.html
#
# I didn't copy code from theses sources. But they helped me better understand the syntax and return types beyond Ddjango documentation 
# (The Django docs kinda suck tbh)
##

from restaurants.models import Restaurant, FoodItem, RestaurantImage, Time
from restaurants.serializers import RestaurantSerializer, RestaurantImageSerializer, FoodItemSerializer, TimeSerializer


# Create your views here.


##
#Helper classes, mostly from documentation and stuff from class
##
class CreateRetrieveUpdateAPIView(mixins.CreateModelMixin, RetrieveUpdateAPIView):
    def post(self, request, *args, **kwargs):   #same from accounts.views
        return self.create(request, *args, **kwargs)


class RestaurantContextPatcher(GenericAPIView):  #inspired from documentation
    def get_serializer_context(self):
        context = super().get_serializer_context()
        query = Restaurant.objects.filter(owner=self.request.user)
        if query.exists():
            context.update({'restaurant': query.first()})
        return context

##
# Actual Views
##

##################### main restaurant views
class RestaurantSearch(ListAPIView):
    model = Restaurant
    serializer_class = RestaurantSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        query = self.model.objects.all()
        if 'food' in self.request.query_params:
            foods = FoodItem.objects.filter(name__icontains=self.request.query_params['food'])
            valid_set = set()
            for food in foods:
                valid_set.add(food.restaurant.id)
            for restaurant in query:
                if restaurant.id not in valid_set:
                    query = query.exclude(id=restaurant.id)
        if 'name' in self.request.query_params:
            query = query.filter(name__icontains=self.request.query_params['name'])
        if 'address' in self.request.query_params:
            query = query.filter(address__icontains=self.request.query_params['address'])
        return query.order_by('-number_follows')


class RestaurantByID(RetrieveAPIView):
    model = Restaurant
    serializer_class = RestaurantSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        #get_object_or_404 is quite simplistic, if it can't get the object then 404 is returned
        return get_object_or_404(self.model.objects.filter(id=self.kwargs['restaurant_id']))


class RestaurantView(CreateRetrieveUpdateAPIView):          #edit made here
    model = Restaurant
    serializer_class = RestaurantSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return get_object_or_404(self.model.objects.filter(owner=self.request.user))




############################ Restaurant Image views



#edits made: changed view names to distinguish from models

class RestaurantImageCreateView(RestaurantContextPatcher, CreateAPIView):
    model = RestaurantImage
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = RestaurantImageSerializer
    #nothing else needed for this 


class RestaurantImageView(RestaurantContextPatcher, RetrieveDestroyAPIView):   
    model = RestaurantImage
    serializer_class = RestaurantImageSerializer

    def get_object(self):
        instance = get_object_or_404(self.model.objects.filter(id=self.kwargs['image_id']))
        if self.request.method == 'GET':
            return instance

        restaurant_query = Restaurant.objects.filter(owner=self.request.user)
        if not restaurant_query.exists():
            raise ValidationError(f'You must create a restaurant first.')

        if instance.restaurant.id != restaurant_query.first().id:
            raise ValidationError(f'You do not own the menu item\'s image.')

        return instance

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()



class RestaurantImageListView(ListAPIView):
    model = RestaurantImage
    permission_classes = [permissions.AllowAny]
    serializer_class = RestaurantImageSerializer

    def get_queryset(self):
        return get_list_or_404(self.model.objects.filter(
            restaurant__id=self.kwargs['restaurant_id']).order_by('-position'))  #edit: spelling


################################### Restaurant time views 

class TimeView(RestaurantContextPatcher, RetrieveUpdateAPIView):
    model = Time
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TimeSerializer

    def get_object(self):
        restaurant_query = Restaurant.objects.filter(owner=self.request.user)
        if not restaurant_query.exists():
            raise NotFound(f'You must createa restaurant first.')

        if self.kwargs['day'] not in Day:
            raise ValidationError(f'Invalid day. Valid days are: {", ".join(list(Day))}.')

        query = self.model.objects.filter(restaurant=restaurant_query.first(), day=self.kwargs['day'])
        return query.first()


class TimeListView(ListAPIView):
    model = Time
    permission_classes = [permissions.AllowAny]
    serializer_class = TimeSerializer
    pagination_class = None

    def get_queryset(self):  #edit naive approach was unsuccessful
        #query = get_list_or_404(self.model.objects.filter(restaurant__id=self.kwargs['restaurant_id']))
        #return sorted(query, key=lambda x: list(Day).index(x.day))
        return get_list_or_404(self.model.objects.filter(restaurant__id=self.kwargs['restaurant_id']))

######################################## restaurant food views

class FoodItemCreateView(RestaurantContextPatcher, CreateAPIView):
    model = FoodItem
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FoodItemSerializer


class FoodItemView(RestaurantContextPatcher, RetrieveUpdateDestroyAPIView):
    model = FoodItem
    serializer_class = FoodItemSerializer

    def get_object(self):
        instance = get_object_or_404(self.model.objects.filter(id=self.kwargs['menuitem_id']))
        if self.request.method == 'GET':
            return instance

        restaurant_query = Restaurant.objects.filter(owner=self.request.user)
        if not restaurant_query.exists():
            raise ValidationError(f'You must create a restaurant first.')

        if instance.restaurant.id != restaurant_query.first().id:
            raise ValidationError(f'You do not own the menu item\'s restaurant.')

        return instance

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    


class FoodItemListView(ListAPIView):
    model = FoodItem
    permission_classes = [permissions.AllowAny]
    serializer_class = FoodItemSerializer

    def get_queryset(self):
        return get_list_or_404(self.model.objects.filter(restaurant__id=self.kwargs['restaurant_id']).order_by('-position'))
