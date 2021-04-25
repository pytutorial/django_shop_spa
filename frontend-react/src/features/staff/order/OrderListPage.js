import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";
import PaginationBar from "components/PaginationBar";

import {clearData as clearOrderDetail} from "./orderDetailSlice";
import { fetchOrderList, setLoading, setPage, setSearchParams } from "./orderListSlice";
import {PAGE_SIZE} from "utils/Constants";

export default function OrderListPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const state = useSelector(globalState => globalState.orderList) || {};
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchOrderList());
  }, [state.page, state.keyword]);

  const offset = (state.page - 1) * PAGE_SIZE;

  const items = state.items;
  const loading = state.loading;

  const searchOrder = (e) => {
    e.preventDefault();
    dispatch(setSearchParams({keyword: keyword}));
  }

  const viewOrderDetail = (id) => {
    dispatch(clearOrderDetail());
    history.push(`/staff/order/view-detail/${id}`);
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
              <form onSubmit={searchOrder}>
                <input className="form-control" placeholder='Tìm theo tên sản phẩm/tên/số điện thoại Khách hàng'
                  value={keyword} onChange={e => setKeyword(e.target.value)}/>
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
              {!loading && items && items.length == 0 && 
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
                    <button className="btn btn-secondary" onClick={() => viewOrderDetail(o.id)}>
                      Xem
                    </button>
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