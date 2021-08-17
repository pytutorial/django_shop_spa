<template>
  <div class="container mt-3">    
    <h4>Thông tin nhóm sản phẩm</h4>
    <form id="fmt" @submit.prevent="saveCategory()">
      <table class="table">
        <tbody>
          <tr>
            <th>Mã nhóm:</th>
            <td>
              <input class="form-control" name="code" v-model="category.code">
              <error-list :errors="errors.code"></error-list>
            </td>
          </tr>
          <tr>
            <th>Tên nhóm:</th>
            <td>
              <input class="form-control" name="name" v-model="category.name">
              <error-list :errors="errors.name"></error-list>
            </td>
          </tr>
        </tbody>
      </table>      
      <router-link class="btn btn-secondary mr-2" to="/staff">
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
      category: {},
      errors: {}
    }
  },

  methods: {
    saveCategory() {
      const data = new FormData(document.getElementById('fmt'));      
      const id = this.$route.params.id;

      let method, url;
      
      if(!id){
        method = 'post';
        url = '/api/category/';
      }else{
        method = 'put';
        url = `/api/category/${id}/`;
      }

      axios({method,url,data})
        .then(() => {
          if(method == 'post') {    // reset data
            savePageStates('categoryList', '{}');
          }
          this.$router.push('/staff/');
        }).catch(e => {
          this.errors = e.response.data;
        });
    }
  },

  mounted() {
    let id = this.$route.params.id;
    if(id) {
      axios.get(`/api/category/${id}`).then(result => this.category = result.data);      
    }
  }
};
</script>

<style>
</style>