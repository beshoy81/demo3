// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Button, Card } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faBuilding, faBed, faArrowRight, faArrowLeft, 
//   faCheckCircle, faCheckSquare, faThLarge, 
//   faEye, faShieldAlt, faBolt, faClock, 
//   faFileAlt, faEnvelope 
// } from '@fortawesome/free-solid-svg-icons';

// import ApartmentFormUI from '../Addproperty/addproperty';

// import imgeing from'../../img/b56dc7cd4a5d1e7881bd0f701a18d289b808e030.png';
// import imgeing2 from'../../img/c819ab738ed3a56014bc8af6abff37e32cbda1c8.png';

// const PropertyFlow = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [selectedType, setSelectedType] = useState('whole');

//   const handleContinue = () => {
//     if (selectedType === 'whole') {
//       setStep(1.5);
//     } else {
//       navigate('/AddSharedProperty');
//     }
//   };

//   const handleRoomsCardClick = () => {
//     setSelectedType('rooms');
//     navigate('/AddSharedProperty');
//   };

//   const styles = {
//     wrapper: { backgroundColor: '#f8faff', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '40px 0' },
//     card: (isActive) => ({
//       borderRadius: '20px',
//       border: isActive ? '2px solid #1e2d5b' : '2px solid transparent',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       overflow: 'hidden',
//       boxShadow: isActive ? '0 10px 25px rgba(30, 45, 91, 0.1)' : '0 4px 15px rgba(0,0,0,0.05)',
//       height: '100%'
//     }),
//     imgWrapper: { height: '220px', overflow: 'hidden' },
//     img: { width: '100%', height: '100%', objectFit: 'cover' },
//     iconBadge: { backgroundColor: '#f0f4f8', padding: '10px', borderRadius: '8px', color: '#1e2d5b', display: 'inline-flex' },
//     selectedTag: { backgroundColor: '#1e2d5b', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' },
//     continueBtn: { backgroundColor: '#1e2d5b', border: 'none', padding: '12px 30px', borderRadius: '10px', fontWeight: '600' },
//     // تنسيق الأيقونات في صفحة النجاح
//     illustrationCircle: { width: '180px', height: '180px', background: 'radial-gradient(circle, #eef2ff 0%, #ffffff 100%)', borderRadius: '50%', margin: '0 auto 25px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' },
//     blueBox: { backgroundColor: '#1e2d5b', color: 'white', width: '75px', height: '75px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '35px' },
//     smallIconsRow: { position: 'absolute', bottom: '30px', display: 'flex', gap: '8px' },
//     miniIcon: { backgroundColor: '#c6d4f9', color: '#1e2d5b', width: '30px', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }
//   };

//   return (
//     <div style={styles.wrapper}>
//       <Container>
//         {/* الخطوة 1: اختيار النوع */}
//         {step === 1 && (
//           <Row className="justify-content-center">
//             <Col lg={10}>
//               <div className="text-center mb-5">
//                 <h1 className="fw-bold">What type of property are you listing?</h1>
//                 <p className="text-muted">Select the option that best describes your available space.</p>
//               </div>
//               <Row className="justify-content-center g-4">
//                 <Col md={6} lg={5}>
//                   <Card style={styles.card(selectedType === 'whole')} onClick={() => setSelectedType('whole')}>
//                     <div style={styles.imgWrapper}><img src={imgeing} alt="Apartment" style={styles.img} /></div>
//                     <Card.Body className="p-4">
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <div style={styles.iconBadge}><FontAwesomeIcon icon={faBuilding} /></div>
//                         {selectedType === 'whole' && <span style={styles.selectedTag}><FontAwesomeIcon icon={faCheckCircle} className="me-1" /> SELECTED</span>}
//                       </div>
//                       <h4 className="fw-bold">Whole Apartment</h4>
//                       <p className="text-muted small">List the entire place as a single unit.</p>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={6} lg={5}>
//                   <Card style={styles.card(selectedType === 'rooms')} onClick={handleRoomsCardClick}>
//                     <div style={styles.imgWrapper}><img src={imgeing2} alt="Rooms" style={styles.img} /></div>
//                     <Card.Body className="p-4">
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <div style={styles.iconBadge}><FontAwesomeIcon icon={faBed} /></div>
//                         {selectedType === 'rooms' && <span style={styles.selectedTag}><FontAwesomeIcon icon={faCheckCircle} className="me-1" /> SELECTED</span>}
//                       </div>
//                       <h4 className="fw-bold">Divided into Rooms</h4>
//                       <p className="text-muted small">List individual rooms for different tenants.</p>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>
//               <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
//                 <Button variant="light" className="fw-bold text-muted" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back</Button>
//                 <Button style={styles.continueBtn} onClick={handleContinue}>
//                   Continue to Step 2 <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
//                 </Button>
//               </div>
//             </Col>
//           </Row>
//         )}

