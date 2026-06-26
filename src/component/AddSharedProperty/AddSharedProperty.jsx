import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Info,
  MapPin,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Plus,
  Camera,
} from "lucide-react";
import locationsData from "../Addproperty/locations.json";

const API_BASE = "https://graduationproject1.runasp.net/api/Property";
const MAX_IMG_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const getCleanToken = () => {
  const raw = localStorage.getItem("userToken") || localStorage.getItem("token");
  if (!raw) return null;
  return raw.replace(/['"]+/g, "").trim();
};

const defaultAmenities = {
  wifi: false,
  tv: false,
  cooktop: false,
  oven: false,
  kettle: false,
  dishwasher: false,
  refrigerator: false,
  microwave: false,
  washer: false,
  freeParking: false,
  airConditioning: false,
  smokeAlarm: false,
  fireExtinguisher: false,
};

const defaultNearby = {
  hasGroceryStore: false,
  hasPharmacy: false,
  hasHospital: false,
  hasSchool: false,
  hasUniversity: false,
  hasPublicTransport: false,
  hasParking: false,
  hasMall: false,
  hasRestaurants: false,
  hasPark: false,
  hasGym: false,
  isSafeArea: false,
  hasPoliceStation: false,
  isQuietArea: false,
  hasChurchNearby: false,
  hasMosqueNearby: false,
};

const defaultRoomAmenities = {
  airConditioning: false,
  closet: false,
  mirror: false,
  fan: false,
};

const defaultAllowedTenants = {
  allowsFamilies: false,
  allowsChildren: false,
  allowsStudents: false,
  studentGender: "any",
  allowsWorkers: false,
  workerGender: "any",
  petsAllowed: false,
};

const createEmptyRoom = (index) => ({
  roomName: "",
  minimumStay: 1,
  month_rent: 0,
  deposit: 0,
  furnished: true,
  availableFrom: new Date().toISOString().split("T")[0],
  capacity: 1,
  capacityAvailable: 1,
  enSuiteBathroom: false,
  sharedBathroom: false,
  balcony: false,
  window: false,
  petsAllowed: false,
  propertyImages: [],
  amenities: { ...defaultRoomAmenities },
  allowedTenants: { ...defaultAllowedTenants },
});

export default function AddSharedProperty() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    size: 0,
    description: "",
    totalRooms: 1,
    availableRooms: 1,
    amenities: { ...defaultAmenities },
    nearbyServices: { ...defaultNearby },
    street: "",
    city: "",
    government: "",
    latitude: 30.0444,
    longitude: 31.2357,
    propertyImages: [],
  });
  const [rooms, setRooms] = useState([createEmptyRoom(0)]);
  const [expandedRoom, setExpandedRoom] = useState(0);
  const [propertyImgFiles, setPropertyImgFiles] = useState([]);
  const [roomImgFiles, setRoomImgFiles] = useState({ 0: [] });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const propertyInputRef = useRef(null);

  const governments = locationsData.map((g) => ({
    value: g.NameInEnglish,
    label: g.NameInEnglish,
  }));
  const cities =
    locationsData
      .find((g) => g.NameInEnglish === form.government)
      ?.CitiesAndVillages?.map((c) => ({
        value: c.NameInEnglish,
        label: c.NameInEnglish,
      })) || [];

  const updateForm = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }));
  };

  const updateRoom = (roomIdx, key, val) => {
    setRooms((prev) =>
      prev.map((r, i) => (i === roomIdx ? { ...r, [key]: val } : r))
    );
  };

  const addRoom = () => {
    const idx = rooms.length;
    setRooms((p) => [...p, createEmptyRoom(idx)]);
    setRoomImgFiles((p) => ({ ...p, [idx]: [] }));
    setExpandedRoom(idx);
  };

  const validateStep1 = () => {
    const err = {};
    if (!form.name?.trim()) err.name = "Apartment name is required";
    if (!form.government) err.government = "Please select state";
    if (!form.city) err.city = "Please select city";
    if (!form.street?.trim()) err.street = "Street address is required";
    if (form.totalRooms < 1) err.totalRooms = "At least 1 room required";
    if (form.availableRooms < 1) err.availableRooms = "At least 1 available room required";
    if (propertyImgFiles.length < 1) err.propertyImages = "Upload at least 1 photo (min 3 recommended)";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlePropertyImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => {
      if (!ACCEPTED_TYPES.includes(f.type)) return false;
      if (f.size > MAX_IMG_SIZE_MB * 1024 * 1024) return false;
      return true;
    });
    const newItems = valid.map((file, i) => ({
      file,
      preview: URL.createObjectURL(file),
      isCover: false,
    }));
    setPropertyImgFiles((prev) => {
      const combined = [...prev, ...newItems];
      if (combined.length && !combined.some((p) => p.isCover)) combined[0].isCover = true;
      return combined.slice(0, 20);
    });
    if (errors.propertyImages) setErrors((e) => ({ ...e, propertyImages: null }));
    e.target.value = "";
  };

  const setPropertyCover = (idx) => {
    setPropertyImgFiles((prev) =>
      prev.map((p, i) => ({ ...p, isCover: i === idx }))
    );
  };

  const removePropertyImage = (idx) => {
    setPropertyImgFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRoomImageSelect = (roomIdx, e) => {
    const files = Array.from(e.target.files || []);
    const valid = files.filter((f) => {
      if (!ACCEPTED_TYPES.includes(f.type)) return false;
      if (f.size > MAX_IMG_SIZE_MB * 1024 * 1024) return false;
      return true;
    });
    const newItems = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isCover: false,
    }));
    setRoomImgFiles((prev) => {
      const current = prev[roomIdx] || [];
      const combined = [...current, ...newItems];
      if (combined.length && !combined.some((img) => img.isCover)) combined[0].isCover = true;
      return { ...prev, [roomIdx]: combined.slice(0, 10) };
    });
    e.target.value = "";
  };

  const setRoomCover = (roomIdx, imgIdx) => {
    setRoomImgFiles((prev) => {
      const list = (prev[roomIdx] || []).map((img, i) => ({
        ...img,
        isCover: i === imgIdx,
      }));
      return { ...prev, [roomIdx]: list };
    });
  };

  const removeRoomImage = (roomIdx, imgIdx) => {
    setRoomImgFiles((prev) => {
      const list = (prev[roomIdx] || []).filter((_, i) => i !== imgIdx);
      return { ...prev, [roomIdx]: list };
    });
  };

  const uploadImages = async (filesOrObjs) => {
    const token = getCleanToken();
    if (!token) throw new Error("Session expired. Please login again.");

    const result = [];
    for (let i = 0; i < filesOrObjs.length; i++) {
      const item = filesOrObjs[i];
      const f = item?.file || item;
      const isCover = item?.isCover === true;
      const fd = new FormData();
      fd.append("file", f);

      const res = await axios.post(
        `${API_BASE}/upload-image?isCover=${isCover}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = res.data;
      const url = data?.imageUrl || data?.data?.imageUrl || data?.data?.url || data?.url;
      if (!url || typeof url !== "string") throw new Error("Could not get image URL from server.");
      result.push({ imageUrl: String(url), isCover });
    }
    return result;
  };

  const handleSaveDraft = async () => {
    const token = getCleanToken();
    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }
    setLoading(true);
    try {
      const payload = await buildPayload(true);
      await axios.post(`${API_BASE}/AddSharedProperty`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Draft saved successfully.");
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (asDraft = false) => {
    const token = getCleanToken();
    if (!token) {
      alert("Session expired. Please login again.");
      return;
    }

    if (!asDraft && step === 1 && !validateStep1()) return;
    if (!asDraft && step === 2) {
      const roomErr = rooms.some(
        (r, i) =>
          !r.roomName?.trim() ||
          r.month_rent < 0 ||
          (roomImgFiles[i] || []).length < 1
      );
      if (roomErr) {
        alert("Fill room names, rent, and add at least one image per room.");
        return;
      }
    }

    setLoading(true);
    try {
      const payload = await buildPayload(asDraft);
      await axios.post(`${API_BASE}/AddSharedProperty`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert(asDraft ? "Draft saved successfully." : "Property added successfully!");
      if (!asDraft) navigate("/home");
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const buildPayload = async (isDraft) => {
    let propertyImagesData = [];
    if (propertyImgFiles.length) {
      const files = propertyImgFiles.map((p) => ({
        file: p.file || p,
        isCover: p.isCover || false,
      }));
      propertyImagesData = await uploadImages(propertyImgFiles);
    }

    const roomsPayload = await Promise.all(
      rooms.map(async (r, idx) => {
        const imgs = roomImgFiles[idx] || [];
        let roomImgs = [];
        if (imgs.length) {
          const arr = imgs.map((img, i) => ({
            file: img.file || img,
            isCover: img.isCover === true || (i === 0 && !imgs.some((x) => x.isCover)),
          }));
          roomImgs = await uploadImages(arr);
        }

        const at = r.allowedTenants || defaultAllowedTenants;
        const genderMap = { Male: "male", Female: "female", Both: "any", any: "any", male: "male", female: "female" };
        const studentGenderVal = genderMap[at.studentGender] || "any";
        const workerGenderVal = genderMap[at.workerGender] || "any";

        const allowedTenantsPayload = {
          allowsFamilies: Boolean(at.allowsFamilies),
          allowsChildren: Boolean(at.allowsChildren),
          allowsStudents: Boolean(at.allowsStudents),
          allowsWorkers: Boolean(at.allowsWorkers),
          petsAllowed: Boolean(at.petsAllowed),
          studentGender: at.allowsStudents ? studentGenderVal : null,
          workerGender: at.allowsWorkers ? workerGenderVal : null,
        };

        return {
          roomName: r.roomName || "",
          minimumStay: Number(r.minimumStay) || 1,
          month_rent: Number(r.month_rent) || 0,
          deposit: Number(r.deposit) || 0,
          furnished: Boolean(r.furnished),
          availableFrom: r.availableFrom
            ? new Date(r.availableFrom).toISOString()
            : new Date().toISOString(),
          capacity: Number(r.capacity) || 1,
          capacityAvailable: Number(r.capacityAvailable) || 1,
          enSuiteBathroom: Boolean(r.enSuiteBathroom),
          sharedBathroom: Boolean(r.sharedBathroom),
          balcony: Boolean(r.balcony),
          window: Boolean(r.window),
          petsAllowed: Boolean(r.petsAllowed),
          propertyImages: roomImgs,
          amenities: r.amenities || defaultRoomAmenities,
          allowedTenants: allowedTenantsPayload,
        };
      })
    );

    return {
      name: form.name || "",
      size: Number(form.size) || 0,
      description: form.description || "",
      totalRooms: Number(form.totalRooms) || 1,
      availableRooms: Number(form.availableRooms) || 1,
      amenities: form.amenities || defaultAmenities,
      nearbyServices: form.nearbyServices || defaultNearby,
      street: form.street || "",
      city: form.city || "",
      government: form.government || "",
      latitude: Number(form.latitude) || 30.0444,
      longitude: Number(form.longitude) || 31.2357,
      propertyImages: propertyImagesData,
      rooms: roomsPayload,
      isDraft: isDraft,
    };
  };

  const handleApiError = (err) => {
    const data = err.response?.data;
    if (err.response?.status === 401) {
      alert("Session expired. Please login again.");
      return;
    }
    if (data?.errors) {
      const msg = Object.entries(data.errors)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join("\n");
      alert("Validation error:\n" + msg);
    } else {
      alert(data?.message || err.message || "An error occurred.");
    }
  };

  useEffect(() => {
    if (form.government && !cities.some((c) => c.value === form.city)) {
      updateForm("city", "");
    }
  }, [form.government]);

  useEffect(() => {
    if (!getCleanToken()) {
      navigate("/login");
    }
  }, [navigate]);

  const progress = ((step - 1) / 3) * 100;

  return (
    <div className="add-shared-root" dir="ltr" style={{ minHeight: "100vh", background: "#f5f5f5", padding: "24px 0" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div className="row g-4">
          {/* Left sidebar - steps */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm rounded-3 p-4" style={{ background: "#fff", position: "sticky", top: 100 }}>
              <h5 className="fw-bold mb-1">Add Property</h5>
              <p className="small text-muted mb-4">Fill in the details to list your 'By Room' apartment.</p>

              {[
                { n: 1, title: "Shared Info", desc: "General apartment details" },
                { n: 2, title: "Room Details", desc: "Individual room info" },
              ].map((s) => (
                <div
                  key={s.n}
                  className={`d-flex align-items-center gap-2 mb-3 py-2 px-3 rounded-3 ${step === s.n ? "bg-primary text-white" : "bg-light"}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setStep(s.n)}
                >
                  <span className={`badge rounded-circle ${step >= s.n ? "bg-primary" : "bg-secondary"} text-white`} style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>{step > s.n ? "✓" : s.n}</span>
                  <div>
                    <div className="fw-semibold small">Step {s.n}: {s.title}</div>
                    <div className={`small ${step === s.n ? "text-white-50" : "text-muted"}`}>{s.desc}</div>
                  </div>
                </div>
              ))}

              <div className="mt-4">
                <div className="d-flex justify-content-between small text-muted mb-1">
                  <span>COMPLETION</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="progress" style={{ height: 6 }}>
                  <div className="progress-bar bg-primary" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="col-lg-9">
            {step === 1 && (
              <div className="card border-0 shadow-sm rounded-3 p-4 mb-4 bg-white">
                <h6 className="fw-bold d-flex align-items-center gap-2 mb-3">
                  <Info size={18} /> Basic Information
                </h6>
                <div className="row g-3 mb-4">
                  <div className="col-md-8">
                    <label className="form-label small fw-semibold text-muted">Apartment Name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="e.g. Modern Suite at Downtown"
                      value={form.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                    />
                    {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label small fw-semibold text-muted">Total Rooms</label>
                    <input
                      type="number"
                      min={1}
                      className={`form-control ${errors.totalRooms ? "is-invalid" : ""}`}
                      value={form.totalRooms}
                      onChange={(e) => updateForm("totalRooms", parseInt(e.target.value) || 1)}
                    />
                    {errors.totalRooms && <div className="invalid-feedback d-block">{errors.totalRooms}</div>}
                  </div>
                  <div className="col-md-2">
                    <label className="form-label small fw-semibold text-muted">Available </label>
                    <input
                      type="number"
                      min={1}
                      className={`form-control ${errors.availableRooms ? "is-invalid" : ""}`}
                      value={form.availableRooms}
                      onChange={(e) => updateForm("availableRooms", parseInt(e.target.value) || 1)}
                    />
                    {errors.availableRooms && <div className="invalid-feedback d-block">{errors.availableRooms}</div>}
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted">Measure of the Apartment (M²)</label>
                    <input
                      type="number"
                      step="0.01"
                      min={0}
                      className="form-control"
                      placeholder="0.00"
                      value={form.size || ""}
                      onChange={(e) => updateForm("size", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Description</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Describe the common areas, vibe, and general features of the apartment..."
                      value={form.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                    />
                  </div>
                </div>

                <h6 className="fw-bold d-flex align-items-center gap-2 mb-3">
                  <MapPin size={18} /> Location
                </h6>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">Government / State</label>
                    <select
                      className={`form-select ${errors.government ? "is-invalid" : ""}`}
                      value={form.government}
                      onChange={(e) => updateForm("government", e.target.value)}
                    >
                      <option value="">Select State</option>
                      {governments.map((g) => (
                        <option key={g.value} value={g.value}>{g.label}</option>
                      ))}
                    </select>
                    {errors.government && <div className="invalid-feedback d-block">{errors.government}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold text-muted">City</label>
                    <select
                      className={`form-select ${errors.city ? "is-invalid" : ""}`}
                      value={form.city}
                      onChange={(e) => updateForm("city", e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                    {errors.city && <div className="invalid-feedback d-block">{errors.city}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Street Address</label>
                    <input
                      type="text"
                      className={`form-control ${errors.street ? "is-invalid" : ""}`}
                      placeholder="e.g. 123 Harmony St."
                      value={form.street}
                      onChange={(e) => updateForm("street", e.target.value)}
                    />
                    {errors.street && <div className="invalid-feedback d-block">{errors.street}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted">Pin Location on Map</label>
                    <div className="border rounded-3 bg-light d-flex align-items-center justify-content-center position-relative" style={{ height: 180 }}>
                      <MapPin size={48} className="text-primary" />
                      <span className="position-absolute end-0 top-0 m-2 small text-muted">
                        Lat: {form.latitude} Long: {form.longitude}
                      </span>
                    </div>
                  </div>
                </div>

                <h6 className="fw-bold d-flex align-items-center gap-2 mb-3">
                  <ImageIcon size={18} /> Property Images
                </h6>
                <div className="d-flex flex-wrap gap-2 align-items-start mb-2">
                  <div
                    className="border border-2 border-dashed rounded-3 d-flex flex-column align-items-center justify-content-center bg-light"
                    style={{ width: 120, height: 120, cursor: "pointer" }}
                    onClick={() => propertyInputRef.current?.click()}
                    onKeyDown={(e) => e.key === "Enter" && propertyInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                  >
                    <Camera size={32} className="text-muted mb-1" />
                    <span className="small text-muted">Add Photo</span>
                  </div>
                  <input
                    ref={propertyInputRef}
                    type="file"
                    multiple
                    accept=".png,.jpg,.jpeg,.webp"
                    className="d-none"
                    onChange={handlePropertyImageSelect}
                  />
                  {propertyImgFiles.map((img, i) => (
                    <div key={i} className="position-relative">
                      <img
                        src={img.preview || (img.file ? URL.createObjectURL(img.file) : "")}
                        alt=""
                        className="rounded-3"
                        style={{ width: 120, height: 120, objectFit: "cover" }}
                      />
                      {img.isCover && (
                        <span className="position-absolute top-0 start-0 badge bg-primary m-1">COVER</span>
                      )}
                      <button
                        type="button"
                        className="btn btn-sm btn-danger position-absolute bottom-0 end-0 m-1 rounded-circle p-0"
                        style={{ width: 24, height: 24 }}
                        onClick={() => removePropertyImage(i)}
                      >
                        ×
                      </button>
                      {!img.isCover && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary position-absolute top-0 start-0 m-1"
                          onClick={() => setPropertyCover(i)}
                        >
                          Set Cover
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="small text-muted">Minimum 3 photos recommended. PNG, JPG or WEBP. Max size 5MB each.</p>
                {errors.propertyImages && <div className="text-danger small">{errors.propertyImages}</div>}
              </div>
            )}

            {step === 2 && (
              <div className="card border-0 shadow-sm rounded-3 p-4 mb-4 bg-white">
                <h5 className="fw-bold mb-1">Add Property - Individual Room Details</h5>
                <p className="small text-muted mb-4">Step 2: Provide specific details for each room in your property.</p>

                {rooms.map((room, idx) => (
                  <div key={idx} className="border rounded-3 mb-4 overflow-hidden">
                    <div
                      className="d-flex align-items-center justify-content-between p-3 bg-light"
                      style={{ cursor: "pointer" }}
                      onClick={() => setExpandedRoom(expandedRoom === idx ? -1 : idx)}
                      onKeyDown={(e) => e.key === "Enter" && setExpandedRoom(expandedRoom === idx ? -1 : idx)}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="fw-semibold">Room {idx + 1}: {room.roomName || `Room ${idx + 1}`}</span>
                      {expandedRoom === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                    {expandedRoom === idx && (
                      <div className="p-4">
                        <div className="row g-3 mb-3">
                          <div className="col-12">
                            <label className="form-label small fw-semibold">Room Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="e.g. Master Bedroom"
                              value={room.roomName}
                              onChange={(e) => updateRoom(idx, "roomName", e.target.value)}
                            />
                          </div>
                          <div className="col-md-6 d-flex align-items-center">
                            <div className="form-check form-switch">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={room.furnished}
                                onChange={(e) => updateRoom(idx, "furnished", e.target.checked)}
                              />
                              <label className="form-check-label">Furnished</label>
                            </div>
                            <span className="ms-2 small text-muted">Fully Furnished</span>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label small fw-semibold">Monthly Rent (EGP)</label>
                            <input
                              type="number"
                              className="form-control"
                              value={room.month_rent || ""}
                              onChange={(e) => updateRoom(idx, "month_rent", e.target.value)}
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label small fw-semibold">Deposit (EGP)</label>
                            <input
                              type="number"
                              className="form-control"
                              value={room.deposit || ""}
                              onChange={(e) => updateRoom(idx, "deposit", e.target.value)}
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label small fw-semibold">Minimum Stay</label>
                            <div className="input-group">
                              <button type="button" className="btn btn-outline-secondary" onClick={() => updateRoom(idx, "minimumStay", Math.max(1, (room.minimumStay || 1) - 1))}>−</button>
                              <input type="number" className="form-control text-center" value={room.minimumStay || 1} readOnly style={{ maxWidth: 50 }} />
                              <button type="button" className="btn btn-outline-secondary" onClick={() => updateRoom(idx, "minimumStay", (room.minimumStay || 1) + 1)}>+</button>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label small fw-semibold">Available From</label>
                            <input
                              type="date"
                              className="form-control"
                              value={room.availableFrom || ""}
                              onChange={(e) => updateRoom(idx, "availableFrom", e.target.value)}
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label small fw-semibold">Total Capacity</label>
                            <input
                              type="number"
                              min={1}
                              className="form-control"
                              value={room.capacity || ""}
                              onChange={(e) => updateRoom(idx, "capacity", e.target.value)}
                            />
                          </div>
                          <div className="col-md-3">
                            <label className="form-label small fw-semibold">Available Spots</label>
                            <input
                              type="number"
                              min={0}
                              className="form-control"
                              value={room.capacityAvailable || ""}
                              onChange={(e) => updateRoom(idx, "capacityAvailable", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label small fw-semibold">BATHROOM TYPE</label>
                          <div className="d-flex gap-3">
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input" checked={room.enSuiteBathroom} onChange={(e) => updateRoom(idx, "enSuiteBathroom", e.target.checked)} />
                              <label className="form-check-label">En-suite Bathroom</label>
                            </div>
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input" checked={room.sharedBathroom} onChange={(e) => updateRoom(idx, "sharedBathroom", e.target.checked)} />
                              <label className="form-check-label">Shared Bathroom</label>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label small fw-semibold">KEY FEATURES</label>
                          <div className="d-flex gap-3">
                            <div className="form-check"><input type="checkbox" className="form-check-input" checked={room.balcony} onChange={(e) => updateRoom(idx, "balcony", e.target.checked)} /><label className="form-check-label">Balcony</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" checked={room.window} onChange={(e) => updateRoom(idx, "window", e.target.checked)} /><label className="form-check-label">Window</label></div>
                            <div className="form-check"><input type="checkbox" className="form-check-input" checked={room.petsAllowed} onChange={(e) => updateRoom(idx, "petsAllowed", e.target.checked)} /><label className="form-check-label">Pets Allowed</label></div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label small fw-semibold">ROOM AMENITIES</label>
                          <div className="d-flex flex-wrap gap-2">
                            {["airConditioning", "closet", "mirror", "fan"].map((key) => (
                              <button
                                key={key}
                                type="button"
                                className={`btn btn-sm ${room.amenities?.[key] ? "btn-primary" : "btn-outline-secondary"}`}
                                onClick={() => updateRoom(idx, "amenities", {
                                  ...room.amenities,
                                  [key]: !room.amenities?.[key],
                                })}
                              >
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <label className="form-label small fw-semibold">ALLOWED TENANTS</label>
                          <div className="row g-2">
                            <div className="col-md-6">
                              <div className="form-check"><input type="checkbox" className="form-check-input" checked={room.allowedTenants?.allowsFamilies} onChange={(e) => updateRoom(idx, "allowedTenants", { ...room.allowedTenants, allowsFamilies: e.target.checked })} /><label className="form-check-label">Families</label></div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check"><input type="checkbox" className="form-check-input" checked={room.allowedTenants?.allowsChildren} onChange={(e) => updateRoom(idx, "allowedTenants", { ...room.allowedTenants, allowsChildren: e.target.checked })} /><label className="form-check-label">Children</label></div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-check"><input type="checkbox" className="form-check-input" checked={room.allowedTenants?.allowsStudents} onChange={(e) => updateRoom(idx, "allowedTenants", { ...room.allowedTenants, allowsStudents: e.target.checked })} /><label className="form-check-label">Students</label></div>
                              {room.allowedTenants?.allowsStudents && (
                                <select className="form-select form-select-sm mt-1" value={(room.allowedTenants?.studentGender || "any") === "any" ? "any" : room.allowedTenants?.studentGender} onChange={(e) => updateRoom(idx, "allowedTenants", { ...room.allowedTenants, studentGender: e.target.value })}>
                                  <option value="any">Any Gender</option><option value="male">Male</option><option value="female">Female</option>
                                </select>
                              )}
                            </div>
                            <div className="col-md-6">
                              <div className="form-check"><input type="checkbox" className="form-check-input" checked={room.allowedTenants?.allowsWorkers} onChange={(e) => updateRoom(idx, "allowedTenants", { ...room.allowedTenants, allowsWorkers: e.target.checked })} /><label className="form-check-label">Workers</label></div>
                              {room.allowedTenants?.allowsWorkers && (
                                <select className="form-select form-select-sm mt-1" value={(room.allowedTenants?.workerGender || "any") === "any" ? "any" : room.allowedTenants?.workerGender} onChange={(e) => updateRoom(idx, "allowedTenants", { ...room.allowedTenants, workerGender: e.target.value })}>
                                  <option value="any">Any Gender</option><option value="male">Male</option><option value="female">Female</option>
                                </select>
                              )}
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="form-label small fw-semibold">Room Images</label>
                          <div className="d-flex flex-wrap gap-2">
                            <div
                              className="border border-2 border-dashed rounded-3 d-flex flex-column align-items-center justify-content-center bg-light"
                              style={{ width: 100, height: 100, cursor: "pointer" }}
                              onClick={() => document.getElementById(`room-img-${idx}`)?.click()}
                            >
                              <Camera size={24} className="text-muted" />
                            </div>
                            <input id={`room-img-${idx}`} type="file" multiple accept=".png,.jpg,.jpeg,.webp" className="d-none" onChange={(e) => handleRoomImageSelect(idx, e)} />
                            {(roomImgFiles[idx] || []).map((img, i) => (
                              <div key={i} className="position-relative">
                                <img src={img.preview || (img.file ? URL.createObjectURL(img.file) : "")} alt="" className="rounded-3" style={{ width: 100, height: 100, objectFit: "cover" }} />
                                {img.isCover && <span className="position-absolute bottom-0 start-0 badge bg-primary m-1">Cover</span>}
                                <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle p-0" style={{ width: 20, height: 20 }} onClick={() => removeRoomImage(idx, i)}>×</button>
                                {!img.isCover && <button type="button" className="btn btn-sm btn-outline-primary btn-sm position-absolute bottom-0 start-0 m-1" onClick={() => setRoomCover(idx, i)}>Set Cover</button>}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <button type="button" className="btn btn-outline-primary mb-4" onClick={addRoom}>
                  <Plus size={18} className="me-1" /> Add Another Room
                </button>
              </div>
            )}

            {/* Action buttons */}
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center">
              <button type="button" className="btn btn-outline-secondary" onClick={handleSaveDraft} disabled={loading}>
                Save as Draft
              </button>
              <div className="d-flex gap-2">
                {step > 1 && (
                  <button type="button" className="btn btn-outline-primary" onClick={() => setStep(step - 1)}>
                    ← Previous Step
                  </button>
                )}
                {step < 2 ? (
                  <button type="button" className="btn btn-primary" onClick={() => validateStep1() && setStep(2)}>
                    Continue to Room Details
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary" onClick={() => handleSubmit(false)} disabled={loading}>
                    {loading ? "Submitting..." : "Finish & Submit"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
