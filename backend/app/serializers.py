from django.core.validators import MinValueValidator
from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    categoryName = serializers.CharField(read_only=True, default='', source='category.name')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'qty', 'productName', 'priceUnit', 'total',
                    'customerName', 'customerPhone', 'customerAddress', 
                    'orderDate', 'deliverDate', 'status']

    qty = serializers.IntegerField(validators=[MinValueValidator(1)])
    productName = serializers.CharField(default='', source='product.name')
    priceUnit = serializers.IntegerField(read_only=True)
    total = serializers.IntegerField(read_only=True)
    orderDate = serializers.DateTimeField(read_only=True, format="%d/%m/%Y %H:%M:%S")
    deliverDate = serializers.DateTimeField(read_only=True, format="%d/%m/%Y %H:%M:%S")
    status = serializers.IntegerField(read_only=True)

    def validate_customerPhone(self, phone):        
        if phone:
            if phone[0] != '0' or not phone.isdigit():
                raise serializers.ValidationError('Số điện thoại không hợp lệ')

            elif len(phone) != 10 and len(phone) != 11:
                raise serializers.ValidationError('Số điện thoại phải có 10/11 số')
           
    #def validate(self, data):
    #    raise serializers.ValidationError({f'order[{0}].name': 'This field is required'})