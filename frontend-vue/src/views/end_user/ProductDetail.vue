<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-6">
        <img v-if="product.image" class='product-detail-image' :src="product.image">
      </div>

      <div class="col-6 mt-5">
        <div class='product-detail-title'>{{product.name}}</div>
        <br>
        <table class="table">
          <tr>
            <td>Hãng sản xuất:</td>
            <td>{{product.categoryName}}</td>
          </tr>
          <tr>
            <td>Giá bán:</td>
            <td><b>{{product.price}} ₫</b></td>
          </tr>
        </table>
        <br>
        <router-link class="btn btn-secondary mr-2" to="/">Quay lại</router-link>
        <router-link class="btn btn-primary" :to="`/order-product/${product.id}`">Mua hàng</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    let id = this.$route.params.id;
    if (id) {
      axios.get(`/api/product/${id}`).then((result) => this.product = result.data);
    }
  },
};
</script>

<style>
.product-detail-title {
  font-size: 24px;
  font-weight: bold;
}

.product-detail-image {
  width: 100%;
}
</style>