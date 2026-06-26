// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';

// // const RECOMMENDATIONS_API = 'https://graduationproject1.runasp.net/api/Review/recommendations';

// // const getPropertyName = (item) =>
// //   item?.title || item?.propertyName || item?.name || 'Property';

// // const getPropertyLocation = (item) => {
// //   if (!item) return '';
// //   if (item.location?.city && item.location?.state)
// //     return `${item.location.city}, ${item.location.state}`;
// //   if (item.location?.city) return item.location.city;
// //   return item.city || item.location || '';
// // };

// // const getPropertyPrice = (item) => {
// //   const price = item?.price || item?.pricePerMonth || item?.monthlyPrice || item?.pricePerNight;
// //   if (!price) return null;
// //   return Number(price).toLocaleString();
// // };

// // const getPriceUnit = (item) => {
// //   if (item?.pricePerNight || item?.priceType === 'night') return 'night';
// //   return 'month';
// // };

// // const getPropertyRating = (item) => {
// //   const r = item?.averageRating ?? item?.rating ?? item?.avgRating;
// //   if (!r) return null;
// //   return Number(r).toFixed(1);
// // };

// // const getPropertyImage = (item) => {
// //   return (
// //     item?.mainImage ||
// //     item?.imageUrl ||
// //     item?.image ||
// //     item?.photos?.[0] ||
// //     item?.images?.[0] ||
// //     null
// //   );
// // };

// // const FALLBACK_IMAGES = [
// //   'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
// //   'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80',
// //   'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
// // ];

// // const PropertyCard = ({ item, index }) => {
// //   const navigate = useNavigate();
// //   const [liked, setLiked] = useState(false);
// //   const name = getPropertyName(item);
// //   const location = getPropertyLocation(item);
// //   const price = getPropertyPrice(item);
// //   const unit = getPriceUnit(item);
// //   const rating = getPropertyRating(item);
// //   const image = getPropertyImage(item) || FALLBACK_IMAGES[index % 3];
// //   const propertyId = item?.id || item?.propertyId;

// //   return (
// //     <div
// //       onClick={() => propertyId && navigate(`/property/${propertyId}`)}
// //       style={{
// //         cursor: 'pointer',
// //         borderRadius: '12px',
// //         overflow: 'hidden',
// //         backgroundColor: '#fff',
// //         boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
// //         transition: 'transform 0.2s ease, box-shadow 0.2s ease',
// //       }}
// //       onMouseEnter={(e) => {
// //         e.currentTarget.style.transform = 'translateY(-3px)';
// //         e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
// //       }}
// //       onMouseLeave={(e) => {
// //         e.currentTarget.style.transform = 'translateY(0)';
// //         e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
// //       }}
// //     >
// //       {/* Image */}
// //       <div style={{ position: 'relative', paddingTop: '66%', backgroundColor: '#e5e7eb' }}>
// //         <img
// //           src={image}
// //           alt={name}
// //           style={{
// //             position: 'absolute',
// //             inset: 0,
// //             width: '100%',
// //             height: '100%',
// //             objectFit: 'cover',
// //           }}
// //           onError={(e) => { e.target.src = FALLBACK_IMAGES[index % 3]; }}
// //         />
// //         {/* Heart */}
// //         <button
// //           onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
// //           style={{
// //             position: 'absolute',
// //             top: '10px',
// //             right: '10px',
// //             width: '32px',
// //             height: '32px',
// //             borderRadius: '50%',
// //             backgroundColor: 'rgba(255,255,255,0.9)',
// //             border: 'none',
// //             cursor: 'pointer',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             fontSize: '15px',
// //             boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
// //           }}
// //         >
// //           {liked ? '❤️' : '🤍'}
// //         </button>
// //       </div>

// //       {/* Info */}
// //       <div style={{ padding: '12px 14px' }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
// //           <span style={{ fontWeight: '600', fontSize: '14px', color: '#111827' }}>{name}</span>
// //           {rating && (
// //             <span style={{ fontSize: '12px', color: '#374151', display: 'flex', alignItems: 'center', gap: '2px' }}>
// //               ⭐ {rating}
// //             </span>
// //           )}
// //         </div>
// //         {location && (
// //           <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 6px' }}>{location}</p>
// //         )}
// //         {price && (
// //           <p style={{ fontSize: '13px', color: '#111827', margin: 0 }}>
// //             <strong>${price}</strong>
// //             <span style={{ color: '#9ca3af', fontWeight: '400' }}> / {unit}</span>
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // const ReviewSuccess = () => {
// //   const navigate = useNavigate();
// //   const [recommendations, setRecommendations] = useState([]);
// //   const [loadingRec, setLoadingRec] = useState(true);

