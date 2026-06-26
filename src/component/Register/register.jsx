// import { useState } from "react";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash, faEnvelope, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// // Validation Schema
// const validationSchema = Yup.object({
//   name: Yup.string().required("Required"),
//   Email: Yup.string().email("Invalid email").required("Required"),
//   Password: Yup.string().min(6, "Min 6 characters").required("Required"),
//   ConfirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Required"),
//   age: Yup.number().typeError("Must be a number"),
//   location: Yup.string(),
//   role: Yup.string().required("Required"),
// });

// export default function SignUpForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   return (
//     <div className="signup-container  pt-5">
//       <div className="signup-wrapper">
//         <h1 className="signup-title">Sign Up Page</h1>

//         <Formik
//           initialValues={{
//             name: "",
//             email: "",
//             password: "",
//             confirmPassword: "",
//             age: "",
//             location: "",
//             role: "",
//           }}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             console.log("Form Submitted:", values);
//             // API placeholder
//           }}
//         >
//           {({ values, errors, touched, handleChange, handleSubmit }) => (
//             <form className="signup-form" onSubmit={handleSubmit}>
//               {/* Row 1 */}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="form-label">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="form-input"
//                     value={values.name}
//                     onChange={handleChange}
//                     placeholder="Enter your name"
//                   />
//                   {errors.name && touched.name && (
//                     <div className="error">{errors.name}</div>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Email</label>
//                   <div className="input-wrapper">
//                     <input
//                       type="email"
//                       name="email"
//                       className="form-input"
//                       value={values.email}
//                       onChange={handleChange}
//                       placeholder="Enter your Email"
//                     />
//                     <span className="input-icon">
//                       <FontAwesomeIcon icon={faEnvelope} />
//                     </span>
//                   </div>
//                   {errors.email && touched.email && (
//                     <div className="error">{errors.email}</div>
//                   )}
//                 </div>
//               </div>

//               {/* Row 2 */}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="form-label">Password</label>
//                   <div className="input-wrapper">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       className="form-input"
//                       value={values.password}
//                       onChange={handleChange}
//                       placeholder="Enter your password"
//                     />
//                     <button
//                       type="button"
//                       className="icon-button"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                     </button>
//                   </div>
//                   {errors.password && touched.password && (
//                     <div className="error">{errors.password}</div>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Confirm Password</label>
//                   <div className="input-wrapper">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       className="form-input"
//                       value={values.confirmPassword}
//                       onChange={handleChange}
//                       placeholder="Confirm your password"
//                     />
//                     <button
//                       type="button"
//                       className="icon-button"
//                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     >
//                       <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
//                     </button>
//                   </div>
//                   {errors.confirmPassword && touched.confirmPassword && (
//                     <div className="error">{errors.confirmPassword}</div>
//                   )}
//                 </div>
//               </div>

//               {/* Row 3 */}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="form-label">Age</label>
//                   <div className="input-wrapper select-wrapper">
//                     <input
//                       type="number"
//                       name="age"
//                       className="form-input"
//                       value={values.age}
//                       onChange={handleChange}
//                       placeholder="Enter your age"
//                     />
//                     <span className="input-icon chevron-icon">
//                       <FontAwesomeIcon icon={faChevronDown} />
//                     </span>
//                   </div>
//                   {errors.age && touched.age && (
//                     <div className="error">{errors.age}</div>
//                   )}
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Location</label>
//                   <input
//                     type="text"
//                     name="location"
//                     className="form-input"
//                     value={values.location}
//                     onChange={handleChange}
//                     placeholder="Enter your City"
//                   />
//                 </div>
//               </div>

//               {/* Role */}
//               <div className="form-group full-width">
//                 <label className="form-label">I'm signing up as:</label>
//                 <div className="input-wrapper select-wrapper">
//                   <select
//                     name="role"
//                     className="form-input"
//                     value={values.role}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select your role</option>
//                     <option value="student">Student</option>
//                     <option value="professional">Professional</option>
//                     <option value="business">Business Owner</option>
//                     <option value="other">Other</option>
//                   </select>
//                   <span className="input-icon chevron-icon">
//                     <FontAwesomeIcon icon={faChevronDown} />
//                   </span>
//                 </div>
//                 {errors.role && touched.role && (
//                   <div className="error">{errors.role}</div>
//                 )}
//               </div>

//               {/* Buttons */}
//               <div className="button-group">
//                 <button type="submit" className=" btn btn-google bg-blo">
//                   Submit
//                 </button>

//                 <button
//                   type="button"
//                   className="btn btn-google"
//                   onClick={() => console.log("Google Sign up clicked")}
//                 >
//                   <span>Sign up with Google</span>
//                   <span className="google-icon">G</span>
//                 </button>
//               </div>
//             </form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

















