// import React, { useState } from "react";

// import boy from "../../img/boy.jpg";
// import rom from "../../img/acebb5b067e20ce03237821fed40d82b7b7106b6.jpg";
// import heroImg from "../../img/380271c27529ada5ccd392a604ff1c6a781e583e.jpg"; // صورة الهيرو

// export default function Home() {
//   const data = [
//     { id: 1, owner: "Mohamed", location: "Egypt", price: 1500, img: rom, avatar: boy },
//     { id: 2, owner: "Sara", location: "Cairo", price: 2000, img: rom, avatar: boy },
//     { id: 3, owner: "Sara", location: "Cairo", price: 2000, img: rom, avatar: boy },
//     { id: 4, owner: "Sara", location: "Cairo", price: 2000, img: rom, avatar: boy },
//   ];

//   const [favs, setFavs] = useState({});

//   const toggleFav = (id) => {
//     setFavs((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <>
//       {/* ===== HERO SECTION (زي الصورة) ===== */}
//       <section className="home-hero vh-100 mt-5">
//         <img src={heroImg} alt="Handshake" className="hero-bg-img " />

//         <div className="hero-overlay">
//           {/* search bar فوق */}
//           <div className="hero-search-box mt-5 border border-0 border-black  ">
//             <input
//               type="text"
//               placeholder="Search by Area / Person"
//             />
//             <i className="fa-solid fa-magnifying-glass hero-search-icon" />
//           </div>

//           {/* الكارد الغامق في النص */}
//           <div className="hero-center-card w-100 ">
//             <p className="hero-text">
//               <span className="hero-brand">Stay Match</span> helps you find the
//               perfect home <br />
//               and the most compatible roommate.
//             </p>
//             <button className="hero-btn">
//               View Properties
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ===== باقي الكود زي ما هو تحت الهيرو ===== */}
//       <div className="page-container mt-5 p-5">
//         {/* Search + Filter Row */}
//         <div className="top-row w-100">
//           <div className="search-box w-50 p-3">
//             <input type="text" placeholder="Search by Area / Person" />
//             <i className="fa-solid fa-magnifying-glass icon-search" aria-hidden="true"></i>
//           </div>

//           <div className="filter-box w-50 p-3 d-flex justify-content-between align-items-center">
//             <span>Filter by : Price / Location</span>
//             <i className="fa-solid fa-filter icon-arrow" aria-hidden="true"></i>
//           </div>
//         </div>

//         {/* Cards row */}
//         <div className="d-flex gap-4 flex-wrap">
//           {data.map((item) => (
//             <div key={item.id} className="property-card">
//               <div className="image-container">
//                 <img src={item.img} alt="room" />
//                 <i
//                   role="button"
//                   aria-label={favs[item.id] ? "Remove favorite" : "Add to favorite"}
//                   className={`fa-solid fa-heart heart-icon ${favs[item.id] ? "active" : ""}`}
//                   onClick={() => toggleFav(item.id)}
//                 />
//               </div>

//               <div className="details">
//                 <p>
//                   <strong>Owner :</strong> {item.owner}
//                 </p>
//                 <p>
//                   <strong>Location :</strong> {item.location}
//                 </p>
//                 <p>
//                   <strong>Price :</strong> {item.price}{" "}
//                   <span className="per-month">/ month</span>
//                 </p>

//                 <div className="user-img">
//                   <img src={item.avatar} alt="user" />
//                 </div>
//               </div>

//               <button className="view-btn">View</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaHome, 
//   FaHeart, 
//   FaPlus, 
//   FaSearch, 
//   FaComment, 
//   FaUser,
//   FaStar,
//   FaWifi,
//   FaBed,
//   FaFilter
// } from 'react-icons/fa';


// const Home = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('home');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [apartments, setApartments] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [myProperties, setMyProperties] = useState([]);

//   // التحقق من التوكين عند تحميل الصفحة
//   useEffect(() => {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   // جلب جميع البيانات
//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('userToken');
      
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };

//       // 1. جلب الشقق
//       const apartmentsResponse = await axios.get(
//         'https://graduationproject1.runasp.net/api/Property?orderByOldest=false&onlyAvailable=false&page=1&pageSize=10',
//         { headers }
//       );
//       console.log('Apartments Response:', apartmentsResponse.data);

//       // 2. جلب الغرف
//       const roomsResponse = await axios.get(
//         'https://graduationproject1.runasp.net/api/Property/GetAllWithRooms?orderByOldest=false&onlyAvailable=false&page=1&pageSize=10',
//         { headers }
//       );
//       console.log('Rooms Response:', roomsResponse.data);

//       // 3. جلب ممتلكاتي
//       const myPropertiesResponse = await axios.get(
//         'https://graduationproject1.runasp.net/api/Property/MyProperty?filter=all&page=1&pageSize=10',
//         { headers }
//       );
//       console.log('My Properties Response:', myPropertiesResponse.data);

//       // معالجة بيانات الشقق
//       if (apartmentsResponse.data && apartmentsResponse.data.items) {
//         setApartments(apartmentsResponse.data.items);
//       }

//       // معالجة بيانات الغرف
//       if (roomsResponse.data && roomsResponse.data.properties) {
//         const roomsData = roomsResponse.data.properties.flatMap(property => 
//           property.rooms ? property.rooms.map(room => ({
//             ...room,
//             propertyName: property.name,
//             propertyCity: property.city,
//             propertyGovernment: property.government,
//             propertyStreet: property.street,
//             coverImageUrl: property.coverImageUrl,
//             propertyId: property.id
//           })) : []
//         );
//         setRooms(roomsData);
//       }

//       // معالجة ممتلكاتي
//       if (myPropertiesResponse.data && myPropertiesResponse.data.properties) {
//         setMyProperties(myPropertiesResponse.data.properties);
//       }

//     } catch (error) {
//       console.error('Error fetching data:', error);
      
//       if (error.response?.status === 401) {
//         localStorage.removeItem('userToken');
//         navigate('/login');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // عرض حالة عدم وجود بيانات
//   const renderEmptyState = (type) => (
//     <div className="empty-state-container">
//       <div className="empty-state-icon">🏠</div>
//       <h3 className="empty-state-title">
//         {type === 'apartments' ? 'لا توجد شقق حالياً' : 
//          type === 'rooms' ? 'لا توجد غرف حالياً' : 
//          'لا توجد مشاريع حالياً'}
//       </h3>
//       <p className="empty-state-subtitle">
//         {type === 'apartments' ? 'لم يتم إضافة أي شقق بعد' :
//          type === 'rooms' ? 'لم يتم إضافة أي غرف بعد' :
//          'سنقوم بإضافة مشاريع جديدة قريباً. تابعونا!'}
//       </p>
//     </div>
//   );

//   // عرض عنصر الشقة
//   const renderApartmentItem = (item) => (
//     <div 
//       key={item.id} 
//       className="card" 
//       onClick={() => navigate(`/property/${item.id}`)}
//     >
//       <img 
//         src={item.coverImageUrl || '/default-apartment.jpg'} 
//         alt={item.name}
//         className="card-image"
//         onError={(e) => {
//           e.target.src = '/default-apartment.jpg';
//         }}
//       />
//       <div className="match-badge">
//         <span className="match-text">{item.compatibilityScore || 98}% match</span>
//       </div>
//       <div className="rating-badge">
//         <FaStar size={12} color="#FFD700" />
//         <span className="rating-text">{item.rating || 4.5}</span>
//       </div>
//       <div className="card-content">
//         <h4 className="property-name">{item.name || 'شقة'}</h4>
//         <p className="property-location">
//           {item.city || 'مدينة نصر'}, {item.government || 'القاهرة'}
//         </p>
//         <div className="amenities-container">
//           {item.furnished && (
//             <div className="amenity">
//               <FaBed size={14} color="#666" />
//               <span className="amenity-text">مفروشة</span>
//             </div>
//           )}
//           {item.wifi && (
//             <div className="amenity">
//               <FaWifi size={14} color="#666" />
//               <span className="amenity-text">Wifi</span>
//             </div>
//           )}
//         </div>
//         <p className="price">{item.monthlyRent || 1500} EGP/شهر</p>
//       </div>
//     </div>
//   );

//   // عرض عنصر الغرفة
//   const renderRoomItem = (item) => (
//     <div 
//       key={item.id} 
//       className="card" 
//       onClick={() => navigate(`/room/${item.id}`, { state: { propertyId: item.propertyId } })}
//     >
//       <img 
//         src={item.coverImageUrl || '/default-room.jpg'} 
//         alt={item.roomName}
//         className="card-image"
//         onError={(e) => {
//           e.target.src = '/default-room.jpg';
//         }}
//       />
//       <div className="match-badge">
//         <span className="match-text">{item.compatibilityScore || 98}% match</span>
//       </div>
//       <div className="rating-badge">
//         <FaStar size={12} color="#FFD700" />
//         <span className="rating-text">{item.rating || 4.5}</span>
//       </div>
//       <div className="card-content">
//         <h4 className="property-name">{item.roomName || 'غرفة'}</h4>
//         <p className="property-location">
//           {item.propertyCity || 'مدينة نصر'}, {item.propertyGovernment || 'القاهرة'}
//         </p>
//         <div className="amenities-container">
//           {item.furnished && (
//             <div className="amenity">
//               <FaBed size={14} color="#666" />
//               <span className="amenity-text">مفروشة</span>
//             </div>
//           )}
//           {item.wifi && (
//             <div className="amenity">
//               <FaWifi size={14} color="#666" />
//               <span className="amenity-text">Wifi</span>
//             </div>
//           )}
//         </div>
//         <p className="price">{item.month_rent || 1500} EGP/شهر</p>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>جاري تحميل البيانات...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="home-container">
//       {/* Header */}
//       <header className="header">
//         <h1 className="logo">stay Match</h1>
//         <button className="profile-button" onClick={() => navigate('/profile')}>
//           <FaUser size={24} color="#007AFF" />
//         </button>
//       </header>

//       {/* Search Bar */}
//       <div className="search-container">
//         <FaSearch size={20} color="#999" className="search-icon" />
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by location"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button className="filter-button">
//           <FaFilter size={20} color="#007AFF" />
//         </button>
//       </div>

//       <div className="content">
//         {/* Hero Section */}
//         <div className="hero-section">
//           <p className="hero-title">
//             Stay Match helps you find the perfect home<br />
//             and the most compatible roommate.
//           </p>
          
//           <div className="rent-options">
//             <button className="rent-option-button">
//               Rent A whole Apartment
//             </button>
//             <button className="rent-option-button outline">
//               Rent A whole A Room
//             </button>
//           </div>

//           {/* Area Search */}
//           <div className="area-search-container">
//             <input
//               type="text"
//               className="area-search-input"
//               placeholder="Search by Area / Person"
//             />
//             <button className="search-button">
//               Search
//             </button>
//           </div>
//         </div>

//         {/* My Properties Section - تظهر فقط إذا كان في ممتلكات */}
//         {myProperties.length > 0 && (
//           <section className="section">
//             <div className="section-header">
//               <h2 className="section-title">My Properties</h2>
//               <button className="view-all-button" onClick={() => navigate('/my-properties')}>
//                 View All
//               </button>
//             </div>
//             <div className="horizontal-list">
//               {myProperties.map(property => (
//                 <div key={property.id} className="card-small">
//                   <img src={property.coverImageUrl || '/default-property.jpg'} alt={property.name} />
//                   <p>{property.name}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Apartments Section */}
//         <section className="section">
//           <div className="section-header">
//             <h2 className="section-title">Discover Apartment</h2>
//             <button className="view-all-button" onClick={() => navigate('/all-apartments')}>
//               View All Apartments
//             </button>
//           </div>
//           <p className="section-subtitle">
//             Handpicked Apartments with high compatibility score
//           </p>

//           {apartments.length > 0 ? (
//             <div className="horizontal-list">
//               {apartments.map(item => renderApartmentItem(item))}
//             </div>
//           ) : (
//             renderEmptyState('apartments')
//           )}
//         </section>

//         {/* Rooms Section */}
//         <section className="section">
//           <div className="section-header">
//             <h2 className="section-title">Discover Rooms</h2>
//             <button className="view-all-button" onClick={() => navigate('/all-rooms')}>
//               View All Rooms
//             </button>
//           </div>
//           <p className="section-subtitle">
//             Handpicked Rooms with high compatibility score
//           </p>

//           {rooms.length > 0 ? (
//             <div className="horizontal-list">
//               {rooms.map(item => renderRoomItem(item))}
//             </div>
//           ) : (
//             renderEmptyState('rooms')
//           )}
//         </section>

//         {/* Bottom spacing */}
//         <div style={{ height: 80 }} />
//       </div>

//       {/* Bottom Navigation */}
//       <nav className="bottom-nav">
//         <button className="nav-item" onClick={() => setActiveTab('home')}>
//           <FaHome size={24} color={activeTab === 'home' ? '#007AFF' : '#999'} />
//           <span className={`nav-text ${activeTab === 'home' ? 'active' : ''}`}>Home</span>
//         </button>
//         <button className="nav-item" onClick={() => setActiveTab('matches')}>
//           <FaHeart size={24} color={activeTab === 'matches' ? '#007AFF' : '#999'} />
//           <span className={`nav-text ${activeTab === 'matches' ? 'active' : ''}`}>Matches</span>
//         </button>
//         <button className="add-button" onClick={() => navigate('/add-property')}>
//           <FaPlus size={32} color="#fff" />
//         </button>
//         <button className="nav-item" onClick={() => setActiveTab('browse')}>
//           <FaSearch size={24} color={activeTab === 'browse' ? '#007AFF' : '#999'} />
//           <span className={`nav-text ${activeTab === 'browse' ? 'active' : ''}`}>Browse</span>
//         </button>
//         <button className="nav-item" onClick={() => setActiveTab('chats')}>
//           <FaComment size={24} color={activeTab === 'chats' ? '#007AFF' : '#999'} />
//           <span className={`nav-text ${activeTab === 'chats' ? 'active' : ''}`}>Chats</span>
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Home;











// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaHome, 
//   FaHeart, 
//   FaPlus, 
//   FaSearch, 
//   FaComment, 
//   FaUser,
//   FaStar,
//   FaWifi,
//   FaBed,
//   FaFilter
// } from 'react-icons/fa';


// const Home = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('home');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [apartments, setApartments] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('userToken');
      
//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };

//       // 1. جلب الشقق من API
//       console.log('Fetching apartments...');
//       const apartmentsResponse = await axios.get(
//         'https://graduationproject1.runasp.net/api/Property?orderByOldest=false&onlyAvailable=false&page=1&pageSize=10',
//         { headers }
//       );
      
//       console.log('Apartments API Response:', apartmentsResponse.data);
      
//       // التحقق من بنية البيانات
//       if (apartmentsResponse.data) {
//         if (apartmentsResponse.data.items) {
//           // إذا كانت البيانات في items
//           setApartments(apartmentsResponse.data.items);
//         } else if (Array.isArray(apartmentsResponse.data)) {
//           // إذا كانت البيانات مصفوفة مباشرة
//           setApartments(apartmentsResponse.data);
//         } else if (apartmentsResponse.data.data) {
//           // إذا كانت البيانات في data
//           setApartments(apartmentsResponse.data.data);
//         }
//       }

//       // 2. جلب الغرف من API
//       console.log('Fetching rooms...');
//       const roomsResponse = await axios.get(
//         'https://graduationproject1.runasp.net/api/Property/GetAllWithRooms?orderByOldest=false&onlyAvailable=false&page=1&pageSize=10',
//         { headers }
//       );
      
//       console.log('Rooms API Response:', roomsResponse.data);

