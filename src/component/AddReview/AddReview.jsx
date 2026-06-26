// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
 
// const BOOKING_API = 'https://graduationproject1.runasp.net/api/Booking';
// const REVIEW_API = 'https://graduationproject1.runasp.net/api/Review/AddReview';
 
// const formatDate = (value) => {
//   if (!value) return '';
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return String(value);
//   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// };
 
// const parseBookingList = (data) => {
//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data.items)) return data.items;
//   if (Array.isArray(data.bookings)) return data.bookings;
//   if (Array.isArray(data.data?.bookings)) return data.data.bookings;
//   if (Array.isArray(data.data)) return data.data;
//   return [];
// };
 
// const getLocation = (item) => {
//   if (!item) return '';
//   if (item.location?.fullAddress) return item.location.fullAddress;
//   if (item.location?.city) return [item.location.street, item.location.city].filter(Boolean).join(', ');
//   return item.location || item.city || item.address || '';
// };
 
// const getBookingName = (item) => {
//   return item?.title || item?.propertyName || item?.roomName || item?.name || 'your stay';
// };
 
// const getHostName = (item) => {
//   return item?.hostName || item?.host?.name || item?.host?.fullName || item?.ownerName || '';
// };
 
// const getStayDateRange = (item) => {
//   const start = item?.moveInDate || item?.startDate || item?.checkInDate || item?.fromDate;
//   if (!start) return '';
//   const date = new Date(start);
//   if (Number.isNaN(date.getTime())) return String(start);
 
//   const duration = Number(item?.duration ?? item?.nights ?? item?.months ?? 0);
//   if (!duration || Number.isNaN(duration)) return formatDate(date);
 
//   const end = new Date(date);
//   if (duration <= 31) {
//     end.setDate(end.getDate() + duration - 1);
//   } else {
//     end.setMonth(end.getMonth() + duration);
//   }
 
//   return `${formatDate(date)} - ${formatDate(end)}`;
// };
 
// const StarRating = ({ label, value, onChange }) => (
//   <div style={{ marginBottom: '16px' }}>
//     <div style={{
//       fontSize: '10px',
//       fontWeight: '700',
//       letterSpacing: '1.2px',
//       textTransform: 'uppercase',
//       color: '#9ca3af',
//       marginBottom: '6px',
//     }}>
//       {label}
//     </div>
//     <div style={{ display: 'flex', gap: '4px' }}>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           onClick={() => onChange(star)}
//           style={{
//             cursor: 'pointer',
//             fontSize: '22px',
//             color: star <= value ? '#1b2a4e' : '#d1d5db',
//             transition: 'color 0.15s ease',
//             lineHeight: 1,
//             userSelect: 'none',
//           }}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   </div>
// );
 
// const AddReview = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     accuracy: 0,
//     cleanliness: 0,
//     location: 0,
//     checkIn: 0,
//     value: 0,
//     communication: 0,
//     comment: '',
//   });
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);
 
//   useEffect(() => {
//     const fetchBooking = async () => {
//       setLoading(true);
//       setError('');
//       const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');
//       if (!token) {
//         setError('Please login first to see the booking details.');
//         setLoading(false);
//         return;
//       }
 
//       try {
//         const response = await axios.get(`${BOOKING_API}/my-bookings?page=1&pageSize=50`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
 
//         const bookings = parseBookingList(response.data);
//         const booking = bookings.find(
//           (item) =>
//             String(item.id) === String(id) ||
//             String(item.bookingId) === String(id) ||
//             String(item.bookingID) === String(id)
//         );
 
//         if (!booking) {
//           setError('Booking data not found.');
//         } else {
//           setBookingData(booking);
//         }
//       } catch (fetchError) {
//         console.error(fetchError);
//         setError(fetchError?.response?.data?.message || 'Unable to load booking data.');
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchBooking();
//   }, [id]);
 
//   const handleRating = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
 
//     const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');
 
//     const payload = {
//       bookingId: bookingData?.id || bookingData?.bookingId || bookingData?.bookingID || 0,
//       accuracy: formData.accuracy,
//       cleanliness: formData.cleanliness,
//       location: formData.location,
//       checkIn: formData.checkIn,
//       value: formData.value,
//       communication: formData.communication,
//       comment: formData.comment,
//     };
 