import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios"; 
import { useNavigate, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faChevronDown, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

// 1. مخطط التحقق بأسماء الحقول الجديدة
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  genderType: Yup.string().oneOf(["Male", "Female"], "Select Gender").required("Required"),
  birthDate: Yup.date().required("Required"),
  city: Yup.string().required("Required"),
});

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post("https://graduationproject1.runasp.net/api/Account/google-login", {
        idToken: response.credential,
      });
      if (res.status === 200 || res.status === 201) {
        alert("Google Login Successful!");
        navigate("/login"); 
      }
    } catch (error) {
      alert("Google Sign-In failed.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: "993310853138-lmutd7a9nogenvkl5apieffu5qotdqdf.apps.googleusercontent.com",
          callback: handleGoogleResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("googleBtn"),
          { theme: "outline", size: "large", width: "600px", shape: "pill" }
        );
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("https://graduationproject1.runasp.net/register", values);
      if (response.status === 200 || response.status === 201) {
    
        navigate("/login"); 
      }
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert(`Error: ${error.response?.data?.title || "Registration failed"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signup-container pt-5">
      <div className="signup-wrapper">
        <h1 className="signup-title">Sign Up</h1>

        <Formik
          // تأكد أن القيم هنا مطابقة تماماً للـ name في الـ inputs
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            genderType: "",
            birthDate: "",
            city: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form className="signup-form" onSubmit={handleSubmit}>
              
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text" 
                    name="firstName" // يجب أن يكون حرفاً صغيراً
                    className={`form-input ${errors.firstName && touched.firstName ? 'input-error' : ''}`}
                    value={values.firstName || ""} // إضافة || "" تمنع خطأ undefined
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                  />
                  {errors.firstName && touched.firstName && <div className="error-message">{errors.firstName}</div>}
                </div>

                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text" name="lastName"
                    className={`form-input ${errors.lastName && touched.lastName ? 'input-error' : ''}`}
                    value={values.lastName || ""} 
                    onChange={handleChange} onBlur={handleBlur}
                  />
                  {errors.lastName && touched.lastName && <div className="error-message">{errors.lastName}</div>}
                </div>
              </div>

              <div className="full-width">
                <label>Email</label>
                <div className="input-wrapper">
                  <input
                    type="email" name="email"
                    className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`}
                    value={values.email || ""} 
                    onChange={handleChange} onBlur={handleBlur}
                  />
                  <span className="input-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                </div>
                {errors.email && touched.email && <div className="error-message">{errors.email}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"} name="password"
                      className={`form-input ${errors.password && touched.password ? 'input-error' : ''}`}
                      value={values.password || ""} 
                      onChange={handleChange} onBlur={handleBlur}
                    />
                    <button type="button" className="icon-button" onClick={() => setShowPassword(!showPassword)}>
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.password && touched.password && <div className="error-message">{errors.password}</div>}
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                      className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}`}
                      value={values.confirmPassword || ""} 
                      onChange={handleChange} onBlur={handleBlur}
                    />
                    <button type="button" className="icon-button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gender</label>
                  <div className="input-wrapper select-wrapper">
                    <select name="genderType" 
                            className={`form-input ${errors.genderType && touched.genderType ? 'input-error' : ''}`} 
                            value={values.genderType || ""} 
                            onChange={handleChange} onBlur={handleBlur}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <span className="input-icon chevron-icon"><FontAwesomeIcon icon={faChevronDown} /></span>
                  </div>
                  {errors.genderType && touched.genderType && <div className="error-message">{errors.genderType}</div>}
                </div>

                <div className="form-group">
                  <label>Birth Date</label>
                  <input
                    type="date" name="birthDate"
                    className={`form-input ${errors.birthDate && touched.birthDate ? 'input-error' : ''}`}
                    value={values.birthDate || ""} 
                    onChange={handleChange} onBlur={handleBlur}
                  />
                  {errors.birthDate && touched.birthDate && <div className="error-message">{errors.birthDate}</div>}
                </div>
              </div>

              <div className="full-width">
                <label>City</label>
                <div className="input-wrapper">
                  <input
                    type="text" name="city"
                    className={`form-input ${errors.city && touched.city ? 'input-error' : ''}`}
                    value={values.city || ""} 
                    onChange={handleChange} onBlur={handleBlur}
                  />
                  <span className="input-icon"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                </div>
                {errors.city && touched.city && <div className="error-message">{errors.city}</div>}
              </div>

              <div className="button-group mt-3">
                <button type="submit" className="btn btn-google bg-blo w-100 mb-2" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Submit"}
                </button>
                <div id="googleBtn" className="w-100 mb-3"></div>
              </div>
            </form>
          )}
        </Formik>

        <div className="text-center mt-3">
          <span style={{ color: "#666" }}>Already Have an Account? </span>
          <NavLink to="/login" style={{ color: "#28a745", fontWeight: "bold", textDecoration: "none" }}>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
}