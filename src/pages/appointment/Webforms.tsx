// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useToast } from '../../hooks/use-toast';
// import { WebUrlGet } from '../../services/WebUrlGet';
// import { ApiPaths } from '../../utils/constantApiPaths';

// interface LocationState {
//   forms: string[];
//   formType?: 'before_insurance' | 'welcome_form';
// }

// const WebForms = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [currentFormIndex, setCurrentFormIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const messageListenerRef = useRef<((event: MessageEvent) => void) | null>(null);
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const state = location.state as LocationState | undefined;
//   const forms = state?.forms || [];
//   const formType = state?.formType || 'before_insurance';

//   useEffect(() => {
//     if (!state || forms.length === 0) {
//       handleNoForms();
//     }
//   }, [state, forms]);

//   // Cleanup effect
//   useEffect(() => {
//     return () => {
//       if (messageListenerRef.current) {
//         window.removeEventListener('message', messageListenerRef.current);
//       }
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const handleNoForms = async () => {
//     if (formType === 'before_insurance') {
//       if (ApiPaths.isInsurancePageShow.toLowerCase() === 'true') {
//         navigate('/insurance');
//       } else {
//         await handleWelcomeForm();
//       }
//     } else {
//       navigate('/apppointment');;
//     }
//   };

//   const handleWelcomeForm = async () => {
//     try {
//       setIsLoading(true);
//       const ptCustomerID = localStorage.getItem('ptCusomterID');
//       const locationId = localStorage.getItem('locationId');

//       if (!ptCustomerID) {
//         toast({
//           title: 'Error',
//           description: 'No patient ID found',
//           variant: 'destructive',
//         });
//         return;
//       }

//       const webUrlGet = new WebUrlGet({
//         formType: 'welcome_form',
//         patientNumber: ptCustomerID,
//         locationId: locationId || '',
//         IsFromOffice: 'false'
//       });

//       await webUrlGet.getUrl();

//       if (webUrlGet.response_Status_Code_API === 200) {
//         if (webUrlGet.formArray.length > 0) {
//           navigate('/web-forms', {
//             state: {
//               forms: webUrlGet.formArray,
//               formType: 'welcome_form'
//             }
//           });
//         } else {
//           navigate('/appointment');
//         }
//       } else {
//         toast({
//           title: 'Error',
//           description: 'Failed to load welcome form',
//           variant: 'destructive',
//         });
//       }
//     } catch (error) {
//       console.error('Error loading welcome form:', error);
//       toast({
//         title: 'Error',
//         description: 'An error occurred while loading the welcome form',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFormSubmit = () => {
//     // console.log(`Form ${currentFormIndex + 1} submitted, moving to next form`);

//     if (currentFormIndex < forms.length - 1) {
//       setCurrentFormIndex(currentFormIndex + 1);
//     } else {
//       // All forms in current batch completed
//       if (formType === 'before_insurance') {
//         if (ApiPaths.isInsurancePageShow.toLowerCase() === 'true') {
//           navigate('/insurance');
//         } else {
//           handleWelcomeForm();
//         }
//       } else {
//         navigate('/appointment');
//       }
//     }
//   };

//   const handleFormLoad = () => {
//     // console.log(`Form ${currentFormIndex + 1} loaded`);

//     // Remove previous message listener
//     if (messageListenerRef.current) {
//       window.removeEventListener("message", messageListenerRef.current);
//     }

//     // New message listener
//     messageListenerRef.current = (event: MessageEvent) => {
//       // console.log("Received message from iframe:", event.data);

//       const isStructuredSubmission =
//         typeof event.data === "object" && event.data?.action === "submission-completed";

//       const isGenericSubmission =
//         event.data === "formSubmitted" ||
//         event.data === "form_submitted" ||
//         (typeof event.data === "string" && event.data.includes("submit"));

//       if (isStructuredSubmission || isGenericSubmission) {
//         // console.log("Detected form submission — advancing after short delay");

//         setTimeout(() => {
//           handleFormSubmit();
//         }, 1500); // 1.5 seconds delay
//       }
//     };

//     window.addEventListener("message", messageListenerRef.current);
//   };
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
//           <p className="mt-4 text-lg">Loading forms...</p>
//         </div>
//       </div>
//     );
//   }
//   if (!state || forms.length === 0) {
//     return (
//       <div className="p-8 text-center">
//         <h2 className="text-2xl font-semibold mb-4">No forms available</h2>
//         <button
//           onClick={() => navigate('/appointment')}
//           className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
//         >
//           Back to Appointment
//         </button>
//       </div>
//     );
//   }

//   const currentFormUrl = forms[currentFormIndex];
//   const progress = ((currentFormIndex + 1) / forms.length) * 100;

//   return (
//     <div className="w-full h-screen flex flex-col">
//       {/* Progress Bar */}
//       {/* <div className="bg-gray-200 h-2">
//         <div
//           className="bg-blue-500 h-2 transition-all duration-300"
//           style={{ width: `${progress}%` }}
//         ></div>
//       </div> */}

//       {/* Form Counter */}
//       {/* <div className="bg-blue-500 text-white p-4 text-center">
//         <h2 className="text-xl font-semibold">
//           {formType === 'before_insurance' ? 'Patient Intake Forms' : 'Welcome Forms'}
//         </h2>
//         <p className="text-sm opacity-90">
//           Form {currentFormIndex + 1} of {forms.length}
//         </p>
//       </div> */}
//       {/* Form Content */}
//       <div className="flex-1">
//         <iframe
//           key={currentFormIndex} // Force re-render when form changes
//           src={currentFormUrl}
//           title={`Form ${currentFormIndex + 1}`}
//           className="w-full h-full"
//           style={{ border: 'none' }}
//           onLoad={handleFormLoad}
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default WebForms;
