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
              <ul style="color:red">
                <li v-for="(e,i) in code_errors" :key="i">{{e}}</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th>Tên nhóm:</th>
            <td>
              <input class="form-control" name="name" v-model="category.name">
              <ul style="color:red">
                <li v-for="(e,i) in name_errors" :key="i">{{e}}</li>
              </ul>
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

export default {
  data(){
    return {
      category: {},
      errors: {}
    }
  },
  methods: {
    async saveCategory() {
      let data = new FormData(document.getElementById('fmt'));      
      let id = this.$route.params.id;
      let success_cb = (result) => { console.log(result); this.$router.push('/staff') };
      let error_cb = e => this.errors = e.response.data;

      if(id){
        axios.put(`/api/category/${id}/`, data)
          .then(success_cb)
          .catch(error_cb);
      }else{
        axios.post('/api/category/', data)
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
    }
  },

  async mounted() {
    let id = this.$route.params.id;
    if(id) {
      axios.get(`/api/category/${id}`).then(result => this.category = result.data);      
    }
  }
};
</script>

<style>
</style>