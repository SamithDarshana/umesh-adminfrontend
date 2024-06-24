import React, { useEffect } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "staus",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  // new Date(reversedOrderState[i]?.createdAt).toLocaleString(),
  const orderState = useSelector((state) => state?.auth?.orders);
  const reversedOrderState = orderState.slice().reverse();
  const data1 = [];
  for (let i = 0; i < reversedOrderState.length; i++) {
    data1.push({
      key: i +1,
      name: reversedOrderState[i]?.shippingInfo.firstName,
      product: reversedOrderState[i]?.orderItems.length,
      staus: reversedOrderState[i].orderStatus,
    });
  }

  let totalSales = 0;
  for (let i = 0; i < orderState?.length; i++) {
    totalSales += orderState[i]?.totalPriceAfterDiscount;
  }

  let monthlySales = 0;
  let yearlySales = 0;
  const currentDate = new Date();
  const firstDayOfLastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const firstDayOfTheLastYear = new Date(currentDate.getFullYear(),0);
  for (let i = 0; i < orderState.length; i++) {
    if(new Date(orderState[i].updatedAt) >= firstDayOfLastMonth){
      monthlySales += orderState[i].totalPriceAfterDiscount;
    }   
  }
  for (let i = 0; i < orderState.length; i++) {
    if(new Date(orderState[i].updatedAt) >= firstDayOfTheLastYear){
      yearlySales += orderState[i].totalPriceAfterDiscount;
    }   
  }

  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let lastMonth = currentDate.getMonth()-1;
  if(lastMonth<0){
    lastMonth =11;
  }
  let lastMonthName = monthNames[lastMonth];


  let monthSales = new Array(12).fill(0);
  for (let i = 0; i < orderState.length; i++) {
    for (let j = 0; j < orderState[i].orderItems.length; j++) {
      if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Jan"
      ) {
        monthSales[0] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Feb"
      ) {
        monthSales[1] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Mar"
      ) {
        monthSales[2] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Apr"
      ) {
        monthSales[3] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "May"
      ) {
        monthSales[4] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Jun"
      ) {
        monthSales[5] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Jul"
      ) {
        monthSales[6] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Aug"
      ) {
        monthSales[7] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Sep"
      ) {
        monthSales[8] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Oct"
      ) {
        monthSales[9] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Nov"
      ) {
        monthSales[10] += 1;
      } else if (
        new Date(orderState[i].createdAt).toDateString().split(" ")[1] === "Dev"
      ) {
        monthSales[11] += 1;
      }
    }
  }
  const data = [
    {
      type: "Jan",
      sales: monthSales[0],
    },
    {
      type: "Feb",
      sales: monthSales[1],
    },
    {
      type: "Mar",
      sales: monthSales[2],
    },
    {
      type: "Apr",
      sales: monthSales[3],
    },
    {
      type: "May",
      sales: monthSales[4],
    },
    {
      type: "Jun",
      sales: monthSales[5],
    },
    {
      type: "July",
      sales: monthSales[6],
    },
    {
      type: "Aug",
      sales: monthSales[7],
    },
    {
      type: "Sept",
      sales: monthSales[8],
    },
    {
      type: "Oct",
      sales: monthSales[9],
    },
    {
      type: "Nov",
      sales: monthSales[10],
    },
    {
      type: "Dec",
      sales: monthSales[11],
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Whole Sales</p>
            <h4 className="mb-0 sub-title">Rs. {totalSales}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p> */}
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Sales for {currentDate.toDateString().split(" ")[3]}</p>
            <h4 className="mb-0 sub-title">Rs. {yearlySales}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To  {currentDate.toDateString().split(" ")[3]-1}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Sales for {currentDate.toDateString().split(" ")[1]}</p>
            <h4 className="mb-0 sub-title">Rs. {monthlySales}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To {lastMonthName} {currentDate.toDateString().split(" ")[3]}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
