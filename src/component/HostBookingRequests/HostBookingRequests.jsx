// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { NavLink } from 'react-router-dom';
// import { 
//   FaUser, FaHeart, FaBook, FaList, FaHome, 
//   FaRegCommentDots, FaCheck, FaTimes, FaChevronDown 
// } from 'react-icons/fa';

// const HostBookingRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState('pending'); // pending, approved, history
//   const [sortBy, setSortBy] = useState('newest');
//   const [page, setPage] = useState(1);

//   const API_URL = `https://graduationproject1.runasp.net/api/Booking/host-requests`;
//   const BASE_URL = "https://graduationproject1.runasp.net/";

//   useEffect(() => {
//     fetchRequests();
//   }, [status, sortBy, page]);

//   const fetchRequests = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('userToken')?.replace(/"/g, '');
//       const config = { 
//         headers: { 'Authorization': `Bearer ${token}` },
//         params: { status, sortBy, page, pageSize: 10 }
//       };
//       const res = await axios.get(API_URL, config);
//       // بناءً على هيكلة الـ API المتوقعة
//       setRequests(res.data.data?.items || res.data.items || res.data);
//     } catch (err) {
//       console.error("Error fetching host requests:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (id, action) => {
//     // هنا يتم استدعاء API القبول أو الرفض (Approve/Decline)
//     console.log(`Request ${id} action: ${action}`);
//     // بعد النجاح يتم تحديث القائمة
//     fetchRequests();
//   };

//   return (
//     <div className="host-layout">
//       {/* --- Sidebar (نفس تصميم البروفايل لتوحيد الهوية) --- */}
//       <aside className="sidebar">
//         <div className="sidebar-brand">
//           <h3>My Profile</h3>
//           <p>Manage your renter identity</p>
//         </div>
//         <nav className="nav-menu">
//           <NavLink to="/personal-info" className="nav-item"><FaUser /> Personal Info</NavLink>
//           <NavLink to="/booking-requests" className="nav-item active"><FaBook /> Booking Requests</NavLink>
//           <NavLink to="/my-properties" className="nav-item"><FaList /> My Properties</NavLink>
//           <NavLink to="/" className="nav-item"><FaHome /> Home</NavLink>
//         </nav>
//         <div className="sidebar-stats-card">
//            <div className="stat-item"><span className="lbl">PROFILE VIEWS</span><span className="val">124</span></div>
//            <div className="stat-item"><span className="lbl">STATUS</span><span className="status-active">Active</span></div>
//         </div>
//       </aside>

//       {/* --- Main Content --- */}
//       <main className="main-content">
//         <header className="page-header">
//           <h1>Booking Requests</h1>
//           <p>Manage incoming inquiries. Review compatibility and approve matches.</p>
//         </header>

//         {/* Filters & Tabs */}
//         <div className="controls-row">
//           <div className="tabs">
//             <button className={status === 'pending' ? 'tab active' : 'tab'} onClick={() => setStatus('pending')}>Pending</button>
//             <button className={status === 'approved' ? 'tab active' : 'tab'} onClick={() => setStatus('approved')}>Approved</button>
//             <button className={status === 'history' ? 'tab active' : 'tab'} onClick={() => setStatus('history')}>History</button>
//           </div>
//           <div className="sort-dropdown">
//             <span>Sort : <strong>{sortBy === 'newest' ? 'Newest' : 'Oldest'}</strong></span>
//             <FaChevronDown size={10} />
//           </div>
//         </div>

//         {/* Requests List */}
//         <div className="requests-container">
//           {loading ? (
//             <div className="loading">Loading requests...</div>
//           ) : requests.length === 0 ? (
//             <div className="empty">No booking requests found.</div>
//           ) : (
//             requests.map((req) => (
//               <div className="request-card" key={req.id}>
//                 <div className="card-top">
//                   {/* User Profile Info */}
//                   <div className="user-info-section">
//                     <div className="avatar-box">
//                       <img src={req.userImageUrl ? `${BASE_URL}${req.userImageUrl}` : 'https://via.placeholder.com/60'} alt="user" />
//                       <span className="match-badge">94 % Match</span>
//                     </div>
//                     <div className="user-details">
//                       <h4>{req.userName || "Marwa Khaled"}</h4>
//                       <p>{req.userJob || "Graphic designer"}, {req.userAge || "24"}</p>
//                     </div>
//                   </div>

//                   {/* Life Style & Habits */}
//                   <div className="habits-section">
//                     <h5>Life style & Habits</h5>
//                     <div className="habit-tags">
//                       {req.interests?.slice(0, 2).map((interest, i) => (
//                         <span key={i} className="habit-tag">{interest}</span>
//                       )) || (
//                         <>
//                           <span className="habit-tag">Early Bird</span>
//                           <span className="habit-tag">Social</span>
//                         </>
//                       )}
//                     </div>
//                     <p className="user-bio">"{req.userBio || "Looking for an inspiring room in Maadi..."}"</p>
//                   </div>

