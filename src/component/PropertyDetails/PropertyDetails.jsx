// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaShareAlt, FaRegHeart, FaCheck, FaTimes, 
//   FaWifi, FaWind, FaArrowUp, FaUserShield, FaTv, FaUtensils, FaCarSide
// } from 'react-icons/fa';
// import { MdOutlineLocalLaundryService, MdOutlineElevator, MdMeetingRoom } from 'react-icons/md';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const token = localStorage.getItem('userToken');
//         const res = await axios.get(`https://graduationproject1.runasp.net/api/Property/${id}`, {
//           headers: { 'Authorization': `Bearer ${token?.replace(/"/g, '')}` }
//         });
//         if (res.data?.isSuccess) {
//           setProperty(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchDetails();
//   }, [id]);

//   if (loading) return <div className="loader">جاري تحميل بيانات العقار...</div>;
//   if (!property) return <div className="error">عفواً، العقار غير موجود</div>;

//   const images = property.propertyImages || [];
//   const mainImg = images.find(img => img.isCover)?.imageUrl || images[0]?.imageUrl;
//   const subImages = images.filter(img => !img.isCover);

//   return (
//     <div className="main-wrapper">
//       <div className="property-container">
//         {/* Header Section */}
//         <div className="header-flex">
//           <div className="header-left">
//             <div className="badge-row">
//               <span className="tag-gray">{property.furnished ? 'Furnished' : 'Unfurnished'}</span>
//               <span className="tag-green">Verified</span>
//               <span className="tag-blue"><FaUserShield /> {property.hostName}</span>
//             </div>
//             <h1>{property.name}</h1>
//             <p className="address-text">📍 {property.street}, {property.city}, {property.government}</p>
//           </div>
//           <div className="header-right">
//             <button className="btn-light"><FaShareAlt /> Share</button>
//             <button className="btn-light"><FaRegHeart /> Save</button>
//             <button className="btn-light">View Reviews & Feedback</button>
//           </div>
//         </div>

//         {/* Gallery Grid */}
//         <div className="gallery-layout">
//           <div className="gallery-main">
//             <img src={mainImg} alt="Cover" />
//           </div>
//           <div className="gallery-subs">
//             <img src={subImages[0]?.imageUrl} alt="Sub 1" />
//             <div className="img-with-overlay">
//               <img src={subImages[1]?.imageUrl} alt="Sub 2" />
//               <div className="gallery-overlay">
//                 <span>Show all {images.length} Photos</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Info Tiles - مضافة مسافات لضمان عدم التداخل */}
//         <div className=" mt-5 pt-5 ">
//             <div className="  tiles-grid  pt-5 mt-5 ">
//           <div className="tile ">
//             <FaArrowUp className="tile-icon" />
//             <strong>{property.size} m²</strong>
//             <span>Area</span>
//           </div>
//           <div className="tile">
//             <MdOutlineElevator className="tile-icon" />
//             <strong>{property.nearbyServices?.hasPublicTransport ? 'Available' : 'Not Available'}</strong>
//             <span>Transport</span>
//           </div>
//           <div className="tile">
//             <MdMeetingRoom className="tile-icon" style={{color: '#000000'}}/>
//             <strong>{property.numberOfLivingRooms}</strong>
//             <span>Living Rooms</span>
//           </div>
//           <div className="tile">
//             <span className="tile-icon" style={{fontSize: '24px'}}>🛏️</span>
//             <strong>{property.numberOfBedrooms}</strong>
//             <span>Bedrooms</span>
//           </div>
//           </div>
//         </div>

//         {/* Main Body Layout */}
//         <div className="details-layout">
//           <div className="info-column">
//             {/* House Rules */}
//             <section className="info-block">
//               <h3>House Rules & Eligibility</h3>
//               <div className="rules-flex">
//                 <div className={`rule ${property.allowedTenants?.allowsFamilies ? 'green' : 'red'}`}>
//                   {property.allowedTenants?.allowsFamilies ? <FaCheck /> : <FaTimes />} Families
//                 </div>
//                 <div className={`rule ${property.allowedTenants?.allowsStudents ? 'green' : 'red'}`}>
//                   {property.allowedTenants?.allowsStudents ? <FaCheck /> : <FaTimes />} Students ({property.allowedTenants?.studentGender})
//                 </div>
//                 <div className={`rule ${property.nearbyServices?.isQuietArea ? 'green' : 'red'}`}>
//                   {property.nearbyServices?.isQuietArea ? <FaCheck /> : <FaTimes />} Quiet Area
//                 </div>
//                 <div className={`rule ${property.nearbyServices?.isSafeArea ? 'green' : 'red'}`}>
//                   {property.nearbyServices?.isSafeArea ? <FaCheck /> : <FaTimes />} Safe Area
//                 </div>
//               </div>
//             </section>

//             {/* About This Place */}
//             <section className="info-block">
//               <h3>About This Place</h3>
//               <p className="desc-text">{property.description}</p>
//             </section>

//             {/* Amenities */}
//             <section className="info-block">
//               <h3>What this place offers</h3>
//               <div className="offers-grid">
//                 {property.amenities?.wifi && <span><FaWifi /> High speed wifi</span>}
//                 {property.amenities?.airConditioning && <span><FaWind /> Air conditioning</span>}
//                 {property.amenities?.washingMachine && <span><MdOutlineLocalLaundryService /> Washing machine</span>}
//                 {property.amenities?.tv && <span><FaTv /> Television</span>}
//                 {property.amenities?.cooktop && <span><FaUtensils /> Cooktop</span>}
//               </div>
//             </section>
//           </div>

//           {/* Booking Sidebar - الـ Sticky يبدأ بعد الهيدر والـ Gallery */}
//           <aside className="booking-aside">
//             <div className="sticky-card">
//               <div className="price-tag">
//                 <span className="price-val">{property.monthlyRent?.toLocaleString()} EGP</span>
//                 <span className="price-unit">/ month</span>
//               </div>
              
//               <div className="card-rows">
//                 <div className="c-row"><span>Security Deposit</span><strong>{property.deposite?.toLocaleString()} EGP</strong></div>
//                 <div className="c-row"><span>Availability</span><strong className="green-text">Immediately</strong></div>
//                 <div className="c-row"><span>Minimum Stay</span><strong>{property.minimumStay} Months</strong></div>
//               </div>

