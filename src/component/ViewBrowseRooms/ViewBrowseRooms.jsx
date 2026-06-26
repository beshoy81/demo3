// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaSearch, FaRegHeart, FaHeart, FaMapMarkerAlt, FaChevronUp, FaStar 
// } from 'react-icons/fa';

// const ViewBrowseRooms = () => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);

//   // States للفلترة والبحث
//   const [searchQuery, setSearchQuery] = useState('');

//   const BASE_URL = "https://graduationproject1.runasp.net/";

//   const fetchRooms = async (pageNum, isNewSearch = false) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('userToken'); 
//       const config = { headers: { 'Authorization': `Bearer ${token}` } };
      
//       // بناء الرابط مع دعم الصفحة والبحث
//       let url = `${BASE_URL}api/Property/GetAllWithRooms?page=${pageNum}&pageSize=10&orderByOldest=false`;

//       if (searchQuery) url += `&city=${searchQuery}`;

 
//       const res = await axios.get(url, config);
      
//       if (res.data) {
//         // فحص مكان المصفوفة في الـ API
//         const newData = res.data.properties || res.data.data?.properties || []; 
//         setProperties(prev => isNewSearch ? newData : [...prev, ...newData]);
//       }
//       console.log("Fetching URL:", res);

//     } catch (err) {
//       console.error("Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRooms(1);
//   }, []);

//   const handleSearch = () => {
//     setPage(1);
//     fetchRooms(1, true);
//   };

//   const handleLoadMore = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     fetchRooms(nextPage);
//   };

//   return (
//     <div className="browse-container">
//       {/* 1. Header Section */}
//       <div className="content-header">
//         <h1>Find your Room</h1>
//         <p>Browse Apartments with available rooms in your preferred district across Cairo</p>
//       </div>

//       {/* 2. Filter Bar */}
//       <div className="filter-bar-modern">
//         <div className="filter-item">
//           <label>Where</label>
//           <input 
//             placeholder="Search City (e.g. Maadi)" 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div className="v-line hide-mobile"></div>
//         <div className="filter-item">
//           <label>When</label>
//           <input placeholder="Search Dates" />
//         </div>
//         <div className="v-line hide-mobile"></div>
//         <div className="filter-item">
//           <label>Who</label>
//           <input placeholder="Add Guests" />
//         </div>
//         <div className="v-line hide-mobile"></div>
//         <div className="sort-section">
//           <span>Sorted by :</span>
//           <button className="sort-btn">Newest</button>
//           <button className="search-btn-green" onClick={handleSearch}><FaSearch /></button>
//         </div>
//       </div>

//       {/* 3. Rooms Grid */}
//       <div className="properties-grid">
//         {properties.length > 0 ? (
//           properties.map((item) => (
//             <div className="room-property-card" key={item.id}>
//               <div className="img-container">
//                 <img 
//                   src={item.coverImageUrl?.startsWith('http') ? item.coverImageUrl : BASE_URL + item.coverImageUrl} 
//                   alt={item.name} 
//                   onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Apartment"; }}
//                 />
//                 <div className="top-badges">
//                   <span className="match-tag">98% match</span>
//                   <span className="rating-tag"><FaStar /> 4.5</span>
//                 </div>
//                 <button className="heart-overlay"><FaRegHeart /></button>
//               </div>

//               <div className="card-details">
//                 <h3 className="property-name">{item.name}</h3>
//                 <div className="location-box">
//                   <FaMapMarkerAlt /> <span>{item.city}, {item.government}</span>
//                 </div>
                
//                 <div className="tags-row">
//                   <span className="info-tag">Wifi</span>
//                   <span className="info-tag">Furnished</span>
//                 </div>

//                 {/* قائمة الغرف من الـ API */}
//                 <div className="rooms-list">
//                   {item.rooms && item.rooms.length > 0 ? (
//                     item.rooms.map((room, idx) => (
//                       <div className={`room-item ${!room.isAvailable ? 'occupied' : ''}`} key={idx}>
//                         <span className={`room-dot ${room.isAvailable ? 'blue' : 'gray'}`}></span>
//                         <span className="room-name">{room.name}</span>
//                         <span className="room-price">
//                           {room.isAvailable ? `${room.price} EGP` : 'Occupied'}
//                         </span>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="no-rooms">Check details for rooms</div>
//                   )}
//                 </div>

//                 <button className="view-btn-blue" onClick={() => navigate(`/property/${item.id}`)}>
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           !loading && <div className="no-results">No rooms found for this search.</div>
//         )}
//       </div>

//       {/* 4. Pagination */}
//       <div className="load-more-section">
//         <button className="load-more-btn" onClick={handleLoadMore} disabled={loading}>
//           {loading ? "Loading..." : "Load More Rooms"} <FaChevronUp className="up-arrow" />
//         </button>
//       </div>

//       {/* الحل لمشكلة الخطأ: استخدام وسم style عادي بدون كلمة jsx */}
//       <style>
//         {`
//           .browse-container { padding: 40px 8%; background: #fff; max-width: 1400px; margin: 0 auto; font-family: sans-serif; }
//           .content-header h1 { color: #1e3a8a; font-size: 28px; font-weight: bold; margin-bottom: 5px; }
//           .content-header p { color: #71717a; margin-bottom: 30px; font-size: 14px; }

//           .filter-bar-modern {
//             display: flex; align-items: center; border: 1px solid #e4e4e7;
//             border-radius: 50px; padding: 10px 30px; margin-bottom: 50px;
//             box-shadow: 0 4px 15px rgba(0,0,0,0.05); background: white;
//           }
//           .filter-item { flex: 1; display: flex; flex-direction: column; }
//           .filter-item label { font-size: 11px; font-weight: 800; color: #1e3a8a; }
//           .filter-item input { border: none; outline: none; font-size: 13px; color: #3f3f46; margin-top: 2px; }
//           .v-line { width: 1px; height: 30px; background: #e4e4e7; margin: 0 20px; }
//           .search-btn-green { background: #10b981; color: #fff; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
//           .sort-btn { background: #1e3a8a; color: white; border: none; padding: 8px 18px; border-radius: 20px; font-size: 12px; margin-right: 10px; cursor: pointer; }

//           .properties-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
//           .room-property-card { border: 1px solid #f1f5f9; border-radius: 24px; overflow: hidden; background: #fff; transition: 0.3s; }
//           .room-property-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
          
//           .img-container { height: 190px; position: relative; }
//           .img-container img { width: 100%; height: 100%; object-fit: cover; }
//           .top-badges { position: absolute; top: 15px; left: 15px; display: flex; gap: 8px; }
//           .match-tag { background: #1e3a8a; color: white; padding: 4px 12px; border-radius: 8px; font-size: 10px; font-weight: bold; }
//           .rating-tag { background: #facc15; color: white; padding: 4px 10px; border-radius: 8px; font-size: 10px; display: flex; align-items: center; gap: 4px; }
//           .heart-overlay { position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.3); border: none; color: white; font-size: 18px; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; }

//           .card-details { padding: 20px; }
//           .property-name { font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
//           .location-box { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 4px; margin-bottom: 15px; }
          
//           .tags-row { display: flex; gap: 6px; margin-bottom: 18px; }
//           .info-tag { background: #f8fafc; color: #64748b; padding: 4px 10px; border-radius: 6px; font-size: 10px; border: 1px solid #f1f5f9; }

//           .rooms-list { border-top: 1px solid #f1f5f9; padding-top: 15px; margin-bottom: 20px; }
//           .room-item { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 13px; font-weight: 600; }
//           .room-dot { width: 8px; height: 8px; border-radius: 50%; margin-right: 8px; }
//           .room-dot.blue { background: #3b82f6; }
//           .room-dot.gray { background: #cbd5e1; }
//           .room-item.occupied { color: #94a3b8; }
//           .room-price { color: #1e3a8a; }

//           .view-btn-blue { width: 100%; background: #1e3a8a; color: white; border: none; padding: 14px; border-radius: 14px; font-weight: bold; cursor: pointer; }
//           .load-more-btn { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 14px 40px; border-radius: 12px; font-weight: bold; display: flex; align-items: center; gap: 10px; margin: 40px auto; cursor: pointer; }
//           .no-results { grid-column: 1 / -1; text-align: center; padding: 50px; color: #94a3b8; }

//           @media (max-width: 1024px) { .properties-grid { grid-template-columns: repeat(2, 1fr); } }
//           @media (max-width: 768px) { .properties-grid { grid-template-columns: 1fr; } .hide-mobile { display: none; } }
//         `}
//       </style>
//     </div>
//   );
// };

// export default ViewBrowseRooms;














import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Search, Heart, Star, ChevronDown, Wifi, Home } from 'lucide-react';

const ViewBrowseRooms = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ city: '', date: '', guests: '' });
  const [savedRoomIds, setSavedRoomIds] = useState({});

  const BASE_URL = "https://graduationproject1.runasp.net/";

  const fetchRooms = async (pageNum, isNewSearch = false) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken');
      const url = `${BASE_URL}api/Property/GetAllWithRooms?page=${pageNum}&pageSize=10&orderByOldest=false${filters.city ? `&city=${filters.city}` : ''}`;
      
      const res = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } });
      
      if (res.data?.data?.items) {
        const newData = res.data.data.items;
        setProperties(prev => isNewSearch ? newData : [...prev, ...newData.filter(n => !prev.some(p => p.id === n.id))]);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRooms(1, true); }, []);

  const handleSearch = () => { setPage(1); fetchRooms(1, true); };

  const toggleSaveRoom = async (propertyId, roomId) => {
    try {
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      
      const key = `${propertyId}-${roomId}`;
      const isSaving = !savedRoomIds[key];
      
      // Optimistic UI update
      setSavedRoomIds(prev => ({ ...prev, [key]: isSaving }));

      await axios.post(
        `${BASE_URL}api/Saved/save-room`,
        { propertyId: Number(propertyId), roomId: Number(roomId) },
        config
      );
      
      // Track in localStorage for real-time sync
      if (isSaving) {
        const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
        if (!savedRooms.find(r => r.propertyId === propertyId && r.roomId === roomId)) {
          savedRooms.push({ propertyId, roomId });
          localStorage.setItem('savedRooms', JSON.stringify(savedRooms));
        }
      } else {
        const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
        const filtered = savedRooms.filter(r => !(r.propertyId === propertyId && r.roomId === roomId));
        localStorage.setItem('savedRooms', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error("Save Room Error:", err);
      const key = `${propertyId}-${roomId}`;
      setSavedRoomIds(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  return (
    <div className="page-wrapper mt-5 browse-container">
      {/* Header */}
      <div className="header-section">
        <h1>Find your Room</h1>
        <p>Browse Apartments with available rooms in your preferred district across Cairo, Filter by Location And date</p>
      </div>

      {/* Modern Filter Bar */}
      <div className="filter-container">
        <div className="filter-bar">
          <div className="filter-item">
            <span className="label">Where</span>
            <input placeholder="Search Destinations" value={filters.city} onChange={(e) => setFilters({...filters, city: e.target.value})} />
          </div>
          <div className="divider"></div>
          <div className="filter-item">
            <span className="label">When</span>
            <input placeholder="Search Dates" />
          </div>
          <div className="divider"></div>
          <div className="filter-item">
            <span className="label">Who</span>
            <input placeholder="Add Guests" />
          </div>
          <div className="divider"></div>
          <div className="sort-box">
            <span>Sorted by :</span>
            <button className="sort-btn">Newest <ChevronDown size={14} /></button>
            <button className="search-circle" onClick={handleSearch}><Search size={20} color="white" /></button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="rooms-grid">
        {properties.map((item, idx) => (
          <div className="card" key={`${item.id}-${idx}`}>
            <div className="image-box">
              <img src={item.coverImageUrl} alt="" onError={(e) => e.target.src = "https://placehold.co/400x300?text=Room"} />
              <div className="badges">
                <span className="match-badge">98% match</span>
                <span className="rating-badge"><Star size={12} fill="currentColor" /> 4.5</span>
              </div>
              <button 
                className="fav-btn" 
                onClick={(e) => {
                  e.preventDefault();
                  if (item.rooms && item.rooms.length > 0) {
                    toggleSaveRoom(item.id, item.rooms[0].id);
                  }
                }}
              >
                <Heart 
                  size={20} 
                  color="white" 
                  fill={savedRoomIds[`${item.id}-${item.rooms?.[0]?.id}`] ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="details-box">
              <h3 className="title">{item.name}</h3>
              <div className="loc">
                <MapPin size={14} /> <span>{item.city}, {item.government}</span>
              </div>
              
              <div className="amenities">
                <span><Wifi size={12} /> Wifi</span>
                <span><Home size={12} /> Furnished</span>
              </div>

              <div className="rooms-list">
                {item.rooms?.map((room) => (
                  <div className="room-row" key={room.id}>
                    <div className="room-info">
                      <span className={`dot ${room.isAvailable ? 'blue' : 'gray'}`}></span>
                      <span className={`name ${!room.isAvailable ? 'occupied' : ''}`}>{room.roomName}</span>
                    </div>
                    <span className="price">{room.isAvailable ? `${room.month_rent} EGP` : 'Occupied'}</span>
                  </div>
                ))}
              </div>

              <button className="view-details-btn" onClick={() => navigate(`/property/${item.id}`)}>
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="load-more-area">
        <button className="load-btn" onClick={() => { setPage(page+1); fetchRooms(page+1); }}>
          Load More Rooms <ChevronDown size={18} />
        </button>
      </div>

      <style>{`
        .page-wrapper { padding: 50px 7%; background: #fafafa; font-family: 'Segoe UI', Roboto, sans-serif; }
        .header-section h1 { color: #0a1d4d; font-size: 32px; font-weight: 800; margin-bottom: 5px; }
        .header-section p { color: #666; font-size: 14px; margin-bottom: 40px; }

        .filter-container { display: flex; justify-content: center; margin-bottom: 60px; }
        .filter-bar { 
          display: flex; align-items: center; background: white; padding: 10px 15px 10px 35px;
          border-radius: 60px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); width: 100%; max-width: 1000px;
          border: 1px solid #eee;
        }
        .filter-item { flex: 1; display: flex; flex-direction: column; }
        .filter-item .label { font-size: 11px; font-weight: 800; color: #0a1d4d; margin-bottom: 2px; }
        .filter-item input { border: none; outline: none; font-size: 13px; color: #888; }
        .divider { width: 1px; height: 35px; background: #eee; margin: 0 25px; }
        .sort-box { display: flex; align-items: center; gap: 10px; }
        .sort-box span { font-size: 13px; color: #444; }
        .sort-btn { 
          background: #1d3573; color: white; border: none; padding: 10px 20px; 
          border-radius: 30px; font-size: 12px; display: flex; align-items: center; gap: 5px; cursor: pointer;
        }
        .search-circle { 
          background: #24c690; border: none; width: 45px; height: 45px; 
          border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
        }

        .rooms-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }
        .card { background: white; border-radius: 20px; overflow: hidden; border: 1px solid #efefef; transition: 0.3s; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        
        .image-box { height: 200px; position: relative; }
        .image-box img { width: 100%; height: 100%; object-fit: cover; }
        .badges { position: absolute; top: 15px; left: 15px; display: flex; gap: 8px; }
        .match-badge { background: #1d3573; color: white; padding: 4px 12px; border-radius: 8px; font-size: 11px; font-weight: 600; }
        .rating-badge { background: #ffcc00; color: white; padding: 4px 10px; border-radius: 8px; font-size: 11px; display: flex; align-items: center; gap: 4px; }
        .fav-btn { position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.2); border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; }

        .details-box { padding: 20px; }
        .title { font-size: 18px; font-weight: 700; color: #333; margin-bottom: 5px; }
        .loc { display: flex; align-items: center; gap: 5px; color: #777; font-size: 13px; margin-bottom: 15px; }
        .amenities { display: flex; gap: 10px; margin-bottom: 20px; }
        .amenities span { background: #f5f7fa; color: #888; font-size: 11px; padding: 5px 12px; border-radius: 6px; border: 1px solid #eceef2; display: flex; align-items: center; gap: 4px; }

        .rooms-list { border-top: 1px solid #f0f0f0; padding-top: 15px; margin-bottom: 20px; }
        .room-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px; }
        .room-info { display: flex; align-items: center; gap: 10px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.blue { background: #3b82f6; box-shadow: 0 0 8px rgba(59,130,246,0.6); }
        .dot.gray { background: #ccc; }
        .name { font-weight: 600; color: #444; }
        .name.occupied { color: #aaa; }
        .price { font-weight: 700; color: #1d3573; }

        .view-details-btn { 
          width: 100%; background: #1d3573; color: white; border: none; padding: 14px; 
          border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s;
        }
        .view-details-btn:hover { background: #0a1d4d; }

        .load-more-area { display: flex; justify-content: center; margin-top: 50px; }
        .load-btn { 
          background: #ebebeb; border: none; padding: 15px 40px; border-radius: 10px; 
          font-weight: 700; color: #444; display: flex; align-items: center; gap: 10px; cursor: pointer;
        }



        .loading-spinner { text-align: center; padding: 20px; color: #1e3a8a; font-weight: bold; }
        .no-results { grid-column: 1 / -1; text-align: center; padding: 50px; color: #71717a; }
        /* ... باقي الـ CSS من الكود السابق ... */

        .browse-container { padding: 40px 8%; background: #fff; max-width: 1440px; margin: 0 auto; }
        .content-header h1 { color: #1e3a8a; font-size: 28px; font-weight: bold; margin-top: 30px; }
        .content-header p { color: #71717a; font-size: 14px; margin-bottom: 30px; }

        /* Filter Bar */
        .filter-bar-modern {
          display: flex; align-items: center; border: 1px solid #e4e4e7;
          border-radius: 50px; padding: 10px 30px; margin-bottom: 50px;
          background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .filter-item { flex: 1; display: flex; flex-direction: column; }
        .filter-item label { font-size: 12px; font-weight: 700; color: #1e3a8a; }
        .filter-item input { border: none; outline: none; font-size: 13px; color: #3f3f46; }
        .v-line { width: 1px; height: 35px; background: #e4e4e7; margin: 0 20px; }
        .sort-section { display: flex; align-items: center; gap: 10px; }
        .sort-btn { background: #1e3a8a; color: #fff; border: none; padding: 8px 20px; border-radius: 20px; font-size: 13px; cursor: pointer; }
        .search-btn-green { background: #10b981; color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }

       
  
      `}</style>
    </div>
  );
};

export default ViewBrowseRooms;