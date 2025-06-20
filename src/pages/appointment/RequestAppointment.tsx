
import { Navbar } from '../../components/ui/Navbar';
import { Loader } from '@ketan_nimase/ui';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAppointment } from '../../context/AppointmentContext';
// import { GetLocationDataForApptService } from '../../services/GetLocationDataForApptService';
// import { AppointmentPracticePersonService } from '../../services/AppointmentPracticePersonService';
// import { AppointmentReasonService } from '../../services/AppointmentReasonService';
// import { ApiPaths } from '../../utils/constantApiPaths';
// import type { NewCompanyDataResponse, Locations } from '../../models/NewCompanyDataResponse';
// import { AppointmentReasonModel } from '../../models/AppointmentReasonModel';
// import { AppointmentPracticePersonModel } from '../../models/AppointmentPracticePersonModel';

const RequestAppointment: React.FC = () => {

  // const triggerRef = useRef(null);
  // const [contentWidth, setContentWidth] = useState<number>();

  const navigate = useNavigate();
  // const formRef = useRef<HTMLFormElement>(null);
  // // const { setSelectedLocation, setSelectedProvider, setSelectedReason } = useAppointment();

  // const [loading, setLoading] = useState(true);
  // const [showAlert, setShowAlert] = useState(false);
  // const [error, setError] = useState('');

  // // const [companyData, setCompanyData] = useState<NewCompanyDataResponse | null>(null);
  // const [customerNote, setCustomerNote] = useState('');
  // const [isCustomerHours, setIsCustomerHours] = useState(false);

  // // const [reasonList, setReasonList] = useState<AppointmentReasonModel[]>([]);
  // // const [selectedReason, setSelectedReasonState] = useState<AppointmentReasonModel | null>(null);

  // // const [locationList, setLocationList] = useState<Locations[]>([]);
  // // const [selectedLocation, setSelectedLocationState] = useState<Locations | null>(null);
  // const [phoneNumber, setPhoneNumber] = useState('');

  // const [reasonForVisit, setReasonForVisit] = useState('');

  // const [practicePersonList, setPracticePersonList] = useState<AppointmentPracticePersonModel[]>([]);
  // const [selectedPracticePerson, setSelectedPracticePerson] = useState<AppointmentPracticePersonModel | null>(null);

  // Filtered unique location list for rendering
  // const filteredLocationList = React.useMemo(() => {
  //   const uniqueIds = new Set<number>();
  //   const filtered = locationList.filter(loc => {
  //     if (loc.maximeyesLocationId === undefined || loc.maximeyesLocationId === null) return false;
  //     if (uniqueIds.has(loc.maximeyesLocationId)) return false;
  //     uniqueIds.add(loc.maximeyesLocationId);
  //     return true;
  //   });
  //   if (filtered.length !== locationList.length) {
  //     console.warn('Duplicate or invalid maximeyesLocationId found in locationList');
  //   }
  //   return filtered;
  // }, [locationList]);

  // Filtered unique practice person list for rendering
  // const filteredPracticePersonList = React.useMemo(() => {
  //   const uniqueIds = new Set<number>();
  //   const filtered = practicePersonList.filter(person => {
  //     if (person.practicePersonId === undefined || person.practicePersonId === null) return false;
  //     if (uniqueIds.has(person.practicePersonId)) return false;
  //     uniqueIds.add(person.practicePersonId);
  //     return true;
  //   });
  //   if (filtered.length !== practicePersonList.length) {
  //     console.warn('Duplicate or invalid practicePersonId found in practicePersonList');
  //   }
  //   return filtered;
  // }, [practicePersonList]);

  // Filtered unique reason list for rendering
  // const filteredReasonList = React.useMemo(() => {
  //   // Check if all reasonIds are the same (0 in this case)
  //   const uniqueReasonIds = new Set(reasonList.map(reason => reason.reasonID));

  //   if (uniqueReasonIds.size === 1 && uniqueReasonIds.has(0)) {
  //     // All reasons have reasonId 0, so filter by reasonName instead
  //     // console.log('All reasons have reasonId 0, filtering by reasonName');
  //     const uniqueNames = new Set<string>();
  //     const filtered = reasonList.filter(reason => {
  //       if (!reason.reasonName || reason.reasonName.trim() === '') return false;
  //       if (uniqueNames.has(reason.reasonName)) return false;
  //       uniqueNames.add(reason.reasonName);
  //       return true;
  //     });
  //     return filtered;
  //   } else {
  //     // Original filtering logic for when reasonIds are unique
  //     const uniqueIds = new Set<number>();
  //     const filtered = reasonList.filter(reason => {
  //       if (reason.reasonID === undefined || reason.reasonID === null) return false;
  //       if (uniqueIds.has(reason.reasonID)) return false;
  //       uniqueIds.add(reason.reasonID);
  //       return true;
  //     });
  //     return filtered;
  //   }
  // }, [reasonList]);

  // useEffect(() => {
  //   if (triggerRef.current) {
  //     const rect = (triggerRef.current as HTMLElement).getBoundingClientRect();
  //     setContentWidth(rect.width);
  //   }
  // }, []);


  // useEffect(() => {
  //   initializeData();
  // }, []);

  // const renderSelectItems = <T,>(
  //   list: T[],
  //   keyPrefix: string,
  //   getValue: (item: T) => string,
  //   getLabel: (item: T) => string
  // ) => {
  //   return list.map((item, index) => {
  //     const value = getValue(item);
  //     const key = `${keyPrefix}-${value || index}`;
  // return (
  //   <SelectItem 
  //     key={key} 
  //     value={value}
  //     className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors duration-200"
  //   >
  //     {getLabel(item)}
  //   </SelectItem>
  // );
  //   });
  // };


  // const initializeData = async () => {
  //   try {
  //     await Promise.all([
  //       getLocationData(),
  //       getReasonData()
  //     ]);
  //   } catch (error) {
  //     setError('Failed to initialize data');
  //     setShowAlert(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const getLocationData = async () => {
  //   try {
  //     const locationService = new GetLocationDataForApptService();
  //     await locationService.getLocationApptService(ApiPaths.basePractice);

  //     if (locationService.getResponseStatusCode() === 200) {
  //       const data = locationService.getCompanyData();
  //       setCompanyData(data);
  //       setCustomerNote(data.customerNote);
  //       setIsCustomerHours(data.isCustomerhours);
  //       setLocationList(data.locations);

  //       const locationId = localStorage.getItem('locationId');
  //       if (locationId) {
  //         const location = data.locations.find(loc =>
  //           loc.maximeyesLocationId.toString() === locationId
  //         );
  //         if (location) {
  //           setSelectedLocationState(location);
  //           setPhoneNumber(location.address.phone);
  //           await getPracticePersonData(location.maximeyesLocationId);
  //         }
  //       }
  //     } else {
  //       throw new Error('Failed to fetch location data');
  //     }
  //   } catch (error) {
  //     setError('Error fetching location data');
  //     setShowAlert(true);
  //   }
  // };

  // const getPracticePersonData = async (locationId: number) => {
  //   try {
  //     setPracticePersonList([]);
  //     setSelectedPracticePerson(null);

  //     const practicePersonService = new AppointmentPracticePersonService();
  //     await practicePersonService.getPracticePersonForAppointment(ApiPaths.basePractice, locationId);

  //     if (practicePersonService.getResponseStatusCode() === 200) {
  //       const personData = practicePersonService.getPersonData();
  //       const mappedPersonData = personData.map(person => AppointmentPracticePersonModel.fromJson(person));
  //       setPracticePersonList(mappedPersonData);

  //       if (mappedPersonData.length > 0) {
  //         const practicePersonId = localStorage.getItem('PracticePersonID');
  //         const apptId = localStorage.getItem('apptId');

  //         if (apptId && apptId !== '0' && practicePersonId) {
  //           const person = mappedPersonData.find(p => p.practicePersonId.toString() === practicePersonId);
  //           if (person) {
  //             // setSelectedPracticePerson(person);
  //             // setSelectedProvider({
  //             //   id: person.practicePersonId,
  //             //   name: `${person.firstName} ${person.lastName}`,
  //             //   location_id: selectedLocation?.maximeyesLocationId || 0,
  //             //   // specialization: ''
  //             // });
  //           }
  //         } else {
  //           if (ApiPaths.maximEyesNumber >= '0.27.4.0') {
  //             const defaultPerson = mappedPersonData.find(p => p.isDefault);

  //           }
  //         }
  //       }
  //     } else {
  //       throw new Error('Failed to fetch practice person data');
  //     }
  //   } catch (error) {
  //     setError('Error fetching practice person data');
  //     setShowAlert(true);
  //   }
  // };

  // const getReasonData = async () => {
  //   try {
  //     const reasonService = new AppointmentReasonService();
  //     await reasonService.getReasonForAppointment(ApiPaths.basePractice);

  //     if (reasonService.getResponseStatusCode() === 200) {
  //       const reasonData = reasonService.getReasonData();
  //       // console.log('Raw reason data from service:', reasonData);
  //       const mappedReasonData = reasonData.map(reason => AppointmentReasonModel.fromJson(reason));
  //       // console.log('Mapped reason data:', mappedReasonData);
  //       setReasonList(mappedReasonData);

  //       const apptId = localStorage.getItem('apptId');
  //       if (apptId && apptId !== '0') {
  //         const reasonId = localStorage.getItem('reasonId');
  //         const reason = mappedReasonData.find(r => r.reasonID.toString() === reasonId);
  //         if (reason) {
  //           setSelectedReasonState(reason);
  //           setReasonForVisit(reason.reasonName);
  //         }
  //       }
  //     } else {
  //       throw new Error('Failed to fetch reason data');
  //     }
  //   } catch (error) {
  //     setError('Error fetching reason data');
  //     setShowAlert(true);
  //   }
  // };

  // const handleLocationChange = async (value: string) => {
  //   const location = locationList.find(loc => loc.maximeyesLocationId.toString() === value);
  //   if (location) {
  //     setSelectedLocationState(location);
  //     setPhoneNumber(location.address.phone);
  //     setSelectedReasonState(null);
  //     setReasonForVisit('');
  //     await getPracticePersonData(location.maximeyesLocationId);
  //   }
  //   setSelectedPracticePerson(null);
  // };

  // const handlePracticePersonChange = (value: string) => {
  //   const person = practicePersonList.find(p => p.practicePersonId.toString() === value);
  //   if (person) {
  //     setSelectedPracticePerson(person);
  //     setSelectedProvider({
  //       id: person.practicePersonId,
  //       name: `${person.firstName} ${person.lastName}`,
  //       location_id: selectedLocation?.maximeyesLocationId || 0,
  //     });
  //     localStorage.setItem('ResourceId', person.practicePersonId.toString());
  //     // console.log('ResourceId set to:', person.practicePersonId);
  //   }
  // };

  // const handleReasonChange = (value: string) => {
  //   const reason = reasonList.find(r => r.reasonID.toString() === value);
  //   if (reason) {
  //     setSelectedReasonState(reason);
  //     setReasonForVisit(reason.reasonName);
  //     setSelectedReason({
  //       id: reason.reasonID,
  //       name: reason.reasonName,
  //     });
  //     localStorage.setItem('reasonID', reason.reasonID.toString());
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (selectedLocation && selectedPracticePerson && selectedReason) {
  //     localStorage.setItem('locationId', selectedLocation.maximeyesLocationId.toString());
  //     localStorage.setItem('PracticePersonID', selectedPracticePerson.practicePersonId.toString());
  //     localStorage.setItem('reasonID', selectedReason.reasonID.toString());
  //     localStorage.setItem('reasonForVisit', reasonForVisit);

  //     navigate('/select-time');
  //   }
  // };
  // Add these state declarations after the existing commented states
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  // Check if all dropdowns are selected
  const isFormValid = selectedLocation && selectedProvider && selectedReason;

  const [loading, setLoading] = useState<boolean>(false);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader loaderType="spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 relative flex flex-col">
      <Navbar patientName={{ firstName: "John", lastName: "Doe" }} />

      <div className="w-full bg-white pt-3 text-gray-600 text-center border-b border-black">
        <h1 className="text-4xl">Request Appointment</h1>
      </div>

      <div className=" mx-auto p-4 bg-gray-50 my-0 text-md text-gray-700 text-center w-screen">
        {/* {isCustomerHours && customerNote ? (
          <p>{customerNote}</p> */}
        {/* ) : ( */}
        <p>
          <strong>Note:</strong> If this is a medical emergency, please dial 911 immediately or go to the nearest emergency room.
          If experiencing flashes, floaters, or sudden loss of vision please call the office immediately at
        </p>
        {/* )} */}
      </div>

      <div className="flex-grow flex flex-col items-center p-4">
        {/* Location and Provider Row */}
        <div className="w-full max-w-4xl mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Location Dropdown */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-500 mb-2">
                Select Location
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-200 border-1 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="" disabled>Select Location</option>
                <option value="location1">Downtown Medical Center</option>
                <option value="location2">Westside Clinic</option>
                <option value="location3">Northside Branch</option>
                <option value="location4">Eastside Medical Plaza</option>
              </select>
            </div>

            {/* Provider Dropdown */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-500 mb-2">
                Select Provider
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-200 border-1 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                <option value="" disabled>Select Provider</option>
                <option value="provider1">Dr. John Smith</option>
                <option value="provider2">Dr. Sarah Johnson</option>
                <option value="provider3">Dr. Michael Brown</option>
                <option value="provider4">Dr. Emily Davis</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reason Dropdown - Full Width */}
        <div className="w-full max-w-4xl mb-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-500 mb-2">
              Select Reason
            </label>
            <select
              className="w-full px-4 py-2 bg-gray-200 border-1 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              <option value="" disabled>Select Reason for Visit</option>
              <option value="routine">Routine Check-up</option>
              <option value="consultation">Consultation</option>
              <option value="followup">Follow-up Appointment</option>
              <option value="emergency">Emergency Visit</option>
              <option value="screening">Health Screening</option>
              <option value="vaccination">Vaccination</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>



        {/* Proceed Button - Fixed at bottom */}
        <div className="w-full pt-4 pb-8 mt-28 border-t border-gray-400 bg-gray-50">
          <div className="flex justify-center">
            <button
              className={`font-medium py-1 px-14 rounded-md transition-colors duration-200 ${
                isFormValid
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
              onClick={() => navigate('/select-time')}
            >
              Proceed
            </button>
          </div>
        </div>

        {/* Version text at bottom left */}
        <div className="absolute bottom-2 left-3">
          <span className="text-sm text-gray-700">version 1.0</span>
        </div>
      </div>
    </div>
  );
};

export default RequestAppointment;