import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { initPage } from "./productDetailSlice";
import "./ProductDetailPage.css";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.productDetail);
  const { id } = useParams();

  useEffect(() => dispatch(initPage(id)), [dispatch, id]);

  if(state.loading || !state.product){
    return <></>;
  }

  const product =  state.product;

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-6">
          {product.image && 
            <img className='product-detail-image' src={product.image} alt=""/>
          }
        </div>

        <div className="col-6 mt-5">
          <div className='product-detail-title'>{product.name}</div>
          <br />
          <table className="table">
            <tbody>
              <tr>
                <td>Hãng sản xuất:</td>
                <td>{product.categoryName}</td>
              </tr>
              <tr>
                <td>Giá bán:</td>
                <td><b>{product.price} ₫</b></td>
              </tr>
            </tbody>
          </table>
          <br />

          <Link className="btn btn-secondary mr-2" 
            to="/">
            Quay lại
          </Link>

          <Link className="btn btn-primary" 
            to={`/order-product/${product.id}`}
          >
            Mua hàng
          </Link>
        </div>
      </div>
    </div>
  )
}
