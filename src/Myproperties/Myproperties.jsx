// import React, { useEffect, useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
 
// const API_BASE = 'https://graduationproject1.runasp.net/api/Property/MyProperty';
 
// const FILTER_TABS = [
//   { value: 'all', label: 'All Properties' },
//   { value: 'apartment', label: 'Apartments' },
//   { value: 'room', label: 'Rooms' },
// ];
 
// const formatDate = (dateStr) => {
//   if (!dateStr) return '';
//   const d = new Date(dateStr);
//   if (isNaN(d)) return dateStr;
//   const diff = Math.floor((Date.now() - d) / 1000);
//   if (diff < 60) return 'just now';
//   if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
//   if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
//   return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// };
 
// const formatPrice = (item) => {
//   const price = item.monthlyPrice || item.price || item.pricePerMonth || item.rentPrice;
//   if (!price) return 'N/A';
//   return `$${Number(price).toLocaleString()}`;
// };
 
// const getLocation = (item) => {
//   if (item.location?.fullAddress) return item.location.fullAddress;
//   if (item.location?.city) return [item.location.street, item.location.city, item.location.state].filter(Boolean).join(', ');
//   return item.city || item.address || item.location || 'Unknown location';
// };
 
// const getStatusInfo = (status) => {
//   const s = String(status || '').toLowerCase();
//   if (s.includes('active')) return { label: 'Active', cls: 'active' };
//   if (s.includes('pending') || s.includes('approval')) return { label: 'Pending Approval', cls: 'pending' };
//   if (s.includes('review')) return { label: 'Under Review', cls: 'review' };
//   if (s.includes('reject') || s.includes('declined')) return { label: 'Rejected', cls: 'rejected' };
//   if (s.includes('inactive') || s.includes('draft')) return { label: 'Inactive', cls: 'inactive' };
//   return { label: status || 'Active', cls: 'active' };
// };
 
// const getType = (item) => {
//   const t = String(item.propertyType || item.type || item.listingType || '').toLowerCase();
//   if (t.includes('room')) return 'ROOM';
//   return 'APARTMENT';
// };
 
// const MyProperties = () => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [filter, setFilter] = useState('all');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalCount, setTotalCount] = useState(0);
//   const pageSize = 5;
 
//   const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');
 
//   const fetchProperties = useCallback(async () => {
//     if (!token) { setError('Please login to view your properties.'); return; }
//     setLoading(true);
//     setError('');
//     try {
//       const params = new URLSearchParams({ filter, page, pageSize });
//       const res = await fetch(`${API_BASE}?${params}`, {
        
//         headers: { Authorization: `Bearer ${token}` },
        
//       });
//       console.log(res);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const data = await res.json();
 
//       const items = Array.isArray(data) ? data
//         : Array.isArray(data?.items) ? data.items
//         : Array.isArray(data?.properties) ? data.properties
//         : Array.isArray(data?.data?.items) ? data.data.items
//         : Array.isArray(data?.data) ? data.data : [];
 
//       const total = data?.totalCount || data?.total || data?.count || items.length;
//       const pages = data?.totalPages || data?.pages || Math.ceil(total / pageSize) || 1;
 
//       setProperties(items);
//       setTotalCount(total);
//       setTotalPages(pages);
//     } catch (e) {
//       setError(e.message || 'Failed to load properties.');
//     } finally {
//       setLoading(false);
//     }
//   }, [token, filter, page]);
 
//   useEffect(() => { fetchProperties(); }, [fetchProperties]);
 
//   const handleFilterChange = (val) => { setFilter(val); setPage(1); };
 
//   return (
//     <div className="mp-page">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');
 
//         .mp-page { background: #f5f6fa; min-height: 100vh; padding: 100px 24px 48px; font-family: 'DM Sans', system-ui, sans-serif; }
//         .mp-wrapper { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 200px 1fr; gap: 20px; }
 
