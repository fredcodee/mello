from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
 

urlpatterns = [
    path('', accountsApi, name='accounts'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]