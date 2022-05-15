from django.db import models

from django.contrib.auth.models import AbstractUser
#from phonenumber_field.modelfields import PhoneNumberField     #not using this anymore, leaving here just incase
from django.core.validators import RegexValidator



class User(AbstractUser):
    avatar = models.ImageField(upload_to='accounts/avatar/', blank=True)
    #use a regex validator to validate the phone number according to a standard phone number regex (csc207 memories lol) 
    phone_number = models.CharField(validators=[
                                    RegexValidator(regex=r'^\d{3}-\d{3}-\d{4}$',   
                                    message="Invalid format for phone number. Example: 123-123-1234")
                                    ], 
                                     max_length=12, blank=True)
    
    


