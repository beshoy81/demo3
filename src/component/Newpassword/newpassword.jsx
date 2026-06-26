import { useState } from "react";
import axios from "axios";

export default function NewPassword({ onBack, userEmail, verificationCode }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleConfirm = async () => {
    // 1. التحقق الأولي
    if (!password || !confirmPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    setErrorMsg("");
    setIsLoading(true);

    try {
      const response = await axios.post("https://graduationproject1.runasp.net/api/Account/reset-password", {
        // تأكد من أسماء الحقول حسب توثيق الـ API الخاص بك
        email: userEmail, // الإيميل الذي تم إرساله في الخطوات السابقة
        code: verificationCode, // الكود الذي أدخله المستخدم في الصفحة السابقة
        newPassword: password,
        confirmPassword: confirmPassword
      });

      if (response.status === 200) {
        alert("Password updated successfully!");
        // التوجه لصفحة تسجيل الدخول أو الخطوة التالية
        if (onBack) onBack(); 
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      setErrorMsg(error.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container pref-page-root xbg">
      <div className="auth-card my-box">
        <h1 className="auth-title">New Password</h1>
        <p className="auth-subtitle">Please write your new password</p>

        {/* عرض رسائل الخطأ إن وجدت */}
        {errorMsg && <div className="alert alert-danger p-2 small mb-3 text-start">{errorMsg}</div>}

        <div className="mb-3 text-start">
          <label className="form-label fw-bold small">New Password</label>
          <div className="password-input-wrapper position-relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              className="form-control form-input pe-5"
            />
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              style={{ zIndex: 5 }}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <div className="mb-4 text-start">
          <label className="form-label fw-bold small">Confirm Password</label>
          <div className="password-input-wrapper position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="form-control form-input pe-5"
            />
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ zIndex: 5 }}
            >
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-lg btn-confirm w-100" 
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          ) : null}
          {isLoading ? "Updating..." : "Confirm Password"}
        </button>

        {onBack && (
          <button className="btn btn-link mt-2 text-decoration-none text-muted small" onClick={onBack}>
            ← Back to Login
          </button>
        )}
      </div>
    </div>
  );
}