//       // التحقق من بنية بيانات الغرف
//       if (roomsResponse.data) {
//         if (roomsResponse.data.properties) {
//           // معالجة البيانات من properties
//           const roomsData = roomsResponse.data.properties.flatMap(property => {
//             if (property.rooms && property.rooms.length > 0) {
//               return property.rooms.map(room => ({
//                 ...room,
//                 propertyName: property.name,
//                 propertyCity: property.city,
//                 propertyGovernment: property.government,
//                 propertyStreet: property.street,
//                 propertyCoverImage: property.coverImageUrl,
//                 propertyId: property.id,
//                 // استخدام صورة العقار كصورة للغرفة إذا لم توجد صورة للغرفة
//                 coverImageUrl: room.coverImageUrl || property.coverImageUrl || 'https://via.placeholder.com/300x200?text=Room'
//               }));
//             }
//             return [];
//           });
//           setRooms(roomsData);
//         } else if (Array.isArray(roomsResponse.data)) {
//           setRooms(roomsResponse.data);
//         } else if (roomsResponse.data.items) {
//           setRooms(roomsResponse.data.items);
//         }
//       }

//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('حدث خطأ في جلب البيانات');
      
//       if (error.response?.status === 401) {
//         localStorage.removeItem('userToken');
//         navigate('/login');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // عرض عنصر الشقة
//   const renderApartmentItem = (item) => {
//     console.log('Rendering apartment:', item); // للتحقق من البيانات
    
//     return (
//       <div 
//         key={item.id} 
//         className="card" 
//         onClick={() => navigate(`/property/${item.id}`)}
//       >
//         <img 
//           src={item.coverImageUrl || 'https://via.placeholder.com/300x200?text=Apartment'} 
//           alt={item.name}
//           className="card-image"
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
//           }}
//         />
//         <div className="match-badge">
//           <span className="match-text">98% match</span>
//         </div>
//         <div className="rating-badge">
//           <FaStar size={12} color="#FFD700" />
//           <span className="rating-text">4.5</span>
//         </div>
//         <div className="card-content">
//           <h4 className="property-name">{item.name || 'شقة'}</h4>
//           <p className="property-location">
//             {item.city || 'مدينة نصر'}, {item.government || 'القاهرة'}
//           </p>
//           <div className="amenities-container">
//             <div className="amenity">
//               <FaWifi size={14} color="#666" />
//               <span className="amenity-text">Wifi</span>
//             </div>
//             <div className="amenity">
//               <FaBed size={14} color="#666" />
//               <span className="amenity-text">{item.furnished ? 'مفروشة' : 'غير مفروشة'}</span>
//             </div>
//           </div>
//           <p className="price">{item.monthlyRent || 1500} EGP/شهر</p>
//         </div>
//       </div>
//     );
//   };

//   // عرض عنصر الغرفة
//   const renderRoomItem = (item) => {
//     console.log('Rendering room:', item); // للتحقق من البيانات
    
//     return (
//       <div 
//         key={item.id} 
//         className="card" 
//         onClick={() => navigate(`/room/${item.id}`, { state: { propertyId: item.propertyId } })}
//       >
//         <img 
//           src={item.coverImageUrl || item.propertyCoverImage || 'https://via.placeholder.com/300x200?text=Room'} 
//           alt={item.roomName}
//           className="card-image"
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
//           }}
//         />
//         <div className="match-badge">
//           <span className="match-text">98% match</span>
//         </div>
//         <div className="rating-badge">
//           <FaStar size={12} color="#FFD700" />
//           <span className="rating-text">4.5</span>
//         </div>
//         <div className="card-content">
//           <h4 className="property-name">{item.roomName || 'غرفة'}</h4>
//           <p className="property-location">
//             {item.propertyCity || 'مدينة نصر'}, {item.propertyGovernment || 'القاهرة'}
//           </p>
//           <div className="amenities-container">
//             <div className="amenity">
//               <FaWifi size={14} color="#666" />
//               <span className="amenity-text">Wifi</span>
//             </div>
//             <div className="amenity">
//               <FaBed size={14} color="#666" />
//               <span className="amenity-text">{item.furnished ? 'مفروشة' : 'غير مفروشة'}</span>
//             </div>
//           </div>
//           <p className="price">{item.month_rent || 1500} EGP/شهر</p>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>جاري تحميل البيانات...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="home-container">
//       {/* Header */}
//       <header className="header">
//         <h1 className="logo">stay Match</h1>
//         <button className="profile-button" onClick={() => navigate('/profile')}>
//           <FaUser size={24} color="#007AFF" />
//         </button>
//       </header>

//       {/* Search Bar */}
//       <div className="search-container">
//         <FaSearch size={20} color="#999" className="search-icon" />
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by location"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button className="filter-button">
//           <FaFilter size={20} color="#007AFF" />
//         </button>
//       </div>

//       <div className="content">
//         {/* Hero Section */}
//         <div className="hero-section">
//           <p className="hero-title">
//             Stay Match helps you find the perfect home<br />
//             and the most compatible roommate.
//           </p>
          
//           <div className="rent-options">
//             <button className="rent-option-button">
//               Rent A whole Apartment
//             </button>
//             <button className="rent-option-button outline">
//               Rent A whole A Room
//             </button>
//           </div>

//           {/* Area Search */}
//           <div className="area-search-container">
//             <input
//               type="text"
//               className="area-search-input"
//               placeholder="Search by Area / Person"
//             />
//             <button className="search-button">
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Apartments Section */}
//         <section className="section">
//           <div className="section-header">
//             <h2 className="section-title">Discover Apartment</h2>
//             <button className="view-all-button" onClick={() => navigate('/all-apartments')}>
//               View All Apartments
//             </button>
//           </div>
//           <p className="section-subtitle">
//             Handpicked Apartments with high compatibility score
//           </p>

//           {apartments.length > 0 ? (
//             <div className="horizontal-list">
//               {apartments.map(item => renderApartmentItem(item))}
//             </div>
//           ) : (
//             <div className="empty-state-container">
//               <p>لا توجد شقق متاحة حالياً</p>
//             </div>
//           )}
//         </section>

//         {/* Rooms Section */}
//         <section className="section">
//           <div className="section-header">
//             <h2 className="section-title">Discover Rooms</h2>
//             <button className="view-all-button" onClick={() => navigate('/all-rooms')}>
//               View All Rooms
//             </button>
//           </div>
//           <p className="section-subtitle">
//             Handpicked Rooms with high compatibility score
//           </p>

//           {rooms.length > 0 ? (
//             <div className="horizontal-list">
//               {rooms.map(item => renderRoomItem(item))}
//             </div>
//           ) : (
//             <div className="empty-state-container">
//               <p>لا توجد غرف متاحة حالياً</p>
//             </div>
//           )}
//         </section>

//         {/* Bottom spacing */}
//         <div style={{ height: 80 }} />
//       </div>

//       {/* Bottom Navigation */}
//       <nav className="bottom-nav">
//         <button className="nav-item" onClick={() => setActiveTab('home')}>
//           <FaHome size={24} color={activeTab === 'home' ? '#007AFF' : '#999'} />
//           <span className={`nav-text ${activeTab === 'home' ? 'active' : ''}`}>Home</span>
//         </button>
//         <button className="nav-item" onClick={() => setActiveTab('matches')}>
//           <FaHeart size={24} color={activeTab === 'matches' ? '#007AFF' : '#999'} />
//           <span className={`nav-text ${activeTab === 'matches' ? 'active' : ''}`}>Matches</span>
//         </button>
//         <button className="add-button" onClick={() => navigate('/add-property')}>
//           <FaPlus size={32} color="#fff" />
//         </button>
//         <button className="nav-item" onClick={() => setActiveTab('browse')}>
//           <FaSearch size={24} color={activeTab === 'browse' ? '#007AFF' : '#999'} />
//           <span className={`nav-text ${activeTab === 'browse' ? 'active' : ''}`}>Browse</span>
//         </button>
//         <button className="nav-item" onClick={() => setActiveTab('chats')}>
//           <FaComment size={24} color={activeTab === 'chats' ? '#007AFF' : '#999'} />
//           <span className={`nav-text ${activeTab === 'chats' ? 'active' : ''}`}>Chats</span>
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Home;















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaHome, 
//   FaHeart, 
//   FaPlus, 
//   FaSearch, 
//   FaComment, 
//   FaUser,
//   FaStar,
//   FaWifi,
//   FaBed,
//   FaFilter,
//   FaMapMarkerAlt,
//   FaRulerCombined,
//   FaCalendarAlt,
//   FaChevronRight,
//   FaBath,
//   FaPhone,
//   FaEnvelope
// } from 'react-icons/fa';

// const Home = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('home');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [apartments, setApartments] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [apiInfo, setApiInfo] = useState({
//     totalApartments: 0,
//     totalRooms: 0,
//     totalMyProperties: 0,
//     currentPage: 1,
//     totalPages: 1
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('userToken');
//     if (!token) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('userToken');
      
//       if (!token) {
//         navigate('/login');
//         return;
//       }

//       const headers = {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };

//       // جلب الشقق
//       try {
//         console.log('Fetching apartments...');
//         const apartmentsResponse = await axios.get(
//           'https://graduationproject1.runasp.net/api/Property?page=1&pageSize=10',
//           { headers }
//         );
        
//         console.log('Apartments Response:', apartmentsResponse.data);
        
//         if (apartmentsResponse.data) {
//           let apartmentsData = [];
          
//           if (apartmentsResponse.data.isSuccess && apartmentsResponse.data.data?.items) {
//             apartmentsData = apartmentsResponse.data.data.items;
//             setApiInfo(prev => ({
//               ...prev,
//               totalApartments: apartmentsResponse.data.data.totalCount || 0,
//               currentPage: apartmentsResponse.data.data.page || 1,
//               totalPages: apartmentsResponse.data.data.totalPages || 1
//             }));
//           } else if (Array.isArray(apartmentsResponse.data)) {
//             apartmentsData = apartmentsResponse.data;
//           } else if (apartmentsResponse.data.data && Array.isArray(apartmentsResponse.data.data)) {
//             apartmentsData = apartmentsResponse.data.data;
//           }
          
//           setApartments(apartmentsData);
//         }
//       } catch (apartmentError) {
//         console.error('Error fetching apartments:', apartmentError);
//         if (apartmentError.response?.status === 401) {
//           setError('جلسة منتهية، يرجى تسجيل الدخول مرة أخرى');
//           localStorage.removeItem('userToken');
//           navigate('/login');
//           return;
//         }
//       }

//       // جلب الغرف
//       try {
//         console.log('Fetching rooms...');
//         const roomsResponse = await axios.get(
//           'https://graduationproject1.runasp.net/api/Property/GetAllWithRooms?page=1&pageSize=10',
//           { headers }
//         );
        
//         console.log('Rooms API Response:', roomsResponse.data);

//         if (roomsResponse.data) {
//           let allRooms = [];
          
//           // معالجة البيانات حسب بنية API
//           if (roomsResponse.data.isSuccess && roomsResponse.data.data?.properties) {
//             // بنية: { isSuccess: true, data: { properties: [...] } }
//             roomsResponse.data.data.properties.forEach(property => {
//               if (property.rooms && property.rooms.length > 0) {
//                 property.rooms.forEach(room => {
//                   allRooms.push({
//                     id: room.id,
//                     roomName: room.name || 'Modern Room in Maadi',
//                     name: room.name || 'Modern Room in Maadi',
//                     propertyName: property.name,
//                     propertyCity: property.city || 'Maadi',
//                     propertyGovernment: property.government || 'Sarayat',
//                     propertyStreet: property.street,
//                     propertyCoverImage: property.coverImageUrl,
//                     propertyId: property.id,
//                     coverImageUrl: room.coverImageUrl || property.coverImageUrl,
//                     month_rent: room.month_rent || 1500,
//                     rating: room.rating || 4.5,
//                     compatibilityScore: room.compatibilityScore || 98,
//                     hasWifi: room.hasWifi !== false,
//                     furnished: room.furnished !== false,
//                     isComplete: room.isComplete || true,
//                     availableFrom: room.availableFrom,
//                     size: room.size || 25
//                   });
//                 });
//               }
//             });
//           } else if (Array.isArray(roomsResponse.data)) {
//             // إذا كان الرد مصفوفة مباشرة من العقارات
//             roomsResponse.data.forEach(property => {
//               if (property.rooms && property.rooms.length > 0) {
//                 property.rooms.forEach(room => {
//                   allRooms.push({
//                     id: room.id,
//                     roomName: room.name || 'Modern Room in Maadi',
//                     name: room.name || 'Modern Room in Maadi',
//                     propertyName: property.name,
//                     propertyCity: property.city || 'Maadi',
//                     propertyGovernment: property.government || 'Sarayat',
//                     propertyCoverImage: property.coverImageUrl,
//                     propertyId: property.id,
//                     coverImageUrl: room.coverImageUrl || property.coverImageUrl,
//                     month_rent: room.month_rent || 1500,
//                     rating: room.rating || 4.5,
//                     compatibilityScore: room.compatibilityScore || 98,
//                     hasWifi: room.hasWifi !== false,
//                     furnished: room.furnished !== false,
//                     isComplete: room.isComplete || true,
//                     availableFrom: room.availableFrom
//                   });
//                 });
//               }
//             });
//           } else if (roomsResponse.data.data && Array.isArray(roomsResponse.data.data)) {
//             // بنية: { data: [...] }
//             roomsResponse.data.data.forEach(property => {
//               if (property.rooms) {
//                 property.rooms.forEach(room => {
//                   allRooms.push({
//                     id: room.id,
//                     roomName: room.name || 'Modern Room in Maadi',
//                     name: room.name || 'Modern Room in Maadi',
//                     propertyName: property.name,
//                     propertyCity: property.city || 'Maadi',
//                     propertyGovernment: property.government || 'Sarayat',
//                     propertyCoverImage: property.coverImageUrl,
//                     propertyId: property.id,
//                     coverImageUrl: room.coverImageUrl || property.coverImageUrl,
//                     month_rent: room.month_rent || 1500,
//                     rating: room.rating || 4.5,
//                     compatibilityScore: room.compatibilityScore || 50 ,
//                     hasWifi: room.hasWifi !== false,
//                     furnished: room.furnished !== false,
//                     isComplete: room.isComplete || true,
//                     availableFrom: room.availableFrom
//                   });
//                 });
//               }
//             });
//           }
          
//           setRooms(allRooms);
//           console.log('Processed rooms for display:', allRooms);
          
//           setApiInfo(prev => ({
//             ...prev,
//             totalRooms: allRooms.length
//           }));
//         }
//       } catch (roomsError) {
//         console.error('Error fetching rooms:', roomsError);
//       }

//       // جلب ممتلكاتي
//       try {
//         const myPropertiesResponse = await axios.get(
//           'https://graduationproject1.runasp.net/api/Property/MyProperty?filter=all&page=1&pageSize=10',
//           { headers }
//         );
        
//         console.log('My Properties:', myPropertiesResponse.data);
        
//         if (myPropertiesResponse.data?.isSuccess) {
//           const myPropsData = myPropertiesResponse.data.data;
//           if (myPropsData?.items) {
//             setMyProperties(myPropsData.items);
//             setApiInfo(prev => ({
//               ...prev,
//               totalMyProperties: myPropsData.totalCount || 0
//             }));
//           }
//         }
//       } catch (myPropsError) {
//         console.error('Error fetching my properties:', myPropsError);
//       }

//     } catch (error) {
//       console.error('General error:', error);
//       setError('حدث خطأ في جلب البيانات');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderApartmentItem = (item) => {
//     let minRent = item.monthlyRent || 0;
//     let roomsCount = 0;
    
//     if (item.rooms && item.rooms.length > 0) {
//       roomsCount = item.rooms.length;
//       const rents = item.rooms.map(room => room.month_rent).filter(rent => rent > 0);
//       if (rents.length > 0) {
//         minRent = Math.min(...rents);
//       }
//     }
    
//     return (
//       <div 
//         key={item.id} 
//         className="card" 
//         onClick={() => navigate(`/property/${item.id}`)}
//       >
//         <div className="card-image-container">
//           <img 
//             src={item.coverImageUrl || 'https://via.placeholder.com/300x200?text=Apartment'} 
//             alt={item.name}
//             className="card-image"
//             onError={(e) => {
//               e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//             }}
//           />
//           <div className="match-badge">
//             <span className="match-text">98% match</span>
//           </div>
//           <div className="rating-badge">
//             <FaStar size={12} color="#FFD700" />
//             <span className="rating-text  text-black">{item.rating || 4.5}</span>
//           </div>
//         </div>
//         <div className="card-content">
//           <h4 className="property-name">{item.name || 'Luxury Apartment'}</h4>
//           <p className="property-location">
//             <FaMapMarkerAlt size={12} color="#FF4444" />
//             {item.city || 'Maadi'}, {item.government || 'Cairo'}
//           </p>
          
//           <div className="property-stats">
//             <div className="stat-item">
//               <FaRulerCombined size={14} color="#666" />
//               <span>{item.size || 120} m²</span>
//             </div>
//             <div className="stat-item">
//               <FaBed size={14} color="#666" />
//               <span>{item.numberOfBedrooms || 2} Beds</span>
//             </div>
//             <div className="stat-item">
//               <FaBath size={14} color="#666" />
//               <span>{item.numberOfGuestBathrooms || 1} Bath</span>
//             </div>
//           </div>

//           <div className="amenities-container">
//             <div className="amenity available">
//               <FaWifi size={14} color="#4CAF50" />
//               <span className="amenity-text">Wifi</span>
//             </div>
//             <div className={`amenity ${item.furnished ? 'available' : ''}`}>
//               <FaBed size={14} color={item.furnished ? '#4CAF50' : '#999'} />
//               <span className="amenity-text">{item.furnished ? 'Furnished' : 'Unfurnished'}</span>
//             </div>
//           </div>

//           <div className="price-section">
//             <div className="price-info">
//               {minRent !== item.monthlyRent && <span className="price-label">Starting from</span>}
//               <p className="price">{minRent || item.monthlyRent || 1500} EGP</p>
//               <span className="price-period">/month</span>
//             </div>
//             <button className="view-details-btn">
//               <FaChevronRight size={12} />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderRoomItem = (item) => {
//     // التحقق من وجود جميع البيانات المطلوبة
//     const roomData = {
//       id: item.id,
//       name: item.roomName || item.name || 'Modern Room in Maadi',
//       location: `${item.propertyCity || 'Maadi'}, ${item.propertyGovernment || 'Sarayat'}`,
//       price: item.month_rent || 1500,
//       rating: item.rating || 4.5,
//       matchScore: item.compatibilityScore || 98,
//       wifi: item.hasWifi !== false,
//       furnished: item.furnished !== false,
//       isComplete: item.isComplete || true,
//       image: item.coverImageUrl || item.propertyCoverImage || 'https://via.placeholder.com/300x200?text=Modern+Room',
//       availableFrom: item.availableFrom || new Date().toISOString(),
//       propertyName: item.propertyName || 'Modern Room'
//     };

//     return (
//       <div 
//         key={roomData.id} 
//         className="card room-card" 
//         onClick={() => navigate(`/room/${roomData.id}`, { 
//           state: { 
//             propertyId: item.propertyId,
//             roomData: roomData 
//           } 
//         })}
//       >
//         <div className="card-image-container">
//           <img 
//             src={roomData.image} 
//             alt={roomData.name}
//             className="card-image"
//             onError={(e) => {
//               e.target.src = 'https://via.placeholder.com/300x200?text=Room+Image';
//             }}
//           />
//           <div className="match-badge">
//             <span className="match-text">{roomData.matchScore}% match</span>
//           </div>
//           <div className="rating-badge">
//             <FaStar size={12} color="#FFD700" />
//             <span className="rating-text">{roomData.rating}</span>
//           </div>
//         </div>
        
//         <div className="card-content">
//           {/* عنوان الغرفة */}
//           <h4 className="property-name">{roomData.name}</h4>
          
//           {/* الموقع */}
//           <p className="property-location">
//             <FaMapMarkerAlt size={12} color="#FF4444" />
//             {roomData.location}
//           </p>
          
//           {/* المرافق */}
//           <div className="amenities-container">
//             <div className={`amenity ${roomData.wifi ? 'available' : ''}`}>
//               <FaWifi size={14} color={roomData.wifi ? '#4CAF50' : '#999'} />
//               <span className="amenity-text">Wifi</span>
//             </div>
//             <div className={`amenity ${roomData.furnished ? 'available' : ''}`}>
//               <FaBed size={14} color={roomData.furnished ? '#4CAF50' : '#999'} />
//               <span className="amenity-text">{roomData.furnished ? 'Furnished' : 'Not Furnished'}</span>
//             </div>
//           </div>

//           {/* السعر */}
//           <div className="price-section">
//             <div className="price-info">
//               <span className="price-label">EGP</span>
//               <p className="price">{roomData.price}</p>
//               <span className="price-period">/ month</span>
//             </div>
//           </div>

//           {/* حالة العقار (Complete/Not Complete) - كما في الصورة */}
//           <div className="property-status">
//             <span className={`status-badge ${roomData.isComplete ? 'complete' : 'not-complete'}`}>
//               {roomData.isComplete ? 'Complete' : 'Not Complete'}
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>جاري تحميل البيانات...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="home-container">
//       {/* Header */}
//       <header className="header">
//         <h1 className="logo">stay<span className="logo-highlight">Match</span></h1>
//         <button className="profile-button" onClick={() => navigate('/profile')}>
//           <FaUser size={22} color="#007AFF" />
//         </button>
//       </header>

//       {/* Stats Bar */}
//       <div className="stats-bar">
//         <div className="stat">
//           <span className="stat-label">Total Apartments:</span>
//           <span className="stat-value">{apiInfo.totalApartments}</span>
//         </div>
//         <div className="stat">
//           <span className="stat-label">Total Rooms:</span>
//           <span className="stat-value">{apiInfo.totalRooms}</span>
//         </div>
//         <div className="stat">
//           <span className="stat-label">My Properties:</span>
//           <span className="stat-value">{apiInfo.totalMyProperties}</span>
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="search-section">
//         <div className="search-container">
//           <FaSearch size={18} color="#999" className="search-icon" />
//           <input
//             type="text"
//             className="search-input"
//             placeholder="Search by location or person..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <button className="filter-button">
//             <FaFilter size={18} color="#007AFF" />
//           </button>
//         </div>
//       </div>

//       <div className="content">
//         {/* Hero Section */}
//         <div className="hero-section">
//           <h2 className="hero-title">
//             Find your perfect home<br />
//             <span>and compatible roommate</span>
//           </h2>
          
//           <div className="search-area">
//             <input
//               type="text"
//               className="area-search-input"
//               placeholder="Search by Area / Person"
//             />
//             <button className="search-button">
//               <FaSearch size={16} />
//               <span>Search</span>
//             </button>
//           </div>
//         </div>

//         {/* My Properties Section */}
//         {myProperties.length > 0 && (
//           <section className="section">
//             <div className="section-header">
//               <div>
//                 <h2 className="section-title">My Properties</h2>
//                 <p className="section-subtitle">Your listed properties</p>
//               </div>
//               <button className="view-all-button" onClick={() => navigate('/my-properties')}>
//                 View All ({myProperties.length})
//                 <FaChevronRight size={12} />
//               </button>
//             </div>

//             <div className="horizontal-list">
//               {myProperties.map(item => renderApartmentItem(item))}
//             </div>
//           </section>
//         )}

//         {/* Apartments Section */}
//         <section className="section">
//           <div className="section-header">
//             <div>
//               <h2 className="section-title">Discover Apartments</h2>
//               <p className="section-subtitle">
//                 Handpicked Apartments with high compatibility score
//               </p>
//             </div>
//             <button className="view-all-button" onClick={() => navigate('/all-apartments')}>
//               View All ({apartments.length})
//               <FaChevronRight size={12} />
//             </button>
//           </div>

//           {apartments.length > 0 ? (
//             <div className="horizontal-list">
//               {apartments.map(item => renderApartmentItem(item))}
//             </div>
//           ) : (
//             <div className="empty-state">
//               <div className="empty-icon">🏠</div>
//               <p>No apartments available at the moment</p>
//             </div>
//           )}
//         </section>

//         {/* Rooms Section - مطابق للصورة */}
//         <section className="section">
//           <div className="section-header">
//             <div>
//               <h2 className="section-title">Discover Rooms</h2>
//               <p className="section-subtitle">
//                 Handpicked Rooms with high compatibility score
//               </p>
//             </div>
//             <button className="view-all-button" onClick={() => navigate('/all-rooms')}>
//               View All ({rooms.length})
//               <FaChevronRight size={12} />
//             </button>
//           </div>

//           {rooms.length > 0 ? (
//             <div className="horizontal-list">
//               {rooms.map(item => renderRoomItem(item))}
//             </div>
//           ) : (
//             <div className="empty-state">
//               <div className="empty-icon">🛏️</div>
//               <p>No rooms available at the moment</p>
//             </div>
//           )}
//         </section>

//         {/* Contact Section */}
//         <div className="contact-section">
//           <h3 className="contact-title">Need Help? Contact US</h3>
//           <p className="contact-subtitle">Technical Support</p>
//           <div className="contact-buttons">
//             <button 
//               className="contact-button phone"
//               onClick={() => window.location.href = 'tel:+20123456789'}
//             >
//               <FaPhone size={16} />
//               <span>Call Support</span>
//             </button>
//             <button 
//               className="contact-button email"
//               onClick={() => window.location.href = 'mailto:support@staymatch.com'}
//             >
//               <FaEnvelope size={16} />
//               <span>Send us your inquiries!</span>
//             </button>
//           </div>
//         </div>

//         {/* Bottom spacing for navigation */}
//         <div style={{ height: 80 }} />
//       </div>

//       {/* Bottom Navigation */}
//       <nav className="bottom-nav">
//         <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
//           <FaHome size={22} />
//           <span className="nav-text">Home</span>
//         </button>
//         <button className={`nav-item ${activeTab === 'matches' ? 'active' : ''}`} onClick={() => setActiveTab('matches')}>
//           <FaHeart size={22} />
//           <span className="nav-text">Matches</span>
//         </button>
//         <button className="add-button" onClick={() => navigate('/add-property')}>
//           <FaPlus size={28} color="#fff" />
//         </button>
//         <button className={`nav-item ${activeTab === 'browse' ? 'active' : ''}`} onClick={() => setActiveTab('browse')}>
//           <FaSearch size={22} />
//           <span className="nav-text">Browse</span>
//         </button>
//         <button className={`nav-item ${activeTab === 'chats' ? 'active' : ''}`} onClick={() => setActiveTab('chats')}>
//           <FaComment size={22} />
//           <span className="nav-text">Chats</span>
//         </button>
//       </nav>

//       <style jsx>{`
//         .home-container {
//           background-color: #f8f9fa;
//           min-height: 100vh;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 16px 20px;
//           background: white;
//           border-bottom: 1px solid #e9ecef;
//           position: sticky;
//           top: 0;
//           z-index: 100;
//         }

//         .logo {
//           font-size: 24px;
//           font-weight: 700;
//           margin: 0;
//           color: #1a1a1a;
//         }

//         .logo-highlight {
//           color: #007AFF;
//         }

//         .profile-button {
//           width: 44px;
//           height: 44px;
//           border-radius: 50%;
//           background: #f0f7ff;
//           border: none;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .profile-button:hover {
//           background: #e1efff;
//         }

//         .stats-bar {
//           display: flex;
//           justify-content: space-around;
//           padding: 12px 20px;
//           background: white;
//           border-bottom: 1px solid #e9ecef;
//         }

//         .stat {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 4px;
//         }

//         .stat-label {
//           font-size: 12px;
//           color: #666;
//         }

//         .stat-value {
//           font-size: 16px;
//           font-weight: 600;
//           color: #007AFF;
//         }

//         .search-section {
//           padding: 12px 20px;
//           background: white;
//         }

//         .search-container {
//           display: flex;
//           align-items: center;
//           background: #f5f7fa;
//           border-radius: 12px;
//           padding: 4px 4px 4px 12px;
//           border: 1px solid #e9ecef;
//         }

//         .search-icon {
//           margin-right: 8px;
//         }

//         .search-input {
//           flex: 1;
//           padding: 12px 0;
//           border: none;
//           background: transparent;
//           font-size: 15px;
//           outline: none;
//         }

//         .filter-button {
//           width: 44px;
//           height: 44px;
//           border-radius: 12px;
//           background: #f0f7ff;
//           border: none;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           margin-left: 4px;
//           transition: background 0.2s;
//         }

//         .filter-button:hover {
//           background: #e1efff;
//         }

//         .content {
//           padding-bottom: 20px;
//         }

//         .hero-section {
//           background: linear-gradient(135deg, #007AFF 0%, #5856D6 100%);
//           padding: 30px 20px;
//           margin: 0 20px 20px 20px;
//           border-radius: 20px;
//           color: white;
//           box-shadow: 0 8px 16px rgba(0,122,255,0.2);
//         }

//         .hero-title {
//           font-size: 28px;
//           font-weight: 700;
//           margin: 0 0 8px 0;
//           line-height: 1.2;
//         }

//         .hero-title span {
//           font-size: 18px;
//           font-weight: 400;
//           opacity: 0.9;
//         }

//         .search-area {
//           display: flex;
//           gap: 8px;
//           margin-top: 20px;
//         }

//         .area-search-input {
//           flex: 1;
//           padding: 14px 16px;
//           border: none;
//           border-radius: 12px;
//           font-size: 14px;
//           outline: none;
//         }

//         .search-button {
//           background: white;
//           border: none;
//           border-radius: 12px;
//           padding: 0 20px;
//           color: #007AFF;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: transform 0.2s;
//         }

//         .search-button:hover {
//           transform: scale(1.05);
//         }

//         .section {
//           padding: 20px;
//         }

//         .section-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 16px;
//         }

//         .section-title {
//           font-size: 20px;
//           font-weight: 700;
//           margin: 0 0 4px 0;
//           color: #1a1a1a;
//         }

//         .section-subtitle {
//           font-size: 14px;
//           color: #666;
//           margin: 0;
//         }

//         .view-all-button {
//           background: none;
//           border: none;
//           color: #007AFF;
//           font-size: 14px;
//           font-weight: 500;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           cursor: pointer;
//           padding: 8px 12px;
//           border-radius: 8px;
//           transition: background 0.2s;
//         }

//         .view-all-button:hover {
//           background: #f0f7ff;
//         }

//         .horizontal-list {
//           display: flex;
//           overflow-x: auto;
//           padding: 4px 0 12px 0;
//           gap: 16px;
//           -webkit-overflow-scrolling: touch;
//           scrollbar-width: thin;
//         }

//         .horizontal-list::-webkit-scrollbar {
//           height: 4px;
//         }

//         .horizontal-list::-webkit-scrollbar-thumb {
//           background: #ccc;
//           border-radius: 4px;
//         }

//         .card {
//           min-width: 280px;
//           max-width: 300px;
//           background: white;
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.08);
//           transition: all 0.2s;
//           cursor: pointer;
//         }

//         .card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 16px rgba(0,0,0,0.1);
//         }

//         .card-image-container {
//           position: relative;
//           height: 160px;
//           overflow: hidden;
//         }

//         .card-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.3s;
//         }

//         .card:hover .card-image {
//           transform: scale(1.05);
//         }

//         .match-badge {
//           position: absolute;
//           top: 12px;
//           left: 12px;
//           background: #4CAF50;
//           padding: 6px 12px;
//           border-radius: 20px;
//           color: white;
//           font-size: 12px;
//           font-weight: 600;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.2);
//         }

//         .rating-badge {
//           position: absolute;
//           top: 12px;
//           right: 12px;
//           background: white;
//           padding: 6px 10px;
//           border-radius: 20px;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 12px;
//           font-weight: 600;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//         }

//         .available-badge {
//           position: absolute;
//           bottom: 12px;
//           left: 12px;
//           background: #007AFF;
//           color: white;
//           padding: 4px 12px;
//           border-radius: 20px;
//           font-size: 11px;
//           font-weight: 500;
//         }

//         .card-content {
//           padding: 16px;
//         }

//         .property-name {
//           font-size: 16px;
//           font-weight: 600;
//           margin: 0 0 6px 0;
//           color: #1a1a1a;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .property-location {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 12px;
//           color: #666;
//           margin: 0 0 12px 0;
//         }

//         .property-stats {
//           display: flex;
//           gap: 16px;
//           margin-bottom: 12px;
//         }

//         .stat-item {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 12px;
//           color: #666;
//         }

//         .amenities-container {
//           display: flex;
//           gap: 8px;
//           margin-bottom: 16px;
//           flex-wrap: wrap;
//         }

//         .amenity {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 11px;
//           background: #f5f7fa;
//           padding: 4px 10px;
//           border-radius: 20px;
//         }

//         .amenity.available {
//           background: #e8f5e9;
//           color: #2e7d32;
//         }

//         .price-section {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           border-top: 1px solid #e9ecef;
//           padding-top: 12px;
//         }

//         .price-info {
//           display: flex;
//           align-items: baseline;
//           gap: 4px;
//           flex-wrap: wrap;
//         }

//         .price {
//           font-size: 18px;
//           font-weight: 700;
//           color: #007AFF;
//           margin: 0;
//         }

//         .price-period {
//           font-size: 12px;
//           color: #999;
//         }

//         .price-label {
//           font-size: 11px;
//           color: #999;
//           margin-right: 4px;
//         }

//         .view-details-btn {
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//           background: #f0f7ff;
//           border: none;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           color: #007AFF;
//           transition: background 0.2s;
//         }

//         .view-details-btn:hover {
//           background: #e1efff;
//         }

//         .available-date {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           font-size: 11px;
//           color: #999;
//         }

//         .empty-state {
//           text-align: center;
//           padding: 40px 20px;
//           background: white;
//           border-radius: 16px;
//           margin: 20px 0;
//         }

//         .empty-icon {
//           font-size: 48px;
//           margin-bottom: 16px;
//         }

//         .empty-state p {
//           color: #666;
//           margin: 0;
//         }

//         .contact-section {
//           background: linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%);
//           margin: 20px;
//           padding: 30px 20px;
//           border-radius: 20px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.05);
//         }

//         .contact-title {
//           margin: 0 0 8px 0;
//           color: #1a1a1a;
//           font-size: 20px;
//           font-weight: 700;
//         }

//         .contact-subtitle {
//           margin: 0 0 24px 0;
//           color: #666;
//           font-size: 14px;
//         }

//         .contact-buttons {
//           display: flex;
//           gap: 12px;
//           justify-content: center;
//           flex-wrap: wrap;
//         }

//         .contact-button {
//           padding: 14px 24px;
//           border: none;
//           border-radius: 12px;
//           font-size: 15px;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           transition: all 0.2s;
//         }

//         .contact-button.phone {
//           background: #007AFF;
//           color: white;
//         }

//         .contact-button.phone:hover {
//           background: #0056b3;
//           transform: scale(1.05);
//         }

//         .contact-button.email {
//           background: white;
//           color: #007AFF;
//           border: 2px solid #007AFF;
//         }

//         .contact-button.email:hover {
//           background: #f0f7ff;
//           transform: scale(1.05);
//         }

//         .bottom-nav {
//           position: fixed;
//           bottom: 0;
//           left: 0;
//           right: 0;
//           background: white;
//           display: flex;
//           justify-content: space-around;
//           align-items: center;
//           padding: 8px 16px 20px;
//           border-top: 1px solid #e9ecef;
//           box-shadow: 0 -4px 12px rgba(0,0,0,0.05);
//         }

//         .nav-item {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           background: none;
//           border: none;
//           color: #999;
//           cursor: pointer;
//           padding: 8px;
//           transition: color 0.2s;
//         }

//         .nav-item.active {
//           color: #007AFF;
//         }

//         .nav-text {
//           font-size: 11px;
//           margin-top: 4px;
//         }

//         .add-button {
//           width: 56px;
//           height: 56px;
//           border-radius: 28px;
//           background: #007AFF;
//           border: none;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           box-shadow: 0 4px 12px rgba(0,122,255,0.4);
//           margin-bottom: 20px;
//           transition: transform 0.2s;
//         }

//         .add-button:hover {
//           transform: scale(1.1);
//         }

//         .loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 100vh;
//           background: #f8f9fa;
//         }

//         .spinner {
//           width: 50px;
//           height: 50px;
//           border: 4px solid #f0f7ff;
//           border-top: 4px solid #007AFF;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin-bottom: 16px;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         /* أنماط إضافية للغرف */
//         .property-status {
//           margin-top: 8px;
//           display: flex;
//           justify-content: flex-start;
//         }

//         .status-badge {
//           display: inline-block;
//           padding: 4px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 500;
//         }

//         .status-badge.complete {
//           background-color: #4CAF50;
//           color: white;
//         }

//         .status-badge.not-complete {
//           background-color: #ff9800;
//           color: white;
//         }

//         /* تعديل بسيط في price-section للغرف */
//         .room-card .price-section {
//           border-top: none;
//           padding-top: 0;
//           margin-top: 8px;
//         }

//         .room-card .price-info {
//           background-color: #f0f7ff;
//           padding: 6px 12px;
//           border-radius: 20px;
//           width: 100%;
//           justify-content: center;
//         }

//         .room-card .price {
//           color: #007AFF;
//           font-size: 16px;
//         }

//         .room-card .price-label {
//           color: #007AFF;
//           font-weight: 500;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;













































// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaHome, FaHeart, FaPlus, FaSearch, FaComment, 
//   FaStar, FaWifi, FaBed, FaMapMarkerAlt, FaChevronRight,
//   FaPhone, FaEnvelope, FaUser
// } from 'react-icons/fa';

// const Home = () => {
//   const navigate = useNavigate();
//   const [apartments, setApartments] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('userToken');
//     const headers = { 'Authorization': `Bearer ${token}` };

//     try {
//       // 1. جلب الشقق (Discover Apartments)
//       const aptRes = await axios.get('https://graduationproject1.runasp.net/api/Property?page=1&pageSize=10', { headers });
//       if (aptRes.data?.isSuccess) {
//         setApartments(aptRes.data.data.items || []);
//       }

//       // 2. جلب الغرف (Discover Rooms) - معالجة البيانات المتداخلة من الـ JSON
//       const roomsRes = await axios.get('https://graduationproject1.runasp.net/api/Property/GetAllWithRooms?page=1&pageSize=10', { headers });
//       if (roomsRes.data?.isSuccess) {
//         const allRooms = [];
//         // الـ API يعود بـ items تحتوي على عقارات، وكل عقار يحتوي على مصفوفة rooms
//         const propertiesList = roomsRes.data.data.items || [];
        
//         propertiesList.forEach(property => {
//           if (property.rooms && Array.isArray(property.rooms)) {
//             property.rooms.forEach(room => {
//               allRooms.push({
//                 ...room,
//                 parentPropertyName: property.name,
//                 city: property.city,
//                 government: property.government,
//                 propertyId: property.id,
//                 displayImage: room.coverImageUrl || property.coverImageUrl 
//               });
//             });
//           }
//         });
//         setRooms(allRooms);
//       }

//       // 3. جلب ممتلكاتي (My Properties)
//       const myPropRes = await axios.get('https://graduationproject1.runasp.net/api/Property/MyProperty?filter=all&page=1&pageSize=10', { headers });
//       if (myPropRes.data?.isSuccess) {
//         console.log("myPropRes",myPropRes.data)
//         setMyProperties(myPropRes.data.data.items || []);
//       }

//     } catch (err) {
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // مكوّن البطاقة المرن لعرض الشقق والغرف
//   const PropertyCard = ({ item, isRoom = false, isMine = false }) => {
//     const title = isRoom ? item.roomName : item.name;
//     const price = isRoom ? item.month_rent : item.monthlyRent;
//     const image = isRoom ? item.displayImage : item.coverImageUrl;

//     return (
//       <div className="card" onClick={() => navigate(isMine ? `/my-property/${item.id}` : `/property/${item.propertyId || item.id}`)}>
//         <div className="card-img-wrapper">
//           <img src={image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={title} />
          
//           {isMine ? (
//             <div className={`badge ${item.isComplete ? 'complete' : 'incomplete'}`}>
//               {item.isComplete ? 'Complete' : 'Incomplete'}
//             </div>
//           ) : (
//             <div className="badge match">98% match</div>
//           )}
          
//           <div className="rating-badge">
//             <FaStar size={10} color="#FFD700" />
//             <span>4.5</span>
//           </div>
//         </div>

//         <div className="card-info">
//           <h4>{title || "Modern Living Space"}</h4>
//           <p className="loc"><FaMapMarkerAlt size={12} color="#666" /> {item.city}, {item.government}</p>
          
//           <div className="tags">
//             <span className="tag"><FaWifi size={10} /> Wifi</span>
//             <span className="tag"><FaBed size={10} /> Furnished</span>
//           </div>

//           <div className="card-footer">
//             <div className="price-tag">
//               <span className="val">{price || 0} EGP</span>
//               <span className="dur">/ month</span>
//             </div>
//             {!isMine && <div className="wish-btn"><FaHeart size={14} color="#ccc" /></div>}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

//   return (
//     <div className="home-container">
//       {/* Header */}
//       <header className="main-header">
//         <h1 className="logo">stay<span className="blue">Match</span></h1>
//         <div className="profile-icon" onClick={() => navigate('/profile')}><FaUser /></div>
//       </header>

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-overlay">
//           <h2>Find your perfect home<br/><span>and compatible roommate</span></h2>
//           <div className="search-widget">
//             <div className="search-tabs">
//               <button className="active">Rent Apartment</button>
//               <button>Rent Room</button>
//             </div>
//             <div className="search-bar">
//               <div className="input-group">
//                 <FaSearch className="s-icon" />
//                 <input type="text" placeholder="Search by Area / Person" />
//               </div>
//               <button className="btn-search">Search</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <main className="content">
//         {/* My Properties Section */}
//         {myProperties.length > 0 && (
//           <section className="section">
//             <div className="section-header">
//               <h3>My Properties</h3>
//               <button className="view-all" onClick={() => navigate('/my-properties')}>View All <FaChevronRight size={10}/></button>
//             </div>
//             <div className="horizontal-scroll">
//               {myProperties.map(prop => <PropertyCard key={prop.id} item={prop} isMine={true} />)}
//             </div>
//           </section>
//         )}

//         {/* Discover Apartment Section */}
//         <section className="section">
//           <div className="section-header">
//             <div>
//               <h3>Discover Apartment</h3>
//               <p className="subtitle">Handpicked Apartments with high compatibility score</p>
//             </div>
//             <button className="view-all" onClick={() => navigate('/all-apartments')}>View All <FaChevronRight size={10}/></button>
//           </div>
//           <div className="horizontal-scroll">
//             {apartments.map(apt => <PropertyCard key={apt.id} item={apt} />)}
//           </div>
//         </section>

//         {/* Discover Rooms Section */}
//         <section className="section">
//           <div className="section-header">
//             <div>
//               <h3>Discover Rooms</h3>
//               <p className="subtitle">Handpicked Rooms with high compatibility score</p>
//             </div>
//             <button className="view-all" onClick={() => navigate('/all-rooms')}>View All <FaChevronRight size={10}/></button>
//           </div>
//           <div className="horizontal-scroll">
//             {rooms.map((room, idx) => <PropertyCard key={idx} item={room} isRoom={true} />)}
//           </div>
//         </section>

//         {/* Support Section */}
//         <div className="support-box">
//           <p>Need Help? <span className="contact-us">Contact US</span></p>
//           <div className="support-card">
//             <div className="support-text">
//               <strong>Technical Support</strong>
//               <span>Send us your inquiries!</span>
//             </div>
//             <FaComment className="support-icon" />
//           </div>
//         </div>
//       </main>

//       {/* Bottom Navigation */}
//       <nav className="bottom-nav">
//         <div className="nav-item active"><FaHome /><span>Home</span></div>
//         <div className="nav-item"><FaHeart /><span>Matches</span></div>
//         <div className="nav-add"><button onClick={() => navigate('/add-property')}><FaPlus /></button></div>
//         <div className="nav-item"><FaSearch /><span>Browse</span></div>
//         <div className="nav-item"><FaComment /><span>Chats</span></div>
//       </nav>

//       <style jsx>{`
//         .home-container { background: #fcfdfe; min-height: 100vh; padding-bottom: 90px; }
//         .main-header { display: flex; justify-content: space-between; padding: 15px 20px; align-items: center; background: white; }
//         .logo { font-size: 22px; font-weight: 800; color: #333; }
//         .blue { color: #1e3a8a; }
//         .profile-icon { color: #1e3a8a; font-size: 20px; cursor: pointer; }

//         .hero { height: 350px; background: url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470') center/cover; position: relative; }
//         .hero-overlay { background: rgba(0,0,0,0.3); height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 0 20px; text-align: center; }
//         .hero h2 { font-size: 24px; margin-bottom: 20px; line-height: 1.3; }
//         .hero h2 span { font-weight: 300; font-size: 16px; }

//         .search-widget { background: white; width: 100%; max-width: 500px; border-radius: 15px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
//         .search-tabs { display: flex; border-bottom: 1px solid #eee; }
//         .search-tabs button { flex: 1; padding: 12px; border: none; background: #f8f9fa; color: #666; font-size: 12px; cursor: pointer; }
//         .search-tabs button.active { background: white; color: #1e3a8a; font-weight: bold; border-bottom: 2px solid #1e3a8a; }
//         .search-bar { padding: 12px; display: flex; gap: 10px; }
//         .input-group { flex: 1; position: relative; }
//         .s-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #999; }
//         .input-group input { width: 100%; padding: 10px 10px 10px 35px; border: 1px solid #eee; border-radius: 8px; outline: none; }
//         .btn-search { background: #1e3a8a; color: white; border: none; padding: 0 20px; border-radius: 8px; font-weight: bold; }

//         .content { padding: 20px; }
//         .section { margin-bottom: 35px; }
//         .section-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
//         .section-header h3 { margin: 0; font-size: 18px; color: #111; }
//         .subtitle { font-size: 11px; color: #888; margin-top: 4px; }
//         .view-all { background: none; border: none; color: #1e3a8a; font-weight: bold; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; }

//         .horizontal-scroll { display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: none; }
//         .horizontal-scroll::-webkit-scrollbar { display: none; }

//         .card { min-width: 250px; background: white; border-radius: 16px; border: 1px solid #f0f0f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); cursor: pointer; }
//         .card-img-wrapper { position: relative; height: 150px; }
//         .card-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
//         .badge { position: absolute; top: 10px; left: 10px; padding: 4px 10px; border-radius: 6px; font-size: 10px; color: white; font-weight: bold; }
//         .badge.match, .badge.complete { background: #1e3a8a; }
//         .badge.incomplete { background: #3b82f6; }
//         .rating-badge { position: absolute; top: 10px; right: 10px; background: white; padding: 4px 8px; border-radius: 12px; display: flex; align-items: center; gap: 4px; font-size: 10px; font-weight: bold; }

//         .card-info { padding: 12px; }
//         .card-info h4 { margin: 0; font-size: 14px; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//         .loc { font-size: 11px; color: #666; margin: 6px 0; display: flex; align-items: center; gap: 4px; }
//         .tags { display: flex; gap: 8px; margin-bottom: 12px; }
//         .tag { background: #f3f4f6; padding: 3px 8px; border-radius: 5px; font-size: 9px; color: #555; display: flex; align-items: center; gap: 4px; }
        
//         .card-footer { display: flex; justify-content: space-between; align-items: center; }
//         .val { font-size: 16px; font-weight: bold; color: #1e3a8a; }
//         .dur { font-size: 10px; color: #999; margin-left: 4px; }

