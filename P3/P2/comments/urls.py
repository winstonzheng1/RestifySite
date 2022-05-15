from django.urls import path, re_path



#import the views from accounts.views
from comments.views import CreateCommentView, ViewCommentView, ListCommentView

app_name = 'comments'

urlpatterns = [
    #default view
    re_path(r'^createcomment/(?P<id>\d+)/?$', CreateCommentView.as_view()),
    re_path(r'^viewcomment/(?P<id>\d+)/?$', ViewCommentView.as_view()),
    re_path(r'^restaurant/(?P<id>\d+)/?$', ListCommentView.as_view()),
]
