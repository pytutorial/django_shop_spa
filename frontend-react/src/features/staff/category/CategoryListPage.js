import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory} from "react-router-dom";
import PaginationBar from "components/PaginationBar";

import {PAGE_SIZE} from "utils/Constants";
import { 
  fetchCategoryList, 
  setPage, 
  setSearchParams, 
  deleteCategory, 
  clearError, 
  setLoading
} from './categoryListSlice.js';

import { clearData as clearFormData } from "./categoryFormSlice";

export default function CategoryListPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.categoryList) || {};
  
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchCategoryList());    
  }, [state.page, state.name]);

  const offset = (state.page - 1) * PAGE_SIZE;

  const items = state.items || [];
  const loading = state.loading;

  const searchCategory = (e) => {    
    e.preventDefault();    
    dispatch(setSearchParams({name: name}));
  }

  const confirmDelete = (id) => {
    if(window.confirm('Bạn có muốn xóa nhóm sản phẩm này?')) {
      dispatch(clearError());
      dispatch(deleteCategory(id));
    }
  }

  const addCategory = () => {
    dispatch(clearFormData());
    history.push('/staff/category/create');
  }

  const editCategory = (id) => {
    dispatch(clearFormData());
    history.push(`/staff/category/update/${id}`);
  }

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Danh sách nhóm sản phẩm</h6>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-3">
              <button className="btn btn-sm btn-primary"
                onClick={addCategory}
              >
                Thêm nhóm sản phẩm
              </button>
            </div>
            <div className="col-6 offset-3">
              <form onSubmit={searchCategory}>
                <input className="form-control" placeholder='Tìm theo tên nhóm sản phẩm'
                  value={name} onChange={e => setName(e.target.value)}/>
              </form>
            </div>
          </div>
          <div className='table-responsive'>
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
                {!loading && items && items.length == 0 &&
                  <tr><td colSpan="4">Không tìm thấy nhóm sản phẩm nào</td></tr>
                }
                {!loading && items && items.map((category, i) => 
                  <tr key={i}>
                    <td className="text-center">{i+offset+1}</td>
                    <td>{category.code}</td>
                    <td>{category.name}</td>
                    <td className='text-center'>
                      <button className='btn btn-sm btn-primary mr-2'
                        onClick={() => editCategory(category.id)} 
                      >
                        Chỉnh sửa
                      </button>
                      <button className='btn btn-sm btn-danger' 
                        onClick={() => confirmDelete(category.id)}
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