//     try {
//       await axios.post(REVIEW_API, payload, {
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//       });
//       alert('Review submitted successfully!');
//       navigate(-1);
//     } catch (err) {
//       console.error('Submit error:', err);
//       alert(err?.response?.data?.message || 'Failed to submit review. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };
 
//   const title = getBookingName(bookingData);
//   const stayRange = getStayDateRange(bookingData);
//   const hostName = getHostName(bookingData);
 
//   const charCount = formData.comment.length;
 
//   return ( 
//     <div  style={{   minHeight: '100vh', backgroundColor: '#f3f4f6', paddingTop: '40px', paddingBottom: '60px' }}>
//       {/* Page label */}
//       <div style={{ maxWidth: '920px', margin: '0 auto', padding: '0 16px 16px' }}>
//         <span style={{ fontSize: '13px', color: '#9ca3af' }}>Write review</span>
//       </div>
 
//       {/* Card */}
//       <div style={{
//         maxWidth: '820px',
//         margin: '0 auto',
//         padding: '0 16px',
//       }}>
//         {loading && (
//           <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
//             Loading booking details...
//           </div>
//         )}
 
//         {error && (
//           <div style={{
//             backgroundColor: '#fef2f2',
//             border: '1px solid #fecaca',
//             borderRadius: '12px',
//             padding: '16px',
//             color: '#dc2626',
//             marginBottom: '16px',
//           }}>
//             {error}
//           </div>
//         )}
 
//         {!loading && !error && bookingData && (
//           <div style={{
//             backgroundColor: '#ffffff',
//             borderRadius: '16px',
//             boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
//             padding: '36px',
//           }}>
//             {/* Header */}
//             <div style={{ marginBottom: '28px' }}>
//               <h1 style={{
//                 fontSize: '22px',
//                 fontWeight: '700',
//                 color: '#111827',
//                 margin: '0 0 6px',
//               }}>
//                 How was your stay at {title}?
//               </h1>
//               {stayRange && (
//                 <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
//                   <span>📅</span>
//                   <span>Stay dates: {stayRange}</span>
//                 </p>
//               )}
//             </div>
 
//             <form onSubmit={handleSubmit}>
//               {/* Rating Row */}
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
//                 {/* Rate the Place */}
//                 <div style={{
//                   backgroundColor: '#f9fafb',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '12px',
//                   padding: '20px',
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
//                     <span style={{ fontSize: '16px' }}>🏢</span>
//                     <span style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>Rate the Place</span>
//                   </div>
//                   <StarRating label="Accuracy" value={formData.accuracy} onChange={(v) => handleRating('accuracy', v)} />
//                   <StarRating label="Cleanliness" value={formData.cleanliness} onChange={(v) => handleRating('cleanliness', v)} />
//                   <StarRating label="Location" value={formData.location} onChange={(v) => handleRating('location', v)} />
//                   <StarRating label="Check In" value={formData.checkIn} onChange={(v) => handleRating('checkIn', v)} />
//                   <StarRating label="Value" value={formData.value} onChange={(v) => handleRating('value', v)} />
//                 </div>
 
//                 {/* Rate the Host */}
//                 <div style={{
//                   backgroundColor: '#f9fafb',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '12px',
//                   padding: '20px',
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
//                     <span style={{ fontSize: '16px' }}>👤</span>
//                     <span style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>Rate the Host</span>
//                   </div>
//                   <StarRating label="Communication" value={formData.communication} onChange={(v) => handleRating('communication', v)} />
//                   <div style={{
//                     backgroundColor: '#eff6ff',
//                     borderRadius: '8px',
//                     padding: '12px 14px',
//                     marginTop: '8px',
//                   }}>
//                     <p style={{ fontSize: '12px', color: '#3b82f6', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
//                       {hostName
//                         ? `"Your host ${hostName} was responsive and helpful throughout your stay. How would you rate the interaction?"`
//                         : '"Your host was responsive and helpful throughout your stay. How would you rate the interaction?"'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
 
//               {/* Comment Box */}
//               <div style={{
//                 backgroundColor: '#f9fafb',
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '12px',
//                 padding: '20px',
//                 marginBottom: '28px',
//               }}>
//                 <h6 style={{ fontWeight: '700', fontSize: '14px', color: '#111827', margin: '0 0 4px' }}>
//                   Tell us more about your experience
//                 </h6>
//                 <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 12px' }}>
//                   Your feedback helps the community and helps hosts improve.
//                 </p>
//                 <div style={{ position: 'relative' }}>
//                   <textarea
//                     rows={5}
//                     placeholder="What did you love? Was anything missing?"
//                     value={formData.comment}
//                     maxLength={500}
//                     onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
//                     style={{
//                       width: '100%',
//                       border: '1px solid #e5e7eb',
//                       borderRadius: '8px',
//                       padding: '12px 14px',
//                       fontSize: '14px',
//                       color: '#374151',
//                       backgroundColor: '#fff',
//                       resize: 'vertical',
//                       outline: 'none',
//                       boxSizing: 'border-box',
//                       fontFamily: 'inherit',
//                       lineHeight: '1.5',
//                     }}
//                   />
//                   <div style={{
//                     textAlign: 'right',
//                     fontSize: '11px',
//                     color: '#9ca3af',
//                     marginTop: '4px',
//                   }}>
//                     {charCount} / 500 characters
//                   </div>
//                 </div>
//               </div>
 
//               {/* Actions */}
//               <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
//                 <button
//                   type="button"
//                   onClick={() => navigate(-1)}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     color: '#6b7280',
//                     padding: '10px 16px',
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   style={{
//                     backgroundColor: submitting ? '#6b7280' : '#1b2a4e',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '8px',
//                     padding: '10px 28px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     cursor: submitting ? 'not-allowed' : 'pointer',
//                     transition: 'background-color 0.2s ease',
//                   }}
//                 >
//                   {submitting ? 'Submitting...' : 'Submit Review'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
 
// export default AddReview;



// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
 
// const BOOKING_API = 'https://graduationproject1.runasp.net/api/Booking';
// const REVIEW_API = 'https://graduationproject1.runasp.net/api/Review/AddReview';
 
// const formatDate = (value) => {
//   if (!value) return '';
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return String(value);
//   return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
// };
 
// const parseBookingList = (data) => {
//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data.items)) return data.items;
//   if (Array.isArray(data.bookings)) return data.bookings;
//   if (Array.isArray(data.data?.bookings)) return data.data.bookings;
//   if (Array.isArray(data.data)) return data.data;
//   return [];
// };
 
// const getLocation = (item) => {
//   if (!item) return '';
//   if (item.location?.fullAddress) return item.location.fullAddress;
//   if (item.location?.city) return [item.location.street, item.location.city].filter(Boolean).join(', ');
//   return item.location || item.city || item.address || '';
// };
 
// const getBookingName = (item) => {
//   return item?.title || item?.propertyName || item?.roomName || item?.name || 'your stay';
// };
 
// const getHostName = (item) => {
//   return item?.hostName || item?.host?.name || item?.host?.fullName || item?.ownerName || '';
// };
 
// const getStayDateRange = (item) => {
//   const start = item?.moveInDate || item?.startDate || item?.checkInDate || item?.fromDate;
//   if (!start) return '';
//   const date = new Date(start);
//   if (Number.isNaN(date.getTime())) return String(start);
 
//   const duration = Number(item?.duration ?? item?.nights ?? item?.months ?? 0);
//   if (!duration || Number.isNaN(duration)) return formatDate(date);
 
//   const end = new Date(date);
//   if (duration <= 31) {
//     end.setDate(end.getDate() + duration - 1);
//   } else {
//     end.setMonth(end.getMonth() + duration);
//   }
 
//   return `${formatDate(date)} - ${formatDate(end)}`;
// };
 
// const StarRating = ({ label, value, onChange }) => (
//   <div style={{ marginBottom: '16px' }}>
//     <div style={{
//       fontSize: '10px',
//       fontWeight: '700',
//       letterSpacing: '1.2px',
//       textTransform: 'uppercase',
//       color: '#9ca3af',
//       marginBottom: '6px',
//     }}>
//       {label}
//     </div>
//     <div style={{ display: 'flex', gap: '4px' }}>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           onClick={() => onChange(star)}
//           style={{
//             cursor: 'pointer',
//             fontSize: '22px',
//             color: star <= value ? '#1b2a4e' : '#d1d5db',
//             transition: 'color 0.15s ease',
//             lineHeight: 1,
//             userSelect: 'none',
//           }}
//         >
//           ★
//         </span>
//       ))}
//     </div>
//   </div>
// );
 
// const AddReview = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     accuracy: 0,
//     cleanliness: 0,
//     location: 0,
//     checkIn: 0,
//     value: 0,
//     communication: 0,
//     comment: '',
//   });
//   const [bookingData, setBookingData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);
 
//   useEffect(() => {
//     const fetchBooking = async () => {
//       setLoading(true);
//       setError('');
//       const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');
//       if (!token) {
//         setError('Please login first to see the booking details.');
//         setLoading(false);
//         return;
//       }
 
//       try {
//         const response = await axios.get(`${BOOKING_API}/my-bookings?page=1&pageSize=50`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
 
//         const bookings = parseBookingList(response.data);
//         const booking = bookings.find(
//           (item) =>
//             String(item.id) === String(id) ||
//             String(item.bookingId) === String(id) ||
//             String(item.bookingID) === String(id)
//         );
 
//         if (!booking) {
//           setError('Booking data not found.');
//         } else {
//           setBookingData(booking);
//         }
//       } catch (fetchError) {
//         console.error(fetchError);
//         setError(fetchError?.response?.data?.message || 'Unable to load booking data.');
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     fetchBooking();
//   }, [id]);
 
//   const handleRating = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
 
//     const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');
 
//     if (!token) {
//       alert('Please login first.');
//       setSubmitting(false);
//       return;
//     }
 
//     const bookingId = Number(
//       bookingData?.id ??
//       bookingData?.bookingId ??
//       bookingData?.bookingID ??
//       bookingData?.BookingId ??
//       bookingData?.BookingID ??
//       0
//     );
 
//     const payload = {
//       bookingId,
//       accuracy: formData.accuracy,
//       cleanliness: formData.cleanliness,
//       location: formData.location,
//       checkIn: formData.checkIn,
//       value: formData.value,
//       communication: formData.communication,
//       comment: formData.comment,
//     };
 
//     console.log('Payload being sent:', JSON.stringify(payload, null, 2));
//     console.log('bookingData keys:', bookingData ? Object.keys(bookingData) : 'null');
 
//     try {
//       const response = await axios.post(REVIEW_API, payload, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('Success response:', response.data);
//       alert('Review submitted successfully!');
//       navigate(-1);
//     } catch (err) {
//       console.error('Submit error:', err?.response?.data);
//       const msg =
//         err?.response?.data?.message ||
//         err?.response?.data?.title ||
//         (typeof err?.response?.data === 'string' ? err.response.data : null) ||
//         'Failed to submit review.';
//       alert(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };
 
//   const title = getBookingName(bookingData);
//   const stayRange = getStayDateRange(bookingData);
//   const hostName = getHostName(bookingData);
 
//   const charCount = formData.comment.length;
 
//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', paddingTop: '40px', paddingBottom: '60px' }}>
//       {/* Page label */}
//       <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 16px 16px' }}>
//         <span style={{ fontSize: '13px', color: '#9ca3af' }}>Write review</span>
//       </div>
 
//       {/* Card */}
//       <div style={{
//         maxWidth: '720px',
//         margin: '0 auto',
//         padding: '0 16px',
//       }}>
//         {loading && (
//           <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
//             Loading booking details...
//           </div>
//         )}
 
//         {error && (
//           <div style={{
//             backgroundColor: '#fef2f2',
//             border: '1px solid #fecaca',
//             borderRadius: '12px',
//             padding: '16px',
//             color: '#dc2626',
//             marginBottom: '16px',
//           }}>
//             {error}
//           </div>
//         )}
 
//         {!loading && !error && bookingData && (
//           <div style={{
//             backgroundColor: '#ffffff',
//             borderRadius: '16px',
//             boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
//             padding: '36px',
//           }}>
//             {/* Header */}
//             <div style={{ marginBottom: '28px' }}>
//               <h1 style={{
//                 fontSize: '22px',
//                 fontWeight: '700',
//                 color: '#111827',
//                 margin: '0 0 6px',
//               }}>
//                 How was your stay at {title}?
//               </h1>
//               {stayRange && (
//                 <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
//                   <span>📅</span>
//                   <span>Stay dates: {stayRange}</span>
//                 </p>
//               )}
//             </div>
 
//             <form onSubmit={handleSubmit}>
//               {/* Rating Row */}
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
//                 {/* Rate the Place */}
//                 <div style={{
//                   backgroundColor: '#f9fafb',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '12px',
//                   padding: '20px',
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
//                     <span style={{ fontSize: '16px' }}>🏢</span>
//                     <span style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>Rate the Place</span>
//                   </div>
//                   <StarRating label="Accuracy" value={formData.accuracy} onChange={(v) => handleRating('accuracy', v)} />
//                   <StarRating label="Cleanliness" value={formData.cleanliness} onChange={(v) => handleRating('cleanliness', v)} />
//                   <StarRating label="Location" value={formData.location} onChange={(v) => handleRating('location', v)} />
//                   <StarRating label="Check In" value={formData.checkIn} onChange={(v) => handleRating('checkIn', v)} />
//                   <StarRating label="Value" value={formData.value} onChange={(v) => handleRating('value', v)} />
//                 </div>
 
//                 {/* Rate the Host */}
//                 <div style={{
//                   backgroundColor: '#f9fafb',
//                   border: '1px solid #e5e7eb',
//                   borderRadius: '12px',
//                   padding: '20px',
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
//                     <span style={{ fontSize: '16px' }}>👤</span>
//                     <span style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>Rate the Host</span>
//                   </div>
//                   <StarRating label="Communication" value={formData.communication} onChange={(v) => handleRating('communication', v)} />
//                   <div style={{
//                     backgroundColor: '#eff6ff',
//                     borderRadius: '8px',
//                     padding: '12px 14px',
//                     marginTop: '8px',
//                   }}>
//                     <p style={{ fontSize: '12px', color: '#3b82f6', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
//                       {hostName
//                         ? `"Your host ${hostName} was responsive and helpful throughout your stay. How would you rate the interaction?"`
//                         : '"Your host was responsive and helpful throughout your stay. How would you rate the interaction?"'}
//                     </p>
//                   </div>
//                 </div>
//               </div>
 
//               {/* Comment Box */}
//               <div style={{
//                 backgroundColor: '#f9fafb',
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '12px',
//                 padding: '20px',
//                 marginBottom: '28px',
//               }}>
//                 <h6 style={{ fontWeight: '700', fontSize: '14px', color: '#111827', margin: '0 0 4px' }}>
//                   Tell us more about your experience
//                 </h6>
//                 <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 12px' }}>
//                   Your feedback helps the community and helps hosts improve.
//                 </p>
//                 <div style={{ position: 'relative' }}>
//                   <textarea
//                     rows={5}
//                     placeholder="What did you love? Was anything missing?"
//                     value={formData.comment}
//                     maxLength={500}
//                     onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
//                     style={{
//                       width: '100%',
//                       border: '1px solid #e5e7eb',
//                       borderRadius: '8px',
//                       padding: '12px 14px',
//                       fontSize: '14px',
//                       color: '#374151',
//                       backgroundColor: '#fff',
//                       resize: 'vertical',
//                       outline: 'none',
//                       boxSizing: 'border-box',
//                       fontFamily: 'inherit',
//                       lineHeight: '1.5',
//                     }}
//                   />
//                   <div style={{
//                     textAlign: 'right',
//                     fontSize: '11px',
//                     color: '#9ca3af',
//                     marginTop: '4px',
//                   }}>
//                     {charCount} / 500 characters
//                   </div>
//                 </div>
//               </div>
 
//               {/* Actions */}
//               <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
//                 <button
//                   type="button"
//                   onClick={() => navigate(-1)}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     color: '#6b7280',
//                     padding: '10px 16px',
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   style={{
//                     backgroundColor: submitting ? '#6b7280' : '#1b2a4e',
//                     color: '#fff',
//                     border: 'none',
//                     borderRadius: '8px',
//                     padding: '10px 28px',
//                     fontSize: '14px',
//                     fontWeight: '600',
//                     cursor: submitting ? 'not-allowed' : 'pointer',
//                     transition: 'background-color 0.2s ease',
//                   }}
//                 >
//                   {submitting ? 'Submitting...' : 'Submit Review'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
 
// export default AddReview;








































import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BOOKING_API = 'https://graduationproject1.runasp.net/api/Booking';
const REVIEW_API = 'https://graduationproject1.runasp.net/api/Review/AddReview';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const parseBookingList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.bookings)) return data.bookings;
  if (Array.isArray(data.data?.bookings)) return data.data.bookings;
  if (Array.isArray(data.data)) return data.data;
  return [];
};

const getLocation = (item) => {
  if (!item) return '';
  if (item.location?.fullAddress) return item.location.fullAddress;
  if (item.location?.city) return [item.location.street, item.location.city].filter(Boolean).join(', ');
  return item.location || item.city || item.address || '';
};

const getBookingName = (item) => {
  return item?.title || item?.propertyName || item?.roomName || item?.name || 'your stay';
};

const getHostName = (item) => {
  return item?.hostName || item?.host?.name || item?.host?.fullName || item?.ownerName || '';
};

const getStayDateRange = (item) => {
  const start = item?.moveInDate || item?.startDate || item?.checkInDate || item?.fromDate;
  if (!start) return '';
  const date = new Date(start);
  if (Number.isNaN(date.getTime())) return String(start);

  const duration = Number(item?.duration ?? item?.nights ?? item?.months ?? 0);
  if (!duration || Number.isNaN(duration)) return formatDate(date);

  const end = new Date(date);
  if (duration <= 31) {
    end.setDate(end.getDate() + duration - 1);
  } else {
    end.setMonth(end.getMonth() + duration);
  }

  return `${formatDate(date)} - ${formatDate(end)}`;
};

const StarRating = ({ label, value, onChange }) => (
  <div style={{ marginBottom: '16px' }}>
    <div style={{
      fontSize: '10px',
      fontWeight: '700',
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
      color: '#9ca3af',
      marginBottom: '6px',
    }}>
      {label}
    </div>
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{
            cursor: 'pointer',
            fontSize: '22px',
            color: star <= value ? '#1b2a4e' : '#d1d5db',
            transition: 'color 0.15s ease',
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          ★
        </span>
      ))}
    </div>
  </div>
);

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accuracy: 0,
    cleanliness: 0,
    location: 0,
    checkIn: 0,
    value: 0,
    communication: 0,
    comment: '',
  });
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      setError('');
      const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');
      if (!token) {
        setError('Please login first to see the booking details.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BOOKING_API}/my-bookings?page=1&pageSize=50`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const bookings = parseBookingList(response.data);
        const booking = bookings.find(
          (item) =>
            String(item.id) === String(id) ||
            String(item.bookingId) === String(id) ||
            String(item.bookingID) === String(id)
        );

        if (!booking) {
          setError('Booking data not found.');
        } else {
          setBookingData(booking);
        }
      } catch (fetchError) {
        console.error(fetchError);
        setError(fetchError?.response?.data?.message || 'Unable to load booking data.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleRating = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const token = (localStorage.getItem('userToken') || localStorage.getItem('token') || '').replace(/"/g, '');

    if (!token) {
      alert('Please login first.');
      setSubmitting(false);
      return;
    }

    const bookingId = Number(
      bookingData?.id ??
      bookingData?.bookingId ??
      bookingData?.bookingID ??
      bookingData?.BookingId ??
      bookingData?.BookingID ??
      0
    );

    const payload = {
      bookingId,
      accuracy: formData.accuracy,
      cleanliness: formData.cleanliness,
      location: formData.location,
      checkIn: formData.checkIn,
      value: formData.value,
      communication: formData.communication,
      comment: formData.comment,
    };

    console.log('Payload being sent:', JSON.stringify(payload, null, 2));
    console.log('bookingData keys:', bookingData ? Object.keys(bookingData) : 'null');

    try {
      const response = await axios.post(REVIEW_API, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Success response:', response.data);
      navigate('/review-success');
    } catch (err) {
      console.error('Submit error:', err?.response?.data);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.title ||
        (typeof err?.response?.data === 'string' ? err.response.data : null) ||
        'Failed to submit review.';
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const title = getBookingName(bookingData);
  const stayRange = getStayDateRange(bookingData);
  const hostName = getHostName(bookingData);

  const charCount = formData.comment.length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', paddingTop: '40px', paddingBottom: '60px' }}>
      {/* Page label */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 16px 16px' }}>
        <span style={{ fontSize: '13px', color: '#9ca3af' }}>Write review</span>
      </div>

      {/* Card */}
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '0 16px',
      }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280' }}>
            Loading booking details...
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '16px',
            color: '#dc2626',
            marginBottom: '16px',
          }}>
            {error}
          </div>
        )}

        {!loading && !error && bookingData && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
            padding: '36px',
          }}>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
              <h1 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#111827',
                margin: '0 0 6px',
              }}>
                How was your stay at {title}?
              </h1>
              {stayRange && (
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>📅</span>
                  <span>Stay dates: {stayRange}</span>
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              {/* Rating Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                {/* Rate the Place */}
                <div style={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '16px' }}>🏢</span>
                    <span style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>Rate the Place</span>
                  </div>
                  <StarRating label="Accuracy" value={formData.accuracy} onChange={(v) => handleRating('accuracy', v)} />
                  <StarRating label="Cleanliness" value={formData.cleanliness} onChange={(v) => handleRating('cleanliness', v)} />
                  <StarRating label="Location" value={formData.location} onChange={(v) => handleRating('location', v)} />
                  <StarRating label="Check In" value={formData.checkIn} onChange={(v) => handleRating('checkIn', v)} />
                  <StarRating label="Value" value={formData.value} onChange={(v) => handleRating('value', v)} />
                </div>

                {/* Rate the Host */}
                <div style={{
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '20px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '16px' }}>👤</span>
                    <span style={{ fontWeight: '700', fontSize: '14px', color: '#111827' }}>Rate the Host</span>
                  </div>
                  <StarRating label="Communication" value={formData.communication} onChange={(v) => handleRating('communication', v)} />
                  <div style={{
                    backgroundColor: '#eff6ff',
                    borderRadius: '8px',
                    padding: '12px 14px',
                    marginTop: '8px',
                  }}>
                    <p style={{ fontSize: '12px', color: '#3b82f6', margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>
                      {hostName
                        ? `"Your host ${hostName} was responsive and helpful throughout your stay. How would you rate the interaction?"`
                        : '"Your host was responsive and helpful throughout your stay. How would you rate the interaction?"'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comment Box */}
              <div style={{
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '28px',
              }}>
                <h6 style={{ fontWeight: '700', fontSize: '14px', color: '#111827', margin: '0 0 4px' }}>
                  Tell us more about your experience
                </h6>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 12px' }}>
                  Your feedback helps the community and helps hosts improve.
                </p>
                <div style={{ position: 'relative' }}>
                  <textarea
                    rows={5}
                    placeholder="What did you love? Was anything missing?"
                    value={formData.comment}
                    maxLength={500}
                    onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                    style={{
                      width: '100%',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      fontSize: '14px',
                      color: '#374151',
                      backgroundColor: '#fff',
                      resize: 'vertical',
                      outline: 'none',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      lineHeight: '1.5',
                    }}
                  />
                  <div style={{
                    textAlign: 'right',
                    fontSize: '11px',
                    color: '#9ca3af',
                    marginTop: '4px',
                  }}>
                    {charCount} / 500 characters
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#6b7280',
                    padding: '10px 16px',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    backgroundColor: submitting ? '#6b7280' : '#1b2a4e',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 28px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s ease',
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddReview;
