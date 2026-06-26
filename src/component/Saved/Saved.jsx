// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaSearch, FaRegHeart, FaHeart, FaMapMarkerAlt, 
//   FaBed, FaBath, FaRulerCombined, FaChevronUp, FaTrash
// } from 'react-icons/fa';

// const Saved = () => {
//   const navigate = useNavigate();
//   const [savedItems, setSavedItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);

//   const BASE_URL = "https://graduationproject1.runasp.net/";

//   const fetchSavedItems = async (pageNum, isInit = false) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('userToken')?.replace(/"/g, ''); 
//       const config = { headers: { 'Authorization': `Bearer ${token}` } };
      
//       const url = `${BASE_URL}api/Saved/all`;
//       const res = await axios.get(url, config);
//       console.log("=== SAVED API RESPONSE ===");
//       console.log("Raw Response:", res.data);
      
//       let newData = [];
//       if (res.data?.isSuccess && res.data.data) {
//         newData = res.data.data.items || res.data.data;
//       } else if (Array.isArray(res.data)) {
//         newData = res.data;
//       } else if (res.data?.items) {
//         newData = res.data.items;
//       } else if (res.data?.data) {
//         newData = Array.isArray(res.data.data) ? res.data.data : [];
//       } else {
//         newData = [];
//       }

//       // Detailed logging
//       console.log("Total items found:", newData.length);
//       newData.forEach((item, idx) => {
//         console.log(`Item ${idx}:`, {
//           id: item.id,
//           propertyId: item.propertyId,
//           roomId: item.roomId,
//           name: item.name || item.roomName,
//           keys: Object.keys(item)
//         });
//       });
      
//       setSavedItems(prev => isInit ? newData : [...prev, ...newData]);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSavedItems(1, true);
    
//     // Listen for storage changes from other tabs/components
//     const handleStorageChange = (e) => {
//       // If savedPropertyIds or savedRooms changed, refresh
//       if (e.key === 'savedPropertyIds' || e.key === 'savedRooms') {
//         console.log("Saved items changed, refreshing...");
//         fetchSavedItems(1, true);
//       }
//     };
    
//     window.addEventListener('storage', handleStorageChange);
    
//     // Poll for updates every 1.5 seconds (faster)
//     const interval = setInterval(() => {
//       fetchSavedItems(1, true);
//     }, 1500);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       clearInterval(interval);
//     };
//   }, []);

//   const handleLoadMore = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     fetchSavedItems(nextPage);
//   };

//   const handleUnsave = async (propertyId, roomId = 0) => {
//     try {
//       const token = localStorage.getItem('userToken')?.replace(/"/g, '');
//       const config = { headers: { 'Authorization': `Bearer ${token}` } };
      
//       // Optimistic UI update - remove immediately
//       if (roomId) {
//         // Remove specific room
//         setSavedItems(prev => 
//           prev.filter(item => !(
//             (item.propertyId === propertyId || item.id === propertyId) && 
//             item.roomId === roomId
//           ))
//         );
//       } else {
//         // Remove entire property
//         setSavedItems(prev => 
//           prev.filter(item => 
//             item.propertyId !== propertyId && item.id !== propertyId
//           )
//         );
//       }

//       if (roomId) {
//         // Delete room from saved
//         await axios.post(`${BASE_URL}api/Saved/save-room`, 
//           { propertyId: propertyId, roomId: roomId }, 
//           config
//         );
        
//         // Update localStorage for rooms
//         const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
//         const filtered = savedRooms.filter(r => !(r.propertyId === propertyId && r.roomId === roomId));
//         localStorage.setItem('savedRooms', JSON.stringify(filtered));
//       } else {
//         // Delete property from saved
//         await axios.post(`${BASE_URL}api/Saved/toggle`, 
//           { propertyId: propertyId }, 
//           config
//         );
        
//         // Update localStorage for properties
//         const savedIds = JSON.parse(localStorage.getItem('savedPropertyIds') || '[]');
//         const filtered = savedIds.filter(id => id !== propertyId);
//         localStorage.setItem('savedPropertyIds', JSON.stringify(filtered));
//       }
//     } catch(err) {
//       console.error("Failed to unsave", err);
//       // Refresh to get current state on error
//       setTimeout(() => fetchSavedItems(1, true), 500);
//     }
//   };

//   const getImg = (path) => {
//     if (!path) return 'https://via.placeholder.com/800x500?text=No+Image';
//     return path.startsWith('http') ? path : `${BASE_URL}${path}`;
//   };

//   const resolveProperty = (item) => item?.property || item;
//   const resolveRoom = (item) => item?.room || item;

//   const findNameField = (obj) => {
//     if (!obj || typeof obj !== 'object') return undefined;
//     const keys = Object.keys(obj);
//     for (const key of keys) {
//       const lower = key.toLowerCase();
//       if (typeof obj[key] === 'string' && (lower.includes('name') || lower.includes('title'))) {
//         return obj[key];
//       }
//     }
//     for (const key of keys) {
//       if (typeof obj[key] === 'object') {
//         const found = findNameField(obj[key]);
//         if (found) return found;
//       }
//     }
//     return undefined;
//   };

//   const getName = (item) => {
//     const property = resolveProperty(item);
//     const room = resolveRoom(item);
//     return (
//       item?.name ||
//       item?.nameAr ||
//       item?.title ||
//       item?.roomTitle ||
//       item?.propertyName ||
//       property?.name ||
//       property?.title ||
//       property?.propertyName ||
//       property?.nameAr ||
//       property?.nameArabic ||
//       room?.roomName ||
//       room?.name ||
//       room?.title ||
//       room?.nameAr ||
//       item?.roomName ||
//       findNameField(item) ||
//       'Unnamed Property'
//     );
//   };

//   const getPrice = (item) => {
//     const property = resolveProperty(item);
//     const room = resolveRoom(item);
//     const price =
//       item?.monthlyRent ||
//       item?.month_rent ||
//       item?.price ||
//       item?.rentPrice ||
//       item?.roomPrice ||
//       item?.monthly_price ||
//       property?.monthlyRent ||
//       property?.month_rent ||
//       property?.price ||
//       property?.rentPrice ||
//       room?.month_rent ||
//       room?.price ||
//       room?.rentPrice ||
//       0;
//     return price ? `${price}` : '0';
//   };

//   const getCity = (item) => {
//     const property = resolveProperty(item);
//     const room = resolveRoom(item);
//     return (
//       property?.city ||
//       item?.city ||
//       item?.location ||
//       item?.area ||
//       item?.address ||
//       item?.street ||
//       room?.city ||
//       room?.location ||
//       'Not specified'
//     );
//   };

//   const getGovernment = (item) => {
//     const property = resolveProperty(item);
//     const room = resolveRoom(item);
//     return (
//       property?.government ||
//       item?.government ||
//       item?.governorate ||
//       item?.region ||
//       item?.district ||
//       room?.government ||
//       'Egypt'
//     );
//   };

//   const getImage = (item) => {
//     const property = resolveProperty(item);
//     const room = resolveRoom(item);
//     return getImg(
//       property?.coverImageUrl ||
//       property?.imageUrl ||
//       room?.coverImageUrl ||
//       room?.imageUrl ||
//       property?.image ||
//       room?.image ||
//       item?.photo ||
//       property?.propertyImages?.[0]?.imageUrl ||
//       room?.propertyImages?.[0]?.imageUrl
//     );
//   };

//   const getBedrooms = (item) => {
//     const property = resolveProperty(item);
//     const room = resolveRoom(item);
//     return (
//       item?.numberOfBedrooms ||
//       property?.numberOfBedrooms ||
//       property?.bedrooms ||
//       room?.numberOfBedrooms ||
//       room?.beds?.length ||
//       room?.bedrooms ||
//       undefined
//     );
//   };

//   const getBathrooms = (item) => {
//     const property = resolveProperty(item);
//     const room = resolveRoom(item);
//     return (
//       item?.numberOfEnSuiteBathrooms ||
//       property?.numberOfEnSuiteBathrooms ||
//       property?.bathrooms ||
//       room?.bathrooms ||
//       undefined
//     );
//   };

//   const getSize = (item) => {
//     const property = resolveProperty(item);
//     const room = resolveRoom(item);
//     return (
//       item?.size ||
//       property?.size ||
//       property?.area ||
//       room?.size ||
//       room?.area ||
//       undefined
//     );
//   };

//   const getSavedPropertyId = (item) => {
//     return (
//       item?.property?.id ||
//       item?.propertyId ||
//       item?.id ||
//       item?.property?.propertyId ||
//       item?.property?.Id ||
//       undefined
//     );
//   };

//   const getSavedRoomId = (item) => {
//     if (item?.room?.id) return item.room.id;
//     if (item?.roomId) return item.roomId;
//     if (item?.propertyId && item?.id) return item.id;
//     if (item?.roomName && item?.id) return item.id;
//     return undefined;
//   };

