<template>
  <div class="container mt-5 mb-5">
    <form id="fmt" @submit.prevent="orderProduct()">
      
      <h4>Đặt mua hàng trực tuyến</h4>
      <table class="table table-form">
        <tr>
          <th colspan="2">
            <h5>Thông tin sản phẩm</h5>
          </th>
        </tr>
        <tr>
          <th style="width:30%">Tên sản phẩm:</th>
          <td>{{product.name}}</td>
        </tr>
        <tr>
          <th>Đơn giá:</th>
          <td>{{product.price}} ₫</td>
        </tr>
        <tr>
          <th>Số lượng:</th>
          <td>
            <div style="width:50px">
              <input type="number" class="form-control" name="qty" value="1" min="1" />
            </div>
            <ul style="color:red">
              <li v-for="(e,i) in errors['qty']||[]" :key="i">{{e}}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th colspan="2">
            <h5>Thông tin người mua hàng</h5>
          </th>
        </tr>
        <tr>
          <th>Họ và tên:</th>
          <td>
            <input class="form-control" name="customerName" />
            <ul style="color:red">
              <li v-for="(e,i) in errors['customerName']||[]" :key="i">{{e}}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>Số điện thoại:</th>
          <td>
            <input class="form-control" name="customerPhone" />
            <ul style="color:red">
              <li v-for="(e,i) in errors['customerPhone']||[]" :key="i">{{e}}</li>
            </ul>
          </td>
        </tr>
        <tr>
          <th>Địa chỉ:</th>
          <td>
            <input class="form-control" name="customerAddress" />
            <ul style="color:red">
              <li v-for="(e,i) in errors['customerAddress']||[]" :key="i">{{e}}</li>
            </ul>
          </td>
        </tr>
      </table>
      <button type="submit" class="btn btn-primary">
        Đặt mua
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {},
      errors: {}
    }
  },

  methods: {
    async orderProduct() {
      let id = this.$route.params.id;
      if(id) {
        this.errors = {};
        let data = new FormData(document.getElementById('fmt'));
        axios.post(`/api/order-product/${id}`, data).then(result => {
          console.log(result);
          this.$router.push('/thank-you');

        }).catch(e => {
          this.errors = e.response.data || {};
        })
      }
    }
  },

  async mounted() {
    let id = this.$route.params.id;
    if (id) {
      axios.get(`/api/product/${id}`).then((result) => this.product = result.data);
    }
  }
}
</script>

<style>

</style>