// //   useEffect(() => {
// //     const fetchRecommendations = async () => {
// //       const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');
// //       try {
// //         const res = await axios.get(RECOMMENDATIONS_API, {
// //           headers: token ? { Authorization: `Bearer ${token}` } : {},
// //         });
// //         const data = res.data;
// //         const list = Array.isArray(data)
// //           ? data
// //           : Array.isArray(data?.data) ? data.data
// //           : Array.isArray(data?.items) ? data.items
// //           : Array.isArray(data?.properties) ? data.properties
// //           : [];
// //         setRecommendations(list.slice(0, 3));
// //       } catch (err) {
// //         console.error('Recommendations error:', err?.response?.data);
// //         setRecommendations([]);
// //       } finally {
// //         setLoadingRec(false);
// //       }
// //     };

// //     fetchRecommendations();
// //   }, []);

// //   return (
// //     <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

// //       {/* Success Card */}
// //       <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 16px 0' }}>
// //         <div style={{
// //           backgroundColor: '#fff',
// //           borderRadius: '16px',
// //           padding: '48px 40px',
// //           textAlign: 'center',
// //           boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05)',
// //         }}>
// //           {/* Check icon */}
// //           <div style={{
// //             width: '64px',
// //             height: '64px',
// //             borderRadius: '50%',
// //             backgroundColor: '#f0fdf4',
// //             border: '2px solid #bbf7d0',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             margin: '0 auto 24px',
// //             fontSize: '28px',
// //           }}>
// //             ✓
// //           </div>

// //           <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 12px' }}>
// //             Thank you for your review!
// //           </h1>
// //           <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6', margin: '0 0 32px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
// //             Your feedback helps improve the Stay Match community and assists other travelers in making better choices. We appreciate you taking the time to share your experience.
// //           </p>

// //           <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
// //             <button
// //               onClick={() => navigate('/')}
// //               style={{
// //                 backgroundColor: '#1b2a4e',
// //                 color: '#fff',
// //                 border: 'none',
// //                 borderRadius: '8px',
// //                 padding: '11px 28px',
// //                 fontSize: '14px',
// //                 fontWeight: '600',
// //                 cursor: 'pointer',
// //               }}
// //             >
// //               Return to Home
// //             </button>
// //             <button
// //               onClick={() => navigate('/browse')}
// //               style={{
// //                 backgroundColor: '#fff',
// //                 color: '#374151',
// //                 border: '1px solid #d1d5db',
// //                 borderRadius: '8px',
// //                 padding: '11px 28px',
// //                 fontSize: '14px',
// //                 fontWeight: '600',
// //                 cursor: 'pointer',
// //               }}
// //             >
// //               Explore More
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Recommendations */}
// //       <div style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 16px 60px' }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
// //           <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
// //             Recommended for You
// //           </h2>
// //           {/* <button
// //             onClick={() => navigate('/browse')}
// //             style={{
// //               background: 'none',
// //               border: 'none',
// //               fontSize: '13px',
// //               fontWeight: '600',
// //               color: '#1b2a4e',
// //               cursor: 'pointer',
// //               textDecoration: 'underline',
// //             }}
// //           >
// //             View All
// //           </button> */}
// //         </div>

// //         {loadingRec ? (
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
// //             {[1, 2, 3].map((i) => (
// //               <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff' }}>
// //                 <div style={{ paddingTop: '66%', backgroundColor: '#e5e7eb', animation: 'pulse 1.5s ease-in-out infinite' }} />
// //                 <div style={{ padding: '12px 14px' }}>
// //                   <div style={{ height: '14px', backgroundColor: '#e5e7eb', borderRadius: '4px', marginBottom: '8px' }} />
// //                   <div style={{ height: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px', width: '60%' }} />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         ) : recommendations.length > 0 ? (
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
// //             {recommendations.map((item, i) => (
// //               <PropertyCard key={item?.id || item?.propertyId || i} item={item} index={i} />
// //             ))}
// //           </div>
// //         ) : (
// //           /* Fallback static cards if API returns empty */
// //           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
// //             {[
// //               { name: 'Downtown Studio', location: 'Manhattan, NY', price: '1,200', rating: '4.9', img: FALLBACK_IMAGES[0] },
// //               { name: 'Seaside Villa', location: 'Malibu, CA', price: '3,500', rating: '4.8', img: FALLBACK_IMAGES[1] },
// //               { name: 'Skyline Penthouse', location: 'Chicago, IL', price: '5,000', rating: '5.0', img: FALLBACK_IMAGES[2] },
// //             ].map((p, i) => (
// //               <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' }}>
// //                 <div style={{ position: 'relative', paddingTop: '66%' }}>
// //                   <img src={p.img} alt={p.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
// //                   <button style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', fontSize: '15px' }}>🤍</button>
// //                 </div>
// //                 <div style={{ padding: '12px 14px' }}>
// //                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
// //                     <span style={{ fontWeight: '600', fontSize: '14px', color: '#111827' }}>{p.name}</span>
// //                     <span style={{ fontSize: '12px', color: '#374151' }}>⭐ {p.rating}</span>
// //                   </div>
// //                   <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 6px' }}>{p.location}</p>
// //                   <p style={{ fontSize: '13px', color: '#111827', margin: 0 }}>
// //                     <strong>${p.price}</strong><span style={{ color: '#9ca3af' }}> / month</span>
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* Stats */}
// //       <div style={{ backgroundColor: '#fff', borderTop: '1px solid #f3f4f6', padding: '40px 16px' }}>
// //         <div style={{ maxWidth: '600px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
// //           {[
// //             { value: '50k+', label: 'REVIEWS SHARED' },
// //             { value: '12k+', label: 'VERIFIED HOSTS' },
// //             { value: '98%', label: 'HAPPY TENANTS' },
// //           ].map((stat) => (
// //             <div key={stat.label}>
// //               <div style={{ fontSize: '28px', fontWeight: '800', color: '#1b2a4e' }}>{stat.value}</div>
// //               <div style={{ fontSize: '10px', letterSpacing: '1.2px', color: '#9ca3af', fontWeight: '600', marginTop: '4px' }}>{stat.label}</div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <style>{`
// //         @keyframes pulse {
// //           0%, 100% { opacity: 1; }
// //           50% { opacity: 0.5; }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default ReviewSuccess;























// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
 
// const RECOMMENDATIONS_API = 'https://graduationproject1.runasp.net/api/Review/recommendations';
 
// const extractList = (data) => {
//   if (!data) return [];
//   if (Array.isArray(data)) return data;
//   const keys = ['data', 'items', 'properties', 'result', 'results', 'recommendations', 'list'];
//   for (const k of keys) {
//     if (Array.isArray(data[k])) return data[k];
//     if (data[k] && Array.isArray(data[k]?.data)) return data[k].data;
//   }
//   return [];
// };
 
// const getName = (item) =>
//   item?.title ?? item?.propertyName ?? item?.name ?? item?.propertyTitle ?? 'Property';
 
// const getLocation = (item) => {
//   const loc = item?.location;
//   if (typeof loc === 'string') return loc;
//   if (loc?.fullAddress) return loc.fullAddress;
//   if (loc?.city && loc?.state) return `${loc.city}, ${loc.state}`;
//   if (loc?.city) return loc.city;
//   return item?.city ?? item?.address ?? item?.area ?? '';
// };
 
// const getPrice = (item) => {
//   const p = item?.price ?? item?.pricePerMonth ?? item?.monthlyPrice ?? item?.pricePerNight ?? item?.rentPrice ?? item?.cost;
//   if (p == null) return null;
//   return Number(p).toLocaleString();
// };
 
// const getPriceUnit = (item) => {
//   if (item?.pricePerNight != null || item?.priceType === 'night' || item?.rentalType === 'daily') return 'night';
//   return 'month';
// };
 
// const getRating = (item) => {
//   const r = item?.averageRating ?? item?.rating ?? item?.avgRating ?? item?.stars ?? item?.overallRating;
//   if (r == null) return null;
//   return Number(r).toFixed(1);
// };
 
// const getImage = (item) => {
//   const direct = [item?.mainImage, item?.imageUrl, item?.image, item?.coverImage, item?.thumbnail, item?.profileImage];
//   for (const c of direct) {
//     if (typeof c === 'string' && c.length > 0) return c;
//   }
//   const arrays = [item?.photos, item?.images, item?.gallery, item?.media];
//   for (const arr of arrays) {
//     if (!Array.isArray(arr) || arr.length === 0) continue;
//     const first = arr[0];
//     if (typeof first === 'string') return first;
//     if (first?.url) return first.url;
//     if (first?.imageUrl) return first.imageUrl;
//     if (first?.path) return first.path;
//   }
//   return null;
// };
 
// const buildImageUrl = (raw) => {
//   if (!raw) return null;
//   if (raw.startsWith('http')) return raw;
//   return `https://graduationproject1.runasp.net/${raw.replace(/^\//, '')}`;
// };
 
// const FALLBACKS = [
//   'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
//   'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
//   'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
// ];
 
// const PropertyCard = ({ item, index }) => {
//   const navigate = useNavigate();
//   const [liked, setLiked] = useState(false);
//   const rawImg = getImage(item);
//   const [imgSrc, setImgSrc] = useState(buildImageUrl(rawImg) || FALLBACKS[index % 3]);
 
//   const name     = getName(item);
//   const location = getLocation(item);
//   const price    = getPrice(item);
//   const unit     = getPriceUnit(item);
//   const rating   = getRating(item);
//   const propId   = item?.id ?? item?.propertyId ?? item?.propertyID;
 
//   return (
//     <div
//       onClick={() => propId && navigate(`/property/${propId}`)}
//       style={{
//         cursor: 'pointer', borderRadius: '14px', overflow: 'hidden',
//         backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
//         transition: 'transform 0.2s ease, box-shadow 0.2s ease',
//       }}
//       onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.13)'; }}
//       onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.07)'; }}
//     >
//       <div style={{ position: 'relative', paddingTop: '65%', backgroundColor: '#e5e7eb' }}>
//         <img
//           src={imgSrc}
//           alt={name}
//           onError={() => setImgSrc(FALLBACKS[index % 3])}
//           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
//         />
//         <button
//           onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }}
//           style={{
//             position: 'absolute', top: '10px', right: '10px', width: '34px', height: '34px',
//             borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.92)', border: 'none',
//             cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
//             fontSize: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
//             transition: 'transform 0.15s ease',
//           }}
//           onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
//           onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//         >
//           {liked ? '❤️' : '🤍'}
//         </button>
//       </div>
 
//       <div style={{ padding: '13px 15px 15px' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
//           <span style={{ fontWeight: '600', fontSize: '14px', color: '#111827', lineHeight: '1.3' }}>{name}</span>
//           {rating && (
//             <span style={{ fontSize: '12px', color: '#374151', whiteSpace: 'nowrap' }}>⭐ {rating}</span>
//           )}
//         </div>
//         {location && <p style={{ fontSize: '12px', color: '#6b7280', margin: '3px 0 7px' }}>{location}</p>}
//         {price && (
//           <p style={{ fontSize: '13px', color: '#111827', margin: 0 }}>
//             <strong>${price}</strong>
//             <span style={{ color: '#9ca3af', fontWeight: '400' }}> / {unit}</span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
 
// const SkeletonCard = () => (
//   <div style={{ borderRadius: '14px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
//     <div style={{ paddingTop: '65%', backgroundColor: '#e5e7eb', animation: 'shimmer 1.4s ease-in-out infinite' }} />
//     <div style={{ padding: '13px 15px 15px' }}>
//       <div style={{ height: '14px', backgroundColor: '#e5e7eb', borderRadius: '6px', marginBottom: '8px', animation: 'shimmer 1.4s ease-in-out infinite' }} />
//       <div style={{ height: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px', width: '55%', marginBottom: '8px', animation: 'shimmer 1.4s ease-in-out infinite' }} />
//       <div style={{ height: '13px', backgroundColor: '#e5e7eb', borderRadius: '6px', width: '40%', animation: 'shimmer 1.4s ease-in-out infinite' }} />
//     </div>
//   </div>
// );
 
// const ReviewSuccess = () => {
//   const navigate = useNavigate();
//   const [recommendations, setRecommendations] = useState([]);
//   const [loadingRec, setLoadingRec]           = useState(true);
//   const [apiError, setApiError]               = useState('');
 
//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       setLoadingRec(true);
//       setApiError('');
//       const token = (
//         localStorage.getItem('userToken') ||
//         localStorage.getItem('token') ||
//         ''
//       ).replace(/"/g, '');
 
