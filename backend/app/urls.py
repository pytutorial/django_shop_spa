from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *

urlpatterns = [
    path('order-product/<id>', orderProduct),
    
    path('order/search', searchOrder),
    path('order/<id>', getOrderDetail),
    path('order/confirm/<id>', confirmOrder),
    path('order/cancel/<id>', cancelOrder),

    path('signup', signup)
]

# Category
router = DefaultRouter()
router.register('category', CategoryViewSet)
urlpatterns += router.urls

# Product
router = DefaultRouter()
router.register('product', ProductViewSet)
urlpatterns += router.urls