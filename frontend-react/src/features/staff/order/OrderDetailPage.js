import React, {useEffect} from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from 'axios';

import { SLICE_NAME } from "./orderDetailReducer";
import { useSliceSelector, useSliceStore } from "utils/Helper";

export default function OrderDetailPage() {
  const store = useSliceStore(SLICE_NAME);
  const {id} = useParams();
  const history = useHistory();

  useEffect(() => {
    store.setState({order:{}, error: ''});
  
    axios.get(`/api/order/${id}`).then(result => {
      store.setState({order: result.data});
    });
  }, [id]);

  const confirmOrder = () => {
    if(!window.confirm('Xác nhận đơn hàng này đã được giao?')) {
      return;
    }
  
    store.setState({error: ''});
  
    axios.post(`/api/order/confirm/${id}`)
      .then(_ => {
        history.push('/staff/order');
  
      }).catch(e =>
        store.setState({error: e.toString()})
      );
  }

  const cancelOrder = () => {
    if(!window.confirm('Hủy đơn hàng này ?')) {
      return;
    }
  
    store.setState({error: ''});
  
    axios.post(`/api/order/cancel/${id}`)
      .then(_ => {
        history.push('/staff/order');
  
      }).catch(e =>
        store.setState({error: e.toString()})
      );
  }

  const [order, error] = useSliceSelector(SLICE_NAME, ['order', 'error']);
  
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
              <button className="btn btn-primary mr-2" type="button" 
                onClick={confirmOrder}
              >
                Xác nhận đơn hàng đã được giao
              </button>
              <button className="btn btn-danger" type="button" 
                onClick={cancelOrder}
              >
                Hủy đơn hàng
              </button>
            </>
          }
        </div>
      </div>
    </div>
  );
}