//         {/* الخطوة 1.5: الانتقال للفورم بتاعك */}
//         {step === 1.5 && (
//           <ApartmentFormUI 
//             onNext={() => setStep(2)} // لما يخلص الفورم يروح للنجاح
//             onBack={() => setStep(1)} // لو عايز يرجع للاختيار
//           />
//         )}

//         {/* الخطوة 2: شاشة النجاح النهائية */}
//         {step === 2 && (
//           <Row className="justify-content-center">
//             <Col md={8} lg={6} className="text-center">
//               <div className="bg-white p-5 shadow-sm" style={{ borderRadius: '25px' }}>
//                 <div style={styles.illustrationCircle}>
//                   <div style={styles.blueBox}><FontAwesomeIcon icon={faCheckSquare} /></div>
//                   <div style={styles.smallIconsRow}>
//                     <div style={styles.miniIcon}><FontAwesomeIcon icon={faClock} /></div>
//                     <div style={styles.miniIcon}><FontAwesomeIcon icon={faFileAlt} /></div>
//                     <div style={styles.miniIcon}><FontAwesomeIcon icon={faEnvelope} /></div>
//                   </div>
//                 </div>
//                 <h2 className="fw-bold mb-3">Listing Submitted Successfully!</h2>
//                 <p className="text-muted mb-4">Your property has been sent to the admin for review.</p>
//                 <Button style={styles.continueBtn} onClick={() => navigate('/home')}><FontAwesomeIcon icon={faThLarge} className="me-2" /> Go to Dashboard</Button>
//               </div>
//             </Col>
//           </Row>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default PropertyFlow;









import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding, faBed, faArrowRight, faArrowLeft, 
  faCheckCircle, faCheckSquare, faThLarge, 
  faClock, faFileAlt, faEnvelope 
} from '@fortawesome/free-solid-svg-icons';

import ApartmentFormUI from '../Addproperty/addproperty';

// تأكد من صحة مسارات الصور في مشروعك
import imgeing from '../../img/b56dc7cd4a5d1e7881bd0f701a18d289b808e030.png';
import imgeing2 from '../../img/c819ab738ed3a56014bc8af6abff37e32cbda1c8.png';

const PropertyFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('whole');

  const handleContinue = () => {
    if (selectedType === 'whole') {
      setStep(1.5); // الانتقال للفورم
    } else {
      navigate('/AddSharedProperty');
    }
  };

  const styles = {
    wrapper: { backgroundColor: '#f8faff', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '40px 0' },
    card: (isActive) => ({
      borderRadius: '20px',
      border: isActive ? '2px solid #1e2d5b' : '2px solid #eee',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      boxShadow: isActive ? '0 10px 25px rgba(30, 45, 91, 0.1)' : '0 4px 15px rgba(0,0,0,0.05)',
      height: '100%',
      backgroundColor: '#fff'
    }),
    imgWrapper: { height: '220px', overflow: 'hidden' },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    iconBadge: { backgroundColor: '#f0f4f8', padding: '10px', borderRadius: '8px', color: '#1e2d5b', display: 'inline-flex' },
    selectedTag: { backgroundColor: '#1e2d5b', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' },
    continueBtn: { backgroundColor: '#1e2d5b', border: 'none', padding: '12px 30px', borderRadius: '10px', fontWeight: '600' },
    illustrationCircle: { width: '180px', height: '180px', background: 'radial-gradient(circle, #eef2ff 0%, #ffffff 100%)', borderRadius: '50%', margin: '0 auto 25px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    blueBox: { backgroundColor: '#1e2d5b', color: 'white', width: '75px', height: '75px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '35px' },
    smallIconsRow: { position: 'absolute', bottom: '30px', display: 'flex', gap: '8px' },
    miniIcon: { backgroundColor: '#c6d4f9', color: '#1e2d5b', width: '30px', height: '30px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }
  };

  return (
    <div style={styles.wrapper}>
      <Container>
        {/* الخطوة 1: اختيار النوع */}
        {step === 1 && (
          <Row className="justify-content-center mt-4">
            <Col lg={10}>
              <div className="text-center mb-5">
                <h1 className="fw-bold">What type of property are you listing?</h1>
                <p className="text-muted">Select the option that best describes your available space.</p>
              </div>
              <Row className="justify-content-center g-4">
                <Col md={6} lg={5}>
                  <Card style={styles.card(selectedType === 'whole')} onClick={() => setSelectedType('whole')}>
                    <div style={styles.imgWrapper}><img src={imgeing} alt="Apartment" style={styles.img} /></div>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div style={styles.iconBadge}><FontAwesomeIcon icon={faBuilding} /></div>
                        {selectedType === 'whole' && <span style={styles.selectedTag}><FontAwesomeIcon icon={faCheckCircle} className="me-1" /> SELECTED</span>}
                      </div>
                      <h4 className="fw-bold">Whole Apartment</h4>
                      <p className="text-muted small">List the entire place as a single unit.</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} lg={5}>
                  <Card style={styles.card(selectedType === 'rooms')} onClick={() => setSelectedType('rooms')}>
                    <div style={styles.imgWrapper}><img src={imgeing2} alt="Rooms" style={styles.img} /></div>
                    <Card.Body className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div style={styles.iconBadge}><FontAwesomeIcon icon={faBed} /></div>
                        {selectedType === 'rooms' && <span style={styles.selectedTag}><FontAwesomeIcon icon={faCheckCircle} className="me-1" /> SELECTED</span>}
                      </div>
                      <h4 className="fw-bold">Divided into Rooms</h4>
                      <p className="text-muted small">List individual rooms for different tenants.</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
                <Button variant="light" className="fw-bold text-muted" onClick={() => navigate(-1)}>
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
                </Button>
                <Button style={styles.continueBtn} onClick={handleContinue}>
                  Continue to Step 2 <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                </Button>
              </div>
            </Col>
          </Row>
        )}

        {/* الخطوة 1.5: عرض الفورم */}
        {step === 1.5 && (
          <ApartmentFormUI 
            onNext={() => setStep(2)} 
            onBack={() => setStep(1)} 
          />
        )}

        {/* الخطوة 2: النجاح */}
        {step === 2 && (
          <Row className="justify-content-center">
            <Col md={8} lg={6} className="text-center">
              <div className="bg-white p-5 shadow-sm" style={{ borderRadius: '25px' }}>
                <div style={styles.illustrationCircle}>
                  <div style={styles.blueBox}><FontAwesomeIcon icon={faCheckSquare} /></div>
                  <div style={styles.smallIconsRow}>
                    <div style={styles.miniIcon}><FontAwesomeIcon icon={faClock} /></div>
                    <div style={styles.miniIcon}><FontAwesomeIcon icon={faFileAlt} /></div>
                    <div style={styles.miniIcon}><FontAwesomeIcon icon={faEnvelope} /></div>
                  </div>
                </div>
                <h2 className="fw-bold mb-3">Listing Submitted Successfully!</h2>
                <p className="text-muted mb-4">Your property has been sent to the admin for review.</p>
                <Button style={styles.continueBtn} onClick={() => navigate('/home')}>
                  <FontAwesomeIcon icon={faThLarge} className="me-2" /> Go to Dashboard
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default PropertyFlow;