//         .support-box { text-align: center; margin-top: 20px; }
//         .contact-us { color: #10b981; text-decoration: underline; cursor: pointer; }
//         .support-card { background: #f3f4f6; padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; max-width: 350px; margin: 15px auto 0; text-align: left; }
//         .support-text strong { display: block; font-size: 13px; }
//         .support-text span { font-size: 11px; color: #777; }
//         .support-icon { color: #1e3a8a; font-size: 20px; }

//         .bottom-nav { position: fixed; bottom: 0; width: 100%; background: white; display: flex; justify-content: space-around; padding: 10px 0; border-top: 1px solid #eee; }
//         .nav-item { display: flex; flex-direction: column; align-items: center; color: #ccc; font-size: 20px; }
//         .nav-item.active { color: #1e3a8a; }
//         .nav-item span { font-size: 10px; margin-top: 4px; }
//         .nav-add { transform: translateY(-20px); }
//         .nav-add button { width: 45px; height: 45px; border-radius: 50%; background: #1e3a8a; color: white; border: 4px solid white; font-size: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }

//         .loader-container { height: 100vh; display: flex; align-items: center; justify-content: center; }
//         .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #1e3a8a; border-radius: 50%; animation: spin 1s linear infinite; }
//         @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// };

// export default Home;





// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaHome, FaHeart, FaPlus, FaSearch, FaComment, 
//   FaStar, FaMapMarkerAlt, FaUser, FaBed
// } from 'react-icons/fa';

// const Home = () => {
//   const navigate = useNavigate();
//   const [apartments, setApartments] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('userToken');
//     const headers = { 'Authorization': `Bearer ${token}` };

//     try {
//       // 1. جلب الشقق (Discover Apartment) من الـ API
//       const aptRes = await axios.get('https://graduationproject1.runasp.net/api/Property?page=1&pageSize=10', { headers });
//       if (aptRes.data?.isSuccess) {
//         // الـ API يرجع المصفوفة داخل data.properties
//         console.log(aptRes.data);
//         setApartments(aptRes.data.data.properties || []);
//       }

//       // 2. جلب الغرف (Discover Rooms) ومعالجة البيانات المتداخلة
//       const roomsRes = await axios.get('https://graduationproject1.runasp.net/api/Property/GetAllWithRooms?page=1&pageSize=10', { headers });
//       if (roomsRes.data?.isSuccess) {
//         const allRooms = [];
//         console.log(roomsRes.data)
//         const propertiesList = roomsRes.data.data.properties || [];
        
//         propertiesList.forEach(property => {
//           if (property.rooms && Array.isArray(property.rooms)) {
//             property.rooms.forEach(room => {
//               allRooms.push({
//                 ...room,
//                 city: property.city,
//                 government: property.government,
//                 propertyId: property.id,
//                 // استخدام صورة الغرفة أو العقار كبديل
//                 displayImage: room.coverImageUrl || property.coverImageUrl 
//               });
//             });
//           }
//         });
//         setRooms(allRooms);
//       }

//       // 3. جلب ممتلكاتي (My Properties)
//       const myPropRes = await axios.get('https://graduationproject1.runasp.net/api/Property/MyProperty?filter=all&page=1&pageSize=10', { headers });
//       if (myPropRes.data?.isSuccess) {

//         setMyProperties(myPropRes.data.data.properties || []);
//       }

//     } catch (err) {
//       console.error("API Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // مكوّن الكارت الموحد بناءً على تصميم الـ Figma
//   const PropertyCard = ({ item, isRoom = false, isMine = false }) => {
//     const title = isRoom ? (item.roomName || "Modern Room") : (item.name || "Modern Apartment");
//     const price = isRoom ? item.month_rent : item.monthlyRent;
//     const image = isRoom ? item.displayImage : item.coverImageUrl;

//     return (
//       <div className="card" onClick={() => navigate(isMine ? `/my-property/${item.id}` : `/property/${isRoom ? item.propertyId : item.id}`)}>
//         <div className="card-img-wrapper">
//           <img src={image || 'https://via.placeholder.com/300x200?text=StayMatch'} alt={title} />
          
//           {isMine ? (
//             <div className={`badge ${item.status === 'Complete' ? 'complete' : 'incomplete'}`}>
//                {item.status === 'Pending_Approval' ? 'Not Complete' : 'Complete'}
//             </div>
//           ) : (
//             <div className="badge match">98% match</div>
//           )}
          
//           <div className="rating-badge">
//             <FaStar size={10} color="#FFD700" /> <span>4.5</span>
//           </div>
//         </div>

//         <div className="card-info">
//           <h4>{title}</h4>
//           <p className="loc"><FaMapMarkerAlt size={12} /> {item.city}, {item.government}</p>
          
//           <div className="tags">
//             <span className="tag">Wifi</span>
//             <span className="tag">Furnished</span>
//           </div>

//           <div className="card-footer">
//             <div className="price-tag">
//               <span className="val">EGP {price || 0}</span>
//               <span className="dur">/ month</span>
//             </div>
//             {!isMine && <div className="wish-btn"><FaHeart size={14} /></div>}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) return <div className="loader">جاري تحميل البيانات...</div>;

//   return (
//     <div className="home-container">
//       {/* Navbar */}
//       <header className="main-header">
//         <h1 className="logo">stay<span className="blue">Match</span></h1>
//         <div className="profile-icon" onClick={() => navigate('/profile')}><FaUser /></div>
//       </header>

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-overlay">
//           <h2>Stay Match <span>helps you find the perfect home<br/>and the most compatible roommate.</span></h2>
//           <div className="search-widget">
//             <div className="search-tabs">
//               <button className="active"><FaHome /> Rent Apartment</button>
//               <button><FaBed /> Rent Room</button>
//             </div>
//             <div className="search-bar">
//               <input type="text" placeholder="Search by Area / Person" />
//               <button className="btn-search">Search</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <main className="content">
//         {/* قسم Discover Apartment */}
//         <section className="section">
//           <div className="section-header">
//             <div>
//               <h3>Discover Apartment</h3>
//               <p className="subtitle">Handpicked Apartments with high compatibility score</p>
//             </div>
//             <button className="view-all" onClick={() => navigate('/all-apartments')}>View All Apartments</button>
//           </div>
//           <div className="horizontal-scroll">
//             {apartments.length > 0 ? (
//               apartments.map(apt => <PropertyCard key={apt.id} item={apt} />)
//             ) : <p className="empty">لا توجد شقق متاحة حالياً</p>}
//           </div>
//         </section>

//         {/* قسم Discover Rooms */}
//         <section className="section">
//           <div className="section-header">
//             <div>
//               <h3>Discover Rooms</h3>
//               <p className="subtitle">Handpicked Rooms with high compatibility score</p>
//             </div>
//             <button className="view-all" onClick={() => navigate('/all-rooms')}>View All Rooms</button>
//           </div>
//           <div className="horizontal-scroll">
//             {rooms.length > 0 ? (
//               rooms.map((room, idx) => <PropertyCard key={idx} item={room} isRoom={true} />)
//             ) : <p className="empty">لا توجد غرف متاحة حالياً</p>}
//           </div>
//         </section>

//         {/* قسم My Properties */}
//         <section className="section">
//           <div className="section-header">
//             <div>
//               <h3>My Properties</h3>
//               <p className="subtitle">Properties you have listed for rent</p>
//             </div>
//             <button className="view-all" onClick={() => navigate('/my-properties')}>View All My Properties</button>
//           </div>
//           <div className="horizontal-scroll">
//             {myProperties.length > 0 ? (
//               myProperties.map(prop => <PropertyCard key={prop.id} item={prop} isMine={true} />)
//             ) : <div className="empty-box">No properties added yet.</div>}
//           </div>
//         </section>

//         {/* Support Section */}
//         <div className="support-box">
//           <p>Need Help? <span className="contact-us">Contact US</span></p>
//           <div className="support-card">
//             <div className="support-text">
//               <strong>Technical Support</strong>
//               <span>Send us your inquiries!</span>
//             </div>
//             <FaComment className="support-icon" />
//           </div>
//         </div>
//       </main>

//       {/* Bottom Nav */}
//       <nav className="bottom-nav">
//         <div className="nav-item active"><FaHome /><span>Home</span></div>
//         <div className="nav-item"><FaHeart /><span>Matches</span></div>
//         <div className="nav-add"><button onClick={() => navigate('/add-property')}><FaPlus /></button></div>
//         <div className="nav-item"><FaSearch /><span>Browse</span></div>
//         <div className="nav-item"><FaComment /><span>Chats</span></div>
//       </nav>

//       {/* CSS Styles - أضفت الـ Styles هنا لضمان مطابقة الصورة */}
//       <style jsx>{`
//         .home-container { background: #fdfdfd; min-height: 100vh; padding-bottom: 90px; }
//         .main-header { display: flex; justify-content: space-between; padding: 15px 20px; align-items: center; background: white; }
//         .logo { font-size: 22px; font-weight: 800; color: #333; }
//         .blue { color: #1e3a8a; }
//         .hero { height: 380px; background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470') center/cover; position: relative; }
//         .hero-overlay { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 0 20px; text-align: center; }
//         .hero h2 { font-size: 24px; margin-bottom: 20px; }
//         .hero h2 span { font-weight: 300; font-size: 15px; display: block; margin-top: 5px; }
//         .search-widget { background: white; width: 100%; max-width: 500px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
//         .search-tabs { display: flex; background: #f8f9fa; }
//         .search-tabs button { flex: 1; padding: 12px; border: none; font-size: 11px; color: #666; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px; }
//         .search-tabs button.active { background: white; color: #1e3a8a; font-weight: bold; border-bottom: 2px solid #1e3a8a; }
//         .search-bar { padding: 12px; display: flex; gap: 10px; }
//         .search-bar input { flex: 1; padding: 10px; border: 1px solid #eee; border-radius: 8px; outline: none; font-size: 13px; }
//         .btn-search { background: #1e3a8a; color: white; border: none; padding: 0 20px; border-radius: 8px; font-weight: bold; }
//         .content { padding: 20px; }
//         .section { margin-bottom: 35px; }
//         .section-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
//         .section-header h3 { margin: 0; font-size: 19px; color: #111; }
//         .subtitle { font-size: 11px; color: #888; margin-top: 4px; }
//         .view-all { background: none; border: none; color: #1e3a8a; font-weight: bold; font-size: 12px; cursor: pointer; }
//         .horizontal-scroll { display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px; scrollbar-width: none; }
//         .horizontal-scroll::-webkit-scrollbar { display: none; }
//         .card { min-width: 250px; background: white; border-radius: 16px; border: 1px solid #f0f0f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); cursor: pointer; }
//         .card-img-wrapper { position: relative; height: 160px; }
//         .card-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
//         .badge { position: absolute; top: 10px; left: 10px; padding: 4px 10px; border-radius: 6px; font-size: 10px; color: white; font-weight: bold; background: #1e3a8a; }
//         .badge.incomplete { background: #3b82f6; }
//         .rating-badge { position: absolute; top: 10px; right: 10px; background: white; padding: 4px 8px; border-radius: 12px; display: flex; align-items: center; gap: 4px; font-size: 10px; font-weight: bold; }
//         .card-info { padding: 12px; }
//         .card-info h4 { margin: 0; font-size: 14px; color: #333; }
//         .loc { font-size: 11px; color: #666; margin: 6px 0; display: flex; align-items: center; gap: 4px; }
//         .tags { display: flex; gap: 8px; margin-bottom: 12px; }
//         .tag { background: #f3f4f6; padding: 3px 8px; border-radius: 5px; font-size: 9px; color: #555; }
//         .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f9f9f9; padding-top: 10px; }
//         .val { font-size: 15px; font-weight: bold; color: #1e3a8a; }
//         .dur { font-size: 10px; color: #999; }
//         .wish-btn { color: #ccc; }
//         .support-box { text-align: center; margin-top: 20px; }
//         .support-card { background: #f3f4f6; padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; max-width: 400px; margin: 15px auto 0; text-align: left; }
//         .support-text strong { display: block; font-size: 13px; }
//         .support-text span { font-size: 11px; color: #777; }
//         .support-icon { color: #1e3a8a; font-size: 20px; }
//         .bottom-nav { position: fixed; bottom: 0; width: 100%; background: white; display: flex; justify-content: space-around; padding: 10px 0; border-top: 1px solid #eee; }
//         .nav-item { display: flex; flex-direction: column; align-items: center; color: #ccc; font-size: 20px; }
//         .nav-item.active { color: #1e3a8a; }
//         .nav-item span { font-size: 10px; margin-top: 4px; }
//         .nav-add { transform: translateY(-20px); }
//         .nav-add button { width: 45px; height: 45px; border-radius: 50%; background: #1e3a8a; color: white; border: 4px solid white; font-size: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
//         .empty-box { color: #ccc; padding: 20px; font-style: italic; }
//       `}</style>
//     </div>
//   );
// };

// export default Home;











// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // استيراد أيقونات أكثر دقة لتناسب التصميم الجديد
// import { 
//   FaHome, FaHeart, FaPlus, FaSearch, FaChevronRight,
//   FaWifi, FaChair, FaStar, FaEnvelope
// } from 'react-icons/fa';

// const Home = () => {
//   const navigate = useNavigate();
//   const [apartments, setApartments] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('userToken');
//     const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

//     try {
//       // 1. جلب الشقق (Discover Apartments)
//       const aptRes = await axios.get('https://graduationproject1.runasp.net/api/Property?page=1&pageSize=4', { headers });
//       if (aptRes.data?.isSuccess) {
//         setApartments(aptRes.data.data.items || aptRes.data.data.properties || []);
//       }

//       // 2. جلب الغرف (Discover Rooms)
//       const roomsRes = await axios.get('https://graduationproject1.runasp.net/api/Property/GetAllWithRooms?page=1&pageSize=4', { headers });
//       if (roomsRes.data?.isSuccess) {
//         const allRooms = [];
//         const propertiesList = roomsRes.data.data.items || roomsRes.data.data.properties || [];
        
//         propertiesList.forEach(property => {
//           if (property.rooms && Array.isArray(property.rooms)) {
//             property.rooms.forEach(room => {
//               allRooms.push({
//                 ...room,
//                 parentPropertyName: property.name,
//                 city: property.city,
//                 government: property.government,
//                 propertyId: property.id,
//                 displayImage: room.coverImageUrl || property.coverImageUrl 
//               });
//             });
//           }
//         });
//         setRooms(allRooms);
//       }

//       // 3. جلب ممتلكاتي (My Properties)
//       // إذا كان التوكين موجوداً، نجلب البيانات
//       if (token) {
//         const myPropRes = await axios.get('https://graduationproject1.runasp.net/api/Property/MyProperty?filter=all&page=1&pageSize=6', { headers });
//         if (myPropRes.data?.isSuccess) {
//           setMyProperties(myPropRes.data.data.properties || []);
//         }
//       }

//     } catch (err) {
//       console.error("Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // مكوّن البطاقة المصمم حديثاً (Discover & My Properties)
//   const PropertyCard = ({ item, isRoom = false, isMine = false }) => {
//     const title = isRoom ? item.roomName : item.name;
//     const price = isRoom ? item.month_rent : (item.monthlyRent || "---");
//     // استخدام الصورة الافتراضية إذا لم تكن موجودة في الـ API، تماماً مثل التصميم
//     const image = isRoom ? item.displayImage : item.coverImageUrl;

//     // دالة لتنسيق حالة العقار
//     const getStatusLabel = (status) => {
//       if (!status) return "Unknown";
//       return status.replace('_', ' ');
//     };

//     return (
//       <div className="card" onClick={() => navigate(isMine ? `/my-property/${item.id}` : `/property/${item.propertyId || item.id}`)}>
//         <div className="card-img-wrapper">
//           <img src={image || 'https://via.placeholder.com/300x200?text=No+Image'} alt={title} />
          