//               <div className="input-group-row">
//                  <div className="mini-input">
//                     <label>Move In</label>
//                     <select><option>{new Date(property.availableFrom).toLocaleDateString()}</option></select>
//                  </div>
//                  <div className="mini-input">
//                     <label>Duration</label>
//                     <select><option>{property.minimumStay} months</option></select>
//                  </div>
//               </div>

//               <button className="btn-primary-blue">Book</button> //   navigate(`/  <Route path="/booking/:propertyId/:roomId" element={<BookingPage />} />`);
//               <button className="btn-secondary-green">Message {property.hostName?.split(' ')[0]}</button>
//             </div>
//           </aside>
//         </div>
//       </div>

//       <style>{`
//         .main-wrapper { background: #fcfcfc; padding: 40px 0; font-family: 'Inter', sans-serif; }
//         .property-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
//         .header-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; }
//         .badge-row { display: flex; gap: 8px; margin-bottom: 12px; }
//         .tag-gray { background: #f1f3f5; padding: 6px 14px; border-radius: 8px; font-size: 12px; color: #495057; font-weight: 500; }
//         .tag-green { background: #e6fcf5; color: #0ca678; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; }
//         .tag-blue { background: #1e3a8a; color: #fff; padding: 6px 14px; border-radius: 8px; font-size: 12px; display: flex; align-items: center; gap: 6px; }
        
//         h1 { font-size: 32px; font-weight: 700; color: #111; margin: 0; }
//         .address-text { color: #868e96; font-size: 15px; margin-top: 8px; }
//         .btn-light { border: 1px solid #dee2e6; background: #fff; padding: 10px 18px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; margin-left: 12px; }

//         .gallery-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; height: 500px; margin-bottom: 40px; position: relative; z-index: 1; }
//         .gallery-layout img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
//         .gallery-subs { display: grid; grid-template-rows: 1fr 1fr; gap: 16px; }
//         .img-with-overlay { position: relative; }
//         .gallery-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.45); border-radius:20px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:700; }

//         /* Tiles Grid - تباعد محسّن */
//         .tiles-grid { 
//           display: grid; 
//           grid-template-columns: repeat(4, 1fr); 
//           gap: 24px; 
//           margin-top: 50px; 
//           margin-bottom: 60px; 
//           position: relative;
//           z-index: 1;
//         }
//         .tile { background: #c7c7c7a7; padding: 25px; border-radius: 20px; text-align: center; border: 1px solid #f1f3f5; transition: 0.3s; }
//         .tile-icon { font-size: 28px; color: #1e3a8a; margin-bottom: 12px; display: block; margin-left: auto; margin-right: auto; }
//         .tile strong { display: block; font-size: 18px; color: #0010be; margin-bottom: 4px; }
//         .tile span { color: #000000; font-size: 12px; font-weight: 500; }

//         /* Details Layout - تباعد محسّن للجزء السفلي */
//         .details-layout { 
//           display: grid; 
//           grid-template-columns: 1fr 380px; 
//           gap: 60px; 
//           margin-top: 40px; 
//         }
//         .info-block { margin-bottom: 45px; }
//         .info-block h3 { font-size: 24px; font-weight: 700; margin-bottom: 25px; }
//         .rules-flex { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
//         .rule { display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 16px; }
//         .rule.green { color: #0ca678; } 
//         .rule.red { color: #fa5252; }
//         .desc-text { line-height: 1.8; color: #495057; font-size: 16px; }
//         .offers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
//         .offers-grid span { display: flex; align-items: center; gap: 14px; color: #343a40; font-size: 16px; font-weight: 500; }

//         /* Sidebar - Sticky Positioning */
//         .booking-aside { position: relative; }
//         .sticky-card { 
//           position: sticky; 
//           top: 120px; 
//           border: 1px solid #f1f3f5; 
//           border-radius: 28px; 
//           padding: 35px; 
//           box-shadow: 0 20px 50px rgba(0,0,0,0.04); 
//           background: #fff; 
//           z-index: 10;
//         }
//         .price-val { font-size: 32px; font-weight: 800; color: #1e3a8a; }
//         .price-unit { color: #adb5bd; font-size: 16px; font-weight: 500; }
//         .card-rows { background: #f8f9fa; border-radius: 16px; padding: 20px; margin: 25px 0; }
//         .c-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; color: #495057; }
//         .green-text { color: #0ca678; font-weight: 700; }
        
//         .input-group-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px; }
//         .mini-input label { display: block; font-size: 11px; font-weight: 700; color: #adb5bd; margin-bottom: 8px; text-transform: uppercase; }
//         .mini-input select { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #eee; background: #fff; font-size: 13px; }

//         .btn-primary-blue { width: 100%; background: #1e3a8a; color: #fff; border: none; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; margin-bottom: 12px; transition: 0.3s; }
//         .btn-primary-blue:hover { background: #152a61; transform: translateY(-2px); }
//         .btn-secondary-green { width: 100%; background: #63e6be; color: #fff; border: none; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; transition: 0.3s; }
//         .btn-secondary-green:hover { background: #51cf66; transform: translateY(-2px); }

//         @media (max-width: 992px) {
//           .details-layout { grid-template-columns: 1fr; }
//           .gallery-layout { height: 350px; }
//           .tiles-grid { grid-template-columns: 1fr 1fr; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PropertyDetails;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; // 1. أضفنا useNavigate هنا
// import axios from 'axios';
// import { 
//   FaShareAlt, FaRegHeart, FaCheck, FaTimes, 
//   FaWifi, FaWind, FaArrowUp, FaUserShield, FaTv, FaUtensils, FaCarSide
// } from 'react-icons/fa';
// import { MdOutlineLocalLaundryService, MdOutlineElevator, MdMeetingRoom } from 'react-icons/md';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate(); // 2. تعريف هوك التنقل
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const token = localStorage.getItem('userToken');
//         const res = await axios.get(`https://graduationproject1.runasp.net/api/Property/${id}`, {
//           headers: { 'Authorization': `Bearer ${token?.replace(/"/g, '')}` }
//         });
//         if (res.data?.isSuccess) {
//           setProperty(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchDetails();
//   }, [id]);

//   if (loading) return <div className="loader">جاري تحميل بيانات العقار...</div>;
//   if (!property) return <div className="error">عفواً، العقار غير موجود</div>;

//   const images = property.propertyImages || [];
//   const mainImg = images.find(img => img.isCover)?.imageUrl || images[0]?.imageUrl;
//   const subImages = images.filter(img => !img.isCover);

//   // 3. تحديد رقم أول غرفة لإرساله لصفحة الحجز
//   const firstRoomId = property.rooms && property.rooms.length > 0 ? property.rooms[0].id : 0;

//   return (
//     <div className="main-wrapper">
//       <div className="property-container">
//         {/* Header Section */}
//         <div className="header-flex">
//           <div className="header-left">
//             <div className="badge-row">
//               <span className="tag-gray">{property.furnished ? 'Furnished' : 'Unfurnished'}</span>
//               <span className="tag-green">Verified</span>
//               <span className="tag-blue"><FaUserShield /> {property.hostName}</span>
//             </div>
//             <h1>{property.name}</h1>
//             <p className="address-text">📍 {property.street}, {property.city}, {property.government}</p>
//           </div>
//           <div className="header-right">
//             <button className="btn-light"><FaShareAlt /> Share</button>
//             <button className="btn-light"><FaRegHeart /> Save</button>
//             <button className="btn-light">View Reviews & Feedback</button>
//           </div>
//         </div>

//         {/* Gallery Grid */}
//         <div className="gallery-layout">
//           <div className="gallery-main">
//             <img src={mainImg} alt="Cover" />
//           </div>
//           <div className="gallery-subs">
//             <img src={subImages[0]?.imageUrl} alt="Sub 1" />
//             <div className="img-with-overlay">
//               <img src={subImages[1]?.imageUrl} alt="Sub 2" />
//               <div className="gallery-overlay">
//                 <span>Show all {images.length} Photos</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Info Tiles */}
//         <div className=" mt-5 pt-5 ">
//             <div className="  tiles-grid  pt-5 mt-5 ">
//           <div className="tile ">
//             <FaArrowUp className="tile-icon" />
//             <strong>{property.size} m²</strong>
//             <span>Area</span>
//           </div>
//           <div className="tile">
//             <MdOutlineElevator className="tile-icon" />
//             <strong>{property.nearbyServices?.hasPublicTransport ? 'Available' : 'Not Available'}</strong>
//             <span>Transport</span>
//           </div>
//           <div className="tile">
//             <MdMeetingRoom className="tile-icon" style={{color: '#000000'}}/>
//             <strong>{property.numberOfLivingRooms}</strong>
//             <span>Living Rooms</span>
//           </div>
//           <div className="tile">
//             <span className="tile-icon" style={{fontSize: '24px'}}>🛏️</span>
//             <strong>{property.numberOfBedrooms}</strong>
//             <span>Bedrooms</span>
//           </div>
//           </div>
//         </div>

//         {/* Main Body Layout */}
//         <div className="details-layout">
//           <div className="info-column">
//             {/* House Rules */}
//             <section className="info-block">
//               <h3>House Rules & Eligibility</h3>
//               <div className="rules-flex">
//                 <div className={`rule ${property.allowedTenants?.allowsFamilies ? 'green' : 'red'}`}>
//                   {property.allowedTenants?.allowsFamilies ? <FaCheck /> : <FaTimes />} Families
//                 </div>
//                 <div className={`rule ${property.allowedTenants?.allowsStudents ? 'green' : 'red'}`}>
//                   {property.allowedTenants?.allowsStudents ? <FaCheck /> : <FaTimes />} Students ({property.allowedTenants?.studentGender})
//                 </div>
//                 <div className={`rule ${property.nearbyServices?.isQuietArea ? 'green' : 'red'}`}>
//                   {property.nearbyServices?.isQuietArea ? <FaCheck /> : <FaTimes />} Quiet Area
//                 </div>
//                 <div className={`rule ${property.nearbyServices?.isSafeArea ? 'green' : 'red'}`}>
//                   {property.nearbyServices?.isSafeArea ? <FaCheck /> : <FaTimes />} Safe Area
//                 </div>
//               </div>
//             </section>

//             {/* About This Place */}
//             <section className="info-block">
//               <h3>About This Place</h3>
//               <p className="desc-text">{property.description}</p>
//             </section>

//             {/* Amenities */}
//             <section className="info-block">
//               <h3>What this place offers</h3>
//               <div className="offers-grid">
//                 {property.amenities?.wifi && <span><FaWifi /> High speed wifi</span>}
//                 {property.amenities?.airConditioning && <span><FaWind /> Air conditioning</span>}
//                 {property.amenities?.washingMachine && <span><MdOutlineLocalLaundryService /> Washing machine</span>}
//                 {property.amenities?.tv && <span><FaTv /> Television</span>}
//                 {property.amenities?.cooktop && <span><FaUtensils /> Cooktop</span>}
//               </div>
//             </section>
//           </div>

//           {/* Booking Sidebar */}
//           <aside className="booking-aside">
//             <div className="sticky-card">
//               <div className="price-tag">
//                 <span className="price-val">{property.monthlyRent?.toLocaleString()} EGP</span>
//                 <span className="price-unit">/ month</span>
//               </div>
              
//               <div className="card-rows">
//                 <div className="c-row"><span>Security Deposit</span><strong>{property.deposite?.toLocaleString()} EGP</strong></div>
//                 <div className="c-row"><span>Availability</span><strong className="green-text">Immediately</strong></div>
//                 <div className="c-row"><span>Minimum Stay</span><strong>{property.minimumStay} Months</strong></div>
//               </div>

//               <div className="input-group-row">
//                  <div className="mini-input">
//                     <label>Move In</label>
//                     <select><option>{new Date(property.availableFrom).toLocaleDateString()}</option></select>
//                  </div>
//                  <div className="mini-input">
//                     <label>Duration</label>
//                     <select><option>{property.minimumStay} months</option></select>
//                  </div>
//               </div>

//               {/* 4. تم تفعيل زرار الحجز هنا */}
//               <button 
//                 className="btn-primary-blue" 
//                 onClick={() => navigate(`/booking/${id}/${firstRoomId}`)}
//               >
//                 Book
//               </button>
              