//       try {
//         const res = await axios.get(RECOMMENDATIONS_API, {
//           headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
//         });
//         console.log('Recommendations raw:', res.data);
//         const list = extractList(res.data);
//         console.log('Extracted list length:', list.length);
//         setRecommendations(list.slice(0, 3));
//       } catch (err) {
//         console.error('Recommendations error:', err?.response?.status, err?.response?.data);
//         setApiError(err?.response?.data?.message || '');
//         setRecommendations([]);
//       } finally {
//         setLoadingRec(false);
//       }
//     };
//     fetchRecommendations();
//   }, []);
 
//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
 
//       {/* Success Card */}
//       <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 16px 0' }}>
//         <div style={{
//           backgroundColor: '#fff', borderRadius: '16px', padding: '48px 40px',
//           textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 20px rgba(0,0,0,0.05)',
//         }}>
//           <div style={{
//             width: '68px', height: '68px', borderRadius: '50%',
//             backgroundColor: '#f0fdf4', border: '2px solid #86efac',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             margin: '0 auto 24px', fontSize: '30px', color: '#16a34a',
//           }}>✓</div>
 
//           <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 12px' }}>
//             Thank you for your review!
//           </h1>
//           <p style={{
//             fontSize: '14px', color: '#6b7280', lineHeight: '1.7',
//             margin: '0 0 32px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto',
//           }}>
//             Your feedback helps improve the Stay Match community and assists other travelers in making better choices.
//             We appreciate you taking the time to share your experience.
//           </p>
 
//           <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
//             <button
//               onClick={() => navigate('/')}
//               style={{
//                 backgroundColor: '#1b2a4e', color: '#fff', border: 'none',
//                 borderRadius: '8px', padding: '11px 28px', fontSize: '14px',
//                 fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s',
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#243761')}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1b2a4e')}
//             >
//               Return to Home
//             </button>
//             <button
//               onClick={() => navigate('/browse')}
//               style={{
//                 backgroundColor: '#fff', color: '#374151', border: '1px solid #d1d5db',
//                 borderRadius: '8px', padding: '11px 28px', fontSize: '14px',
//                 fontWeight: '600', cursor: 'pointer', transition: 'border-color 0.2s',
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#9ca3af')}
//               onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
//             >
//               Explore More
//             </button>
//           </div>
//         </div>
//       </div>
 
//       {/* Recommendations */}
//       <div style={{ maxWidth: '820px', margin: '0 auto', padding: '44px 16px 60px' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//           <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
//             Recommended for You
//           </h2>
//           <button
//             onClick={() => navigate('/browse')}
//             style={{ background: 'none', border: 'none', fontSize: '13px', fontWeight: '600', color: '#1b2a4e', cursor: 'pointer', textDecoration: 'underline' }}
//           >
//             View All
//           </button>
//         </div>
 
//         {loadingRec && (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
//             <SkeletonCard /><SkeletonCard /><SkeletonCard />
//           </div>
//         )}
 
//         {!loadingRec && recommendations.length > 0 && (
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
//             {recommendations.map((item, i) => (
//               <PropertyCard key={item?.id ?? item?.propertyId ?? i} item={item} index={i} />
//             ))}
//           </div>
//         )}
 
//         {!loadingRec && recommendations.length === 0 && (
//           <div style={{
//             textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff',
//             borderRadius: '12px', color: '#6b7280', fontSize: '14px',
//           }}>
//             {apiError || 'No recommendations available at the moment.'}
//           </div>
//         )}
//       </div>
 
//       {/* Stats */}
//       <div style={{ backgroundColor: '#fff', borderTop: '1px solid #f3f4f6', padding: '40px 16px' }}>
//         <div style={{ maxWidth: '560px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
//           {[
//             { value: '50k+', label: 'REVIEWS SHARED' },
//             { value: '12k+', label: 'VERIFIED HOSTS' },
//             { value: '98%',  label: 'HAPPY TENANTS' },
//           ].map((stat) => (
//             <div key={stat.label}>
//               <div style={{ fontSize: '28px', fontWeight: '800', color: '#1b2a4e' }}>{stat.value}</div>
//               <div style={{ fontSize: '10px', letterSpacing: '1.2px', color: '#9ca3af', fontWeight: '600', marginTop: '4px' }}>{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>
 
//       <style>{`
//         @keyframes shimmer {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.45; }
//         }
//       `}</style>
//     </div>
//   );
// };
 
// export default ReviewSuccess;

















import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RECOMMENDATIONS_API = 'https://graduationproject1.runasp.net/api/Review/recommendations';

const extractList = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (data?.data?.recommendedProperties && Array.isArray(data.data.recommendedProperties))
    return data.data.recommendedProperties;
  if (data?.recommendedProperties && Array.isArray(data.recommendedProperties))
    return data.recommendedProperties;
  const keys = ['data', 'items', 'properties', 'result', 'results', 'recommendations', 'list'];
  for (const k of keys) {
    if (Array.isArray(data[k])) return data[k];
    if (data[k] && Array.isArray(data[k]?.data)) return data[k].data;
    if (data[k] && Array.isArray(data[k]?.recommendedProperties)) return data[k].recommendedProperties;
  }
  return [];
};

const getName = (item) =>
  item?.title ?? item?.propertyName ?? item?.name ?? item?.propertyTitle ?? 'Property';

const getLocation = (item) => {
  const loc = item?.location;
  if (typeof loc === 'string') return loc;
  if (loc?.fullAddress) return loc.fullAddress;
  if (loc?.city && loc?.state) return `${loc.city}, ${loc.state}`;
  if (loc?.city) return loc.city;
  return item?.city ?? item?.address ?? item?.area ?? '';
};

const getPrice = (item) => {
  const p =
    item?.price ??
    item?.monthlyRent ??
    item?.pricePerMonth ??
    item?.monthlyPrice ??
    item?.pricePerNight ??
    item?.rentPrice ??
    item?.cost;
  if (p == null || p === 0) return null;
  return Number(p).toLocaleString();
};

const getPriceUnit = (item) => {
  if (item?.pricePerNight != null || item?.priceType === 'night' || item?.rentalType === 'daily')
    return 'night';
  return 'month';
};

const getRating = (item) => {
  const r =
    item?.averageRating ?? item?.rating ?? item?.avgRating ?? item?.stars ?? item?.overallRating;
  if (r == null || r === 0) return null;
  return Number(r).toFixed(1);
};

const getImage = (item) => {
  const direct = [
    item?.mainImage,
    item?.imageUrl,
    item?.image,
    item?.coverImage,
    item?.thumbnail,
    item?.profileImage,
  ];
  for (const c of direct) {
    if (typeof c === 'string' && c.length > 0) return c;
  }
  const arrays = [item?.photos, item?.images, item?.gallery, item?.media];
  for (const arr of arrays) {
    if (!Array.isArray(arr) || arr.length === 0) continue;
    const first = arr[0];
    if (typeof first === 'string') return first;
    if (first?.url) return first.url;
    if (first?.imageUrl) return first.imageUrl;
    if (first?.path) return first.path;
  }
  return null;
};

const buildImageUrl = (raw) => {
  if (!raw) return null;
  if (raw.startsWith('http')) return raw;
  return `https://graduationproject1.runasp.net/${raw.replace(/^\//, '')}`;
};

const FALLBACKS = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
  'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
];

const PropertyCard = ({ item, index }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const rawImg = getImage(item);
  const [imgSrc, setImgSrc] = useState(buildImageUrl(rawImg) || FALLBACKS[index % 3]);

  const name = getName(item);
  const location = getLocation(item);
  const price = getPrice(item);
  const unit = getPriceUnit(item);
  const rating = getRating(item);
  const propId = item?.id ?? item?.propertyId ?? item?.propertyID;

  return (
    <div
      onClick={() => propId && navigate(`/property/${propId}`)}
      style={{
        cursor: 'pointer',
        borderRadius: '14px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.13)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.07)';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '65%', backgroundColor: '#e5e7eb' }}>
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgSrc(FALLBACKS[index % 3])}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.92)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
            transition: 'transform 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: '13px 15px 15px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontWeight: '600',
              fontSize: '14px',
              color: '#111827',
              lineHeight: '1.3',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {name}
          </span>
          {rating && (
            <span style={{ fontSize: '12px', color: '#374151', whiteSpace: 'nowrap' }}>
              ⭐ {rating}
            </span>
          )}
        </div>
        {location && (
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '3px 0 7px' }}>{location}</p>
        )}
        {price ? (
          <p style={{ fontSize: '13px', color: '#111827', margin: 0 }}>
            <strong>${price}</strong>
            <span style={{ color: '#9ca3af', fontWeight: '400' }}> / {unit}</span>
          </p>
        ) : (
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0, fontStyle: 'italic' }}>
            Price not listed
          </p>
        )}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div
    style={{
      borderRadius: '14px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
    }}
  >
    <div
      style={{
        paddingTop: '65%',
        backgroundColor: '#e5e7eb',
        animation: 'shimmer 1.4s ease-in-out infinite',
      }}
    />
    <div style={{ padding: '13px 15px 15px' }}>
      <div
        style={{
          height: '14px',
          backgroundColor: '#e5e7eb',
          borderRadius: '6px',
          marginBottom: '8px',
          animation: 'shimmer 1.4s ease-in-out infinite',
        }}
      />
      <div
        style={{
          height: '12px',
          backgroundColor: '#f3f4f6',
          borderRadius: '6px',
          width: '55%',
          marginBottom: '8px',
          animation: 'shimmer 1.4s ease-in-out infinite',
        }}
      />
      <div
        style={{
          height: '13px',
          backgroundColor: '#e5e7eb',
          borderRadius: '6px',
          width: '40%',
          animation: 'shimmer 1.4s ease-in-out infinite',
        }}
      />
    </div>
  </div>
);

const ReviewSuccess = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRec, setLoadingRec] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoadingRec(true);
      setApiError('');
      const token = (
        localStorage.getItem('userToken') ||
        localStorage.getItem('token') ||
        ''
      ).replace(/"/g, '');

      try {
        const res = await axios.get(RECOMMENDATIONS_API, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
        console.log('Recommendations raw:', res.data);
        const list = extractList(res.data);
        console.log('Extracted list:', list);
        setRecommendations(list);
      } catch (err) {
        console.error('Recommendations error:', err?.response?.status, err?.response?.data);
        setApiError(err?.response?.data?.message || 'Failed to load recommendations.');
        setRecommendations([]);
      } finally {
        setLoadingRec(false);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>

      {/* ── Success Card ── */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '60px 16px 0' }}>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            padding: '48px 40px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.07), 0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          {/* Check icon */}
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: '#f0fdf4',
              border: '2px solid #86efac',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '30px',
              color: '#16a34a',
            }}
          >
            ✓
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0 0 12px' }}>
            Thank you for your review!
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.7',
              margin: '0 0 32px',
              maxWidth: '420px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Your feedback helps improve the Stay Match community and assists other travelers in
            making better choices. We appreciate you taking the time to share your experience.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#1b2a4e',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '11px 28px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#243761')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1b2a4e')}
            >
              Return to Home
            </button>
            <button
              onClick={() => navigate('/browse')}
              style={{
                backgroundColor: '#fff',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                padding: '11px 28px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#9ca3af')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
            >
              Explore More
            </button>
          </div>
        </div>
      </div>

      {/* ── Recommendations ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '44px 16px 60px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
            Recommended for You
            {!loadingRec && recommendations.length > 0 && (
              <span
                style={{
                  marginLeft: '8px',
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#6b7280',
                }}
              >
                ({recommendations.length})
              </span>
            )}
          </h2>
          <button
            onClick={() => navigate('/browse')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              color: '#1b2a4e',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            View All
          </button>
        </div>

        {/* Loading skeletons */}
        {loadingRec && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Dynamic API cards */}
        {!loadingRec && recommendations.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '16px',
            }}
          >
            {recommendations.map((item, i) => (
              <PropertyCard key={item?.id ?? item?.propertyId ?? i} item={item} index={i} />
            ))}
          </div>
        )}

        {/* Empty / error state */}
        {!loadingRec && recommendations.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '48px 20px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              color: '#6b7280',
              fontSize: '14px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏠</div>
            <p style={{ margin: 0, fontWeight: '500' }}>
              {apiError || 'No recommendations available at the moment.'}
            </p>
          </div>
        )}
      </div>

      {/* ── Stats ── */}
      <div
        style={{ backgroundColor: '#fff', borderTop: '1px solid #f3f4f6', padding: '40px 16px' }}
      >
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            textAlign: 'center',
          }}
        >
          {[
            { value: '50k+', label: 'REVIEWS SHARED' },
            { value: '12k+', label: 'VERIFIED HOSTS' },
            { value: '98%', label: 'HAPPY TENANTS' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#1b2a4e' }}>
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  letterSpacing: '1.2px',
                  color: '#9ca3af',
                  fontWeight: '600',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>
    </div>
  );
};

export default ReviewSuccess;