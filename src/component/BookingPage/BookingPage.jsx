// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaPaperPlane, FaHourglassHalf, FaRegComments, FaMapMarkerAlt } from 'react-icons/fa';

// const BookingPage = () => {
//   const { propertyId, roomId } = useParams();
//   const navigate = useNavigate();
  
//   const [bookingData, setBookingData] = useState(null);
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const BASE_URL = "https://graduationproject1.runasp.net/";

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       // 1. مراقبة القيم القادمة من الرابط (URL Params)
//       console.log("--- Debug: Checking URL Params ---");
//       console.log("Property ID from URL:", propertyId);
//       console.log("Room ID from URL:", roomId);

//       if (!propertyId || propertyId === "undefined") {
//         setError("خطأ: لم يتم استلام رقم العقار بشكل صحيح.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError(null);
        
//         const token = localStorage.getItem('userToken')?.replace(/"/g, '');
//         const fullUrl = `${BASE_URL}api/Property/${propertyId}`;
        
//         // 2. مراقبة الرابط النهائي والتوكن قبل الإرسال
//         console.log("--- Debug: Request Details ---");
//         console.log("Full Request URL:", fullUrl);
//         console.log("Token exists:", !!token);

//         const res = await axios.get(fullUrl, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Accept': 'application/json'
//           }
//         });

//         // 3. طباعة رد السيرفر كاملاً في الكونسول
//         console.log("--- Debug: API Response ---");
//         console.log("Full Response Object:", res);
//         console.log("Response Data Content:", res.data);

//         if (res.data?.isSuccess && res.data.data) {
//           const property = res.data.data;
          
//           // البحث عن الغرفة
//           const room = property.rooms?.find(r => String(r.id) === String(roomId)) || property.rooms?.[0];
          
//           console.log("Selected Room Data:", room);

//           setBookingData({ ...property, selectedRoom: room });
//         } else {
//           console.warn("API returned success: false or empty data");
//           setError("لم يتم العثور على بيانات هذا العقار.");
//         }
//       } catch (err) {
//         // 4. طباعة تفاصيل الخطأ في حال فشل الطلب
//         console.error("--- Debug: API Error ---");
//         if (err.response) {
//           console.error("Status Code:", err.response.status);
//           console.error("Error Data:", err.response.data);
//         } else {
//           console.error("Error Message:", err.message);
//         }
//         setError("حدث خطأ أثناء تحميل البيانات من السيرفر.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, [propertyId, roomId]);

//   if (loading) return <div className="text-center py-5 mt-5"><div className="spinner-border text-primary"></div></div>;
  
//   if (error || !bookingData) return (
//     <div className="text-center py-5 mt-5">
//       <h4 className="text-danger mb-4">{error}</h4>
//       <button className="btn btn-primary" onClick={() => navigate(-1)}>الرجوع للخلف</button>
//     </div>
//   );

//   const { selectedRoom } = bookingData;

//   return (
//     <div className="container py-5 mt-4">
//       <div className="row g-5">
//         {/* الجزء الأيسر: خطوات الحجز */}
//         <div className="col-lg-6 order-2 order-lg-1">
//           <h2 className="fw-bold mb-3">Ready To Book this spot ?</h2>
//           <p className="text-muted mb-5">
//             Send Request to the host to get started. No payment is Required at this stage
//           </p>

//           {/* ... باقي كود خطوات الحجز (نفس الذي أرسلته لك سابقاً) ... */}
//           <div className="card border-0 bg-light p-4 rounded-4 mb-5" style={{ maxWidth: '420px' }}>
//             <h6 className="fw-bold mb-4">What Happens Next ?</h6>
//             <div className="d-flex align-items-start mb-4">
//                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '32px', height: '32px' }}>
//                   <FaPaperPlane size={12} />
//                </div>
//                <div className="ms-3">
//                   <p className="mb-0 fw-bold">Send Request</p>
//                   <small className="text-primary">Current step</small>
//                </div>
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="form-label fw-bold mb-3">Message to Host ( Optional )</label>
//             <textarea 
//               className="form-control rounded-3 border p-3" 
//               rows="5" 
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//             ></textarea>
//           </div>

