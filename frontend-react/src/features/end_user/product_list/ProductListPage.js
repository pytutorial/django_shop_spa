import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { fetchProductList, fetchCategoryList, setLoading, setPage, setSearchParams  } from "./productListSlice";
import { clearData as clearProductDetail } from "../product_detail/productDetailSlice";

import PaginationBar from "components/PaginationBar";
import { PAGE_SIZE, BACKEND_URL } from "utils/Constants";

import './ProductListPage.css';


export default function ProductListPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.productListUser) || {};
  const categoryList = state.categoryList || [];

  useEffect(() => dispatch(fetchCategoryList()), []);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchProductList());
  }, [state.page, state.name, state.categoryId, state.priceRangeId]);

  const searchProduct = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));

    dispatch(
      setSearchParams({
        name: data.get('name'),
        categoryId: data.get('categoryId'),
        priceRangeId: data.get('priceRangeId')
      })
    );
  };

  let viewProduct = (id) => {
    dispatch(clearProductDetail());
    history.push(`/view-product/${id}`);
  }

  const items = state.items;

  if(!items) return (<></>);

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-3 p-3 card">
          <form id="fmt" onSubmit={searchProduct}>
            <div className='product-search-info mt-3'>
              <label><b>Tên sản phẩm</b></label>
              <input name="name" className="form-control" placeholder="Nhập tên sản phẩm để tìm" />
            </div>

            <div className='category-search-info mt-3'>
              <label><b>Hãng sản xuất:</b></label>
              <div>
                <input type='radio' name='categoryId' defaultChecked={true} value='' />
                <label>Tất cả</label>
              </div>
              {categoryList.map((c, i) =>
                <div key={i}>
                  <input name='categoryId' type="radio" value={c.id} />
                  <label>{c.name}</label>
                </div>
              )}
            </div>

            <div className='price-search-info mt-3'>
              <label><b>Mức giá:</b></label>
              <div>
                <input type="radio" name="priceRangeId" defaultChecked={true} value='' />
                <label>Tất cả</label>
              </div>

              <div>
                <input type="radio" name="priceRangeId" value='1' />
                <label>Dưới 10 triệu</label>
              </div>

              <div>
                <input type="radio" name="priceRangeId" value='2' />
                <label>Từ 10-20 triệu</label>
              </div>

              <div>
                <input type="radio" name="priceRangeId" value='3' />
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
            {items.map((p, i) =>
              <li key={i} className="list-item col-sm-4 mt-3">
                <div className='item-container'>
                  <a href={void(0)} onClick={() => viewProduct(p.id)} className='product-item'>
                    {p.image &&
                      <img src={BACKEND_URL + p.image} className='product-image' />
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
                  </a>
                </div>
              </li>
            )}
          </ul>
          <PaginationBar total={state.total}
            pageSize={PAGE_SIZE}
            page={state.page}
            setPage={(page) => dispatch(setPage(page))}
          />
          {items.length == 0 && <span>Không tìm thấy sản phẩm nào</span>}
        </div>
      </div>
    </div>
  )
}