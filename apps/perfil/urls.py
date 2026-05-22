from django.urls import path, include
from .views import PerfilViewSet, RegistroViewSet
from rest_framework.routers import DefaultRouter
from .views import EmailTokenObtainPairView

from rest_framework_simplejwt.views import TokenRefreshView


router = DefaultRouter()
router.register(r'perfil',PerfilViewSet,basename='perfil')
router.register(r'registro',RegistroViewSet,basename='registro')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
