import axios from "axios";
import { Country, State } from "country-state-city";
import currency from "currency-formatter";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";
import styles from "../../styles/styles";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("VN");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = async () => {
    if (address1 === "" || country === "" || city === "") {
      toast.error("Vui lòng chọn địa chỉ giao hàng!");
    } else {
      const shippingAddress = {
        address1,
        country,
        city,
        name,
        phoneNumber,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        shopTotal,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));

      // Gọi API để cập nhật số lượng mã giảm giá còn lại
      if (couponCodeData) {
        const couponName = couponCodeData.name;

        // Gửi yêu cầu PUT lên máy chủ để cập nhật số lượng còn lại
        await axios.put(
          `${server}/coupon/update-coupon-quantity/${couponName}`
        );
      }
      navigate("/payment");
    }
  };

  const calculateShopTotal = (cart) => {
    const shopTotalMap = new Map();
  
    cart.forEach((item) => {
      const shopId = item.shopId;
      const itemPrice = item.discountPrice === 0 ? item.originalPrice : item.discountPrice;
      const itemTotal = item.qty * itemPrice;
  
      if (!shopTotalMap.has(shopId)) {
        shopTotalMap.set(shopId, {
          totalQuantity: item.qty,
          totalPrice: itemTotal,
        });
      } else {
        const existingShopTotal = shopTotalMap.get(shopId);
        existingShopTotal.totalQuantity += item.qty;
        existingShopTotal.totalPrice += itemTotal;
      }
    });
  
    return Object.fromEntries(shopTotalMap);
  };
  const shopTotal = calculateShopTotal(cart);
  console.log(shopTotal)

  const subTotalPrice = cart.reduce((acc, item) => {
    const itemPrice =
      item.discountPrice === 0 ? item.originalPrice : item.discountPrice;
    return acc + item.qty * itemPrice;
  }, 0);


  const shopCount = new Set(cart.map((item) => item.shopId)).size;
  const shipping = 30000 * shopCount;
  console.log(shipping);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      const remainingQuantity = res.data.couponCode?.remainingQuantity; // Lấy remainingQuantity từ response
      const quantity = res.data.couponCode?.quantity;

      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Mã voucher không hợp lệ cho cửa hàng này!");
          setCouponCode("");
        } else if (remainingQuantity >= quantity) {
          toast.error("Mã voucher đã hết!");
          setCouponCode("");
        } else {
          // Cập nhật remainingQuantity sau khi sử dụng mã giảm giá
          // const updatedRemainingQuantity = remainingQuantity + 1;

          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Mã Voucher này không tồn tại!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);


  console.log(discountPercentenge);

  // thêm 


   
 

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          {/* Hiển thị thông tin giao hàng */}
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            // address2={address2}
            setAddress2={setAddress2}
            // zipCode={zipCode}
            // setZipCode={setZipCode}
            name={name}
            setName={setName}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            cart={cart}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          {/* Hiển thị giỏ hàng và tính toán phí giao hàng */}
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            shopTotal={shopTotal}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10 bg-[#f63b60f3]`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Thanh toán</h5>
      </div>
    </div>
  );
};



const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  // address2,
  // setAddress2,
  // zipCode,
  // setZipCode,
  name,
  setName,
  phoneNumber,
  setPhoneNumber,
  cart,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Thông tin giao hàng</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Tên khách hàng:</label>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email:</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Số điện thoại: +(84)</label>
            <input
              type="number"
              required
              // value={user && user.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          {/* <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div> */}
          <div className="w-[50%]">
            <label className="block pb-2">Tỉnh, thành phố:</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Chọn tỉnh, thành phố
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.name}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Khu vực:</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Chọn khu vực
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          {/* <div className="w-[50%]">
           <label className="block pb-2">Tỉnh, thành phố:</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Chọn tỉnh, thành phố
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div> */}
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Địa chỉ:</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          {/* <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div> */}
        </div>

        <div></div>
      </form>

      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Chọn địa chỉ mà bạn đã lưu:{" "}
        <h5 className="text-[#027df0fd]">(Nhấn vào đây để chọn)</h5>
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    // setAddress2(item.address2) ||
                    // setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
      <div className="mb-4">
        <h5 className="text-[18px] font-[500] mb-2">
          Sản phẩm trong đơn hàng:
        </h5>
        {cart.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <img
              src={item.images[0]} 
              alt={item.name}
              className="w-8 h-8 mr-2 object-cover"
            />
            <span className="mr-2">{item.name}</span>
            <span>x{item.qty}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h5 className="text-[18px] font-[500] mb-2">
          Cửa hàng:
        </h5>
        {cart.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
             <img
              src={item.shop.avatar} 

              className="w-8 h-8 mr-2 object-cover"
            />
            <span
              className="mr-2">{item.shop.name} 
            </span>
        
          </div>
        ))}
      </div>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  shopTotal,
  calculateShopTotal,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng tiền:</h3>
        <h5 className="text-[18px] font-[600]">
          {currency.format(subTotalPrice, { code: "VND" })}
        </h5>
      </div>

      <br />
      {Object.entries(shopTotal).map(([shopId, shopInfo]) => (
        <div key={shopId} className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">
            Tiền shop {shopId}:
          </h3>
          <h5 className="text-[18px] font-[600]">
            {currency.format(shopInfo.totalPrice, { code: "VND" })}
          </h5>
        </div>
      ))}

      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Phí giao hàng:
        </h3>
        <h5 className="text-[18px] font-[600]">
          {currency.format(shipping.toFixed(2), { code: "VND" })}
        </h5>
      </div>
      <br/>

      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Voucher:</h3>
        <h5 className="text-[18px] font-[600]">
          -
          {discountPercentenge
            ? "" +
              `${currency.format(discountPercentenge.toString(), {
                code: "VND",
              })}`
            : null}
        </h5>
      </div>
      <h3 className="text-[16px] font-[400] text-[#000000a4]">Tổng cộng:</h3>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        {" "}
        {currency.format(totalPrice, { code: "VND" })}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Áp dụng mã Voucher ngay!!! "
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] font-bold rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Áp dụng mã voucher"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;