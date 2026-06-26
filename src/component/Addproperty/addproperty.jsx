// import React from "react";

// export default function ApartmentFormUI() {
//   return (
//     <div className="app-root bg-light py-5">
//       <div className="container" style={{ maxWidth: 920 }}>
//         <form className="card p-4 border-0 shadow-sm">

//           {/* Step 1 */}
//           <section className="mb-5 step-card p-4">
//             <small className="text-muted d-block mb-3">Goal: Quick overview of the property</small>

//             <div className="mb-3">
//               <label className="form-label">Property Name</label>
//               <input className="form-control form-control-lg" placeholder="e.g. Cozy room near university" />
//             </div>

//             <div className="row g-3">
//               <div className="col-lg-8">
//                 <label className="form-label">Property Type</label>
//                 <div className="border rounded p-3 type-box">
//                   <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="pt1" /><label className="form-check-label ms-2" htmlFor="pt1">Entire Apartment</label></div>
//                   <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="pt2" /><label className="form-check-label ms-2" htmlFor="pt2">Shared Apartment</label></div>
//                   <div className="form-check mb-2"><input className="form-check-input" type="checkbox" id="pt3" /><label className="form-check-label ms-2" htmlFor="pt3">Private Room</label></div>
//                   <div className="form-check"><input className="form-check-input" type="checkbox" id="pt4" /><label className="form-check-label ms-2" htmlFor="pt4">Shared Room</label></div>
//                 </div>
//               </div>

//               <div className="col-lg-4">
//                 <label className="form-label">Monthly Rent (EGP)</label>
//                 <input className="form-control form-control-lg" placeholder="Enter amount" />
//               </div>
//             </div>

//             <div className="row g-3 mt-2">
//               <div className="col-lg-8">
//                 <label className="form-label">Location</label>
//                 <input className="form-control form-control-lg" placeholder="City / Area / Street" />
//               </div>

//               <div className="col-lg-4">
//                 <label className="form-label d-block mb-2">Deposit Required</label>
//                 <div className="border rounded p-3 type-box">
//                   <div className="form-check mb-2"><input className="form-check-input" type="radio" name="deposit" id="depYes" /><label className="form-check-label ms-2" htmlFor="depYes">Yes</label></div>
//                   <div className="form-check"><input className="form-check-input" type="radio" name="deposit" id="depNo" /><label className="form-check-label ms-2" htmlFor="depNo">No</label></div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Step 2 */}
//           <section className="mb-5 step-card p-4">
//             <small className="text-muted d-block mb-3">Goal: Describe what the place looks like</small>

//             <div className="mb-3">
//               <label className="form-label">Furnished</label>
//               <div className="border rounded p-3 type-box">
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="furn" id="f1" /><label className="form-check-label ms-2" htmlFor="f1">Furnished</label></div>
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="furn" id="f2" /><label className="form-check-label ms-2" htmlFor="f2">Semi-furnished</label></div>
//                 <div className="form-check"><input className="form-check-input" type="radio" name="furn" id="f3" /><label className="form-check-label ms-2" htmlFor="f3">Unfurnished</label></div>
//               </div>
//             </div>

//             <div className="row align-items-center g-3">
//               <div className="col-md-6">
//                 <label className="form-label">Number of Rooms</label>
//                 <div className="d-flex align-items-center gap-2">
//                   <button type="button" className="btn btn-outline-secondary btn-lg">-</button>
//                   <input className="form-control text-center form-control-lg" style={{ width: 96 }} defaultValue={1} />
//                   <button type="button" className="btn btn-outline-secondary btn-lg">+</button>
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <label className="form-label">Number of Bathrooms</label>
//                 <div className="d-flex align-items-center gap-2">
//                   <button type="button" className="btn btn-outline-secondary btn-lg">-</button>
//                   <input className="form-control text-center form-control-lg" style={{ width: 96 }} defaultValue={1} />
//                   <button type="button" className="btn btn-outline-secondary btn-lg">+</button>
//                 </div>
//               </div>
//             </div>

//             <div className="row g-3 mt-2">
//               <div className="col-md-6">
//                 <label className="form-label">Available from</label>
//                 <input type="date" className="form-control form-control-lg" />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">Upload Photos</label>
//                 <div>
//                   <input type="file" className="form-control form-control-lg" multiple />
//                   <small className="text-muted d-block mt-1">(recommended — bedroom, living room, kitchen, etc.)</small>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Step 3 */}
//           <section className="mb-5 step-card p-4">
//             <small className="text-muted d-block mb-3">Goal: Help match with the right tenant</small>

//             <div className="mb-3">
//               <label className="form-label">Gender Preference</label>
//               <div className="border rounded p-3 type-box">
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="gender" id="g1" /><label className="form-check-label ms-2" htmlFor="g1">Male</label></div>
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="gender" id="g2" /><label className="form-check-label ms-2" htmlFor="g2">Female</label></div>
//                 <div className="form-check"><input className="form-check-input" type="radio" name="gender" id="g3" /><label className="form-check-label ms-2" htmlFor="g3">Doesn't matter</label></div>
//               </div>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Smoking Allowed</label>
//               <div className="border rounded p-3 type-box">
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="smoke" id="sYes" /><label className="form-check-label ms-2" htmlFor="sYes">Yes</label></div>
//                 <div className="form-check"><input className="form-check-input" type="radio" name="smoke" id="sNo" /><label className="form-check-label ms-2" htmlFor="sNo">No</label></div>
//               </div>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Pets Allowed</label>
//               <div className="border rounded p-3 type-box">
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="pets" id="pYes" /><label className="form-check-label ms-2" htmlFor="pYes">Yes</label></div>
//                 <div className="form-check"><input className="form-check-input" type="radio" name="pets" id="pNo" /><label className="form-check-label ms-2" htmlFor="pNo">No</label></div>
//               </div>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Noise Level</label>
//               <div className="border rounded p-3 type-box">
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="noise" id="n1" /><label className="form-check-label ms-2" htmlFor="n1">Quiet</label></div>
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="noise" id="n2" /><label className="form-check-label ms-2" htmlFor="n2">Moderate</label></div>
//                 <div className="form-check"><input className="form-check-input" type="radio" name="noise" id="n3" /><label className="form-check-label ms-2" htmlFor="n3">Lively</label></div>
//               </div>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Cleanliness Level</label>
//               <div className="border rounded p-3 type-box">
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="clean" id="c1" /><label className="form-check-label ms-2" htmlFor="c1">Very clean</label></div>
//                 <div className="form-check mb-2"><input className="form-check-input" type="radio" name="clean" id="c2" /><label className="form-check-label ms-2" htmlFor="c2">Average</label></div>
//                 <div className="form-check"><input className="form-check-input" type="radio" name="clean" id="c3" /><label className="form-check-label ms-2" htmlFor="c3">Doesn't Matter</label></div>
//               </div>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Short Description</label>
//               <textarea className="form-control form-control-lg" rows={5} placeholder="Write a few lines about your property and lifestyle (optional)"></textarea>
//             </div>
//           </section>

//           <div className="d-flex justify-content-between align-items-center">
//             <button type="button" className="btn btn-outline-primary btn-lg">Save as Draft</button>
//             <button type="submit" className="btn btn-primary btn-lg">Submit</button>
//           </div>

//         </form>
//       </div>

    
//     </div>
//   );
// }


















// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faFileLines, faHouseUser, faCloudUpload, faMapMarkerAlt, 
//   faCheckCircle, faChevronRight, faChevronLeft, faUsers 
// } from '@fortawesome/free-solid-svg-icons';
// import 'animate.css';

// const ApartmentFormUI = ({ onNext }) => {
//   const [formStep, setFormStep] = useState(1);
//   const [uploadedImages, setUploadedImages] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // الإعدادات الافتراضية للجنس والقوانين
//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       furnished: true,
//       isDraft: false,
//       minimumStay: 1,
//       allowedTenants: {
//         allowsFamilies: true,
//         allowsChildren: true,
//         allowsStudents: true,
//         studentGender: "male", 
//         allowsWorkers: true,
//         workerGender: "male",  
//         petsAllowed: true
//       },
//       amenities: {
//         wifi: true, tv: true, cooktop: true, oven: true, kettle: true,
//         dishwasher: true, refrigerator: true, microwave: true, washer: true,
//         freeParking: true, airConditioning: true, smokeAlarm: true, fireExtinguisher: true
//       },
//       nearbyServices: {
//         hasGroceryStore: true, hasPharmacy: true, hasHospital: true, hasSchool: true,
//         hasUniversity: true, hasPublicTransport: true, hasParking: true, hasMall: true,
//         hasRestaurants: true, hasPark: true, hasGym: true, isSafeArea: true,
//         hasPoliceStation: true, isQuietArea: true, hasChurchNearby: true, hasMosqueNearby: true
//       }
//     }
//   });

//   // دالة لتنظيف وجلب التوكن من LocalStorage
//   const getCleanToken = () => {
//     const rawToken = localStorage.getItem('userToken') || localStorage.getItem('token');
//     if (!rawToken) return null;
//     // حذف علامات التنصيص الزائدة التي قد تسبب خطأ 401
//     return rawToken.replace(/['"]+/g, '').trim();
//   };

