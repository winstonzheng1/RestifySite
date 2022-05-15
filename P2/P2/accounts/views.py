from django.shortcuts import render


from accounts.serializers import UserSerializer
from rest_framework.generics import RetrieveAPIView, get_object_or_404
from rest_framework import permissions
from django.contrib.auth import get_user_model
from rest_framework import mixins
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView

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


class UpdateAPIView(mixins.CreateModelMixin, RetrieveUpdateAPIView):
    def post(self, request, *args, **kwargs):  #inspired from documentation
        return self.create(request, *args, **kwargs)

# Create your views here.

#main view for user, what will be seen when you visit /accounts/
class User(UpdateAPIView):
    model = get_user_model()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def get_object(self):
        return self.request.user

# view for getting, after a user has posted an account or has generated and id in some way
class UserByID(RetrieveAPIView):
    model = get_user_model()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def get_object(self):
        return get_object_or_404(self.model.objects.filter(id=self.kwargs['account_id']))


