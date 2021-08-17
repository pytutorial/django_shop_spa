import React, {useEffect } from "react";
import {Link} from "react-router-dom";

import PaginationBar from "components/PaginationBar";
import { useSliceSelector, useSliceStore } from "utils/Helper";
import { BACKEND_URL, PAGE_SIZE} from "utils/Constants";
import axios from 'axios';

import {SLICE_NAME} from "./productListReducer";

function fetchProductList({store, keyword, page}) {
  store.setState({
    loading: true, 
    total: 0, 
    items: []
  })
  
  keyword = keyword ?? '';
  page = page ?? 1;
  const start = (page-1) * PAGE_SIZE;
  const url = `/api/product/search?name=${keyword}&start=${start}&count=${PAGE_SIZE}`;
  
  axios.get(url).then(result => {
    const {total, items} = result.data;
    store.setState({
      total, 
      items, 
      keyword, 
      page, 
      loading: false
    });
  });
}

function ProductRow({index, product}) {
  const store = useSliceStore(SLICE_NAME);
  
  const [page] = useSliceSelector(SLICE_NAME, ['page']);

  const offset = (page - 1) * PAGE_SIZE;

  const deleteProduct = (id) => {
    if(window.confirm('Bạn có muốn xóa sản phẩm này?')) {
      const {page, total, keyword} = store.getState();
  
      axios.delete(`/api/product/${id}`).then(_ => {
        const pageOffset = (page > 1 && total === (page-1) * PAGE_SIZE + 1) ? 1 : 0;
        fetchProductList({store, keyword, page:page-pageOffset});
      }).catch(e => 
        store.setState({
          error: e.toString()
        })
      );
    }
  }

  return(
    <tr key={product.id}>
      <td className="text-center">{index+offset+1}</td>
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
          onClick={() => deleteProduct(product.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  )
}

function ProductTable() {
  const [items, loading ] = useSliceSelector(SLICE_NAME,  ['items', 'loading']);

  return (
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
        {!loading && items && items.map((product, index) => 
          <ProductRow product={product} index={index}/>
        )}
      </tbody>
    </table>
  )
}

function SearchPanel() {
  const store = useSliceStore(SLICE_NAME);
  const [keyword] = useSliceSelector(SLICE_NAME, ['keyword']);

  const searchProduct = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
    const keyword = data.get('keyword');
    fetchProductList({store, keyword, page:1});
  }

  return (
    <div className="row mb-4">
      <div className="col-3">
        <Link className="btn btn-sm btn-primary"
          to="/staff/product/create"
        >
          Thêm sản phẩm
        </Link>
      </div>
      <div className="col-6 offset-3">
        <form id="fmt" onSubmit={searchProduct}>
          <input name="keyword" className="form-control" placeholder='Tìm theo tên sản phẩm'
            defaultValue={keyword} />
        </form>
      </div>
    </div>
  )
}

export default function ProductListPage() {
  const store = useSliceStore(SLICE_NAME);
  useEffect(() => {
    const {keyword, page} = store.getState();
    fetchProductList({store, keyword, page:page??1});
  }, []);

  const [page, error, total] = useSliceSelector(SLICE_NAME, 
        ['page', 'error', 'total']);

  const setPage = (page) => {
    const {keyword} = store.getState();
    fetchProductList({store, keyword, page});
  }

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Danh sách sản phẩm</h6>
        </div>
        <div className="card-body">
          <SearchPanel/>
          
          <div className='table-responsive'>
            <ProductTable/>
            <PaginationBar total={total}
              pageSize={PAGE_SIZE}
              page={page}
              setPage={setPage}
            />
            <span style={{color: 'red'}}>{error}</span>
          </div>
        </div>
      </div>
    </div>
  );
}