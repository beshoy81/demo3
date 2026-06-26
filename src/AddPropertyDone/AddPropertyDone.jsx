import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
// تأكد من تحميل مكتبة fontawesome أيضاً
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faEye, faShieldAlt, faBolt } from '@fortawesome/free-solid-svg-icons';

// استيراد الصورة (تأكد أن الملف موجود في نفس الفولدر)
// إذا استمر الخطأ، جرب وضع الصورة في فولدر public واستخدم src="/AddPropertyDone.png"
import successImageFile from '../img/Screenshot 2026-03-07 174651.png'; 

const AddPropertyDone = () => {
  return (
    <div className="page-wrapper" style={{ backgroundColor: '#f8faff', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <div className="main-card shadow-sm p-5" style={{ background: '#fff', borderRadius: '24px' }}>
              
              <div className="image-section mb-4">
                <img 
                  src={successImageFile} 
                  alt="Success" 
                  style={{ maxWidth: '100%', height: 'auto' }} 
                  onError={(e) => e.target.style.display='none'} // لو الصورة مش موجودة ميطلعش شكل بايظ
                />
              </div>

              <h2 className="fw-bold mb-3">Listing Submitted Successfully!</h2>
              <p className="text-muted mb-4">
                Your property has been sent to the admin for review. 
                Approval usually takes a few hours.
              </p>

              <div className="d-flex justify-content-center gap-2">
                <Button variant="primary" style={{ backgroundColor: '#1e2d5b', border: 'none' }}>
                  <FontAwesomeIcon icon={faThLarge} className="me-2" />
                  Go to Dashboard
                </Button>
                <Button variant="light" className="border">
                  <FontAwesomeIcon icon={faEye} className="me-2" />
                  View Preview
                </Button>
              </div>
            </div>

            <div className="mt-4">
               <span className="badge bg-light text-dark p-2 rounded-pill me-2">
                 <FontAwesomeIcon icon={faShieldAlt} className="me-1" /> SECURE PROCESS
               </span>
               <span className="badge bg-light text-dark p-2 rounded-pill">
                 <FontAwesomeIcon icon={faBolt} className="me-1" /> FAST REVIEW
               </span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddPropertyDone;