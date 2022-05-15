from django.urls import path, re_path


#for future token use
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



#import the views from accounts.views
from accounts.views import User, UserByID


app_name = 'accounts'

urlpatterns = [
    #default view
    #re_path('', User.as_view()),
    #see account view
    #re_path(r'^(?P<account_id>\d+)/?$', UserByID.as_view()),
    #token stuff for rest api
   # path('token/', TokenObtainPairView.as_view()),
    #re_path(r'^token/refresh/?$', TokenRefreshView.as_view()),
    path('', User.as_view()),
    path('<int:account_id>/', UserByID.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]
