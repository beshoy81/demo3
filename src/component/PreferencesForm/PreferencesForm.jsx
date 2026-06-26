// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PreferencesForm = () => {
//   const [questions, setQuestions] = useState([]); 
//   const [currentStep, setCurrentStep] = useState(0); 
//   const [answers, setAnswers] = useState({}); 
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = "https://graduationproject1.runasp.net/api/Question";

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/by-category`);
//         if (res.data && res.data.length > 0) {
//           setQuestions(res.data); 
//         }
//         console.log("Fetched questions:", res.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   if (loading) return <div className="loader">Loading...</div>;
  
//   // الحل الأساسي للمشكلة: التأكد إن questions فيها بيانات قبل الوصول لـ categoryName
//   if (questions.length === 0) return <div className="error">No questions found</div>;

//   const currentCategory = questions[currentStep];

//   return (
//     <div className="quiz-page">
//       <div className="quiz-card">
//         {/* Progress Bar - تصميم Figma */}
//         <div className="progress-container">
//           <div 
//             className="progress-bar-fill" 
//             style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
//           ></div>
//         </div>

//         {/* الوصول الآمن للبيانات باستخدام ? لمنع الـ Uncaught TypeError */}
//         <h2 className="cat-title">{currentCategory?.categoryName}</h2>

//         <div className="questions-box">
//           {currentCategory?.questions?.map((q, idx) => (
//             <div key={q.id} className="q-item">
//               <p>{idx + 1}. {q.text}</p>
//               <div className="options">
//                 {/* استبدل هذه الخيارات بما يرجعه الـ API فعلياً */}
//                 {["Option A", "Option B", "Option C"].map(opt => (
//                   <label key={opt}>
//                     <input 
//                       type="radio" 
//                       name={`q-${q.id}`} 
//                       onChange={() => setAnswers({...answers, [q.id]: opt})} 
//                     /> {opt}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="footer-btns">
//           {currentStep > 0 && (
//             <button className="back" onClick={() => setCurrentStep(currentStep - 1)}>Back</button>
//           )}
//           <button 
//             className="next" 
//             onClick={currentStep === questions.length - 1 ? () => alert("Done") : () => setCurrentStep(currentStep + 1)}
//           >
//             {currentStep === questions.length - 1 ? "Submit" : "Next"}
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .quiz-page { background: #1a365d; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
//         .quiz-card { background: white; padding: 40px; border-radius: 20px; width: 500px; }
//         .progress-container { background: #eee; height: 10px; border-radius: 5px; margin-bottom: 20px; }
//         .progress-bar-fill { background: #38a169; height: 100%; border-radius: 5px; transition: 0.4s; }
//         .cat-title { color: #1a365d; text-align: center; margin-bottom: 30px; font-weight: bold; }
//         .footer-btns { display: flex; justify-content: space-between; margin-top: 30px; }
//         .next { background: #1a365d; color: white; border: none; padding: 10px 25px; border-radius: 5px; cursor: pointer; margin-left: auto; }
//         .back { background: #81c784; color: white; border: none; padding: 10px 25px; border-radius: 5px; cursor: pointer; }
//       `}</style>
//     </div>
//   );
// };

// export default PreferencesForm;









































import React, { useState } from 'react';
import { Container, Card, Button, Form, ProgressBar } from 'react-bootstrap';

const SakanakPreferences = () => {
  const [step, setStep] = useState(0);

  const theme = {
    bgBlue: '#1a3a8a',
    btnGreen: '#90c9a7',
    textBlue: '#1a3a8a'
  };

  // جميع الأسئلة الـ 16 مقسمة حسب الصفحات في الصور
  const stepsData = [
    {
      type: 'intro',
      title: "Let's set up your preferences!",
      description: "Just a few quick questions to help us find roommates that truly match your lifestyle.",
      mainBtn: "Continue",
      linkBtn: "Skip"
    },
    {
      type: 'questions',
      category: "Cleanliness & Organization 🧹",
      questions: [
        { id: 1, label: "1. When your space gets a bit messy, how do you react?", options: ["I clean it right away", "I wait a little before cleaning", "It doesn't bother me much"] },
        { id: 2, label: "2. How often do you like to clean?", options: ["Daily", "Every couple of days", "Only when it really needs it"] },
        { id: 3, label: "3. When sharing a place, how do you prefer cleaning to be managed?", options: ["A clear cleaning schedule", "Just when needed by agreement", "Everyone cleans on their own"] }
      ]
    },
    {
      type: 'questions',
      category: "Calmness & Reactions 😌",
      questions: [
        { id: 4, label: "4. Can you study or work when there's noise around?", options: ["No, I need silence", "A little noise is fine", "I don't mind noise at all"] },
        { id: 5, label: "5. If your roommate stays up late and makes some noise, how would you handle it?", options: ["Talk to them calmly", "Let it go once, then talk later", "Get upset quickly"] },
        { id: 6, label: "6. When you're upset or in conflict, how do you usually react?", options: ["Stay calm and talk it out", "Take some time alone", "React quickly or get angry"] }
      ]
    },
    {
      type: 'questions',
      category: "Social Interaction 🚶‍♂️",
      questions: [
        { id: 7, label: "7. Do you prefer staying home alone or having people around?", options: ["I like my privacy", "I'm somewhere in between", "I love being around people"] },
        { id: 8, label: "8. If your roommate invites friends over, how do you feel about that?", options: ["It's fine as long as they're respectful", "Okay if it's not too often", "I don't like it"] },
        { id: 9, label: "9. Do you like sharing food or items with your roommate?", options: ["I don't mind sharing", "Only small things", "No, I prefer everyone to have their own"] }
      ]
    },
    {
      type: 'questions',
      category: "Trust & Safety 🛡️",
      questions: [
        { id: 10, label: "10. Do you prefer having clear rules between you and your roommate?", options: ["Yes, definitely", "Depends on the person", "Not really necessary"] },
        { id: 11, label: "11. If something goes missing or there's a misunderstanding, how would you handle it?", options: ["Talk it out", "Discuss it with a third person present", "Leave the place"] },
        { id: 12, label: "12. Have you ever faced an issue like theft or lack of safety while living with someone? (Optional)", options: ["Yes", "No"] }
      ]
    },
    {
      type: 'questions',
      category: "Lifestyle 🏠",
      questions: [
        { id: 13, label: "13. Do you usually wake up early or late?", options: ["Early", "In between", "Late"] },
        { id: 14, label: "14. Do you usually sleep early or late?", options: ["Early", "In between", "Late"] },
        { id: 15, label: "15. Do you smoke?", options: ["Yes", "No"] }
      ]
    },
    {
      type: 'text-area',
      category: "Final Thought 💭",
      label: "16. What's the most important quality you'd like your roommate to have?",
      placeholder: "Enter Text..."
    }
  ];

  const currentData = stepsData[step];
  const totalSteps = stepsData.length;

  const handleNext = () => setStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <Container fluid className="d-flex align-items-center justify-content-center p-0" 
               style={{ backgroundColor: theme.bgBlue, minHeight: '100vh' }}>
      
      <Card className="shadow-lg border-0 m-3" 
            style={{ width: '100%', maxWidth: '600px', borderRadius: '25px', minHeight: '500px' }}>
        
        <Card.Body className="p-4 p-md-5 d-flex flex-column justify-content-between">
          
          <div>
            {currentData.type === 'intro' ? (
              <div className="text-center py-4">
                <h2 className="fw-bold mb-4">{currentData.title}</h2>
                <p className="text-muted mb-5">{currentData.description}</p>
                <Button onClick={handleNext} className="w-100 mb-3 py-2 fw-bold" 
                        style={{ backgroundColor: theme.bgBlue, border: 'none', borderRadius: '12px' }}>
                  {currentData.mainBtn}
                </Button>
                <Button variant="link" className="w-100 fw-bold" style={{ color: theme.btnGreen, textDecoration: 'none' }}>
                  {currentData.linkBtn}
                </Button>
              </div>
            ) : (
              <>
                <h4 className="text-center mb-4 fw-bold" style={{ color: theme.textBlue }}>{currentData.category}</h4>
                
                {currentData.type === 'questions' ? (
                  currentData.questions.map((q) => (
                    <Form.Group key={q.id} className="mb-4">
                      <Form.Label className="fw-bold mb-2">{q.label}</Form.Label>
                      {q.options.map((opt, idx) => (
                        <Form.Check key={idx} type="radio" name={`q-${q.id}`} label={opt} id={`q-${q.id}-${idx}`} className="mb-1" />
                      ))}
                    </Form.Group>
                  ))
                ) : (
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold mb-2">{currentData.label}</Form.Label>
                    <Form.Control as="textarea" rows={6} placeholder={currentData.placeholder} 
                                  style={{ borderRadius: '15px', backgroundColor: '#f0f2f5', border: 'none' }} />
                  </Form.Group>
                )}
              </>
            )}
          </div>

          {step > 0 && (
            <div className="mt-auto">
              <ProgressBar className="mb-4" style={{ height: '8px', borderRadius: '10px' }}>
                <ProgressBar now={(step / (totalSteps - 1)) * 100} style={{ backgroundColor: theme.btnGreen }} />
              </ProgressBar>

              <div className="d-flex justify-content-between">
                <Button onClick={handleBack} className="px-5 py-1 fw-bold text-white shadow-sm"
                        style={{ backgroundColor: theme.btnGreen, border: 'none', borderRadius: '12px' }}>
                  Back
                </Button>
                <Button onClick={handleNext} className="px-5 py-1 fw-bold shadow-sm"
                        style={{ backgroundColor: theme.bgBlue, border: 'none', borderRadius: '12px' }}>
                  {step === totalSteps - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SakanakPreferences;