//               <button className="btn-secondary-green">Message {property.hostName?.split(' ')[0]}</button>
//             </div>
//           </aside>
//         </div>
//       </div>

//       <style>{`
//         .main-wrapper { background: #fcfcfc; padding: 40px 0; font-family: 'Inter', sans-serif; }
//         .property-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
//         .header-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; }
//         .badge-row { display: flex; gap: 8px; margin-bottom: 12px; }
//         .tag-gray { background: #f1f3f5; padding: 6px 14px; border-radius: 8px; font-size: 12px; color: #495057; font-weight: 500; }
//         .tag-green { background: #e6fcf5; color: #0ca678; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; }
//         .tag-blue { background: #1e3a8a; color: #fff; padding: 6px 14px; border-radius: 8px; font-size: 12px; display: flex; align-items: center; gap: 6px; }
        
//         h1 { font-size: 32px; font-weight: 700; color: #111; margin: 0; }
//         .address-text { color: #868e96; font-size: 15px; margin-top: 8px; }
//         .btn-light { border: 1px solid #dee2e6; background: #fff; padding: 10px 18px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; margin-left: 12px; }

//         .gallery-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; height: 500px; margin-bottom: 40px; position: relative; z-index: 1; }
//         .gallery-layout img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
//         .gallery-subs { display: grid; grid-template-rows: 1fr 1fr; gap: 16px; }
//         .img-with-overlay { position: relative; }
//         .gallery-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.45); border-radius:20px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:700; }

//         .tiles-grid { 
//           display: grid; 
//           grid-template-columns: repeat(4, 1fr); 
//           gap: 24px; 
//           margin-top: 50px; 
//           margin-bottom: 60px; 
//           position: relative;
//           z-index: 1;
//         }
//         .tile { background: #c7c7c7a7; padding: 25px; border-radius: 20px; text-align: center; border: 1px solid #f1f3f5; transition: 0.3s; }
//         .tile-icon { font-size: 28px; color: #1e3a8a; margin-bottom: 12px; display: block; margin-left: auto; margin-right: auto; }
//         .tile strong { display: block; font-size: 18px; color: #0010be; margin-bottom: 4px; }
//         .tile span { color: #000000; font-size: 12px; font-weight: 500; }

//         .details-layout { 
//           display: grid; 
//           grid-template-columns: 1fr 380px; 
//           gap: 60px; 
//           margin-top: 40px; 
//         }
//         .info-block { margin-bottom: 45px; }
//         .info-block h3 { font-size: 24px; font-weight: 700; margin-bottom: 25px; }
//         .rules-flex { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
//         .rule { display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 16px; }
//         .rule.green { color: #0ca678; } 
//         .rule.red { color: #fa5252; }
//         .desc-text { line-height: 1.8; color: #495057; font-size: 16px; }
//         .offers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
//         .offers-grid span { display: flex; align-items: center; gap: 14px; color: #343a40; font-size: 16px; font-weight: 500; }

//         .booking-aside { position: relative; }
//         .sticky-card { 
//           position: sticky; 
//           top: 120px; 
//           border: 1px solid #f1f3f5; 
//           border-radius: 28px; 
//           padding: 35px; 
//           box-shadow: 0 20px 50px rgba(0,0,0,0.04); 
//           background: #fff; 
//           z-index: 10;
//         }
//         .price-val { font-size: 32px; font-weight: 800; color: #1e3a8a; }
//         .price-unit { color: #adb5bd; font-size: 16px; font-weight: 500; }
//         .card-rows { background: #f8f9fa; border-radius: 16px; padding: 20px; margin: 25px 0; }
//         .c-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; color: #495057; }
//         .green-text { color: #0ca678; font-weight: 700; }
        
//         .input-group-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px; }
//         .mini-input label { display: block; font-size: 11px; font-weight: 700; color: #adb5bd; margin-bottom: 8px; text-transform: uppercase; }
//         .mini-input select { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #eee; background: #fff; font-size: 13px; }

//         .btn-primary-blue { width: 100%; background: #1e3a8a; color: #fff; border: none; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; margin-bottom: 12px; transition: 0.3s; }
//         .btn-primary-blue:hover { background: #152a61; transform: translateY(-2px); }
//         .btn-secondary-green { width: 100%; background: #63e6be; color: #fff; border: none; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; transition: 0.3s; }
//         .btn-secondary-green:hover { background: #51cf66; transform: translateY(-2px); }

//         @media (max-width: 992px) {
//           .details-layout { grid-template-columns: 1fr; }
//           .gallery-layout { height: 350px; }
//           .tiles-grid { grid-template-columns: 1fr 1fr; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PropertyDetails;



























import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { 
  FaShareAlt, FaRegHeart, FaHeart, FaCheck, FaTimes, 
  FaWifi, FaWind, FaArrowUp, FaUserShield, FaTv, FaUtensils, FaCarSide
} from 'react-icons/fa';
import { MdOutlineLocalLaundryService, MdOutlineElevator, MdMeetingRoom } from 'react-icons/md';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // If navigation provided the property in state, use it and skip API call
    if (location?.state?.property) {
      setProperty(location.state.property);
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        console.log("=== PROPERTY DETAILS ===");
        console.log("Fetching property with ID:", id);
        
        const token = localStorage.getItem('userToken');
        const res = await axios.get(`https://graduationproject1.runasp.net/api/Property/${id}`, {
          headers: { 'Authorization': `Bearer ${token?.replace(/"/g, '')}` }
        });
        
        console.log("Property API Response Status:", res.data?.isSuccess);
        console.log("Property Data Received:", res.data?.data?.name || res.data?.data?.id);
        
        if (res.data?.isSuccess) {
          setProperty(res.data.data);
          console.log("Property loaded successfully:", res.data.data.name);
        } else {
          console.warn("API returned non-success status:", res.data);
          setProperty(null);
        }
      } catch (err) {
        console.error("=== PROPERTY FETCH ERROR ===");
        console.error("Error Message:", err.message);
        console.error("Error Status:", err.response?.status);
        console.error("Error Data:", err.response?.data);
        console.error("Attempted ID:", id);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  const handleSaveProperty = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const response = await axios.post(`https://graduationproject1.runasp.net/api/Saved/toggle`, {
        propertyId: Number(id)
      }, config);
      
      setIsSaved(!isSaved);
      
      // Refresh saved items in real-time
      if (!isSaved) {
        // Item was saved, add to localstorage for real-time update
        const savedIds = JSON.parse(localStorage.getItem('savedPropertyIds') || '[]');
        if (!savedIds.includes(Number(id))) {
          savedIds.push(Number(id));
          localStorage.setItem('savedPropertyIds', JSON.stringify(savedIds));
        }
      } else {
        // Item was unsaved, remove from localstorage
        const savedIds = JSON.parse(localStorage.getItem('savedPropertyIds') || '[]');
        const filtered = savedIds.filter(pid => pid !== Number(id));
        localStorage.setItem('savedPropertyIds', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error("Save Property Error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  // دالة التعامل مع الحجز والتحويل
  const handleBooking = async () => {
    try {
      setIsBooking(true);
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      
      const bookingPayload = {
        propertyId: parseInt(id),
        startDate: new Date().toISOString(),
        duration: property?.minimumStay || 1, // نستخدم 1 كقيمة افتراضية إذا لم يوجد مدة
        message: "I am interested in booking this property."
      };

      const response = await axios.post(
        'https://graduationproject1.runasp.net/api/Booking/entire-apartment',
        bookingPayload,
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
console.log("Booking Response:", response);
      if (response.status === 200 || response.data?.isSuccess) {
        // 1. إظهار رسالة نجاح
        Swal.fire({
          icon: 'success',
          title: 'Great!',
          text: 'Booking request sent successfully. Redirecting you now...',
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        // 2. الحصول على أول ID غرفة للتوجيه (كما في منطق الكود الخاص بك)
        const firstRoomId = property.rooms && property.rooms.length > 0 ? property.rooms[0].id : 0;

        // 3. التوجيه بعد ثانيتين
        setTimeout(() => {
        navigate(`/booking/${id}`, { state: { property } });
        // navigate(`/booking/${id}/0`, { state: { property: property } });
        }, 2000);
      }
    } catch (err) {
      console.error("Booking Error:", err);
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: err.response?.data?.message || 'Please make sure you are logged in.',
        confirmButtonColor: '#fa5252'
      });
    } finally {
      setIsBooking(false);
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>
      جاري تحميل بيانات العقار...
    </div>
  );
  
  if (!property) return (
    <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#d32f2f' }}>
      <h3>عفواً، العقار غير موجود</h3>
      <p>المعرّف: {id}</p>
      <button 
        onClick={() => window.history.back()}
        style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}
      >
        العودة
      </button>
    </div>
  );

  const images = property.propertyImages || [];
  const mainImg = images.find(img => img.isCover)?.imageUrl || images[0]?.imageUrl;
  const subImages = images.filter(img => !img.isCover);
  const firstRoomId = property.rooms && property.rooms.length > 0 ? property.rooms[0].id : 0;

  return (
    <div className="main-wrapper">
      <div className="property-container">
        {/* Header Section */}
        <div className="header-flex">
          <div className="header-left">
            <div className="badge-row">
              <span className="tag-gray">{property.furnished ? 'Furnished' : 'Unfurnished'}</span>
              <span className="tag-green">Verified</span>
              <span className="tag-blue"><FaUserShield /> {property.hostName}</span>
            </div>
            <h1>{property.name}</h1>
            <p className="address-text">📍 {property.street}, {property.city}, {property.government}</p>
          </div>
          <div className="header-right">
            <button className="btn-light"><FaShareAlt /> Share</button>
            <button className="btn-light" onClick={handleSaveProperty} disabled={isSaving}>
              {isSaved ? <FaHeart color="#ef4444" /> : <FaRegHeart />} {isSaved ? 'Saved' : 'Save'}
            </button>
            <button className="btn-light" onClick={() => navigate(`/property-reviews/${id}`)}>
              View Reviews & Feedback
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-layout">
          <div className="gallery-main">
            <img src={mainImg} alt="Cover" />
          </div>
          <div className="gallery-subs">
            <img src={subImages[0]?.imageUrl} alt="Sub 1" />
            <div className="img-with-overlay">
              <img src={subImages[1]?.imageUrl} alt="Sub 2" />
              <div className="gallery-overlay">
                <span>Show all {images.length} Photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Tiles */}
        <div className="mt-5 pt-5">
          <div className="tiles-grid pt-5 mt-5">
            <div className="tile">
              <FaArrowUp className="tile-icon" />
              <strong>{property.size} m²</strong>
              <span>Area</span>
            </div>
            <div className="tile">
              <MdOutlineElevator className="tile-icon" />
              <strong>{property.nearbyServices?.hasPublicTransport ? 'Available' : 'Not Available'}</strong>
              <span>Transport</span>
            </div>
            <div className="tile">
              <MdMeetingRoom className="tile-icon" style={{color: '#000000'}}/>
              <strong>{property.numberOfLivingRooms}</strong>
              <span>Living Rooms</span>
            </div>
            <div className="tile">
              <span className="tile-icon" style={{fontSize: '24px'}}>🛏️</span>
              <strong>{property.numberOfBedrooms}</strong>
              <span>Bedrooms</span>
            </div>
          </div>
        </div>

        {/* Main Body Layout */}
        <div className="details-layout">
          <div className="info-column">
            <section className="info-block">
              <h3>House Rules & Eligibility</h3>
              <div className="rules-flex">
                <div className={`rule ${property.allowedTenants?.allowsFamilies ? 'green' : 'red'}`}>
                  {property.allowedTenants?.allowsFamilies ? <FaCheck /> : <FaTimes />} Families
                </div>
                <div className={`rule ${property.allowedTenants?.allowsStudents ? 'green' : 'red'}`}>
                  {property.allowedTenants?.allowsStudents ? <FaCheck /> : <FaTimes />} Students ({property.allowedTenants?.studentGender})
                </div>
                <div className={`rule ${property.nearbyServices?.isQuietArea ? 'green' : 'red'}`}>
                  {property.nearbyServices?.isQuietArea ? <FaCheck /> : <FaTimes />} Quiet Area
                </div>
                <div className={`rule ${property.nearbyServices?.isSafeArea ? 'green' : 'red'}`}>
                  {property.nearbyServices?.isSafeArea ? <FaCheck /> : <FaTimes />} Safe Area
                </div>
              </div>
            </section>

            <section className="info-block">
              <h3>About This Place</h3>
              <p className="desc-text">{property.description}</p>
            </section>

            <section className="info-block">
              <h3>What this place offers</h3>
              <div className="offers-grid">
                {property.amenities?.wifi && <span><FaWifi /> High speed wifi</span>}
                {property.amenities?.airConditioning && <span><FaWind /> Air conditioning</span>}
                {property.amenities?.washingMachine && <span><MdOutlineLocalLaundryService /> Washing machine</span>}
                {property.amenities?.tv && <span><FaTv /> Television</span>}
                {property.amenities?.cooktop && <span><FaUtensils /> Cooktop</span>}
              </div>
            </section>
          </div>

          <aside className="booking-aside">
            <div className="sticky-card">
              <div className="price-tag">
                <span className="price-val">{property.monthlyRent?.toLocaleString()} EGP</span>
                <span className="price-unit">/ month</span>
              </div>
              
              <div className="card-rows">
                <div className="c-row"><span>Security Deposit</span><strong>{property.deposite?.toLocaleString()} EGP</strong></div>
                <div className="c-row"><span>Availability</span><strong className="green-text">Immediately</strong></div>
                <div className="c-row"><span>Minimum Stay</span><strong>{property.minimumStay} Months</strong></div>
              </div>

              <div className="input-group-row">
                 <div className="mini-input">
                    <label>Move In</label>
                    <select><option>{new Date(property.availableFrom).toLocaleDateString()}</option></select>
                 </div>
                 <div className="mini-input">
                    <label>Duration</label>
                    <select><option>{property.minimumStay} months</option></select>
                 </div>
              </div>

              <button 
                className="btn-primary-blue" 
                onClick={handleBooking}
                disabled={isBooking}
              >
                {isBooking ? 'Processing...' : 'Book'}
              </button>
              
              <button className="btn-secondary-green">Message {property.hostName?.split(' ')[0]}</button>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .main-wrapper { background: #fcfcfc; padding: 40px 0; font-family: 'Inter', sans-serif; }
        .property-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; }
        .badge-row { display: flex; gap: 8px; margin-bottom: 12px; }
        .tag-gray { background: #f1f3f5; padding: 6px 14px; border-radius: 8px; font-size: 12px; color: #495057; font-weight: 500; }
        .tag-green { background: #e6fcf5; color: #0ca678; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; }
        .tag-blue { background: #1e3a8a; color: #fff; padding: 6px 14px; border-radius: 8px; font-size: 12px; display: flex; align-items: center; gap: 6px; }
        h1 { font-size: 32px; font-weight: 700; color: #111; margin: 0; }
        .address-text { color: #868e96; font-size: 15px; margin-top: 8px; }
        .btn-light { border: 1px solid #dee2e6; background: #fff; padding: 10px 18px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; margin-left: 12px; }
        .gallery-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; height: 500px; margin-bottom: 40px; position: relative; z-index: 1; }
        .gallery-layout img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
        .gallery-subs { display: grid; grid-template-rows: 1fr 1fr; gap: 16px; }
        .img-with-overlay { position: relative; }
        .gallery-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.45); border-radius:20px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:700; }
        .tiles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 50px; margin-bottom: 60px; position: relative; z-index: 1; }
        .tile { background: #c7c7c7a7; padding: 25px; border-radius: 20px; text-align: center; border: 1px solid #f1f3f5; transition: 0.3s; }
        .tile-icon { font-size: 28px; color: #1e3a8a; margin-bottom: 12px; display: block; margin-left: auto; margin-right: auto; }
        .tile strong { display: block; font-size: 18px; color: #0010be; margin-bottom: 4px; }
        .tile span { color: #000000; font-size: 12px; font-weight: 500; }
        .details-layout { display: grid; grid-template-columns: 1fr 380px; gap: 60px; margin-top: 40px; }
        .info-block { margin-bottom: 45px; }
        .info-block h3 { font-size: 24px; font-weight: 700; margin-bottom: 25px; }
        .rules-flex { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .rule { display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 16px; }
        .rule.green { color: #0ca678; } 
        .rule.red { color: #fa5252; }
        .desc-text { line-height: 1.8; color: #495057; font-size: 16px; }
        .offers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
        .offers-grid span { display: flex; align-items: center; gap: 14px; color: #343a40; font-size: 16px; font-weight: 500; }
        .booking-aside { position: relative; }
        .sticky-card { position: sticky; top: 120px; border: 1px solid #f1f3f5; border-radius: 28px; padding: 35px; box-shadow: 0 20px 50px rgba(0,0,0,0.04); background: #fff; z-index: 10; }
        .price-val { font-size: 32px; font-weight: 800; color: #1e3a8a; }
        .price-unit { color: #adb5bd; font-size: 16px; font-weight: 500; }
        .card-rows { background: #f8f9fa; border-radius: 16px; padding: 20px; margin: 25px 0; }
        .c-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; color: #495057; }
        .green-text { color: #0ca678; font-weight: 700; }
        .input-group-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px; }
        .mini-input label { display: block; font-size: 11px; font-weight: 700; color: #adb5bd; margin-bottom: 8px; text-transform: uppercase; }
        .mini-input select { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #eee; background: #fff; font-size: 13px; }
        .btn-primary-blue { width: 100%; background: #1e3a8a; color: #fff; border: none; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; margin-bottom: 12px; transition: 0.3s; }
        .btn-primary-blue:hover { background: #152a61; transform: translateY(-2px); }
        .btn-primary-blue:disabled { background: #ccc; cursor: not-allowed; }
        .btn-secondary-green { width: 100%; background: #63e6be; color: #fff; border: none; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; transition: 0.3s; }
        .btn-secondary-green:hover { background: #51cf66; transform: translateY(-2px); }
        @media (max-width: 992px) {
          .details-layout { grid-template-columns: 1fr; }
          .gallery-layout { height: 350px; }
          .tiles-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
};

export default PropertyDetails;

































// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // تم حذف استيراد Swal من هنا
// import { 
//   FaShareAlt, FaRegHeart, FaCheck, FaTimes, 
//   FaWifi, FaWind, FaArrowUp, FaUserShield, FaTv, FaUtensils, FaCarSide
// } from 'react-icons/fa';
// import { MdOutlineLocalLaundryService, MdOutlineElevator, MdMeetingRoom } from 'react-icons/md';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isBooking, setIsBooking] = useState(false);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const token = localStorage.getItem('userToken');
//         const res = await axios.get(`https://graduationproject1.runasp.net/api/Property/${id}`, {
//           headers: { 'Authorization': `Bearer ${token?.replace(/"/g, '')}` }
//         });
//         if (res.data?.isSuccess) {
//           setProperty(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchDetails();
//   }, [id]);

//   // دالة التعامل مع الحجز والتحويل
//   const handleBooking = async () => {
//     try {
//       setIsBooking(true);
//       const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      
//       const bookingPayload = {
//         propertyId: parseInt(id),
//         startDate: new Date().toISOString(),
//         duration: property?.minimumStay || 1, 
//         message: "I am interested in booking this property."
//       };

//       console.log("Sending booking request:", bookingPayload);

//       const response = await axios.post(
//         'https://graduationproject1.runasp.net/api/Booking/entire-apartment',
//         bookingPayload,
//         {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("Booking Response:", response);

//       if ((response.status >= 200 && response.status < 300) || response.data?.isSuccess) {
        
//         // استخدام alert العادية بدلاً من Swal
//         alert('Great! Booking request sent successfully. Redirecting you now...');

//         const firstRoomId = (property.rooms && property.rooms.length > 0) ? property.rooms[0].id : 0;

//         // التوجيه لصفحة الـ Booking
//         navigate(`/booking/${id}/${firstRoomId}`);

//       } else {
//           throw new Error("Response was not successful");
//       }
//     } catch (err) {
//       console.error("Booking Error Detail:", err);
//       // استخدام alert العادية للخطأ
//       alert(err.response?.data?.message || 'Booking Failed. Please make sure you are logged in.');
//     } finally {
//       setIsBooking(false);
//     }
//   };

//   if (loading) return <div className="loader">جاري تحميل بيانات العقار...</div>;
//   if (!property) return <div className="error">عفواً، العقار غير موجود</div>;

//   const images = property.propertyImages || [];
//   const mainImg = images.find(img => img.isCover)?.imageUrl || images[0]?.imageUrl;
//   const subImages = images.filter(img => !img.isCover);

//   return (
//     <div className="main-wrapper">
//       <div className="property-container">
//         {/* Header Section */}
//         <div className="header-flex">
//           <div className="header-left">
//             <div className="badge-row">
//               <span className="tag-gray">{property.furnished ? 'Furnished' : 'Unfurnished'}</span>
//               <span className="tag-green">Verified</span>
//               <span className="tag-blue"><FaUserShield /> {property.hostName}</span>
//             </div>
//             <h1>{property.name}</h1>
//             <p className="address-text">📍 {property.street}, {property.city}, {property.government}</p>
//           </div>
//           <div className="header-right">
//             <button className="btn-light"><FaShareAlt /> Share</button>
//             <button className="btn-light"><FaRegHeart /> Save</button>
//             <button className="btn-light">View Reviews & Feedback</button>
//           </div>
//         </div>

//         {/* Gallery Grid */}
//         <div className="gallery-layout">
//           <div className="gallery-main">
//             <img src={mainImg} alt="Cover" />
//           </div>
//           <div className="gallery-subs">
//             <img src={subImages[0]?.imageUrl} alt="Sub 1" />
//             <div className="img-with-overlay">
//               <img src={subImages[1]?.imageUrl} alt="Sub 2" />
//               <div className="gallery-overlay">
//                 <span>Show all {images.length} Photos</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Info Tiles */}
//         <div className="mt-5 pt-5">
//           <div className="tiles-grid pt-5 mt-5">
//             <div className="tile">
//               <FaArrowUp className="tile-icon" />
//               <strong>{property.size} m²</strong>
//               <span>Area</span>
//             </div>
//             <div className="tile">
//               <MdOutlineElevator className="tile-icon" />
//               <strong>{property.nearbyServices?.hasPublicTransport ? 'Available' : 'Not Available'}</strong>
//               <span>Transport</span>
//             </div>
//             <div className="tile">
//               <MdMeetingRoom className="tile-icon" style={{color: '#000000'}}/>
//               <strong>{property.numberOfLivingRooms}</strong>
//               <span>Living Rooms</span>
//             </div>
//             <div className="tile">
//               <span className="tile-icon" style={{fontSize: '24px'}}>🛏️</span>
//               <strong>{property.numberOfBedrooms}</strong>
//               <span>Bedrooms</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Body Layout */}
//         <div className="details-layout">
//           <div className="info-column">
//             <section className="info-block">
//               <h3>House Rules & Eligibility</h3>
//               <div className="rules-flex">
//                 <div className={`rule ${property.allowedTenants?.allowsFamilies ? 'green' : 'red'}`}>
//                   {property.allowedTenants?.allowsFamilies ? <FaCheck /> : <FaTimes />} Families
//                 </div>
//                 <div className={`rule ${property.allowedTenants?.allowsStudents ? 'green' : 'red'}`}>
//                   {property.allowedTenants?.allowsStudents ? <FaCheck /> : <FaTimes />} Students ({property.allowedTenants?.studentGender})
//                 </div>
//                 <div className={`rule ${property.nearbyServices?.isQuietArea ? 'green' : 'red'}`}>
//                   {property.nearbyServices?.isQuietArea ? <FaCheck /> : <FaTimes />} Quiet Area
//                 </div>
//                 <div className={`rule ${property.nearbyServices?.isSafeArea ? 'green' : 'red'}`}>
//                   {property.nearbyServices?.isSafeArea ? <FaCheck /> : <FaTimes />} Safe Area
//                 </div>
//               </div>
//             </section>

//             <section className="info-block">
//               <h3>About This Place</h3>
//               <p className="desc-text">{property.description}</p>
//             </section>

//             <section className="info-block">
//               <h3>What this place offers</h3>
//               <div className="offers-grid">
//                 {property.amenities?.wifi && <span><FaWifi /> High speed wifi</span>}
//                 {property.amenities?.airConditioning && <span><FaWind /> Air conditioning</span>}
//                 {property.amenities?.washingMachine && <span><MdOutlineLocalLaundryService /> Washing machine</span>}
//                 {property.amenities?.tv && <span><FaTv /> Television</span>}
//                 {property.amenities?.cooktop && <span><FaUtensils /> Cooktop</span>}
//               </div>
//             </section>
//           </div>

//           <aside className="booking-aside">
//             <div className="sticky-card">
//               <div className="price-tag">
//                 <span className="price-val">{property.monthlyRent?.toLocaleString()} EGP</span>
//                 <span className="price-unit">/ month</span>
//               </div>
              
//               <div className="card-rows">
//                 <div className="c-row"><span>Security Deposit</span><strong>{property.deposite?.toLocaleString()} EGP</strong></div>
//                 <div className="c-row"><span>Availability</span><strong className="green-text">Immediately</strong></div>
//                 <div className="c-row"><span>Minimum Stay</span><strong>{property.minimumStay} Months</strong></div>
//               </div>

//               <div className="input-group-row">
//                  <div className="mini-input">
//                     <label>Move In</label>
//                     <select><option>{new Date(property.availableFrom).toLocaleDateString()}</option></select>
//                  </div>
//                  <div className="mini-input">
//                     <label>Duration</label>
//                     <select><option>{property.minimumStay} months</option></select>
//                  </div>
//               </div>

//               <button 
//                 className="btn-primary-blue" 
//                 onClick={handleBooking}
//                 disabled={isBooking}
//               >
//                 {isBooking ? 'Processing...' : 'Book'}
//               </button>
              
//               <button className="btn-secondary-green">Message {property.hostName?.split(' ')[0]}</button>
//             </div>
//           </aside>
//         </div>
//       </div>

//       <style>{`
//         /* Styles remain the same */
//         .main-wrapper { background: #fcfcfc; padding: 40px 0; font-family: 'Inter', sans-serif; }
//         .property-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
//         .header-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; }
//         .badge-row { display: flex; gap: 8px; margin-bottom: 12px; }
//         .tag-gray { background: #f1f3f5; padding: 6px 14px; border-radius: 8px; font-size: 12px; color: #495057; font-weight: 500; }
//         .tag-green { background: #e6fcf5; color: #0ca678; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; }
//         .tag-blue { background: #1e3a8a; color: #fff; padding: 6px 14px; border-radius: 8px; font-size: 12px; display: flex; align-items: center; gap: 6px; }
//         h1 { font-size: 32px; font-weight: 700; color: #111; margin: 0; }
//         .address-text { color: #868e96; font-size: 15px; margin-top: 8px; }
//         .btn-light { border: 1px solid #dee2e6; background: #fff; padding: 10px 18px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; margin-left: 12px; }
//         .gallery-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; height: 500px; margin-bottom: 40px; position: relative; z-index: 1; }
//         .gallery-layout img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
//         .gallery-subs { display: grid; grid-template-rows: 1fr 1fr; gap: 16px; }
//         .img-with-overlay { position: relative; }
//         .gallery-overlay { position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.45); border-radius:20px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:700; }
//         .tiles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 50px; margin-bottom: 60px; position: relative; z-index: 1; }
//         .tile { background: #c7c7c7a7; padding: 25px; border-radius: 20px; text-align: center; border: 1px solid #f1f3f5; transition: 0.3s; }
//         .tile-icon { font-size: 28px; color: #1e3a8a; margin-bottom: 12px; display: block; margin-left: auto; margin-right: auto; }
//         .tile strong { display: block; font-size: 18px; color: #0010be; margin-bottom: 4px; }
//         .tile span { color: #000000; font-size: 12px; font-weight: 500; }
//         .details-layout { display: grid; grid-template-columns: 1fr 380px; gap: 60px; margin-top: 40px; }
//         .info-block { margin-bottom: 45px; }
//         .info-block h3 { font-size: 24px; font-weight: 700; margin-bottom: 25px; }
//         .rules-flex { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
//         .rule { display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 16px; }
//         .rule.green { color: #0ca678; } 
//         .rule.red { color: #fa5252; }
//         .desc-text { line-height: 1.8; color: #495057; font-size: 16px; }
//         .offers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; }
//         .offers-grid span { display: flex; align-items: center; gap: 14px; color: #343a40; font-size: 16px; font-weight: 500; }
//         .booking-aside { position: relative; }
//         .sticky-card { position: sticky; top: 120px; border: 1px solid #f1f3f5; border-radius: 28px; padding: 35px; box-shadow: 0 20px 50px rgba(0,0,0,0.04); background: #fff; z-index: 10; }
//         .price-val { font-size: 32px; font-weight: 800; color: #1e3a8a; }
//         .price-unit { color: #adb5bd; font-size: 16px; font-weight: 500; }
//         .card-rows { background: #f8f9fa; border-radius: 16px; padding: 20px; margin: 25px 0; }
//         .c-row { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 14px; color: #495057; }
//         .green-text { color: #0ca678; font-weight: 700; }
//         .input-group-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 25px; }
//         .mini-input label { display: block; font-size: 11px; font-weight: 700; color: #adb5bd; margin-bottom: 8px; text-transform: uppercase; }
//         .mini-input select { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #eee; background: #fff; font-size: 13px; }
//         .btn-primary-blue { width: 100%; background: #1e3a8a; color: #fff; border: none; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; margin-bottom: 12px; transition: 0.3s; }
//         .btn-primary-blue:hover { background: #152a61; transform: translateY(-2px); }
//         .btn-primary-blue:disabled { background: #ccc; cursor: not-allowed; }
//         .btn-secondary-green { width: 100%; background: #63e6be; color: #fff; border: none; padding: 18px; border-radius: 14px; font-weight: 700; font-size: 16px; cursor: pointer; transition: 0.3s; }
//         .btn-secondary-green:hover { background: #51cf66; transform: translateY(-2px); }
//         @media (max-width: 992px) {
//           .details-layout { grid-template-columns: 1fr; }
//           .gallery-layout { height: 350px; }
//           .tiles-grid { grid-template-columns: 1fr 1fr; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PropertyDetails;