//   const getDetailsRoute = (item) => {
//     const propertyId = getSavedPropertyId(item);
//     const roomId = getSavedRoomId(item);
//     if (roomId && propertyId) return `/room-details/${propertyId}/${roomId}`;
//     if (propertyId) return `/property-details/${propertyId}`;
//     const fallbackId = item?.property?.id || item?.id;
//     return fallbackId ? `/property-details/${fallbackId}` : '';
//   };

//   return (
//     <div className="saved-container">
//       <div className="content-header">
//         <h1>Your Saved Matches</h1>
//         <p>Review the apartments and rooms you have saved to your favorites.</p>
//       </div>

//       <div className="properties-grid">
//         {savedItems.length > 0 ? (
//           savedItems.map((item, index) => (
//             <div className="new-property-card" key={item.id || item.propertyId || index}>
//               <div className="img-container">
//                 <img src={getImage(item)} alt={getName(item)} />
//                 <button 
//                   className="heart-icon active" 
//                   onClick={() => {
//                     const propertyId = getSavedPropertyId(item);
//                     const roomId = getSavedRoomId(item);
//                     console.log("Removing item:", { propertyId, roomId, item });
//                     handleUnsave(propertyId, roomId);
//                   }}
//                   title="Remove from saved"
//                 >
//                   <FaHeart />
//                 </button>
//                 <div className="match-badge">Saved</div>
//               </div>

//               <div className="card-details">
//                 <div className="price-row">
//                   <span className="price-val">{getPrice(item)}</span>
//                   <span className="per-month">EGP / month</span>
//                 </div>
//                 <h3 className="property-name">{getName(item)}</h3>
//                 <div className="location-box">
//                   <FaMapMarkerAlt /> <span>{getCity(item)}, {getGovernment(item)}</span>
//                 </div>
                
//                 {/* Try to show specs if they exist */}
//                 <div className="specs-row-modern">
//                   {getBedrooms(item) !== undefined && <div className="s-item"><FaBed /> <span>{getBedrooms(item)} Beds</span></div>}
//                   {getBathrooms(item) !== undefined && <div className="s-item"><FaBath /> <span>{getBathrooms(item)} Bath</span></div>}
//                   {getSize(item) !== undefined && <div className="s-item"><FaRulerCombined /> <span>{getSize(item)} m²</span></div>}
//                 </div>
//                 <button 
//                   className="view-btn-blue" 
//                   onClick={() => {
//                     try {
//                       const detailsRoute = getDetailsRoute(item);
//                       console.log("Navigation Details:", { 
//                         detailsRoute, 
//                         itemId: item.id, 
//                         propertyId: getSavedPropertyId(item),
//                         roomId: getSavedRoomId(item),
//                         fullItem: item 
//                       });
//                       if (detailsRoute) {
//                         navigate(detailsRoute);
//                       } else {
//                         console.warn('Cannot navigate to details: invalid item IDs', item);
//                       }
//                     } catch (error) {
//                       console.error("Navigation error:", error);
//                     }
//                   }}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           !loading && <div className="no-results">
//               <h3>No saved items yet.</h3>
//               <p>Start browsing to find your perfect match and save them here for later!</p>
//               <button className="browse-btn" onClick={() => navigate('/products')}>Browse Properties</button>
//           </div>
//         )}
//       </div>

     
//       <style jsx>{`
//         .saved-container { padding: 40px 8%; background: #fafafa; min-height: calc(100vh - 80px); max-width: 1440px; margin: 0 auto; font-family: 'Inter', sans-serif; }
//         .content-header { text-align: center; margin-bottom: 50px; }
//         .content-header h1 { color: #1e3a8a; font-size: 36px; font-weight: 800; margin-top: 30px; letter-spacing: -0.5px; }
//         .content-header p { color: #6b7280; font-size: 16px; margin-top: 10px; max-width: 600px; margin-left: auto; margin-right: auto; }

//         .properties-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; }

//         .new-property-card { border: 1px solid #f3f4f6; border-radius: 20px; overflow: hidden; background: #fff; transition: 0.3s; position: relative; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
//         .new-property-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); border-color: #e5e7eb; }
//         .img-container { height: 240px; position: relative; }
//         .img-container img { width: 100%; height: 100%; object-fit: cover; }
        
//         .heart-icon { position: absolute; top: 15px; right: 15px; background: white; border: none; color: #ef4444; font-size: 20px; cursor: pointer; transition: 0.2s; padding: 10px; border-radius: 50%; display: flex; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
//         .heart-icon:hover { transform: scale(1.1); }
//         .match-badge { position: absolute; top: 15px; left: 15px; background: #ca8a04; color: white; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 700; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

//         .card-details { padding: 24px; }
//         .price-row { display: flex; align-items: baseline; }
//         .price-val { font-size: 24px; font-weight: 800; color: #1e40af; }
//         .per-month { font-size: 14px; color: #6b7280; margin-left: 5px; font-weight: 500; }
//         .property-name { font-size: 18px; font-weight: 700; margin: 12px 0 8px; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//         .location-box { display: flex; align-items: center; gap: 8px; color: #6b7280; font-size: 14px; margin-bottom: 20px; font-weight: 500; }
        
//         .specs-row-modern { display: flex; gap: 15px; background: #f9fafb; padding: 12px 16px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #f3f4f6; }
//         .s-item { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #4b5563; font-weight: 600; }
//         .s-item svg { color: #6b7280; }
        
//         .view-btn-blue { width: 100%; background: #1e40af; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 700; cursor: pointer; font-size: 15px; transition: 0.2s; }
//         .view-btn-blue:hover { background: #1e3a8a; }

//         .no-results { grid-column: 1 / -1; text-align: center; padding: 80px 20px; background: white; border-radius: 20px; border: 1px dashed #e5e7eb; }
//         .no-results h3 { color: #111827; font-size: 24px; font-weight: 700; margin-bottom: 15px; }
//         .no-results p { color: #6b7280; font-size: 16px; margin-bottom: 25px; }
//         .browse-btn { background: #10b981; color: white; padding: 12px 24px; border-radius: 12px; font-weight: 600; border: none; cursor: pointer; transition: 0.2s; }
//         .browse-btn:hover { background: #059669; }

//         .loading-spinner { text-align: center; padding: 40px; color: #1e40af; font-weight: 600; font-size: 18px; }

//         .load-more-section { display: flex; justify-content: center; margin: 60px 0; }
//         .load-more-btn {
//           background: white; border: 1px solid #e5e7eb; color: #4b5563;
//           padding: 14px 40px; border-radius: 12px; font-weight: 600;
//           display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
//         }
//         .load-more-btn:hover { background: #f9fafb; color: #1f2937; }
//         .up-arrow { color: #1e40af; }
//       `}</style>
//     </div>
//   );
// };


// export default Saved;












import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../Shared/DashboardSidebar';
import axios from 'axios';
import { 
  FaMapMarkerAlt, FaBed, FaBath, FaHeart, 
  FaChevronDown, FaWifi, FaSnowflake
} from 'react-icons/fa';

const Saved = () => {
  const navigate = useNavigate();
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Rooms');

  const BASE_URL = "https://graduationproject1.runasp.net/";

  useEffect(() => {
    fetchSavedItems();
  }, []);

  const fetchSavedItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken')?.replace(/"/g, ''); 
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const res = await axios.get(`${BASE_URL}api/Saved/all`, config);
      
      let data = res.data?.data?.items || res.data?.data || res.data || [];
      setSavedItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const resolveProperty = (item) => item?.property || item;
  const getName = (item) => resolveProperty(item)?.name || item?.roomName || 'Luxury Suite';
  const getPrice = (item) => resolveProperty(item)?.monthlyRent || item?.price || '0';
  const getCity = (item) => resolveProperty(item)?.city || 'Cairo';
  const getImage = (item) => {
    const path = resolveProperty(item)?.coverImageUrl || item?.imageUrl;
    return path ? (path.startsWith('http') ? path : `${BASE_URL}${path}`) : 'https://via.placeholder.com/300x200';
  };

  return (
    <div className="profile-layout">
      <DashboardSidebar />

      {/* --- Main Content --- */}
      <main className="main-content">
        <header className="content-title">
          <h1>Saved Listings</h1>
          <p>You have {savedItems.length} properties bookmarked for your next move.</p>
        </header>

        {/* --- Tabs --- */}
        <div className="tabs-container">
          {['Rooms', 'Whole Apartments', 'Shared Houses'].map(tab => (
            <button 
              key={tab} 
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab} <span className="tab-count">{tab === 'Rooms' ? savedItems.length : 0}</span>
            </button>
          ))}
        </div>

        {/* --- Properties Grid --- */}
        {loading ? (
          <div className="loading">Loading your favorites...</div>
        ) : (
          <div className="listings-grid">
            {savedItems.map((item, index) => (
              <div className="listing-card" key={index}>
                <div className="card-image">
                  <img src={getImage(item)} alt="property" />
                  <button className="wishlist-btn"><FaHeart /></button>
                  <span className="badge-verified">VERIFIED</span>
                </div>
                <div className="card-info">
                  <div className="info-header">
                    <h4>{getName(item)}</h4>
                    <span className="price">${getPrice(item)}<small>/mo</small></span>
                  </div>
                  <p className="location"><FaMapMarkerAlt /> {getCity(item)}, Egypt</p>
                  <div className="features">
                    <span><FaBath /> 1 Bath</span>
                    <span><FaSnowflake /> AC</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="show-more-btn">
          Show more properties <FaChevronDown />
        </button>

        {/* --- Recommendations Section --- */}
        <section className="recommendations">
          <div className="section-header">
            <h3>Recommended for You</h3>
            <a href="#">View all suggestions →</a>
          </div>
          <div className="rec-grid">
            <div className="rec-card">
              <img src="https://via.placeholder.com/80/eee" alt="rec" />
              <div className="rec-info">
                <h5>Executive Loft in Sheikh Zayed</h5>
                <p>3.2 miles from your current search</p>
                <span className="rec-price">$950/mo</span>
              </div>
            </div>
            <div className="rec-card">
              <img src="https://via.placeholder.com/80/eee" alt="rec" />
              <div className="rec-info">
                <h5>Urban Studio Near Metro</h5>
                <p>Excellent commute scores</p>
                <span className="rec-price">$520/mo</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .profile-layout { display: flex; padding: 40px 5%; background: #fdfdfd; gap: 40px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }

        .main-content { flex-grow: 1; }
        .content-title h1 { font-size: 1.8rem; color: #111; margin-bottom: 8px; }
        .content-title p { color: #777; margin-bottom: 30px; }

        .tabs-container { display: flex; gap: 30px; border-bottom: 1px solid #eee; margin-bottom: 30px; }
        .tab { background: none; border: none; padding: 10px 0; color: #888; cursor: pointer; position: relative; font-weight: 500; }
        .tab.active { color: #4a6cf7; }
        .tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: #4a6cf7; }
        .tab-count { background: #f0f0f0; padding: 2px 8px; border-radius: 10px; font-size: 11px; margin-left: 5px; }

        .listings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; }
        .listing-card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid #f0f0f0; transition: transform 0.2s; }
        .listing-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .card-image { height: 160px; position: relative; }
        .card-image img { width: 100%; height: 100%; object-fit: cover; }
        .wishlist-btn { position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: #ff4d4d; cursor: pointer; }
        .badge-verified { position: absolute; bottom: 10px; left: 10px; background: #4a6cf7; color: white; font-size: 9px; padding: 3px 8px; border-radius: 4px; font-weight: bold; }
        .card-info { padding: 15px; }
        .info-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .info-header h4 { font-size: 0.95rem; color: #333; margin: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .price { font-weight: bold; color: #4a6cf7; font-size: 1rem; }
        .price small { font-size: 0.7rem; color: #999; }
        .location { font-size: 0.8rem; color: #777; display: flex; align-items: center; gap: 5px; margin-bottom: 15px; }
        .features { display: flex; gap: 15px; font-size: 0.8rem; color: #666; border-top: 1px solid #f9f9f9; padding-top: 10px; }

        .show-more-btn { display: flex; align-items: center; gap: 10px; margin: 40px auto; background: white; border: 1px solid #eee; padding: 10px 20px; border-radius: 8px; cursor: pointer; color: #555; }
        .loading { text-align: center; padding: 50px; color: #4a6cf7; font-weight: 500; }

        .recommendations { margin-top: 60px; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .section-header h3 { font-size: 1.1rem; color: #333; }
        .section-header a { font-size: 0.85rem; color: #4a6cf7; text-decoration: none; font-weight: 500; }
        .rec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .rec-card { display: flex; align-items: center; gap: 15px; background: #f8faff; padding: 15px; border-radius: 12px; }
        .rec-card img { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; }
        .rec-info h5 { margin: 0 0 5px 0; font-size: 0.9rem; color: #333; }
        .rec-info p { margin: 0; font-size: 0.75rem; color: #888; }
        .rec-price { font-size: 0.85rem; font-weight: bold; color: #333; }
      `}</style>
    </div>
  );
};

export default Saved;