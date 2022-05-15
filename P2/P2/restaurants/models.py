from django.db import models

from accounts.models import User  #owner is a User
from django.db.models import CASCADE  #cascades a delete to remove dangling references
from django.core.validators import RegexValidator

# Create your models here.

##
# classes for choice fields 
##

#choose day of week
#this will be used for restaurant times and hours
class Day(models.TextChoices):
    SUNDAY = 'sunday', 'Sunday'
    MONDAY = 'monday', 'Monday'
    TUESDAY = 'tuesday', 'Tuesday'
    WEDNESDAY = 'wednesday', 'Wednesday'
    THURSDAY = 'thursday', 'Thursday'
    FRIDAY = 'friday', 'Friday'
    SATURDAY = 'saturday', 'Saturday'

#restaurant theme, we have several choices, ideally we'd have many but that's a bit out of scope
#this will be used for choosing the theme of the restaurant
class RestaurantTheme(models.TextChoices):
    #defined in our P1
    ITALIAN = 'italian', 'Italian'
    ASIAN = 'asian', 'Asian'
    BISTRO = 'bistro', 'Bistro'
    NEWAMERICAN = 'newamerican', 'New American'
    #extra choices defined outside of P1
    FASTFOOD = 'fastfood', 'Fast Food'
    FOODTRUCK = 'foodtruck', 'Food Truck'
    BUFFET = 'buffet', 'Buffet'


##
# Views for restaurant and restaurant setup
##


class Restaurant(models.Model):

    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

    address = models.CharField(max_length=128)

    #specified by P1 handout that restaurant has owner, and owner owns one restaurant
    owner = models.OneToOneField(to=User, on_delete=CASCADE, )  #when owner is deleted we remove the restaurant


    ##
    #about the restaurant
    ##
    description = models.TextField(blank=True)
    #this is the image that will be displayed on card views of the restaurant, other images will be another model so that we can store multiple
    primary_image = models.ImageField(upload_to='restaurants/primary_image/', blank=True) 
    banner = models.ImageField(upload_to='restaurants/banner/', blank=True)
    #this attribute will be referenced when creating multiples images (which will be at the bottom of the page as seen in P1)
    image = models.ImageField(upload_to='restaurants/image/', blank=True)
    #all image attributes have different sources for easy retrieval later
    theme = models.CharField(choices=RestaurantTheme.choices, max_length=128, blank=True)




    ##
    #contact info displayed on restaurant page
    ##
    website = models.URLField(max_length=253, blank=True)  #max website length is 253, can not have a website
    email = models.EmailField(blank=True)  #doesn't have max, but will be verrified later
    phone = models.CharField(validators=[
                                        RegexValidator(regex=r'^\d{3}-\d{3}-\d{4}$',   
                                        message="Invalid format for phone number. Example: 123-123-1234")
                                        ], 
                                        max_length=12, blank=True) 
    # a fax number is a phone number so we verrify the same (fun fact: I've never sent a fax)
    fax = models.CharField(validators=[
                                        RegexValidator(regex=r'^\d{3}-\d{3}-\d{4}$',   
                                        message="Invalid format for phone number. Example: 123-123-1234")
                                        ], 
                                        max_length=12, blank=True)


    ##
    # blog and feed statistics, useful for other stuff; not sure if seen on restaurant page in P1
    ##
    number_likes = models.IntegerField(default=0, blank=True)
    number_follows = models.IntegerField(default=0, blank=True)

class RestaurantImage(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)  #the restaurant that the image belongs to, if restaurant deleted, remove all the images associated with it
    image = models.ImageField(upload_to='restaurants/image/')
    #the position in the image gallery, i.e. where it's listed in the gallery either 1st, 2nd, ... 
    position = models.IntegerField(default=0, blank=True)


class FoodItem(models.Model):
    name = models.CharField(max_length=128)
    def __str__(self):
        return self.name

    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)  # a FoodItem belongs to a restaurant's menu

    #Food details, i.e. about the item, price, and it's position on the menu
    details = models.TextField()
    price = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True) #max price less than 1k, 2 decimal places for cents
    #the position on the menu, i.e. where it's listed on the menu either 1st, 2nd, ... 
    position = models.IntegerField(default=0, blank=True)


class Time(models.Model):
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE)  #the restaurant that the time belongs to, delete all times when restaurant is deleted
    day = models.CharField(choices=Day.choices, max_length=128) #use day class to give choices for day of week
    #give the following an option to be blank, as menu times might not be concrete at time of creation
    open_time = models.TimeField(null=True, blank=True) #restaurant opens at given time
    close_time = models.TimeField(null=True, blank=True)  #restaurant closes at given time



