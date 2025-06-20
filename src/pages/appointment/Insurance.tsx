import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InsuranceCard } from "../../components/ui/InsuranceCard";
import { toast } from 'react-toastify';
import { Button, Input } from '@ketan_nimase/ui';
// import { WebUrlGet } from '../../services/WebUrlGet';
// import { SaveInsuranceServices } from '../../services/SaveInsuranceService';
// import { GetInsuranceServices } from '../../services/GetInsuranceServices';
// import { GetUserDetailServices } from '../../services/GetUserDetailService';

export default function Insurance() {
  const navigate = useNavigate();
  const [isSelfPay, setIsSelfPay] = useState(false);
  const [insuranceCards, setInsuranceCards] = useState<number[]>([]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [insuranceData, setInsuranceData] = useState<Record<number, any>>({});
  // const [existingInsuranceList, setExistingInsuranceList] = useState<InsuranceResponseModel[]>([]);
  // Add a flag to track if data has been loaded
  const [dataLoaded, setDataLoaded] = useState(false);
  const insuranceCardRefs = useRef<Record<number, any>>({});
  const dataLoadedRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load existing insurance data and user details on component mount
  useEffect(() => {
    // Only load data if it hasn't been loaded yet
    if (!dataLoadedRef.current) {
      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();
      loadInsuranceData(abortControllerRef.current.signal);
      dataLoadedRef.current = true;
    }

    // Cleanup function to abort any in-progress requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const loadInsuranceData = async (signal?: AbortSignal) => {
    // try {
    //   const ptCustomerID = localStorage.getItem('ptCusomterID');
    //   const practiceName = localStorage.getItem('practiceName');

    //   if (!ptCustomerID || !practiceName) {
    //     toast('Missing patient or practice information'
    //     );
    //     return;
    //   }

    // Load user details to get self-pay status
    // const userDetailService = new GetUserDetailServices({
    //   practiceName: practiceName,
    //   patientId: parseInt(ptCustomerID)
    // });

    //     await userDetailService.getUserInfo();
    //     const userInfo = userDetailService.getUserInfoResponse();
    //     setIsSelfPay(userInfo.selfPay);

    //     // Load existing insurance data
    //     const insuranceService = new GetInsuranceServices(ptCustomerID, practiceName);
    //     await insuranceService.getInsuranceData();

    //     if (insuranceService.response_Status_Code_API === 200) {
    //       const insuranceList = insuranceService.insuranceData;
    //       setExistingInsuranceList(insuranceList);

    //       if (insuranceList && insuranceList.length > 0) {
    //         const cards: number[] = [];
    //         const data: Record<number, any> = {};

    //         insuranceList.forEach((insurance, index) => {
    //           if (insurance.insuranceCompanyName && insurance.insuranceCompanyName !== "") {
    //             cards.push(index);
    //             data[index] = {
    //               insuranceName: insurance.insuranceCompanyName,
    //               relationship: insurance.patientRelationshipToInsured,
    //               noInsuranceCard: insurance.noInsuranceCard,
    //               insuredFirstName: insurance.insuredFirstName,
    //               insuredLastName: insurance.insuredLastName,
    //               insuredId: insurance.insuredId,
    //               insuredDob: insurance.insuredDob,
    //               insuredGender: insurance.insuredGender,
    //               base64bitInsCardFront: insurance.base64bitInsCardFront,
    //               base64bitInsCardBack: insurance.base64bitInsCardBack,
    //               // Add other fields as needed
    //             };
    //           } else if (insurance.notes) {
    //             setNotes(insurance.notes);
    //           }
    //         });

    //         if (cards.length > 0) {
    //           setInsuranceCards(cards);
    //           setInsuranceData(data);
    //         } else {
    //           // Add default empty card if no existing insurance
    //           setInsuranceCards([0]);
    //         }
    //       } else {
    //         // Add default empty card if no existing insurance
    //         setInsuranceCards([0]);
    //       }
    //     }
    //   } catch (error) {
    //     console.error('Error loading insurance data:', error);
    //     toast({
    //       title: 'Error',
    //       description: 'Failed to load existing insurance data',
    //       variant: 'destructive',
    //     });
    //     // Add default empty card on error
    //     setInsuranceCards([0]);
    //   } finally {
    //     setIsInitialLoading(false);
    //   }
    // };

    const addInsuranceCard = () => {
      // Validate existing forms before adding new one
      if (insuranceCards.length > 0) {
        const allValid = validateAllInsuranceForms();
        if (!allValid) {
          toast('Please complete all existing insurance forms before adding a new one');
          return;
        }
      }

      const newIndex = insuranceCards.length > 0 ? Math.max(...insuranceCards) + 1 : 0;
      setInsuranceCards([...insuranceCards, newIndex]);
    };

    // const removeInsuranceCard = (index: number) => {
    //   setInsuranceCards(insuranceCards.filter((_, i) => i !== index));
    //   // Remove data for this card
    //   const newData = { ...insuranceData };
    //   delete newData[index];
    //   setInsuranceData(newData);

    //   // Remove ref for this card
    //   const newRefs = { ...insuranceCardRefs };
    //   delete newRefs[index];
    //   // setInsuranceCardRefs(newRefs);
    // };
    const removeInsuranceCard = (index: number) => {
      setInsuranceCards(prev => prev.filter(i => i !== index));
      setInsuranceData(prev => {
        const newData = { ...prev };
        delete newData[index];
        return newData;
      });
      // Remove from refs
      delete insuranceCardRefs.current[index];
    };

    // Memoize the updateInsuranceData function to prevent recreating it on every render
    // const updateInsuranceData = useCallback((index: number, data: any) => {
    // setInsuranceData(prev => ({
    //   ...prev,
    //   [index]: data
    // }));
    // }, []);

    const collectInsuranceData = () => {
      const collectedData: any = {};
      insuranceCards.forEach(index => {
        const cardRef = insuranceCardRefs.current[index];
        if (cardRef && typeof cardRef.getData === 'function') {
          collectedData[index] = cardRef.getData();
        }
      });
      return collectedData;
    };

    // const setInsuranceCardRef = (index: number, ref: any) => {
    //   setInsuranceCardRefs(prev => ({
    //     ...prev,
    //     [index]: ref
    //   }));
    // };

    // In the validateAllInsuranceForms function
    const validateAllInsuranceForms = (): boolean => {
      if (isSelfPay) return true;

      console.log('Insurance cards to validate:', insuranceCards);
      console.log('Available refs:', Object.keys(insuranceCardRefs.current));

      for (const index of insuranceCards) {
        const cardRef = insuranceCardRefs.current[index];
        console.log(`Validating card ${index}, ref exists:`, !!cardRef);

        if (cardRef && typeof cardRef.isValid === 'function') {
          const isValid = cardRef.isValid();
          console.log(`Card ${index} validation result:`, isValid);
          if (!isValid) {
            return false;
          }
        } else {
          // Fallback validation if ref is not available
          console.log(`Using fallback validation for card ${index}`);
          const data = insuranceData[index];
          if (!data || !data.insuranceName || !data.relationship) {
            console.log(`Fallback validation failed for card ${index}`);
            return false;
          }
        }
      }
      return true;
    };

    // const handleWelcomeForm = async () => {
    //   try {
    //     const ptCustomerID = localStorage.getItem('ptCusomterID');
    //     const locationId = localStorage.getItem('locationId');

    //     if (!ptCustomerID) {
    //       toast('No patient ID found');
    //       return;
    //     }

    // const webUrlGet = new WebUrlGet({
    //   formType: 'welcome_form',
    //   patientNumber: ptCustomerID,
    //   locationId: locationId || '',
    //   IsFromOffice: 'false'
    // });

    //     await webUrlGet.getUrl();

    //     if (webUrlGet.response_Status_Code_API === 200) {
    //       if (webUrlGet.formArray.length > 0) {
    //         navigate('/web-forms', {
    //           state: {
    //             forms: webUrlGet.formArray,
    //             formType: 'welcome_form'
    //           }
    //         });
    //       } else {
    //         navigate('/request-confirm');
    //       }
    //     } else {
    //       toast({
    //         title: 'Error',
    //         description: 'Failed to load welcome form',
    //         variant: 'destructive',
    //       });
    //     }
    //   } catch (error) {
    //     console.error('Error loading welcome form:', error);
    //     toast({
    //       title: 'Error',
    //       description: 'An error occurred while loading the welcome form',
    //       variant: 'destructive',
    //     });
    //   }
    // };

    // In handleProceed function, add these logs
    const handleProceed = async () => {
      try {
        setIsLoading(true);
        let allValid = false;
        const insuranceListFinal: any[] = [];

        if (isSelfPay) {
          // Create self-pay insurance object
          insuranceListFinal.push({
            patientNumber: localStorage.getItem('patientId') || '0',
            notes: notes.trim(),
            ptCustomerId: parseInt(localStorage.getItem('ptCusomterID') || '0'),
            selfPay: true,
            isSelfPayObject: true,
          });
          allValid = true;
        } else {
          // Validate all insurance forms
          if (insuranceCards.length > 0) {
            allValid = validateAllInsuranceForms();
            console.log('Form validation result:', allValid);

            if (allValid) {
              // Collect all insurance data
              const data = collectInsuranceData();
              console.log('Collected insurance data:', data);

              // Iterate through insurance cards and add data to insuranceListFinal
              insuranceCards.forEach(index => {
                if (data[index]) {
                  insuranceListFinal.push({
                    ...data[index],
                    patientNumber: localStorage.getItem('patientId') || '0',
                    ptCustomerId: parseInt(localStorage.getItem('ptCusomterID') || '0'),
                    notes: notes.trim(),
                    selfPay: false,
                    isSelfPayObject: false,
                  });
                }
              });
            }
          } else {
            allValid = false;
          }
        }

        if (!allValid) {
          toast('Please complete all required fields');
          setIsLoading(false);
          return;
        }

        // Save insurance data
        console.log('Sending insurance data:', insuranceListFinal);
        // await saveInsuranceData(insuranceListFinal);

      } catch (error) {
        console.error('Error saving insurance:', error);
        toast('An error occurred while saving insurance information');
      } finally {
        setIsLoading(false);
      }
    };

    // const saveInsuranceData = async (insuranceListFinal: any[]) => {
    //   try {
    //     const insuranceJsonArray = JSON.stringify(insuranceListFinal);
    //     const saveInsuranceServices = new SaveInsuranceServices(insuranceJsonArray);
    //     await saveInsuranceServices.updateInsuranceData();
    //     if (saveInsuranceServices.getResponseStatusCode() === 200) {
    //       await handleWelcomeForm();
    //     } else {
    //       toast({
    //         title: 'Error',
    //         description: 'Failed to save insurance information',
    //         variant: 'destructive',
    //       });
    //       setTimeout(() => {
    //       }, 10000);
    //     }
    //   } catch (error) {
    //     console.error('Error saving insurance data:', error);
    //     toast({
    //       title: 'Error',
    //       description: 'Failed to save insurance information',
    //       variant: 'destructive',
    //     });
    //   }
    // };

    if (isInitialLoading) {
      return (
        <div className="h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading insurance data...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-screen flex flex-col bg-white overflow-hidden">
        <div className="bg-blue-500 text-white py-4 flex justify-between items-center relative shadow-md">
          <div className="w-full text-center text-2xl font-normal">Insurance</div>
          {!isSelfPay && (
            <button
              onClick={addInsuranceCard}
              className="absolute right-4 border-2 border-white bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-white transition-colors shadow-md focus:outline-none"
              aria-label="Add Insurance"
            >
              <span className="text-6xl font-light leading-none mb-3">+</span>
            </button>
          )}
        </div>

        <div className="flex-none px-8 py-6 max-w-4xl mx-auto w-full">
          <p className="text-gray-700 mb-5 text-base leading-relaxed">
            Please add all your medical and vision insurance companies so we can check your benefits. Use the plus icon on the top right to add a new insurance record below. Add an image of your insurance card front and back. If no insurance card, mark the "no insurance card" option and manually enter the details for the insured / policy holder.
          </p>

          <div className="flex items-center gap-3 mb-6">
            <div
              className="relative inline-flex items-center cursor-pointer"
              onClick={() => setIsSelfPay(!isSelfPay)}
            >
              <div className={`w-5 h-5 border-2 ${isSelfPay ? 'bg-green-500 border-green-500' : 'bg-white border-gray-600'}`}>
                {isSelfPay && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-lg leading-none">
                    ✓
                  </div>
                )}
              </div>
              <input
                type="checkbox"
                checked={isSelfPay}
                onChange={(e) => setIsSelfPay(e.target.checked)}
                className="absolute opacity-0 w-5 h-5 cursor-pointer"
                id="self-pay"
              />
            </div>
            <label htmlFor="self-pay" className="text-gray-800 text-base cursor-pointer">
              Self Pay / No Insurance Available
            </label>
          </div>

          <Input
            className="w-full p-6 border border-gray-500 rounded-md bg-gray-200 mb-8"
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={100} name={''} />
        </div>

        <div className="flex-1 sm:px-4 md:px-8 overflow-y-auto">
          <div className="sm:max-w-full md:max-w-4xl mx-auto w-full pl-4">
            {!isSelfPay && insuranceCards.map((index) => (
              <InsuranceCard
                key={index}
                index={index}
                onRemove={removeInsuranceCard}
                ref={(ref) => {
                  if (ref) {
                    insuranceCardRefs.current[index] = ref;
                  } else {
                    delete insuranceCardRefs.current[index];
                  }
                }}
                initialData={insuranceData[index]}
              />
            ))}
          </div>
        </div>

        <div className="flex-none p-4 bg-white border-t-2 border-gray-300 shadow-md">
          <Button
            className="w-full max-w-md mx-auto block bg-blue-500 hover:bg-blue-600 text-white py-1 px-6 rounded-md text-lg font-medium"
            onClick={handleProceed}
            isDisabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Proceed'}
          </Button>
        </div>
      </div>
    );
  };
}
