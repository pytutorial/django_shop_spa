<template>
  <div class="container mt-3">
    <h4>Danh sách nhóm sản phẩm</h4>
    <div class="row my-3">
      <div class="col">
        <form @submit.prevent="fetchCategoryList()">
          <input v-model="name" class="form-control" placeholder="Tìm theo tên nhóm sản phẩm">
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="text-center">
          <th style="width: 5%">STT</th>
          <th style="width: 35%">Mã</th>
          <th style="width: 40%">Tên</th>
          <th style="width: 20%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if='items && items.length == 0'>
          <td colspan="4">Không có nhóm sản phẩm nào</td>
        </tr>
        
        <tr v-for='(c,i) in items||[]' :key='i'>
          <td class="text-center">{{ i+1+offset }}</td>
          <td>{{ c.code }}</td>
          <td>{{ c.name }}</td>
          <td class="text-center">
            <router-link class="btn btn-secondary mr-2" :to='`/staff/category/update/${c.id}`'>
              Chỉnh sửa
            </router-link>
            <button class="btn btn-danger" @click="confirmDelete(c.id)">Xóa</button>
          </td>
        </tr>        
      </tbody>
    </table>

    <b-pagination
      v-if="total > pageSize"
      size="md"
      v-model="page"
      :total-rows="total"
      :per-page="pageSize"
    ></b-pagination>
    <label class="label">Tổng số : {{ total }} bản ghi</label>

    <div class="my-2" style="color:red">{{error}}</div>
    <router-link class="btn btn-primary" to="/staff/category/create">
      Thêm nhóm sản phẩm
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import { PAGE_SIZE} from "@/utils/Constants";

export default {
  data() {
    return {
      items: null,
      name: '',
      error: '',
      pageSize: PAGE_SIZE,
      page: 1,
      total: 0,       
    }
  },

  methods: {
    async confirmDelete(id) {
      this.error = '';
      if(confirm('Bạn có muốn xóa nhóm sản phẩm này')) {
        axios.delete(`/api/category/${id}/`).then(result => {
          console.log(result);
          this.fetchCategoryList();
        }).catch(e => this.error = e.toString());
      }
    },

    fetchCategoryList() {
      axios.get(`/api/category/count?name=${this.name}`).then(result => {
        this.total = result.data.count;
      });

      let start = (this.page - 1) * this.pageSize;

      axios.get(`/api/category/search?name=${this.name}&start=${start}&count=${this.pageSize}`).then(
        result => this.items = result.data
      );
    }
  },

  computed: {
    offset() {
      return (this.page-1) * this.pageSize;
    }
  },

  watch: {
    page: function(newVal, oldVal){
      if(newVal != oldVal) {
        this.fetchCategoryList();
      }
    }
  },

  mounted() {
    this.fetchCategoryList();
  }
};
</script>

<style>
</style>