//                   {/* Property Preview */}
//                   <div className="property-preview-card">
//                     <img src={req.propertyImageUrl ? `${BASE_URL}${req.propertyImageUrl}` : 'https://via.placeholder.com/80'} alt="prop" />
//                     <div className="prop-text">
//                       <h6>{req.propertyTitle || "Sunny Room in Maadi"}</h6>
//                       <p>Private Room</p>
//                     </div>
//                     <div className="booking-details">
//                       <p className="dates">Oct 12 - Nov 12 (1 Month)</p>
//                       <p className="price">Total : <strong>EGP {req.totalPrice || "4,500"}</strong></p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Card Actions */}
//                 <div className="card-footer">
//                   <button className="msg-btn">
//                     <FaRegCommentDots /> Message {req.userName?.split(' ')[0] || "User"}
//                   </button>
//                   <div className="action-btns">
//                     <button className="decline-btn" onClick={() => handleAction(req.id, 'decline')}>Decline</button>
//                     <button className="approve-btn" onClick={() => handleAction(req.id, 'approve')}>Approve Request</button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </main>

//       <style jsx>{`
//         .host-layout { display: flex; background: #f8faff; min-height: 100vh; padding: 30px 5%; gap: 40px; font-family: 'Inter', sans-serif; }
        
//         /* Sidebar */
//         .sidebar { width: 240px; flex-shrink: 0; }
//         .sidebar-brand h3 { font-size: 1.3rem; margin-bottom: 5px; color: #1a1a1a; }
//         .sidebar-brand p { font-size: 0.8rem; color: #888; margin-bottom: 30px; }
//         .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px; color: #666; text-decoration: none; border-radius: 10px; font-weight: 500; transition: 0.2s; }
//         .nav-item.active { background: #edf2ff; color: #3b4afe; }
//         .sidebar-stats-card { margin-top: 30px; background: white; padding: 20px; border-radius: 15px; border: 1px solid #eee; }
//         .lbl { display: block; font-size: 10px; color: #aaa; font-weight: bold; }
//         .val { font-size: 1.4rem; font-weight: bold; }
//         .status-active { color: #2ecc71; font-weight: bold; font-size: 0.9rem; }

//         /* Main Content */
//         .main-content { flex: 1; }
//         .page-header h1 { font-size: 1.8rem; font-weight: 700; color: #111; }
//         .page-header p { color: #666; font-size: 0.95rem; margin-bottom: 30px; }

//         .controls-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
//         .tabs { display: flex; gap: 30px; border-bottom: 1px solid #e0e0e0; flex: 1; }
//         .tab { background: none; border: none; padding: 10px 5px; font-size: 1rem; color: #888; cursor: pointer; position: relative; font-weight: 600; }
//         .tab.active { color: #1a1a1a; }
//         .tab.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background: #1a1a1a; }
        
//         .sort-dropdown { background: #eee; padding: 8px 15px; border-radius: 20px; font-size: 0.85rem; display: flex; align-items: center; gap: 10px; cursor: pointer; }

//         /* Request Cards */
//         .request-card { background: white; border: 1px solid #dcfce7; border-radius: 12px; margin-bottom: 20px; overflow: hidden; }
//         .card-top { padding: 20px; display: grid; grid-template-columns: 180px 1fr 280px; gap: 20px; align-items: flex-start; }

//         /* User Info */
//         .avatar-box { position: relative; width: 80px; margin-bottom: 10px; }
//         .avatar-box img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }
//         .match-badge { position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); background: #1a365d; color: white; font-size: 9px; padding: 3px 8px; border-radius: 10px; white-space: nowrap; }
//         .user-details h4 { margin: 10px 0 2px; font-size: 1.05rem; }
//         .user-details p { font-size: 0.85rem; color: #777; }

//         /* Habits */
//         .habits-section h5 { font-size: 0.9rem; color: #1a1a1a; margin-bottom: 10px; }
//         .habit-tags { display: flex; gap: 8px; margin-bottom: 12px; }
//         .habit-tag { background: #f0f0f0; padding: 4px 12px; border-radius: 15px; font-size: 0.75rem; color: #555; font-weight: 600; }
//         .user-bio { font-size: 0.85rem; color: #666; line-height: 1.5; font-style: italic; border-left: 2px solid #eee; padding-left: 10px; }