//           {isMine ? (
//             <div className={`badge ${item.status === 'Pending_Approval' ? 'incomplete' : 'complete'}`}>
//               {getStatusLabel(item.status)}
//             </div>
//           ) : (
//             <div className="badge match">98% Match</div>
//           )}
          
//           <div className="rating-badge">
//             <FaStar size={11} color="#FFD700" />
//             <span>4.5</span>
//           </div>
//         </div>

//         <div className="card-info">
//           <h4>{title || "Modern Living Space"}</h4>
//           <p className="loc"> {item.city}, {item.government}</p>
          
//           <div className="tags">
//             <span className="tag"><FaWifi size={11} /> Wifi</span>
//             <span className="tag"><FaChair size={11} /> {item.type || 'Furnished'}</span>
//           </div>

//           <div className="card-footer">
//             <div className="price-tag">
//               <span className="val">{price} EGP</span>
//               <span className="dur">/ month</span>
//             </div>
//             {!isMine && <button className="wish-btn"><FaHeart size={14} color="#ccc" /></button>}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

//   return (
//     <div className="home-container">
//       {/* Header - تم تحديثه ليطابق التصميم */}
//       <header className="main-header">
//         <h1 className="logo">stay<span className="blue">Match</span></h1>
//         <div className="header-search">
//             <FaSearch className="h-s-icon" />
//             <input type="text" placeholder="Search by location" />
//         </div>
//         <nav className="header-nav">
//           <span className="nav-link active">Home</span>
//           <span className="nav-link">Matches</span>
//           <span className="nav-link">Add Property</span>
//           <span className="nav-link">Browse</span>
//           <span className="nav-link">Chats</span>
//           <span className="nav-link">profile</span>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-overlay">
//           <h2>Find your perfect home<br/><span>and compatible roommate.</span></h2>
//           <div className="search-widget">
//             <div className="search-tabs">
//               <button className="active">Rent a whole Apartment</button>
//               <button>Rent a whole Room</button>
//             </div>
//             <div className="search-bar">
//               <div className="input-group">
//                 <FaSearch className="s-icon" />
//                 <input type="text" placeholder="Search by Area / Person" />
//               </div>
//               <button className="btn-search">Search</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <main className="content">
//         {/* Discover Apartment Section */}
//         <section className="section">
//           <div className="section-header">
//             <div>
//               <h3>Discover Apartment</h3>
//               <p className="subtitle">Handpicked Apartments with high compatibility score</p>
//             </div>
//             <button className="view-all" onClick={() => navigate('/all-apartments')}>View All Apartments <FaChevronRight size={10}/></button>
//           </div>
//           {/* تمرير أفقي */}
//           <div className="horizontal-scroll">
//             {apartments.map(apt => <PropertyCard key={apt.id} item={apt} />)}
//           </div>
//         </section>

//         {/* Discover Rooms Section */}
//         <section className="section">
//           <div className="section-header">
//             <div>
//               <h3>Discover Rooms</h3>
//               <p className="subtitle">Handpicked Rooms with high compatibility score</p>
//             </div>
//             <button className="view-all" onClick={() => navigate('/all-rooms')}>View All Rooms <FaChevronRight size={10}/></button>
//           </div>
//           {/* تمرير أفقي */}
//           <div className="horizontal-scroll">
//             {rooms.map((room, idx) => <PropertyCard key={idx} item={room} isRoom={true} />)}
//           </div>
//         </section>

//         {/* قسم ممتلكاتي (My Properties) - تم نقله للأسفل وتحويله لعرض شبكي */}
//         {myProperties.length > 0 && (
//           <section className="section my-properties-section">
//             <div className="section-header">
//               <div>
//                 <h3>My Properties</h3>
//                 {/* تم إضافة "Share your apartment details and reach compatible roommate matches today!" */}
//                 <p className="subtitle">Share your apartment details and reach compatible roommate matches today!</p>
//               </div>
//               <button className="view-all" onClick={() => navigate('/my-properties')}>View All My Properties <FaChevronRight size={10}/></button>
//             </div>
//             {/* عرض شبكي (Grid) */}
//             <div className="properties-grid">
//               {myProperties.map(prop => (
//                 <PropertyCard key={prop.id} item={prop} isMine={true} />
//               ))}
//             </div>
//           </section>
//         )}

//         {/* Support Section */}
//         <div className="support-box">
//           <p>Need Help? <span className="contact-us">Contact US</span></p>
//           <div className="support-card">
//             <div className="support-text">
//               <strong>Technical Support</strong>
//               <span>Send us your inquiries!</span>
//             </div>
//             <FaEnvelope className="support-icon" />
//           </div>
//         </div>
//       </main>

//       <style jsx>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
//         * { font-family: 'Inter', sans-serif; box-shadow: none !important; }

//         .home-container { background: #fcfdfe; min-height: 100vh; padding-bottom: 20px; }
        
//         /* Header Styling */
//         .main-header { display: flex; justify-content: space-between; padding: 12px 60px; align-items: center; background: white; border-bottom: 1px solid #f0f0f0; }
//         .logo { font-size: 20px; font-weight: 800; color: #333; margin: 0; }
//         .blue { color: #1e3a8a; }
//         .header-search { position: relative; width: 200px; }
//         .h-s-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #bbb; font-size: 12px; }
//         .header-search input { width: 100%; padding: 6px 10px 6px 30px; border: 1px solid #e0e0e0; border-radius: 6px; font-size: 11px; outline: none; background: #fafafa; }
//         .header-nav { display: flex; gap: 20px; font-size: 12px; font-weight: 500; color: #666; }
//         .nav-link { cursor: pointer; }
//         .nav-link.active { color: #1e3a8a; font-weight: 600; }
//         .nav-link:hover { color: #1e3a8a; }

//         /* Hero Styling */
//         .hero { height: 380px; background: url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470') center/cover; position: relative; margin-bottom: 30px; }
//         .hero-overlay { background: rgba(0,0,0,0.3); height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; padding: 0 20px; text-align: center; }
//         .hero h2 { font-size: 26px; margin-bottom: 25px; line-height: 1.3; font-weight: 700; }
//         .hero h2 span { font-weight: 400; font-size: 18px; color: #f0f0f0; }

//         .search-widget { background: white; width: 100%; max-width: 520px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important; }
//         .search-tabs { display: flex; border-bottom: 1px solid #eee; }
//         .search-tabs button { flex: 1; padding: 14px; border: none; background: #f8f9fa; color: #777; font-size: 12px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
//         .search-tabs button.active { background: white; color: #1e3a8a; font-weight: 600; border-bottom: 2px solid #1e3a8a; }
//         .search-bar { padding: 15px; display: flex; gap: 10px; }
//         .input-group { flex: 1; position: relative; }
//         .s-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #bbb; font-size: 14px; }
//         .input-group input { width: 100%; padding: 11px 11px 11px 40px; border: 1px solid #e0e0e0; border-radius: 8px; outline: none; font-size: 13px; color: #333; }
//         .btn-search { background: #1e3a8a; color: white; border: none; padding: 0 25px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer; }

//         /* Content & Sections */
//         .content { padding: 0 60px; }
//         .section { margin-bottom: 40px; }
//         .section-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 18px; }
//         .section-header h3 { margin: 0; font-size: 18px; color: #111; font-weight: 700; }
//         .subtitle { font-size: 12px; color: #888; margin-top: 5px; font-weight: 400; }
//         .view-all { background: none; border: none; color: #1e3a8a; font-weight: 600; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 5px; padding: 0; }

//         /* Horizontal Scroll */
//         .horizontal-scroll { display: flex; gap: 20px; overflow-x: auto; padding-bottom: 15px; scrollbar-width: none; }
//         .horizontal-scroll::-webkit-scrollbar { display: none; }

//         /* Properties Grid (My Properties) */
//         .properties-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 25px; }
//         .my-properties-section { margin-top: 50px; padding-top: 20px; border-top: 1px solid #f0f0f0; }

//         /* Card Styling - تم تحسينه ليطابق التصميم */
//         .card { background: white; border-radius: 12px; border: 1px solid #e8e8e8; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03) !important; cursor: pointer; transition: transform 0.2s; }
//         .card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.06) !important; }
//         .card-img-wrapper { position: relative; height: 160px; background: #fafafa; }
//         .card-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
        
//         .badge { position: absolute; top: 12px; left: 12px; padding: 4px 10px; border-radius: 6px; font-size: 10px; color: white; font-weight: 600; text-transform: capitalize; letter-spacing: 0.3px; }
//         .badge.match, .badge.complete { background: #1e3a8a; }
//         .badge.incomplete { background: #60a5fa; } /* لبندنج */
        
//         .rating-badge { position: absolute; top: 12px; right: 12px; background: rgba(251, 191, 36, 0.15); color: #b45309; padding: 4px 9px; border-radius: 8px; display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; border: 1px solid rgba(251, 191, 36, 0.3); }

//         .card-info { padding: 15px; }
//         .card-info h4 { margin: 0; font-size: 14px; color: #222; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//         .loc { font-size: 12px; color: #777; margin: 8px 0; font-weight: 400; }
        
//         .tags { display: flex; gap: 10px; margin-bottom: 15px; }
//         .tag { background: #f3f6f9; padding: 4px 10px; border-radius: 6px; font-size: 10px; color: #555; display: flex; align-items: center; gap: 5px; font-weight: 500; }
        
//         .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f0f0f0; padding-top: 12px; margin-top: 5px; }
//         .price-tag { display: flex; align-items: baseline; gap: 3px; }
//         .val { font-size: 17px; font-weight: 700; color: #1e3a8a; }
//         .dur { font-size: 11px; color: #999; font-weight: 400; }
//         .wish-btn { background: none; border: none; padding: 0; cursor: pointer; color: #ccc; }
//         .wish-btn:hover { color: #ef4444; }

//         /* Support Box */
//         .support-box { text-align: center; margin: 50px 0 30px 0; padding-top: 20px; border-top: 1px solid #f0f0f0; }
//         .support-box p { font-size: 13px; color: #666; font-weight: 400; }
//         .contact-us { color: #10b981; text-decoration: underline; cursor: pointer; font-weight: 500; }
//         .support-card { background: #f3f6fa; padding: 18px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; max-width: 360px; margin: 18px auto 0; text-align: left; }
//         .support-text strong { display: block; font-size: 14px; color: #222; font-weight: 600; }
//         .support-text span { font-size: 12px; color: #777; font-weight: 400; margin-top: 2px; display: block; }
//         .support-icon { color: #1e3a8a; font-size: 20px; }

//         /* Loader */
//         .loader-container { height: 100vh; display: flex; align-items: center; justify-content: center; background: #fff; }
//         .spinner { width: 45px; height: 45px; border: 4px solid #f3f3f3; border-top: 4px solid #1e3a8a; border-radius: 50%; animation: spin 1s linear infinite; }
//         @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

//         /* Responsive Adjustments */
//         @media (max-width: 1024px) {
//           .main-header { padding: 12px 30px; }
//           .content { padding: 0 30px; }
//           .hero h2 { font-size: 22px; }
//           .properties-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;


























// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaHome, FaHeart, FaPlus, FaSearch, FaChevronRight, FaChevronLeft,
//   FaWifi, FaChair, FaStar, FaEnvelope
// } from 'react-icons/fa';

// const Home = () => {
//   const navigate = useNavigate();
//   const [apartments, setApartments] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [aptIndex, setAptIndex] = useState(0);
//   const [roomIndex, setRoomIndex] = useState(0);
//   const [myPropIndex, setMyPropIndex] = useState(0);
//   const itemsPerPage = 5;

//   // الرابط الأساسي للسيرفر
//   const BASE_URL = "https://graduationproject1.runasp.net/";

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('userToken');
//     const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

//     try {
//       // 1. جلب الشقق
//       const aptRes = await axios.get(`${BASE_URL}api/Property?page=1&pageSize=20`, { headers });
//       if (aptRes.data?.isSuccess) {
//         setApartments(aptRes.data.data.properties || aptRes.data.data.items || []);
//       }

//       // 2. جلب الغرف
//       const roomsRes = await axios.get(`${BASE_URL}api/Property/GetAllWithRooms?page=1&pageSize=20`, { headers });
//       if (roomsRes.data?.isSuccess) {
//         const allRooms = [];
//         const propertiesList = roomsRes.data.data.items || roomsRes.data.data.properties || [];
//         propertiesList.forEach(property => {
//           if (property.rooms) {
//             property.rooms.forEach(room => {
//               allRooms.push({ 
//                 ...room, 
//                 city: property.city, 
//                 government: property.government, 
//                 propertyId: property.id,
//                 finalImage: room.coverImageUrl || property.coverImageUrl 
//               });
//             });
//           }
//         });
//         setRooms(allRooms);
//       }

