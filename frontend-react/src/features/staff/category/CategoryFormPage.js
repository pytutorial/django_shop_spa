import React, { useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios';

import { useSliceSelector, useSliceStore } from "utils/Helper";
import ErrorList from "components/ErrorList";
import { SLICE_NAME } from "./categoryFormReducer";

export default function CategoryFormPage() {
  const {id} = useParams();
  const store =  useSliceStore(SLICE_NAME);
  const history = useHistory();

  useEffect(() => {
    store.setState({errors: {}, category: {}});

    if(id){
      axios.get(`/api/category/${id}`).then(result => {
        store.setState({category: result.data});
      });
    }
  }, [id]);

  const saveCategory = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
    store.setState({errors: {}});

    let url, method;

    if(!id) {
      method = 'post';
      url = '/api/category/'
    }else{
      method = 'put';
      url = `/api/category/${id}/`;
    }

    axios({method, url, data})
      .then(_ => {
        if(method === 'post'){
          store.dispatchGlobal({                    // Reset data
            type: 'categoryList/setState', 
            payload: {
              page: 1,
              keyword: '',
            }}
          );
        }
        history.push('/staff/');
      }).catch(e => {
        store.setState({errors: e.response.data});
      });
  }

  const [category, errors] = useSliceSelector(SLICE_NAME, ['category', 'errors']);

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Thông tin nhóm sản phẩm</h6>
        </div>
        <div className="card-body">
          <form id="fmt" onSubmit={saveCategory}>
            <table className='table'>            
              <tbody>
                <tr>
                  <th style={{width: "25%"}}>Mã nhóm:</th>
                  <td>
                    <input key={category.id}
                      className="form-control" 
                      defaultValue={category.code}
                      name='code'/>
                    
                    <ErrorList errors={errors.code}/>
                  </td>
                </tr>
                <tr>
                  <th>Tên nhóm:</th>
                  <td>
                    <input key={category.id}
                      className="form-control" 
                      defaultValue={category.name}
                      name='name'/>
                    <ErrorList errors={errors.name}/>
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