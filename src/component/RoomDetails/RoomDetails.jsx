import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaWifi, FaWind, FaMapMarkerAlt, FaShareAlt, FaRegHeart, FaHeart,
  FaCheck, FaTimes, FaUsers, FaCalendarAlt, FaSmokingBan, FaUserGraduate, FaBed, FaTv
} from 'react-icons/fa';
import { MdOutlineLocalLaundryService, MdElevator, MdOutlineMeetingRoom, MdKitchen, MdBathtub, MdOutlineCoffeeMaker } from 'react-icons/md';

const RoomDetails = () => {
  const { propertyId, id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const BASE_URL = "https://graduationproject1.runasp.net/";

  const hostUserId = room?.hostId || room?.userId || room?.hostUserId || room?.ownerId || room?.host?.id || room?.user?.id || room?.propertyOwnerId || room?.createdBy;

  const handleViewHostProfile = () => {
    if (!hostUserId) return;
    navigate(`/view-profile/${hostUserId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('userToken')?.replace(/"/g, '');
        const response = await axios.get(`${BASE_URL}api/Property/${propertyId}/rooms/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data.isSuccess) {
          setRoom(response.data.data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, propertyId]);

  // دالة الحجز عند الضغط على الزر
  const handleBookingRedirect = () => {
    if (!room) return;

    // تجهيز البيانات لتتوافق مع ما تتوقعه صفحة BookingRoom
    const bookingData = {
      ...room,
      name: room.roomName,      // توحيد المسمى لصفحة الحجز
      monthlyRent: room.month_rent,
      minimumStay: room.minimumStay || 1
    };

    navigate(`/booking-room/${propertyId}/${id}`, { 
      state: { property: bookingData } 
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      
      const response = await axios.post(`${BASE_URL}api/Saved/save-room`, {
        propertyId: Number(propertyId),
        roomId: Number(id)
      }, config);
      
      setIsSaved(!isSaved);
      
      // Track saved rooms in localstorage for real-time updates
      const key = `saved-room-${propertyId}-${id}`;
      if (!isSaved) {
        localStorage.setItem(key, 'true');
      } else {
        localStorage.removeItem(key);
      }
    } catch (err) {
      console.error("Save Error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const getImg = (path) => {
    if (!path) return 'https://via.placeholder.com/800x500?text=No+Image';
    return path.startsWith('http') ? path : `${BASE_URL}${path}`;
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (!room) return <div className="error">Room not found</div>;

  return (
    <div className="stay-match-details">
      {/* 1. Top Bar */}
      <div className="top-bar">
        <div className="badges">
          <span className="badge gender">
            {room.allowedTenants?.studentGender === 'male' ? 'Males Only' : 'Females Only'}
          </span>
          <span className="badge verified">Verified</span>
          <button className="badge host clickable" type="button" onClick={handleViewHostProfile}>
            👤 {room.hostName}
          </button>
        </div>
        <div className="actions">
          <button className="act-btn"><FaShareAlt /> Share</button>
          <button className="act-btn" onClick={handleSave} disabled={isSaving}>
            {isSaved ? <FaHeart color="#ef4444" /> : <FaRegHeart />} {isSaved ? 'Saved' : 'Save'}
          </button>
          <button className="act-btn dark" onClick={() => navigate(`/room-reviews/${id}`)}>View Reviews</button>
        </div>
      </div>

      <h1 className="main-title">{room.roomName}</h1>
      <p className="location-sub"><FaMapMarkerAlt /> {room.street}, {room.city}, {room.government}</p>

      {/* 2. Photo Gallery */}
      <div className="gallery-layout">
        <div className="main-photo">
          <img src={getImg(room.propertyImages?.[0]?.imageUrl)} alt="Cover" />
        </div>
        <div className="side-photos">
          <div className="side-img-container">
            <img src={getImg(room.propertyImages?.[1]?.imageUrl || room.propertyImages?.[0]?.imageUrl)} alt="Side 1" />
          </div>
          <div className="side-img-container more-photos">
            <img src={getImg(room.propertyImages?.[2]?.imageUrl || room.propertyImages?.[0]?.imageUrl)} alt="Side 2" />
            <div className="overlay">Show all {room.propertyImages?.length || 0} Photos</div>
          </div>
        </div>
      </div>

      {/* 3. Quick Info Bar */}
      <div className="quick-info-bar">
        <div className="info-item">
            <MdOutlineMeetingRoom className="info-icon" />
            <div className="info-text"><span>Status</span><strong>{room.furnished ? 'Furnished' : 'Unfurnished'}</strong></div>
        </div>
        <div className="info-item">
            <MdBathtub className="info-icon" />
            <div className="info-text"><span>Bathroom</span><strong>{room.sharedBathroom ? 'Shared' : 'Private'}</strong></div>
        </div>
        <div className="info-item">
            <MdKitchen className="info-icon" />
            <div className="info-text"><span>Kitchen</span><strong>Shared</strong></div>
        </div>
        <div className="info-item">
            <FaBed className="info-icon" />
            <div className="info-text"><span>Beds</span><strong>{room.beds?.length || 0} Bed</strong></div>
        </div>
        <div className="info-item">
            <div className="info-text"><span>Room size</span><strong>{room.size} sqm</strong></div>
        </div>
      </div>

      <div className="grid-container">
        <div className="left-content">
          {/* 4. Current Residents */}
          <section className="section">
            <h2 className="section-title">Current Residents Summary</h2>
            <div className="residents-grid">
              <div className="res-card">
                <FaUsers className="res-icon pink" />
                <p>Gender Mix</p>
                <strong className="pink-text">{room.allowedTenants?.studentGender === 'male' ? 'All Male' : 'All Female'}</strong>
              </div>
              <div className="res-card">
                <FaCalendarAlt className="res-icon blue" />
                <p>Age Range</p>
                <strong>18-24</strong>
              </div>
              <div className="res-card">
                <FaSmokingBan className="res-icon green" />
                <p>Preferences</p>
                <strong>Non Smokers</strong>
              </div>
              <div className="res-card">
                <FaUserGraduate className="res-icon purple" />
                <p>Lifestyle</p>
                <strong>{room.allowedTenants?.allowsStudents ? 'Students' : 'Workers'}</strong>
              </div>
            </div>
          </section>

          {/* 5. About Place */}
          <section className="section">
            <h2 className="section-title">About This Place</h2>
            <p className="desc-text">
                {room.roomName} located in {room.street}. This room is {room.furnished ? 'fully furnished' : 'not furnished'} 
                and features {room.window ? 'a window with good ventilation' : 'limited ventilation'}.
            </p>
          </section>

          {/* 6. Amenities */}
          <section className="section">
            <h2 className="section-title">What this place offers</h2>
            <div className="amenities-list">
              {room.amenities?.wifi && <div className="amen-item"><FaWifi /> High speed wifi</div>}
              {room.amenities?.tv && <div className="amen-item"><FaTv /> TV</div>}
              {room.amenities?.cooktop && <div className="amen-item"><MdKitchen /> Cooktop</div>}
              {room.amenities?.kettle && <div className="amen-item"><MdOutlineCoffeeMaker /> Kettle</div>}
              {room.amenities?.washingMachine && <div className="amen-item"><MdOutlineLocalLaundryService /> Washing machine</div>}
            </div>
          </section>
        </div>

        {/* 7. Booking Sidebar */}
        <aside className="booking-sidebar">
          <div className="sidebar-card">
            <h2 className="price">{room.month_rent} EGP <span className="per-month">/ month</span></h2>
            <div className="price-details">
                <div className="p-row"><span>Security Deposit</span> <strong>{room.deposit} EGP</strong></div>
                <div className="p-row"><span>Availability</span> <strong className="green-text">Immediately</strong></div>
                <div className="p-row"><span>Minimum Stay</span> <strong>{room.minimumStay || 1} Months</strong></div>
            </div>
            
            <button className="btn-book" onClick={handleBookingRedirect}>Book Now</button>
            <button className="btn-message">Message Owner</button>
          </div>
        </aside>
      </div>

      <style>{`
        .stay-match-details { max-width: 1200px; margin: 0 auto; padding: 30px; font-family: 'Inter', sans-serif; }
        .top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .badge { padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-right: 10px; }
        .gender { background: #fef2f2; color: #991b1b; }
        .verified { background: #f0fdf4; color: #166534; }
        .host { background: #eff6ff; color: #1e40af; }
        .act-btn { background: #fff; border: 1px solid #e5e7eb; padding: 8px 16px; border-radius: 8px; margin-left: 10px; cursor: pointer; font-weight: 500; }
        .act-btn.dark { background: #1f2937; color: #fff; }
        .clickable { cursor: pointer; border: none; background: transparent; font: inherit; padding: 0; }
        .main-title { font-size: 32px; font-weight: 800; color: #111827; margin: 10px 0; }
        .location-sub { color: #6b7280; display: flex; align-items: center; gap: 8px; font-size: 16px; }
        .gallery-layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 12px; height: 450px; border-radius: 16px; overflow: hidden; margin: 25px 0; }
        .gallery-layout img { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }
        .side-photos { display: grid; grid-template-rows: 1fr 1fr; gap: 12px; }
        .more-photos { position: relative; cursor: pointer; }
        .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 600; }
        .quick-info-bar { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; background: #fff; border: 1px solid #f3f4f6; padding: 25px; border-radius: 16px; margin-bottom: 40px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .info-item { display: flex; align-items: center; gap: 12px; border-right: 1px solid #f3f4f6; }
        .info-item:last-child { border: none; }
        .info-icon { font-size: 20px; color: #4f46e5; }
        .info-text span { display: block; font-size: 12px; color: #9ca3af; }
        .info-text strong { font-size: 14px; color: #1f2937; }
        .grid-container { display: grid; grid-template-columns: 1fr 350px; gap: 50px; }
        .section { margin-bottom: 40px; }
        .section-title { font-size: 22px; font-weight: 700; margin-bottom: 20px; }
        .residents-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .res-card { background: #f9fafb; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #f3f4f6; }
        .res-icon { font-size: 24px; margin-bottom: 10px; }
        .pink { color: #ec4899; } .blue { color: #3b82f6; } .green { color: #10b981; } .purple { color: #8b5cf6; }
        .amenities-list { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .amen-item { display: flex; align-items: center; gap: 12px; color: #4b5563; font-weight: 500; }
        .sidebar-card { border: 1px solid #e5e7eb; padding: 30px; border-radius: 24px; position: sticky; top: 20px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .price { font-size: 28px; font-weight: 800; color: #1e3a8a; }
        .per-month { font-size: 14px; color: #6b7280; font-weight: 400; }
        .price-details { background: #f9fafb; padding: 15px; border-radius: 12px; margin: 20px 0; }
        .p-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
        .green-text { color: #059669; }
        .btn-book { width: 100%; background: #1e3a8a; color: #fff; border: none; padding: 16px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .btn-book:hover { background: #1e40af; }
        .btn-message { width: 100%; background: #dcfce7; color: #166534; border: none; padding: 16px; border-radius: 12px; font-weight: 700; margin-top: 12px; cursor: pointer; }
        .loader { height: 100vh; display: flex; justify-content: center; align-items: center; font-size: 20px; font-weight: bold; }
      `}</style>
    </div>
  );
};

export default RoomDetails;




































// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaWifi, FaWind, FaMapMarkerAlt, FaShareAlt, FaRegHeart, 
//   FaUsers, FaCalendarAlt, FaSmokingBan, FaUserGraduate, FaBed, FaTv, FaArrowUp
// } from 'react-icons/fa';
// import { 
//   MdOutlineLocalLaundryService, MdElevator, MdOutlineMeetingRoom, 
//   MdKitchen, MdBathtub, MdOutlineCoffeeMaker 
// } from 'react-icons/md';

// const RoomDetails = () => {
//   const { propertyId, id } = useParams(); // id هو معرف الغرفة الحالية
//   const navigate = useNavigate();
//   const [room, setRoom] = useState(null);
//   const [allRooms, setAllRooms] = useState([]); // لتخزين قائمة الغرف للـ Tabs
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = "https://graduationproject1.runasp.net/";

//   useEffect(() => {
//     const fetchFullData = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('userToken')?.replace(/"/g, '');
//         const headers = { 'Authorization': `Bearer ${token}` };

//         // 1. جلب بيانات الغرفة المحددة لعرض تفاصيلها
//         const roomRes = await axios.get(`${BASE_URL}api/Property/${propertyId}/rooms/${id}`, { headers });
        
//         // 2. جلب بيانات العقار بالكامل لجلب مصفوفة الغرف (Tabs)
//         const propertyRes = await axios.get(`${BASE_URL}api/Property/${propertyId}`, { headers });

//         if (roomRes.data.isSuccess) setRoom(roomRes.data.data);
//         if (propertyRes.data.isSuccess) setAllRooms(propertyRes.data.data.rooms || []);

//       } catch (err) {
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFullData();
//   }, [id, propertyId]);

//   const getImg = (path) => {
//     if (!path) return 'https://via.placeholder.com/800x500?text=Stay+Match+Image';
//     return path.startsWith('http') ? path : `${BASE_URL}${path}`;
//   };

//   if (loading) return <div className="loading-state">جاري تحميل البيانات...</div>;
//   if (!room) return <div className="error-state">لم يتم العثور على الغرفة (Error 404)</div>;

//   return (
//     <div className="room-details-container">
      
//       {/* 1. شريط التنقل بين الغرف (Tabs) - تصميم Figma */}
//       <div className="rooms-header-tabs">
//         {allRooms.map((r, index) => (
//           <button 
//             key={r.id} 
//             className={`tab-item ${parseInt(id) === r.id ? 'active' : ''}`}
//             onClick={() => navigate(`/room-details/${propertyId}/${r.id}`)}
//           >
//             Room {index + 1}
//           </button>
//         ))}
//       </div>

//       {/* 2. الأوسمة وأزرار التفاعل */}
//       <div className="top-action-bar">
//         <div className="status-tags">
//           <span className="tag gender-tag">{room.allowedTenants?.studentGender === 'male' ? 'Males Only' : 'Females Only'}</span>
//           <span className="tag verified-tag">Verified</span>
//           <span className="tag host-tag">👤 {room.hostName}</span>
//         </div>
//         <div className="action-buttons">
//           <button className="btn-outline"><FaShareAlt /> Share</button>
//           <button className="btn-outline"><FaRegHeart /> Save</button>
//           <button className="btn-dark">View Reviews</button>
//         </div>
//       </div>

//       <h1 className="property-title">{room.roomName}</h1>
//       <p className="location-text"><FaMapMarkerAlt /> {room.street}, {room.city}, {room.government}</p>

//       {/* 3. معرض الصور */}
//       <div className="photo-grid">
//         <div className="main-img-box">
//           <img src={getImg(room.propertyImages?.[0]?.imageUrl)} alt="Room Cover" />
//         </div>
//         <div className="sub-imgs-box">
//           <img src={getImg(room.propertyImages?.[1]?.imageUrl || room.propertyImages?.[0]?.imageUrl)} alt="Sub 1" />
//           <div className="more-images">
//             <img src={getImg(room.propertyImages?.[2]?.imageUrl || room.propertyImages?.[0]?.imageUrl)} alt="Sub 2" />
//             <div className="img-overlay">Show all Photos</div>
//           </div>
//         </div>
//       </div>

//       {/* 4. شريط المعلومات السريع */}
//       <div className="features-strip">
//         <div className="feat-item"><MdOutlineMeetingRoom className="icon" /> <div><span>Status</span><strong>{room.furnished ? 'Furnished' : 'Unfurnished'}</strong></div></div>
//         <div className="feat-item"><MdBathtub className="icon" /> <div><span>Bathroom</span><strong>{room.sharedBathroom ? 'Shared' : 'Private'}</strong></div></div>
//         <div className="feat-item"><MdKitchen className="icon" /> <div><span>Kitchen</span><strong>Shared</strong></div></div>
//         <div className="feat-item"><FaBed className="icon" /> <div><span>Number of beds</span><strong>{room.beds?.length} Beds</strong></div></div>
//         <div className="feat-item"><FaArrowUp className="icon" /> <div><span>Room size</span><strong>{room.size} sqm</strong></div></div>
//       </div>

//       <div className="main-layout-grid">
//         <div className="details-column">
//           {/* 5. ملخص السكان الحاليين */}
//           <section className="info-section">
//             <h2 className="sec-title">Current Residents Summary</h2>
//             <div className="residents-cards">
//               <div className="res-card">
//                 <FaUsers className="ic pink" /><p>Gender Mix</p>
//                 <strong className="pink-txt">{room.allowedTenants?.studentGender === 'male' ? 'All Male' : 'All Female'}</strong>
//               </div>
//               <div className="res-card">
//                 <FaCalendarAlt className="ic blue" /><p>Age Range</p><strong>18-25</strong>
//               </div>
//               <div className="res-card">
//                 <FaSmokingBan className="ic green" /><p>Preferences</p><strong>Non Smokers</strong>
//               </div>
//               <div className="res-card">
//                 <FaUserGraduate className="ic purple" /><p>Lifestyle</p><strong>Students</strong>
//               </div>
//             </div>
//           </section>

//           <section className="info-section">
//             <h2 className="sec-title">About This Place</h2>
//             <p className="about-desc">{room.description || "A room is an enclosed, functional space..."}</p>
//           </section>

//           <section className="info-section">
//             <h2 className="sec-title">What this place offers</h2>
//             <div className="amenities-grid">
//               {room.amenities?.wifi && <div className="amen-box"><FaWifi /> High speed wifi</div>}
//               {room.amenities?.airConditioning && <div className="amen-box"><FaWind /> Air conditioning</div>}
//               {room.amenities?.washingMachine && <div className="amen-box"><MdOutlineLocalLaundryService /> Washing machine</div>}
//               {room.amenities?.elevator && <div className="amen-box"><MdElevator /> Elevator Available</div>}
//             </div>
//           </section>
//         </div>

//         {/* 6. كارت الحجز الجانبي */}
//         <aside className="sticky-sidebar">
//           <div className="booking-card">
//             <h2 className="price-tag">{room.month_rent} EGP <span>/ month</span></h2>
//             <div className="details-list">
//               <div className="list-row"><span>Security Deposit</span> <strong>{room.deposit} EGP</strong></div>
//               <div className="list-row"><span>Availability</span> <strong className="status-green">Immediately</strong></div>
//               <div className="list-row"><span>Minimum Stay</span> <strong>{room.minimumStay} Months</strong></div>
//             </div>
//             <button className="primary-btn">Book</button>
//             <button className="secondary-btn">Message</button>
//           </div>
//         </aside>
//       </div>

//       <style>{`
//         .room-details-container { max-width: 1140px; margin: 40px auto; padding: 0 20px; font-family: 'Poppins', sans-serif; color: #2d3748; }
        
//         /* Tabs Styling */
//         .rooms-header-tabs { display: flex; justify-content: center; gap: 12px; margin-bottom: 30px; }
//         .tab-item { padding: 10px 40px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fff; cursor: pointer; font-weight: 600; transition: 0.3s; }
//         .tab-item.active { background: #1a365d; color: #fff; border-color: #1a365d; }

//         .top-action-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
//         .tag { padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-right: 8px; }
//         .gender-tag { background: #fff1f2; color: #be123c; }
//         .verified-tag { background: #f0fdf4; color: #15803d; }
//         .host-tag { background: #eff6ff; color: #1d4ed8; }
        
//         .btn-outline { background: #fff; border: 1px solid #e2e8f0; padding: 8px 18px; border-radius: 8px; margin-left: 10px; cursor: pointer; font-size: 14px; font-weight: 500; }
//         .btn-dark { background: #1f2937; color: white; padding: 8px 18px; border-radius: 8px; border: none; cursor: pointer; margin-left: 10px; }

//         .property-title { font-size: 30px; font-weight: 800; margin: 10px 0; color: #1a202c; }
//         .location-text { color: #718096; display: flex; align-items: center; gap: 6px; margin-bottom: 25px; }

//         .photo-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 12px; height: 420px; border-radius: 20px; overflow: hidden; margin-bottom: 35px; }
//         .photo-grid img { width: 100%; height: 100%; object-fit: cover; }
//         .sub-imgs-box { display: grid; grid-template-rows: 1fr 1fr; gap: 12px; }
//         .more-images { position: relative; }
//         .img-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; cursor: pointer; }

//         .features-strip { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; background: #f8fafc; padding: 25px; border-radius: 15px; margin-bottom: 40px; border: 1px solid #edf2f7; }
//         .feat-item { display: flex; align-items: center; gap: 12px; border-right: 1px solid #e2e8f0; padding: 0 5px; }
//         .feat-item:last-child { border: none; }
//         .feat-item .icon { font-size: 22px; color: #4a5568; }
//         .feat-item span { display: block; font-size: 11px; color: #a0aec0; text-transform: uppercase; }
//         .feat-item strong { font-size: 14px; color: #2d3748; }

//         .main-layout-grid { display: grid; grid-template-columns: 1fr 340px; gap: 50px; }
//         .sec-title { font-size: 22px; font-weight: 700; margin-bottom: 20px; }
        
//         .residents-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 40px; }
//         .res-card { background: #f7fafc; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #edf2f7; }
//         .ic { font-size: 24px; margin-bottom: 10px; }
//         .pink { color: #d53f8c; } .blue { color: #3182ce; } .green { color: #38a169; } .purple { color: #805ad5; }
//         .pink-txt { color: #d53f8c; }

//         .amenities-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
//         .amen-box { display: flex; align-items: center; gap: 12px; color: #4a5568; font-size: 15px; }

//         .booking-card { border: 1px solid #e2e8f0; padding: 30px; border-radius: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); position: sticky; top: 20px; }
//         .price-tag { font-size: 28px; font-weight: 800; color: #2c5282; margin-bottom: 20px; }
//         .price-tag span { font-size: 14px; color: #718096; font-weight: 400; }
//         .details-list { background: #f8fafc; padding: 15px; border-radius: 12px; margin-bottom: 20px; }
//         .list-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; }
//         .status-green { color: #38a169; }
        
//         .primary-btn { width: 100%; background: #1a365d; color: white; border: none; padding: 15px; border-radius: 12px; font-weight: 700; font-size: 16px; cursor: pointer; transition: 0.3s; }
//         .primary-btn:hover { background: #2c5282; }
//         .secondary-btn { width: 100%; background: #c6f6d5; color: #22543d; border: none; padding: 15px; border-radius: 12px; font-weight: 700; font-size: 16px; margin-top: 12px; cursor: pointer; }
//       `}</style>
//     </div>
//   );
// };

// export default RoomDetails;