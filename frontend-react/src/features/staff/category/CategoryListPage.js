import React, {useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import PaginationBar from "components/PaginationBar";
import { useSliceSelector, useSliceStore } from "utils/Helper";
import {PAGE_SIZE} from "utils/Constants";

import { SLICE_NAME} from "./categoryListReducer";

function fetchCategoryList({store, keyword, page}) {
  store.setState({loading: true, total: 0, items: []});
  keyword = keyword ?? '';
  page = page ?? 1;
  const start = (page-1) * PAGE_SIZE;
  const url = `/api/category/search?name=${keyword}&start=${start}&count=${PAGE_SIZE}`;
  
  axios.get(url).then(result => {
    const data = result.data;
    store.setState({
      total: data.total, 
      items: data.items, 
      keyword, 
      page, 
      loading: false
    });
  });
}

function CategoryRow({index, category}) {
  const store = useSliceStore(SLICE_NAME);

  const deleteCategory = (id) => {
    if(window.confirm('Bạn có muốn xóa nhóm sản phẩm này?')) {
      const {page, total, keyword} = store.getState();
  
      axios.delete(`/api/category/${id}`).then(_ => {
        const pageOffset = (page > 1 && total === (page-1) * PAGE_SIZE + 1) ? 1 : 0;
        fetchCategoryList({store, keyword, page:page-pageOffset});
      }).catch(e => 
        store.setState({error: e.toString()})
      );
    }
  }

  const [page] = useSliceSelector(SLICE_NAME, ['page']);
  const offset = (page - 1) * PAGE_SIZE;

  return (
    <tr key={index}>
      <td className="text-center">{index+offset+1}</td>
      <td>{category.code}</td>
      <td>{category.name}</td>
      <td className='text-center'>
        <Link className='btn btn-sm btn-primary mr-2'
          to={`/staff/category/update/${category.id}`}
        >
          Chỉnh sửa
        </Link>
        <button className='btn btn-sm btn-danger' 
          onClick={() => deleteCategory(category.id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  )
}

function CategoryTable() {
  const [items, loading ] = useSliceSelector(SLICE_NAME,  ['items', 'loading']);

  return (
    <table className='table table-bordered'>
      <thead>
        <tr>
          <th style={{width: '5%'}} className='text-center'>STT</th>
          <th style={{width: '40%'}}>Mã</th>
          <th style={{width: '40%'}}>Tên</th>
          <th style={{width: '15%'}}></th>
        </tr>
      </thead>
      <tbody>
        {!loading && items && items.length === 0 &&
          <tr><td colSpan="4">Không tìm thấy nhóm sản phẩm nào</td></tr>
        }
        {!loading && items && items.map((category, i) => 
          <CategoryRow category={category} index={i}/>
        )}
      </tbody>
    </table>
  )
}

function SearchPannel() {
  const store = useSliceStore(SLICE_NAME);
  const [keyword] = useSliceSelector(SLICE_NAME, ['keyword']);
  
  const searchCategory = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
    const keyword = data.get('keyword');
    fetchCategoryList({store, keyword, page: 1});
  }

  return (
    <div className="row mb-4">
      <div className="col-3">
        <Link className="btn btn-sm btn-primary"
          to="/staff/category/create"
        >
          Thêm nhóm sản phẩm
        </Link>
      </div>
      <div className="col-6 offset-3">
        <form id="fmt" onSubmit={searchCategory}>
          <input name="keyword"
            className="form-control" 
            placeholder='Tìm theo tên nhóm sản phẩm'
            defaultValue={keyword}/>
        </form>
      </div>
    </div>
  )
}

export default function CategoryListPage() {
  const store = useSliceStore(SLICE_NAME);
  
  useEffect(() => {
    const {keyword, page} = store.getState();
    fetchCategoryList({store, keyword, page:page??1});
  } , []);

  
  const [page,  error, total ] = useSliceSelector(SLICE_NAME, 
        ['page', 'error', 'total']);

  const setPage = (page) => {
    const {keyword} = store.getState();
    fetchCategoryList({store, keyword, page});
  }

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Danh sách nhóm sản phẩm</h6>
        </div>
        <div className="card-body">
          <SearchPannel/>

          <div className='table-responsive'>
            <CategoryTable/>

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