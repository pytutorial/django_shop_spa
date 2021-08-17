import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import { PAGE_SIZE, BACKEND_URL } from "utils/Constants";
import {  useSliceSelector, useSliceStore } from "utils/Helper";

import { SLICE_NAME } from "./productListReducer";
import PaginationBar from "components/PaginationBar";

import './ProductListPage.css';

function fetchProductList({store, keyword, categoryId, priceRangeId, page}) {
  store.setState({loading: true, total: 0, items: []});
  
  keyword = keyword ?? '';
  categoryId = categoryId ?? '';
  priceRangeId = priceRangeId ?? '';
  page = page ?? 1;

  const start = (page-1) * PAGE_SIZE;

  let url = `/api/product/search?name=${keyword}` + 
                      `&categoryId=${categoryId}` + 
                      `&priceRangeId=${priceRangeId}` +
                      `&start=${start}&count=${PAGE_SIZE}`;  
  
  axios.get(url).then(result => {
    const data = result.data;
    
    store.setState({
      loading: false, 
      total: data.total, 
      items: data.items,
      keyword,
      categoryId,
      priceRangeId,
      page: page
    });
  });
}

function SearchPanel() {
  const store = useSliceStore(SLICE_NAME);
  let [keyword, setKeyword] = useState('');
  let [categoryId, setCategoryId] = useState('');
  let [priceRangeId, setPriceRangeId] = useState('');
  let [categoryList, setCategoryList] = useState([]);
  
  let searchProduct = (e) => {
    e.preventDefault();
    store.setState({keyword, categoryId, priceRangeId});
    fetchProductList({store, keyword, categoryId, priceRangeId, page: 1});
  }

  useEffect(() => {
    axios.get('/api/category/')
      .then(result => setCategoryList(result.data));

    let {keyword, categoryId, priceRangeId} = store.getState();
    setKeyword(keyword);
    setCategoryId(categoryId);
    setPriceRangeId(priceRangeId);

  }, []);

  return (
    <>
      <form id="fmt" onSubmit={searchProduct}>
        <div className='product-search-info mt-3'>
          <label><b>Tên sản phẩm</b></label>
          <input className="form-control"
            placeholder="Nhập tên sản phẩm để tìm"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
        </div>

        <div className='category-search-info mt-3'>
          <label><b>Hãng sản xuất:</b></label>
          <div>
            <input type='radio'
              checked={!categoryId} 
              onChange={() => {}}
              onClick={() => setCategoryId('')}/>
            <label>Tất cả</label>
          </div>

          {categoryList.map((c, i) =>
            <div key={i}>
              <input type="radio"
                checked={Number(categoryId) === c.id}
                onChange={() => {}}
                onClick={() => setCategoryId(c.id)}
              />
              <label>{c.name}</label>
            </div>
          )}
        </div>

        <div className='price-search-info mt-3'>
          <label><b>Mức giá:</b></label>
          <div>
            <input type="radio"
              checked={!priceRangeId}
              onChange={() => {}}
              onClick={() => setPriceRangeId('')}/>
            <label>Tất cả</label>
          </div>

          <div>
            <input type="radio" 
              checked={Number(priceRangeId) === 1}
              onChange={() => {}}
              onClick={() => setPriceRangeId(1)}/>
            <label>Dưới 10 triệu</label>
          </div>

          <div>
            <input type="radio"
              checked={Number(priceRangeId) === 2}
              onChange={() => {}}
              onClick={() => setPriceRangeId(2)}/>
            <label>Từ 10-20 triệu</label>
          </div>

          <div>
            <input type="radio"
              checked={Number(priceRangeId) === 3}
              onChange={() => {}}
              onClick={() => setPriceRangeId(3)}/>

            <label>Trên 20 triệu</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Tìm kiếm
          </button>
      </form>
    </>
  )
}

function ProductTable() {
  const [loading, items] = useSliceSelector(SLICE_NAME, ['loading', 'items']);
  
  if(!items || loading) return <></>;
  
  return (
    <>
      <ul className="list-unstyled row">
        {items.map((p, i) =>
          <li key={i} className="list-item col-sm-4 mt-3">
            <div className='item-container'>
              <Link to={`/view-product/${p.id}`} className='product-item'>
                {p.image &&
                  <img src={BACKEND_URL + p.image} className='product-image' alt="" />
                }
                <div className="item-info">
                  <div>
                    <span className='product-name'>{p.name}</span>
                  </div>
                  <div>
                    <span className='price-title'>Giá bán : </span>
                    <span className='price'>{p.price} ₫</span>
                  </div>
                </div>
              </Link>
            </div>
          </li>
        )}
      </ul>
      {(items?.length??0) === 0 && <span>Không tìm thấy sản phẩm nào</span>}
    </>
  )
}

function Pagination() {
  const store = useSliceStore(SLICE_NAME);
  const [total, page] = useSliceSelector(SLICE_NAME, ['total', 'page']);

  const setPage = (page) => {
    const {keyword, categoryId, priceRangeId} = store.getState();
    fetchProductList({store, keyword, categoryId, priceRangeId, page});
  };

  return (
    <PaginationBar total={total}
      pageSize={PAGE_SIZE}
      page={page}
      setPage={setPage}
    />
  )
}

export default function ProductListPage() {
  const store = useSliceStore(SLICE_NAME);
  
  useEffect(() => {
    let {keyword, categoryId, priceRangeId, page} = store.getState();
    fetchProductList({store, keyword, categoryId, priceRangeId, page});
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-3 p-3 card">
          <SearchPanel />
        </div>
        <div className="col-9">
          <ProductTable/>
          <Pagination/>
        </div>
      </div>
    </div>
  )
}