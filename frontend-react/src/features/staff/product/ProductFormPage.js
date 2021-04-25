import React, { useEffect } from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, fetchCategoryList, saveProduct, clearErrors } from "./productFormSlice";

export default function ProductFormPage() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const state = useSelector(globalState => globalState.productForm) || {};
  const product = state.product || {};
  const errors = state.errors || {};

  useEffect(() => {
    dispatch(fetchCategoryList());
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, []);

  const onSaveProduct = (e) => {
    e.preventDefault();
    dispatch(clearErrors());
    const data = new FormData(document.getElementById('fmt'));
    dispatch(saveProduct(id, data));
  };

  if (state.saved) {    
    return <Redirect to='/staff/product' />
  }

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Thông tin sản phẩm</h6>
        </div>
        <div className="card-body">
          <form id="fmt" onSubmit={onSaveProduct} encType="multipart/form-data">
            <table className='table'>
              <tbody>
                <tr>
                  <th style={{ width: "25%" }}>Mã SP:</th>
                  <td>
                    <input className="form-control"
                      defaultValue={product.code}
                      name='code' />

                    <ul style={{ color: "red" }}>
                      {errors['code'] && errors['code'].map(e => <li>{e}</li>)}
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th>Nhóm SP:</th>
                  <td>
                    <select className="form-control"
                      defaultValue={product.category}
                      key={product.category}
                      name='category'
                    >
                      <option value=''>----Chọn nhóm sản phẩm----</option>
                      {state.categoryList && state.categoryList.map((c, i) =>
                        <option key={i} value={c.id}>
                          {c.name}
                        </option>
                      )}
                    </select>

                    <ul style={{ color: "red" }}>
                      {errors['category'] && errors['category'].map(e => <li>{e}</li>)}
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th>Tên SP:</th>
                  <td>
                    <input className="form-control"
                      defaultValue={product.name}
                      name='name' />

                    <ul style={{ color: "red" }}>
                      {errors['name'] && errors['name'].map(e => <li>{e}</li>)}
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th>Đơn giá:</th>
                  <td>
                    <input type="number" min="0"
                      className="form-control"
                      defaultValue={product.price}
                      name='price' />

                    <ul style={{ color: "red" }}>
                      {errors['price'] && errors['price'].map(e => <li>{e}</li>)}
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th>Ảnh:</th>
                  <td>
                    <input type="file"
                      className="form-control-file"
                      name='image' />

                    <ul style={{ color: "red" }}>
                      {errors['image'] && errors['image'].map(e => <li>{e}</li>)}
                    </ul>
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