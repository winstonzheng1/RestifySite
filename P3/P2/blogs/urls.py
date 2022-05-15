from django.urls import path, re_path


#import the views from accounts.views
from blogs.views.blogpost import CreatePostApiView, ViewPostApiView, ListPostApiView, PostLikeView, PostUnlikeView
from blogs.views.restaurant import RestaurantLikeView, RestaurantUnlikeView, RestaurantFollowView, \
    RestaurantUnfollowView
from blogs.views.feed import Feed
from blogs.views.notification import NotificationView, ListNotificationApiView, NotificationDeleteView

app_name = 'blogs'

urlpatterns = [
    #default view
    re_path(r'^createpost/?$', CreatePostApiView.as_view()),
    re_path(r'^viewpost/(?P<id>\d+)/?$', ViewPostApiView.as_view()),
    re_path(r'^viewlist/(?P<id>\d+)/?$', ListPostApiView.as_view()),
    re_path(r'^viewpost/like/(?P<id>\d+)/?$', PostLikeView.as_view()),
    re_path(r'^viewpost/unlike/(?P<id>\d+)/?$', PostUnlikeView.as_view()),
    re_path(r'^restaurants/like/(?P<id>\d+)/?$', RestaurantLikeView.as_view()),
    re_path(r'^restaurants/unlike/(?P<id>\d+)/?$', RestaurantUnlikeView.as_view()),
    re_path(r'^restaurants/follow/(?P<id>\d+)/?$', RestaurantFollowView.as_view()),
    re_path(r'^restaurants/unfollow/(?P<id>\d+)/?$', RestaurantUnfollowView.as_view()),
    re_path(r'^notifications/remove/(?P<id>\d+)/?$', NotificationDeleteView.as_view()),
    re_path(r'^feed/?$', Feed.as_view()),
    re_path(r'^notifications/(?P<user_id>\d+)/?$', ListNotificationApiView.as_view()),
   # re_path(r'^notifications/list/<int:notification_id>/', ListNotificationApiView.as_view())
]
