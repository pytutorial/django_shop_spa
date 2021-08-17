from datetime import datetime
import time
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework import viewsets
from rest_framework.views import status

from django.db.models import Q

from django.contrib.auth.models import User
from .serializers import *
from .models import *
from .constants import PAGE_SIZE

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

    @action(detail=False, methods=['get'])
    def search(self, request):
        name = request.GET.get('name', '')
        
        start = request.GET.get('start', '')
        start = int(start) if start.isdigit() else 0
        
        count = request.GET.get('count', '')
        count = int(count) if count.isdigit() else PAGE_SIZE

        categoryList = Category.objects.filter(name__icontains=name).order_by('-id')
        total = categoryList.count()
        items = categoryList[start:start+count]

        data = CategorySerializer(items, many=True).data
        return Response({'items': data, 'total': total})

    @action(detail=True, methods=['get'])
    def get_detail(self, request, pk):
        time.sleep(2)
        category = Category.objects.get(pk=pk)
        data = CategorySerializer(instance=category).data
        return Response(data)

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    
    priceRangeList = [
        {'max': 10},
        {'min': 10, 'max': 20},
        {'min': 20}
    ]

    def searchProduct(self, params):
        name = params.get('name')
        categoryId = params.get('categoryId')
        priceRangeId = params.get('priceRangeId', '')

        productList = Product.objects.all()
        
        if name:
            productList = productList.filter(name__icontains=name)

        if categoryId:
            productList = productList.filter(category__id=categoryId)

        if priceRangeId and priceRangeId.isdigit():
            priceRangeId = int(priceRangeId)
            if 0 < priceRangeId <= len(self.priceRangeList):
                priceRange = self.priceRangeList[priceRangeId-1]
                minPrice = priceRange.get('min')
                maxPrice = priceRange.get('max')

                if minPrice:
                    productList = productList.filter(price__gte=minPrice*1e6)

                if maxPrice:
                    productList = productList.filter(price__lte=maxPrice*1e6)

        return productList

    @action(detail=False, methods=['get'])
    def search(self, request):        
        start = request.GET.get('start', '')
        start = int(start) if start.isdigit() else 0
        
        count = request.GET.get('count', '')
        count = int(count) if count.isdigit() else PAGE_SIZE

        productList = self.searchProduct(request.GET).order_by('-id')
        total = productList.count()
        items = productList[start:start+count]

        data = ProductSerializer(items, many=True).data
        return Response({'items': data, 'total': total})

@api_view(['post'])
def signup(request):
    username = request.data.get('username', '')
    password = request.data.get('password', '')

    error = ''
    if username == '':
        error = 'Tên đăng nhập không được bỏ trống'

    elif User.objects.filter(username=username):
        error = 'Tên đăng nhập đã tồn tại'
    
    elif len(password) < 8:
        error = 'Mật khẩu phải có ít nhất 8 kí tự'
    
    elif password.isdigit():
        error = 'Mật khẩu không được chỉ chứa toàn chữ số'
    
    if error == '':
        user = User.objects.create_user(username=username, password=password)
        return Response({'success' : True})
    else:
        return Response({'error': error}, 
                    status=status.HTTP_400_BAD_REQUEST)


@api_view(['get'])
def searchOrder(request):
    keyword = request.GET.get('keyword')
    orderList = Order.objects.all()
    if keyword:
        orderList = orderList.filter(
                Q(product__name__icontains=keyword)|
                Q(customerName__icontains=keyword)|
                Q(customerPhone__icontains=keyword)
            )
    
    orderList = orderList.order_by('status', '-orderDate')

    total = orderList.count()

    start = request.GET.get('start', '')
    start = int(start) if start.isdigit() else 0
    
    count = request.GET.get('count', '')
    count = int(count) if count.isdigit() else PAGE_SIZE
    
    items = orderList[start:start+count]
    serializer = OrderSerializer(items, many=True)
    return Response({'items': serializer.data, 'total': total})

@api_view(['get'])
def getOrderDetail(request, id):
    order = get_object_or_404(Order,id=id)
    return Response(OrderSerializer(order).data)

@api_view(['post'])
def confirmOrder(request, id):
    order = get_object_or_404(Order,id=id)
    order.status = Order.Status.DELIVERED
    order.deliverDate = datetime.now()
    order.save()
    return Response({'success': True})

@api_view(['post'])
def cancelOrder(request, id):
    order = get_object_or_404(Order,id=id)
    order.status = Order.Status.CANCELLED            
    order.save()
    return Response({'success': True})

@api_view(['post'])
def orderProduct(request, id):
    serializer = OrderSerializer(data=request.data)

    if serializer.is_valid():
        product = Product.objects.get(id=id)
        data = request.data
        order = Order()
        order.product = product
        order.qty = int(data.get('qty'))
        order.priceUnit = product.price
        order.total = order.qty * order.priceUnit
        order.customerName = data.get('customerName')
        order.customerPhone = data.get('customerPhone')
        order.customerAddress = data.get('customerAddress')
        order.orderDate = datetime.now()
        order.status = Order.Status.PENDING
        order.save()
        return Response({'success': True})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
