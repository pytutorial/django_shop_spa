import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from 'axios';

import { SLICE_NAME } from "./productFormReducer";
import { useSliceSelector, useSliceStore } from "utils/Helper";
import ErrorList from "components/ErrorList";

export default function ProductFormPage() {
  const store = useSliceStore(SLICE_NAME);
  const history = useHistory();
  const {id} = useParams();

  useEffect(() => {
    store.setState({product: {}, errors: {}});

    axios.get('/api/category').then(result => {
      store.setState({categoryList: result.data});
    });

    if (id) {
      axios.get(`/api/product/${id}`).then(result => {
        store.setState({product: result.data});
      });
    }
  }, [id]);

  const saveProduct = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
        
    store.setState({errors: {}});
    let url, method;

    if(!id) {
      method = 'post';
      url = '/api/product/'
    }else{
      method = 'put';
      url = `/api/product/${id}/`;
    }

    axios({method, url, data})
      .then(_ => {
        if(method === 'post') {
          store.dispatchGlobal({                    // Reset data
            type: 'productList/setState', 
            payload: {
              page: 1,
              keyword: '',
            }}
          );
        }
        history.push('/staff/product/');
      }).catch(e => {
        store.setState({errors: e.response.data});
      });
  };

  const [product, categoryList, errors]  = useSliceSelector(SLICE_NAME, 
        ['product', 'categoryList', 'errors']);

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Thông tin sản phẩm</h6>
        </div>
        <div className="card-body">
          <form id="fmt" onSubmit={saveProduct} encType="multipart/form-data">
            <table className='table'>
              <tbody>
                <tr>
                  <th style={{ width: "25%" }}>Mã SP:</th>
                  <td>
                    <input key={product.id} 
                      className="form-control"
                      defaultValue={product.code}
                      name='code' />

                    <ErrorList errors={errors.code}/>
                  </td>
                </tr>

                <tr>
                  <th>Nhóm SP:</th>
                  <td>
                    <select key={product.id} 
                      className="form-control"
                      defaultValue={product.category}
                      key={product.category}
                      name='category'
                    >
                      <option value=''>----Chọn nhóm sản phẩm----</option>
                      {categoryList && categoryList.map((c, i) =>
                        <option key={i} value={c.id}>
                          {c.name}
                        </option>
                      )}
                    </select>

                    <ErrorList errors={errors.category}/>
                  </td>
                </tr>

                <tr>
                  <th>Tên SP:</th>
                  <td>
                    <input key={product.id} 
                      className="form-control"
                      defaultValue={product.name}
                      name='name' />

                    <ErrorList errors={errors.name}/>
                  </td>
                </tr>

                <tr>
                  <th>Đơn giá:</th>
                  <td>
                    <input key={product.id} 
                      type="number" min="0"
                      className="form-control"
                      defaultValue={product.price}
                      name='price' />

                    <ErrorList errors={errors.price}/>
                  </td>
                </tr>

                <tr>
                  <th>Ảnh:</th>
                  <td>
                    <input key={product.id} 
                      type="file"
                      className="form-control-file"
                      name='image' />
                    
                    {product.image &&
                      <a target="_blank" href={product.image}><small>Ảnh đã upload</small></a>
                    }

                    <ErrorList errors={errors.image}/>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <Link className="btn btn-secondary mr-2" to="/staff/product">Quay lại</Link>
              <button type="submit" className="btn btn-primary">Lưu lại</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}