//         /* Sidebar */
//         .mp-sidebar { background: #fff; border-radius: 18px; border: 1px solid #e8eaf0; padding: 22px 16px; height: fit-content; }
//         .mp-avatar { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #1e3a8a, #3b5fd9); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; margin-bottom: 10px; }
//         .mp-sidebar-title { font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
//         .mp-sidebar-sub { font-size: 11px; color: #94a3b8; margin-bottom: 20px; }
//         .mp-nav-item { display: flex; align-items: center; gap: 9px; padding: 9px 12px; border-radius: 10px; font-size: 13px; color: #475569; cursor: pointer; margin-bottom: 2px; transition: 0.15s; }
//         .mp-nav-item:hover { background: #f1f5f9; }
//         .mp-nav-item.active { background: #e0e7ff; color: #1e3a8a; font-weight: 600; }
//         .mp-nav-icon { width: 15px; height: 15px; opacity: 0.7; flex-shrink: 0; }
//         .mp-stat-block { margin-top: 24px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
//         .mp-stat-row { margin-bottom: 10px; }
//         .mp-stat-label { font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; }
//         .mp-stat-val { font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 1px; }
//         .mp-stat-active { color: #16a34a; display: flex; align-items: center; gap: 5px; }
//         .mp-stat-active::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #16a34a; display: block; }
 
//         /* Main */
//         .mp-main { display: flex; flex-direction: column; gap: 16px; }
//         .mp-top-bar { display: flex; align-items: center; justify-content: space-between; }
//         .mp-page-title { font-size: 22px; font-weight: 800; color: #0f172a; }
//         .mp-page-sub { font-size: 13px; color: #94a3b8; margin-top: 3px; }
//         .mp-add-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #1e3a8a; color: #fff; border: none; border-radius: 12px; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: 0.15s; }
//         .mp-add-btn:hover { background: #1e40af; }
 
//         .mp-tabs { display: flex; gap: 0; border-bottom: 2px solid #e8eaf0; }
//         .mp-tab { padding: 10px 18px; font-size: 13px; font-weight: 600; color: #64748b; border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: 0.15s; }
//         .mp-tab.active { color: #1e3a8a; border-bottom-color: #1e3a8a; }
 
//         /* Property Cards */
//         .mp-card { display: grid; grid-template-columns: 120px 1fr auto; gap: 16px; padding: 16px; background: #fff; border-radius: 16px; border: 1.5px solid #e8eaf0; align-items: center; transition: 0.15s; }
//         .mp-card:hover { border-color: #c7d2fe; box-shadow: 0 4px 20px rgba(30, 58, 138, 0.08); }
//         .mp-card.rejected { border-color: #fecaca; }
//         .mp-card-img { width: 120px; height: 88px; border-radius: 12px; object-fit: cover; background: #f1f5f9; }
//         .mp-card-body { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
//         .mp-card-meta { display: flex; align-items: center; gap: 8px; }
//         .mp-type-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; color: #475569; text-transform: uppercase; }
//         .mp-status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
//         .status-active .mp-status-dot { background: #16a34a; }
//         .status-pending .mp-status-dot { background: #d97706; }
//         .status-review .mp-status-dot { background: #2563eb; }
//         .status-rejected .mp-status-dot { background: #dc2626; }
//         .status-inactive .mp-status-dot { background: #94a3b8; }
//         .mp-status-text { font-size: 11px; font-weight: 600; }
//         .status-active .mp-status-text { color: #16a34a; }
//         .status-pending .mp-status-text { color: #d97706; }
//         .status-review .mp-status-text { color: #2563eb; }
//         .status-rejected .mp-status-text { color: #dc2626; }
//         .status-inactive .mp-status-text { color: #94a3b8; }
//         .mp-card-title { font-size: 15px; font-weight: 700; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//         .mp-card-loc { font-size: 12px; color: #64748b; display: flex; align-items: center; gap: 4px; }
//         .mp-card-actions { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
//         .mp-btn { display: flex; align-items: center; gap: 5px; padding: 7px 14px; border-radius: 9px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid #e2e8f0; background: #f8fafc; color: #334155; transition: 0.15s; }
//         .mp-btn:hover { background: #e0e7ff; border-color: #a5b4fc; color: #1e3a8a; }
//         .mp-btn-icon { width: 28px; height: 28px; border-radius: 8px; border: 1px solid #e2e8f0; background: #f8fafc; color: #64748b; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 13px; transition: 0.15s; }
//         .mp-btn-icon:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }
//         .mp-card-side { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; min-width: 110px; }
//         .mp-price { font-size: 18px; font-weight: 800; color: #0f172a; }
//         .mp-price-unit { font-size: 11px; color: #94a3b8; }
//         .mp-card-date { font-size: 11px; color: #94a3b8; text-align: right; }
 
//         /* Pagination */
//         .mp-pagination { display: flex; align-items: center; justify-content: space-between; margin-top: 4px; }
//         .mp-showing { font-size: 13px; color: #64748b; }
//         .mp-pages { display: flex; align-items: center; gap: 4px; }
//         .mp-page-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid #e2e8f0; background: #fff; font-size: 13px; font-weight: 600; color: #334155; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.15s; }
//         .mp-page-btn:hover { background: #e0e7ff; border-color: #a5b4fc; }
//         .mp-page-btn.active { background: #1e3a8a; color: #fff; border-color: #1e3a8a; }
//         .mp-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
 
//         .mp-loading { text-align: center; padding: 40px; color: #94a3b8; font-size: 14px; }
//         .mp-error { background: #fee2e2; color: #dc2626; border-radius: 12px; padding: 16px; font-size: 13px; }
//         .mp-empty { background: #fff; border-radius: 16px; border: 1px solid #e8eaf0; padding: 48px; text-align: center; color: #94a3b8; font-size: 14px; }
 
//         @media (max-width: 900px) { .mp-wrapper { grid-template-columns: 1fr; } }
//         @media (max-width: 640px) { .mp-card { grid-template-columns: 90px 1fr; } .mp-card-side { display: none; } }
//       `}</style>
 
//       <div className="mp-wrapper">
//         {/* Sidebar */}
//         <aside className="mp-sidebar">
//           <div className="mp-avatar">AJ</div>
//           <div className="mp-sidebar-title">My Profile</div>
//           <div className="mp-sidebar-sub">Manage your renter identity</div>
 
//           {[
//             { icon: '👤', label: 'Personal Info', path: '/personal-info' },
//             { icon: '🔖', label: 'My Booking', path: '/orders' },
//             { icon: '📋', label: 'Booking', path: '/booking' },
//             { icon: '❤️', label: 'Saved Matches', path: '/saved' },
//             { icon: '🏠', label: 'My Properties', path: '/my-properties', active: true },
//             { icon: '🔲', label: 'Properties', path: '/BrowseProperties' },
//           ].map((item) => (
//             <div
//               key={item.path}
//               className={`mp-nav-item ${item.active ? 'active' : ''}`}
//               onClick={() => navigate(item.path)}
//             >
//               <span style={{ fontSize: 14 }}>{item.icon}</span>
//               {item.label}
//             </div>
//           ))}
 
//           <div className="mp-stat-block">
//             <div className="mp-stat-row">
//               <div className="mp-stat-label">Profile Views</div>
//               <div className="mp-stat-val">124</div>
//             </div>
//             <div className="mp-stat-row">
//               <div className="mp-stat-label">Status</div>
//               <div className="mp-stat-val mp-stat-active">Active</div>
//             </div>
//           </div>
//         </aside>
 
//         {/* Main Content */}
//         <div className="mp-main">
//           <div className="mp-top-bar">
//             <div>
//               <div className="mp-page-title">My Properties</div>
//               <div className="mp-page-sub">
//                 Manage and monitor your {totalCount} property listing{totalCount !== 1 ? 's' : ''}
//               </div>
//             </div>
//             <button className="mp-add-btn" onClick={() => navigate('/add-property')}>
//               ⊕ Add New Property
//             </button>
//           </div>
 
//           <div className="mp-tabs">
//             {FILTER_TABS.map((tab) => (
//               <button
//                 key={tab.value}
//                 className={`mp-tab ${filter === tab.value ? 'active' : ''}`}
//                 onClick={() => handleFilterChange(tab.value)}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
 
//           {error && <div className="mp-error">{error}</div>}
 
//           {loading ? (
//             <div className="mp-loading">Loading your properties...</div>
//           ) : properties.length === 0 && !error ? (
//             <div className="mp-empty">No properties found. Add your first property!</div>
//           ) : (
//             properties.map((item, idx) => {
//               const statusInfo = getStatusInfo(item.status || item.propertyStatus || item.listingStatus);
//               const type = getType(item);
//               const img = item.coverImage || item.imageUrl || item.mainImage || item.thumbnail;
//               const isRejected = statusInfo.cls === 'rejected';
 
//               return (
//                 <div className={`mp-card ${isRejected ? 'rejected' : ''}`} key={item.id || item.propertyId || idx}>
//                   <img
//                     className="mp-card-img"
//                     src={img || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=200&q=80'}
//                     alt={item.title || 'Property'}
//                     onError={(e) => { e.target.src = 'https://via.placeholder.com/120x88?text=Property'; }}
//                   />
 
//                   <div className="mp-card-body">
//                     <div className="mp-card-meta">
//                       <span className="mp-type-tag">{type}</span>
//                       <span className={`status-${statusInfo.cls}`} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
//                         <span className="mp-status-dot" />
//                         <span className="mp-status-text">{statusInfo.label}</span>
//                       </span>
//                     </div>
//                     <div className="mp-card-title">{item.title || item.propertyName || item.name || 'Property'}</div>
//                     <div className="mp-card-loc">
//                       📍 {getLocation(item)}
//                     </div>
//                     <div className="mp-card-actions">
//                       {statusInfo.cls !== 'rejected' && (
//                         <>
//                           <button className="mp-btn" onClick={() => navigate(`/property/${item.id || item.propertyId}`)}>
//                             👁 {statusInfo.cls === 'pending' ? 'Preview' : 'Details'}
//                           </button>
//                           {statusInfo.cls !== 'review' && (
//                             <button className="mp-btn" onClick={() => navigate(`/edit-property/${item.id || item.propertyId}`)}>
//                               ✏️ Edit
//                             </button>
//                           )}
//                         </>
//                       )}
//                       {statusInfo.cls === 'rejected' && (
//                         <button className="mp-btn" onClick={() => navigate(`/property/${item.id || item.propertyId}`)}>
//                           👁 Details
//                         </button>
//                       )}
//                       <button className="mp-btn-icon" title="Delete">🗑</button>
//                     </div>
//                   </div>
 
//                   <div className="mp-card-side">
//                     <div className="mp-price">{formatPrice(item)}</div>
//                     <div className="mp-price-unit">/month</div>
//                     <div className="mp-card-date">
//                       {item.createdAt ? `Listed ${formatDate(item.createdAt)}` : item.updatedAt ? `Updated ${formatDate(item.updatedAt)}` : ''}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
 
//           {/* Pagination */}
//           {!loading && totalPages > 1 && (
//             <div className="mp-pagination">
//               <div className="mp-showing">
//                 Showing {Math.min((page - 1) * pageSize + 1, totalCount)} to {Math.min(page * pageSize, totalCount)} of {totalCount} properties
//               </div>
//               <div className="mp-pages">
//                 <button className="mp-page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
//                 {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
//                   const p = i + 1;
//                   return (
//                     <button key={p} className={`mp-page-btn ${page === p ? 'active' : ''}`} onClick={() => setPage(p)}>
//                       {p}
//                     </button>
//                   );
//                 })}
//                 <button className="mp-page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>›</button>
//               </div>
//             </div>
//           )}
 
//           {!loading && totalPages <= 1 && properties.length > 0 && (
//             <div className="mp-showing" style={{ fontSize: 13, color: '#64748b' }}>
//               Showing 1 to {properties.length} of {totalCount || properties.length} properties
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default MyProperties;

import React from 'react'

export default function Myproperties() {
  return (
    <div>
      
    </div>
  )
}
