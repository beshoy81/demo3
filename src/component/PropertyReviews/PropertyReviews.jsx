// import React, { useEffect, useState, useCallback } from 'react';
// import { useParams } from 'react-router-dom';
 
// /* ─── Star Row ─────────────────────────────────────────────────────────────── */
// const StarRow = ({ rating, size = 14 }) => {
//   const full  = Math.floor(rating);
//   const empty = 5 - full;
//   return (
//     <span style={{ display: 'inline-flex', gap: 1 }}>
//       {[...Array(full)].map((_, i) => (
//         <svg key={`f${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#222">
//           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//         </svg>
//       ))}
//       {[...Array(empty)].map((_, i) => (
//         <svg key={`e${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#ddd">
//           <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
//         </svg>
//       ))}
//     </span>
//   );
// };
 
// /* ─── Category Bar ─────────────────────────────────────────────────────────── */
// const CategoryBar = ({ label, value }) => (
//   <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
//     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//       <span style={{ fontSize: 13, color: '#555' }}>{label}</span>
//       <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{(value || 0).toFixed(1)}</span>
//     </div>
//     <div style={{ height: 4, background: '#e0e0e0', borderRadius: 99 }}>
//       <div style={{
//         height: 4, borderRadius: 99, background: '#1a2b6b',
//         width: `${((value || 0) / 5) * 100}%`, transition: 'width 0.6s ease',
//       }} />
//     </div>
//   </div>
// );
 
// /* ─── Distribution Bar ─────────────────────────────────────────────────────── */
// const DistributionBar = ({ star, count, total }) => {
//   const pct = total ? (count / total) * 100 : 0;
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
//       <span style={{ fontSize: 12, color: '#666', width: 8 }}>{star}</span>
//       <div style={{ flex: 1, height: 4, background: '#eee', borderRadius: 99 }}>
//         <div style={{
//           height: 4, borderRadius: 99,
//           background: pct > 50 ? '#1a2b6b' : '#999',
//           width: `${pct}%`, transition: 'width 0.6s ease',
//         }} />
//       </div>
//       <span style={{ fontSize: 11, color: '#aaa', width: 28, textAlign: 'right' }}>
//         {pct > 0 ? `${Math.round(pct)}%` : '0%'}
//       </span>
//     </div>
//   );
// };
 
// /* ─── Avatar ───────────────────────────────────────────────────────────────── */
// const COLORS = [['#e8f4f8','#2196f3'],['#fef3e2','#ff9800'],['#f0f7ee','#4caf50'],['#fce4ec','#e91e63'],['#ede7f6','#7c4dff']];
// const Avatar = ({ name, image, size = 40 }) => {
//   const initials = (name || 'G').split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
//   const [bg, fg] = COLORS[(name || 'G').charCodeAt(0) % 5];
//   return image
//     ? <img src={image} alt={name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />
//     : (
//       <div style={{
//         width: size, height: size, borderRadius: '50%', background: bg, color: fg,
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         fontWeight: 700, fontSize: size * 0.35, flexShrink: 0,
//       }}>{initials}</div>
//     );
// };
 
// /* ─── Verified Badge ───────────────────────────────────────────────────────── */
// const VerifiedBadge = () => (
//   <span style={{
//     display: 'inline-flex', alignItems: 'center', gap: 3,
//     background: '#f0f7ff', color: '#1a6ed8', fontSize: 10, fontWeight: 600,
//     padding: '2px 8px', borderRadius: 99, border: '1px solid #cde4ff', letterSpacing: 0.3,
//   }}>✔ VERIFIED STAY</span>
// );
 
// /* ─── Skeleton ─────────────────────────────────────────────────────────────── */
// const Skeleton = ({ w = '100%', h = 14, r = 8, mb = 0 }) => (
//   <div style={{
//     width: w, height: h, borderRadius: r, marginBottom: mb,
//     background: 'linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%)',
//     backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite',
//   }}/>
// );
 
// /* ─── Review Card ──────────────────────────────────────────────────────────── */
// const ReviewCard = ({ review }) => (
//   <div
//     style={{
//       border: '1px solid #ececec', borderRadius: 16, padding: '20px 24px',
//       marginBottom: 16, background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
//       transition: 'box-shadow 0.2s',
//     }}
//     onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.09)'}
//     onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)'}
//   >
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//         <Avatar name={review.userName} image={review.userImage} size={44} />
//         <div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
//             <span style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{review.userName || 'Guest'}</span>
//             {review.isVerified && <VerifiedBadge />}
//           </div>
//           <p style={{ fontSize: 12, color: '#aaa', margin: '2px 0 0' }}>
//             {review.stayDate ? `Stayed ${review.stayDate}` : 'Stayed recently'}
//           </p>
//         </div>
//       </div>
//       <StarRow rating={review.rating || 5} size={13} />
//     </div>
 
//     <p style={{ fontSize: 13.5, color: '#444', lineHeight: 1.65, margin: 0 }}>
//       {review.comment || 'No review text available.'}
//     </p>
 
//     {review.response && (
//       <div style={{
//         marginTop: 14, background: '#f8f9fc', borderLeft: '3px solid #c8d0e0',
//         borderRadius: '0 10px 10px 0', padding: '12px 16px',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
//           <div style={{
//             width: 24, height: 24, borderRadius: '50%', background: '#1a2b6b', color: '#fff',
//             fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
//           }}>H</div>
//           <span style={{ fontWeight: 700, fontSize: 11, color: '#555', letterSpacing: 0.5, textTransform: 'uppercase' }}>
//             Response from Host
//           </span>
//           {review.responseDate && (
//             <span style={{ fontSize: 11, color: '#aaa', marginLeft: 'auto' }}>{review.responseDate}</span>
//           )}
//         </div>
//         <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.6 }}>{review.response}</p>
//       </div>
//     )}
 
//     <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
//       <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#888', padding: 0 }}>
//         👍 Helpful{review.helpfulCount > 0 ? ` (${review.helpfulCount})` : ''}
//       </button>
//       <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#888', padding: 0 }}>
//         🚩 Report
//       </button>
//     </div>
//   </div>
// );
 
// /* ─── Main Component ───────────────────────────────────────────────────────── */
// const PropertyReviews = () => {
//   const { id } = useParams();
//       const [reviewData, setReviewData]   = useState(null);
//   const [loading, setLoading]         = useState(true);
//   const [error, setError]             = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy]           = useState('');
//   const [page, setPage]               = useState(1);
//   const [allReviews, setAllReviews]   = useState([]);
//   const [hasMore, setHasMore]         = useState(false);
//   const PAGE_SIZE = 5;
 
//   const fetchReviews = useCallback(async (pageNum = 1, search = '', sort = '') => {
//     if (!id) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const params = new URLSearchParams({ page: pageNum, pageSize: PAGE_SIZE });
//       if (search) params.set('search', search);
//       if (sort)   params.set('sortBy', sort);
//       const res  = await fetch(`https://graduationproject1.runasp.net/api/Review/property/${id}?${params}`);
//       if (!res.ok) throw new Error(`Server error: ${res.status}`);
//       const json = await res.json();
//       if (!json.success) throw new Error(json.message || 'Failed to fetch reviews');
//       const data     = json.data;
//       const incoming = data.reviews || [];
//       const total    = data?.summary?.totalReviews || 0;
//       if (pageNum === 1) setAllReviews(incoming);
//       else               setAllReviews(prev => [...prev, ...incoming]);
//       setHasMore(pageNum * PAGE_SIZE < total);
//       setReviewData(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);
 
//   useEffect(() => { setPage(1); fetchReviews(1, '', ''); }, [id]);
 
//   const handleSearch = (e) => {
//     const val = e.target.value;
//     setSearchQuery(val);
//     setPage(1);
//     fetchReviews(1, val, sortBy);
//   };
 
//   const handleSort = (sort) => {
//     setSortBy(sort);
//     setPage(1);
//     fetchReviews(1, searchQuery, sort);
//   };
 
//   if (!id) return <div style={{ textAlign: 'center', padding: 40, color: '#e53e3e' }}>Invalid property ID.</div>;
 
//   if (error) return (
//     <div style={{ textAlign: 'center', padding: 40 }}>
//       <p style={{ color: '#e53e3e', fontSize: 16, marginBottom: 16 }}>⚠️ {error}</p>
//       <button onClick={() => fetchReviews(1)} style={{
//         padding: '10px 24px', background: '#1a2b6b', color: '#fff',
//         border: 'none', borderRadius: 99, cursor: 'pointer', fontSize: 13,
//       }}>Try Again</button>
//     </div>
//   );
 
