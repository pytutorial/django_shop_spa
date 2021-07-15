import React, {useEffect } from "react";
import {Link} from "react-router-dom";

import PaginationBar from "components/PaginationBar";
import {BACKEND_URL, PAGE_SIZE} from "utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, searchProduct, setPage } from "./productListSlice";

export default function ProductListPage() {
  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.productList) || {};

  useEffect(() => dispatch(searchProduct()), [dispatch]);

  const onSearchProduct = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
    dispatch(searchProduct(data.get('keyword'), 1));
  }
  
  const offset = (state.page - 1) * PAGE_SIZE;

  const items = state.items || [];
  const loading = state.loading;

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Danh sách sản phẩm</h6>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-3">
              <Link className="btn btn-sm btn-primary"
                to="/staff/product/create"
              >
                Thêm sản phẩm
              </Link>
            </div>
            <div className="col-6 offset-3">
              <form id="fmt" onSubmit={onSearchProduct}>
                <input key={[state.page]} name="keyword" className="form-control" placeholder='Tìm theo tên sản phẩm'
                  defaultValue={state.keyword} />
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
                {!loading && items && items.length === 0 &&
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
                        <img style={{width: "90%", maxHeight: "250px"}} src={BACKEND_URL + product.image} alt=""/>
                      }
                    </td>
                    <td className='text-center'>
                      <Link className='btn btn-sm btn-primary mr-2' 
                        to={`/staff/product/update/${product.id}`}
                      >
                        Chỉnh sửa
                      </Link>
                      <button className='btn btn-sm btn-danger' 
                        onClick={(e) => dispatch(deleteProduct(product.id))}
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
              setPage={(page) => dispatch(setPage(page)) }
            />
            <span style={{color: 'red'}}>{state.error}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
