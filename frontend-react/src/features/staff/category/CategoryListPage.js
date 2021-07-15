import React, {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { searchCategory, setPage, deleteCategory } from "./categoryListSlice";
import PaginationBar from "components/PaginationBar";
import {PAGE_SIZE} from "utils/Constants";

export default function CategoryListPage() {
  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.categoryList);

  useEffect(() => dispatch(searchCategory()), [dispatch]);

  const onSearchCategory = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
    dispatch(searchCategory(data.get('keyword'), 1));
  }
  const offset = (state.page - 1) * PAGE_SIZE;
  const items = state.items || [];
  const loading = state.loading;

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Danh sách nhóm sản phẩm</h6>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-3">
              <Link className="btn btn-sm btn-primary"
                to="/staff/category/create"
              >
                Thêm nhóm sản phẩm
              </Link>
            </div>
            <div className="col-6 offset-3">
              <form id="fmt" onSubmit={onSearchCategory}>
                <input name="keyword" key={state.page}
                  className="form-control" 
                  placeholder='Tìm theo tên nhóm sản phẩm'
                  defaultValue={state.keyword}/>
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
                {!loading && items && items.length === 0 &&
                  <tr><td colSpan="4">Không tìm thấy nhóm sản phẩm nào</td></tr>
                }
                {!loading && items && items.map((category, i) => 
                  <tr key={i}>
                    <td className="text-center">{i+offset+1}</td>
                    <td>{category.code}</td>
                    <td>{category.name}</td>
                    <td className='text-center'>
                      <Link className='btn btn-sm btn-primary mr-2'
                        to={`/staff/category/update/${category.id}`}
                      >
                        Chỉnh sửa
                      </Link>
                      <button className='btn btn-sm btn-danger' 
                        onClick={() => dispatch(deleteCategory(category.id))}
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