//   // 1. وظيفة رفع الصور
//   const handlePhotoUpload = async (e) => {
//     const files = Array.from(e.target.files);
//     const token = getCleanToken();
    
//     if (!token) return alert("انتهت الجلسة، يرجى تسجيل الدخول مجدداً");
    
//     setIsUploading(true);
//     for (const [index, file] of files.entries()) {
//       const formData = new FormData();
//       formData.append('file', file);
//       try {
//         const isCover = (index === 0 && uploadedImages.length === 0);
//         const uploadUrl = `https://graduationproject1.runasp.net/api/Property/upload-image?isCover=${isCover}`;

//         const res = await axios.post(uploadUrl, formData, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         });

//         if (res.data?.imageUrl) {
//           setUploadedImages(prev => [...prev, { imageUrl: res.data.imageUrl, isCover: isCover }]);
//         }
//       } catch (err) {
//         console.error("فشل رفع الصورة:", err.response?.data);
//         if(err.response?.status === 401) alert("غير مصرح لك برفع الصور، سجل دخولك مرة أخرى");
//       }
//     }
//     setIsUploading(false);
//   };

//   // 2. إرسال البيانات النهائية للمبنى بالكامل
//   const onSubmit = async (data) => {
//     const token = getCleanToken();
//     if (!token) return alert("يرجى تسجيل الدخول أولاً");

//     if (uploadedImages.length === 0) return alert("يرجى رفع صورة واحدة على الأقل للعقار");

//     setLoading(true);

//     // بناء الـ Payload ليتوافق مع الـ API
//     const finalPayload = {
//       ...data,
//       monthlyRent: Number(data.monthlyRent),
//       deposite: Number(data.deposite),
//       size: Number(data.size),
//       numberOfBedrooms: Number(data.numberOfBedrooms),
//       numberOfLivingRooms: Number(data.numberOfLivingRooms),
//       numberOfEnSuiteBathrooms: Number(data.numberOfEnSuiteBathrooms),
//       numberOfGuestBathrooms: Number(data.numberOfGuestBathrooms),
//       availableFrom: new Date().toISOString(),
//       allowedTenants: {
//         ...data.allowedTenants,
//         studentGender: "male",
//         workerGender: "male"
//       },
//       propertyImages: uploadedImages,
//       latitude: 0,
//       longitude: 0
//     };

//     try {
//       const response = await axios.post(
//         'https://graduationproject1.runasp.net/api/Property/AddEntireProperty',
//         finalPayload,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//           }
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert("🎉 تمت إضافة العقار بنجاح!");
//         if (onNext) onNext();
//       }
//     } catch (error) {
//       console.error("Error details:", error.response?.data);
//       if (error.response?.status === 401) {
//         alert("خطأ 401: التوكن غير صالح أو انتهى. يرجى تسجيل الدخول مجدداً.");
//       } else {
//         alert(`فشل الإرسال: ${error.response?.data?.title || "تأكد من ملء جميع الحقول المطلوبة"}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cardStyle = { borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' };

//   return (
//     <Container className="py-5 animate__animated animate__fadeIn">
//       <Form onSubmit={handleSubmit(onSubmit)}>
        
//         {/* المرحلة 1: البيانات الأساسية */}
//         {formStep === 1 && (
//           <Card className="p-4 mb-4 shadow-sm" style={cardStyle}>
//             <h4 className="mb-4 text-primary fw-bold"><FontAwesomeIcon icon={faFileLines} /> البيانات الأساسية</h4>
//             <Row className="g-3">
//               <Col md={12}><Form.Label>عنوان/اسم العقار</Form.Label><Form.Control {...register("name")} required placeholder="مثال: شقة فاخرة للإيجار" /></Col>
//               <Col md={12}><Form.Label>الوصف</Form.Label><Form.Control as="textarea" rows={3} {...register("description")} placeholder="وصف العقار والموقع بالتفصيل..." /></Col>
//               <Col md={4}><Form.Label>الإيجار الشهري</Form.Label><Form.Control type="number" {...register("monthlyRent")} required /></Col>
//               <Col md={4}><Form.Label>قيمة التأمين</Form.Label><Form.Control type="number" {...register("deposite")} required /></Col>
//               <Col md={4}><Form.Label>المساحة (م²)</Form.Label><Form.Control type="number" {...register("size")} required /></Col>
//             </Row>
//             <div className="text-end mt-4"><Button onClick={() => setFormStep(2)} className="px-4">التالي <FontAwesomeIcon icon={faChevronRight} /></Button></div>
//           </Card>
//         )}

//         {/* المرحلة 2: الغرف والقوانين */}
//         {formStep === 2 && (
//           <Card className="p-4 mb-4 shadow-sm" style={cardStyle}>
//             <h4 className="mb-4 text-primary fw-bold"><FontAwesomeIcon icon={faHouseUser} /> الغرف والقوانين</h4>
//             <Row className="g-3 mb-4 text-center">
//               <Col md={3}><Form.Label className="small">غرف النوم</Form.Label><Form.Control type="number" {...register("numberOfBedrooms")} /></Col>
//               <Col md={3}><Form.Label className="small">غرف المعيشة</Form.Label><Form.Control type="number" {...register("numberOfLivingRooms")} /></Col>
//               <Col md={3}><Form.Label className="small">حمامات النوم</Form.Label><Form.Control type="number" {...register("numberOfEnSuiteBathrooms")} /></Col>
//               <Col md={3}><Form.Label className="small">حمامات الضيوف</Form.Label><Form.Control type="number" {...register("numberOfGuestBathrooms")} /></Col>
//             </Row>
//             <hr />
//             <h6 className="fw-bold mb-3"><FontAwesomeIcon icon={faUsers} /> المستأجرون المسموح بهم (Gender: Male)</h6>
//             <div className="d-flex flex-wrap gap-4">
//               <Form.Check type="switch" label="عائلات" {...register("allowedTenants.allowsFamilies")} />
//               <Form.Check type="switch" label="طلاب" {...register("allowedTenants.allowsStudents")} />
//               <Form.Check type="switch" label="عمال" {...register("allowedTenants.allowsWorkers")} />
//               <Form.Check type="switch" label="حيوانات" {...register("allowedTenants.petsAllowed")} />
//             </div>
//             <div className="d-flex justify-content-between mt-5">
//               <Button variant="outline-secondary" onClick={() => setFormStep(1)}><FontAwesomeIcon icon={faChevronLeft} /> السابق</Button>
//               <Button onClick={() => setFormStep(3)} className="px-4">التالي <FontAwesomeIcon icon={faChevronRight} /></Button>
//             </div>
//           </Card>
//         )}

//         {/* المرحلة 3: الموقع والصور */}
//         {formStep === 3 && (
//           <div className="animate__animated animate__fadeIn">
//             <Card className="p-4 mb-4 shadow-sm" style={cardStyle}>
//               <h4 className="mb-4 text-primary fw-bold"><FontAwesomeIcon icon={faMapMarkerAlt} /> الموقع والصور</h4>
//               <Row className="g-3 mb-4">
//                 <Col md={4}><Form.Label>المحافظة</Form.Label><Form.Control {...register("government")} required /></Col>
//                 <Col md={4}><Form.Label>المدينة</Form.Label><Form.Control {...register("city")} required /></Col>
//                 <Col md={4}><Form.Label>الشارع</Form.Label><Form.Control {...register("street")} required /></Col>
//               </Row>

//               <div className="border p-5 text-center bg-light rounded-4" style={{border: '2px dashed #007bff'}}>
//                 <FontAwesomeIcon icon={faCloudUpload} size="3x" className="text-primary mb-3" />
//                 <h5>ارفع صور العقار (أول صورة ستكون الغلاف)</h5>
//                 <input type="file" multiple onChange={handlePhotoUpload} className="form-control mt-3" accept="image/*" />
//                 {isUploading && <div className="mt-2 text-primary"><Spinner size="sm" /> جارِ الرفع...</div>}
//                 <div className="mt-4 d-flex gap-2 justify-content-center flex-wrap">
//                   {uploadedImages.map((img, i) => (
//                     <div key={i} className="position-relative">
//                       <img src={img.imageUrl} style={{width: '90px', height: '90px', objectFit: 'cover', borderRadius: '10px'}} alt="preview" />
//                       {img.isCover && <div className="bg-success text-white position-absolute bottom-0 w-100 small" style={{fontSize: '10px'}}>Cover</div>}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </Card>

//             <div className="d-flex justify-content-between">
//               <Button variant="outline-secondary" onClick={() => setFormStep(2)}><FontAwesomeIcon icon={faChevronLeft} /> السابق</Button>
//               <Button type="submit" variant="success" className="px-5 py-2 fw-bold shadow" disabled={loading || isUploading}>
//                 {loading ? <Spinner size="sm" /> : <span>نشر العقار الآن <FontAwesomeIcon icon={faCheckCircle} /></span>}
//               </Button>
//             </div>
//           </div>
//         )}
//       </Form>
//     </Container>
//   );
// };

// export default ApartmentFormUI;











// import React, { useState } from 'react';
// import axios from 'axios';

