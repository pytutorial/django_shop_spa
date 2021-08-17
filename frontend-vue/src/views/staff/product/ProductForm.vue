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

              <error-list :errors="errors.category"></error-list>
            </td>
          </tr>
          <tr>
            <th>Mã SP:</th>
            <td>
              <input class="form-control" name="code" v-model="product.code">
              <error-list :errors="errors.code"></error-list>
            </td>
          </tr>
          <tr>
            <th>Tên SP:</th>
            <td>
              <input class="form-control" name="name" v-model="product.name">
              <error-list :errors="errors.name"></error-list>
            </td>
          </tr>
          <tr>
            <th>Đơn giá:</th>
            <td>
              <input type="number" min="0" class="form-control" name='price' v-model="product.price"/>
              <error-list :errors="errors.price"></error-list>
            </td>
          </tr>
          <tr>
            <th>Ảnh:</th>
            <td>
              <input type="file" class="form-control-file" name='image' />
              <a v-if="product.image" target="_blank" :href="product.image">
                <small>Ảnh đã upload</small>
              </a>
              <error-list :errors="errors.image"></error-list>
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
import ErrorList from "@/components/ErrorList";
import {savePageStates} from "@/utils/Helper";

export default {
  components: {ErrorList},

  data(){
    return {
      categoryList: [],
      product: {},
      errors: {}
    }
  },

  methods: {
    saveProduct() {
      this.errors = {};
      let data = new FormData(document.getElementById('fmt'));      
      let id = this.$route.params.id;

      let method, url;

      if(!id){
        method = 'post';
        url = '/api/product/';
      }else{
        method = 'put';
        url = `/api/product/${id}/`;
      }

      axios({method,url,data})
        .then(() => {
          if(method == 'post') {    // reset data
            savePageStates('productList', '{}');
          }
          this.$router.push('/staff/product');
        }).catch(e => {
          this.errors = e.response.data;
        });
    }
  },

  mounted() {
    axios.get('/api/category/').then(result => this.categoryList = result.data);
    
    let id = this.$route.params.id;
    if(id) {
      axios.get(`/api/product/${id}`).then(result => this.product = result.data);      
    }
  }
};
</script>

<style>
</style>