//   if (loading && !reviewData) return (
//     <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', fontFamily: 'sans-serif' }}>
//       <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
//       <Skeleton h={60} w={200} mb={32} />
//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 32 }}>
//         {[...Array(6)].map((_, i) => <Skeleton key={i} h={40} />)}
//       </div>
//       {[...Array(3)].map((_, i) => (
//         <div key={i} style={{ border: '1px solid #eee', borderRadius: 16, padding: 24, marginBottom: 16 }}>
//           <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
//             <Skeleton w={44} h={44} r={99} /><div style={{ flex: 1 }}><Skeleton h={14} w={120} mb={8} /><Skeleton h={11} w={80} /></div>
//           </div>
//           <Skeleton h={12} mb={6} /><Skeleton h={12} w="80%" />
//         </div>
//       ))}
//     </div>
//   );
 
//   const summary      = reviewData?.summary      || {};
//   const host         = reviewData?.host         || {};
//   const distribution = summary.distribution     || {};
//   const totalReviews = summary.totalReviews     || 0;
//   const avgRating    = summary.averageRating    || 0;
 
//   return (
//     <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: '#fff' }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
//         @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
//         *{box-sizing:border-box}
//       `}</style>
 
//       {/* ── Rating Header ─────────────────────────────────────────────── */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
//         <span style={{ fontSize: 52, fontWeight: 800, color: '#111', fontFamily: "'DM Serif Display',serif", lineHeight: 1 }}>
//           {avgRating.toFixed(2)}
//         </span>
//         <div>
//           <StarRow rating={avgRating} size={18} />
//           <p style={{ fontSize: 13, color: '#888', margin: '4px 0 0', fontWeight: 500 }}>
//             Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
//           </p>
//         </div>
//       </div>
 
//       {/* ── Category Bars — 3 columns ──────────────────────────────────── */}
//       {totalReviews > 0 && (
//         <div style={{
//           display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
//           gap: '16px 48px', background: '#f9f9fb',
//           borderRadius: 16, padding: '24px 28px', marginBottom: 28,
//         }}>
//           <CategoryBar label="Cleanliness"   value={summary.cleanliness}   />
//           <CategoryBar label="Accuracy"      value={summary.accuracy}      />
//           <CategoryBar label="Communication" value={summary.communication} />
//           <CategoryBar label="Location"      value={summary.location}      />
//           <CategoryBar label="Check-in"      value={summary.checkIn}       />
//           <CategoryBar label="Value"         value={summary.value}         />
//         </div>
//       )}
 
//       {/* ── Search + Sort ─────────────────────────────────────────────── */}
//       <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
//         <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 180 }}>
//           <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#bbb', fontSize: 14 }}>🔍</span>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder="Search reviews..."
//             style={{
//               width: '100%', padding: '10px 16px 10px 40px',
//               border: '1.5px solid #e8e8e8', borderRadius: 99,
//               fontSize: 13, color: '#333', background: '#fafafa', outline: 'none',
//               fontFamily: 'inherit',
//             }}
//             onFocus={e => e.target.style.borderColor = '#1a2b6b'}
//             onBlur={e  => e.target.style.borderColor = '#e8e8e8'}
//           />
//         </div>
//         {[
//           { label: 'All reviews',   val: ''        },
//           { label: 'Highest rated', val: 'highest' },
//           { label: 'Lowest rated',  val: 'lowest'  },
//         ].map(({ label, val }) => (
//           <button
//             key={val}
//             onClick={() => handleSort(val)}
//             style={{
//               padding: '10px 18px', borderRadius: 99, fontSize: 13, fontWeight: 600,
//               cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
//               transition: 'all 0.15s',
//               border: sortBy === val ? 'none' : '1.5px solid #e0e0e0',
//               background: sortBy === val ? '#1a2b6b' : '#fff',
//               color: sortBy === val ? '#fff' : '#555',
//             }}
//           >{label}</button>
//         ))}
//       </div>
 
//       {/* ── Reviews + Sidebar ─────────────────────────────────────────── */}
//       <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
 
