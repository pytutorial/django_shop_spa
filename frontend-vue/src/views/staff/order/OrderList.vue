<template>
  <div class="container mt-3">
    <h4>Danh sách đơn hàng</h4>
    <div class="row my-3">
      <div class="col">
        <form id="fmt" @submit.prevent="searchOrder()">
          <input name="keyword" :value="keyword" class="form-control" placeholder="Tìm theo tên sản phẩm">
        </form>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr class="text-center">
          <th style="width: 5%;">STT</th>
          <th style="width: 20%;">Khách hàng</th>
          <th style="width: 20%;">Sản phẩm</th>
          <th style="width: 10%;">Số lượng</th>
          <th style="width: 15%;">Ngày đặt hàng</th>
          <th style="width: 20%;">Trạng thái</th>
          <th style="width: 10%;"></th>
        </tr>
      </thead>
      <tbody>        
        <tr v-if="items && items.length == 0">
          <td colspan="7">Không có đơn hàng nào</td>
        </tr>
        
        <tr v-for='(o,i) in items||[]' :key="i">
          <td class="text-center">{{i+1+offset}}</td>
          <td>{{o.customerName}}</td>
          <td>{{o.productName}}</td>
          <td class="text-center">{{o.qty}}</td>
          <td class="text-center">{{o.orderDate}}</td>
          <td>
            <span v-if="o.status==0"> Đang chờ giao hàng </span>
            <span v-else-if="o.status==1"> Đã giao hàng </span>
            <span v-else-if="o.status==2"> Đã hủy </span>            
          </td>
          <td class="text-center">
            <router-link class="btn btn-secondary" :to='`/staff/order/view-detail/${o.id}`'>
              Xem
            </router-link>
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

  </div>
</template>

<script>
import axios from "axios";
import {savePageStates, loadPageStates} from "@/utils/Helper";
import { PAGE_SIZE} from "@/utils/Constants";

export default {
  data() {
    return {
      pageName: 'orderList',
      items: null,
      keyword: '',
      pageSize: PAGE_SIZE,
      page: 1,
      total: 0, 
    }
  },

  methods: {
    fetchOrderList(keyword, page) {
      this.keyword = keyword ?? '';
      this.page = page ?? 1;
      savePageStates(this.pageName, {keyword: this.keyword, page: this.page});

      let start = (this.page - 1) * this.pageSize;
      let url = `/api/order/search?keyword=${this.keyword}&start=${start}&count=${this.pageSize}`;
      
      axios.get(url).then(result => {
        const {total, items} = result.data;
        this.total = total;
        this.items = items;
      });
        
    },
  
    searchOrder() {
      const data = new FormData(document.getElementById('fmt'));
      const keyword = data.get('keyword');
      this.fetchOrderList(keyword, 1);
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
        this.fetchOrderList(this.keyword, newVal);
      }
    }
  },

  mounted() {
    const {keyword, page} = loadPageStates(this.pageName);
    this.fetchOrderList(keyword, page);
  }
};
</script>