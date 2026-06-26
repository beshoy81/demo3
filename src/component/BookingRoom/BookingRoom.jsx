import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const BookingRoom = () => {
  // id: يمثل propertyId، و roomId: يمثل معرف الغرفة المحددة
  const { id, roomId } = useParams(); 
  const { state } = useLocation(); 
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // استلام بيانات العقار من الصفحة السابقة
  const property = state?.property; 

  if (!property) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', fontFamily: 'Inter, sans-serif' }}>
        <p>No property data found. Please go back and try again.</p>
        <button onClick={() => navigate(-1)} style={{ padding: '8px 16px', cursor: 'pointer' }}>Go back</button>
      </div>
    );
  }

  const mainImg = property.propertyImages?.find(i => i.isCover)?.imageUrl
    || property.propertyImages?.[0]?.imageUrl;

  const handleSend = async () => {
    try {
      setIsSending(true);
      // تنظيف التوكن من أي علامات تنصيص زائدة
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');

      // معالجة التاريخ لضمان عدم إرسال تاريخ في الماضي (إضافة 5 دقائق أمان)
      const now = new Date();
      now.setMinutes(now.getMinutes() + 5); 
      
      const propertyAvailableDate = property.availableFrom ? new Date(property.availableFrom) : now;
      const finalStartDate = propertyAvailableDate < now ? now : propertyAvailableDate;

      // الـ Payload المطلوب بناءً على الـ Schema الخاصة بحجز الغرفة
      const payload = {
        propertyId: parseInt(id),
        roomId: parseInt(roomId),
        startDate: finalStartDate.toISOString(),
        duration: property.minimumStay || 1,
        message: message || 'I am interested in booking this room.',
      };

      console.log("--- Sending Room Booking Request ---");
      console.log("Endpoint: https://graduationproject1.runasp.net/api/Booking/room");
      console.log("Payload:", payload);

      const res = await axios.post(
        'https://graduationproject1.runasp.net/api/Booking/room',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("--- Booking API Success Response ---", res.data);

      if (res.status === 200 || res.data?.isSuccess) {
        Swal.fire({
          icon: 'success',
          title: 'Request sent!',
          text: 'The host will review your room booking request.',
          timer: 2500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
        setTimeout(() => navigate('/'), 2500);
      }
    } catch (err) {
      console.error("--- Booking API Error Details ---");
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Server Message:", err.response.data);
      } else {
        console.error("Error Message:", err.message);
      }

      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: err.response?.data?.message || 'Please make sure you are logged in and all data is correct.',
        confirmButtonColor: '#1e3a8a',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div style={{ background: '#fcfcfc', minHeight: '100vh', padding: '40px 0', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2.5rem', alignItems: 'start' }}>

        {/* ---- LEFT SECTION ---- */}
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Ready to book this room?</h2>
          <p style={{ color: '#868e96', fontSize: 15, marginBottom: 32 }}>
            You are requesting to book <strong>Room #{roomId}</strong> in this property.
          </p>

          <div style={{ background: '#f8f9fa', borderRadius: 16, padding: '1.25rem', marginBottom: 32 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#868e96', marginBottom: 16, textTransform: 'uppercase' }}>
              Booking Steps
            </p>
            {[
              { icon: '1', label: 'Submit Request', hint: 'Sending Room ID: ' + roomId, active: true },
              { icon: '2', label: 'Host Approval', hint: 'Wait for response', active: false },
              { icon: '3', label: 'Finalize', hint: 'Payment & Contract', active: false },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: s.active ? '#1e3a8a' : '#fff',
                    border: s.active ? 'none' : '1px solid #dee2e6',
                    color: s.active ? '#fff' : '#868e96',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 600,
                  }}>{s.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{s.label}</div>
                    <div style={{ fontSize: 13, color: s.active ? '#1e3a8a' : '#868e96' }}>{s.hint}</div>
                  </div>
                </div>
                {i < 2 && <div style={{ width: 2, height: 16, background: '#dee2e6', marginLeft: 16, marginY: 4 }} />}
              </div>
            ))}
          </div>

          <label style={{ display: 'block', fontWeight: 600, marginBottom: 8 }}>Message to host (Optional)</label>
          <textarea
            rows={6}
            maxLength={600}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Tell the host a bit about yourself..."
            style={{
              width: '100%', border: '1px solid #dee2e6', borderRadius: 12,
              padding: '14px', fontSize: 15, resize: 'none', fontFamily: 'inherit'
            }}
          />

          <button
            onClick={handleSend}
            disabled={isSending}
            style={{
              width: '100%', background: isSending ? '#adb5bd' : '#1e3a8a',
              color: '#fff', border: 'none', padding: '18px',
              borderRadius: 14, fontWeight: 700, fontSize: 16,
              cursor: isSending ? 'not-allowed' : 'pointer', marginTop: 24,
            }}
          >
            {isSending ? 'Sending Request...' : 'Send Room Booking Request'}
          </button>
        </div>

        {/* ---- RIGHT SECTION (Card) ---- */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ border: '1px solid #f1f3f5', borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            {mainImg && <img src={mainImg} alt="Property" style={{ width: '100%', height: 170, objectFit: 'cover' }} />}

            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontSize: 12, color: '#868e96', textTransform: 'uppercase', marginBottom: 4 }}>
                Room Booking
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 2 }}>{property.name}</div>
              <div style={{ fontSize: 13, color: '#1e3a8a', fontWeight: 600, marginBottom: 16 }}>
                Selected Room: #{roomId}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #f1f3f5', marginBottom: 16 }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: '#495057' }}>Monthly Rent</span>
                <span style={{ fontSize: 17, fontWeight: 700, color: '#1e3a8a' }}>
                  EGP {property.monthlyRent?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingRoom;