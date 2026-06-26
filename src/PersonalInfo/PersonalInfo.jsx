// import React, { useState, useEffect } from 'react';
// import DashboardSidebar from '../component/Shared/DashboardSidebar';
// import axios from 'axios';
// import { 
//   FaCamera, FaSave, FaSmoking, FaDog, FaMoon
// } from 'react-icons/fa';

// const PersonalInfo = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const BASE_URL = "https://graduationproject1.runasp.net/";

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('userToken')?.replace(/"/g, '');
//         const config = { headers: { 'Authorization': `Bearer ${token}` } };
//         const res = await axios.get(`${BASE_URL}api/UserProfile`, config);
//         setUserData(res.data.data || res.data);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, []);

//   if (loading) return <div className="loading-screen">Loading StayMatch Profile...</div>;

//   return (
//     <div className="staymatch-container">
//       <DashboardSidebar />

//       {/* --- Main Content --- */}
//       <main className="staymatch-main">
        
//         {/* Top Profile Header Card */}
//         <section className="profile-header-card">
//           <div className="header-user-info">
//             <div className="avatar-wrapper">
//               <img src={userData?.imageUrl ? `${BASE_URL}${userData.imageUrl}` : 'https://via.placeholder.com/100'} alt="User" />
//               <div className="edit-overlay"><FaCamera /></div>
//             </div>
//             <div className="user-text">
//               <h2>{userData?.fullName || "Full Name"}</h2>
//               <p>{userData?.job || "Job Title"} @ {userData?.university || "University"}</p>
//               <span className="location-tag">📍 {userData?.city || "New Cairo"}, Egypt</span>
//             </div>
//           </div>
//           <div className="profile-strength">
//             <div className="strength-labels">
//               <span>Profile Strength</span>
//               <span className="pct">85%</span>
//             </div>
//             <div className="progress-bar"><div className="fill" style={{width: '85%'}}></div></div>
//             <p className="strength-hint">Add your social media to reach 100%</p>
//           </div>
//         </section>

//         {/* Personal Information Form Section */}
//         <section className="form-section shadow-card">
//           <h3>Personal Information</h3>
//           <div className="grid-2">
//             <div className="input-grp">
//               <label>Full Name</label>
//               <input type="text" readOnly value={userData?.fullName || ""} placeholder="Full Name" />
//             </div>
//             <div className="input-grp">
//               <label>Email Address</label>
//               <input type="email" readOnly value={userData?.email || ""} placeholder="Email" />
//             </div>
//             <div className="input-grp">
//               <label>Phone Number</label>
//               <input type="text" readOnly value={userData?.phoneNumber || ""} placeholder="Phone" />
//             </div>
//             <div className="input-grp">
//               <label>Gender</label>
//               <select disabled>
//                 <option>{userData?.gender === 0 ? "Male" : "Female"}</option>
//               </select>
//             </div>
//             <div className="input-grp">
//               <label>Education / University</label>
//               <input type="text" readOnly value={userData?.university || ""} />
//             </div>
//             <div className="input-grp">
//               <label>Field of Study / Job</label>
//               <input type="text" readOnly value={userData?.job || ""} />
//             </div>
//           </div>
//         </section>

//         {/* Compatibility Preferences Section */}
//         <section className="form-section shadow-card">
//           <div className="section-header">
//             <h3>Compatibility Preferences</h3>
//             <p>These settings help us find the perfect roommates for you.</p>
//           </div>

//           <div className="input-grp full-width">
//             <label>About Me</label>
//             <textarea readOnly value={userData?.bio || "No bio available."} />
//           </div>

//           <div className="toggle-grid">
//             <div className="toggle-item">
//               <FaSmoking /> <span>Smoking</span>
//               <div className="toggle-switch active"></div>
//             </div>
//             <div className="toggle-item">
//               <FaDog /> <span>Pets</span>
//               <div className="toggle-switch"></div>
//             </div>
//             <div className="toggle-item">
//               <FaMoon /> <span>Night Owl</span>
//               <div className="toggle-switch active"></div>
//             </div>
//           </div>

//           <div className="grid-2 mt-20">
//             <div className="housing-prefs">
//                 <h4>HOUSING PREFERENCES</h4>
//                 <div className="input-grp">
//                     <label>Preferred Governorate</label>
//                     <select><option>Cairo</option></select>
//                 </div>
//                 <div className="budget-grp">
//                     <label>Monthly Budget (EGP)</label>
//                     <div className="dual-inputs">
//                         <input type="number" placeholder="Min" />
//                         <input type="number" placeholder="Max" />
//                     </div>
//                 </div>
//             </div>
//             <div className="vibe-check">
//                 <h4>VIBE CHECK</h4>
//                 <div className="vibe-card">
//                     <div className="vibe-row">
//                         <span>Cultural Compatibility Importance</span>
//                         <span className="vibe-val">High</span>
//                     </div>
//                     <input type="range" className="vibe-slider" />
//                     <div className="vibe-row mt-10">
//                         <span>Cleanliness Standards</span>
//                         <span className="vibe-val color-blue">Very Clean</span>
//                     </div>
//                     <input type="range" className="vibe-slider" />
//                 </div>
//             </div>
//           </div>
//         </section>

//         {/* Footer Save Bar */}
//         <div className="unsaved-footer">
//             <div className="footer-text">
//                 <strong>Unsaved Changes</strong>
//                 <p>Don't forget to save your profile updates.</p>
//             </div>
//             <div className="footer-btns">
//                 <button className="btn-cancel">Cancel</button>
//                 <button className="btn-save"><FaSave /> Save Changes</button>
//             </div>
//         </div>
//       </main>

//       <style jsx>{`
//         .staymatch-container { display: flex; background: #f8faff; min-height: 100vh; padding: 20px 4%; gap: 30px; font-family: 'Segoe UI', Roboto, sans-serif; }

//         /* Main Content matched to Image */
//         .staymatch-main { flex: 1; display: flex; flex-direction: column; gap: 25px; }
        
//         .profile-header-card { background: #eef5f9; padding: 30px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center; }
//         .header-user-info { display: flex; align-items: center; gap: 20px; }
//         .avatar-wrapper { position: relative; width: 90px; height: 90px; }
//         .avatar-wrapper img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 3px solid #fff; }
//         .edit-overlay { position: absolute; bottom: 5px; right: 5px; background: #3b4afe; color: white; padding: 6px; border-radius: 50%; font-size: 10px; }
//         .user-text h2 { margin: 0; font-size: 1.6rem; color: #111; }
//         .user-text p { margin: 5px 0; color: #555; font-size: 0.95rem; }
//         .location-tag { font-size: 0.85rem; color: #888; }

//         .profile-strength { width: 220px; }
//         .strength-labels { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; }
//         .progress-bar { height: 6px; background: #ddd; border-radius: 10px; overflow: hidden; }
//         .fill { height: 100%; background: #3b4afe; }
//         .strength-hint { font-size: 0.75rem; color: #999; margin-top: 8px; }

//         .shadow-card { background: white; padding: 30px; border-radius: 20px; border: 1px solid #f0f0f0; }
//         .form-section h3 { margin-top: 0; font-size: 1.2rem; color: #111; border-bottom: none; margin-bottom: 20px; }
        
//         .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
//         .input-grp { display: flex; flex-direction: column; gap: 8px; }
//         .input-grp label { font-size: 0.85rem; font-weight: 600; color: #444; }
//         .input-grp input, .input-grp select, .input-grp textarea { 
//             padding: 12px; border: 1px solid #eef0f5; border-radius: 8px; background: #fcfdfe; font-size: 0.9rem;
//         }
//         textarea { height: 100px; resize: none; }

//         /* Preferences Toggles */
//         .toggle-grid { display: flex; gap: 15px; margin-top: 20px; }
//         .toggle-item { flex: 1; border: 1px solid #eee; padding: 12px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem; }
//         .toggle-switch { width: 34px; height: 18px; background: #ddd; border-radius: 20px; margin-left: auto; position: relative; }
//         .toggle-switch.active { background: #1a365d; }
//         .toggle-switch::after { content: ''; position: absolute; width: 14px; height: 14px; background: white; border-radius: 50%; top: 2px; left: 2px; transition: 0.3s; }
//         .toggle-switch.active::after { left: 18px; }

//         /* Vibe Check */
//         .vibe-card { background: #fbfcfe; border: 1px solid #eef2f7; padding: 15px; border-radius: 10px; }
//         .vibe-row { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 600; }
//         .vibe-val { color: #3b4afe; }
//         .vibe-slider { width: 100%; margin: 10px 0; accent-color: #3b4afe; }

//         /* Footer matched to Image */
//         .unsaved-footer { 
//             position: sticky; bottom: 20px; background: white; padding: 15px 30px; 
//             border-radius: 15px; display: flex; justify-content: space-between; align-items: center;
//             box-shadow: 0 10px 40px rgba(0,0,0,0.1); border: 1px solid #eee;
//         }
//         .footer-text strong { display: block; font-size: 0.95rem; }
//         .footer-text p { font-size: 0.8rem; color: #777; margin: 0; }
//         .btn-cancel { background: none; border: none; font-weight: 600; color: #666; cursor: pointer; margin-right: 20px; }
//         .btn-save { background: #1a365d; color: white; border: none; padding: 10px 25px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; }

//         .loading-screen { text-align: center; padding: 100px; font-size: 1.2rem; color: #3b4afe; font-weight: bold; }
//         .mt-20 { margin-top: 20px; }
//         .color-blue { color: #3b4afe; }
//       `}</style>
//     </div>
//   );
// };

// export default PersonalInfo;


import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../component/Shared/DashboardSidebar';
import axios from 'axios';
import { 
  FaCamera, FaSmoking, FaDog, FaMoon 
} from 'react-icons/fa';

const PersonalInfo = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "Male",
    university: "",
    fieldOfStudy: "",
    jobTitle: "",
    password: "",
    passwordConfirmation: "",
    bio: "I'm a quiet architecture student who spends most nights working on models. I wake up early and value a clean kitchen. Looking for roommates who are respectful of quiet hours during exams.",
    smoking: false,
    pets: true,
    nightOwl: true,
    governorate: "Cairo",
    minBudget: 2000,
    maxBudget: 5000,
    culturalImportance: 75,
    cleanliness: 90
  });

  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const BASE_URL = "https://graduationproject1.runasp.net/";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const res = await axios.get(`${BASE_URL}api/UserProfile`, config);
      const data = res.data.data || res.data;
      setUserData(prev => ({ ...prev, ...data }));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      
      // إنشاء FormData بدلاً من JSON
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        if (userData[key] !== null && userData[key] !== undefined && userData[key] !== '') {
          formData.append(key, userData[key]);
        }
      });
      
      const config = { 
        headers: { 
          'Authorization': `Bearer ${token}`,
          // لا نحتاج Content-Type هنا، FormData يضعه تلقائيًا
        } 
      };
      
      console.log('Sending FormData:', formData); // للتحقق
      
      await axios.put(`${BASE_URL}api/UserProfile`, formData, config);
      alert("تم حفظ التعديلات بنجاح!");
      
      // إعادة جلب البيانات بعد الحفظ للتأكد من التحديث
      fetchProfile();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("حدث خطأ أثناء الحفظ: " + (err.response?.data?.message || err.message));
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="staymatch-container">
      <DashboardSidebar />

      <main className="staymatch-main">
        {/* Header Profile */}
        <section className="profile-header-card">
          <div className="header-user-info">
            <div className="avatar-wrapper">
              <img src={userData.imageUrl ? `${BASE_URL}${userData.imageUrl}` : 'https://via.placeholder.com/100'} alt="User" />
              <div className="edit-overlay"><FaCamera /></div>
            </div>
            <div className="user-text">
              <h2>{userData.fullName || "Ahmed Hassan"}</h2>
              <p>{userData.jobTitle || "Architecture Student"} @ {userData.university || "AUC"}</p>
              <span className="location-tag">📍 New Cairo, Egypt</span>
            </div>
          </div>
          <div className="profile-strength-box">
             <div className="strength-labels"><span>Profile Strength</span><span className="pct">85%</span></div>
             <div className="progress-bar"><div className="fill" style={{width: '85%'}}></div></div>
             <p className="social-note">Add your social media to reach 100%</p>
          </div>
        </section>

        {/* Personal Information */}
        <section className="form-section shadow-card">
          <h3 className="section-title">Personal Information</h3>
          <div className="grid-2">
            <div className="input-grp">
              <label>First Name</label>
              <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} placeholder="First Name" />
            </div>
            <div className="input-grp">
              <label>Last Name</label>
              <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Last Name" />
            </div>
            <div className="input-grp">
              <label>Full Name</label>
              <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} />
            </div>
            <div className="input-grp">
              <label>Email Address</label>
              <input type="email" name="email" value={userData.email} onChange={handleChange} />
            </div>
            <div className="input-grp">
              <label>Phone Number</label>
              <div className="phone-input">
                <span className="code">+20</span>
                <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} placeholder="123 456 7890" />
              </div>
            </div>
            <div className="input-grp">
              <label>Gender</label>
              <select name="gender" value={userData.gender} onChange={handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="input-grp">
              <label>Education / University</label>
              <input type="text" name="university" value={userData.university} onChange={handleChange} />
            </div>
            <div className="input-grp">
              <label>Field of Study / Job</label>
              <input type="text" name="fieldOfStudy" value={userData.fieldOfStudy} onChange={handleChange} />
            </div>
          </div>
        </section>

        {/* Compatibility Preferences */}
        <section className="form-section shadow-card">
          <h3 className="section-title">Compatibility Preferences</h3>
          <p className="section-subtitle">These settings help us find the perfect roommates for you.</p>
          
          <div className="about-me-box">
            <label>About Me</label>
            <textarea name="bio" value={userData.bio} onChange={handleChange} />
          </div>

          <div className="toggle-grid">
            <div className="toggle-item">
              <div className="icon-label"><FaSmoking /> <div><strong>Smoking</strong><p>Do you smoke?</p></div></div>
              <input type="checkbox" name="smoking" checked={userData.smoking} onChange={handleChange} className="apple-switch" />
            </div>
            <div className="toggle-item">
              <div className="icon-label"><FaDog /> <div><strong>Pets</strong><p>Do you have pets?</p></div></div>
              <input type="checkbox" name="pets" checked={userData.pets} onChange={handleChange} className="apple-switch" />
            </div>
            <div className="toggle-item">
              <div className="icon-label"><FaMoon /> <div><strong>Night Owl</strong><p>Active at night?</p></div></div>
              <input type="checkbox" name="nightOwl" checked={userData.nightOwl} onChange={handleChange} className="apple-switch" />
            </div>
          </div>

          <div className="grid-2 mt-20">
            <div className="housing-prefs">
              <h4>HOUSING PREFERENCES</h4>
              <div className="input-grp">
                <label>Preferred Governorate</label>
                <select name="governorate" value={userData.governorate} onChange={handleChange}>
                  <option value="Cairo">Cairo</option>
                  <option value="Giza">Giza</option>
                </select>
              </div>
              <label className="mt-10">Monthly Budget (EGP)</label>
              <div className="budget-range">
                <input type="number" name="minBudget" value={userData.minBudget} onChange={handleChange} />
                <span>-</span>
                <input type="number" name="maxBudget" value={userData.maxBudget} onChange={handleChange} />
              </div>
            </div>

            <div className="vibe-check">
              <h4>VIBE CHECK</h4>
              <div className="vibe-card">
                <div className="vibe-row"><span>Cultural Compatibility Importance</span> <span className="blue-tag">High</span></div>
                <input type="range" name="culturalImportance" value={userData.culturalImportance} onChange={handleChange} />
                <div className="vibe-row mt-10"><span>Cleanliness Standards</span> <span className="blue-tag">Very Clean</span></div>
                <input type="range" name="cleanliness" value={userData.cleanliness} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h4>Account Security</h4>
            <div className="grid-2">
              <div className="input-grp">
                <label>New Password</label>
                <input type="password" name="password" onChange={handleChange} placeholder="........" />
              </div>
              <div className="input-grp  mb-5">
                <label>Confirm Password</label>
                <input type="password" name="passwordConfirmation" onChange={handleChange} placeholder="........" />
              </div>
            </div>
          </div>
        </section>

        {/* Unsaved Footer */}
        <div className="unsaved-footer">
          <div className="footer-info">
            <strong>Unsaved Changes</strong>
            <p>Don't forget to save your profile updates.</p>
          </div>
          <div className="footer-actions">
            <button className="btn-cancel" onClick={() => window.location.reload()}>Cancel</button>
            <button className="btn-save" onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .staymatch-container { display: flex; background: #f8faff; min-height: 100vh; padding: 20px 5%; gap: 30px; }
        .staymatch-main { flex: 1; display: flex; flex-direction: column; gap: 25px; }
        .profile-header-card { background: #EEF5F9; padding: 25px; border-radius: 15px; display: flex; justify-content: space-between; align-items: center; }
        .header-user-info { display: flex; align-items: center; gap: 15px; }
        .avatar-wrapper { position: relative; width: 80px; height: 80px; }
        .avatar-wrapper img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }
        .edit-overlay { position: absolute; bottom: 0; right: 0; background: #3b4afe; color: #fff; padding: 5px; border-radius: 50%; font-size: 10px; cursor: pointer; }
        .user-text h2 { color: #1a365d; margin: 0; }
        .location-tag { color: #888; font-size: 0.85rem; }
        .profile-strength-box { text-align: right; width: 250px; }
        .progress-bar { height: 8px; background: #e0e6ed; border-radius: 10px; margin: 8px 0; }
        .fill { height: 100%; background: #1a365d; border-radius: 10px; }
        .social-note { font-size: 0.7rem; color: #aaa; }

        .shadow-card { background: #fff; padding: 30px; border-radius: 15px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .section-title { text-align: center; color: #1a365d; font-size: 1.5rem; }
        .section-subtitle { text-align: center; color: #888; font-size: 0.9rem; margin-top: -15px; margin-bottom: 30px; }
        
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
        .input-grp { display: flex; flex-direction: column; gap: 8px; }
        .input-grp label { font-size: 0.9rem; font-weight: 600; color: #333; }
        .input-grp input, .input-grp select, textarea { padding: 12px; border: 1px solid #E6E9EF; border-radius: 10px; background: #FCFDFE; }
        
        .phone-input { display: flex; gap: 10px; }
        .phone-input .code { padding: 12px; background: #F4F7FA; border: 1px solid #E6E9EF; border-radius: 10px; font-size: 0.8rem; }
        
        .about-me-box textarea { width: 100%; height: 100px; resize: none; margin-top: 5px; }
        
        .toggle-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px; }
        .toggle-item { background: #F9FBFF; padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #EDF2F7; }
        .icon-label { display: flex; gap: 10px; align-items: center; font-size: 0.9rem; }
        .icon-label p { margin: 0; font-size: 0.75rem; color: #888; }
        
        .apple-switch { width: 40px; height: 20px; cursor: pointer; }

        .budget-range { display: flex; align-items: center; gap: 10px; }
        .vibe-card { background: #F8FAFF; padding: 20px; border-radius: 12px; }
        .blue-tag { color: #3b4afe; font-weight: bold; font-size: 0.8rem; }
        
        .unsaved-footer { position: fixed; bottom: 20px; width: 70%; left: 55%; transform: translateX(-50%); background: #fff; padding: 15px 30px; border-radius: 15px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 10px 40px rgba(0,0,0,0.1); border: 1px solid #eee; z-index: 100; }
        .btn-save { background: #1a365d; color: #fff; border: none; padding: 12px 30px; border-radius: 8px; font-weight: bold; cursor: pointer; }
        .btn-cancel { background: none; border: none; color: #888; font-weight: bold; cursor: pointer; }
        
        .mt-20 { margin-top: 30px; }
        h4 { font-size: 0.75rem; color: #aaa; margin-bottom: 15px; }
      `}</style>
    </div>
  );
};

export default PersonalInfo;