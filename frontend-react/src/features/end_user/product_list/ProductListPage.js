import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import PaginationBar from "components/PaginationBar";
import { PAGE_SIZE, BACKEND_URL } from "utils/Constants";
import { searchProduct, setPage, initPage } from "./productListSlice";

import './ProductListPage.css';
import { useDispatch, useSelector } from "react-redux";

export default function ProductListPage() {
  /*
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {keyword: '', categoryId: '', priceRangeId: ''}
  );*/

  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.productListUser) || {};
  const categoryList = state.categoryList || [];

  useEffect(() => dispatch(initPage()), [dispatch]);
  
  const onSearchProduct = (e) => {
    e.preventDefault();
    let data = new FormData(document.getElementById('fmt'));
    
    dispatch(
      searchProduct(
        data.get('keyword'), 
        data.get('categoryId'), 
        data.get('priceRangeId'),
        1
      )
    );
  }
  
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-3 p-3 card">
          <form id="fmt" onSubmit={onSearchProduct}>
            <div className='product-search-info mt-3'>
              <label><b>Tên sản phẩm</b></label>
              <input key={state.page}
                defaultValue={state.keyword}
                name="keyword" className="form-control"
                placeholder="Nhập tên sản phẩm để tìm" 
              />
            </div>

            <div className='category-search-info mt-3'>
              <label><b>Hãng sản xuất:</b></label>
              <div>
                <input key={state.page} type='radio' name='categoryId' 
                  defaultChecked={state.categoryId||'' === ''} value='' />
                <label>Tất cả</label>
              </div>
              {categoryList.map((c, i) =>
                <div key={i}>
                  <input key={state.page}
                    defaultChecked={c.id === Number(state.categoryId)}
                    name='categoryId' type="radio" value={c.id} 
                  />
                  <label>{c.name}</label>
                </div>
              )}
            </div>

            <div className='price-search-info mt-3'>
              <label><b>Mức giá:</b></label>
              <div>
                <input key={state.page} type="radio" name="priceRangeId" value='' 
                  defaultChecked={state.priceRangeId||'' === ''}/>
                <label>Tất cả</label>
              </div>

              <div>
                <input key={state.page} type="radio" name="priceRangeId" value='1' 
                  defaultChecked={Number(state.priceRangeId) === 1}/>
                <label>Dưới 10 triệu</label>
              </div>

              <div>
                <input key={state.page} type="radio" name="priceRangeId" value='2' 
                  defaultChecked={Number(state.priceRangeId) === 2}/>
                <label>Từ 10-20 triệu</label>
              </div>

              <div>
                <input key={state.page} type="radio" name="priceRangeId" value='3' 
                  defaultChecked={Number(state.priceRangeId) === 3}/>
                <label>Trên 20 triệu</label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Tìm kiếm
              </button>
          </form>
        </div>
        <div className="col-9">
          <ul className="list-unstyled row">
            {!state.loading && state.items.map((p, i) =>
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
          <PaginationBar total={state.total}
            pageSize={PAGE_SIZE}
            page={state.page}
            setPage={(page) => dispatch(setPage(page))}
          />
          {!state.loading && state.items.length === 0 && <span>Không tìm thấy sản phẩm nào</span>}
        </div>
      </div>
    </div>
  )
}