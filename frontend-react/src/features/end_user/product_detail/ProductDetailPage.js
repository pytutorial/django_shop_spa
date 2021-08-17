import React, {  useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

import {  SLICE_NAME } from "./productDetailReducer";
import { useSliceSelector, useSliceStore } from "utils/Helper";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const store = useSliceStore(SLICE_NAME);
  const [loading, product] = useSliceSelector(SLICE_NAME, ['loading' , 'product']);

  useEffect(() => {
    store.setState({loading: true});

    axios.get(`/api/product/${id}`).then(result => {
      store.setState({
        product: result.data, 
        loading: false
      });
    });
  }, [id]);

  if(loading || !product){
    return <></>;
  }

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