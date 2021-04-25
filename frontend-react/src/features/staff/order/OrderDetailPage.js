import React, {useEffect} from "react";
import { Link, useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder, clearError, confirmOrder, cancelOrder } from "./orderDetailSlice";

export default function OrderDetailPage() {
  const dispatch = useDispatch();
  const {id} = useParams();
  const state = useSelector(globalState => globalState.orderDetail) || {};
  const order = state.order || {};
  const error = state.error;
  const saved = state.saved;

  useEffect(() => {
    if (id) {
      dispatch(fetchOrder(id));
    }
  }, []);

  const onConfirmOrder = () => {  
    if(!window.confirm('Xác nhận đơn hàng này đã được giao?')) {
      return;
    }

    dispatch(clearError());
    dispatch(confirmOrder(id));
  };

  const onCancelOrder = () => {  
    if(!window.confirm('Hủy đơn hàng này ?')) {
      return;
    }

    dispatch(clearError());    
    dispatch(cancelOrder(id));
  };

  if (saved) {
    return <Redirect to='/staff/order' />
  }

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Thông tin đơn hàng</h6>
        </div>
        <div className="card-body">
          <div className='table-responsive'>
            <table className="table">
              <tbody>
                <tr>
                  <th>Tên khách hàng:</th>
                  <td>{order.customerName}</td>
                </tr>
                <tr>
                  <th>Điện thoại khách hàng:</th>
                  <td>{order.customerPhone}</td>
                </tr>
                <tr>
                  <th>Địa chỉ khách hàng:</th>
                  <td>{order.customerAddress}</td>
                </tr>
                <tr>
                  <th>Sản phẩm:</th>
                  <td>{order.productName}</td>
                </tr>
                <tr>
                  <th>Số lượng:</th>
                  <td>{order.qty}</td>
                </tr>
                <tr>
                  <th>Đơn giá:</th>
                  <td>{order.priceUnit} đ</td>
                </tr>
                <tr>
                  <th>Tổng tiền:</th>
                  <td>{order.total} đ</td>
                </tr>
                <tr>
                  <th>Ngày đặt hàng:</th>
                  <td>{order.orderDate}</td>
                </tr>
                {order.status === 1 && 
                  <tr>
                    <th>Ngày giao hàng</th>
                    <td>{order.deliverDate}</td>
                  </tr>
                }
                <tr>
                  <th>Trạng thái:</th>
                  <td>
                    {order.status === 0 && <span> Đang chờ giao hàng </span> }
                    {order.status === 1 && <span> Đã giao hàng </span>}
                    {order.status === 2 && <span> Đã hủy </span> }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-3" style={{color: "red"}}>{error}</div>
          <Link className="btn btn-secondary mr-2" to="/staff/order">
            Quay lại
          </Link>
          {order.status === 0 &&
            <>
              <button className="btn btn-primary mr-2" type="button" onClick={onConfirmOrder}>
                Xác nhận đơn hàng đã được giao
              </button>
              <button className="btn btn-danger" type="button" onClick={onCancelOrder}>
                Hủy đơn hàng
              </button>
            </>
          }
        </div>
      </div>
    </div>
  );
}