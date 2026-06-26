// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FaSearch, FaRegHeart, FaHeart, FaMapMarkerAlt, 
//   FaBed, FaBath, FaRulerCombined, FaChevronUp 
// } from 'react-icons/fa';

// const BrowseProperties = () => {
//   const navigate = useNavigate();
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [favorites, setFavorites] = useState({}); // لتتبع القلوب المختارة

//   const BASE_URL = "https://graduationproject1.runasp.net/";

//   const fetchProperties = async (pageNum) => {
//     try {
//       const token = localStorage.getItem('userToken'); 
//       const config = { headers: { 'Authorization': `Bearer ${token}` } };
      
//       const res = await axios.get(`${BASE_URL}api/Property?page=${pageNum}&pageSize=12`, config);
      
//       if (res.data?.isSuccess) {
//         const newData = res.data.data.items || [];
//         setApartments(prev => pageNum === 1 ? newData : [...prev, ...newData]);
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProperties(1);
//   }, []);

//   const handleLoadMore = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     fetchProperties(nextPage);
//   };

//   const toggleFavorite = (id) => {
//     setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
//   };

//   if (loading && page === 1) return <div className="status-msg">Loading...</div>;

//   return (
//     <div className="browse-container">
//       {/* Header Section */}
//       <div className="content-header">
//         <h1>Find your Apartement</h1>
//         <p>Browse Apartments with available rooms in your preferred district across Cairo, Filter by Location And date</p>
//       </div>

//       {/* Filter Bar - Responsive */}
//       <div className="filter-bar-modern">
//         <div className="filter-item">
//           <label>Where</label>
//           <input placeholder="Search Destinations" />
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
//           <button className="search-btn-green"><FaSearch /></button>
//         </div>
//       </div>

//       {/* Properties Grid */}
//       <div className="properties-grid">
//         {apartments.map((item) => (
//           <div className="new-property-card" key={item.id}>
//             <div className="img-container">
//               <img src={item.coverImageUrl} alt={item.name} />
              
//               {/* أيقونة القلب في مكانها الصحيح */}
//               <button 
//                 className={`heart-icon ${favorites[item.id] ? 'active' : ''}`} 
//                 onClick={() => toggleFavorite(item.id)}
//               >
//                 {favorites[item.id] ? <FaHeart /> : <FaRegHeart />}
//               </button>
              
//               <div className="match-badge">98% match</div>
//             </div>

//             <div className="card-details">
//               <div className="price-row">
//                 <span className="price-val">{item.monthlyRent || "5,000"} EGP</span>
//                 <span className="per-month">/ month</span>
//               </div>
              
//               <h3 className="property-name">{item.name}</h3>
              
//               <div className="location-box">
//                 <FaMapMarkerAlt /> <span>{item.city}, {item.government}</span>
//               </div>

//               {/* صناديق المواصفات الرمادية */}
//               <div className="specs-row-modern">
//                 <div className="s-item"><FaBed /> <span>{item.numberOfBedrooms} Beds</span></div>
//                 <div className="s-item"><FaBath /> <span>{item.numberOfEnSuiteBathrooms} Bath</span></div>
//                 <div className="s-item"><FaRulerCombined /> <span>{item.size} m²</span></div>
//               </div>

//               <button className="view-btn-blue" onClick={() => navigate(`/property/${item.id}`)}>
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* زر Load More المستجيب */}
//       <div className="load-more-section">
//         <button className="load-more-btn" onClick={handleLoadMore}>
//           Load More Apartment <FaChevronUp className="up-arrow" />
//         </button>
//       </div>

//       <style jsx>{`
//         .browse-container { padding: 40px 8%; background: #fff; max-width: 1440px; margin: 0 auto; }
//         .content-header h1 { color: #1e3a8a; font-size: 28px; font-weight: bold; margin-top: 30px; }
//         .content-header p { color: #71717a; font-size: 14px; margin-bottom: 30px; }

//         /* Filter Bar */
//         .filter-bar-modern {
//           display: flex; align-items: center; border: 1px solid #e4e4e7;
//           border-radius: 50px; padding: 10px 30px; margin-bottom: 50px;
//           background: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
//         }
//         .filter-item { flex: 1; display: flex; flex-direction: column; }
//         .filter-item label { font-size: 12px; font-weight: 700; color: #1e3a8a; }
//         .filter-item input { border: none; outline: none; font-size: 13px; color: #3f3f46; }
//         .v-line { width: 1px; height: 35px; background: #e4e4e7; margin: 0 20px; }
//         .sort-section { display: flex; align-items: center; gap: 10px; }
//         .sort-btn { background: #1e3a8a; color: #fff; border: none; padding: 8px 20px; border-radius: 20px; font-size: 13px; cursor: pointer; }
//         .search-btn-green { background: #10b981; color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }

//         /* Grid System */
//         .properties-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }

//         /* Card Design */
//         .new-property-card { border: 1px solid #e4e4e7; border-radius: 20px; overflow: hidden; background: #fff; transition: 0.3s; position: relative; }
//         .new-property-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
//         .img-container { height: 220px; position: relative; }
//         .img-container img { width: 100%; height: 100%; object-fit: cover; }
        
//         .heart-icon { position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.2); border: none; color: white; font-size: 22px; cursor: pointer; transition: 0.2s; padding: 5px; border-radius: 50%; display: flex; }
//         .heart-icon.active { color: #ef4444; background: white; }
//         .match-badge { position: absolute; top: 15px; left: 15px; background: #1e3a8a; color: white; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: bold; }

//         .card-details { padding: 20px; }
//         .price-val { font-size: 22px; font-weight: 800; color: #3b82f6; }
//         .per-month { font-size: 14px; color: #71717a; margin-left: 5px; }
//         .property-name { font-size: 18px; font-weight: 700; margin: 12px 0; color: #18181b; }
//         .location-box { display: flex; align-items: center; gap: 6px; color: #71717a; font-size: 13px; margin-bottom: 20px; }
        
//         .specs-row-modern { display: flex; justify-content: space-around; background: #f4f4f5; padding: 15px; border-radius: 15px; margin-bottom: 20px; }
//         .s-item { display: flex; flex-direction: column; align-items: center; gap: 5px; font-size: 11px; color: #3f3f46; font-weight: 700; }
//         .view-btn-blue { width: 100%; background: #1e3a8a; color: white; border: none; padding: 14px; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 15px; }

//         /* Load More Button */
//         .load-more-section { display: flex; justify-content: center; margin: 60px 0; }
//         .load-more-btn {
//           background: #f1f5f9; border: 1px solid #e2e8f0; color: #1e293b;
//           padding: 15px 80px; border-radius: 12px; font-weight: 700;
//           display: flex; align-items: center; gap: 12px; cursor: pointer; transition: 0.3s;
//         }
//         .load-more-btn:hover { background: #e2e8f0; }
//         .up-arrow { color: #1e3a8a; }

//         /* Responsive Media Queries */
//         @media (max-width: 1024px) {
//           .properties-grid { grid-template-columns: repeat(2, 1fr); }
//           .browse-container { padding: 20px 5%; }
//         }

//         @media (max-width: 768px) {
//           .properties-grid { grid-template-columns: 1fr; }
//           .filter-bar-modern { flex-direction: column; border-radius: 20px; padding: 20px; }
//           .hide-mobile { display: none; }
//           .v-line { width: 100%; height: 1px; margin: 15px 0; }
//           .sort-section { width: 100%; justify-content: space-between; }
//           .load-more-btn { width: 100%; justify-content: center; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default BrowseProperties;
















import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaSearch, FaRegHeart, FaHeart, FaMapMarkerAlt, 
  FaBed, FaBath, FaRulerCombined, FaChevronUp 
} from 'react-icons/fa';

const BrowseProperties = () => {
  const navigate = useNavigate();
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState({});

  // 1. States للبحث والفلترة
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [guests, setGuests] = useState('');
  const [sortBy, setSortBy] = useState('Newest');

  const BASE_URL = "https://graduationproject1.runasp.net/";

  // 2. تحديث الدالة لتقبل بارامترات الفلترة
  const fetchProperties = async (pageNum, isNewSearch = false) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken'); 
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      
      // بناء الرابط مع بارامترات البحث (Query Params)
      // ملاحظة: تأكد من مسميات الـ params من توثيق الـ API الخاص بك (مثل city أو search)
      let url = `${BASE_URL}api/Property?page=${pageNum}&pageSize=12`;
      if (searchQuery) url += `&city=${searchQuery}`; 
      if (sortBy) url += `&sort=${sortBy}`;
      
      const res = await axios.get(url, config);
      
      if (res.data?.isSuccess) {
        const newData = res.data.data.items || [];
        // إذا كان بحثاً جديداً نستبدل البيانات، وإذا كان "Load More" نضيفها
        setApartments(prev => isNewSearch ? newData : [...prev, ...newData]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(1);
  }, []);

  // 3. دالة معالجة البحث عند الضغط على الزر الأخضر
  const handleSearch = () => {
    setPage(1); // إعادة الصفحة للبداية
    fetchProperties(1, true);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProperties(nextPage);
  };

  const toggleFavorite = async (id) => {
    // Optimistic UI update
    const isSaving = !favorites[id];
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));

    try {
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.post(`${BASE_URL}api/Saved/toggle`, { propertyId: id }, config);
      
      // Track in localStorage for real-time sync
      if (isSaving) {
        const savedIds = JSON.parse(localStorage.getItem('savedPropertyIds') || '[]');
        if (!savedIds.includes(id)) {
          savedIds.push(id);
          localStorage.setItem('savedPropertyIds', JSON.stringify(savedIds));
        }
      } else {
        const savedIds = JSON.parse(localStorage.getItem('savedPropertyIds') || '[]');
        const filtered = savedIds.filter(pid => pid !== id);
        localStorage.setItem('savedPropertyIds', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error("Toggle Favorite Error:", err);
      // Revert if failed
      setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
    }
  };

  return (
    <div className="browse-container">
      <div className="content-header">
        <h1>Find your Apartement</h1>
        <p>Browse Apartments with available rooms in your preferred district across Cairo</p>
      </div>

      {/* Filter Bar - تم ربط الـ Inputs بالـ States */}
      <div className="filter-bar-modern">
        <div className="filter-item">
          <label>Where</label>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Destinations" 
          />
        </div>
        <div className="v-line hide-mobile"></div>
        <div className="filter-item">
          <label>When</label>
          <input 
            type="text"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            placeholder="Search Dates" 
          />
        </div>
        <div className="v-line hide-mobile"></div>
        <div className="filter-item">
          <label>Who</label>
          <input 
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Add Guests" 
          />
        </div>
        <div className="v-line hide-mobile"></div>
        <div className="sort-section">
          <span>Sorted by :</span>
          <select 
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="PriceLow">Price: Low to High</option>
          </select>
          <button className="search-btn-green" onClick={handleSearch}><FaSearch /></button>
        </div>
      </div>

      {/* Grid */}
      <div className="properties-grid">
        {apartments.length > 0 ? (
          apartments.map((item) => (
            <div className="new-property-card" key={item.id}>
              <div className="img-container">
                <img src={item.coverImageUrl.startsWith('http') ? item.coverImageUrl : BASE_URL + item.coverImageUrl} alt={item.name} />
                <button 
                  className={`heart-icon ${favorites[item.id] ? 'active' : ''}`} 
                  onClick={() => toggleFavorite(item.id)}
                >
                  {favorites[item.id] ? <FaHeart /> : <FaRegHeart />}
                </button>
                <div className="match-badge">98% match</div>
              </div>

              <div className="card-details">
                <div className="price-row">
                  <span className="price-val">{item.monthlyRent} EGP</span>
                  <span className="per-month">/ month</span>
                </div>
                <h3 className="property-name">{item.name}</h3>
                <div className="location-box">
                  <FaMapMarkerAlt /> <span>{item.city}, {item.government}</span>
                </div>
                <div className="specs-row-modern">
                  <div className="s-item"><FaBed /> <span>{item.numberOfBedrooms} Beds</span></div>
                  <div className="s-item"><FaBath /> <span>{item.numberOfEnSuiteBathrooms} Bath</span></div>
                  <div className="s-item"><FaRulerCombined /> <span>{item.size} m²</span></div>
                </div>
                <button className="view-btn-blue" onClick={() => navigate(`/property/${item.id}`)}>
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <div className="no-results">No properties found.</div>
        )}
      </div>

      {loading && <div className="loading-spinner">Loading properties...</div>}

      <div className="load-more-section">
        <button className="load-more-btn" onClick={handleLoadMore} disabled={loading}>
          {loading ? "Loading..." : "Load More Apartment"} <FaChevronUp className="up-arrow" />
        </button>
      </div>

      <style jsx>{`
        /* أضف التنسيقات السابقة هنا مع التعديلات التالية */
        .sort-dropdown {
          border: none;
          background: #f4f4f5;
          padding: 8px 12px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #1e3a8a;
          outline: none;
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

        /* Grid System */
        .properties-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }

        /* Card Design */
        .new-property-card { border: 1px solid #e4e4e7; border-radius: 20px; overflow: hidden; background: #fff; transition: 0.3s; position: relative; }
        .new-property-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
        .img-container { height: 220px; position: relative; }
        .img-container img { width: 100%; height: 100%; object-fit: cover; }
        
        .heart-icon { position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.2); border: none; color: white; font-size: 22px; cursor: pointer; transition: 0.2s; padding: 5px; border-radius: 50%; display: flex; }
        .heart-icon.active { color: #ef4444; background: white; }
        .match-badge { position: absolute; top: 15px; left: 15px; background: #1e3a8a; color: white; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: bold; }

        .card-details { padding: 20px; }
        .price-val { font-size: 22px; font-weight: 800; color: #3b82f6; }
        .per-month { font-size: 14px; color: #71717a; margin-left: 5px; }
        .property-name { font-size: 18px; font-weight: 700; margin: 12px 0; color: #18181b; }
        .location-box { display: flex; align-items: center; gap: 6px; color: #71717a; font-size: 13px; margin-bottom: 20px; }
        
        .specs-row-modern { display: flex; justify-content: space-around; background: #f4f4f5; padding: 15px; border-radius: 15px; margin-bottom: 20px; }
        .s-item { display: flex; flex-direction: column; align-items: center; gap: 5px; font-size: 11px; color: #3f3f46; font-weight: 700; }
        .view-btn-blue { width: 100%; background: #1e3a8a; color: white; border: none; padding: 14px; border-radius: 15px; font-weight: bold; cursor: pointer; font-size: 15px; }

        /* Load More Button */
        .load-more-section { display: flex; justify-content: center; margin: 60px 0; }
        .load-more-btn {
          background: #f1f5f9; border: 1px solid #e2e8f0; color: #1e293b;
          padding: 15px 80px; border-radius: 12px; font-weight: 700;
          display: flex; align-items: center; gap: 12px; cursor: pointer; transition: 0.3s;
        }
        .load-more-btn:hover { background: #e2e8f0; }
        .up-arrow { color: #1e3a8a; }

        /* Responsive Media Queries */
        @media (max-width: 1024px) {
          .properties-grid { grid-template-columns: repeat(2, 1fr); }
          .browse-container { padding: 20px 5%; }
        }

        @media (max-width: 768px) {
          .properties-grid { grid-template-columns: 1fr; }
          .filter-bar-modern { flex-direction: column; border-radius: 20px; padding: 20px; }
          .hide-mobile { display: none; }
          .v-line { width: 100%; height: 1px; margin: 15px 0; }
          .sort-section { width: 100%; justify-content: space-between; }
          .load-more-btn { width: 100%; justify-content: center; }
      `}</style>
    </div>
  );
};

export default BrowseProperties;