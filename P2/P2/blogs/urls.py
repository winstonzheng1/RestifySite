from django.urls import path



#import the views from accounts.views
from blogs.views.blogpost import CreatePostApiView, ViewPostApiView, ListPostApiView, PostLikeView, PostUnlikeView
from blogs.views.restaurant import RestaurantLikeView, RestaurantUnlikeView, RestaurantFollowView, \
    RestaurantUnfollowView
from blogs.views.feed import Feed
from blogs.views.notification import NotificationView, ListNotificationApiView

app_name = 'blogs'

urlpatterns = [
    #default view
    path('createpost/', CreatePostApiView.as_view()),
    path('viewpost/<int:id>', ViewPostApiView.as_view()),
    path('viewlist/<int:id>', ListPostApiView.as_view()),
    path('viewpost/like/<int:id>', PostLikeView.as_view()),
    path('viewpost/unlike/<int:id>', PostUnlikeView.as_view()),
    path('restaurants/like/<int:id>', RestaurantLikeView.as_view()),
    path('restaurants/unlike/<int:id>', RestaurantUnlikeView.as_view()),
    path('restaurants/follow/<int:id>', RestaurantFollowView.as_view()),
    path('restaurants/unfollow/<int:id>', RestaurantUnfollowView.as_view()),

    path('feed/', Feed.as_view()),
    path('notifications/', NotificationView.as_view()),
    path('notifications/list/<int:notification_id>/', ListNotificationApiView.as_view())
]
