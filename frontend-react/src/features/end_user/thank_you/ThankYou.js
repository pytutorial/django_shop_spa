import React from "react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="container mt-5 mb-5">
      <p>Cảm ơn bạn đã mua sản phẩm của chúng tôi. Chúng tôi sẽ chuyển sản phẩm cho bạn trong thời gian 24h</p>
      <Link className="btn btn-primary" to='/'>Tiếp tục mua hàng</Link>
    </div>
  )
}