import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ResetPasswordTokenPage = () => {
    const { reset_password_token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        if (reset_password_token) {
            // Đảm bảo token hợp lệ
            axios
                .post(`${server}/user/verify-reset-token`, {
                    reset_password_token,
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
    }, [reset_password_token]);

    const handleResetPassword = () => {
        if (password === confirmPassword) {
            // Gửi yêu cầu đặt lại mật khẩu
            axios
                .post(`${server}/user/reset-password`, {
                    reset_password_token,
                    password,
                })
                .then((res) => {
                    setMessage("Mật khẩu của bạn đã được đặt lại thành công!");
                })
                .catch((err) => {
                    setError(true);
                    setMessage("Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại sau.");
                });
        } else {
            setMessage("Mật khẩu và xác nhận mật khẩu không khớp.");
        }
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            {error ? (
                <p>Mã token của bạn không hợp lệ hoặc đã hết hạn.</p>
            ) : (
                <>
                    <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={handleResetPassword}>Đặt lại mật khẩu</button>
                    {message && <p>{message}</p>}
                </>
            )}
        </div>
    );
};

export default ResetPasswordTokenPage;
