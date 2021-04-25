import React, { useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, saveCategory, clearErrors } from "./categoryFormSlice";

export default function CategoryFormPage() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const state = useSelector(globalState => globalState.categoryForm) || {};
  const category = state.category || {};
  const errors = state.errors || {};

  useEffect(() => {
    if(id) {
      dispatch(fetchCategory(id));
    }
  }, []);

  const onSaveCategory = (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    const data = new FormData(document.getElementById('fmt'));
    dispatch(saveCategory(id, data));
  };

  if(state.saved) {
    return <Redirect to='/staff'/>
  }

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Thông tin nhóm sản phẩm</h6>
        </div>
        <div className="card-body">
          <form id="fmt" onSubmit={onSaveCategory}>
            <table className='table'>            
              <tbody>
                <tr>
                  <th style={{width: "25%"}}>Mã nhóm:</th>
                  <td>
                    <input className="form-control" 
                      defaultValue={category.code} 
                      name='code'/>

                    <ul style={{color: "red"}}>
                      {errors['code'] && errors['code'].map(e => <li>{e}</li>)}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Tên nhóm:</th>
                  <td>
                    <input className="form-control" 
                      defaultValue={category.name} 
                      name='name'/>

                    <ul style={{color: "red"}}>
                      {errors['name'] && errors['name'].map(e => <li>{e}</li>)}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <Link className="btn btn-secondary mr-2" to="/staff">Quay lại</Link>
              <button type="submit" className="btn btn-primary">Lưu lại</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}