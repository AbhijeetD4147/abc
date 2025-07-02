import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InsuranceCard } from "../../components/ui/InsuranceCard";
import { InsuranceModel } from '../../model/settings/InsuranceModel';
import { Button, Checkbox, Header, Icon, Input, Loader } from '@ketan_nimase/ui';
import { Navbar } from '../../components/ui/Navbar';

export default function Insurance() {
  const navigate = useNavigate();
  const [isSelfPay, setIsSelfPay] = useState(false);
  const [insuranceCards, setInsuranceCards] = useState<number[]>([]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [insuranceData, setInsuranceData] = useState<Record<number, any>>({});
  const [existingInsuranceList, setExistingInsuranceList] = useState<InsuranceModel[]>([]);
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
      // loadInsuranceData(abortControllerRef.current.signal);
      dataLoadedRef.current = true;
    }

    // Cleanup function to abort any in-progress requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // const loadInsuranceData = async (signal?: AbortSignal) => {
  //   try {
  //     const ptCustomerID = localStorage.getItem('ptCusomterID');
  //     const practiceName = localStorage.getItem('practiceName');

  //     if (!ptCustomerID || !practiceName) {
  //       // toast({
  //       //   title: 'Error',
  //       //   description: 'Missing patient or practice information',
  //       //   variant: 'destructive',
  //       // });
  //       console.log("Missing patient or practice information")
  //       return;
  //     }

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
        // toast({
        //   title: 'Validation Error',
        //   description: 'Please complete all existing insurance forms before adding a new one',
        //   variant: 'destructive',
        // });
        console.log("Please complete all existing insurance forms before adding a new one")
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
  //       // toast({
  //       //   title: 'Error',
  //       //   description: 'No patient ID found',
  //       //   variant: 'destructive',
  //       // });
  //       console.log("No patient ID found")
  //       return;
  //     }

  //     // const webUrlGet = new WebUrlGet({
  //     //   formType: 'welcome_form',
  //     //   patientNumber: ptCustomerID,
  //     //   locationId: locationId || '',
  //     //   IsFromOffice: 'false'
  //     // });

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
  // const handleProceed = async () => {
  //   try {
  //     setIsLoading(true);
  //     let allValid = false;
  //     const insuranceListFinal: any[] = [];

  //     if (isSelfPay) {
  //       // Create self-pay insurance object
  //       insuranceListFinal.push({
  //         patientNumber: localStorage.getItem('patientId') || '0',
  //         notes: notes.trim(),
  //         ptCustomerId: parseInt(localStorage.getItem('ptCusomterID') || '0'),
  //         selfPay: true,
  //         isSelfPayObject: true,
  //       });
  //       allValid = true;
  //     } else {
  //       // Validate all insurance forms
  //       if (insuranceCards.length > 0) {
  //         allValid = validateAllInsuranceForms();
  //         console.log('Form validation result:', allValid);

  //         if (allValid) {
  //           // Collect all insurance data
  //           const data = collectInsuranceData();
  //           console.log('Collected insurance data:', data);

  //           // Iterate through insurance cards and add data to insuranceListFinal
  //           insuranceCards.forEach(index => {
  //             if (data[index]) {
  //               insuranceListFinal.push({
  //                 ...data[index],
  //                 patientNumber: localStorage.getItem('patientId') || '0',
  //                 ptCustomerId: parseInt(localStorage.getItem('ptCusomterID') || '0'),
  //                 notes: notes.trim(),
  //                 selfPay: false,
  //                 isSelfPayObject: false,
  //               });
  //             }
  //           });
  //         }
  //       } else {
  //         allValid = false;
  //       }
  //     }

  //     if (!allValid) {
  //       toast({
  //         title: 'Validation Error',
  //         description: 'Please complete all required fields',
  //         variant: 'destructive',
  //       });
  //       setIsLoading(false);
  //       return;
  //     }

  //     // Save insurance data
  //     console.log('Sending insurance data:', insuranceListFinal);
  //     await saveInsuranceData(insuranceListFinal);

  //   } catch (error) {
  //     console.error('Error saving insurance:', error);
  //     toast({
  //       title: 'Error',
  //       description: 'An error occurred while saving insurance information',
  //       variant: 'destructive',
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader loaderType="spin" />
      </div>
    );
  }

  function handleProceed(): void {
    console.log('Insurance data:', {
      isSelfPay,
      notes,
      insuranceCards,
    });
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden w-screen">
      {/* Navbar */}
      <Navbar />
      <div className=" flex justify-content-center text-center py-2 border-b-2 border-gray-400 m-0">
        <Header
          className="text-lg md:text-xl font-medium text-center"
          colorVariant="dark"
          headerText="Insurance"
          size="h2"
        />
        {/* Info Icon */}
        <div className="flex justify-content-center text-center ml-5 py-2 inline-block">
          <Icon
            colorVariant="primary"
            height="24px"
            width="24px"
            isCursorPointer
            isbadge
            name="plus_circle"
            stroke
            onClick={addInsuranceCard}
            tooltip
            tooltipTitle="Please add all your medical and vision insurance companies so we can check your benefits. 
            Use the plus icon on the top right to add new insurance record below. Add an image of your insurance card front and back. 
            If no insurance card, mark the 'no insurance card' option and manually enter the details for the insured / policyholder."
            tooltipPlacement="bottom"
          />
        </div>
      </div>

      <div className="flex-none px-8 py-6 max-w-4xl mx-auto w-full">

        <div className="flex items-center gap-3 mb-0">
          <div
            className="relative inline-flex items-center cursor-pointer m-0"
            onClick={() => setIsSelfPay(!isSelfPay)}
          >
            <Checkbox
              checked
              labelText="Self Pay / No Insurance Available"
              showText
              onChange={(e) => setIsSelfPay(e.target.checked)}
              classes='text-lg font-medium mb-0 pb-0 pt-7 text-gray-600'
            />
          </div>
        </div>

        <Input
          label
          className="w-full border border-gray-500 rounded-md bg-gray-200 mb-1 mt-0"
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

      <div className="flex justify-center items-center p-4 bg-white border-t-2 border-gray-400 mx-10">
        <Button
          colorVariant="primary"
          className="text-xl w-1/4 bg-blue-500 md:w-1/6 px-4 py-2 border rounded"
          onClick={handleProceed}
          isDisabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}