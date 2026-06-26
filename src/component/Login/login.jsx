// import { NavLink } from "react-router-dom";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().min(6, "Min 6 chars").required("Password is required"),
// });

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: LoginSchema,
//     onSubmit: (values) => {
//       console.log("Login submitted:", values);
//     },
//   });

//   return (
//     <div className="login-container mt-5">
//       {/* LEFT – FORM */}
//       <div className="login-form-section">
//         <div className="login-form-wrapper">
//           <h1 className="login-title">Login</h1>

//           <form onSubmit={formik.handleSubmit}>
//             {/* Email */}
//             <div className="form-group">
//               <label className="form-label">Email</label>
//               <div className="input-wrapper">
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-input"
//                   placeholder="Enter your Email"
//                   value={formik.values.email}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 <i className="far fa-envelope input-icon"></i>
//               </div>
//               {formik.errors.email && formik.touched.email && (
//                 <p className="error-text">{formik.errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div className="form-group">
//               <label className="form-label">Password</label>
//               <div className="input-wrapper">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   className="form-input"
//                   placeholder="Enter your password"
//                   value={formik.values.password}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                 />
//                 <button
//                   type="button"
//                   className="password-toggle"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   <i
//                     className={`far fa-eye${
//                       showPassword ? "" : "-slash"
//                     }`}
//                   ></i>
//                 </button>
//               </div>
//               {formik.errors.password && formik.touched.password && (
//                 <p className="error-text">{formik.errors.password}</p>
//               )}

//               <div className="password-links">
//                 <NavLink to="/forget" className="forgot-link">
//                   Forget Password ?
//                 </NavLink>
//                 <NavLink to="/new-password" className="new-password-link">
//                   New password
//                 </NavLink>
//               </div>
//             </div>

//             {/* Login button */}
//             <button type="submit" className="btn-login">
//               Login
//             </button>

//             {/* OR divider */}
//             <div className="divider">
//               <span>OR</span>
//             </div>

//             {/* Google button */}
//             <button type="button" className="btn-google">
//               Login With Google
//               <i className="fab fa-google google-icon"></i>
//             </button>

//             {/* Social icons row */}
//             <div className="social-icons">
//               <span className="social-icon facebook">
//                 <i className="fab fa-facebook-f"></i>
//               </span>
//               <span className="social-icon cloud">
//                 <i className="fas fa-cloud"></i>
//               </span>
//               <span className="social-icon google">
//                 <i className="fab fa-google"></i>
//               </span>
//             </div>
//           </form>

//           {/* Sign up text */}
//           <p className="signup-link">
//             Don’t Have Account?
//             <NavLink to="/register" className="signup-anchor">
//               {" "}
//               Sign Up !
//             </NavLink>
//           </p>
//         </div>
//       </div>

//       {/* RIGHT – SHAPES + TEXT */}
//   {/* RIGHT – SHAPES + TEXT */}
// <div className="login-decorative-section">
//   <div className="pill-shapes">
//     <div className="pill pill-1 xsmaxf"></div>
//     <div className="pill pill-2 xsmax "></div>
//     <div className="pills pill-3 "></div>
//     <div className="pills pill-4"></div>
//   </div>

//   <div className="welcome-text">
//     <h2>Hello</h2>
//     <h3>Welcome Back !</h3>
//   </div>
// </div>


//     </div>
//   );
// }










import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 chars").required("Password is required"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
onSubmit: async (values) => {
  setIsLoading(true);
  setErrorMsg("");
  try {

    const response = await axios.post("https://graduationproject1.runasp.net/login", values);
    
    console.log("Response data:", response.data);

   if (response.data.isSuccess) {

  const cleanToken = response.data.data.token;
  localStorage.setItem("userToken", cleanToken);
  navigate("/admin-dashboard");
}
  } catch (error) {
    console.error("Login Error:", error);
    // إذا كان الخطأ في الشبكة (الرابط غلط) ستظهر هذه الرسالة:
    if (error.code === "ERR_NAME_NOT_RESOLVED") {
      setErrorMsg("خطأ في رابط السيرفر، تأكد من كتابة runasp.net بشكل صحيح");
    } else {
      setErrorMsg(error.response?.data?.message || "Invalid Email or Password");
    }
  } finally {
    setIsLoading(false);
  }
},
  });

  return (
    <div className="login-container mt-5">
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <h1 className="login-title">Login</h1>

          {errorMsg && <div className="alert alert-danger text-center p-2 mb-3">{errorMsg}</div>}

          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="form-group mb-3">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <i className="far fa-envelope input-icon"></i>
              </div>
              {formik.errors.email && formik.touched.email && (
                <p className="error-text">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-group mb-2">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`far fa-eye${showPassword ? "" : "-slash"}`}></i>
                </button>
              </div>
              
              {/* رابط نسيت كلمة السر المضاف */}
              <div className="d-flex justify-content-end mt-2">
                <NavLink to="/forget" style={{ textDecoration: 'none' }}>
                   <span className="forgot">Forgot Password?</span>
                </NavLink>
              </div>

              {formik.errors.password && formik.touched.password && (
                <p className="error-text">{formik.errors.password}</p>
              )}
            </div>

            {/* Login button */}
            <button type="submit" className="btn-login mt-4" disabled={isLoading}>
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>

            <div className="divider"><span>OR</span></div>
            
            <button type="button" className="btn-google">
              <i className="fab fa-google google-icon"></i>
                          <NavLink to="/GoogleAuth" className=" text-white"> Login With Google </NavLink>

            </button>
          </form>
          

          <p className="signup-link mt-4">
            Don’t Have Account? 
            <NavLink to="/register" className="signup-anchor"> Sign Up !</NavLink>
          </p>
        </div>
      </div>

      {/* Decorative Section */}
      <div className="login-decorative-section">
        <div className="pill-shapes">
          <div className="pill pill-1 xsmaxf"></div>
          <div className="pill pill-2 xsmax"></div>
          <div className="pills pill-3"></div>
          <div className="pills pill-4"></div>
        </div>
        <div className="welcome-text">
          <h2>Hello</h2>
          <h3>Welcome Back !</h3>
        </div>
      </div>
    </div>
  );
}