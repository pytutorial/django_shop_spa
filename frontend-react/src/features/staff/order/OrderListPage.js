import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import PaginationBar from "components/PaginationBar";
import { useSliceSelector, useSliceStore } from "utils/Helper";
import {PAGE_SIZE} from "utils/Constants";

import { SLICE_NAME } from "./orderListReducer";

function fetchOrderList({store, keyword, page}) {
  store.setState({loading: true, total: 0, items: []});
  keyword = keyword ?? '';
  page = page ?? 1;
  const start = (page-1) * PAGE_SIZE;
  const url = `/api/order/search?keyword=${keyword}&start=${start}&count=${PAGE_SIZE}`;
  
  axios.get(url).then(result => {
    const data = result.data;
    store.setState({
      total: data.total, 
      items: data.items, 
      keyword, 
      page, 
      loading: false
    });
  });
}

export default function OrderListPage() {
  const store = useSliceStore(SLICE_NAME);

  useEffect(() => {
    const {keyword, page} = store.getState();
    fetchOrderList({store, keyword, page:page??1});
  }, []);

  const searchOrder = (e) => {
    e.preventDefault();
    const data = new FormData(document.getElementById('fmt'));
    const keyword = data.get('keyword');
    fetchOrderList({store, keyword, page: 1});
  }
  
  const setPage = (page) => {
    const {keyword} = store.getState();
    fetchOrderList({store, keyword, page});
  }

  const [page, items, loading, keyword,total] = useSliceSelector(SLICE_NAME, 
        ['page', 'items', 'loading',  'keyword', 'total']);

  const offset = (page - 1) * PAGE_SIZE;

  return (
    <div className="p-3">
      <div className="card shadow">
        <div className="card-header">
          <h6>Danh sách đơn hàng</h6>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col">
              <form id="fmt" onSubmit={searchOrder}>
                <input name="keyword" key={page} 
                  className="form-control" 
                  placeholder='Tìm theo tên sản phẩm/tên/số điện thoại Khách hàng'
                  defaultValue={keyword}
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
                <th style={{width: "20%"}}>Ngày đặt hàng</th>
                <th style={{width: "17%"}}>Trạng thái</th>
                <th style={{width: "8%"}}></th>
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
                    <Link className="btn btn-sm btn-secondary" 
                      to={`/staff/order/view-detail/${o.id}`}
                    >
                      Xem
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <PaginationBar total={total}
            pageSize={PAGE_SIZE}
            page={page}
            setPage={setPage}
          />

        </div>
      </div>
      
    </div>
  );
}