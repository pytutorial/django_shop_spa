import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";
import PaginationBar from "components/PaginationBar";

import {BACKEND_URL, PAGE_SIZE} from "utils/Constants";
import { setPage, setSearchParams, fetchProductList, deleteProduct, clearError } from "./productListSlice";
import { clearData as clearFormData } from "./productFormSlice";
import { setLoading } from "../category/categoryListSlice";

export default function ProductListPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const state = useSelector(globalState => globalState.productList) || {};
  const [name, setName] = useState(state.name);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchProductList());
  }, [state.name, state.page]);

  const offset = (state.page - 1) * PAGE_SIZE;

  const items = state.items;
  const loading = state.loading;

  const searchProduct = (e) => {
    e.preventDefault();
    dispatch(setSearchParams({name: name}));
  }

  const confirmDelete = (id) => {
    if(window.confirm('Bạn có muốn xóa sản phẩm này?')) {
      dispatch(clearError());
      dispatch(deleteProduct(id));
    }
  } 

  const addProduct = () => {
    dispatch(clearFormData());
    history.push('/staff/product/create');
  }

  const editProduct = (id) => {
    dispatch(clearFormData());
    history.push(`/staff/product/update/${id}`);
  }

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Danh sách sản phẩm</h6>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-3">
              <button className="btn btn-sm btn-primary"
                onClick={addProduct}
              >
                Thêm sản phẩm
              </button>
            </div>
            <div className="col-6 offset-3">
              <form onSubmit={searchProduct}>
                <input className="form-control" placeholder='Tìm theo tên sản phẩm'
                  value={name} onChange={e => setName(e.target.value)}/>
              </form>
            </div>
          </div>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th style={{width: '5%'}} className='text-center'>STT</th>
                  <th style={{width: '15%'}}>Mã</th>
                  <th style={{width: '20%'}}>Tên</th>
                  <th style={{width: '15%'}}>Đơn giá</th>
                  <th style={{width: '25%'}}>Ảnh</th>
                  <th style={{width: '20%'}}></th>                  
                </tr>
              </thead>
              <tbody>
                {!loading && items && items.length == 0 &&
                  <tr><td colSpan="6">Không tìm thấy sản phẩm nào</td></tr>
                }
                {!loading && items && items.map((product, i) => 
                  <tr key={i}>
                    <td className="text-center">{i+offset+1}</td>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td className="text-center">{product.price}</td>
                    <td className="text-center">
                      {product.image &&
                        <img style={{width: "90%", maxHeight: "250px"}} src={BACKEND_URL + product.image}/>
                      }
                    </td>
                    <td className='text-center'>
                      <button className='btn btn-sm btn-primary mr-2' 
                        onClick={() => editProduct(product.id)}
                      >
                        Chỉnh sửa
                      </button>
                      <button className='btn btn-sm btn-danger' 
                        onClick={(e) => confirmDelete(product.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <PaginationBar total={state.total}
              pageSize={PAGE_SIZE}
              page={state.page}
              setPage={(page) => dispatch(setPage(page))}
            />
            <span style={{color: 'red'}}>{state.error}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
