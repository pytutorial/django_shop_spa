<template>
  <div class="container mt-3">
    <h4>Thông tin đơn hàng</h4>
    <table class="table">
      <tbody>
        <tr>
          <th>Tên khách hàng:</th>
          <td>{{order.customerName}}</td>
        </tr>
        <tr>
          <th>Điện thoại khách hàng:</th>
          <td>{{order.customerPhone}}</td>
        </tr>
        <tr>
          <th>Địa chỉ khách hàng:</th>
          <td>{{order.customerAddress}}</td>
        </tr>
        <tr>
          <th>Sản phẩm:</th>
          <td>{{order.productName}}</td>
        </tr>
        <tr>
          <th>Số lượng:</th>
          <td>{{order.qty}}</td>
        </tr>
        <tr>
          <th>Đơn giá:</th>
          <td>{{order.priceUnit}} đ</td>
        </tr>
        <tr>
          <th>Tổng tiền:</th>
          <td>{{order.total}} đ</td>
        </tr>
        <tr>
          <th>Ngày đặt hàng:</th>
          <td>{{order.orderDate}}</td>
        </tr>
        <tr v-if="order.status==1">
          <th>Ngày giao hàng</th>
          <td>{{order.deliverDate}}</td>
        </tr>
        <tr>
          <th>Trạng thái:</th>
          <td>
            <span v-if="order.status==0"> Đang chờ giao hàng </span>
            <span v-else-if="order.status==1"> Đã giao hàng </span>
            <span v-else-if="order.status==2"> Đã hủy </span> 
          </td>
        </tr>
      </tbody>
    </table>
    <div class="my-3" style="color:red">{{error}}</div>
    <router-link class="btn btn-secondary mr-2" to="/staff/order">
      Quay lại
    </router-link>
    <template v-if="order.status==0">
      <button class="btn btn-primary mr-2" type="button" @click="confirmOrder()">
        Xác nhận đơn hàng đã được giao
      </button>
      <button class="btn btn-danger" type="button" @click="cancelOrder()">
        Hủy đơn hàng
      </button>
    </template>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return{
      order: {},
      error: ''
    }
  },
  methods: {
    confirmOrder() {
      if(!confirm('Xác nhận đơn hàng đã được giao?')){
        return;
      }

      this.error = '';

      let id = this.$route.params.id;
      if(id) {
        axios.post(`/api/order/confirm/${id}`).then(() => {
          this.$router.push('/staff/order');
        }).catch(e => {
          this.error = e.toString();
        });
      }
    },

    cancelOrder() {
      if(!confirm('Hủy đơn hàng này')) {
        return;
      }
      
      this.error = '';
      let id = this.$route.params.id;
      if(id) {
        axios.post(`/api/order/cancel/${id}`).then(() => {
          this.$router.push('/staff/order');
        }).catch(e => {
          this.error = e.toString();
        });
      }
    }
  },

  mounted() {    
    let id = this.$route.params.id;
    
    if(id) {
      axios.get(`/api/order/${id}`).then(result => this.order = result.data);
    }
  }
};
</script>

<style>
</style>