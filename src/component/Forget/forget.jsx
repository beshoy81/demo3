// import React from 'react'


// //https://graduationproject1.runasp.net/api/Account/forgot-password
// export default function ForgetPassword() {
// return (
// <div className="forget-bg d-flex justify-content-center align-items-center min-vh-100 ">
// <div className="card   forget-card p-5 shadow-lg my-box">
// <h2 className="text-center fw-bold h1 mb-3">Forget Password</h2>
// <p className="text-center text-muted h5 mb-5">
// Please Write your Email to receive a confirmation code<br />
// to send a new password
// </p>


// <div className="mb-2  ">
// <label className="fw-semibold h4 strong mb-3">Email Address</label>
// <input 
// type="email"
// className="form-control custom-input "
// placeholder="example@gmail.com"
// />
// </div>
// <div className=' mt-3 '>

// <button className="btn  w-100  confirm-btn  mt-4">Confirm Mail</button>
// </div>

// </div>
// </div>
// );
// }










import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 

export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate(); 

    const formik = useFormik({
        initialValues: { 
            Email: "" 
        },
        validationSchema: Yup.object({
            Email: Yup.string()
                .email("البريد الإلكتروني غير صحيح")
                .required("البريد الإلكتروني مطلوب"),
        }),
      onSubmit: async (values) => {
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    try {
        const response = await axios.post(
            "https://graduationproject1.runasp.net/api/Account/forgot-password", 
            { email: values.Email }
        );

     
        if (response.status === 200 || response.data.status === "Success") {
            console.log("Response from server:", response);
            setMessage({ text: "تم إرسال الكود بنجاح! افحص بريدك الإلكتروني", type: "success" });
            
        
            setTimeout(() => {
                navigate('/verifyEmail', { 
                    state: { email: values.Email } 
                }); 
            }, 2000);
        }
    } catch (error) {
       
        const errorMsg = error.response?.data?.message || "حدث خطأ في الإرسال، تأكد من البريد";
        setMessage({ text: errorMsg, type: "danger" });
    } finally {
        setIsLoading(false);
    }
},
    });

    return (
        <div className="forget-page-wrapper forget-password-page d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className="card custom-forget-card forget-card-container shadow-sm p-4" style={{ maxWidth: '600px', width: '100%' }}>
                <h2 className="text-center mb-3">Forget Password</h2>
                <p className="text-center text-muted small">
                    Please enter your Email to receive a confirmation code to reset your password.
                </p>

                {message.text && (
                    <div className={`alert alert-${message.type} py-2 small text-center`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="Email"
                            className={`form-control custom-input-style ${formik.errors.Email && formik.touched.Email ? 'is-invalid' : ''}`}
                            placeholder="example@gmail.com"
                            value={formik.values.Email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.Email && formik.touched.Email && (
                            <div className="invalid-feedback">{formik.errors.Email}</div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 confirm-btn-style" 
                        disabled={isLoading || !formik.isValid}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Sending...
                            </>
                        ) : (
                            "Confirm Mail"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}