from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import get_user_profile,CustomTokenObtainPairView,CustomRefreshToekn,register,authenticated,toggleFollow
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('user_data/<str:pk>/',get_user_profile),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshToekn.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('authenticated/', authenticated),
    path('toggle_follow/', toggleFollow),
  
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
