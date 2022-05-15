from django.urls import path

from restaurants.views import RestaurantSearch, RestaurantByID, RestaurantView, \
                            RestaurantImageCreateView, RestaurantImageView, RestaurantImageListView, \
                            TimeView, TimeListView,  \
                            FoodItemCreateView, FoodItemView, FoodItemListView


app_name = 'restaurants'

urlpatterns = [
    #sources for restaurant
    path('search/', RestaurantSearch.as_view()),
    path('', RestaurantView.as_view()),
    path('<int:restaurant_id>/', RestaurantByID.as_view()),

    #paths for image views
    path('image/list/<int:restaurant_id>/', RestaurantImageListView.as_view()),
    path('image/', RestaurantImageCreateView.as_view()),
    path('image/<int:image_id>/', RestaurantImageView.as_view()),

    #paths for time views
    path('hours/list/<int:restaurant_id>/', TimeListView.as_view()),
    path('hours/day/<str:day>/', TimeView.as_view()),

    #paths for menu views
    path('menu/list/<int:restaurant_id>/', FoodItemListView.as_view()),
    path('menu/', FoodItemCreateView.as_view()),
    path('menu/<int:menuitem_id>/', FoodItemView.as_view()),

]