// const ApartmentFormUI = () => {
//   const [file, setFile] = useState(null);
//   const [isCover, setIsCover] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     // الـ API بيتوقع ملف باسم 'file'
//     formData.append('file', file);

//     setLoading(true);
//     try {
//       // لاحظ إضافة isCover كـ Query Parameter في الـ URL
//       const response = await axios.post(
//         `https://graduationproject1.runasp.net/api/Property/upload-image?isCover=${isCover}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       setImageUrl(response.data.imageUrl);
//       alert("Upload Successful!");
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("Upload failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
//       <h3>Upload Property Image</h3>
      
//       <div style={{ marginBottom: '15px' }}>
//         <label>isCover (boolean): </label>
//         <select value={isCover} onChange={(e) => setIsCover(e.target.value === 'true')}>
//           <option value="true">True</option>
//           <option value="false">False</option>
//         </select>
//       </div>

//       <div style={{ marginBottom: '15px' }}>
//         <input type="file" onChange={handleFileChange} accept="image/*" />
//       </div>

//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? 'Uploading...' : 'Execute'}
//       </button>

//       {imageUrl && (
//         <div style={{ marginTop: '20px' }}>
//           <p>Uploaded Image:</p>
//           <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />
//         </div>
//       )}
//     </div>
//   );
// };


// export default ApartmentFormUI;












// import React, { useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const PropertySchema = Yup.object().shape({
//   name: Yup.string().required("اسم العقار مطلوب"),
//   description: Yup.string().min(10, "الوصف قصير جداً").required("الوصف مطلوب"),
//   monthlyRent: Yup.number().positive("يجب أن يكون رقم موجب").required("الإيجار مطلوب"),
//   city: Yup.string().required("المدينة مطلوبة"),
// });

// function AddProperty() {
//   const [file, setFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       description: "",
//       monthlyRent: "",
//       deposite: "",
//       furnished: true,
//       city: "",
//       street: "",
//       size: "",
//     },
//     validationSchema: PropertySchema,
//     onSubmit: async (values) => {
//       const token = localStorage.getItem("userToken");
      
//       if (!token) {
//         alert("برجاء تسجيل الدخول أولاً");
//         return;
//       }
//       if (!file) {
//         alert("برجاء اختيار صورة");
//         return;
//       }

//       setIsLoading(true);
//       try {
//         // 1. رفع الصورة
//         const imageFormData = new FormData();
//         imageFormData.append('file', file);
        
//         const imageRes = await axios.post(
//           `https://graduationproject1.runasp.net/api/Property/upload-image?isCover=true`,
//           imageFormData,
//           {
//             headers: { 
//               'Content-Type': 'multipart/form-data',
//               'Authorization': `Bearer ${token}` 
//             },
//           }
//         );

//         const uploadedImageUrl = imageRes.data.imageUrl;

//         // 2. تجهيز البيانات مع التأكد من أنواع البيانات (Numbers & Date)
//         const fullData = {
//           name: values.name,
//           description: values.description,
//           monthlyRent: Number(values.monthlyRent),
//           deposite: Number(values.deposite) || 0,
//           furnished: Boolean(values.furnished),
//           availableFrom: new Date().toISOString(), // صيغة التاريخ الصحيحة
//           numberOfBedrooms: 1,
//           numberOfLivingRooms: 1,
//           numberOfEnSuiteBathrooms: 1,
//           numberOfGuestBathrooms: 1,
//           allowedTenants: {
//             allowsFamilies: true,
//             allowsChildren: true,
//             allowsStudents: true,
//             studentGender: "male",
//             allowsWorkers: true,
//             workerGender: "male",
//             petsAllowed: true
//           },
//           amenities: {
//             wifi: true, tv: true, cooktop: true, oven: true, kettle: true,
//             dishwasher: true, refrigerator: true, microwave: true, washer: true,
//             freeParking: true, airConditioning: true, smokeAlarm: true, fireExtinguisher: true
//           },
//           nearbyServices: {
//             hasGroceryStore: true, hasPharmacy: true, hasHospital: true,
//             hasSchool: true, hasUniversity: true, hasPublicTransport: true,
//             hasParking: true, hasMall: true, hasRestaurants: true,
//             hasPark: true, hasGym: true, isSafeArea: true,
//             hasPoliceStation: true, isQuietArea: true, hasChurchNearby: true, hasMosqueNearby: true
//           },
//           street: values.street || "Street Name",
//           city: values.city,
//           government: values.city,
//           latitude: 0,
//           longitude: 0,
//           size: Number(values.size) || 0,
//           propertyImages: [
//             {
//               imageUrl: uploadedImageUrl,
//               isCover: true
//             }
//           ],
//           isDraft: false,
//           minimumStay: 1
//         };

//         // 3. الإرسال النهائي
//         await axios.post(
//           "https://graduationproject1.runasp.net/api/Property/AddEntireProperty",
//           fullData,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             }
//           }
//         );

//         alert("تمت إضافة العقار بنجاح!");
//         formik.resetForm();
//         setFile(null);

//       } catch (error) {
//         // فحص أخطاء الـ Validation من السيرفر (خطأ 400)
//         if (error.response && error.response.data.errors) {
//           console.log("Validation Errors List:", error.response.data.errors);
//           alert("خطأ في البيانات المرسلة، راجع الـ Console لمعرفة الحقل المطلوب.");
//         } else {
//           console.error("Error Detail:", error.response?.data || error.message);
//           alert("حدث خطأ أثناء الإرسال.");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   });

//   return (
//     <div className="container mt-5 shadow p-4 bg-white rounded">
//       <h3 className="text-center mb-4">إضافة عقار جديد</h3>
//       <form onSubmit={formik.handleSubmit}>
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label>اسم العقار</label>
//             <input name="name" className={`form-control ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`} onChange={formik.handleChange} value={formik.values.name} />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>الإيجار الشهري</label>
//             <input name="monthlyRent" type="number" className="form-control" onChange={formik.handleChange} value={formik.values.monthlyRent} />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>المدينة</label>
//             <input name="city" className="form-control" onChange={formik.handleChange} value={formik.values.city} />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>صورة الغلاف</label>
//             <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label>المساحة (size)</label>
//             <input name="size" type="number" className="form-control" onChange={formik.handleChange} value={formik.values.size} />
//           </div>
//           <div className="col-12 mb-3">
//             <label>الوصف</label>
//             <textarea name="description" className="form-control" rows="3" onChange={formik.handleChange} value={formik.values.description}></textarea>
//           </div>
//         </div>
//         <button type="submit" className="btn btn-primary w-100 mt-3" disabled={isLoading}>
//           {isLoading ? "جاري الحفظ..." : "إضافة العقار بالكامل"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProperty;










// import React, { useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';

// const AddPropertyForm = () => {
//   const [coverFile, setCoverFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem("userToken");

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       description: "",
//       monthlyRent: 0,
//       deposite: 0,
//       furnished: true,
//       availableFrom: new Date().toISOString(),
//       numberOfBedrooms: 0,
//       numberOfLivingRooms: 0,
//       numberOfEnSuiteBathrooms: 0,
//       numberOfGuestBathrooms: 0,
//       allowedTenants: {
//         allowsFamilies: true,
//         allowsChildren: true,
//         allowsStudents: true,
//         studentGender: "Male", // المستخدم هيختار من القائمة
//         allowsWorkers: true,
//         workerGender: "Male",  // المستخدم هيختار من القائمة
//         petsAllowed: true
//       },
//       amenities: {
//         wifi: true, tv: true, cooktop: true, oven: true, kettle: true,
//         dishwasher: true, refrigerator: true, microwave: true, washer: true,
//         freeParking: true, airConditioning: true, smokeAlarm: true, fireExtinguisher: true
//       },
//       nearbyServices: {
//         hasGroceryStore: true, hasPharmacy: true, hasHospital: true,
//         hasSchool: true, hasUniversity: true, hasPublicTransport: true,
//         hasParking: true, hasMall: true, hasRestaurants: true,
//         hasPark: true, hasGym: true, isSafeArea: true,
//         hasPoliceStation: true, isQuietArea: true, hasChurchNearby: true, hasMosqueNearby: true
//       },
//       street: "",
//       city: "",
//       government: "",
//       latitude: 30.0444,
//       longitude: 31.2357,
//       size: 0,
//       isDraft: false,
//       minimumStay: 1
//     },
//     onSubmit: async (values) => {
//       if (!coverFile) {
//         alert("برجاء اختيار صورة أولاً");
//         return;
//       }

//       setIsLoading(true);
//       try {
//         // 1. رفع الصورة
//         const imgData = new FormData();
//         imgData.append('file', coverFile);
//         const imgRes = await axios.post(
//           'https://graduationproject1.runasp.net/api/Property/upload-image?isCover=true', 
//           imgData, 
//           { headers: { 'Authorization': `Bearer ${token}` } }
//         );

//         // 2. تجميع البيانات (DTO)
//         const finalPayload = {
//           ...values,
//           monthlyRent: Number(values.monthlyRent),
//           deposite: Number(values.deposite),
//           size: Number(values.size),
//           numberOfBedrooms: Number(values.numberOfBedrooms),
//           numberOfLivingRooms: Number(values.numberOfLivingRooms),
//           numberOfEnSuiteBathrooms: Number(values.numberOfEnSuiteBathrooms),
//           numberOfGuestBathrooms: Number(values.numberOfGuestBathrooms),
//           propertyImages: [
//             {
//               id: 0,
//               imageUrl: imgRes.data.imageUrl,
//               isCover: true
//             }
//           ]
//         };

//         // 3. الإرسال للسيرفر
//         await axios.post(
//           'https://graduationproject1.runasp.net/api/Property/AddEntireProperty', 
//           finalPayload, 
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             }
//           }
//         );

//         alert("تمت إضافة العقار بنجاح في صفحة واحدة!");
//       } catch (error) {
//         console.error("Detail Error:", error.response?.data);
//         alert("فشل الإرسال، راجع الـ Console لمعرفة الحقل الناقص");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   });

//   // دالة مساعدة لتغيير الـ Checkboxes المتداخلة
//   const handleNestedChange = (parent, child) => {
//     formik.setFieldValue(`${parent}.${child}`, !formik.values[parent][child]);
//   };

//   return (
//     <div className="container my-5 p-4 bg-light shadow rounded" dir="rtl">
//       <h2 className="text-center mb-4">إضافة عقار جديد (بيانات كاملة)</h2>
      
//       <form onSubmit={formik.handleSubmit}>
//         {/* القسم الأول: المعلومات الأساسية */}
//         <div className="card p-4 mb-4">
//           <h4 className="border-bottom pb-2 mb-3">1. المعلومات الأساسية</h4>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="form-label">اسم العقار</label>
//               <input name="name" className="form-control" onChange={formik.handleChange} placeholder="مثلاً: شقة تطل على النيل" />
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="form-label">المساحة (م²)</label>
//               <input name="size" type="number" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-12 mb-3">
//               <label className="form-label">الوصف</label>
//               <textarea name="description" className="form-control" rows="3" onChange={formik.handleChange}></textarea>
//             </div>
//           </div>
//         </div>

//         {/* القسم الثاني: الأسعار والتفاصيل */}
//         <div className="card p-4 mb-4">
//           <h4 className="border-bottom pb-2 mb-3">2. الأسعار والغرف</h4>
//           <div className="row">
//             <div className="col-md-3 mb-3">
//               <label>الإيجار الشهري</label>
//               <input name="monthlyRent" type="number" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-md-3 mb-3">
//               <label>التأمين (Deposit)</label>
//               <input name="deposite" type="number" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-md-3 mb-3">
//               <label>عدد الغرف</label>
//               <input name="numberOfBedrooms" type="number" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-md-3 mb-3">
//               <label>عدد الحمامات</label>
//               <input name="numberOfGuestBathrooms" type="number" className="form-control" onChange={formik.handleChange} />
//             </div>
//           </div>
//         </div>

//         {/* القسم الثالث: الفئات المسموحة (Genders) */}
//         <div className="card p-4 mb-4 bg-white">
//           <h4 className="border-bottom pb-2 mb-3 text-primary">3. الفئات المسموحة والنوع (Gender)</h4>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="fw-bold">نوع الطلاب المسموح بهم</label>
//               <select 
//                 name="allowedTenants.studentGender" 
//                 className="form-select border-primary" 
//                 onChange={formik.handleChange}
//               >
//                 <option value="Male">ذكر (Male)</option>
//                 <option value="Female">أنثى (Female)</option>
//                 <option value="Both">الكل (Both)</option>
//               </select>
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="fw-bold">نوع العمال المسموح بهم</label>
//               <select 
//                 name="allowedTenants.workerGender" 
//                 className="form-select border-primary" 
//                 onChange={formik.handleChange}
//               >
//                 <option value="Male">ذكر (Male)</option>
//                 <option value="Female">أنثى (Female)</option>
//                 <option value="Both">الكل (Both)</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* القسم الرابع: الموقع والصور */}
//         <div className="card p-4 mb-4">
//           <h4 className="border-bottom pb-2 mb-3">4. الموقع والارتباط</h4>
//           <div className="row">
//             <div className="col-md-4 mb-3">
//               <label>المدينة</label>
//               <input name="city" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-md-4 mb-3">
//               <label>المحافظة</label>
//               <input name="government" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-md-4 mb-3">
//               <label>الشارع</label>
//               <input name="street" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-12 mb-3">
//               <label className="fw-bold text-danger">صورة الغلاف (مطلوب)</label>
//               <input type="file" className="form-control border-danger" onChange={(e) => setCoverFile(e.target.files[0])} />
//             </div>
//           </div>
//         </div>

//         <button 
//           type="submit" 
//           className="btn btn-success btn-lg w-100 shadow" 
//           disabled={isLoading}
//         >
//           {isLoading ? "جاري الحفظ والنشر..." : "نشر العقار الآن"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPropertyForm;




























































// import React, { useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';

// const AddPropertyForm = () => {
//   const [coverFile, setCoverFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   // سحب التوكن والتأكد إنه موجود
//   const token = localStorage.getItem("userToken");

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       description: "", 
//       monthlyRent: 0,
//       deposite: 0,
//       minimumStay: 1,
//       furnished: false,
//       availableFrom: new Date().toISOString(), 
//       size: 0,
//       numberOfBedrooms: 1,
//       numberOfLivingRooms: 1,
//       numberOfEnSuiteBathrooms: 0,
//       numberOfGuestBathrooms: 0,
//       allowedTenants: {
//         allowsFamilies: false,
//         allowsChildren: false,
//         allowsStudents: true,
//         studentGender: "Male",
//         allowsWorkers: false,
//         workerGender: "Male",
//         petsAllowed: false
//       },
//       amenities: {
//         wifi: false, tv: false, cooktop: false, oven: false, kettle: false,
//         dishwasher: false, refrigerator: false, microwave: false, washer: false,
//         freeParking: false, airConditioning: false, smokeAlarm: false, fireExtinguisher: false
//       },
//       nearbyServices: {
//         hasGroceryStore: false, hasPharmacy: false, hasHospital: false,
//         hasSchool: false, hasUniversity: false, hasPublicTransport: false,
//         hasParking: false, hasMall: false, hasRestaurants: false,
//         hasPark: false, hasGym: false, isSafeArea: false,
//         hasPoliceStation: false, isQuietArea: false, hasChurchNearby: false, hasMosqueNearby: false
//       },
//       street: "", 
//       city: "",
//       government: "",
//       latitude: 30.0444,
//       longitude: 31.2357,
//     },
// onSubmit: async (values) => {
//       if (!token) {
//         alert("Session expired. Please login again.");
//         return;
//       }

//       if (!coverFile) return alert("برجاء اختيار صورة الغلاف أولاً");
      
//       setIsLoading(true);
//       try {
//         // 1. رفع الصورة
//         const imgData = new FormData();
//         imgData.append('file', coverFile);
        
//         const imgRes = await axios.post('https://graduationproject1.runasp.net/api/Property/upload-image?isCover=true', imgData, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });

//         console.log("Raw Upload Response:", imgRes.data);

//         // التصحيح هنا: استخراج الـ String فقط من الـ Object الراجع
//         // السيرفر بيرجع { isSuccess: true, data: "http://...", ... }
//         const uploadedUrl = imgRes.data.data || imgRes.data.imageUrl || (typeof imgRes.data === 'string' ? imgRes.data : "");

//         if (!uploadedUrl) {
//           throw new Error("لم يتم استلام رابط الصورة بشكل صحيح من السيرفر");
//         }

//         // 2. تجهيز الـ Payload وتأكيد تحويل كل الأرقام
//         const finalPayload = {
//           name: String(values.name),
//           description: String(values.description),
//           monthlyRent: Number(values.monthlyRent),
//           deposite: Number(values.deposite),
//           minimumStay: Number(values.minimumStay),
//           furnished: Boolean(values.furnished),
//           availableFrom: values.availableFrom,
//           size: Number(values.size),
//           numberOfBedrooms: Number(values.numberOfBedrooms),
//           numberOfLivingRooms: Number(values.numberOfLivingRooms),
//           numberOfEnSuiteBathrooms: Number(values.numberOfEnSuiteBathrooms),
//           numberOfGuestBathrooms: Number(values.numberOfGuestBathrooms),
//           allowedTenants: values.allowedTenants,
//           amenities: values.amenities,
//           nearbyServices: values.nearbyServices,
//           street: String(values.street),
//           city: String(values.city),
//           government: String(values.government),
//           latitude: Number(values.latitude),
//           longitude: Number(values.longitude),
//           // التأكد أن imageUrl هو String نقي وليس Object
//           propertyImages: [
//             { 
//               id: 0, 
//               imageUrl: String(uploadedUrl), 
//               isCover: true 
//             }
//           ],
//           isDraft: false
//         };

//         console.log("Final Payload to Server:", finalPayload);

//         // 3. إرسال العقار
//         await axios.post('https://graduationproject1.runasp.net/api/Property/AddEntireProperty', finalPayload, {
//           headers: { 
//             'Content-Type': 'application/json', 
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         alert("تمت الإضافة بنجاح يا بشوي!");
//       } catch (error) {
//         console.error("Full Error Object:", error);
//         if (error.response?.data?.errors) {
//           console.log("Detailed Validation Errors:", error.response.data.errors);
//           alert("خطأ في التحقق من البيانات، راجع الكونسول");
//         } else {
//           alert(error.message || "حدث خطأ غير متوقع");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   });

//   return (
//     <div className="container py-5" dir="ltr">
//       <div className="card shadow border-0 p-4 rounded-4 bg-white">
//         <h2 className="text-center mb-4 fw-bold text-primary">Add New Property</h2>
//         <form onSubmit={formik.handleSubmit}>
          
//           {/* 1. Basic Details */}
//           <div className="mb-5">
//             <h5 className="fw-bold border-bottom pb-2 mb-3">🏠 Basic Details</h5>
//             <div className="row g-3">
//               <div className="col-12">
//                 <label className="small fw-bold text-muted">PROPERTY NAME</label>
//                 <input name="name" className="form-control" onChange={formik.handleChange} placeholder="Enter property name" />
//               </div>
//               <div className="col-12">
//                 <label className="small fw-bold text-muted">DESCRIPTION (Required)</label>
//                 <textarea name="description" className="form-control" rows="3" onChange={formik.handleChange}></textarea>
//               </div>
//               <div className="col-md-4">
//                 <label className="small fw-bold text-muted">MONTHLY RENT</label>
//                 <input name="monthlyRent" type="number" className="form-control" onChange={formik.handleChange} />
//               </div>
//               <div className="col-md-4">
//                 <label className="small fw-bold text-muted">DEPOSIT</label>
//                 <input name="deposite" type="number" className="form-control" onChange={formik.handleChange} />
//               </div>
//               <div className="col-md-4">
//                 <label className="small fw-bold text-muted">SIZE (m²)</label>
//                 <input name="size" type="number" className="form-control" onChange={formik.handleChange} />
//               </div>
//             </div>
//           </div>

//           {/* 2. Rooms & Capacity */}
//           <div className="mb-5 bg-light p-4 rounded-4">
//             <h5 className="fw-bold mb-3"> Rooms & Capacity</h5>
//             <div className="row text-center">
//               {['numberOfBedrooms', 'numberOfLivingRooms', 'numberOfEnSuiteBathrooms', 'numberOfGuestBathrooms'].map(field => (
//                 <div className="col-md-3 mb-3" key={field}>
//                   <label className="small text-muted d-block mb-2">{field.replace('numberOf', '')}</label>
//                   <div className="input-group input-group-sm justify-content-center">
//                     <button className="btn btn-primary" type="button" onClick={() => formik.setFieldValue(field, Math.max(0, formik.values[field] - 1))}>-</button>
//                     <span className="input-group-text bg-white px-3 fw-bold">{formik.values[field]}</span>
//                     <button className="btn btn-primary" type="button" onClick={() => formik.setFieldValue(field, formik.values[field] + 1)}>+</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 3. Allowed Tenants & Gender */}
//           <div className="mb-5">
//             <h5 className="fw-bold border-bottom pb-2 mb-3">👥 Allowed Tenants & Gender</h5>
//             <div className="row align-items-center">
//               <div className="col-md-6 mb-3">
//                 <label className="small fw-bold text-muted mb-2">Select Genders</label>
//                 <select name="allowedTenants.studentGender" className="form-select mb-2" onChange={formik.handleChange}>
//                   <option value="Male">Male Only</option>
//                   <option value="Female">Female Only</option>
//                   <option value="Both">Both (Mixed)</option>
//                 </select>
//                 <select name="allowedTenants.workerGender" className="form-select" onChange={formik.handleChange}>
//                   <option value="Male">Workers: Male</option>
//                   <option value="Female">Workers: Female</option>
//                 </select>
//               </div>
//               <div className="col-md-6 d-flex gap-2 flex-wrap">
//                 {['allowsFamilies', 'allowsStudents', 'allowsWorkers', 'petsAllowed'].map(key => (
//                   <button key={key} type="button" 
//                     className={`btn btn-sm rounded-pill ${formik.values.allowedTenants[key] ? 'btn-primary' : 'btn-outline-secondary'}`}
//                     onClick={() => formik.setFieldValue(`allowedTenants.${key}`, !formik.values.allowedTenants[key])}>
//                     {key.replace('allows', '')}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* 4. Amenities */}
//           <div className="mb-5">
//             <h5 className="fw-bold mb-3">Amenities</h5>
//             <div className="row">
//               {Object.keys(formik.values.amenities).map(key => (
//                 <div className="col-md-3 col-6 mb-2" key={key}>
//                   <div className="form-check">
//                     <input className="form-check-input" type="checkbox" id={key} checked={formik.values.amenities[key]} 
//                       onChange={() => formik.setFieldValue(`amenities.${key}`, !formik.values.amenities[key])} />
//                     <label className="form-check-label small" htmlFor={key}>{key}</label>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 5. Location, Date & Media */}
//           <div className="mb-5">
//             <h5 className="fw-bold border-bottom pb-2 mb-3">Location, Date & Media</h5>
//             <div className="row g-3">
//               <div className="col-md-4">
//                 <label className="small fw-bold text-muted">STREET</label>
//                 <input name="street" className="form-control" onChange={formik.handleChange} placeholder="e.g. 15 Tahrir St." />
//               </div>
//               <div className="col-md-4">
//                 <label className="small fw-bold text-muted">CITY</label>
//                 <input name="city" className="form-control" onChange={formik.handleChange} placeholder="e.g. Ismailia" />
//               </div>
//               <div className="col-md-4">
//                 <label className="small fw-bold text-muted">GOVERNMENT</label>
//                 <input name="government" className="form-control" onChange={formik.handleChange} />
//               </div>

//               {/* حقل التاريخ AVAILABLE FROM */}
//               <div className="col-md-6">
//                 <label className="small fw-bold text-primary">AVAILABLE FROM</label>
//                 <input 
//                   name="availableFrom" 
//                   type="date" 
//                   className="form-control" 
//                   value={formik.values.availableFrom.split('T')[0]} 
//                   onChange={(e) => {
//                     const selectedDate = e.target.value ? new Date(e.target.value).toISOString() : new Date().toISOString();
//                     formik.setFieldValue("availableFrom", selectedDate);
//                   }} 
//                 />
//               </div>

//               <div className="col-md-6">
//                 <label className="small fw-bold text-danger">COVER PHOTO</label>
//                 <input type="file" className="form-control" onChange={(e) => setCoverFile(e.target.files[0])} />
//               </div>
//             </div>
//           </div>

//           <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill py-3 shadow" disabled={isLoading}>
//             {isLoading ? "Publishing..." : "End and Publish →"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPropertyForm;
































// import React, { useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';

// const AddPropertyForm = () => {
//   const [coverFile, setCoverFile] = useState(null);
//   const [extraImages, setExtraImages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem("userToken");

//   const formik = useFormik({
//     initialValues: {
//       // 1. Basic Details (Image 1 & 5)
//       name: "",
//       description: "",
//       monthlyRent: 0,
//       deposite: 0,
//       minimumStay: 1,
//       furnished: false,
//       availableFrom: new Date().toISOString().split('T')[0],
//       size: 0,

//       // 2. Capacity & Rooms (Image 1)
//       numberOfBedrooms: 1,
//       numberOfLivingRooms: 1,
//       numberOfEnSuiteBathrooms: 0,
//       numberOfGuestBathrooms: 0,

//       // 3. Allowed Tenants & Gender (Image 1)
//       allowedTenants: {
//         allowsFamilies: false,
//         allowsChildren: false,
//         allowsStudents: true,
//         studentGender: "Male", 
//         allowsWorkers: false,
//         workerGender: "Male",
//         petsAllowed: false
//       },

//       // 4. Amenities (Image 2 & 4)
//       amenities: {
//         wifi: false, tv: false, cooktop: false, oven: false, kettle: false,
//         dishwasher: false, refrigerator: false, microwave: false, washer: false,
//         freeParking: false, airConditioning: false, smokeAlarm: false, fireExtinguisher: false
//       },

//       // 5. Nearby Services (Image 2 & 4)
//       nearbyServices: {
//         hasGroceryStore: false, hasPharmacy: false, hasHospital: false,
//         hasSchool: false, hasUniversity: false, hasPublicTransport: false,
//         hasParking: false, hasShoppingMall: false, hasRestaurants: false,
//         hasPublicPark: false, hasGym: false, isSafeArea: false,
//         hasPoliceStation: false, isQuietArea: false, hasChurchNearby: false, hasMosqueNearby: false
//       },

//       // 6. Address Details (Image 3)
//       street: "",
//       city: "",
//       government: "",
//       latitude: 30.0444,
//       longitude: 31.2357,
//     },
//     onSubmit: async (values) => {
//       if (!coverFile) return alert("برجاء رفع صورة الغلاف الأساسية");
//       if (!values.description || !values.street) return alert("الوصف واسم الشارع حقول إجبارية");

//       setIsLoading(true);
//       try {
//         // رفع صورة الغلاف
//         const imgData = new FormData();
//         imgData.append('file', coverFile);
//         const imgRes = await axios.post('https://graduationproject1.runasp.net/api/Property/upload-image?isCover=true', imgData, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });

//         // تجميع الـ Payload النهائي
//         const finalPayload = {
//           ...values,
//           monthlyRent: Number(values.monthlyRent),
//           deposite: Number(values.deposite),
//           size: Number(values.size),
//           numberOfBedrooms: Number(values.numberOfBedrooms),
//           numberOfLivingRooms: Number(values.numberOfLivingRooms),
//           numberOfEnSuiteBathrooms: Number(values.numberOfEnSuiteBathrooms),
//           numberOfGuestBathrooms: Number(values.numberOfGuestBathrooms),
//           propertyImages: [
//             { id: 0, imageUrl: imgRes.data.imageUrl, isCover: true }
//           ],
//           isDraft: false
//         };

//         await axios.post('https://graduationproject1.runasp.net/api/Property/AddEntireProperty', finalPayload, {
//           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
//         });

//         alert("تم حفظ ونشر العقار بنجاح!");
//       } catch (err) {
//         console.error("Validation Error:", err.response?.data?.errors);
//         alert("فشل الإرسال. راجع الكونسول لمعرفة الحقل الناقص");
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   });

//   return (
//     <div className="container py-5 bg-light" dir="ltr">
//       <form onSubmit={formik.handleSubmit}>
        
//         {/* Section 1: Basic Info */}
//         <div className="card shadow-sm border-0 p-4 mb-4 rounded-4">
//           <h5 className="fw-bold mb-4">Step 2: Basic Info</h5>
//           <div className="row g-3">
//             <div className="col-12">
//               <label className="small fw-bold text-muted">PROPERTY NAME</label>
//               <input name="name" className="form-control" placeholder="e.g. Modern 2BR with Nile View" onChange={formik.handleChange} />
//             </div>
//             <div className="col-12">
//               <label className="small fw-bold text-muted">DESCRIPTION</label>
//               <textarea name="description" className="form-control" rows="3" onChange={formik.handleChange} />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold text-muted">MONTHLY RENT (EGP)</label>
//               <input name="monthlyRent" type="number" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold text-muted">SECURITY DEPOSIT</label>
//               <input name="deposite" type="number" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-md-4">
//               <label className="small fw-bold text-muted">MINIMUM STAY</label>
//               <input name="minimumStay" type="number" className="form-control" onChange={formik.handleChange} />
//             </div>
//             <div className="col-md-6">
//               <div className="form-check form-switch mt-4">
//                 <input className="form-check-input" type="checkbox" name="furnished" onChange={formik.handleChange} />
//                 <label className="form-check-label fw-bold">Is it Furnished?</label>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <label className="small fw-bold text-muted">AVAILABLE FROM</label>
//               <input name="availableFrom" type="date" className="form-control" onChange={formik.handleChange} />
//             </div>
//           </div>
//         </div>

//         {/* Section 2: Capacity & Rooms */}
//         <div className="card shadow-sm border-0 p-4 mb-4 rounded-4">
//           <h5 className="fw-bold mb-4">Capacity & Rooms</h5>
//           <div className="row text-center">
//             {['numberOfBedrooms', 'numberOfLivingRooms', 'numberOfEnSuiteBathrooms', 'numberOfGuestBathrooms'].map(field => (
//               <div className="col-md-3 mb-3" key={field}>
//                 <label className="small text-muted d-block mb-2">{field.replace('numberOf', '')}</label>
//                 <div className="input-group input-group-sm justify-content-center">
//                   <button className="btn btn-outline-primary" type="button" onClick={() => formik.setFieldValue(field, Math.max(0, formik.values[field] - 1))}>-</button>
//                   <span className="input-group-text bg-white px-3 fw-bold">{formik.values[field]}</span>
//                   <button className="btn btn-outline-primary" type="button" onClick={() => formik.setFieldValue(field, formik.values[field] + 1)}>+</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Section 3: Amenities & Services (From Image 2 & 4) */}
//         <div className="card shadow-sm border-0 p-4 mb-4 rounded-4">
//           <h5 className="fw-bold mb-3">Step 3 & 4: Amenities & Services</h5>
//           <div className="row mb-4">
//             <p className="small fw-bold text-primary">AMENITIES</p>
//             {Object.keys(formik.values.amenities).map(key => (
//               <div className="col-md-3 col-6 mb-2" key={key}>
//                 <div className="form-check">
//                   <input className="form-check-input" type="checkbox" checked={formik.values.amenities[key]} 
//                     onChange={() => formik.setFieldValue(`amenities.${key}`, !formik.values.amenities[key])} />
//                   <label className="form-check-label small">{key}</label>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="row">
//             <p className="small fw-bold text-primary">NEARBY SERVICES</p>
//             {Object.keys(formik.values.nearbyServices).map(key => (
//               <div className="col-md-3 col-6 mb-2" key={key}>
//                 <div className="form-check">
//                   <input className="form-check-input" type="checkbox" checked={formik.values.nearbyServices[key]} 
//                     onChange={() => formik.setFieldValue(`nearbyServices.${key}`, !formik.values.nearbyServices[key])} />
//                   <label className="form-check-label small">{key.replace('has', '')}</label>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Section 4: Address & Gallery (From Image 3) */}
//         <div className="card shadow-sm border-0 p-4 mb-4 rounded-4">
//           <h5 className="fw-bold mb-4">Step 4 & 5: Location & Media</h5>
//           <div className="row">
//             <div className="col-md-6 mb-3">
//               <label className="small fw-bold text-muted">STREET ADDRESS</label>
//               <input name="street" className="form-control mb-2" placeholder="e.g. 123 Palm Street" onChange={formik.handleChange} />
//               <div className="row">
//                 <div className="col-6"><input name="city" className="form-control" placeholder="City" onChange={formik.handleChange} /></div>
//                 <div className="col-6"><input name="government" className="form-control" placeholder="Gov" onChange={formik.handleChange} /></div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <label className="small fw-bold text-danger">COVER PHOTO (REQUIRED)</label>
//               <input type="file" className="form-control" onChange={(e) => setCoverFile(e.target.files[0])} />
//             </div>
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill py-3 shadow" disabled={isLoading}>
//           {isLoading ? "Publishing..." : "End and Publish →"}
//         </button>

//       </form>
//     </div>
//   );
// };

// export default AddPropertyForm;
























// >>>Addpropertydone go to Addpropertydone if sucsess







import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import locationsData from './locations.json';
import { useNavigate } from 'react-router-dom';

const AMENITY_LABELS = {
  wifi: 'Wi-Fi', tv: 'TV', cooktop: 'Cooktop', oven: 'Oven', kettle: 'Kettle',
  dishwasher: 'Dishwasher', refrigerator: 'Refrigerator', microwave: 'Microwave',
  washer: 'Washer', freeParking: 'Free Parking', airConditioning: 'Air Conditioning',
  smokeAlarm: 'Smoke Alarm', fireExtinguisher: 'Fire Extinguisher'
};

const NEARBY_LABELS = {
  hasGroceryStore: 'Grocery Store', hasPharmacy: 'Pharmacy', hasHospital: 'Hospital',
  hasSchool: 'School', hasUniversity: 'University', hasPublicTransport: 'Public Transport',
  hasParking: 'Parking Lot', hasMall: 'Shopping Mall', hasRestaurants: 'Restaurants',
  hasPark: 'Public Park', hasGym: 'Gym / Fitness', isSafeArea: 'Safe Area',
  hasPoliceStation: 'Police Station', isQuietArea: 'Quiet Area',
  hasChurchNearby: 'Church Nearby', hasMosqueNearby: 'Mosque Nearby'
};

const MAX_PHOTOS = 20;



const AddPropertyForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyImages, setPropertyImages] = useState([]); // { file, preview, isCover }
  const [isLoading, setIsLoading] = useState(false);
  const coverInputRef = useRef(null);
  const interiorInputRef = useRef(null);
  const token = localStorage.getItem("userToken");

  const setCoverPhoto = (index) => {
    setPropertyImages(prev => prev.map((img, i) => ({ ...img, isCover: i === index })));
  };

  const addCoverPhoto = (file) => {
    if (!file?.type?.startsWith('image/')) return;
    const preview = URL.createObjectURL(file);
    setPropertyImages(prev => {
      const withoutOldCover = prev.filter(img => !img.isCover);
      return [{ file, preview, isCover: true }, ...withoutOldCover].slice(0, MAX_PHOTOS);
    });
  };

  const addInteriorPhotos = (files) => {
    const imageFiles = Array.from(files).filter(f => f?.type?.startsWith('image/'));
    const hasCover = propertyImages.some(img => img.isCover);
    const newImgs = imageFiles.map((file, i) => ({
      file,
      preview: URL.createObjectURL(file),
      isCover: !hasCover && i === 0
    }));
    setPropertyImages(prev => {
      const combined = [...prev, ...newImgs];
      if (!combined.some(img => img.isCover) && combined.length) combined[0].isCover = true;
      return combined.slice(0, MAX_PHOTOS);
    });
  };

  const removePhoto = (index) => {
    setPropertyImages(prev => {
      const next = prev.filter((_, i) => i !== index);
      if (prev[index].isCover && next.length) next[0].isCover = true;
      return next;
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      monthlyRent: 0,
      deposite: 0,
      minimumStay: 1,
      furnished: false,
      availableFrom: new Date().toISOString(),
      size: 0,
      numberOfBedrooms: 1,
      numberOfLivingRooms: 1,
      numberOfEnSuiteBathrooms: 0,
      numberOfGuestBathrooms: 0,
      allowedTenants: {
        allowsFamilies: false,
        allowsChildren: false,
        allowsStudents: true,
        studentGender: "Both",
        allowsWorkers: false,
        workerGender: "Male",
        petsAllowed: false
      },
      amenities: {
        wifi: false, tv: false, cooktop: false, oven: false, kettle: false,
        dishwasher: false, refrigerator: false, microwave: false, washer: false,
        freeParking: false, airConditioning: false, smokeAlarm: false, fireExtinguisher: false
      },
      nearbyServices: {
        hasGroceryStore: false, hasPharmacy: false, hasHospital: false,
        hasSchool: false, hasUniversity: false, hasPublicTransport: false,
        hasParking: false, hasMall: false, hasRestaurants: false,
        hasPark: false, hasGym: false, isSafeArea: false,
        hasPoliceStation: false, isQuietArea: false, hasChurchNearby: false, hasMosqueNearby: false
      },
      street: "",
      city: "",
      government: "",
      latitude: 30.0444,
      longitude: 31.2357,
    },
onSubmit: async (values, { setSubmitting }) => {

  if (!token) {
    alert("Session expired. Please login again.");
    setSubmitting(false);
    return;
  }

  if (!values.government) {
    alert("Please select Governorate");
    setSubmitting(false);
    return;
  }

  const today = new Date();
  today.setHours(0,0,0,0);

  const selectedDate = new Date(values.availableFrom);

  if (selectedDate < today) {
    alert("Available From date cannot be in the past");
    setSubmitting(false);
    return;
  }

  const hasCover = propertyImages.some(img => img.isCover);

  if (!propertyImages.length || !hasCover) {
    alert("Please upload at least one photo and mark one as Cover Photo.");
    setSubmitting(false);
    return;
  }

  if (!values.city) {
    alert("Please select City from the address section.");
    setSubmitting(false);
    return;
  }

  setIsLoading(true);

  try {

    const uploaded = [];

    for (let i = 0; i < propertyImages.length; i++) {

      const img = propertyImages[i];

      const fd = new FormData();

      fd.append("file", img.file);

      const res = await axios.post(
        `https://graduationproject1.runasp.net/api/Property/upload-image?isCover=${img.isCover}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      let url = "";

      const data = res.data;

      if (data?.data) {
        const d = data.data;
        url = d?.url || d?.imageUrl || d?.path || (typeof d === "string" ? d : "");
      }

      if (!url) {
        url = data?.url || data?.imageUrl || (typeof data === "string" ? data : "");
      }

      if (!url || typeof url !== "string") {
        throw new Error("Could not get image URL from server.");
      }

      uploaded.push({
        imageUrl: String(url),
        isCover: Boolean(img.isCover)
      });
    }

    const num = (v) =>
      v === "" || v === null || v === undefined ? 0 : Number(v);

    const str = (v) => (v == null ? "" : String(v));

    const finalPayload = {

      name: str(values.name),

      description: str(values.description),

      monthlyRent: num(values.monthlyRent),

      deposite: num(values.deposite),

      minimumStay: Math.max(1, num(values.minimumStay)),

      furnished: Boolean(values.furnished),

      availableFrom: selectedDate.toISOString(),

      size: num(values.size),

      numberOfBedrooms: num(values.numberOfBedrooms),

      numberOfLivingRooms: num(values.numberOfLivingRooms),

      numberOfEnSuiteBathrooms: num(values.numberOfEnSuiteBathrooms),

      numberOfGuestBathrooms: num(values.numberOfGuestBathrooms),

      allowedTenants: values.allowedTenants,

      amenities: values.amenities,

      nearbyServices: values.nearbyServices,

      street: str(values.street),

      city: str(values.city),

      government: str(values.government),

      latitude: Number(values.latitude),

      longitude: Number(values.longitude),

      propertyImages: uploaded.map((img) => ({
        imageUrl: img.imageUrl,
        isCover: img.isCover
      })),

      isDraft: false
    };

    console.log("Sending payload:", JSON.stringify(finalPayload, null, 2));

    const response = await axios.post(
      "https://graduationproject1.runasp.net/api/Property/AddEntireProperty",
      finalPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("API Response:", response.data);

    alert("تمت إضافة العقار بنجاح 🎉");
// >>>Addpropertydone go to Addpropertydone if sucsess
navigate('/Addpropertydone');

  } catch (error) {

    const errData = error.response?.data;

    console.error("API Error:", errData);

    if (errData?.errors) {

      const msg = Object.entries(errData.errors)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
        .join("\n");

      alert("Validation error:\n" + msg);

    } else if (errData?.message) {

      alert(errData.message);

    } else {

      alert(error.message || "Unexpected error occurred");

    }

  } finally {

    setIsLoading(false);
    setSubmitting(false);

  }
}
  });

  const totalSteps = 4;
  const stepTitles = ['', 'Basic Info', 'Allowed Tenants', 'Amenities', 'Location & Media'];
  const bgStyle = { backgroundColor: '#f0f4f8', minHeight: '100vh' };

  return (
    <div className="py-5 mt-5" style={bgStyle} dir="ltr">
      <div className="container">
        <nav className="d-flex justify-content-between align-items-center mb-4">
          <small className="text-muted">Property Portal / Create New Listing</small>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary btn-sm">Save Draft</button>
            <button type="button" onClick={() => formik.handleSubmit()} className="btn btn-primary btn-sm" disabled={isLoading}>
              Publish Listing
            </button>
          </div>
        </nav>

        <form onSubmit={formik.handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
              <div className="card shadow-sm border-0 p-4 mb-4 rounded-4 bg-white">
                <h4 className="fw-bold text-primary mb-2">Step 2: Basic Info</h4>
                <p className="small text-muted mb-4">Provide the essential details about your apartment listing.</p>

                <div className="mb-4">
                  <h6 className="fw-bold mb-3">📄 Basic Details</h6>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="small fw-bold text-muted">PROPERTY NAME</label>
                      <input name="name" className="form-control" placeholder="e.g. Modern 2BR with Nile View" onChange={formik.handleChange} value={formik.values.name} />
                    </div>
                    <div className="col-12">
                      <label className="small fw-bold text-muted">DESCRIPTION</label>
                      <textarea name="description" className="form-control" rows="3" placeholder="Describe the atmosphere, neighborhood, and unique features..." onChange={formik.handleChange} value={formik.values.description} />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold text-muted">MONTHLY RENT</label>
                      <input name="monthlyRent" type="number" className="form-control" placeholder="EGP 0.00" onChange={formik.handleChange} value={formik.values.monthlyRent || ''} />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold text-muted">SECURITY DEPOSIT</label>
                      <input name="deposite" type="number" className="form-control" placeholder="EGP 0.00" onChange={formik.handleChange} value={formik.values.deposite || ''} />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold text-muted">Minimum Stay</label>
                      <div className="input-group">
                        <button type="button" className="btn btn-outline-primary" onClick={() => formik.setFieldValue('minimumStay', Math.max(1, formik.values.minimumStay - 1))}>−</button>
                        <input name="minimumStay" type="number" className="form-control text-center" value={formik.values.minimumStay} readOnly />
                        <button type="button" className="btn btn-outline-primary" onClick={() => formik.setFieldValue('minimumStay', formik.values.minimumStay + 1)}>+</button>
                      </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="furnished" checked={formik.values.furnished} onChange={formik.handleChange} />
                        <label className="form-check-label fw-bold">Is it Furnished?</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-bold text-muted">AVAILABLE FROM</label>
                      <input name="availableFrom" type="date" className="form-control" value={formik.values.availableFrom?.split('T')[0] || ''} onChange={(e) => formik.setFieldValue('availableFrom', e.target.value ? new Date(e.target.value).toISOString() : new Date().toISOString())} />
                    </div>
                    <div className="col-12">
                      <label className="small fw-bold text-muted">MEASURE OF THE APARTMENT (Size)</label>
                      <input name="size" type="number" className="form-control" placeholder="M² 0.00" onChange={formik.handleChange} value={formik.values.size || ''} />
                    </div>
                  </div>
                </div>

                <div className="bg-light p-4 rounded-4">
                  <h6 className="fw-bold mb-3">🏠 Capacity & Rooms</h6>
                  <div className="row text-center g-3">
                    {[
                      { key: 'numberOfBedrooms', label: 'Number of Bedrooms' },
                      { key: 'numberOfLivingRooms', label: 'Living Rooms' },
                      { key: 'numberOfEnSuiteBathrooms', label: 'En-suite Bathrooms' },
                      { key: 'numberOfGuestBathrooms', label: 'Guest Bathrooms' }
                    ].map(({ key, label }) => (
                      <div className="col-md-3 col-6" key={key}>
                        <label className="small text-muted d-block mb-2">{label}</label>
                        <div className="input-group input-group-sm justify-content-center">
                          <button type="button" className="btn btn-primary" onClick={() => formik.setFieldValue(key, Math.max(0, formik.values[key] - 1))}>−</button>
                          <span className="input-group-text bg-white px-3 fw-bold" style={{ minWidth: 48 }}>{formik.values[key]}</span>
                          <button type="button" className="btn btn-primary" onClick={() => formik.setFieldValue(key, formik.values[key] + 1)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              )}

              {/* Step 2: Allowed Tenants */}
              {currentStep === 2 && (
              <div className="card shadow-sm border-0 p-4 mb-4 rounded-4 bg-white">
                <h6 className="fw-bold mb-3">👥 Allowed Tenants</h6>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex flex-wrap gap-2">
                      {[
                        { key: 'petsAllowed', label: 'Pets Allowed' },
                        { key: 'allowsFamilies', label: 'Families' },
                        { key: 'allowsChildren', label: 'Children' },
                        { key: 'allowsStudents', label: 'Students' },
                        { key: 'allowsWorkers', label: 'Workers' }
                      ].map(({ key, label }) => (
                        <button key={key} type="button" className={`btn btn-sm rounded-pill ${formik.values.allowedTenants[key] ? 'btn-primary' : 'btn-outline-secondary'}`} onClick={() => formik.setFieldValue(`allowedTenants.${key}`, !formik.values.allowedTenants[key])}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold text-muted">Select preferred gender for Students/Workers</label>
                    <select name="allowedTenants.studentGender" className="form-select form-select-sm" onChange={formik.handleChange} value={formik.values.allowedTenants.studentGender}>
                      <option value="Both">Any Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <select name="allowedTenants.workerGender" className="form-select form-select-sm mt-2" onChange={formik.handleChange} value={formik.values.allowedTenants.workerGender}>
                      <option value="Both">Any Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              )}

              {/* Step 3: Amenities */}
              {currentStep === 3 && (
              <div className="card shadow-sm border-0 p-4 mb-4 rounded-4 bg-white">
                <h4 className="fw-bold text-primary mb-2">Step 3 & 4: Amenities</h4>
                <p className="small text-muted mb-4">Almost there! Finalize where the property is and show it off.</p>
                <div className="mb-4">
                  <h6 className="fw-bold mb-3">Amenities</h6>
                  <div className="row">
                    {Object.keys(formik.values.amenities).map(key => (
                      <div className="col-md-4 col-6 mb-2" key={key}>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id={`a-${key}`} checked={formik.values.amenities[key]} onChange={() => formik.setFieldValue(`amenities.${key}`, !formik.values.amenities[key])} />
                          <label className="form-check-label small" htmlFor={`a-${key}`}>{AMENITY_LABELS[key] || key}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h6 className="fw-bold mb-3">📍 Nearby Services</h6>
                  <div className="row">
                    {Object.keys(formik.values.nearbyServices).map(key => (
                      <div className="col-md-4 col-6 mb-2" key={key}>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id={`n-${key}`} checked={formik.values.nearbyServices[key]} onChange={() => formik.setFieldValue(`nearbyServices.${key}`, !formik.values.nearbyServices[key])} />
                          <label className="form-check-label small" htmlFor={`n-${key}`}>{NEARBY_LABELS[key] || key}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              )}

              {/* Step 4: Location & Media (no map) */}
              {currentStep === 4 && (
              <div className="card shadow-sm border-0 p-4 mb-4 rounded-4 bg-white">
                <h4 className="fw-bold text-primary mb-2">Step 4 & 5: Location & Media</h4>
                <div className="row g-4">
                  <div className="col-lg-6">
                    <h6 className="fw-bold mb-3">📍 Address Details</h6>
                    <div className="mb-3">
                      <label className="small fw-bold text-muted">Governorate</label>
                      <select
                        name="government"
                        className="form-select"
                        value={formik.values.government}
                        onChange={(e) => {
                          const gov = e.target.value;
                          formik.setFieldValue('government', gov);
                          formik.setFieldValue('city', '');
                          const govData = locationsData.find(l => l.NameInEnglish === gov);
                          if (govData) {
                            formik.setFieldValue('latitude', govData.Latitude);
                            formik.setFieldValue('longitude', govData.Longitude);
                          }
                        }}
                      >
                        <option value="">Select Governorate</option>
                        {locationsData.map((g) => (
                          <option key={g.NameInEnglish} value={g.NameInEnglish}>{g.NameInEnglish}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="small fw-bold text-muted">City</label>
                      <select
                        name="city"
                        className="form-select"
                        value={formik.values.city}
                        onChange={(e) => {
                          const cityName = e.target.value;
                          formik.setFieldValue('city', cityName);
                          const govData = locationsData.find(l => l.NameInEnglish === formik.values.government);
                          const cityData = govData?.CitiesAndVillages?.find(c => c.NameInEnglish === cityName);
                          if (cityData) {
                            formik.setFieldValue('latitude', cityData.Latitude);
                            formik.setFieldValue('longitude', cityData.Longitude);
                          }
                        }}
                      >
                        <option value="">Select City</option>
                        {locationsData
                          .find(l => l.NameInEnglish === formik.values.government)
                          ?.CitiesAndVillages?.map((c) => (
                            <option key={c.NameInEnglish} value={c.NameInEnglish}>{c.NameInEnglish}</option>
                          )) || null}
                      </select>
                    </div>
                    <div>
                      <label className="small fw-bold text-muted">Street Address</label>
                      <input name="street" className="form-control" placeholder="e.g. 123 Palm Street, Block 4" onChange={formik.handleChange} value={formik.values.street} />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <h6 className="fw-bold mb-3">🖼️ Property Gallery</h6>
                    <div className="mb-3">
                      <label className="small fw-bold text-muted d-block mb-2">COVER PHOTO</label>
                      <div className="border border-2 border-dashed rounded-3 p-4 text-center position-relative" style={{ minHeight: 140, backgroundColor: '#fef7ed', borderColor: '#fed7aa' }}>
                        <span className="badge bg-primary position-absolute top-0 start-0 m-2">MAIN FEATURED</span>
                        <input ref={coverInputRef} type="file" accept="image/*" className="d-none" onChange={(e) => { addCoverPhoto(e.target.files?.[0]); e.target.value = ''; }} />
                        {propertyImages.find(img => img.isCover) ? (
                          <div className="position-relative d-inline-block" onClick={() => coverInputRef.current?.click()} style={{ cursor: 'pointer' }}>
                            <img src={propertyImages.find(img => img.isCover).preview} alt="Cover" style={{ maxHeight: 120, maxWidth: '100%', objectFit: 'cover', borderRadius: 8 }} />
                            <span className="badge bg-secondary position-absolute bottom-0 end-0 m-1">Change</span>
                            <button type="button" className="btn btn-sm btn-danger position-absolute top-0 start-0 m-1" onClick={(e) => { e.stopPropagation(); removePhoto(propertyImages.findIndex(i => i.isCover)); }}>×</button>
                          </div>
                        ) : (
                          <div onClick={() => coverInputRef.current?.click()} style={{ cursor: 'pointer' }} className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                            <div className="text-primary mb-2" style={{ fontSize: '2rem' }}>📷</div>
                            <small className="text-muted">Click to upload cover photo</small>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="small fw-bold text-muted d-block mb-2">INTERIOR & OTHER VIEWS</label>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small text-muted">{propertyImages.length}/{MAX_PHOTOS} Photos</span>
                        <button type="button" className="btn btn-primary btn-sm" onClick={() => interiorInputRef.current?.click()}>Select Files</button>
                      </div>
                      <input ref={interiorInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="d-none" onChange={(e) => { addInteriorPhotos(e.target.files); e.target.value = ''; }} />
                      <div className="border border-2 border-dashed rounded-3 p-4 text-center" style={{ minHeight: 120, backgroundColor: '#f8fafc' }} onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }} onDrop={(e) => { e.preventDefault(); addInteriorPhotos(e.dataTransfer.files); }}>
                        <small className="text-muted d-block">Drag and drop photos here.</small>
                        <small className="text-muted">Or click to browse. JPG, PNG, WEBP.</small>
                        <div className="d-flex flex-wrap gap-2 mt-3 justify-content-center">
                          {propertyImages.map((img, i) => (
                            <div key={i} className="position-relative">
                              <img src={img.preview} alt="" style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }} />
                              {img.isCover ? <span className="badge bg-primary position-absolute top-0 start-0" style={{ fontSize: 9 }}>Cover</span> : <button type="button" className="btn btn-sm btn-outline-primary position-absolute top-0 start-0" style={{ fontSize: 9, padding: '2px 4px' }} onClick={() => setCoverPhoto(i)}>Set Cover</button>}
                              <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0" style={{ padding: '0 4px', fontSize: 12 }} onClick={() => removePhoto(i)}>×</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-4">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setCurrentStep(s => Math.max(1, s - 1))} disabled={currentStep === 1}>← Back</button>
                <span className="text-muted small">Step {currentStep} of {totalSteps} — {stepTitles[currentStep]}</span>
                {currentStep < totalSteps ? (
                  <button type="button" className="btn btn-primary px-4" onClick={() => setCurrentStep(s => Math.min(totalSteps, s + 1))}>Next Step →</button>
                ) : (
                  <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>{isLoading ? 'Publishing...' : 'End and Publish →'}</button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyForm;