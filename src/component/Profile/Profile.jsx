// const API_BASE = 'https://graduationproject1.runasp.net/api/Booking';
// const STATUS_OPTIONS = [
//   { value: '', label: 'All Requests' },
//   { value: 'Pending', label: 'Pending' },
//   { value: 'Approved', label: 'Approved' },
//   { value: 'Declined', label: 'Declined' },
// ];

// const formatDate = (value) => {
//   if (!value) return 'Not specified';
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return value;
//   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// };

// const statusClass = (status) => {
//   const normalized = String(status || '').toLowerCase();
//   if (normalized.includes('approved')) return 'status-badge approved';
//   if (normalized.includes('pending')) return 'status-badge pending';
//   if (normalized.includes('declined') || normalized.includes('rejected')) return 'status-badge declined';
//   return 'status-badge neutral';
// };

// const getBookingTitle = (item) => {
//   return item.title || item.propertyName || item.roomName || 'Booking request';
// };

// const getBookingLocation = (item) => {
//   if (item.location?.fullAddress) return item.location.fullAddress;
//   if (item.location?.city) {
//     const parts = [item.location.street, item.location.city].filter(Boolean);
//     return parts.join(', ');
//   }
//   return item.location || item.city || item.address || 'Unknown location';
// };

// const getBookingAmount = (item) => {
//   if (item.monthlyPrice) {
//     return `${Number(item.monthlyPrice).toLocaleString()} EGP / month`;
//   }
//   if (item.price) {
//     return `${Number(item.price).toLocaleString()} EGP / month`;
//   }
//   if (item.totalPrice) {
//     return `${Number(item.totalPrice).toLocaleString()} EGP`;
//   }
//   return 'Price not available';
// };

// const getBookingDuration = (item) => {
//   if (item.duration) return `${item.duration} nights`;
//   if (item.months) return `${item.months} Months`;
//   if (item.durationMonths) return `${item.durationMonths} Months`;
//   return item.period || 'Duration unavailable';
// };

// const Profile = () => {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [status, setStatus] = useState('');
//   const [location, setLocation] = useState('');
//   const [year, setYear] = useState('');
//   const [month, setMonth] = useState('');
//   const [day, setDay] = useState('');
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);
//   const [hasMore, setHasMore] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());


//   const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');

//   const fetchBookings = async (reset = false) => {
//     if (!token) {
//       setError('Please login first to see your bookings.');
//       setBookings([]);
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const params = new URLSearchParams();
//       params.append('page', page);
//       params.append('pageSize', pageSize);
//       if (status) params.append('status', status);
//       if (location) params.append('location', location);
//       if (year) params.append('year', year);
//       if (month) params.append('month', month);
//       if (day) params.append('day', day);

//       const url = `${API_BASE}/my-bookings?${params.toString()}`;
//       const response = await axios.get(url, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log('📦 API Response full data:', response.data);

//       const data = response?.data;
//       const items = Array.isArray(data)
//         ? data
//         : Array.isArray(data?.items)
//         ? data.items
//         : Array.isArray(data?.bookings)
//         ? data.bookings
//         : Array.isArray(data?.data?.bookings)
//         ? data.data.bookings
//         : Array.isArray(data?.data)
//         ? data.data
//         : [];

//       const safeItems = Array.isArray(items) ? items : [];
//       console.log('✅ Extracted items:', safeItems);

//       // تحديث التقويم بناءً على أول تاريخ من البيانات
//       if (safeItems.length > 0 && safeItems[0].moveInDate) {
//         try {
//           setSelectedDate(new Date(safeItems[0].moveInDate));
//         } catch (e) {
//           console.log('Date parse error:', e);
//         }
//       }

//       if (reset) {
//         setBookings(safeItems);
//       } else {
//         setBookings((prev) => (page === 1 ? safeItems : [...prev, ...safeItems]));
//       }

//       setHasMore(safeItems.length >= pageSize);
//     } catch (fetchError) {
//       console.error('Profile bookings fetch failed:', fetchError);
//       setError(fetchError?.response?.data?.message || 'Unable to load bookings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(page === 1);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [page]);

//   useEffect(() => {
//     if (page === 1) {
//       fetchBookings(true);
//     } else {
//       setPage(1);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [status, location, year, month, day]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//   };

//   const handleLoadMore = () => {
//     setPage((current) => current + 1);
//   };

//   return (
//     <div className="profile-page">
//       <style>{`
//         .profile-page { padding: 100px 24px 40px; background: #f5f7fb; min-height: 100vh; font-family: Inter, system-ui, sans-serif; }
//         .profile-wrapper { max-width: 1380px; margin: 0 auto; display: grid; grid-template-columns: 280px minmax(660px, 1fr) 300px; gap: 24px; }
//         .profile-sidebar, .profile-aside, .profile-main { background: #fff; border-radius: 24px; border: 1px solid #e5e7eb; box-shadow: 0 18px 50px rgba(15, 23, 42, 0.05); }
//         .profile-sidebar { padding: 24px; }
//         .profile-sidebar h3 { margin-bottom: 24px; font-size: 22px; color: #0f172a; }
//         .sidebar-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-radius: 16px; margin-bottom: 12px; background: #f8fafc; color: #0f172a; font-weight: 700; cursor: pointer; }
//         .sidebar-item.active { background: #e0e7ff; color: #1e3a8a; }
//         .sidebar-item:last-child { margin-bottom: 0; }
//         .sidebar-stats { margin-top: 32px; display: grid; gap: 14px; }
//         .stat-card { background: #f8fafc; border-radius: 20px; padding: 18px; display: flex; flex-direction: column; gap: 8px; }
//         .stat-label { font-size: 13px; color: #475569; }
//         .status-active { color: #065f46; }

//         .profile-main { display: flex; flex-direction: column; gap: 20px; padding: 26px; }
//         .profile-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; }
//         .profile-header h1 { margin: 0; font-size: 34px; line-height: 1.1; color: #0f172a; }
//         .profile-header p { margin: 8px 0 0; color: #475569; max-width: 620px; }
//         .header-search { display: flex; align-items: center; gap: 10px; }
//         .header-search input { width: 260px; border: 1px solid #cbd5e1; border-radius: 999px; padding: 12px 18px; font-size: 14px; color: #0f172a; }
//         .search-cta { border: none; background: #1e3a8a; color: #fff; width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; }

//         .tabs { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; }
//         .tab-button { padding: 12px 20px; border-radius: 999px; background: #eef2ff; color: #1e3a8a; font-weight: 700; border: none; cursor: pointer; transition: 0.2s; }
//         .tab-button.active { background: #1e3a8a; color: #fff; }

//         .profile-search { display: grid; grid-template-columns: 1fr auto; gap: 18px; align-items: center; margin-top: 16px; }
//         .filter-inputs { display: grid; grid-template-columns: 1.2fr repeat(3, 1fr); gap: 12px; }
//         .filter-inputs input { width: 100%; height: 52px; border: 1px solid #cbd5e1; border-radius: 16px; padding: 0 16px; font-size: 14px; color: #0f172a; }
//         .search-actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }
//         .search-button, .clear-button { min-width: 130px; height: 52px; border-radius: 16px; border: none; font-weight: 700; cursor: pointer; }
//         .search-button { background: #1e3a8a; color: #fff; }
//         .clear-button { background: #f8fafc; color: #334155; border: 1px solid #cbd5e1; }

//         .booking-list { display: grid; gap: 18px; margin-top: 10px; }
//         .booking-card { display: grid; grid-template-columns: 140px 1fr auto; gap: 16px; padding: 16px; border-radius: 20px; background: #fff; border: 1px solid #e5e7eb; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06); align-items: center; }
//         .booking-card-image { min-width: 140px; max-width: 140px; height: 120px; overflow: hidden; border-radius: 16px; }
//         .booking-card-image img { width: 100%; height: 100%; object-fit: cover; }
//         .booking-card-body { display: flex; flex-direction: column; gap: 10px; flex: 1; }
//         .booking-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
//         .booking-title { margin: 0; font-size: 16px; font-weight: 700; color: #0f172a; }
//         .booking-location { display: flex; align-items: center; gap: 6px; color: #64748b; font-size: 13px; margin: 4px 0 0 0; }
//         .booking-info-row { display: flex; gap: 20px; font-size: 13px; color: #475569; }
//         .booking-info-col { display: flex; flex-direction: column; gap: 3px; }
//         .booking-info-col span { color: #94a3b8; font-size: 11px; }
//         .booking-info-col strong { color: #0f172a; font-weight: 600; }
//         .booking-card-side { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; white-space: nowrap; }
//         .booking-price { font-size: 24px; font-weight: 800; color: #0f172a; }
//         .booking-actions { display: flex; gap: 8px; flex-wrap: nowrap; }
//         .btn-action { display: flex; align-items: center; justify-content: center; border-radius: 14px; border: 1px solid #cbd5e1; background: #fff; color: #0f172a; padding: 10px 14px; font-weight: 700; cursor: pointer; transition: 0.2s; min-width: 42px; height: 42px; }
//         .btn-action:hover { background: #f0f4f8; border-color: #1e3a8a; }
//         .btn-action.secondary { background: #1e3a8a; color: #fff; border-color: transparent; }
//         .btn-action.secondary:hover { background: #1e40af; }

//         .status-badge { display: inline-flex; align-items: center; justify-content: center; padding: 10px 18px; border-radius: 999px; font-weight: 700; font-size: 12px; letter-spacing: 0.02em; text-transform: uppercase; white-space: nowrap; }
//         .status-badge.approved { background: #dcfce7; color: #166534; }
//         .status-badge.pending { background: #fef3c7; color: #92400e; }
//         .status-badge.declined { background: #fee2e2; color: #b91c1c; }
//         .status-badge.neutral { background: #e2e8f0; color: #334155; }

//         .load-more { width: 100%; margin-top: 6px; padding: 16px; border-radius: 20px; border: 1px solid #cbd5e1; background: #fff; font-weight: 700; color: #1e3a8a; cursor: pointer; }
//         .empty-state, .error-state { padding: 32px; border-radius: 24px; background: #fff; text-align: center; color: #334155; border: 1px solid #e2e8f0; }
//         .empty-state strong { display: block; margin-bottom: 10px; color: #0f172a; }

//         .profile-aside { padding: 24px; display: grid; gap: 20px; }
//         .tip-card, .calendar-card { background: #f8fafc; border-radius: 24px; padding: 24px; }
//         .tip-card h4 { margin: 0 0 16px; font-size: 18px; color: #0f172a; }
//         .tip-card ol { padding-left: 20px; margin: 0; color: #334155; }
//         .tip-card li { margin-bottom: 12px; line-height: 1.6; }
//         .calendar-card { background: #fff; border: 1px solid #e5e7eb; }
//         .calendar-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; font-weight: 700; color: #0f172a; }
//         .calendar-nav { color: #475569; cursor: pointer; }
//         .calendar-grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 8px; margin-bottom: 16px; }
//         .calendar-day-title { text-align: center; color: #94a3b8; font-size: 12px; font-weight: 700; }
//         .calendar-day { min-height: 48px; border-radius: 14px; display: grid; place-items: center; color: #334155; font-size: 14px; }
//         .calendar-day.active { background: #1e3a8a; color: #fff; }
//         .calendar-notes { display: grid; gap: 10px; color: #475569; font-size: 14px; }

//         @media (max-width: 1180px) {
//           .profile-wrapper { grid-template-columns: 1fr; }
//           .profile-main, .profile-sidebar, .profile-aside { width: 100%; }
//           .profile-search { grid-template-columns: 1fr; }
//           .filter-inputs { grid-template-columns: 1fr; }
//           .header-search { width: 100%; }
//         }
//         @media (max-width: 860px) {
//           .booking-card { grid-template-columns: 1fr; }
//           .booking-card-info { grid-template-columns: 1fr; }
//           .profile-header { flex-direction: column; align-items: flex-start; }
//         }
//         @media (max-width: 660px) {
//           .profile-page { padding-top: 80px; }
//           .header-search input { width: 100%; }
//           .search-actions { justify-content: stretch; }
//           .search-button, .clear-button { width: 100%; }
//         }
//       `}</style>

//       <div className="profile-wrapper">
//         <aside className="profile-sidebar">
//           <h3>My Profile</h3>
//           <div className="sidebar-item active" onClick={() => navigate('/orders')} style={{ cursor: 'pointer' }}>My Booking</div>
//           <div className="sidebar-item" onClick={() => navigate('/booking/:id')} style={{ cursor: 'pointer' }}>My Bookings</div>
//           <div className="sidebar-item" onClick={() => navigate('/saved')} style={{ cursor: 'pointer' }}>Saved Matches</div>
//           <div className="sidebar-item" onClick={() => navigate('/PropertyType')} style={{ cursor: 'pointer' }}>My Properties</div>
//           <div className="sidebar-item" onClick={() => navigate('/BrowseProperties')} style={{ cursor: 'pointer' }}>Browse Properties</div>

//           <div className="sidebar-stats">
//             <div className="stat-card">
//               <span className="stat-label">Profile Views</span>
//               <strong>124</strong>
//             </div>
//             <div className="stat-card">
//               <span className="stat-label">Status</span>
//               <strong className="status-active">Active</strong>
//             </div>
//           </div>
//         </aside>

//         <section className="profile-main">
//           <div className="profile-header">
//             <div>
//                               <h1>My Bookings</h1>
//               <p>Manage your requests and track the status of your upcoming stays.</p>
//             </div>
//             <div className="header-search">
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Search by location"
//               />
//               <button type="button" className="search-cta" onClick={() => setPage(1)}>
//                 <FaSearch />
//               </button>
//             </div>
//           </div>

//           <div className="tabs">
//             {STATUS_OPTIONS.map((option) => (
//               <button
//                 key={option.value}
//                 type="button"
//                 className={`tab-button ${status === option.value ? 'active' : ''}`}
//                 onClick={() => {
//                   setStatus(option.value);
//                   setPage(1);
//                 }}
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>

//           <div className="profile-search">
//             <div className="filter-inputs">
//               <input
//                 type="text"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="Search by location"
//               />
//               <input
//                 type="number"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 placeholder="Year"
//                 min="2024"
//               />
//               <input
//                 type="number"
//                 value={month}
//                 onChange={(e) => setMonth(e.target.value)}
//                 placeholder="Month"
//                 min="1"
//                 max="12"
//               />
//               <input
//                 type="number"
//                 value={day}
//                 onChange={(e) => setDay(e.target.value)}
//                 placeholder="Day"
//                 min="1"
//                 max="31"
//               />
//             </div>
//             <div className="search-actions">
//               <button type="button" className="search-button" onClick={() => setPage(1)}>
//                 Search
//               </button>
//               <button
//                 type="button"
//                 className="clear-button"
//                 onClick={() => {
//                   setStatus('');
//                   setLocation('');
//                   setYear('');
//                   setMonth('');
//                   setDay('');
//                   setPage(1);
//                 }}
//               >
//                 Clear
//               </button>
//             </div>
//           </div>

//           {error && (
//             <div className="error-state">
//               <strong>Error</strong>
//               <p>{error}</p>
//             </div>
//           )}

//           {loading && !bookings.length ? (
//             <div className="empty-state">Loading your booking requests...</div>
//           ) : null}

//           {!loading && !bookings.length && !error ? (
//             <div className="empty-state">
//               <strong>No booking requests found</strong>
//               <p>Try changing the filters or check if you are logged in.</p>
//             </div>
//           ) : null}

//           <div className="booking-list">
//             {Array.isArray(bookings) ? bookings.map((item, index) => {
//               console.log(`📋 Booking ${index}:`, item);
//               return (
//               <article className="booking-card" key={`${item.id || item.bookingId || index}-${index}`}>
//                 <div className="booking-card-image">
//                   <img
//                     src={item.coverImage || item.imageUrl || 'https://via.placeholder.com/140x120?text=Room'}
//                     alt="Booking"
//                   />
//                 </div>
//                 <div className="booking-card-body">
//                   <div className="booking-card-header">
//                     <div>
//                       <h3 className="booking-title">{getBookingTitle(item)}</h3>
//                       <p className="booking-location">
//                         <FaMapMarkerAlt size={12} /> {getBookingLocation(item)}
//                       </p>
//                     </div>
//                   </div>
                  
//                   <div className="booking-info-row">
//                     {item.moveInDate && (
//                       <div className="booking-info-col">
//                         <span>Check-in</span>
//                         <strong>{formatDate(item.moveInDate)}</strong>
//                       </div>
//                     )}
//                     {item.endDate && (
//                       <div className="booking-info-col">
//                         <span>Check-out</span>
//                         <strong>{formatDate(item.endDate)}</strong>
//                       </div>
//                     )}
//                     {item.duration && (
//                       <div className="booking-info-col">
//                         <span>Duration</span>
//                         <strong>{item.duration} nights</strong>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="booking-card-side">
//                   <div>
//                     <span className={statusClass(item.status || item.bookingStatus)}>
//                       {item.status || item.bookingStatus || 'Pending'}
//                     </span>
//                   </div>
//                   <div className="booking-price">{getBookingAmount(item)}</div>
//                   <div className="booking-actions">
//                     <button className="btn-action" type="button" title="View details">
//                       <FaEye size={14} />
//                     </button>
//                     <button className="btn-action secondary" type="button" title="Chat with host">
//                       <FaComments size={14} />
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             );
//             }) : null}
//           </div>

//           {hasMore && !loading && bookings.length > 0 ? (
//             <button className="load-more" type="button" onClick={handleLoadMore}>
//               Load More Requests
//             </button>
//           ) : null}
//         </section>

//         <aside className="profile-aside">
//           <div className="tip-card">
//             <h4>Renter tips</h4>
//             <ol>
//               <li>Message the host immediately after approval to arrange a viewing</li>
//               <li>Complete your profile to increase your acceptance rate</li>
//             </ol>
//           </div>
//           <div className="calendar-card">
//             <div className="calendar-header">
//               <div>October 2023</div>
//               <div className="calendar-nav">‹ ›</div>
//             </div>
//             <div className="calendar-grid">
//               <div className="calendar-day-title">S</div>
//               <div className="calendar-day-title">M</div>
//               <div className="calendar-day-title">T</div>
//               <div className="calendar-day-title">W</div>
//               <div className="calendar-day-title">T</div>
//               <div className="calendar-day-title">F</div>
//               <div className="calendar-day-title">S</div>
//               {['29', '30', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'].map((dayLabel) => (
//                 <div key={dayLabel} className={`calendar-day ${dayLabel === '1' ? 'active' : ''}`}><span>{dayLabel}</span></div>
//               ))}
//             </div>
//             <div className="calendar-notes">
//               <div><strong>Oct 1:</strong> Move-in to Maadi</div>
//               <div><strong>Oct 10:</strong> Viewing in Dokki</div>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default Profile;












































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DashboardSidebar from '../Shared/DashboardSidebar';

// const API_BASE = 'https://graduationproject1.runasp.net/api/Booking';
// const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
// const DAYS_SHORT = ['S','M','T','W','T','F','S'];

// const fmt = (dateStr) => {
//   if (!dateStr) return '';
//   const d = new Date(dateStr);
//   if (isNaN(d)) return dateStr;
//   return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// };

// const getLocation = (item) => {
//   if (item.location?.fullAddress) return item.location.fullAddress;
//   if (item.location?.city) return [item.location.street, item.location.city].filter(Boolean).join(', ');
//   return item.location || item.city || item.address || 'Unknown location';
// };

// const getPrice = (item) => {
//   if (item.monthlyPrice) return `${Number(item.monthlyPrice).toLocaleString()} EGP / month`;
//   if (item.price) return `${Number(item.price).toLocaleString()} EGP / month`;
//   if (item.totalPrice) return `${Number(item.totalPrice).toLocaleString()} EGP`;
//   return 'Price not available';
// };

// const badgeCls = (status) => {
//   const s = String(status || '').toLowerCase();
//   if (s.includes('approved')) return 'approved';
//   if (s.includes('pending')) return 'pending';
//   return 'declined';
// };

// const STATUS_TABS = [
//   { value: '', label: 'All Requests' },
//   { value: 'Pending', label: 'Pending' },
//   { value: 'Approved', label: 'Approved' },
//   { value: 'Declined', label: 'Past/Declined' },
// ];

// const Profile = () => {
//   const navigate = useNavigate();
//   const [allBookings, setAllBookings] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [currentTab, setCurrentTab] = useState('');
//   const [locInput, setLocInput] = useState('');
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [calDate, setCalDate] = useState(new Date());

//   const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     applyFilters(allBookings, currentTab, locInput);
//   }, [currentTab, locInput, allBookings]);

//   const fetchBookings = async () => {
//     if (!token) {
//       setError('Please login to see your bookings.');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     try {
//       const res = await axios.get(`${API_BASE}/my-bookings?page=1&pageSize=50`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = res.data;
//       const items = Array.isArray(data) ? data
//         : Array.isArray(data?.items) ? data.items
//         : Array.isArray(data?.bookings) ? data.bookings
//         : Array.isArray(data?.data?.bookings) ? data.data.bookings
//         : Array.isArray(data?.data) ? data.data : [];
//       setAllBookings(items);
//       if (items.length > 0 && items[0].moveInDate) {
//         const d = new Date(items[0].moveInDate);
//         if (!isNaN(d)) setCalDate(new Date(d.getFullYear(), d.getMonth(), 1));
//       }
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Unable to load bookings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyFilters = (bookings, tab, loc) => {
//     const result = bookings.filter(item => {
//       const matchTab = !tab || String(item.status || '').toLowerCase().includes(tab.toLowerCase());
//       const matchLoc = !loc || getLocation(item).toLowerCase().includes(loc.toLowerCase());
//       return matchTab && matchLoc;
//     });
//     setFiltered(result);
//     setVisibleCount(5);
//   };

//   const bookedDays = new Set(
//     allBookings
//       .filter(item => item.moveInDate)
//       .map(item => {
//         const d = new Date(item.moveInDate);
//         if (d.getMonth() === calDate.getMonth() && d.getFullYear() === calDate.getFullYear()) return d.getDate();
//         return null;
//       })
//       .filter(Boolean)
//   );

//   const calEvents = allBookings
//     .filter(item => item.moveInDate)
//     .map(item => ({ date: new Date(item.moveInDate), title: item.title || 'Booking' }))
//     .filter(e => !isNaN(e.date) && e.date.getMonth() === calDate.getMonth() && e.date.getFullYear() === calDate.getFullYear())
//     .slice(0, 3);

//   const firstDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay();
//   const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();
//   const prevMonthDays = new Date(calDate.getFullYear(), calDate.getMonth(), 0).getDate();
//   const today = new Date();

//   const calCells = [];
//   for (let i = firstDay - 1; i >= 0; i--) calCells.push({ day: prevMonthDays - i, type: 'dimmed' });
//   for (let d = 1; d <= daysInMonth; d++) {
//     const isToday = today.getDate() === d && today.getMonth() === calDate.getMonth() && today.getFullYear() === calDate.getFullYear();
//     const isBooked = bookedDays.has(d);
//     calCells.push({ day: d, type: isToday ? 'today' : isBooked ? 'booked' : 'normal' });
//   }

//   return (
//     <div className="profile-page">
//       <style>{`
//         .profile-page { background: #f0f2f5; min-height: 100vh; padding: 100px 20px 40px; font-family: 'Segoe UI', system-ui, sans-serif; }
//         .profile-wrapper { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 240px 1fr 280px; gap: 18px; }
        
//         /* Sidebar Styling */
//         .sidebar { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 20px; position: sticky; top: 100px; height: fit-content; }
//         .sidebar-title { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
//         .sidebar-sub { font-size: 12px; color: #94a3b8; margin-bottom: 18px; }
//         .avatar { width: 45px; height: 45px; border-radius: 50%; background: #dbeafe; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #1e40af; margin-bottom: 15px; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
//         /* NavLink specific styles */
//         .sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
//         .nav-link-item { display: flex; align-items: center; gap: 12px; padding: 12px 15px; border-radius: 10px; font-size: 14px; color: #64748b; text-decoration: none; transition: 0.3s; }
//         .nav-link-item:hover { background: #f8fafc; color: #1e3a8a; }
//         .nav-link-item.active { background: #eef2ff; color: #1e3a8a; font-weight: 700; border-left: 4px solid #1e3a8a; }
//         .nav-link-item svg { font-size: 16px; }

//         .stat-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-top: 16px; font-weight: 600; }
//         .stat-val { font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 2px; }
//         .stat-green { color: #16a34a; display: flex; align-items: center; gap: 6px; }

//         /* Main Styling */
//         .main { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
//         .main-header { display: flex; align-items: center; justify-content: space-between; }
//         .main-title { font-size: 22px; font-weight: 800; color: #0f172a; }
//         .main-sub { font-size: 13px; color: #94a3b8; margin-top: 3px; }
//         .search-box { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 999px; padding: 8px 16px; gap: 8px; }
//         .search-box input { border: none; background: transparent; font-size: 13px; color: #0f172a; outline: none; width: 150px; }
//         .search-btn { background: #1e3a8a; border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; font-size: 12px; }

//         .tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
//         .tab { padding: 8px 18px; border-radius: 999px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; background: #f1f5f9; color: #64748b; transition: 0.2s; }
//         .tab.active { background: #1e3a8a; color: #fff; }

//         .booking-list { display: flex; flex-direction: column; gap: 12px; }
//         .booking-card { display: grid; grid-template-columns: 110px 1fr auto; gap: 14px; padding: 14px; border-radius: 14px; border: 1px solid #e5e7eb; align-items: center; transition: 0.2s; }
//         .booking-card:hover { border-color: #cbd5e1; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
//         .booking-img { width: 110px; height: 90px; border-radius: 10px; object-fit: cover; }
//         .booking-body { display: flex; flex-direction: column; gap: 6px; }
//         .booking-name { font-size: 14px; font-weight: 700; color: #0f172a; }
//         .booking-loc { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 4px; }
//         .booking-meta { display: flex; gap: 10px; }
//         .meta-tag { background: #f1f5f9; border-radius: 6px; padding: 3px 10px; font-size: 11px; color: #334155; }
//         .booking-price { font-size: 18px; font-weight: 800; color: #1e3a8a; margin-top: 4px; }
//         .booking-side { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; min-width: 120px; }

//         .badge { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; border-radius: 999px; font-size: 11px; font-weight: 700; }
//         .badge.approved { background: #dcfce7; color: #166534; }
//         .badge.pending { background: #fef9c3; color: #854d0e; }
//         .badge.declined { background: #fee2e2; color: #991b1b; }
//         .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
//         .dot.approved { background: #16a34a; }
//         .dot.pending { background: #ca8a04; }
//         .dot.declined { background: #dc2626; }

//         .actions-row { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
//         .action-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid #cbd5e1; background: #fff; font-size: 12px; font-weight: 600; cursor: pointer; color: #0f172a; }
//         .action-btn.primary { background: #1e3a8a; color: #fff; border-color: transparent; }
//         .action-btn.danger { color: #dc2626; border-color: #fca5a5; }

//         .load-more { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff; font-weight: 700; color: #1e3a8a; font-size: 14px; cursor: pointer; }
//         .empty-msg { text-align: center; padding: 32px; color: #94a3b8; font-size: 13px; }
//         .error-state { background: #fee2e2; color: #dc2626; border-radius: 10px; padding: 16px; font-size: 13px; }

//         .aside { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
//         .tips-card { background: #eff6ff; border-radius: 12px; padding: 16px; }
//         .tips-title { font-size: 14px; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; }
//         .tip-item { display: flex; gap: 8px; margin-bottom: 10px; }
//         .tip-num { width: 20px; height: 20px; border-radius: 50%; background: #1e3a8a; color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
//         .tip-text { font-size: 12px; color: #1e40af; line-height: 1.5; }

//         .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
//         .cal-month { font-size: 14px; font-weight: 700; color: #0f172a; }
//         .cal-nav-btn { border: none; background: none; color: #94a3b8; font-size: 18px; cursor: pointer; }
//         .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-bottom: 12px; }
//         .cal-lbl { text-align: center; font-size: 10px; color: #94a3b8; font-weight: 700; padding: 2px 0; }
//         .cal-day { text-align: center; font-size: 12px; padding: 5px 2px; border-radius: 6px; color: #334155; }
//         .cal-day.today { background: #1e3a8a; color: #fff; font-weight: 700; border-radius: 50%; }
//         .cal-day.booked { color: #1e3a8a; font-weight: 700; background: #e0e7ff; }
//         .cal-day.dimmed { color: #cbd5e1; }
//         .cal-notes { display: flex; flex-direction: column; gap: 8px; }
//         .cal-note { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: #475569; }
//         .cal-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 3px; flex-shrink: 0; }
//         .cal-dot.blue { background: #1e3a8a; }
//         .cal-dot.empty { border: 1px solid #94a3b8; }

//         @media (max-width: 1024px) { .profile-wrapper { grid-template-columns: 1fr; } }
//         @media (max-width: 768px) { .booking-card { grid-template-columns: 1fr; } .main-header { flex-direction: column; align-items: flex-start; gap: 15px; } }
//       `}</style>

//       <div className="profile-wrapper">
//         {/* Sidebar */}
//         <DashboardSidebar />

//         {/* Main */}
//         <section className="main">
//           <div className="main-header">
//             <div>
//               <div className="main-title">My Bookings</div>
//               <div className="main-sub">Manage your requests and track the status of your upcoming stays</div>
//             </div>
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search by location"
//                 value={locInput}
//                 onChange={e => setLocInput(e.target.value)}
//               />
//               <button className="search-btn">🔍</button>
//             </div>
//           </div>

//           <div className="tabs">
//             {STATUS_TABS.map(tab => (
//               <button
//                 key={tab.value}
//                 className={`tab ${currentTab === tab.value ? 'active' : ''}`}
//                 onClick={() => setCurrentTab(tab.value)}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {error && <div className="error-state">{error}</div>}
//           {loading && <div className="empty-msg">Loading your booking requests...</div>}

//           <div className="booking-list">
//             {!loading && filtered.length === 0 && !error && (
//               <div className="empty-msg">No booking requests found</div>
//             )}
//             {filtered.slice(0, visibleCount).map((item, index) => {
//               const cls = badgeCls(item.status);
//               const img = item.coverImage || 'https://via.placeholder.com/110x90?text=Room';
//               return (
//                 <div className="booking-card" key={`${item.id || index}-${index}`}>
//                   <img
//                     className="booking-img"
//                     src={img}
//                     alt="room"
//                     onError={e => { e.target.src = 'https://via.placeholder.com/110x90?text=Room'; }}
//                   />
//                   <div className="booking-body">
//                     <div className="booking-name">{item.title || item.propertyName || 'Booking request'}</div>
//                     <div className="booking-loc">📍 {getLocation(item)}</div>
//                     <div className="booking-meta">
//                       {item.moveInDate && <span className="meta-tag">Move in : {fmt(item.moveInDate)}</span>}
//                       {item.duration && <span className="meta-tag">{item.duration} Months</span>}
//                     </div>
//                     <div className="booking-price">{getPrice(item)}</div>
//                   </div>
//                   <div className="booking-side">
//                     <span className={`badge ${cls}`}>
//                       <div className={`dot ${cls}`} />
//                       {item.status || 'Pending'}
//                     </span>
//                     <div className="actions-row">
//                       {cls === 'approved' && (
//                         <button className="action-btn primary">💬 Chat with host</button>
//                       )}
//                       {cls === 'pending' && (
//                         <>
//                           <button className="action-btn" onClick={() => navigate(`/booking/${item.id}`)}>Details</button>
//                           <button className="action-btn danger">Cancel</button>
//                         </>
//                       )}
//                       {cls === 'declined' && (
//                         <button className="action-btn danger">Delete</button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {filtered.length > visibleCount && (
//             <button className="load-more" onClick={() => setVisibleCount(v => v + 5)}>
//               Load More Requests
//             </button>
//           )}
//         </section>

//         {/* Aside */}
//         <aside className="aside">
//           <div className="tips-card">
//             <div className="tips-title">Renter tips</div>
//             <div className="tip-item">
//               <div className="tip-num">1</div>
//               <div className="tip-text">Message the host immediately after approval to arrange a viewing</div>
//             </div>
//             <div className="tip-item">
//               <div className="tip-num">2</div>
//               <div className="tip-text">Complete your profile to increase your acceptance rate</div>
//             </div>
//           </div>

//           {/* Calendar */}
//           <div>
//             <div className="cal-header">
//               <span className="cal-month">{MONTHS[calDate.getMonth()]} {calDate.getFullYear()}</span>
//               <div>
//                 <button className="cal-nav-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))}>‹</button>
//                 <button className="cal-nav-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))}>›</button>
//               </div>
//             </div>
//             <div className="cal-grid">
//               {DAYS_SHORT.map((d, i) => <div key={i} className="cal-lbl">{d}</div>)}
//               {calCells.map((cell, i) => (
//                 <div key={i} className={`cal-day ${cell.type}`}>{cell.day}</div>
//               ))}
//             </div>
//             <div className="cal-notes">
//               {calEvents.length > 0 ? calEvents.map((e, i) => (
//                 <div key={i} className="cal-note">
//                   <div className={`cal-dot ${i === 0 ? 'blue' : 'empty'}`} />
//                   <span><strong>{MONTHS[e.date.getMonth()].slice(0, 3)} {e.date.getDate()}:</strong> {e.title}</span>
//                 </div>
//               )) : (
//                 <>
//                   <div className="cal-note"><div className="cal-dot blue" /><span><strong>Oct 1:</strong> Move-in to Maadi</span></div>
//                   <div className="cal-note"><div className="cal-dot empty" /><span><strong>Oct 10:</strong> Viewing in Dokki</span></div>
//                 </>
//               )}
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default Profile;














// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import DashboardSidebar from '../Shared/DashboardSidebar';

// const API_BASE = 'https://graduationproject1.runasp.net/api/Booking';
// const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
// const DAYS_SHORT = ['S','M','T','W','T','F','S'];

// const fmt = (dateStr) => {
//   if (!dateStr) return '';
//   const d = new Date(dateStr);
//   if (isNaN(d)) return dateStr;
//   return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// };

// const getLocation = (item) => {
//   if (item.location?.fullAddress) return item.location.fullAddress;
//   if (item.location?.city) return [item.location.street, item.location.city].filter(Boolean).join(', ');
//   return item.location || item.city || item.address || 'Unknown location';
// };

// const getPrice = (item) => {
//   if (item.monthlyPrice) return `${Number(item.monthlyPrice).toLocaleString()} EGP / month`;
//   if (item.price) return `${Number(item.price).toLocaleString()} EGP / month`;
//   if (item.totalPrice) return `${Number(item.totalPrice).toLocaleString()} EGP`;
//   return 'Price not available';
// };

// const badgeCls = (status) => {
//   const s = String(status || '').toLowerCase();
//   if (s.includes('approved')) return 'approved';
//   if (s.includes('pending')) return 'pending';
//   return 'declined';
// };

// const STATUS_TABS = [
//   { value: '', label: 'All Requests' },
//   { value: 'Pending', label: 'Pending' },
//   { value: 'Approved', label: 'Approved' },
//   { value: 'Declined', label: 'Past/Declined' },
// ];

// const Profile = () => {
//   const navigate = useNavigate();
//   const [allBookings, setAllBookings] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [currentTab, setCurrentTab] = useState('');
//   const [locInput, setLocInput] = useState('');
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [calDate, setCalDate] = useState(new Date());

//   const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     applyFilters(allBookings, currentTab, locInput);
//   }, [currentTab, locInput, allBookings]);

//   const fetchBookings = async () => {
//     if (!token) {
//       setError('Please login to see your bookings.');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     try {
//       const res = await axios.get(`${API_BASE}/my-bookings?page=1&pageSize=50`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = res.data;
//       const items = Array.isArray(data) ? data
//         : Array.isArray(data?.items) ? data.items
//         : Array.isArray(data?.bookings) ? data.bookings
//         : Array.isArray(data?.data?.bookings) ? data.data.bookings
//         : Array.isArray(data?.data) ? data.data : [];
//       setAllBookings(items);
//       if (items.length > 0 && items[0].moveInDate) {
//         const d = new Date(items[0].moveInDate);
//         if (!isNaN(d)) setCalDate(new Date(d.getFullYear(), d.getMonth(), 1));
//       }
//     } catch (e) {
//       setError(e?.response?.data?.message || 'Unable to load bookings.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const applyFilters = (bookings, tab, loc) => {
//     const result = bookings.filter(item => {
//       const matchTab = !tab || String(item.status || '').toLowerCase().includes(tab.toLowerCase());
//       const matchLoc = !loc || getLocation(item).toLowerCase().includes(loc.toLowerCase());
//       return matchTab && matchLoc;
//     });
//     setFiltered(result);
//     setVisibleCount(5);
//   };

//   const bookedDays = new Set(
//     allBookings
//       .filter(item => item.moveInDate)
//       .map(item => {
//         const d = new Date(item.moveInDate);
//         if (d.getMonth() === calDate.getMonth() && d.getFullYear() === calDate.getFullYear()) return d.getDate();
//         return null;
//       })
//       .filter(Boolean)
//   );

//   const calEvents = allBookings
//     .filter(item => item.moveInDate)
//     .map(item => ({ date: new Date(item.moveInDate), title: item.title || 'Booking' }))
//     .filter(e => !isNaN(e.date) && e.date.getMonth() === calDate.getMonth() && e.date.getFullYear() === calDate.getFullYear())
//     .slice(0, 3);

//   const firstDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay();
//   const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();
//   const prevMonthDays = new Date(calDate.getFullYear(), calDate.getMonth(), 0).getDate();
//   const today = new Date();

//   const calCells = [];
//   for (let i = firstDay - 1; i >= 0; i--) calCells.push({ day: prevMonthDays - i, type: 'dimmed' });
//   for (let d = 1; d <= daysInMonth; d++) {
//     const isToday = today.getDate() === d && today.getMonth() === calDate.getMonth() && today.getFullYear() === calDate.getFullYear();
//     const isBooked = bookedDays.has(d);
//     calCells.push({ day: d, type: isToday ? 'today' : isBooked ? 'booked' : 'normal' });
//   }

//   return (
//     <div className="profile-page">
//       <style>{`
//         .profile-page { background: #f0f2f5; min-height: 100vh; padding: 100px 20px 40px; font-family: 'Segoe UI', system-ui, sans-serif; }
//         .profile-wrapper { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 240px 1fr 280px; gap: 18px; }
        
//         /* Sidebar Styling */
//         .sidebar { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 20px; position: sticky; top: 100px; height: fit-content; }
//         .sidebar-title { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
//         .sidebar-sub { font-size: 12px; color: #94a3b8; margin-bottom: 18px; }
//         .avatar { width: 45px; height: 45px; border-radius: 50%; background: #dbeafe; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #1e40af; margin-bottom: 15px; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
//         /* NavLink specific styles */
//         .sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
//         .nav-link-item { display: flex; align-items: center; gap: 12px; padding: 12px 15px; border-radius: 10px; font-size: 14px; color: #64748b; text-decoration: none; transition: 0.3s; }
//         .nav-link-item:hover { background: #f8fafc; color: #1e3a8a; }
//         .nav-link-item.active { background: #eef2ff; color: #1e3a8a; font-weight: 700; border-left: 4px solid #1e3a8a; }
//         .nav-link-item svg { font-size: 16px; }

//         .stat-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-top: 16px; font-weight: 600; }
//         .stat-val { font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 2px; }
//         .stat-green { color: #16a34a; display: flex; align-items: center; gap: 6px; }

//         /* Main Styling */
//         .main { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
//         .main-header { display: flex; align-items: center; justify-content: space-between; }
//         .main-title { font-size: 22px; font-weight: 800; color: #0f172a; }
//         .main-sub { font-size: 13px; color: #94a3b8; margin-top: 3px; }
//         .search-box { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 999px; padding: 8px 16px; gap: 8px; }
//         .search-box input { border: none; background: transparent; font-size: 13px; color: #0f172a; outline: none; width: 150px; }
//         .search-btn { background: #1e3a8a; border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; font-size: 12px; }

//         .tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
//         .tab { padding: 8px 18px; border-radius: 999px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; background: #f1f5f9; color: #64748b; transition: 0.2s; }
//         .tab.active { background: #1e3a8a; color: #fff; }

//         .booking-list { display: flex; flex-direction: column; gap: 12px; }
//         .booking-card { display: grid; grid-template-columns: 110px 1fr auto; gap: 14px; padding: 14px; border-radius: 14px; border: 1px solid #e5e7eb; align-items: center; transition: 0.2s; }
//         .booking-card:hover { border-color: #cbd5e1; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
//         .booking-img { width: 110px; height: 90px; border-radius: 10px; object-fit: cover; }
//         .booking-body { display: flex; flex-direction: column; gap: 6px; }
//         .booking-name { font-size: 14px; font-weight: 700; color: #0f172a; }
//         .booking-loc { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 4px; }
//         .booking-meta { display: flex; gap: 10px; }
//         .meta-tag { background: #f1f5f9; border-radius: 6px; padding: 3px 10px; font-size: 11px; color: #334155; }
//         .booking-price { font-size: 18px; font-weight: 800; color: #1e3a8a; margin-top: 4px; }
//         .booking-side { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; min-width: 120px; }

//         .badge { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; border-radius: 999px; font-size: 11px; font-weight: 700; }
//         .badge.approved { background: #dcfce7; color: #166534; }
//         .badge.pending { background: #fef9c3; color: #854d0e; }
//         .badge.declined { background: #fee2e2; color: #991b1b; }
//         .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
//         .dot.approved { background: #16a34a; }
//         .dot.pending { background: #ca8a04; }
//         .dot.declined { background: #dc2626; }

//         .actions-row { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
//         .action-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid #cbd5e1; background: #fff; font-size: 12px; font-weight: 600; cursor: pointer; color: #0f172a; }
//         .action-btn.primary { background: #1e3a8a; color: #fff; border-color: transparent; }
//         .action-btn.secondary { background: #f3f4f6; color: #475569; border-color: #cbd5e1; }
//         .action-btn.danger { color: #dc2626; border-color: #fca5a5; }

//         .load-more { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff; font-weight: 700; color: #1e3a8a; font-size: 14px; cursor: pointer; }
//         .empty-msg { text-align: center; padding: 32px; color: #94a3b8; font-size: 13px; }
//         .error-state { background: #fee2e2; color: #dc2626; border-radius: 10px; padding: 16px; font-size: 13px; }

//         .aside { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
//         .tips-card { background: #eff6ff; border-radius: 12px; padding: 16px; }
//         .tips-title { font-size: 14px; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; }
//         .tip-item { display: flex; gap: 8px; margin-bottom: 10px; }
//         .tip-num { width: 20px; height: 20px; border-radius: 50%; background: #1e3a8a; color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
//         .tip-text { font-size: 12px; color: #1e40af; line-height: 1.5; }

//         .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
//         .cal-month { font-size: 14px; font-weight: 700; color: #0f172a; }
//         .cal-nav-btn { border: none; background: none; color: #94a3b8; font-size: 18px; cursor: pointer; }
//         .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-bottom: 12px; }
//         .cal-lbl { text-align: center; font-size: 10px; color: #94a3b8; font-weight: 700; padding: 2px 0; }
//         .cal-day { text-align: center; font-size: 12px; padding: 5px 2px; border-radius: 6px; color: #334155; }
//         .cal-day.today { background: #1e3a8a; color: #fff; font-weight: 700; border-radius: 50%; }
//         .cal-day.booked { color: #1e3a8a; font-weight: 700; background: #e0e7ff; }
//         .cal-day.dimmed { color: #cbd5e1; }
//         .cal-notes { display: flex; flex-direction: column; gap: 8px; }
//         .cal-note { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: #475569; }
//         .cal-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 3px; flex-shrink: 0; }
//         .cal-dot.blue { background: #1e3a8a; }
//         .cal-dot.empty { border: 1px solid #94a3b8; }

//         @media (max-width: 1024px) { .profile-wrapper { grid-template-columns: 1fr; } }
//         @media (max-width: 768px) { .booking-card { grid-template-columns: 1fr; } .main-header { flex-direction: column; align-items: flex-start; gap: 15px; } }
//       `}</style>

//       <div className="profile-wrapper">
//         {/* Sidebar */}
//         <DashboardSidebar />

//         {/* Main */}
//         <section className="main">
//           <div className="main-header">
//             <div>
//               <div className="main-title">My Bookings</div>
//               <div className="main-sub">Manage your requests and track the status of your upcoming stays</div>
//             </div>
//             <div className="search-box">
//               <input
//                 type="text"
//                 placeholder="Search by location"
//                 value={locInput}
//                 onChange={e => setLocInput(e.target.value)}
//               />
//               <button className="search-btn">🔍</button>
//             </div>
//           </div>

//           <div className="tabs">
//             {STATUS_TABS.map(tab => (
//               <button
//                 key={tab.value}
//                 className={`tab ${currentTab === tab.value ? 'active' : ''}`}
//                 onClick={() => setCurrentTab(tab.value)}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {error && <div className="error-state">{error}</div>}
//           {loading && <div className="empty-msg">Loading your booking requests...</div>}

//           <div className="booking-list">
//             {!loading && filtered.length === 0 && !error && (
//               <div className="empty-msg">No booking requests found</div>
//             )}
//             {filtered.slice(0, visibleCount).map((item, index) => {
//               const cls = badgeCls(item.status);
//               const img = item.coverImage || 'https://via.placeholder.com/110x90?text=Room';
//               return (
//                 <div className="booking-card" key={`${item.id || index}-${index}`}>
//                   <img
//                     className="booking-img"
//                     src={img}
//                     alt="room"
//                     onError={e => { e.target.src = 'https://via.placeholder.com/110x90?text=Room'; }}
//                   />
//                   <div className="booking-body">
//                     <div className="booking-name">{item.title || item.propertyName || 'Booking request'}</div>
//                     <div className="booking-loc">📍 {getLocation(item)}</div>
//                     <div className="booking-meta">
//                       {item.moveInDate && <span className="meta-tag">Move in : {fmt(item.moveInDate)}</span>}
//                       {item.duration && <span className="meta-tag">{item.duration} Months</span>}
//                     </div>
//                     <div className="booking-price">{getPrice(item)}</div>
//                   </div>
//                   <div className="booking-side">
//                     <span className={`badge ${cls}`}>
//                       <div className={`dot ${cls}`} />
//                       {item.status || 'Pending'}
//                     </span>
//                     <div className="actions-row">
//                       {cls === 'approved' && (
//                         <>
//                           <button className="action-btn primary">💬 Chat with host</button>
//                           <button className="action-btn secondary" onClick={() => navigate('/addrivews')}>Add Review</button>
//                         </>
//                       )}
//                       {cls === 'pending' && (
//                         <>
//                           <button className="action-btn" onClick={() => navigate(`/booking/${item.id}`)}>Details</button>
//                           <button className="action-btn danger">Cancel</button>
//                         </>
//                       )}
//                       {cls === 'declined' && (
//                         <button className="action-btn danger">Delete</button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {filtered.length > visibleCount && (
//             <button className="load-more" onClick={() => setVisibleCount(v => v + 5)}>
//               Load More Requests
//             </button>
//           )}
//         </section>

//         {/* Aside */}
//         <aside className="aside">
//           <div className="tips-card">
//             <div className="tips-title">Renter tips</div>
//             <div className="tip-item">
//               <div className="tip-num">1</div>
//               <div className="tip-text">Message the host immediately after approval to arrange a viewing</div>
//             </div>
//             <div className="tip-item">
//               <div className="tip-num">2</div>
//               <div className="tip-text">Complete your profile to increase your acceptance rate</div>
//             </div>
//           </div>

//           {/* Calendar */}
//           <div>
//             <div className="cal-header">
//               <span className="cal-month">{MONTHS[calDate.getMonth()]} {calDate.getFullYear()}</span>
//               <div>
//                 <button className="cal-nav-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))}>‹</button>
//                 <button className="cal-nav-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))}>›</button>
//               </div>
//             </div>
//             <div className="cal-grid">
//               {DAYS_SHORT.map((d, i) => <div key={i} className="cal-lbl">{d}</div>)}
//               {calCells.map((cell, i) => (
//                 <div key={i} className={`cal-day ${cell.type}`}>{cell.day}</div>
//               ))}
//             </div>
//             <div className="cal-notes">
//               {calEvents.length > 0 ? calEvents.map((e, i) => (
//                 <div key={i} className="cal-note">
//                   <div className={`cal-dot ${i === 0 ? 'blue' : 'empty'}`} />
//                   <span><strong>{MONTHS[e.date.getMonth()].slice(0, 3)} {e.date.getDate()}:</strong> {e.title}</span>
//                 </div>
//               )) : (
//                 <>
//                   <div className="cal-note"><div className="cal-dot blue" /><span><strong>Oct 1:</strong> Move-in to Maadi</span></div>
//                   <div className="cal-note"><div className="cal-dot empty" /><span><strong>Oct 10:</strong> Viewing in Dokki</span></div>
//                 </>
//               )}
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default Profile;




























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '../Shared/DashboardSidebar';

const API_BASE = 'https://graduationproject1.runasp.net/api/Booking';
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS_SHORT = ['S','M','T','W','T','F','S'];

const fmt = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getLocation = (item) => {
  if (item.location?.fullAddress) return item.location.fullAddress;
  if (item.location?.city) return [item.location.street, item.location.city].filter(Boolean).join(', ');
  return item.location || item.city || item.address || 'Unknown location';
};

const getPrice = (item) => {
  if (item.monthlyPrice) return `${Number(item.monthlyPrice).toLocaleString()} EGP / month`;
  if (item.price) return `${Number(item.price).toLocaleString()} EGP / month`;
  if (item.totalPrice) return `${Number(item.totalPrice).toLocaleString()} EGP`;
  return 'Price not available';
};

const badgeCls = (status) => {
  const s = String(status || '').toLowerCase();
  if (s.includes('approved') || s.includes('completed')) return 'approved';
  if (s.includes('pending')) return 'pending';
  return 'declined';
};

const STATUS_TABS = [
  { value: '', label: 'All Requests' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Declined', label: 'Past/Declined' },
];

const Profile = () => {
  const navigate = useNavigate();
  const [allBookings, setAllBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentTab, setCurrentTab] = useState('');
  const [locInput, setLocInput] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  const [calDate, setCalDate] = useState(new Date());

  const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    applyFilters(allBookings, currentTab, locInput);
  }, [currentTab, locInput, allBookings]);

  const fetchBookings = async () => {
    if (!token) {
      setError('Please login to see your bookings.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_BASE}/my-bookings?page=1&pageSize=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('API Response:', res.id || res.data || res);
      const data = res.data;
      const items = Array.isArray(data) ? data
        : Array.isArray(data?.items) ? data.items
        : Array.isArray(data?.bookings) ? data.bookings
        : Array.isArray(data?.data?.bookings) ? data.data.bookings
        : Array.isArray(data?.data) ? data.data : [];
      setAllBookings(items);
      if (items.length > 0 && items[0].moveInDate) {
        const d = new Date(items[0].moveInDate);
        if (!isNaN(d)) setCalDate(new Date(d.getFullYear(), d.getMonth(), 1));
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Unable to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (bookings, tab, loc) => {
    const result = bookings.filter(item => {
      const matchTab = !tab || String(item.status || '').toLowerCase().includes(tab.toLowerCase());
      const matchLoc = !loc || getLocation(item).toLowerCase().includes(loc.toLowerCase());
      return matchTab && matchLoc;
    });
    setFiltered(result);
    setVisibleCount(5);
  };

  const bookedDays = new Set(
    allBookings
      .filter(item => item.moveInDate)
      .map(item => {
        const d = new Date(item.moveInDate);
        if (d.getMonth() === calDate.getMonth() && d.getFullYear() === calDate.getFullYear()) return d.getDate();
        return null;
      })
      .filter(Boolean)
  );

  const calEvents = allBookings
    .filter(item => item.moveInDate)
    .map(item => ({ date: new Date(item.moveInDate), title: item.title || 'Booking' }))
    .filter(e => !isNaN(e.date) && e.date.getMonth() === calDate.getMonth() && e.date.getFullYear() === calDate.getFullYear())
    .slice(0, 3);

  const firstDay = new Date(calDate.getFullYear(), calDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(calDate.getFullYear(), calDate.getMonth() + 1, 0).getDate();
  const prevMonthDays = new Date(calDate.getFullYear(), calDate.getMonth(), 0).getDate();
  const today = new Date();

  const calCells = [];
  for (let i = firstDay - 1; i >= 0; i--) calCells.push({ day: prevMonthDays - i, type: 'dimmed' });
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = today.getDate() === d && today.getMonth() === calDate.getMonth() && today.getFullYear() === calDate.getFullYear();
    const isBooked = bookedDays.has(d);
    calCells.push({ day: d, type: isToday ? 'today' : isBooked ? 'booked' : 'normal' });
  }

  return (
    <div className="profile-page">
      <style>{`
        .profile-page { background: #f0f2f5; min-height: 100vh; padding: 100px 20px 40px; font-family: 'Segoe UI', system-ui, sans-serif; }
        .profile-wrapper { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 240px 1fr 280px; gap: 18px; }
        
        /* Sidebar Styling */
        .sidebar { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 20px; position: sticky; top: 100px; height: fit-content; }
        .sidebar-title { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
        .sidebar-sub { font-size: 12px; color: #94a3b8; margin-bottom: 18px; }
        .avatar { width: 45px; height: 45px; border-radius: 50%; background: #dbeafe; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #1e40af; margin-bottom: 15px; border: 2px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
        /* NavLink specific styles */
        .sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
        .nav-link-item { display: flex; align-items: center; gap: 12px; padding: 12px 15px; border-radius: 10px; font-size: 14px; color: #64748b; text-decoration: none; transition: 0.3s; }
        .nav-link-item:hover { background: #f8fafc; color: #1e3a8a; }
        .nav-link-item.active { background: #eef2ff; color: #1e3a8a; font-weight: 700; border-left: 4px solid #1e3a8a; }
        .nav-link-item svg { font-size: 16px; }

        .stat-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; margin-top: 16px; font-weight: 600; }
        .stat-val { font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 2px; }
        .stat-green { color: #16a34a; display: flex; align-items: center; gap: 6px; }

        /* Main Styling */
        .main { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
        .main-header { display: flex; align-items: center; justify-content: space-between; }
        .main-title { font-size: 22px; font-weight: 800; color: #0f172a; }
        .main-sub { font-size: 13px; color: #94a3b8; margin-top: 3px; }
        .search-box { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 999px; padding: 8px 16px; gap: 8px; }
        .search-box input { border: none; background: transparent; font-size: 13px; color: #0f172a; outline: none; width: 150px; }
        .search-btn { background: #1e3a8a; border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; font-size: 12px; }

        .tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
        .tab { padding: 8px 18px; border-radius: 999px; font-size: 13px; font-weight: 600; border: none; cursor: pointer; background: #f1f5f9; color: #64748b; transition: 0.2s; }
        .tab.active { background: #1e3a8a; color: #fff; }

        .booking-list { display: flex; flex-direction: column; gap: 12px; }
        .booking-card { display: grid; grid-template-columns: 110px 1fr auto; gap: 14px; padding: 14px; border-radius: 14px; border: 1px solid #e5e7eb; align-items: center; transition: 0.2s; }
        .booking-card:hover { border-color: #cbd5e1; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .booking-img { width: 110px; height: 90px; border-radius: 10px; object-fit: cover; }
        .booking-body { display: flex; flex-direction: column; gap: 6px; }
        .booking-name { font-size: 14px; font-weight: 700; color: #0f172a; }
        .booking-loc { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 4px; }
        .booking-meta { display: flex; gap: 10px; }
        .meta-tag { background: #f1f5f9; border-radius: 6px; padding: 3px 10px; font-size: 11px; color: #334155; }
        .booking-price { font-size: 18px; font-weight: 800; color: #1e3a8a; margin-top: 4px; }
        .booking-side { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; min-width: 120px; }

        .badge { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; border-radius: 999px; font-size: 11px; font-weight: 700; }
        .badge.approved { background: #dcfce7; color: #166534; }
        .badge.pending { background: #fef9c3; color: #854d0e; }
        .badge.declined { background: #fee2e2; color: #991b1b; }
        .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
        .dot.approved { background: #16a34a; }
        .dot.pending { background: #ca8a04; }
        .dot.declined { background: #dc2626; }

        .actions-row { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
        .action-btn { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid #cbd5e1; background: #fff; font-size: 12px; font-weight: 600; cursor: pointer; color: #0f172a; }
        .action-btn.primary { background: #1e3a8a; color: #fff; border-color: transparent; }
        .action-btn.secondary { background: #f3f4f6; color: #475569; border-color: #cbd5e1; }
        .action-btn.danger { color: #dc2626; border-color: #fca5a5; }

        .load-more { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid #e5e7eb; background: #fff; font-weight: 700; color: #1e3a8a; font-size: 14px; cursor: pointer; }
        .empty-msg { text-align: center; padding: 32px; color: #94a3b8; font-size: 13px; }
        .error-state { background: #fee2e2; color: #dc2626; border-radius: 10px; padding: 16px; font-size: 13px; }

        .aside { background: #fff; border-radius: 16px; border: 1px solid #e5e7eb; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
        .tips-card { background: #eff6ff; border-radius: 12px; padding: 16px; }
        .tips-title { font-size: 14px; font-weight: 700; color: #1e3a8a; margin-bottom: 12px; }
        .tip-item { display: flex; gap: 8px; margin-bottom: 10px; }
        .tip-num { width: 20px; height: 20px; border-radius: 50%; background: #1e3a8a; color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .tip-text { font-size: 12px; color: #1e40af; line-height: 1.5; }

        .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .cal-month { font-size: 14px; font-weight: 700; color: #0f172a; }
        .cal-nav-btn { border: none; background: none; color: #94a3b8; font-size: 18px; cursor: pointer; }
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-bottom: 12px; }
        .cal-lbl { text-align: center; font-size: 10px; color: #94a3b8; font-weight: 700; padding: 2px 0; }
        .cal-day { text-align: center; font-size: 12px; padding: 5px 2px; border-radius: 6px; color: #334155; }
        .cal-day.today { background: #1e3a8a; color: #fff; font-weight: 700; border-radius: 50%; }
        .cal-day.booked { color: #1e3a8a; font-weight: 700; background: #e0e7ff; }
        .cal-day.dimmed { color: #cbd5e1; }
        .cal-notes { display: flex; flex-direction: column; gap: 8px; }
        .cal-note { display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: #475569; }
        .cal-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 3px; flex-shrink: 0; }
        .cal-dot.blue { background: #1e3a8a; }
        .cal-dot.empty { border: 1px solid #94a3b8; }

        @media (max-width: 1024px) { .profile-wrapper { grid-template-columns: 1fr; } }
        @media (max-width: 768px) { .booking-card { grid-template-columns: 1fr; } .main-header { flex-direction: column; align-items: flex-start; gap: 15px; } }
      `}</style>

      <div className="profile-wrapper">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main */}
        <section className="main">
          <div className="main-header">
            <div>
              <div className="main-title">My Bookings</div>
              <div className="main-sub">Manage your requests and track the status of your upcoming stays</div>
            </div>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by location"
                value={locInput}
                onChange={e => setLocInput(e.target.value)}
              />
              <button className="search-btn">🔍</button>
            </div>
          </div>

          <div className="tabs">
            {STATUS_TABS.map(tab => (
              <button
                key={tab.value}
                className={`tab ${currentTab === tab.value ? 'active' : ''}`}
                onClick={() => setCurrentTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {error && <div className="error-state">{error}</div>}
          {loading && <div className="empty-msg">Loading your booking requests...</div>}

          <div className="booking-list">
            {!loading && filtered.length === 0 && !error && (
              <div className="empty-msg">No booking requests found</div>
            )}
            {filtered.slice(0, visibleCount).map((item, index) => {
              const cls = badgeCls(item.status);
              const img = item.coverImage || 'https://via.placeholder.com/110x90?text=Room';
              return (
                <div className="booking-card" key={`${item.id || index}-${index}`}>
                  <img
                    className="booking-img"
                    src={img}
                    alt="room"
                    onError={e => { e.target.src = 'https://via.placeholder.com/110x90?text=Room'; }}
                  />
                  <div className="booking-body">
                    <div className="booking-name">{item.title || item.propertyName || 'Booking request'}</div>
                    <div className="booking-loc">📍 {getLocation(item)}</div>
                    <div className="booking-meta">
                      {item.moveInDate && <span className="meta-tag">Move in : {fmt(item.moveInDate)}</span>}
                      {item.duration && <span className="meta-tag">{item.duration} Months</span>}
                    </div>
                    <div className="booking-price">{getPrice(item)}</div>
                  </div>
                  <div className="booking-side">
                    <span className={`badge ${cls}`}>
                      <div className={`dot ${cls}`} />
                      {item.status || 'Pending'}
                    </span>
                    <div className="actions-row">
                      {cls === 'approved' && (
                        <>
                          <button className="action-btn primary">💬 Chat with host</button>
                          <button className="action-btn secondary" onClick={() => navigate(`/add-review/${item.id}`)}>Add Review</button>
                        </>
                      )}
                      {cls === 'pending' && (
                        <>
                          <button className="action-btn" onClick={() => navigate(`/booking/${item.id}`)}>Details</button>
                          <button className="action-btn danger">Cancel</button>
                        </>
                      )}
                      {cls === 'declined' && (
                        <button className="action-btn danger">Delete</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length > visibleCount && (
            <button className="load-more" onClick={() => setVisibleCount(v => v + 5)}>
              Load More Requests
            </button>
          )}
        </section>

        {/* Aside */}
        <aside className="aside">
          <div className="tips-card">
            <div className="tips-title">Renter tips</div>
            <div className="tip-item">
              <div className="tip-num">1</div>
              <div className="tip-text">Message the host immediately after approval to arrange a viewing</div>
            </div>
            <div className="tip-item">
              <div className="tip-num">2</div>
              <div className="tip-text">Complete your profile to increase your acceptance rate</div>
            </div>
          </div>

          {/* Calendar */}
          <div>
            <div className="cal-header">
              <span className="cal-month">{MONTHS[calDate.getMonth()]} {calDate.getFullYear()}</span>
              <div>
                <button className="cal-nav-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() - 1, 1))}>‹</button>
                <button className="cal-nav-btn" onClick={() => setCalDate(new Date(calDate.getFullYear(), calDate.getMonth() + 1, 1))}>›</button>
              </div>
            </div>
            <div className="cal-grid">
              {DAYS_SHORT.map((d, i) => <div key={i} className="cal-lbl">{d}</div>)}
              {calCells.map((cell, i) => (
                <div key={i} className={`cal-day ${cell.type}`}>{cell.day}</div>
              ))}
            </div>
            <div className="cal-notes">
              {calEvents.length > 0 ? calEvents.map((e, i) => (
                <div key={i} className="cal-note">
                  <div className={`cal-dot ${i === 0 ? 'blue' : 'empty'}`} />
                  <span><strong>{MONTHS[e.date.getMonth()].slice(0, 3)} {e.date.getDate()}:</strong> {e.title}</span>
                </div>
              )) : (
                <>
                  <div className="cal-note"><div className="cal-dot blue" /><span><strong>Oct 1:</strong> Move-in to Maadi</span></div>
                  <div className="cal-note"><div className="cal-dot empty" /><span><strong>Oct 10:</strong> Viewing in Dokki</span></div>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Profile;