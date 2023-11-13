import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../../server";
import styles from "../../styles/styles";
const ResetPasswordTokenPage = () => {
  // const { reset_password_token } = useParams();
  const { resetPasswordToken } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (resetPasswordToken) {
      // Đảm bảo token hợp lệ
      axios
        .post(`${server}/user/verify-reset-token`, {
          // reset_password_token,
          resetPasswordToken
        })
        .then((res) => {
          // Token hợp lệ, không có lỗi
          setError(false);
        })
        .catch((err) => {
          // Token không hợp lệ hoặc đã hết hạn
          setError(true);
        });
    }
  }, [resetPasswordToken]);

  const handleResetPassword = () => {
    // console.log(password);
    if (password === confirmPassword) {
      axios
        .post(`${server}/user/reset-password`, {
          resetPasswordToken,
          password
        })
        .then((res) => {
          setMessage("Mật khẩu của bạn đã được đặt lại thành công!");
          setError(false); // Xóa thông báo lỗi nếu có
        })
        .catch((err) => {
          setError(true);
          setMessage(
            "Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại sau."
          );
          console.error(err);
        });
    } else {
      setError(true);
      setMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
    }
  };

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <Link to="/">
            <h1 className="text-[33px] font-bold">NÔNG NGHIỆP XANH</h1>
          </Link>
        </div>
      </div>
      <div
        className="bg-[url(https://images.unsplash.com/photo-1681919313941-080179983d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80)] 
            min-h-screen g-6 flex h-full flex-wrap items-center justify-center lg:justify-between"
      >
        <div class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="w-full"
            alt="Sample image"
          />
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Đặt lại mật khẩu
                </h2>
              </div>

              <>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu mới
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Xác nhận mật khẩu
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className={`${styles.noramlFlex} justify-between`}>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    ĐẶT LẠI MẬT KHẨU
                  </button>
                </div>
              </>

              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Quay lại trang đăng nhập?</h4>
                <Link to="/login" className="text-blue-600 pl-2">
                  Đăng nhập
                </Link>
              </div>
              <div className={`${styles.noramlFlex} w-full`}>
                <h4>Quay lại trang chủ?</h4>
                <Link to="/" className="text-blue-600 pl-2">
                  Trang chủ
                </Link>
              </div>

              {/* Hiển thị thông báo lỗi hoặc thành công */}
              {error && (
                <div className="text-red-500 text-center">{message}</div>
              )}
              {!error && message && (
                <div className="text-green-500 text-center">{message}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordTokenPage;
