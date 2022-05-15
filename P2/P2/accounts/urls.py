from django.urls import path


#for future token use
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



#import the views from accounts.views
from accounts.views import User, UserByID


app_name = 'accounts'

urlpatterns = [
    #default view
    path('', User.as_view()),
    #see account view
    path('<int:account_id>/', UserByID.as_view()),
    #token stuff for rest api
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]