//         /* Property Preview */
//         .property-preview-card { background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 12px; }
//         .property-preview-card img { width: 100%; height: 80px; border-radius: 8px; object-fit: cover; margin-bottom: 10px; }
//         .prop-text h6 { margin: 0; font-size: 0.9rem; color: #111; }
//         .prop-text p { font-size: 0.75rem; color: #888; margin-bottom: 10px; }
//         .booking-details { border-top: 1px solid #eee; padding-top: 10px; }
//         .dates { font-size: 0.8rem; color: #444; font-weight: 500; }
//         .price { font-size: 0.85rem; color: #111; margin-top: 3px; }

//         /* Card Footer */
//         .card-footer { background: #f1f3f6; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; }
//         .msg-btn { background: none; border: none; color: #1a365d; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.9rem; }
//         .action-btns { display: flex; gap: 15px; }
//         .decline-btn { background: white; border: 1px solid #ccc; padding: 8px 25px; border-radius: 20px; font-weight: 600; cursor: pointer; }
//         .approve-btn { background: #1a365d; color: white; border: none; padding: 8px 25px; border-radius: 20px; font-weight: 600; cursor: pointer; }
//       `}</style>
//     </div>
//   );
// };

// export default HostBookingRequests;























import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../Shared/DashboardSidebar';

const BASE_URL = "https://graduationproject1.runasp.net/";
const API_URL = "https://graduationproject1.runasp.net/api/Booking/host-requests";

const DEMO_DATA = [
  {
    id: 1,
    userName: "Marwa Khaled",
    userJob: "Graphic designer",
    userAge: 24,
    userBio: "Freelance designer looking for inspiring Room in Maadi. Freelance designer looking for inspiring Room in Maadi.",
    interests: ["Early Bird", "Social"],
    propertyTitle: "Sunny Room in Maadi",
    propertyType: "Private Room",
    totalPrice: "4,500",
    bookingStartDate: "Oct 12",
    bookingEndDate: "Nov 12",
    bookingDuration: "1 Month",
  },
  {
    id: 2,
    userName: "Marwa Khaled",
    userJob: "Graphic designer",
    userAge: 24,
    userBio: "Freelance designer looking for inspiring Room in Maadi. Freelance designer looking for inspiring Room in Maadi.",
    interests: ["Early Bird", "Social"],
    propertyTitle: "Sunny Room in Maadi",
    propertyType: "Private Room",
    totalPrice: "4,500",
    bookingStartDate: "Oct 12",
    bookingEndDate: "Nov 12",
    bookingDuration: "1 Month",
  },
  {
    id: 3,
    userName: "Marwa Khaled",
    userJob: "Graphic designer",
    userAge: 24,
    userBio: "Freelance designer looking for inspiring Room in Maadi. Freelance designer looking for inspiring Room in Maadi.",
    interests: ["Early Bird", "Social"],
    propertyTitle: "Sunny Room in Maadi",
    propertyType: "Private Room",
    totalPrice: "4,500",
    bookingStartDate: "Oct 12",
    bookingEndDate: "Nov 12",
    bookingDuration: "1 Month",
  },
];

const HostBookingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('pending');
  const [sortBy, setSortBy] = useState('newest');
  const [page] = useState(1);
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    fetchRequests();
  }, [status, sortBy, page]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      const params = new URLSearchParams({ status, sortBy, page, pageSize: 10 });
      const res = await fetch(`${API_URL}?${params}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const items = data?.data?.items || data?.items || data || [];
      setRequests(Array.isArray(items) ? items : DEMO_DATA);
    } catch {
      setRequests(DEMO_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    setActionLoading(prev => ({ ...prev, [id]: action }));
    try {
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      const res = await fetch(`${BASE_URL}api/Booking/${id}/${action}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setRequests(prev => prev.filter(r => r.id !== id));
      }
    } catch (err) {
      console.error(err);
      // demo: remove card anyway
      setRequests(prev => prev.filter(r => r.id !== id));
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: null }));
    }
  };

  return (
    <div style={styles.layout}>
      <DashboardSidebar />

      {/* ========== MAIN ========== */}
      <main style={styles.main}>
        {/* Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>Booking Requests</h1>
          <p style={styles.pageSubtitle}>
            Manage incoming inquiries . Review compatibility and approve matches
          </p>
        </div>

        {/* Controls Row */}
        <div style={styles.controlsRow}>
          {/* Tabs */}
          <div style={styles.tabsWrapper}>
            {['pending', 'approved', 'history'].map(s => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                style={{
                  ...styles.tab,
                  ...(status === s ? styles.tabActive : {}),
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <button
            onClick={() => setSortBy(p => p === 'newest' ? 'oldest' : 'newest')}
            style={styles.sortBtn}
          >
            Sort : <strong>{sortBy === 'newest' ? 'Newest' : 'Oldest'}</strong> ▾
          </button>
        </div>

        {/* Content */}
        <div style={styles.requestsList}>
          {loading ? (
            <div style={styles.centerState}>Loading requests...</div>
          ) : requests.length === 0 ? (
            <div style={styles.centerState}>No booking requests found.</div>
          ) : (
            requests.map(req => (
              <RequestCard
                key={req.id}
                req={req}
                onAction={handleAction}
                actionLoading={actionLoading[req.id]}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

/* ========== REQUEST CARD ========== */
const RequestCard = ({ req, onAction, actionLoading }) => {
  const firstName = (req.userName || 'User').split(' ')[0];
  const avatarUrl = req.userImageUrl
    ? `${BASE_URL}${req.userImageUrl}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(req.userName || 'User')}&background=1a365d&color=fff&size=80`;
  const propImgUrl = req.propertyImageUrl
    ? `${BASE_URL}${req.propertyImageUrl}`
    : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=100&fit=crop';

  const habits = req.interests?.slice(0, 3) || ['Early Bird', 'Social'];

  return (
    <div style={styles.card}>
      {/* Card Body */}
      <div style={styles.cardBody}>
        {/* ---- User Info ---- */}
        <div style={styles.userSection}>
          <div style={styles.avatarWrap}>
            <img
              src={avatarUrl}
              alt={req.userName}
              style={styles.avatar}
              onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=User&background=1a365d&color=fff'; }}
            />
            <span style={styles.matchBadge}>94 % Match</span>
          </div>
          <div style={styles.userName}>{req.userName || 'Marwa Khaled'}</div>
          <div style={styles.userMeta}>{req.userJob || 'Graphic designer'}, {req.userAge || 24}</div>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* ---- Habits ---- */}
        <div style={styles.habitsSection}>
          <div style={styles.habitsTitle}>Life style & Habits</div>
          <div style={styles.habitTags}>
            {habits.map((h, i) => (
              <span key={i} style={styles.habitTag}>{h}</span>
            ))}
          </div>
          <p style={styles.userBio}>
            "{req.userBio || 'Freelance designer looking for inspiring Room in Maadi. Freelance designer looking for inspiring Room in Maadi.'}"
          </p>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* ---- Property ---- */}
        <div style={styles.propertyCard}>
          <img
            src={propImgUrl}
            alt="property"
            style={styles.propImg}
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=90&fit=crop'; }}
          />
          <div style={styles.propInfo}>
            <div style={styles.propTitle}>{req.propertyTitle || 'Sunny Room in Maadi'}</div>
            <div style={styles.propType}>{req.propertyType || 'Private Room'}</div>
          </div>
          <div style={styles.bookingDetails}>
            <div style={styles.bookingDates}>
              {req.bookingStartDate || 'Oct 12'} - {req.bookingEndDate || 'Nov 12'} ({req.bookingDuration || '1 Month'})
            </div>
            <div style={styles.bookingPrice}>
              Total : <strong>EGP {req.totalPrice || '4,500'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div style={styles.cardFooter}>
        <button style={styles.msgBtn}>
          <span style={{ marginRight: 6 }}>💬</span> Message {firstName}
        </button>
        <div style={styles.actionBtns}>
          <button
            style={styles.declineBtn}
            disabled={!!actionLoading}
            onClick={() => onAction(req.id, 'decline')}
          >
            {actionLoading === 'decline' ? '...' : 'Decline'}
          </button>
          <button
            style={styles.approveBtn}
            disabled={!!actionLoading}
            onClick={() => onAction(req.id, 'approve')}
          >
            {actionLoading === 'approve' ? '...' : 'Approve Request'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========== STYLES ========== */
const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f5f6fa',
    fontFamily: "'Segoe UI', sans-serif",
  },

  /* Sidebar */
  sidebar: {
    width: 200,
    flexShrink: 0,
    background: '#fff',
    borderRight: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 14px',
  },
  sidebarTop: { display: 'flex', flexDirection: 'column', gap: 0 },
  brand: { marginBottom: 20 },
  brandTitle: { fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', margin: 0 },
  brandSub: { fontSize: '0.72rem', color: '#aaa', margin: '3px 0 0' },
  nav: { display: 'flex', flexDirection: 'column', gap: 2 },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 9,
    padding: '9px 10px', borderRadius: 8,
    fontSize: '0.82rem', fontWeight: 500, color: '#666',
    cursor: 'pointer', userSelect: 'none',
  },
  navItemActive: { background: '#eef2ff', color: '#3b4afe', fontWeight: 600 },
  navIcon: { fontSize: '0.85rem', width: 16 },
  statsCard: {
    background: '#fff', border: '1px solid #eee',
    borderRadius: 12, padding: '14px 16px',
  },
  statsRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  statsLabel: { fontSize: '9px', fontWeight: 700, color: '#bbb', letterSpacing: '0.8px', textTransform: 'uppercase' },
  statsValue: { fontSize: '1.5rem', fontWeight: 800, color: '#111', marginTop: 2 },
  statusActive: { fontSize: '0.8rem', fontWeight: 700, color: '#27ae60', marginTop: 4 },

  /* Main */
  main: { flex: 1, padding: '30px 36px', overflowY: 'auto' },
  pageHeader: { marginBottom: 24 },
  pageTitle: { fontSize: '1.6rem', fontWeight: 800, color: '#111', margin: 0 },
  pageSubtitle: { fontSize: '0.85rem', color: '#888', marginTop: 5 },

  /* Controls */
  controlsRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
    borderBottom: '1.5px solid #e5e7eb', marginBottom: 24,
  },
  tabsWrapper: { display: 'flex', gap: 0 },
  tab: {
    background: 'none', border: 'none',
    padding: '10px 22px 11px',
    fontSize: '0.92rem', fontWeight: 600,
    color: '#aaa', cursor: 'pointer',
    borderBottom: '2px solid transparent',
    marginBottom: '-1.5px', fontFamily: 'inherit',
    transition: 'color 0.15s',
  },
  tabActive: { color: '#111', borderBottomColor: '#111' },
  sortBtn: {
    background: '#efefef', border: 'none',
    borderRadius: 20, padding: '7px 16px',
    fontSize: '0.82rem', color: '#444',
    cursor: 'pointer', fontFamily: 'inherit',
    marginBottom: 10,
  },

  /* List */
  requestsList: { display: 'flex', flexDirection: 'column', gap: 18 },
  centerState: { textAlign: 'center', padding: '60px 0', color: '#aaa', fontSize: '0.9rem' },

  /* Card */
  card: {
    background: '#fff',
    border: '1.5px solid #bbf7d0',
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardBody: {
    display: 'grid',
    gridTemplateColumns: '160px 1px 1fr 1px 260px',
    gap: 0,
    padding: '20px 24px',
    alignItems: 'flex-start',
  },
  divider: { width: 1, background: '#f0f0f0', margin: '0 20px', alignSelf: 'stretch' },

  /* User */
  userSection: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  avatarWrap: { position: 'relative', marginBottom: 10 },
  avatar: { width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', display: 'block' },
  matchBadge: {
    position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
    background: '#1a365d', color: '#fff', fontSize: '8px', fontWeight: 700,
    padding: '3px 9px', borderRadius: 10, whiteSpace: 'nowrap',
  },
  userName: { fontSize: '0.95rem', fontWeight: 700, color: '#111', marginTop: 4 },
  userMeta: { fontSize: '0.78rem', color: '#888', marginTop: 2 },

  /* Habits */
  habitsSection: { paddingRight: 10 },
  habitsTitle: { fontSize: '0.78rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 10 },
  habitTags: { display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12 },
  habitTag: {
    background: '#f1f1f1', padding: '4px 13px',
    borderRadius: 15, fontSize: '0.73rem', color: '#555', fontWeight: 600,
  },
  userBio: {
    fontSize: '0.8rem', color: '#666', lineHeight: 1.6,
    fontStyle: 'italic', margin: 0,
  },

  /* Property */
  propertyCard: {
    border: '1px solid #eee', borderRadius: 10, overflow: 'hidden',
  },
  propImg: { width: '100%', height: 80, objectFit: 'cover', display: 'block' },
  propInfo: { padding: '10px 12px 6px' },
  propTitle: { fontSize: '0.85rem', fontWeight: 700, color: '#111' },
  propType: { fontSize: '0.73rem', color: '#aaa', marginTop: 2 },
  bookingDetails: {
    borderTop: '1px solid #f0f0f0',
    padding: '8px 12px',
  },
  bookingDates: { fontSize: '0.76rem', color: '#444', fontWeight: 500 },
  bookingPrice: { fontSize: '0.78rem', color: '#111', marginTop: 3 },

  /* Footer */
  cardFooter: {
    background: '#f4f5f8',
    borderTop: '1px solid #eee',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msgBtn: {
    background: 'none', border: 'none',
    color: '#1a365d', fontWeight: 700,
    cursor: 'pointer', fontFamily: 'inherit',
    fontSize: '0.85rem', display: 'flex', alignItems: 'center',
  },
  actionBtns: { display: 'flex', gap: 12 },
  declineBtn: {
    background: '#fff', border: '1.5px solid #ddd',
    padding: '8px 24px', borderRadius: 20,
    fontWeight: 600, cursor: 'pointer',
    fontFamily: 'inherit', fontSize: '0.83rem', color: '#444',
  },
  approveBtn: {
    background: '#1a365d', color: '#fff',
    border: 'none', padding: '8px 24px',
    borderRadius: 20, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.83rem',
  },
};

export default HostBookingRequests;





















// import React, { useState, useEffect } from 'react';
// import DashboardSidebar from '../Shared/DashboardSidebar';

// const BASE_URL = "https://graduationproject1.runasp.net/";
// const API_URL = "https://graduationproject1.runasp.net/api/Booking/host-requests";

// const HostBookingRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState('pending');
//   const [sortBy, setSortBy] = useState('newest');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [actionLoading, setActionLoading] = useState({});

//   useEffect(() => {
//     fetchRequests();
//   }, [status, sortBy, page]);

//   // Reset to page 1 when tab/sort changes
//   useEffect(() => {
//     setPage(1);
//   }, [status, sortBy]);

//   const fetchRequests = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const token = localStorage.getItem('userToken')?.replace(/"/g, '');
//       const params = new URLSearchParams({ status, sortBy, page, pageSize: 10 });
//       const res = await fetch(`${API_URL}?${params}`, {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       });
//       if (!res.ok) throw new Error(`Server error: ${res.status}`);
//       const data = await res.json();

//       // Support multiple API response shapes
//       const items = data?.data?.items ?? data?.items ?? data ?? [];
//       const pages = data?.data?.totalPages ?? data?.totalPages ?? 1;

//       setRequests(Array.isArray(items) ? items : []);
//       setTotalPages(pages);
//     } catch (err) {
//       setError(err.message || 'Failed to load requests');
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (id, action) => {
//     setActionLoading(prev => ({ ...prev, [id]: action }));
//     try {
//       const token = localStorage.getItem('userToken')?.replace(/"/g, '');
//       const res = await fetch(`${BASE_URL}api/Booking/${id}/${action}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!res.ok) throw new Error('Action failed');
//       setRequests(prev => prev.filter(r => (r.id ?? r.bookingId) !== id));
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setActionLoading(prev => ({ ...prev, [id]: null }));
//     }
//   };

//   return (
//     <div style={styles.layout}>
//       <DashboardSidebar />

//       <main style={styles.main}>
//         {/* Header */}
//         <div style={styles.pageHeader}>
//           <h1 style={styles.pageTitle}>Booking Requests</h1>
//           <p style={styles.pageSubtitle}>
//             Manage incoming inquiries · Review compatibility and approve matches
//           </p>
//         </div>

//         {/* Controls Row */}
//         <div style={styles.controlsRow}>
//           <div style={styles.tabsWrapper}>
//             {['pending', 'approved', 'history'].map(s => (
//               <button
//                 key={s}
//                 onClick={() => setStatus(s)}
//                 style={{ ...styles.tab, ...(status === s ? styles.tabActive : {}) }}
//               >
//                 {s.charAt(0).toUpperCase() + s.slice(1)}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() => setSortBy(p => p === 'newest' ? 'oldest' : 'newest')}
//             style={styles.sortBtn}
//           >
//             Sort : <strong>{sortBy === 'newest' ? 'Newest' : 'Oldest'}</strong> ▾
//           </button>
//         </div>

//         {/* Content */}
//         <div style={styles.requestsList}>
//           {loading ? (
//             <div style={styles.centerState}>
//               <div style={styles.spinner} />
//               Loading requests...
//             </div>
//           ) : error ? (
//             <div style={styles.errorState}>
//               <span>⚠️ {error}</span>
//               <button onClick={fetchRequests} style={styles.retryBtn}>Retry</button>
//             </div>
//           ) : requests.length === 0 ? (
//             <div style={styles.centerState}>No booking requests found.</div>
//           ) : (
//             requests.map(req => {
//               const id = req.id ?? req.bookingId;
//               return (
//                 <RequestCard
//                   key={id}
//                   req={req}
//                   onAction={handleAction}
//                   actionLoading={actionLoading[id]}
//                 />
//               );
//             })
//           )}
//         </div>

//         {/* Pagination */}
//         {!loading && !error && totalPages > 1 && (
//           <div style={styles.pagination}>
//             <button
//               onClick={() => setPage(p => Math.max(1, p - 1))}
//               disabled={page === 1}
//               style={styles.pageBtn}
//             >
//               ← Prev
//             </button>
//             <span style={styles.pageInfo}>Page {page} of {totalPages}</span>
//             <button
//               onClick={() => setPage(p => Math.min(totalPages, p + 1))}
//               disabled={page === totalPages}
//               style={styles.pageBtn}
//             >
//               Next →
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// /* ========== REQUEST CARD ========== */
// const RequestCard = ({ req, onAction, actionLoading }) => {
//   // Normalize all possible field names from the API
//   const id = req.id ?? req.bookingId;
//   const userName = req.userName ?? req.guestName ?? req.tenantName ?? 'User';
//   const userJob = req.userJob ?? req.job ?? req.occupation ?? '';
//   const userAge = req.userAge ?? req.age ?? '';
//   const userBio = req.userBio ?? req.bio ?? req.about ?? '';
//   const interests = req.interests ?? req.habits ?? req.lifestyle ?? [];
//   const propertyTitle = req.propertyTitle ?? req.listingTitle ?? req.roomTitle ?? '';
//   const propertyType = req.propertyType ?? req.roomType ?? req.listingType ?? '';
//   const totalPrice = req.totalPrice ?? req.price ?? req.amount ?? '';
//   const bookingStartDate = req.bookingStartDate ?? req.startDate ?? req.checkIn ?? '';
//   const bookingEndDate = req.bookingEndDate ?? req.endDate ?? req.checkOut ?? '';
//   const bookingDuration = req.bookingDuration ?? req.duration ?? '';

//   const firstName = userName.split(' ')[0];

//   const avatarUrl = req.userImageUrl
//     ? `${BASE_URL}${req.userImageUrl}`.replace(/([^:]\/)\/+/g, '$1')
//     : `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=1a365d&color=fff&size=80`;

//   const propImgUrl = req.propertyImageUrl ?? req.listingImageUrl ?? req.roomImageUrl
//     ? `${BASE_URL}${req.propertyImageUrl ?? req.listingImageUrl ?? req.roomImageUrl}`.replace(/([^:]\/)\/+/g, '$1')
//     : 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=100&fit=crop';

//   const matchScore = req.matchScore ?? req.compatibilityScore ?? req.match ?? 94;
//   const habits = Array.isArray(interests) ? interests.slice(0, 3) : [];

//   return (
//     <div style={styles.card}>
//       <div style={styles.cardBody}>
//         {/* User Info */}
//         <div style={styles.userSection}>
//           <div style={styles.avatarWrap}>
//             <img
//               src={avatarUrl}
//               alt={userName}
//               style={styles.avatar}
//               onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=1a365d&color=fff`; }}
//             />
//             <span style={styles.matchBadge}>{matchScore}% Match</span>
//           </div>
//           <div style={styles.userName}>{userName}</div>
//           <div style={styles.userMeta}>
//             {[userJob, userAge].filter(Boolean).join(', ')}
//           </div>
//         </div>

//         <div style={styles.divider} />

//         {/* Habits */}
//         <div style={styles.habitsSection}>
//           <div style={styles.habitsTitle}>Life style & Habits</div>
//           <div style={styles.habitTags}>
//             {habits.length > 0
//               ? habits.map((h, i) => <span key={i} style={styles.habitTag}>{h}</span>)
//               : <span style={styles.noData}>No habits listed</span>
//             }
//           </div>
//           {userBio && (
//             <p style={styles.userBio}>"{userBio}"</p>
//           )}
//         </div>

//         <div style={styles.divider} />

//         {/* Property */}
//         <div style={styles.propertyCard}>
//           <img
//             src={propImgUrl}
//             alt="property"
//             style={styles.propImg}
//             onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200&h=90&fit=crop'; }}
//           />
//           <div style={styles.propInfo}>
//             <div style={styles.propTitle}>{propertyTitle || '—'}</div>
//             <div style={styles.propType}>{propertyType || '—'}</div>
//           </div>
//           <div style={styles.bookingDetails}>
//             <div style={styles.bookingDates}>
//               {bookingStartDate} {bookingEndDate && `- ${bookingEndDate}`} {bookingDuration && `(${bookingDuration})`}
//             </div>
//             {totalPrice && (
//               <div style={styles.bookingPrice}>
//                 Total : <strong>EGP {typeof totalPrice === 'number' ? totalPrice.toLocaleString() : totalPrice}</strong>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div style={styles.cardFooter}>
//         <button style={styles.msgBtn}>
//           <span style={{ marginRight: 6 }}>💬</span> Message {firstName}
//         </button>
//         <div style={styles.actionBtns}>
//           <button
//             style={styles.declineBtn}
//             disabled={!!actionLoading}
//             onClick={() => onAction(id, 'decline')}
//           >
//             {actionLoading === 'decline' ? '...' : 'Decline'}
//           </button>
//           <button
//             style={styles.approveBtn}
//             disabled={!!actionLoading}
//             onClick={() => onAction(id, 'approve')}
//           >
//             {actionLoading === 'approve' ? '...' : 'Approve Request'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ========== STYLES ========== */
// const styles = {
//   layout: { display: 'flex', minHeight: '100vh', background: '#f5f6fa', fontFamily: "'Segoe UI', sans-serif" },
//   main: { flex: 1, padding: '30px 36px', overflowY: 'auto' },
//   pageHeader: { marginBottom: 24 },
//   pageTitle: { fontSize: '1.6rem', fontWeight: 800, color: '#111', margin: 0 },
//   pageSubtitle: { fontSize: '0.85rem', color: '#888', marginTop: 5 },
//   controlsRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1.5px solid #e5e7eb', marginBottom: 24 },
//   tabsWrapper: { display: 'flex', gap: 0 },
//   tab: { background: 'none', border: 'none', padding: '10px 22px 11px', fontSize: '0.92rem', fontWeight: 600, color: '#aaa', cursor: 'pointer', borderBottom: '2px solid transparent', marginBottom: '-1.5px', fontFamily: 'inherit', transition: 'color 0.15s' },
//   tabActive: { color: '#111', borderBottomColor: '#111' },
//   sortBtn: { background: '#efefef', border: 'none', borderRadius: 20, padding: '7px 16px', fontSize: '0.82rem', color: '#444', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 10 },
//   requestsList: { display: 'flex', flexDirection: 'column', gap: 18 },
//   centerState: { textAlign: 'center', padding: '60px 0', color: '#aaa', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
//   errorState: { textAlign: 'center', padding: '40px 0', color: '#e53e3e', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 },
//   retryBtn: { background: '#1a365d', color: '#fff', border: 'none', borderRadius: 20, padding: '8px 20px', cursor: 'pointer', fontSize: '0.83rem', fontFamily: 'inherit' },
//   spinner: { width: 32, height: 32, border: '3px solid #e5e7eb', borderTop: '3px solid #1a365d', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
//   pagination: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 28 },
//   pageBtn: { background: '#fff', border: '1.5px solid #ddd', borderRadius: 20, padding: '7px 18px', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit', color: '#444', fontWeight: 600 },
//   pageInfo: { fontSize: '0.82rem', color: '#888' },
//   card: { background: '#fff', border: '1.5px solid #bbf7d0', borderRadius: 14, overflow: 'hidden' },
//   cardBody: { display: 'grid', gridTemplateColumns: '160px 1px 1fr 1px 260px', gap: 0, padding: '20px 24px', alignItems: 'flex-start' },
//   divider: { width: 1, background: '#f0f0f0', margin: '0 20px', alignSelf: 'stretch' },
//   userSection: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
//   avatarWrap: { position: 'relative', marginBottom: 10 },
//   avatar: { width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', display: 'block' },
//   matchBadge: { position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', background: '#1a365d', color: '#fff', fontSize: '8px', fontWeight: 700, padding: '3px 9px', borderRadius: 10, whiteSpace: 'nowrap' },
//   userName: { fontSize: '0.95rem', fontWeight: 700, color: '#111', marginTop: 4 },
//   userMeta: { fontSize: '0.78rem', color: '#888', marginTop: 2 },
//   habitsSection: { paddingRight: 10 },
//   habitsTitle: { fontSize: '0.78rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 10 },
//   habitTags: { display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 12 },
//   habitTag: { background: '#f1f1f1', padding: '4px 13px', borderRadius: 15, fontSize: '0.73rem', color: '#555', fontWeight: 600 },
//   noData: { fontSize: '0.73rem', color: '#bbb' },
//   userBio: { fontSize: '0.8rem', color: '#666', lineHeight: 1.6, fontStyle: 'italic', margin: 0 },
//   propertyCard: { border: '1px solid #eee', borderRadius: 10, overflow: 'hidden' },
//   propImg: { width: '100%', height: 80, objectFit: 'cover', display: 'block' },
//   propInfo: { padding: '10px 12px 6px' },
//   propTitle: { fontSize: '0.85rem', fontWeight: 700, color: '#111' },
//   propType: { fontSize: '0.73rem', color: '#aaa', marginTop: 2 },
//   bookingDetails: { borderTop: '1px solid #f0f0f0', padding: '8px 12px' },
//   bookingDates: { fontSize: '0.76rem', color: '#444', fontWeight: 500 },
//   bookingPrice: { fontSize: '0.78rem', color: '#111', marginTop: 3 },
//   cardFooter: { background: '#f4f5f8', borderTop: '1px solid #eee', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
//   msgBtn: { background: 'none', border: 'none', color: '#1a365d', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', display: 'flex', alignItems: 'center' },
//   actionBtns: { display: 'flex', gap: 12 },
//   declineBtn: { background: '#fff', border: '1.5px solid #ddd', padding: '8px 24px', borderRadius: 20, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.83rem', color: '#444' },
//   approveBtn: { background: '#1a365d', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: 20, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.83rem' },
// };

// export default HostBookingRequests;