<template>  
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-3 p-3 card">
        <form id="fmt" @submit.prevent="searchProduct()">
          <div class='product-search-info mt-3'>
            <label><b>Tên sản phẩm</b></label>
            <input name='keyword' :value="keyword" class="form-control" placeholder="Nhập tên sản phẩm để tìm">
          </div>

          <div class='category-search-info mt-3'>
            <label><b>Hãng sản xuất:</b></label>
            <div>
              <input type='radio' :checked="!categoryId" name='categoryId' value=''>
              <label>Tất cả</label>
            </div>
            
            <div v-for='c in categoryList' :key="c.id">
              <input type="radio" name='categoryId' :checked="c.id==categoryId" :value='c.id'>
              <label>{{c.name}}</label>
            </div>
            
          </div>

          <div class='price-search-info mt-3'>
            <label><b>Mức giá:</b></label>
            <div>
              <input type="radio" name="priceRangeId" :checked="!priceRangeId" value=''>
              <label>Tất cả</label>
            </div>

            <div>
              <input type="radio" name="priceRangeId" :checked="priceRangeId==1" value='1'>
              <label>Dưới 10 triệu</label>
            </div>

            <div>
              <input type="radio" name="priceRangeId" :checked="priceRangeId==2" value='2'>
              <label>Từ 10-20 triệu</label>
            </div>

            <div>
              <input type="radio" name="priceRangeId" :checked="priceRangeId==3" value='3'>
              <label>Trên 20 triệu</label>
            </div>
          </div>

          <button type="submit" class="btn btn-primary mt-3">Tìm kiếm</button>
        </form>
      </div>
      <div class="col-9">
        <ul v-if="items" class="list-unstyled row">          
          <li v-for="p in items" :key="p.id" class="list-item col-sm-4 mt-3">
            <div class='item-container'>
              <router-link :to="`/view-product/${p.id}`" class='product-item'>
                <img v-if="p.image" :src="backEndUrl + p.image" class='product-image'>
                <div class="item-info">
                  <div>                    
                    <span class='product-name'>{{p.name}}</span>
                  </div>
                  <div>
                    <span class='price-title'>Giá bán :</span> <span class='price'>{{p.price}} ₫</span>
                  </div>
                </div>
              </router-link>
            </div>
          </li>          
        </ul>
        <b-pagination
          v-if="total > pageSize"
          size="md"
          v-model="page"
          :total-rows="total"
          :per-page="pageSize"
        ></b-pagination>        
        <span v-if="items && items.length==0">Không tìm thấy sản phẩm nào</span>
      </div>
    </div>
  </div>  
</template>

<script>
import axios from "axios";
import {savePageStates, loadPageStates} from "@/utils/Helper";
import {BACKEND_URL, PAGE_SIZE} from "@/utils/Constants.js";

export default {
  data() {
    return {
      pageName: 'productListUser',
      pageSize: PAGE_SIZE,
      backEndUrl: BACKEND_URL,
      items: null,
      page: 1,
      total: 0,
      categoryList: [],
      keyword: '',
      priceRangeId: '',
      categoryId: ''
    };
  },
  methods: {
 
    fetchProductList(keyword, categoryId, priceRangeId, page) {
      this.keyword = keyword ?? '';
      this.categoryId = categoryId ?? '';
      this.priceRangeId = priceRangeId ?? '';
      this.page = page ?? 1;
      
      savePageStates(this.pageName, {
        keyword: this.keyword, 
        categoryId: this.categoryId,
        priceRangeId: this.priceRangeId,
        page: this.page
      });

      const start = (this.page - 1) * this.pageSize;

      const url = `/api/product/search?name=${this.keyword}` +
                  `&categoryId=${this.categoryId}` +
                  `&priceRangeId=${this.priceRangeId}` +
                  `&start=${start}` +
                  `&count=${this.pageSize}`;

      axios.get(url).then(result => {
        const {total, items} = result.data;
        this.total = total;
        this.items = items;
      });
    },

    searchProduct() {
      const data = new FormData(document.getElementById('fmt'));
      this.keyword = data.get('keyword');
      this.categoryId = data.get('categoryId');
      this.priceRangeId = data.get('priceRangeId');
      this.fetchProductList(this.keyword, this.categoryId, this.priceRangeId, 1);
    }
  },

  watch: {
    page: function(newVal, oldVal){
      if(newVal != oldVal) {
        this.fetchProductList(this.keyword, this.categoryId, this.priceRangeId, newVal);
      }
    }
  },

  mounted() {
    axios.get('/api/category/').then(result => this.categoryList = result.data);
    const {
      keyword,
      categoryId,
      priceRangeId,
      page
    } = loadPageStates(this.pageName)
    
    this.fetchProductList(keyword, categoryId, priceRangeId, page);
  },
};
</script>

<style>
.product-image {
  width: 95%;
}

.price-title {
  font-style: italic;
  font-size: 14px;
}

.price {
  font-size: 16px;
  font-weight: bold;
}

.product-item,
.product-item:link,
.product-item:hover,
.product-item:visited {
  text-decoration: none;
  color: black;
}

.item-container {
  position: relative;
  height: 100%;
  padding-bottom: 50px;
}

.item-info {
  position: absolute;
  bottom: 0px;
  height: 50px;
}
</style>