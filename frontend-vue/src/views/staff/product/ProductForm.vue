<template>
  <div class="container mt-3">    
    <h4>Thông tin sản phẩm</h4>
    <form id="fmt" @submit.prevent="saveProduct()">
      <table class="table">
        <tbody>
          <tr>
            <th>Nhóm SP:</th>
            <td>
              <select class="form-control" name='category' v-model="product.category">
                <option value=''>----Chọn nhóm sản phẩm----</option>
                <option v-for="(c,i) in categoryList" :key="i" :value="c.id">
                  {{c.name}}
                </option>
              </select>

              <ul style="color:red">
                <li v-for="(e,i) in category_errors" :key="i">{{e}}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Mã SP:</th>
            <td>
              <input class="form-control" name="code" v-model="product.code">
              <ul style="color:red">
                <li v-for="(e,i) in code_errors" :key="i">{{e}}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Tên SP:</th>
            <td>
              <input class="form-control" name="name" v-model="product.name">
              <ul style="color:red">
                <li v-for="(e,i) in name_errors" :key="i">{{e}}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Đơn giá:</th>
            <td>
              <input type="number" min="0" class="form-control" name='price' v-model="product.price"/>

              <ul style="color:red">
                <li v-for="(e,i) in price_errors" :key="i">{{e}}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Ảnh:</th>
            <td>
              <input type="file" class="form-control-file" name='image' />
              <ul style="color:red">
                <li v-for="(e,i) in image_errors" :key="i">{{e}}</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>      
      <router-link class="btn btn-secondary mr-2" to="/staff/product">
        Quay lại
      </router-link>
      <button type="submit" class="btn btn-primary">Lưu lại</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      categoryList: [],
      product: {},
      errors: {}
    }
  },
  methods: {
    async fetchCategoryList() {
      axios.get('/api/category/').then(result => this.categoryList = result.data);
    },

    async fetchProduct() {
      let id = this.$route.params.id;
      if(id) {
        axios.get(`/api/product/${id}`).then(result => this.product = result.data);      
      }
    },

    async saveProduct() {
      this.errors = {};
      let data = new FormData(document.getElementById('fmt'));      
      let id = this.$route.params.id;
      let success_cb = (result) => { console.log(result); this.$router.push('/staff/product') };
      let error_cb = e => this.errors = e.response.data;

      if(id){
        axios.patch(`/api/product/${id}/`, data)
          .then(success_cb)
          .catch(error_cb);
      }else{
        axios.post('/api/product/', data)
          .then(success_cb)
          .catch(error_cb);
      }
    }
  },

  computed: {
    code_errors() {
      return this.errors['code'] || [];
    },

    name_errors() {
      return this.errors['name'] || [];
    },

    category_errors() {
      return this.errors['category'] || [];
    },

    price_errors() {
      return this.errors['price'] || [];
    },

    image_errors() {
      return this.errors['image'] || [];
    },
  },

  async mounted() {
    this.fetchCategoryList();
    this.fetchProduct();
  }
};
</script>

<style>
</style>