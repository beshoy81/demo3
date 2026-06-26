import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

const BrowseRooms = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedRoomIds, setSavedRoomIds] = useState({});

  // صورة احتياطية في حالة إن لينك الصورة من الـ API بايظ أو مش موجود
  const fallbackImage = "https://placehold.co/600x400?text=No+Image+Available";

  useEffect(() => {
    const fetchRooms = async () => {
      // سحب التوكن من الـ LocalStorage
      const token = localStorage.getItem("userToken");
      
      setIsLoading(true);
      try {
        const res = await axios.get('https://graduationproject1.runasp.net/api/Property/GetAllWithRooms', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        // التأكد من شكل البيانات الراجعة
        if (res.data && Array.isArray(res.data)) {
          setProperties(res.data);
        } else if (res.data?.data && Array.isArray(res.data.data)) {
          setProperties(res.data.data);
        }
      } catch (err) {
        console.error("API Error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          console.warn("Unauthorized: Token might be expired or missing.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const toggleSaveRoom = async (propertyId, roomId) => {
    try {
      const token = localStorage.getItem('userToken')?.replace(/"/g, '');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      
      const key = `${propertyId}-${roomId}`;
      const isSaving = !savedRoomIds[key];
      
      // Optimistic UI update
      setSavedRoomIds(prev => ({ ...prev, [key]: isSaving }));

      const response = await axios.post(
        'https://graduationproject1.runasp.net/api/Saved/save-room',
        { propertyId: Number(propertyId), roomId: Number(roomId) },
        config
      );
      
      // Track in localStorage for real-time sync
      if (isSaving) {
        const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
        if (!savedRooms.find(r => r.propertyId === propertyId && r.roomId === roomId)) {
          savedRooms.push({ propertyId, roomId });
          localStorage.setItem('savedRooms', JSON.stringify(savedRooms));
        }
      } else {
        const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
        const filtered = savedRooms.filter(r => !(r.propertyId === propertyId && r.roomId === roomId));
        localStorage.setItem('savedRooms', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error("Save Room Error:", err);
      // Revert on error
      const key = `${propertyId}-${roomId}`;
      setSavedRoomIds(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  if (isLoading) return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="mt-3 fw-bold">Loading Amazing Places...</p>
    </div>
  );

  return (
    <div className="container-fluid bg-light min-vh-100 py-4 px-lg-5" dir="ltr">
      
      {/* Search Bar UI */}
      <div className="bg-white p-3 rounded-4 shadow-sm mb-5 border">
        <div className="row align-items-center text-start">
          <div className="col-md-3 border-end">
            <label className="small fw-bold text-primary mb-0">Where</label>
            <div className="small text-muted">Search Destinations</div>
          </div>
          <div className="col-md-3 border-end">
            <label className="small fw-bold text-primary mb-0">When</label>
            <div className="small text-muted">Search Dates</div>
          </div>
          <div className="col-md-3 border-end">
            <label className="small fw-bold text-primary mb-0">Who</label>
            <div className="small text-muted">Add Guests</div>
          </div>
          <div className="col-md-3 d-flex justify-content-between align-items-center ps-3">
            <div className="d-flex align-items-center gap-2">
               <span className="small text-muted">Sorted by:</span>
               <span className="badge bg-primary rounded-pill px-3 py-2">Newest</span>
            </div>
            <button className="btn btn-success rounded-circle shadow-sm p-2">
              <i className="bi bi-search text-white"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="row g-4 text-start">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div className="col-lg-4 col-md-6" key={property.id}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="position-relative">
                  {/* معالجة خطأ الصورة: لو اللينك بايظ بيعرض الـ fallbackImage */}
                  <img 
                    src={property.coverImageUrl || fallbackImage} 
                    className="card-img-top" 
                    style={{ height: "230px", objectFit: "cover" }} 
                    alt={property.name} 
                    onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                  />
                  <span className="position-absolute top-0 start-0 m-3 badge bg-dark opacity-75 rounded-pill px-3">
                    98% match
                  </span>
                  <button 
                    className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle p-2"
                    style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (property.rooms && property.rooms.length > 0) {
                        toggleSaveRoom(property.id, property.rooms[0].id);
                      }
                    }}
                  >
                    {savedRoomIds[`${property.id}-${property.rooms?.[0]?.id}`] ? (
                      <FaHeart color="#ef4444" size={18} />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                  </button>
                </div>

                <div className="card-body p-4">
                  <h5 className="fw-bold text-truncate mb-1">{property.name || "Unnamed Property"}</h5>
                  <p className="text-muted small mb-3">
                    <i className="bi bi-geo-alt-fill me-1 text-primary"></i> 
                    {property.city || "N/A"}, {property.government || "Egypt"}
                  </p>
                  
                  {/* Rooms Section */}
                  <div className="bg-light rounded-3 p-3 mb-4">
                    {property.rooms && property.rooms.length > 0 ? (
                      property.rooms.map((room) => (
                        <div key={room.id} className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-1 last-child-border-0">
                          <div className="d-flex align-items-center">
                            <span className={`rounded-circle me-2 ${room.isAvailable ? 'bg-primary' : 'bg-danger'}`} style={{ width: '8px', height: '8px' }}></span>
                            <span className={`small ${!room.isAvailable ? 'text-muted text-decoration-line-through' : 'fw-medium'}`}>
                              {room.roomName}
                            </span>
                          </div>
                          <span className={`small fw-bold ${room.isAvailable ? 'text-primary' : 'text-muted'}`}>
                            {room.isAvailable ? `${room.month_rent} EGP` : 'Occupied'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="small text-muted text-center">No individual rooms details</div>
                    )}
                  </div>
                  
                  <button 
                    className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm"
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5 mt-4">
            <i className="bi bi-house-exclamation display-1 text-muted"></i>
            <h4 className="text-muted mt-3">No properties found in the database.</h4>
            <p className="small text-muted">Try adding a property first or check your API connection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseRooms;