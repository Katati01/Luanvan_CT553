import currency from "currency-formatter";
import { format, isSameDay, isSameMonth, isSameYear } from "date-fns";
import React, { useState } from "react";

const ShopRevenueStatistics = ({ orders }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Tính toán doanh thu cho ngày, tháng và năm đã chọn
  const calculateRevenue = (selectedDate, period) => {
    return orders.reduce((totalRevenue, order) => {
      const orderDate = new Date(order.createdAt);

      if (
        (period === "day" && isSameDay(orderDate, selectedDate)) ||
        (period === "month" && isSameMonth(orderDate, selectedDate)) ||
        (period === "year" && isSameYear(orderDate, selectedDate))
      ) {
        return totalRevenue + calculateShopTotalPrice(order.cart);
      }

      return totalRevenue;
    }, 0);
  };
  const calculateShopTotalPrice = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.discountPrice * item.qty,
      0
    );
  };
  // Hiển thị doanh thu cho ngày, tháng và năm đã chọn
  const revenueForDay = calculateRevenue(selectedDate, "day");
  const revenueForMonth = calculateRevenue(selectedDate, "month");
  const revenueForYear = calculateRevenue(selectedDate, "year");

  return (
    <div>
      <h2>Thống kê doanh thu</h2>
      <label>Chọn ngày:</label>
      <input
        type="date"
        value={format(selectedDate, "yyyy-MM-dd")}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
      />
      <div>
        <p>Doanh thu ngày: {currency.format(revenueForDay, { code: "VND" })}</p>
        <p>
          Doanh thu tháng: {currency.format(revenueForMonth, { code: "VND" })}
        </p>
        <p>Doanh thu năm: {currency.format(revenueForYear, { code: "VND" })}</p>
      </div>
    </div>
  );
};

export default ShopRevenueStatistics;
