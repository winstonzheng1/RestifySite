from django.urls import path



#import the views from accounts.views
from comments.views import CreateCommentView, ViewCommentView, ListCommentView

app_name = 'comments'

urlpatterns = [
    #default view
    path('createcomment/<int:id>', CreateCommentView.as_view()),
    path('viewcomment/<int:id>', ViewCommentView.as_view()),
    path('restaurant/<int:id>', ListCommentView.as_view()),
]
