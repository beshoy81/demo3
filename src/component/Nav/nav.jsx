// import React from 'react';
// import { NavLink } from 'react-router-dom';

// export default function Nav() {
//   return (
//     <nav className="navbar navbar-expand-lg bg-nav fixed-top bgnav navbar-dark px-2 shadow-sm">
//       <div className="container">
        
    

//         {/* زر الـ Toggle للموبايل */}
//         <button
//           className="navbar-toggler border-0 shadow-none"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
//         </button>

//         {/* القائمة المنسدلة */}
//         <div className="collapse navbar-collapse" id="navbarNav">
          
//           {/* 1. روابط الصفحات (في المنتصف أو اليسار) */}
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
//             <li className="nav-item">
//               <NavLink className="nav-link px-3" to="/home">Home</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link px-3" to="/products">Apartments</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link px-3" to="/categories">Matches</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link px-3" to="/brands">Chats</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link px-3" to="/orders">Profile</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link px-3" to="/PropertyType">AddProperty</NavLink>
//             </li>
//           </ul>

//           {/* 2. أزرار تسجيل الدخول (في أقصى اليمين) */}
//           <div className="d-flex flex-column w-25 flex-lg-row align-items-center gap-2 mt-3 mt-lg-0">
//             <NavLink 
//               className="btn py-2  bg-reg text-white fw-bold px-4 py-2 rounded-pill shadow-sm w-100 w-lg-auto" 
//               to="/login"
//             >
//               Login
//             </NavLink>
//             <NavLink 
//               className="btn  py-2  bg-reg text-white fw-bold px-4 py-2 rounded-pill shadow-sm w-100 w-lg-auto" 
//               to="/register"
//             >
//               Register
//             </NavLink>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// }



















import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Menu, X, Heart, User } from 'lucide-react';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        /* استيراد الخط المطلوب من Google Fonts */
        @import url('https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          padding-top: 80px;
        }

        .custom-navbar {
          background-color: #f8f9fa; 
          height: 80px;
          display: flex;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 2000;
          border-bottom: 1px solid #eee;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 95%;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* تنسيق اللوجو ليتطابق مع Figma تماماً */
        .logo-text {
          font-family: 'Protest Riot', sans-serif; /* الفونت المطلوب */
          font-size: 40px; /* الحجم المذكور في Figma */
          font-weight: 400; /* الوزن المذكور في Figma */
          color: #1E3A8A; /* الكود اللوني المذكور في Figma */
          text-decoration: none !important;
          white-space: nowrap;
          line-height: 100%; /* المذكور في Figma */
        }

        .search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 10px 40px 10px 20px;
          border-radius: 12px;
          border: 1px solid #1E3A8A; /* توحيد اللون مع الهوية البصرية */
          outline: none;
          font-size: 14px;
        }

        .search-icon {
          position: absolute;
          right: 15px;
          color: #1E3A8A;
        }

        .nav-content {
          display: flex;
          align-items: center;
          gap: 25px;
          flex: 1;
          justify-content: flex-end;
        }

        .nav-links {
          display: flex;
          gap: 15px;
        }

        .nav-item {
          color: #1E3A8A;
          text-decoration: none !important;
          font-weight: 700;
          font-size: 16px;
          transition: 0.2s;
        }

        .nav-item:hover, .nav-item.active {
          opacity: 0.7;
        }

        .nav-auth {
          display: flex;
          gap: 10px;
        }

        .auth-btn {
          text-decoration: none !important;
          font-weight: 700;
          font-size: 14px;
          padding: 8px 24px;
          border-radius: 50px;
        }

        .login-btn {
          color: #1E3A8A;
          border: 1.5px solid #1E3A8A;
        }

        .register-btn {
          background: #1E3A8A;
          color: white;
          border: 1.5px solid #1E3A8A;
        }

        .mobile-toggle {
          background: none;
          border: none;
          color: #1E3A8A;
          cursor: pointer;
        }

        @media (max-width: 991px) {
          .nav-content {
            position: absolute;
            top: 80px;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 30px;
            gap: 20px;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            display: none;
          }
          .nav-content.open { display: flex; }
          .nav-links { flex-direction: column; width: 100%; text-align: center; }
          .nav-auth { flex-direction: column; width: 100%; }
          .auth-btn { width: 100%; text-align: center; }
        }
      `}</style>

      <nav className="custom-navbar fixed-top">
        <div className="nav-container">
          <div className="nav-left">
            <NavLink to="/home" className="logo-text">stay Match</NavLink>
          </div>
{/* 
          <div className="nav-search d-none d-lg-block mx-4">
            <div className="search-wrapper">
              <input type="text" placeholder="Search by location" className="search-input" />
              <Search className="search-icon" size={20} />
            </div>
          </div> */}

          <div className={`nav-content ${isMenuOpen ? 'open' : ''}`}>
            <div className="nav-links">
              {/* <NavLink className="nav-item" to="/home" onClick={() => setIsMenuOpen(false)}>Home</NavLink> */}
              {/* <NavLink className="nav-item" to="/categories" onClick={() => setIsMenuOpen(false)}>Matches</NavLink>
              <NavLink className="nav-item" to="/PropertyType" onClick={() => setIsMenuOpen(false)}>Add Property</NavLink>
              <NavLink className="nav-item" to="/products" onClick={() => setIsMenuOpen(false)}>Browse</NavLink>
              <NavLink className="nav-item" to="/brands" onClick={() => setIsMenuOpen(false)}>Chats</NavLink> */}
              {/* <NavLink className="nav-item" to="/saved" onClick={() => setIsMenuOpen(false)} aria-label="Saved">
                <Heart size={18} />
              </NavLink>
              <NavLink className="nav-item" to="/orders" onClick={() => setIsMenuOpen(false)} aria-label="Profile">
                <User size={18} />
              </NavLink> */}
            </div>

            <div className="nav-auth">
              <NavLink className="auth-btn login-btn" to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
              <NavLink className="auth-btn register-btn" to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink>
            </div>
          </div>
{/* 
          <button className="mobile-toggle d-lg-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button> */}
        </div>
      </nav>
    </>
  );
}