//       // 3. جلب ممتلكاتي
//       if (token) {
//         const myPropRes = await axios.get(`${BASE_URL}api/Property/MyProperty?filter=all&page=1&pageSize=20`, { headers });
//         if (myPropRes.data?.isSuccess) {
//           setMyProperties(myPropRes.data.data.properties || []);
//         }
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNext = (current, setter, total) => {
//     if (current + itemsPerPage < total) setter(current + itemsPerPage);
//   };
//   const handlePrev = (current, setter) => {
//     if (current - itemsPerPage >= 0) setter(current - itemsPerPage);
//   };

//   const PropertyCard = ({ item, isRoom = false, isMine = false }) => {
//     const title = isRoom ? (item.roomName || "Standard Room") : (item.name || "Luxury Apartment");
//     const price = isRoom ? item.month_rent : (item.monthlyRent || "---");
    
//     let imageUrl = isRoom ? item.finalImage : item.coverImageUrl;
//     if (imageUrl && !imageUrl.startsWith('http')) {
//       imageUrl = BASE_URL + imageUrl;
//     }

//     return (
//       <div className="card" onClick={() => navigate(isMine ? `/my-property/${item.id}` : `/property/${item.propertyId || item.id}`)}>
//         <div className="card-img-wrapper">
//           <img 
//             src={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
//             alt="property" 
//             onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error'; }}
//           />
//           <div className="badge">{isMine ? (item.status?.replace('_', ' ') || 'Pending') : '98% Match'}</div>
//           <div className="rating-badge"><FaStar size={10} color="#FFD700" /> 4.5</div>
//         </div>
//         <div className="card-info">
//           <h4>{title}</h4>
//           <p className="loc">{item.city || "Cairo"}, {item.government || "Egypt"}</p>
//           <div className="tags">
//             <span className="tag"><FaWifi size={10} /> Wifi</span>
//             <span className="tag"><FaChair size={10} /> {item.type || 'Furnished'}</span>
//           </div>
//           <div className="card-footer">
//             <div className="price-tag">
//                 <span className="val">{price} EGP</span>
//                 <span className="dur">/ month</span>
//             </div>
//             {!isMine && <FaHeart size={14} color="#ccc" className="heart-icon" />}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

//   return (
//     <div className="home-container">
//       {/* Header */}
//       <header className=" mt-3 main-header">
//         <nav className="header-nav">
//         </nav>
//       </header>

//       {/* Hero Section (التعديل الأساسي هنا - تكبير الجزء بالكامل) */}
//       <section className="hero">
//         <div className="hero-content">
//           <div className="hero-text-wrapper">
//              {/* تكبير حجم الخط ووزنه */}
//              <h2>Find your perfect home<br/>and compatible roommate.</h2>
//           </div>
//           <div className="hero-search-wrapper">
//               <div className="hero-search">
//                  {/* تكبير التباعد والخط داخل شريط البحث */}
//                  <div className="h-input"><FaSearch size={18} color="#bbb" /> <input placeholder="Search by Area / Person" /></div>
//                  <button>Search</button>
//               </div>
//           </div>
//         </div>
//       </section>

//       <main className="content">
//         {/* Apartments Section */}
//         <section className="section-container">
//           <div className="section-header">
//             <div>
//                <h3>Discover Apartment</h3>
//                <p className="sub">Handpicked Apartments with high compatibility score</p>
//             </div>
//             <div className="nav-controls">
//               <button className="arrow" onClick={() => handlePrev(aptIndex, setAptIndex)} disabled={aptIndex === 0}><FaChevronLeft/></button>
//               <button className="arrow" onClick={() => handleNext(aptIndex, setAptIndex, apartments.length)} disabled={aptIndex + itemsPerPage >= apartments.length}><FaChevronRight/></button>
//             </div>
//           </div>
//           <div className="grid-layout">
//             {apartments.slice(aptIndex, aptIndex + itemsPerPage).map(item => <PropertyCard key={item.id} item={item} />)}
//           </div>
//         </section>

//         {/* Rooms Section */}
//         <section className="section-container">
//           <div className="section-header">
//             <div>
//                <h3>Discover Rooms</h3>
//                <p className="sub">Handpicked Rooms with high compatibility score</p>
//             </div>
//             <div className="nav-controls">
//               <button className="arrow" onClick={() => handlePrev(roomIndex, setRoomIndex)} disabled={roomIndex === 0}><FaChevronLeft/></button>
//               <button className="arrow" onClick={() => handleNext(roomIndex, setRoomIndex, rooms.length)} disabled={roomIndex + itemsPerPage >= rooms.length}><FaChevronRight/></button>
//             </div>
//           </div>
//           <div className="grid-layout">
//             {rooms.slice(roomIndex, roomIndex + itemsPerPage).map((item, idx) => <PropertyCard key={idx} item={item} isRoom />)}
//           </div>
//         </section>

//         {/* My Properties Section */}
//         {myProperties.length > 0 && (
//           <section className="section-container">
//             <div className="section-header">
//               <div>
//                  <h3>My Properties</h3>
//                  <p className="sub">Share your apartment details and reach compatible roommate matches today!</p>
//               </div>
//               <div className="nav-controls">
//                 <button className="arrow" onClick={() => handlePrev(myPropIndex, setMyPropIndex)} disabled={myPropIndex === 0}><FaChevronLeft/></button>
//                 <button className="arrow" onClick={() => handleNext(myPropIndex, setMyPropIndex, myProperties.length)} disabled={myPropIndex + itemsPerPage >= myProperties.length}><FaChevronRight/></button>
//               </div>
//             </div>
//             <div className="grid-layout">
//               {myProperties.slice(myPropIndex, myPropIndex + itemsPerPage).map(item => <PropertyCard key={item.id} item={item} isMine />)}
//             </div>
//           </section>
//         )}

//         {/* Support */}
//         <div className="support-section">
//             <p>Need Help? <span className="green">Contact US</span></p>
//             <div className="support-card">
//                <FaEnvelope size={20} color="#1e3a8a"/>
//                <div><strong>Technical Support</strong><span>Send us your inquiries!</span></div>
//             </div>
//         </div>
//       </main>

//       <style jsx>{`
//         .home-container { font-family: 'Segoe UI', 'Inter', sans-serif; background: #fcfdfe; color: #333; }
//         .main-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 6%; background: #fff; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 1000; }
//         .logo { font-size: 21px; font-weight: 800; margin: 0; }
//         .blue { color: #1e3a8a; }
//         .h-search-bar { background: #f5f7fa; padding: 7px 18px; border-radius: 20px; display: flex; align-items: center; gap: 8px; font-size: 13px; color: #999; border: 1px solid #eee; }
//         .h-search-bar input { border: none; background: transparent; outline: none; width: 140px; }
//         .header-nav span { margin-left: 20px; font-size: 14px; font-weight: 500; cursor: pointer; color: #555; transition: 0.2s; }
//         .header-nav span:hover { color: #1e3a8a; }
//         .header-nav .active { color: #1e3a8a; font-weight: 600; border-bottom: 2px solid #1e3a8a; padding-bottom: 5px; }

//         /* Hero Styling (التعديل الأساسي هنا - تكبير الجزء) */
//         .hero { 
//             background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470') center/cover; 
//             height: 600px; /* الارتفاع القديم كان 320px، قمنا بمضاعفته تقريباً */
//             display: flex; 
//             align-items: center; 
//             justify-content: center; 
//             color: #fff; 
//             text-align: center; 
//             margin-bottom: 50px;
//         }
//         .hero-content {
//             width: 100%;
//             max-width: 900px; /* تكبير المساحة العرضية للمحتوى */
//             padding: 0 40px;
//         }
//         .hero-text-wrapper h2 { 
//             font-size: 52px; /* تكبير خط العنوان (القديم كان 28px) */
//             line-height: 1.1; 
//             font-weight: 800;
//             letter-spacing: -1px;
//             margin-bottom: 60px; /* زيادة التباعد مع شريط البحث */
//         }

//         .hero-search-wrapper {
//             display: flex;
//             justify-content: center;
//         }
//         .hero-search { 
//             background: #fff; 
//             padding: 20px; /* تكبير التباعد الداخلي لشريط البحث (القديم كان 12px) */
//             border-radius: 15px; /* جعل الحواف أكثر انحناءً */
//             display: flex; 
//             gap: 15px; 
//             width: 100%;
//             max-width: 700px; /* تكبير العرض الأقصى لشريط البحث (القديم كان 500px) */
//             box-shadow: 0 20px 50px rgba(0,0,0,0.3); /* جعل الظل أكثر بروزاً */
//         }
//         .h-input { 
//             flex: 1; 
//             display: flex; 
//             align-items: center; 
//             gap: 15px; 
//             padding: 0 15px; 
//             border-right: 1px solid #eee; 
//         }
//         .h-input input { 
//             border: none; 
//             outline: none; 
//             width: 100%; 
//             font-size: 18px; /* تكبير خط الإدخال (القديم كان 14px) */
//             color: #333;
//             padding: 10px 0; /* إضافة تباعد رأسي للإدخال */
//         }
//         .hero-search button { 
//             background: #1e3a8a; 
//             color: #fff; 
//             border: none; 
//             padding: 15px 40px; /* تكبير حجم الزر (القديم كان 10px 25px) */
//             border-radius: 8px; 
//             cursor: pointer; 
//             font-weight: 700; 
//             font-size: 18px; /* تكبير خط الزر */
//             transition: background 0.2s;
//         }
//         .hero-search button:hover { background: #152b6d; }

//         /* باقي تنسيقات المحتوى */
//         .content { padding: 0 6%; }
//         .section-container { margin-bottom: 60px; }
//         .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; }
//         .section-header h3 { margin: 0; font-size: 22px; color: #1e3a8a; font-weight: 700; }
//         .sub { font-size: 13px; color: #888; margin: 6px 0 0 0; }
        
//         .nav-controls { display: flex; gap: 12px; }
//         .arrow { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #ddd; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; color: #666; font-size: 14px; }
//         .arrow:hover:not(:disabled) { background: #1e3a8a; color: #fff; border-color: #1e3a8a; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
//         .arrow:disabled { opacity: 0.3; cursor: not-allowed; }

//         .grid-layout { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
//         .card { background: #fff; border-radius: 12px; border: 1px solid #eee; overflow: hidden; transition: 0.3s; cursor: pointer; }
//         .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
//         .card-img-wrapper { height: 150px; position: relative; background: #f0f0f0; }
//         .card-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
//         .badge { position: absolute; top: 10px; left: 10px; background: #1e3a8a; color: #fff; font-size: 9px; padding: 3px 8px; border-radius: 4px; font-weight: bold; }
//         .rating-badge { position: absolute; top: 10px; right: 10px; background: #fff; font-size: 10px; padding: 3px 6px; border-radius: 10px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        
//         .card-info { padding: 14px; }
//         .card-info h4 { font-size: 14px; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #1e3a8a; font-weight: 600; }
//         .loc { font-size: 11px; color: #777; margin: 7px 0; }
//         .tags { display: flex; gap: 6px; margin-bottom: 12px; }
//         .tag { font-size: 10px; background: #f3f6fa; padding: 3px 7px; border-radius: 4px; color: #666; display: flex; align-items: center; gap: 3px; font-weight: 500; }
        
//         .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 12px; margin-top: 5px; }
//         .val { font-size: 16px; font-weight: 800; color: #1e3a8a; }
//         .dur { font-size: 10px; color: #999; margin-left: 2px; }
//         .heart-icon:hover { color: #ef4444 !important; }

//         .support-section { text-align: center; margin-top: 50px; padding-bottom: 40px; }
//         .green { color: #10b981; text-decoration: underline; cursor: pointer; font-weight: bold; }
//         .support-card { display: flex; align-items: center; gap: 15px; background: #f3f6fa; padding: 18px 28px; border-radius: 12px; width: fit-content; margin: 25px auto; text-align: left; border: 1px solid #e0e6ed; }
//         .support-card strong { display: block; font-size: 15px; }
//         .support-card span { font-size: 13px; color: #777; }

//         .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #1e3a8a; border-radius: 50%; animation: spin 1s linear infinite; }
//         @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//         .loader-container { height: 100vh; display: flex; align-items: center; justify-content: center; }
//       `}</style>
//     </div>
//   );
// };

// export default Home;











import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaHome, FaHeart, FaPlus, FaSearch, FaChevronRight, FaChevronLeft,
  FaWifi, FaChair, FaStar, FaEnvelope, FaRegHeart, FaMapMarkerAlt
} from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // التحكم في الـ Pagination لكل قسم
  const [aptIndex, setAptIndex] = useState(0);
  const [roomIndex, setRoomIndex] = useState(0);
  const [myPropIndex, setMyPropIndex] = useState(0);
  const itemsPerPage = 5;

  // الرابط الأساسي للسيرفر
  const BASE_URL = "https://graduationproject1.runasp.net/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('userToken');
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

    try {
      // 1. جلب الشقق
      const aptRes = await axios.get(`${BASE_URL}api/Property?page=1&pageSize=15`, { headers });
      if (aptRes.data?.isSuccess) {
        setApartments(aptRes.data.data.properties || aptRes.data.data.items || []);
      }

      // 2. جلب الغرف
      const roomsRes = await axios.get(`${BASE_URL}api/Property/GetAllWithRooms?page=1&pageSize=15`, { headers });
      if (roomsRes.data?.isSuccess) {
        const allRooms = [];
        const propertiesList = roomsRes.data.data.items || roomsRes.data.data.properties || [];
        propertiesList.forEach(property => {
          if (property.rooms) {
            property.rooms.forEach(room => {
              allRooms.push({ 
                ...room, 
                city: property.city, 
                government: property.government, 
                propertyId: property.id,
                finalImage: room.coverImageUrl || property.coverImageUrl 
              });
            });
          }
        });
        setRooms(allRooms);
      }

      // 3. جلب ممتلكاتي
      if (token) {
        const myPropRes = await axios.get(`${BASE_URL}api/Property/MyProperty?filter=all&page=1&pageSize=15`, { headers });
        if (myPropRes.data?.isSuccess) {
          setMyProperties(myPropRes.data.data.properties || []);
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = (current, setter, total) => {
    if (current + itemsPerPage < total) setter(current + itemsPerPage);
  };
  const handlePrev = (current, setter) => {
    if (current - itemsPerPage >= 0) setter(current - itemsPerPage);
  };

  // مكوّن البطاقة (Card) المعدل للانتقال عند الضغط
  const PropertyCard = ({ item, isRoom = false, isMine = false }) => {
    const title = isRoom ? (item.roomName || "Modern Room") : (item.name || "Luxury Apartment");
    const price = isRoom ? item.month_rent : (item.monthlyRent || "---");
    
    // معالجة رابط الصورة
    let imageUrl = isRoom ? item.finalImage : item.coverImageUrl;
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = BASE_URL + imageUrl;
    }

    // وظيفة الانتقال لصفحة التفاصيل
    const handleCardClick = () => {
      if (isMine) {
        // إذا كان عقاري الشخصي
        navigate(`/my-property/${item.id}`);
      } else if (isRoom) {
        // إذا كانت غرفة (ننتقل لصفحة تفاصيل الغرفة مع تمرير معرف الغرفة)
            navigate(`/room-details/${item.propertyId}/${item.id}`);
      } else {
        // إذا كانت شقة عادية
        navigate(`/property-details/${item.id}`);
      }
    };

    return (
      <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <div className="card-img-wrapper">
          <img 
            src={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
            alt="property" 
            onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error'; }}
          />
          <div className="badge">{isMine ? (item.status?.replace('_', ' ') || 'Pending') : '98% match'}</div>
          <div className="rating-badge"><FaStar size={11} color="#FFD700" /> 4.5</div>
        </div>
        <div className="card-info">
          <h4>{title}</h4>
          <p className="loc"><FaMapMarkerAlt size={12}/> {item.city || "Maadi"}, {item.government || "Cairo"}</p>
          <div className="tags">
            <span className="tag"><FaWifi size={10} /> Wifi</span>
            <span className="tag"><FaChair size={10} /> {item.type || 'Furnished'}</span>
          </div>
          <div className="card-footer">
            <div className="price-tag">
                <span className="val">{price} EGP</span>
                <span className="dur">/ month</span>
            </div>
            {!isMine && <button className="wish-btn" onClick={(e) => e.stopPropagation()}><FaRegHeart size={14} color="#ccc" /></button>}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

  return (
    <div className="home-container">
      {/* Header */}
      <header className="main-header">
        <nav className="header-nav">
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text-wrapper">
              <h2>Find your perfect home<br/>and compatible roommate.</h2>
          </div>
          <div className="hero-search-wrapper">
              <div className="hero-search">
                 <div className="h-input"><FaSearch size={18} color="#bbb" /> <input placeholder="Search by Area / Person" /></div>
                 <button>Search</button>
              </div>
          </div>
        </div>
      </section>

      <main className="content">
        {/* Discover Apartment Section */}
        <section className="section-container">
          <div className="section-header">
            <div>
               <h3>Discover Apartment</h3>
               <p className="sub">Handpicked Apartments with high compatibility score</p>
            </div>
            <div className="header-actions">
              <button className="view-all-link view-all" onClick={() => navigate('/BrowseProperties')}>
                View All Apartment &gt;
              </button>
              <div className="nav-controls">
                <button className="arrow" onClick={() => handlePrev(aptIndex, setAptIndex)} disabled={aptIndex === 0}><FaChevronLeft/></button>
                <button className="arrow" onClick={() => handleNext(aptIndex, setAptIndex, apartments.length)} disabled={aptIndex + itemsPerPage >= apartments.length}><FaChevronRight/></button>
              </div>
            </div>
          </div>
          <div className="grid-layout">
            {apartments.slice(aptIndex, aptIndex + itemsPerPage).map(item => <PropertyCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* Discover Rooms Section */}
        <section className="section-container">
          <div className="section-header">
            <div>
               <h3>Discover Rooms</h3>
               <p className="sub">Handpicked Rooms with high compatibility score</p>
            </div>
            <div className="header-actions">
              <button className="view-all-link view-all" onClick={() => navigate('/ViewBrowseRooms')}>
                View All Rooms &gt;
              </button> 
              <div className="nav-controls">
                <button className="arrow" onClick={() => handlePrev(roomIndex, setRoomIndex)} disabled={roomIndex === 0}><FaChevronLeft/></button>
                <button className="arrow" onClick={() => handleNext(roomIndex, setRoomIndex, rooms.length)} disabled={roomIndex + itemsPerPage >= rooms.length}><FaChevronRight/></button>
              </div>
            </div>
          </div>
          <div className="grid-layout">
            {rooms.slice(roomIndex, roomIndex + itemsPerPage).map((item, idx) => <PropertyCard key={idx} item={item} isRoom />)}
          </div>
        </section>

        {/* My Properties Section */}
        {myProperties.length > 0 && (
          <section className="section-container">
            <div className="section-header">
              <div>
                  <h3>My Properties</h3>
                  <p className="sub">Share your apartment details and reach compatible roommate matches today!</p>
              </div>
              <div className="header-actions">
                <button className="view-all">View All My Properties <FaChevronRight size={10}/></button>
                <div className="nav-controls">
                  <button className="arrow" onClick={() => handlePrev(myPropIndex, setMyPropIndex)} disabled={myPropIndex === 0}><FaChevronLeft/></button>
                  <button className="arrow" onClick={() => handleNext(myPropIndex, setMyPropIndex, myProperties.length)} disabled={myPropIndex + itemsPerPage >= myProperties.length}><FaChevronRight/></button>
                </div>
              </div>
            </div>
            <div className="grid-layout">
              {myProperties.slice(myPropIndex, myPropIndex + itemsPerPage).map(item => <PropertyCard key={item.id} item={item} isMine />)}
            </div>
          </section>
        )}

        {/* Support */}
        <div className="support-section">
            <p>Need Help? <span className="green">Contact US</span></p>
            <div className="support-card">
               <FaEnvelope size={20} color="#1e3a8a"/>
               <div><strong>Technical Support</strong><span>Send us your inquiries!</span></div>
            </div>
        </div>
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Segoe+UI:wght@300;400;600;700;800&display=swap');
        
        .home-container { font-family: 'Segoe UI', sans-serif; background: #fcfdfe; color: #333; box-sizing: border-box; }
        .main-header { display: flex; justify-content: space-between; align-items: center; padding: 18px 6%; background: #fff; border-bottom: 1px solid #eee; position: sticky; top: 0; z-index: 1000; }
        
        .hero { 
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470') center/cover; 
            height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: #fff; 
            text-align: center; 
            margin-bottom: 50px;
        }
        .hero-content { width: 100%; max-width: 900px; padding: 0 40px; }
        .hero-text-wrapper h2 { font-size: 52px; line-height: 1.1; font-weight: 800; letter-spacing: -1px; margin-bottom: 60px; }
        .hero-search-wrapper { display: flex; justify-content: center; }
        .hero-search { background: #fff; padding: 20px; border-radius: 15px; display: flex; gap: 15px; width: 100%; max-width: 700px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
        .h-input { flex: 1; display: flex; align-items: center; gap: 15px; padding: 0 15px; border-right: 1px solid #eee; }
        .h-input input { border: none; outline: none; width: 100%; font-size: 18px; color: #333; padding: 10px 0; }
        .hero-search button { background: #1e3a8a; color: #fff; border: none; padding: 15px 40px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 18px; transition: background 0.2s; }

        .content { padding: 0 6%; }
        .section-container { margin-bottom: 60px; }
        .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px; }
        .section-header h3 { margin: 0; font-size: 22px; color: #1e3a8a; font-weight: 700; }
        .sub { font-size: 13px; color: #888; margin: 6px 0 0 0; }
        
        .header-actions { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
        .view-all { background: none; border: none; padding: 0; color: #1e3a8a; font-weight: 600; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .nav-controls { display: flex; gap: 12px; }
        .arrow { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #ddd; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; color: #666; font-size: 14px; }
        .arrow:hover:not(:disabled) { background: #1e3a8a; color: #fff; border-color: #1e3a8a; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .arrow:disabled { opacity: 0.3; cursor: not-allowed; }

        .grid-layout { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }

        .card { background: #fff; border-radius: 12px; border: 1px solid #eee; overflow: hidden; transition: 0.3s; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .card-img-wrapper { height: 150px; position: relative; background: #f0f0f0; }
        .card-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
        .badge { position: absolute; top: 10px; left: 10px; background: #1e3a8a; color: #fff; font-size: 9px; padding: 3px 8px; border-radius: 4px; font-weight: bold; text-transform: capitalize; }
        .rating-badge { position: absolute; top: 10px; right: 10px; background: rgba(251, 191, 36, 0.15); color: #b45309; padding: 4px 9px; border-radius: 8px; display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; border: 1px solid rgba(251, 191, 36, 0.3); }
        
        .card-info { padding: 14px; }
        .card-info h4 { margin: 0; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #222; font-weight: 600; }
        .loc { font-size: 11px; color: #777; margin: 7px 0; display: flex; align-items: center; gap: 5px; }
        .tags { display: flex; gap: 6px; margin-bottom: 12px; }
        .tag { font-size: 10px; background: #f3f6fa; padding: 3px 7px; border-radius: 4px; color: #666; display: flex; align-items: center; gap: 3px; font-weight: 500; }
        .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f0f0f0; padding-top: 12px; margin-top: 5px; }
        .val { font-size: 16px; font-weight: 800; color: #1e3a8a; }
        .dur { font-size: 10px; color: #999; }
        .wish-btn { background: none; border: none; padding: 0; cursor: pointer; }

        .support-section { text-align: center; margin-top: 50px; padding-bottom: 40px; }
        .green { color: #10b981; text-decoration: underline; cursor: pointer; font-weight: bold; }
        .support-card { display: flex; align-items: center; gap: 15px; background: #f3f6fa; padding: 18px 28px; border-radius: 12px; width: fit-content; margin: 25px auto; text-align: left; border: 1px solid #e0e6ed; }

        .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #1e3a8a; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .loader-container { height: 100vh; display: flex; align-items: center; justify-content: center; }
      `}</style>
    </div>
  );
};

export default Home;














// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaHome, FaHeart, FaPlus, FaSearch, FaChevronRight, FaChevronLeft,
//   FaWifi, FaChair, FaStar, FaEnvelope, FaRegHeart, FaMapMarkerAlt
// } from 'react-icons/fa';

// const Home = () => {
//   const navigate = useNavigate();
//   const [apartments, setApartments] = useState([]);
//   const [rooms, setRooms] = useState([]);
//   const [myProperties, setMyProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // التحكم في الـ Pagination لكل قسم
//   const [aptIndex, setAptIndex] = useState(0);
//   const [roomIndex, setRoomIndex] = useState(0);
//   const [myPropIndex, setMyPropIndex] = useState(0);
//   const itemsPerPage = 5;

//   // الرابط الأساسي للسيرفر
//   const BASE_URL = "https://graduationproject1.runasp.net/";

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     const token = localStorage.getItem('userToken');
//     const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

//     try {
//       // 1. جلب الشقق
//       const aptRes = await axios.get(`${BASE_URL}api/Property?page=1&pageSize=15`, { headers });
//       if (aptRes.data?.isSuccess) {
//         setApartments(aptRes.data.data.properties || aptRes.data.data.items || []);
//       }

//       // 2. جلب الغرف (تم التأكد من حفظ الـ propertyId لكل غرفة)
//       const roomsRes = await axios.get(`${BASE_URL}api/Property/GetAllWithRooms?page=1&pageSize=15`, { headers });
//       if (roomsRes.data?.isSuccess) {
//         const allRooms = [];
//         const propertiesList = roomsRes.data.data.items || roomsRes.data.data.properties || [];
//         propertiesList.forEach(property => {
//           if (property.rooms) {
//             property.rooms.forEach(room => {
//               allRooms.push({ 
//                 ...room, 
//                 city: property.city, 
//                 government: property.government, 
//                 propertyId: property.id, // مهم جداً للـ URL
//                 finalImage: room.coverImageUrl || property.coverImageUrl 
//               });
//             });
//           }
//         });
//         setRooms(allRooms);
//       }

//       // 3. جلب ممتلكاتي
//       if (token) {
//         const myPropRes = await axios.get(`${BASE_URL}api/Property/MyProperty?filter=all&page=1&pageSize=15`, { headers });
//         if (myPropRes.data?.isSuccess) {
//           setMyProperties(myPropRes.data.data.properties || []);
//         }
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleNext = (current, setter, total) => {
//     if (current + itemsPerPage < total) setter(current + itemsPerPage);
//   };
//   const handlePrev = (current, setter) => {
//     if (current - itemsPerPage >= 0) setter(current - itemsPerPage);
//   };

//   // مكوّن البطاقة (Card) المعدل للانتقال الصحيح
//   const PropertyCard = ({ item, isRoom = false, isMine = false }) => {
//     const title = isRoom ? (item.roomName || "Modern Room") : (item.name || "Luxury Apartment");
//     const price = isRoom ? item.month_rent : (item.monthlyRent || "---");
    
//     // معالجة رابط الصورة
//     let imageUrl = isRoom ? item.finalImage : item.coverImageUrl;
//     if (imageUrl && !imageUrl.startsWith('http')) {
//       imageUrl = BASE_URL + imageUrl;
//     }

//     // وظيفة الانتقال لصفحة التفاصيل - تم التعديل لبعث الـ propertyId والـ id
//     const handleCardClick = () => {
//       if (isMine) {
//         navigate(`/my-property/${item.id}`);
//       } else if (isRoom) {
//         // التعديل الأساسي هنا: نرسل الـ propertyId والـ id بتاع الغرفة
//         // تأكد أن Route صفحة الغرفة هو: /room-details/:propertyId/:id
//         navigate(`/room-details/${item.propertyId}/${item.id}`);
//       } else {
//         navigate(`/property-details/${item.id}`);
//       }
//     };

//     return (
//       <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
//         <div className="card-img-wrapper">
//           <img 
//             src={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
//             alt="property" 
//             onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error'; }}
//           />
//           <div className="badge">{isMine ? (item.status?.replace('_', ' ') || 'Pending') : '98% match'}</div>
//           <div className="rating-badge"><FaStar size={11} color="#FFD700" /> 4.5</div>
//         </div>
//         <div className="card-info">
//           <h4>{title}</h4>
//           <p className="loc"><FaMapMarkerAlt size={12}/> {item.city || "Maadi"}, {item.government || "Cairo"}</p>
//           <div className="tags">
//             <span className="tag"><FaWifi size={10} /> Wifi</span>
//             <span className="tag"><FaChair size={10} /> {item.type || 'Furnished'}</span>
//           </div>
//           <div className="card-footer">
//             <div className="price-tag">
//                 <span className="val">{price} EGP</span>
//                 <span className="dur">/ month</span>
//             </div>
//             {!isMine && <button className="wish-btn" onClick={(e) => e.stopPropagation()}><FaRegHeart size={14} color="#ccc" /></button>}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-content">
//           <div className="hero-text-wrapper">
//               <h2>Find your perfect home<br/>and compatible roommate.</h2>
//           </div>
//           <div className="hero-search-wrapper">
//               <div className="hero-search">
//                  <div className="h-input"><FaSearch size={18} color="#bbb" /> <input placeholder="Search by Area / Person" /></div>
//                  <button>Search</button>
//               </div>
//           </div>
//         </div>
//       </section>

//       <main className="content">
//         {/* Discover Apartment Section */}
//         <section className="section-container">
//           <div className="section-header">
//             <div>
//                <h3>Discover Apartment</h3>
//                <p className="sub">Handpicked Apartments with high compatibility score</p>
//             </div>
//             <div className="header-actions">
//               <button className="view-all-link view-all" onClick={() => navigate('/BrowseProperties')}>
//                 View All Apartment &gt;
//               </button>
//               <div className="nav-controls">
//                 <button className="arrow" onClick={() => handlePrev(aptIndex, setAptIndex)} disabled={aptIndex === 0}><FaChevronLeft/></button>
//                 <button className="arrow" onClick={() => handleNext(aptIndex, setAptIndex, apartments.length)} disabled={aptIndex + itemsPerPage >= apartments.length}><FaChevronRight/></button>
//               </div>
//             </div>
//           </div>
//           <div className="grid-layout">
//             {apartments.slice(aptIndex, aptIndex + itemsPerPage).map(item => <PropertyCard key={item.id} item={item} />)}
//           </div>
//         </section>

//         {/* Discover Rooms Section */}
//         <section className="section-container">
//           <div className="section-header">
//             <div>
//                <h3>Discover Rooms</h3>
//                <p className="sub">Handpicked Rooms with high compatibility score</p>
//             </div>
//             <div className="header-actions">
//               <button className="view-all-link view-all" onClick={() => navigate('/ViewBrowseRooms')}>
//                 View All Rooms &gt;
//               </button> 
//               <div className="nav-controls">
//                 <button className="arrow" onClick={() => handlePrev(roomIndex, setRoomIndex)} disabled={roomIndex === 0}><FaChevronLeft/></button>
//                 <button className="arrow" onClick={() => handleNext(roomIndex, setRoomIndex, rooms.length)} disabled={roomIndex + itemsPerPage >= rooms.length}><FaChevronRight/></button>
//               </div>
//             </div>
//           </div>
//           <div className="grid-layout">
//             {rooms.slice(roomIndex, roomIndex + itemsPerPage).map((item, idx) => <PropertyCard key={idx} item={item} isRoom />)}
//           </div>
//         </section>

//         {/* My Properties Section */}
//         {myProperties.length > 0 && (
//           <section className="section-container">
//             <div className="section-header">
//               <div>
//                   <h3>My Properties</h3>
//                   <p className="sub">Share your apartment details and reach compatible roommate matches today!</p>
//               </div>
//               <div className="header-actions">
//                 <button className="view-all">View All My Properties <FaChevronRight size={10}/></button>
//                 <div className="nav-controls">
//                   <button className="arrow" onClick={() => handlePrev(myPropIndex, setMyPropIndex)} disabled={myPropIndex === 0}><FaChevronLeft/></button>
//                   <button className="arrow" onClick={() => handleNext(myPropIndex, setMyPropIndex, myProperties.length)} disabled={myPropIndex + itemsPerPage >= myProperties.length}><FaChevronRight/></button>
//                 </div>
//               </div>
//             </div>
//             <div className="grid-layout">
//               {myProperties.slice(myPropIndex, myPropIndex + itemsPerPage).map(item => <PropertyCard key={item.id} item={item} isMine />)}
//             </div>
//           </section>
//         )}

//         {/* Support */}
//         <div className="support-section">
//             <p>Need Help? <span className="green">Contact US</span></p>
//             <div className="support-card">
//                <FaEnvelope size={20} color="#1e3a8a"/>
//                <div><strong>Technical Support</strong><span>Send us your inquiries!</span></div>
//             </div>
//         </div>
//       </main>

//       <style jsx>{`
      
//         @import url('https://fonts.googleapis.com/css2?family=Segoe+UI:wght@300;400;600;700;800&display=swap');
//         .home-container { font-family: 'Segoe UI', sans-serif; background: #fcfdfe; color: #333; box-sizing: border-box; }
//         .hero { background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1470') center/cover; height: 100vh; display: flex; align-items: center; justify-content: center; color: #fff; text-align: center; margin-bottom: 50px; }
//         .hero-text-wrapper h2 { font-size: 52px; font-weight: 800; margin-bottom: 60px; }
//         .hero-search { background: #fff; padding: 20px; border-radius: 15px; display: flex; gap: 15px; width: 100%; max-width: 700px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
//         .h-input { flex: 1; display: flex; align-items: center; gap: 15px; border-right: 1px solid #eee; }
//         .h-input input { border: none; outline: none; width: 100%; font-size: 18px; color: #333; }
//         .hero-search button { background: #1e3a8a; color: #fff; border: none; padding: 15px 40px; border-radius: 8px; cursor: pointer; font-weight: 700; }
//         .content { padding: 0 6%; }
//         .section-header h3 { font-size: 22px; color: #1e3a8a; font-weight: 700; }
//         .grid-layout { display: grid; grid-template-columns: repeat(5, 1fr); gap: 18px; }
//         .card { background: #fff; border-radius: 12px; border: 1px solid #eee; overflow: hidden; transition: 0.3s; }
//         .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
//         .card-img-wrapper { height: 150px; position: relative; }
//         .card-img-wrapper img { width: 100%; height: 100%; object-fit: cover; }
//         .badge { position: absolute; top: 10px; left: 10px; background: #1e3a8a; color: #fff; font-size: 9px; padding: 3px 8px; border-radius: 4px; }
//         .card-info { padding: 14px; }
//         .val { font-size: 16px; font-weight: 800; color: #1e3a8a; }
//         .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #1e3a8a; border-radius: 50%; animation: spin 1s linear infinite; }
//         @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//         .loader-container { height: 100vh; display: flex; align-items: center; justify-content: center; }
//         .arrow:disabled { opacity: 0.3; cursor: not-allowed; }
//       `}</style>
//     </div>
//   );
// };

// export default Home;