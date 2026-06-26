import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function VerifyEmail({ onNext }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(29);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  // مراجع (refs) للانتقال التلقائي بين المربعات
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (index, value) => {
    if (isNaN(value)) return; // التأكد من إدخال أرقام فقط
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // الانتقال التلقائي للحقل التالي إذا تم إدخال رقم
    if (value !== "" && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // العودة للحقل السابق عند الضغط على Backspace
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleConfirm = async () => {
    const fullCode = code.join("");
    if (fullCode.length < 4) {
      setErrorMsg("Please enter the full 4-digit code.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post("https://graduationproject1.runasp.net/api/Account/verify-code", {
        code: fullCode,
        // ملحوظة: الـ API قد يتطلب الإيميل أيضاً هنا، تأكد من إضافته إذا لزم الأمر
      });

      if (response.status === 200) {
        console.log("Verification Success:", response.data);
        if (onNext) onNext();
      }
    } catch (error) {
      console.error("Verification Error:", error);
      setErrorMsg(error.response?.data?.message || "Invalid or expired code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return; // منع إعادة الإرسال قبل انتهاء الوقت
    
    setTimer(29);
    setErrorMsg("");
    console.log("Resending confirmation code...");
    
    try {
      // استبدل هذا المسار بمسار إعادة الإرسال في الـ API الخاص بك
     //  await axios.post("https://graduationproject1.runasp.net/api/Account/verify-code", { email: "..." });
    } catch (error) {
      setErrorMsg("Failed to resend code.");
    }
  };

  return (
    <div className="auth-container pref-page-root xbg">
      <div className="auth-card my-box">
        <h1 className="auth-title">Verify Email Address</h1>
        <p className="auth-subtitle">
          Verification code sent to : <span className="email-text"></span>
        </p>

        {errorMsg && <div className="alert alert-danger p-2 small mb-3">{errorMsg}</div>}

        <div className="code-inputs-wrapper">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="code-input"
              placeholder="-"
            />
          ))}
        </div>

        <button 
          className="btn btn-primary btn-lg btn-confirm w-100 mt-4" 
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? <i className="fas fa-spinner fa-spin me-2"></i> : "Confirm Code"}
        </button>

        <div className="d-flex align-items-center justify-content-center gap-2 timer-section mt-4">
          <span className="timer">00:{timer.toString().padStart(2, "0")}</span>
          <button 
            className="btn btn-link btn-resend" 
            onClick={handleResend}
            disabled={timer > 0}
          >
            Resend Confirmation code
          </button>
        </div>
      </div>
    </div>
  );
}