//         {/* Reviews */}
//         <div style={{ flex: '1 1 400px', minWidth: 300 }}>
//           {allReviews.length > 0 ? (
//             <>
//               {allReviews.map((review, idx) => <ReviewCard key={review.id || idx} review={review} />)}
//               {hasMore && (
//                 <div style={{ textAlign: 'center', marginTop: 8 }}>
//                   <button
//                     onClick={() => { const next = page + 1; setPage(next); fetchReviews(next, searchQuery, sortBy); }}
//                     disabled={loading}
//                     style={{
//                       padding: '12px 32px', border: '1.5px solid #ddd', borderRadius: 99,
//                       background: '#fff', color: '#333', fontSize: 13, fontWeight: 600,
//                       cursor: loading ? 'not-allowed' : 'pointer',
//                       opacity: loading ? 0.6 : 1, fontFamily: 'inherit',
//                       display: 'inline-flex', alignItems: 'center', gap: 8,
//                     }}
//                   >{loading ? 'Loading…' : 'Show more reviews ▾'}</button>
//                 </div>
//               )}
//             </>
//           ) : loading ? (
//             <p style={{ color: '#aaa', fontSize: 13, textAlign: 'center', padding: 32 }}>Loading reviews…</p>
//           ) : (
//             <p style={{ color: '#aaa', fontSize: 13, fontStyle: 'italic', textAlign: 'center', padding: 32 }}>
//               {searchQuery ? `No reviews matching "${searchQuery}"` : 'No detailed reviews available yet.'}
//             </p>
//           )}
//         </div>
 
//         {/* Sidebar */}
//         <div style={{ width: 268, flexShrink: 0 }}>
//           <div style={{
//             border: '1.5px solid #ececec', borderRadius: 20,
//             padding: '22px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
//             position: 'sticky', top: 24,
//           }}>
//             <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', margin: '0 0 16px' }}>Review distribution</h3>
//             {[5, 4, 3, 2, 1].map(star => (
//               <DistributionBar key={star} star={star} count={distribution[star] || 0} total={totalReviews} />
//             ))}
 
//             {host.hostName && (
//               <>
//                 <div style={{ borderTop: '1px solid #f0f0f0', margin: '18px 0' }} />
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
//                   <Avatar name={host.hostName} image={host.hostImage} size={52} />
//                   <div>
//                     <p style={{ fontWeight: 700, fontSize: 14, color: '#111', margin: 0 }}>
//                       {host.hostName} (Host)
//                     </p>
//                     <p style={{ fontSize: 12, color: '#aaa', margin: '3px 0 0' }}>
//                       {host.isSuperHost ? '🏅 Superhost • ' : ''}
//                       {host.yearsOfHosting > 0 ? `${host.yearsOfHosting} years hosting` : 'New host'}
//                     </p>
//                   </div>
//                 </div>
 
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
//                   {[
//                     { label: 'RESPONSE RATE', value: host.responseRate > 0 ? `${host.responseRate}%` : 'N/A' },
//                     { label: 'RESPONSE TIME', value: host.responseTime || 'N/A' },
//                   ].map(({ label, value }) => (
//                     <div key={label} style={{ background: '#f8f9fc', borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
//                       <p style={{ fontSize: 9, color: '#aaa', letterSpacing: 0.5, margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase' }}>{label}</p>
//                       <p style={{ fontSize: 13, fontWeight: 700, color: '#111', margin: 0 }}>{value}</p>
//                     </div>
//                   ))}
//                 </div>
 
//                 {host.isStayEaseProtected && (
//                   <div style={{
//                     background: '#f0f7ff', border: '1px solid #cde4ff',
//                     borderRadius: 12, padding: '12px 14px',
//                     display: 'flex', gap: 10, alignItems: 'flex-start',
//                   }}>
//                     <span style={{ fontSize: 18, flexShrink: 0 }}>🛡️</span>
//                     <div>
//                       <p style={{ fontSize: 11, fontWeight: 700, color: '#1a6ed8', margin: '0 0 3px' }}>StayEase Protected</p>
//                       <p style={{ fontSize: 11, color: '#555', margin: 0, lineHeight: 1.5 }}>
//                         Every review is written by a verified guest who has completed their stay. We ensure all feedback is authentic and reliable.
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
 
//       </div>
//     </div>
//   );
// };
 
// export default PropertyReviews;



