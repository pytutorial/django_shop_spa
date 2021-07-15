import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initPage, saveCategory } from "./categoryFormSlice";

export default function CategoryFormPage() {
  
  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.categoryForm);
  const {id} = useParams();
  
  useEffect(() => {
    dispatch(initPage(id));
  }, []);

  const onSaveCategory = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
    dispatch(saveCategory(id, data));
  }

  const category = state.category || {};
  const errors = state.errors || {};

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
                    <input key={category.id} 
                      className="form-control" 
                      defaultValue={category.code||''}
                      name='code'/>

                    <ul style={{color: "red"}}>
                      {errors['code'] && errors['code'].map((e,i) => <li key={i}>{e}</li>)}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>Tên nhóm:</th>
                  <td>
                    <input key={category.id} 
                      className="form-control" 
                      defaultValue={category.name||''}
                      name='name'/>

                    <ul style={{color: "red"}}>
                      {errors['name'] && errors['name'].map((e,i) => <li key={i}>{e}</li>)}
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