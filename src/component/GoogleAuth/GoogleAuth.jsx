import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
  const navigate = useNavigate();

  // دالة التعامل مع استجابة جوجل وإرسالها للسيرفر
  const handleCredentialResponse = async (response) => {
    console.log("Encoded JWT ID token: " + response.credential);

    try {
      const res = await fetch('https://graduationproject1.runasp.net/api/Account/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          idToken: response.credential // إرسال التوكن للسيرفر كما يتوقع
        })
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Success:", data);

        // ✅ حفظ بيانات التوثيق في المتصفح
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // ✅ التوجيه إلى الصفحة الرئيسية (Home)
        navigate("/home"); 
      } else {
        console.error("Server Error:", data);
        alert("فشل التحقق من الحساب: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("حدث خطأ في الاتصال بالشبكة، يرجى المحاولة مرة أخرى.");
    }
  };

  useEffect(() => {
    // منع تكرار تحميل السكريبت لتجنب أخطاء Hook
    const scriptId = "google-jssdk";
    if (document.getElementById(scriptId)) {
       // إذا كان السكريبت موجوداً، فقط قم بتهيئة الزر
       renderGoogleButton();
       return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = renderGoogleButton;
    document.body.appendChild(script);

    function renderGoogleButton() {
      if (window.google) {
        window.google.accounts.id.initialize({
          // تم استخدام الـ Client ID الخاص بك
          client_id: "551179885180-crgfh7mcstv8ppqvml3irtf5k440tma2.apps.googleusercontent.com",
          callback: handleCredentialResponse,
          context: "signin",
          ux_mode: "popup",
          auto_prompt: false
        });

        window.google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          {
            type: "standard",
            shape: "pill",
            theme: "outline",
            text: "signin_with",
            width: "400", // تكبير الزر ليتناسب مع التصميم
            size: "large",
            logo_alignment: "left"
          }
        );
      }
    }

    // تنظيف عند إغلاق المكون
    return () => {
      // لا نحذف السكريبت هنا لأنه قد نحتاجه في صفحات أخرى، 
      // ولكننا نضمن عدم تكراره بفضل شرط الـ scriptId
    };
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      marginTop: '150px',
      width: '100%' 
    }}>
      {/* حاوية زر جوجل */}
      <div id="buttonDiv"></div>
      
      <p style={{ marginTop: '20px', color: '#666' }}>
        Already Have an Account? <span 
          onClick={() => navigate('/login')} 
          style={{ color: '#28a745', fontWeight: 'bold', cursor: 'pointer' }}
        >Login</span>
      </p>
    </div>
  );
};

export default GoogleLogin;