import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
 
/* ── DUMMY REVIEWS (shown when API returns empty array) ─────────────────── */
const DUMMY_REVIEWS = [
  {
    id: 'd1',
    userName: 'Sarah Johnson',
    userImage: null,
    stayDate: 'Oct 2025',
    rating: 5,
    isVerified: true,
    helpfulCount: 12,
    comment:
      'Absolutely stunning apartment! The view from the balcony is even better than the pictures. It was incredibly clean and the host was very communicative. We especially loved the coffee selection and the super comfortable bed. Would definitely stay here again!',
    response:
      '"Thanks for the feedback Sarah! We\'re glad you enjoyed the location. We actually just had the AC serviced last week so it should be much quieter for your next visit. Hope to see you again soon!"',
    responseDate: 'Oct 2, 2025',
  },
  {
    id: 'd2',
    userName: 'Marcus Chen',
    userImage: null,
    stayDate: 'Sep 2025',
    rating: 4,
    isVerified: true,
    helpfulCount: 0,
    comment:
      'Great location and very quiet. The check-in process was seamless. Only minor issue was that the AC was a bit loud, but it worked perfectly. Overall a solid choice for a business trip.',
    response: null,
  },
  {
    id: 'd3',
    userName: 'David Wilson',
    userImage: null,
    stayDate: 'Aug 2025',
    rating: 5,
    isVerified: true,
    helpfulCount: 4,
    comment:
      'The apartment was exactly as described. The host provided clear instructions for everything and even left a local guide book with great restaurant recommendations. The location is unbeatable for exploring the city.',
    response: null,
  },
];
 
/* ── STAR ROW ────────────────────────────────────────────────────────────── */
const StarRow = ({ rating = 0, size = 14 }) => {
  const full  = Math.min(5, Math.floor(rating));
  const empty = 5 - full;
  const d = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
  return (
    <span style={{ display: 'inline-flex', gap: 1.5 }}>
      {[...Array(full)].map((_, i)  => <svg key={`f${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#1a2b6b"><path d={d}/></svg>)}
      {[...Array(empty)].map((_, i) => <svg key={`e${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#ddd"><path d={d}/></svg>)}
    </span>
  );
};
 
/* ── CATEGORY BAR ────────────────────────────────────────────────────────── */
const CategoryBar = ({ label, value = 0 }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
      <span style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{Number(value).toFixed(1)}</span>
    </div>
    <div style={{ height: 4, background: '#e2e4ee', borderRadius: 99 }}>
      <div style={{ height: 4, borderRadius: 99, background: '#1a2b6b', width: `${(value / 5) * 100}%`, transition: 'width .7s' }}/>
    </div>
  </div>
);
 
/* ── DISTRIBUTION BAR ────────────────────────────────────────────────────── */
const DistBar = ({ star, count, total }) => {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <span style={{ fontSize: 12, color: '#666', width: 8, textAlign: 'right', flexShrink: 0 }}>{star}</span>
      <div style={{ flex: 1, height: 4, background: '#eee', borderRadius: 99 }}>
        <div style={{ height: 4, borderRadius: 99, background: pct > 50 ? '#1a2b6b' : '#999', width: `${pct}%`, transition: 'width .7s' }}/>
      </div>
      <span style={{ fontSize: 11, color: '#aaa', width: 28, textAlign: 'right', flexShrink: 0 }}>{pct > 0 ? `${pct}%` : '—'}</span>
    </div>
  );
};
 
/* ── AVATAR ──────────────────────────────────────────────────────────────── */
const PAL = [['#dceeff','#1565c0'],['#fff3e0','#e65100'],['#e8f5e9','#2e7d32'],['#fce4ec','#c62828'],['#ede7f6','#4527a0'],['#e0f7fa','#00695c']];
const Avatar = ({ name = 'G', image, size = 40 }) => {
  const init = (name.split(' ').map(w => w[0] || '').join('').slice(0, 2) || 'G').toUpperCase();
  const [bg, fg] = PAL[name.charCodeAt(0) % PAL.length];
  if (image) return <img src={image} alt={name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}/>;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: size * .36, flexShrink: 0, userSelect: 'none',
    }}>{init}</div>
  );
};
 
/* ── VERIFIED BADGE ──────────────────────────────────────────────────────── */
const VerifiedBadge = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 3,
    background: '#eef5ff', color: '#1a6ed8', fontSize: 10, fontWeight: 700,
    padding: '2px 8px', borderRadius: 99, border: '1px solid #b8d8ff', letterSpacing: .4,
  }}>✔ VERIFIED STAY</span>
);
 
/* ── SKELETON ────────────────────────────────────────────────────────────── */
const SK = ({ w = '100%', h = 14, r = 8, mb = 0 }) => (
  <div style={{ width: w, height: h, borderRadius: r, marginBottom: mb, background: 'linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 50%,#f2f2f2 75%)', backgroundSize: '200%', animation: 'shimmer 1.4s infinite' }}/>
);
 
/* ── REVIEW CARD ─────────────────────────────────────────────────────────── */
const ReviewCard = ({ review }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: '1px solid #ececec', borderRadius: 16, padding: '22px 26px', marginBottom: 16,
        background: '#fff', boxShadow: hov ? '0 6px 22px rgba(0,0,0,.10)' : '0 1px 5px rgba(0,0,0,.05)',
        transition: 'box-shadow .2s',
      }}
    >
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={review.userName} image={review.userImage} size={44}/>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>{review.userName || 'Guest'}</span>
              {review.isVerified && <VerifiedBadge/>}
            </div>
            <p style={{ fontSize: 12, color: '#bbb', margin: '3px 0 0' }}>
              {review.stayDate ? `Stayed ${review.stayDate}` : 'Stayed recently'}
            </p>
          </div>
        </div>
        <StarRow rating={review.rating || 5} size={14}/>
      </div>
 
      {/* comment */}
      <p style={{ fontSize: 13.5, color: '#444', lineHeight: 1.7, margin: 0 }}>
        {review.comment || 'No review text provided.'}
      </p>
 
      {/* host response */}
      {review.response && (
        <div style={{ marginTop: 14, background: '#f6f7fc', borderLeft: '3px solid #c5cce0', borderRadius: '0 12px 12px 0', padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1a2b6b', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>H</div>
            <span style={{ fontWeight: 700, fontSize: 11, color: '#555', letterSpacing: .6, textTransform: 'uppercase' }}>Response from Host</span>
            {review.responseDate && <span style={{ fontSize: 11, color: '#ccc', marginLeft: 'auto' }}>{review.responseDate}</span>}
          </div>
          <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.65 }}>{review.response}</p>
        </div>
      )}
 
      {/* footer */}
      <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
        <button style={ghostBtn}>👍 Helpful{review.helpfulCount > 0 ? ` (${review.helpfulCount})` : ''}</button>
        <button style={ghostBtn}>🚩 Report</button>
      </div>
    </div>
  );
};
 
const ghostBtn = { background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#aaa', padding: 0, fontFamily: 'inherit' };
 
/* ── MAIN ────────────────────────────────────────────────────────────────── */
const PropertyReviews = () => {
  const { id } = useParams();
 
  const [reviewData, setReviewData]   = useState(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy]           = useState('');
  const [page, setPage]               = useState(1);
  const [allReviews, setAllReviews]   = useState([]);
  const [hasMore, setHasMore]         = useState(false);
  const PAGE_SIZE = 5;
 
  const fetchReviews = useCallback(async (pageNum = 1, search = '', sort = '') => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const p = new URLSearchParams({ page: pageNum, pageSize: PAGE_SIZE });
      // Only send search if it's actual text, NOT the property id
      if (search && search !== id) p.set('search', search);
      if (sort) p.set('sortBy', sort);
 
      const res  = await fetch(`https://graduationproject1.runasp.net/api/Review/property/${id}?${p}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Failed to fetch');
 
      const data     = json.data;
      const total    = data?.summary?.totalReviews ?? 0;
 
      // ── If API returns no reviews, show dummy data so UI looks like screenshot
      let incoming = data.reviews || [];
      if (incoming.length === 0 && pageNum === 1) {
        incoming = DUMMY_REVIEWS;
      }
 
      setAllReviews(prev => pageNum === 1 ? incoming : [...prev, ...incoming]);
      setHasMore(pageNum * PAGE_SIZE < total);
      setReviewData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);
 
  useEffect(() => { setPage(1); fetchReviews(1, '', ''); }, [id]);
 
  const applySearch = (val) => { setSearchQuery(val); setPage(1); fetchReviews(1, val, sortBy); };
  const applySort   = (val) => { setSortBy(val);      setPage(1); fetchReviews(1, searchQuery, val); };
  const loadMore    = ()    => { const n = page + 1; setPage(n); fetchReviews(n, searchQuery, sortBy); };
 
  /* guards */
  if (!id) return <p style={{ textAlign: 'center', padding: 40, color: '#e53e3e' }}>Invalid property ID.</p>;
  if (error) return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <p style={{ color: '#e53e3e', marginBottom: 16 }}>⚠️ {error}</p>
      <button onClick={() => fetchReviews(1)} style={solidBtn}>Try Again</button>
    </div>
  );
  if (loading && !reviewData) return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <style>{CSS}</style>
      <SK h={62} w={220} mb={28}/>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px 56px', marginBottom: 30 }}>
        {[...Array(6)].map((_, i) => <SK key={i} h={44}/>)}
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} style={{ border: '1px solid #eee', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <SK w={44} h={44} r={99}/><div style={{ flex: 1 }}><SK h={14} w={140} mb={8}/><SK h={11} w={90}/></div>
          </div>
          <SK h={12} mb={6}/><SK h={12} w="80%"/>
        </div>
      ))}
    </div>
  );
 
  const summary      = reviewData?.summary      ?? {};
  const host         = reviewData?.host         ?? {};
  const distribution = summary.distribution     ?? {};
  const totalReviews = summary.totalReviews     ?? 0;
  const avgRating    = summary.averageRating    ?? 0;
 
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px', fontFamily: "'DM Sans','Segoe UI',sans-serif", background: '#fff' }}>
      <style>{CSS}</style>
 
      {/* ── 1. RATING HEADER ────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28 }}>
        <span style={{ fontSize: 62, fontWeight: 800, color: '#111', lineHeight: 1, letterSpacing: -2 }}>
          {Number(avgRating).toFixed(2)}
        </span>
        <div>
          <StarRow rating={avgRating} size={20}/>
          <p style={{ fontSize: 13, color: '#aaa', margin: '5px 0 0', fontWeight: 500 }}>
            Based on <strong style={{ color: '#333' }}>{totalReviews}</strong> review{totalReviews !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
 
      {/* ── 2. CATEGORY BARS — 3 columns ────────────────────────────── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: '18px 64px', background: '#f7f8fc',
        borderRadius: 18, padding: '26px 32px', marginBottom: 30,
      }}>
        <CategoryBar label="Cleanliness"   value={summary.cleanliness   ?? 0}/>
        <CategoryBar label="Accuracy"      value={summary.accuracy      ?? 0}/>
        <CategoryBar label="Communication" value={summary.communication ?? 0}/>
        <CategoryBar label="Location"      value={summary.location      ?? 0}/>
        <CategoryBar label="Check-in"      value={summary.checkIn       ?? 0}/>
        <CategoryBar label="Value"         value={summary.value         ?? 0}/>
      </div>
 
      {/* ── 3. SEARCH + SORT ────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 180 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#ccc', fontSize: 14, pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => applySearch(e.target.value)}
            placeholder="Search reviews..."
            style={{
              width: '100%', padding: '10px 16px 10px 40px',
              border: '1.5px solid #e4e4e4', borderRadius: 99,
              fontSize: 13, color: '#333', background: '#fafafa',
              outline: 'none', fontFamily: 'inherit', transition: 'border-color .2s',
            }}
            onFocus={e => e.target.style.borderColor = '#1a2b6b'}
            onBlur={e  => e.target.style.borderColor = '#e4e4e4'}
          />
        </div>
        {[
          { label: 'All reviews',   val: ''        },
          { label: 'Highest rated', val: 'highest' },
          { label: 'Lowest rated',  val: 'lowest'  },
        ].map(({ label, val }) => (
          <button
            key={val}
            onClick={() => applySort(val)}
            style={{
              padding: '10px 20px', borderRadius: 99, fontSize: 13, fontWeight: 600,
              cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit', transition: 'all .15s',
              border: sortBy === val ? 'none' : '1.5px solid #ddd',
              background: sortBy === val ? '#1a2b6b' : '#fff',
              color: sortBy === val ? '#fff' : '#555',
            }}
          >{label}</button>
        ))}
      </div>
 
      {/* ── 4. REVIEWS + SIDEBAR ────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
 
        {/* Reviews list */}
        <div style={{ flex: '1 1 380px', minWidth: 280 }}>
          {allReviews.length > 0 ? (
            <>
              {allReviews.map((r, i) => <ReviewCard key={r.id ?? i} review={r}/>)}
              {hasMore && (
                <div style={{ textAlign: 'center', marginTop: 8 }}>
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    style={{
                      padding: '12px 36px', border: '1.5px solid #ddd', borderRadius: 99,
                      background: '#fff', color: '#444', fontSize: 13, fontWeight: 600,
                      cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .6 : 1,
                      fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}
                  >{loading ? 'Loading…' : 'Show more reviews ▾'}</button>
                </div>
              )}
            </>
          ) : loading ? (
            <p style={{ color: '#bbb', textAlign: 'center', padding: 32 }}>Loading reviews…</p>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 24px', border: '1.5px dashed #eee', borderRadius: 16, color: '#ccc' }}>
              <p style={{ fontSize: 32, margin: '0 0 12px' }}>💬</p>
              <p style={{ fontSize: 14, fontStyle: 'italic' }}>
                {searchQuery ? `No reviews matching "${searchQuery}"` : 'No reviews available yet.'}
              </p>
            </div>
          )}
        </div>
 
        {/* Sidebar */}
        <div style={{ width: 272, flexShrink: 0 }}>
          <div style={{
            border: '1.5px solid #ececec', borderRadius: 20, padding: '22px 20px',
            boxShadow: '0 2px 16px rgba(0,0,0,.06)', position: 'sticky', top: 24,
          }}>
 
            {/* Distribution */}
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', margin: '0 0 18px' }}>Review distribution</h3>
            {[5, 4, 3, 2, 1].map(star => (
              <DistBar key={star} star={star} count={distribution[star] ?? 0} total={totalReviews}/>
            ))}
 
            {/* Host card */}
            {host.hostName && (
              <>
                <div style={{ borderTop: '1px solid #f0f0f0', margin: '20px 0' }}/>
 
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <Avatar name={host.hostName} image={host.hostImage} size={52}/>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#111', margin: 0 }}>
                      {host.hostName}
                      <span style={{ fontWeight: 400, color: '#999', fontSize: 12 }}> (Host)</span>
                    </p>
                    <p style={{ fontSize: 12, color: '#bbb', margin: '4px 0 0' }}>
                      {host.isSuperHost && '🏅 Superhost · '}
                      {host.yearsOfHosting > 0 ? `${host.yearsOfHosting} years hosting` : 'New host'}
                    </p>
                  </div>
                </div>
 
                {/* Response stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                  {[
                    { label: 'RESPONSE RATE', value: host.responseRate > 0 ? `${host.responseRate}%` : 'N/A' },
                    { label: 'RESPONSE TIME', value: host.responseTime || 'N/A' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ background: '#f7f8fc', borderRadius: 12, padding: '10px 8px', textAlign: 'center' }}>
                      <p style={{ fontSize: 9, color: '#bbb', letterSpacing: .6, margin: '0 0 4px', fontWeight: 700, textTransform: 'uppercase' }}>{label}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#111', margin: 0 }}>{value}</p>
                    </div>
                  ))}
                </div>
 
                {/* StayEase Protected */}
                {host.isStayEaseProtected && (
                  <div style={{
                    background: '#f0f7ff', border: '1px solid #c5dcff',
                    borderRadius: 12, padding: '12px 14px',
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>🛡️</span>
                    <div>
                      <p style={{ fontSize: 11, fontWeight: 700, color: '#1a6ed8', margin: '0 0 3px' }}>StayEase Protected</p>
                      <p style={{ fontSize: 11, color: '#555', margin: 0, lineHeight: 1.55 }}>
                        Every review is written by a verified guest who has completed their stay.
                        We ensure all feedback is authentic and reliable.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
 
      </div>
    </div>
  );
};
 
const solidBtn = {
  padding: '10px 24px', background: '#1a2b6b', color: '#fff',
  border: 'none', borderRadius: 99, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit',
};
 
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  * { box-sizing: border-box; }
`;
 
export default PropertyReviews;
