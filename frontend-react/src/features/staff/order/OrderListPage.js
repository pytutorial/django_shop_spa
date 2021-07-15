import React, {useEffect} from "react";
import { Link } from "react-router-dom";

import PaginationBar from "components/PaginationBar";
import {PAGE_SIZE} from "utils/Constants";

import { useDispatch, useSelector } from "react-redux";
import { searchOrder, setPage } from "./orderListSlice";

export default function OrderListPage() {
  const dispatch = useDispatch();
  const state = useSelector(globalState => globalState.orderList);

  useEffect(() => dispatch(searchOrder()), [dispatch]);

  const offset = (state.page - 1) * PAGE_SIZE;
  const items = state.items;
  const loading = state.loading;

  const onSearchOrder = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
    dispatch(searchOrder(data.get('keyword'), 1));
  }

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Danh sách đơn hàng</h6>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col">
              <form id="fmt" onSubmit={onSearchOrder}>
                <input name="keyword" key={state.page} 
                  className="form-control" 
                  placeholder='Tìm theo tên sản phẩm/tên/số điện thoại Khách hàng'
                  defaultValue={state.keyword}
                />
              </form>
            </div>
          </div>

          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th style={{width: "5%"}}>STT</th>
                <th style={{width: "20%"}}>Khách hàng</th>
                <th style={{width: "20%"}}>Sản phẩm</th>
                <th style={{width: "10%"}}>Số lượng</th>
                <th style={{width: "15%"}}>Ngày đặt hàng</th>
                <th style={{width: "20%"}}>Trạng thái</th>
                <th style={{width: "10%"}}></th>
              </tr>
            </thead>
            <tbody>        
              {!loading && items && items.length === 0 && 
                <tr>
                  <td colspan="7">Không có đơn hàng nào</td>
                </tr>
              }
              
              {!loading && items && items.map((o,i) => 
                <tr key={i}>
                  <td className="text-center">{i+1+offset}</td>
                  <td>{o.customerName}</td>
                  <td>{o.productName}</td>
                  <td className="text-center">{o.qty}</td>
                  <td className="text-center">{o.orderDate}</td>
                  <td>
                    {o.status === 0 && <span> Đang chờ giao hàng </span>}
                    {o.status === 1 && <span> Đã giao hàng </span>}
                    {o.status === 2 && <span> Đã hủy </span>}                
                  </td>
                  <td className="text-center">
                    <Link className="btn btn-secondary" 
                      to={`/staff/order/view-detail/${o.id}`}
                    >
                      Xem
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <PaginationBar total={state.total}
            pageSize={PAGE_SIZE}
            page={state.page}
            setPage={(page) => dispatch(setPage(page))}
          />

        </div>
      </div>
      
    </div>
  );
}