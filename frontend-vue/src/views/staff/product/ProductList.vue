<template>
  <div class="container mt-3">
    <h4>Danh sách sản phẩm</h4>
    <div class="row my-3">
      <div class="col">
        <form @submit.prevent="fetchProductList()">
          <input v-model="name" class="form-control" placeholder="Tìm theo tên sản phẩm">
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="text-center">
          <th style="width:5%">STT</th>
          <th style="width:15%">Mã</th>
          <th style="width:20%">Tên</th>
          <th style="width:15%">Đơn giá</th>
          <th style="width:25%">Ảnh</th>
          <th style="width:20%"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-if='items && items.length == 0'>
          <td colspan="4">Không có sản phẩm nào</td>
        </tr>
        
        <tr v-for='(p,i) in items||[]' :key='i'>
          <td class="text-center">{{ i+1+offset }}</td>
          <td>{{ p.code }}</td>
          <td>{{ p.name }}</td>
          <td class="text-center">{{p.price}}</td>
          <td class="text-center">
            <img v-if="p.image" style="width: 90%; max-height: 250px;" :src="backEndUrl + p.image">
          </td>
          <td class="text-center">
            <router-link class="btn btn-secondary mr-2" :to='`/staff/product/update/${p.id}`'>
              Chỉnh sửa
            </router-link>
            <button class="btn btn-danger" @click="confirmDelete(p.id)">Xóa</button>
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
    <router-link class="btn btn-primary mb-3" to="/staff/product/create">
      Thêm nhóm sản phẩm
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import {BACKEND_URL, PAGE_SIZE} from "@/utils/Constants";

export default {
  data() {
    return {
      backEndUrl: BACKEND_URL,
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
      if(confirm('Bạn có muốn xóa sản phẩm này')) {
        axios.delete(`/api/product/${id}/`).then(result => {
          console.log(result);
          this.fetchProductList();
        }).catch(e => this.error = e.toString());
      }
    },

    fetchProductList() {
      axios.get(`/api/product/count?name=${this.name}`).then(result => {
        this.total = result.data.count;
      });

      let start = (this.page - 1) * this.pageSize;

      axios.get(`/api/product/search?name=${this.name}&start=${start}&count=${this.pageSize}`).then(
        result => this.items = result.data
      );
    },
  },

  mounted() {
    this.fetchProductList();
  },

  computed: {
    offset() {
      return (this.page-1) * this.pageSize;
    }
  },

  watch: {
    page: function(newVal, oldVal){
      if(newVal != oldVal) {
        this.fetchProductList();
      }
    }
  }
};
</script>

<style>
</style>