//           <button className="btn btn-primary w-100 py-3 fw-bold rounded-3" style={{ backgroundColor: '#1a365d' }}>
//             Send Booking Request
//           </button>
//         </div>

//         {/* الجزء الأيمن: كارت التفاصيل */}
//         <div className="col-lg-5 offset-lg-1 order-1 order-lg-2">
//           <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
//             <div className="p-3">
//               <img 
//                 src={bookingData.propertyImages?.[0]?.imageUrl ? `${BASE_URL}${bookingData.propertyImages[0].imageUrl}` : 'https://via.placeholder.com/400x250'} 
//                 className="rounded-4 w-100 mb-4" 
//                 style={{ height: '260px', objectFit: 'cover' }}
//                 alt="Property"
//               />
//               <h4 className="fw-bold mb-1">{selectedRoom?.roomName || bookingData.propertyName}</h4>
//               <p className="text-muted"><FaMapMarkerAlt className="text-primary me-1" /> {bookingData.city}</p>
//               <hr />
//               <div className="d-flex justify-content-between align-items-center">
//                 <span className="fw-bold text-secondary">Total Monthly Rent</span>
//                 <span className="fw-bold text-dark h5">EGP {selectedRoom?.month_rent || 0}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;














import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookingPage = () => {
  const { id } = useParams();
  const { state } = useLocation();   // بيجي من navigate()
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const property = state?.property;   // الداتا اللي بعتناها من PropertyDetails

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'Inter, sans-serif' }}>
        <p>No property data found.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const mainImg = property.propertyImages?.find(i => i.isCover)?.imageUrl
    || property.propertyImages?.[0]?.imageUrl;

 const handleSend = async () => {
    try {
      setIsSending(true);
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');

      // حساب التاريخ مع هامش أمان 5 دقائق لتجنب خطأ "التاريخ في الماضي"
      const now = new Date();
      now.setMinutes(now.getMinutes() + 5); 

      const propertyAvailableDate = property.availableFrom ? new Date(property.availableFrom) : now;
      const finalStartDate = propertyAvailableDate < now ? now : propertyAvailableDate;

      const payload = {
        propertyId: parseInt(id),
        startDate: finalStartDate.toISOString(),
        duration: property.minimumStay || 1,
        message: message || 'I am interested in booking this property.',
      };

      // طباعة البيانات المرسلة للتأكد منها
      console.log("--- Sending Booking Request ---");
      console.log("Payload:", payload);

      const res = await axios.post(
        'https://graduationproject1.runasp.net/api/Booking/entire-apartment',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("--- Booking API Success Response ---");
      console.log(res.data);

      if (res.status === 200 || res.data?.isSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Request sent!',
          text: 'The host will respond within 24 hours.',
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        setTimeout(() => navigate('/'), 2500);
      }
    } catch (err) {
      // طباعة الخطأ بشكل تفصيلي جداً في الكونسول
      console.error("--- Booking API Error Details ---");
      if (err.response) {
        // السيرفر استجاب بكود خطأ (400, 401, 500, إلخ)
        console.error("Status:", err.response.status);
        console.error("Data (Server Message):", err.response.data);
        console.error("Headers:", err.response.headers);
      } else if (err.request) {
        // الطلب أُرسل ولكن لم يصل رد من السيرفر
        console.error("No response received. Request details:", err.request);
      } else {
        // حدث خطأ أثناء إعداد الطلب نفسه
        console.error("Error setting up request:", err.message);
      }
      console.error("Full Config:", err.config);

      Swal.fire({
        icon: 'error',
        title: 'Failed to send',
        text: err.response?.data?.message || 'Please make sure you are logged in and the date is valid.',
        confirmButtonColor: '#1e3a8a',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: '40px 0', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2.5rem', alignItems: 'start' }}>

        {/* ---- LEFT ---- */}
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Ready to book this spot?</h2>
          <p style={{ color: '#868e96', fontSize: 15, marginBottom: 32 }}>
            Send a request to the host to get started. No payment is required at this stage.
          </p>

          {/* Steps */}
          <div style={{ background: '#f8f9fa', borderRadius: 16, padding: '1.25rem', marginBottom: 32 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#868e96', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              What happens next?
            </p>

            {[
              { icon: '▶', label: 'Send request', hint: 'Current step', active: true },
              { icon: 'H', label: 'Host approval', hint: 'Usually responds within 24h', active: false },
              { icon: '💬', label: 'Chat & pay', hint: 'After approval', active: false },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: s.active ? '#1e3a8a' : '#fff',
                    border: s.active ? 'none' : '1px solid #dee2e6',
                    color: s.active ? '#fff' : '#868e96',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 600, marginTop: 2,
                  }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{s.label}</div>
                    <div style={{ fontSize: 13, color: s.active ? '#1e3a8a' : '#868e96' }}>{s.hint}</div>
                  </div>
                </div>
                {i < 2 && <div style={{ width: 2, height: 16, background: '#dee2e6', marginLeft: 16, marginTop: 4, marginBottom: 4 }} />}
              </div>
            ))}
          </div>

          {/* Message */}
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>
            Message to host <span style={{ color: '#adb5bd', fontWeight: 400 }}>(Optional)</span>
          </label>
          <textarea
            rows={6}
            maxLength={600}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Introduce yourself and tell the host why you're interested..."
            style={{
              width: '100%', border: '1px solid #dee2e6', borderRadius: 12,
              padding: '14px', fontSize: 15, resize: 'none',
              fontFamily: 'Inter, sans-serif', lineHeight: 1.6,
            }}
          />
          <div style={{ textAlign: 'right', fontSize: 12, color: '#adb5bd', marginTop: 4 }}>
            {message.length}/600 Characters
          </div>

          <button
            onClick={handleSend}
            disabled={isSending}
            style={{
              width: '100%', background: isSending ? '#adb5bd' : '#1e3a8a',
              color: '#fff', border: 'none', padding: '18px',
              borderRadius: 14, fontWeight: 700, fontSize: 16,
              cursor: isSending ? 'not-allowed' : 'pointer', marginTop: 24,
              transition: '0.2s',
            }}
          >
            {isSending ? 'Sending...' : 'Send Booking Request'}
          </button>
        </div>

        {/* ---- RIGHT (Property Card) ---- */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ border: '1px solid #f1f3f5', borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            {mainImg && <img src={mainImg} alt="Property" style={{ width: '100%', height: 170, objectFit: 'cover', display: 'block' }} />}

            <div style={{ padding: '1.25rem', position: 'relative' }}>
              <span style={{ position: 'absolute', top: -16, right: 16, background: '#63e6be', color: '#fff', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20 }}>
                90% Match
              </span>

              <div style={{ fontSize: 12, color: '#868e96', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                {property.furnished ? 'Furnished' : 'Unfurnished'} · Entire apartment
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 2 }}>{property.name}</div>
              <div style={{ fontSize: 13, color: '#868e96', marginBottom: 16 }}>
                {property.city}, {property.government}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #f1f3f5', marginBottom: 16 }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 14, color: '#495057' }}>Total Monthly Rent</span>
                <span style={{ fontSize: 17, fontWeight: 700, color: '#1e3a8a' }}>
                  EGP {property.monthlyRent?.toLocaleString()}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#f8f9fa', borderRadius: 12, padding: '12px' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', background: '#1e3a8a',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 15, flexShrink: 0,
                }}>
                  {property.hostName?.[0] || 'H'}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>Hosted by {property.hostName}</div>
                  <div style={{ fontSize: 12, color: '#868e96' }}>Joined in 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;