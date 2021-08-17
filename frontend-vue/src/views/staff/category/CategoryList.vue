<template>
  <div class="container mt-3">
    <h4>Danh sách nhóm sản phẩm</h4>
    <div class="row my-3">
      <div class="col">
        <form id="fmt" @submit.prevent="searchCategory()">
          <input :value="keyword" name="keyword" class="form-control" placeholder="Tìm theo tên nhóm sản phẩm">
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
            <router-link class="btn btn-sm btn-secondary mr-2" :to='`/staff/category/update/${c.id}`'>
              Chỉnh sửa
            </router-link>
            <button class="btn btn-sm btn-danger" @click="confirmDelete(c.id)">Xóa</button>
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
import {savePageStates, loadPageStates} from "@/utils/Helper";
import { PAGE_SIZE} from "@/utils/Constants";

export default {
  data() {
    return {
      pageName: 'categoryList',
      items: null,
      keyword: '',
      error: '',
      pageSize: PAGE_SIZE,
      page: 1,
      total: 0,       
    }
  },

  methods: {
    
    fetchCategoryList(keyword, page) {
      this.keyword = keyword ?? '';
      this.page = page ?? 1;
      savePageStates(this.pageName, {keyword: this.keyword, page: this.page});

      const start = (this.page - 1) * this.pageSize;
      const url = `/api/category/search?name=${this.keyword}&start=${start}&count=${this.pageSize}`;
     
      axios.get(url).then(result => {
        const {total, items} = result.data;
        this.total = total;
        this.items = items;
      });
    },

    searchCategory() {
      const data = new FormData(document.getElementById('fmt'));
      const keyword = data.get('keyword');
      this.fetchCategoryList(keyword, 1);
    },

    confirmDelete(id) {
      this.error = '';
      if(confirm('Bạn có muốn xóa nhóm sản phẩm này')) {
        axios.delete(`/api/category/${id}/`).then(() => {
          const pageOffset = (this.page > 1 && this.total === (this.page-1) * this.pageSize + 1) ? 1 : 0;
          this.fetchCategoryList(this.keyword, this.page - pageOffset);
        }).catch(e => this.error = e.toString());
      }
    },
  },

  computed: {
    offset() {
      return (this.page-1) * this.pageSize;
    }
  },

  watch: {
    page: function(newVal, oldVal){
      if(newVal != oldVal) {
        this.fetchCategoryList(this.keyword, newVal);
      }
    }
  },

  mounted() {
    const {keyword, page} = loadPageStates(this.pageName);
    this.fetchCategoryList(keyword, page);
  }
};
</script>

<style>
</style>