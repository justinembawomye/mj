from django.urls import path
from .views import RegistrationAPIView, LoginAPIView, current_user


urlpatterns = [
    path('signup/', RegistrationAPIView.as_view(), name='user_registration'),
    path('login/', LoginAPIView.as_view(), name='user_login'),
     path('current_user/', current_user),
]