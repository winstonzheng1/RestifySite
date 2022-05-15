from rest_framework import permissions
from rest_framework.generics import ListAPIView, GenericAPIView

from restaurants.models import Restaurant

from blogs.models import BlogPost, RestaurantFollow
from blogs.serializers.blogpostserializer import BlogPostSerializer


class ContextPatcher(GenericAPIView):
    def get_serializer_context(self):
        context = super().get_serializer_context()
        query_set = Restaurant.objects.filter(owner=self.request.user)
        if query_set.exists():
            context.update({'restaurant': query_set.first()})
            return context
        else:
            return context


class Feed(ContextPatcher, ListAPIView):
    model = BlogPost
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        follow_list = RestaurantFollow.objects.filter(user=self.request.user)
        followed_restaurants = set()
        for i in follow_list:
            followed_restaurants.add(i.restaurant.id)
        return BlogPost.objects.filter(post_restaurant__id__in=followed_restaurants).order_by('-post_create_time')  #order in descending