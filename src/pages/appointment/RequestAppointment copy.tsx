
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../../context/AppointmentContext';
import { GetLocationDataForApptService } from '../../services/GetLocationDataForApptService';
import { AppointmentPracticePersonService } from '../../services/AppointmentPracticePersonService';
import { AppointmentReasonService } from '../../services/AppointmentReasonService';
import { ApiPaths } from '../../utils/constantApiPaths';
import type { NewCompanyDataResponse, Locations } from '../../models/NewCompanyDataResponse';
import { AppointmentReasonModel } from '../../models/AppointmentReasonModel';
import { AppointmentPracticePersonModel } from '../../models/AppointmentPracticePersonModel';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { LoadingBar } from '../../components/appointment/LoadingBar';

const RequestAppointment: React.FC = () => {

  const triggerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState<number>();

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { setSelectedLocation, setSelectedProvider, setSelectedReason } = useAppointment();

  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');

  const [companyData, setCompanyData] = useState<NewCompanyDataResponse | null>(null);
  const [customerNote, setCustomerNote] = useState('');
  const [isCustomerHours, setIsCustomerHours] = useState(false);

  const [reasonList, setReasonList] = useState<AppointmentReasonModel[]>([]);
  const [selectedReason, setSelectedReasonState] = useState<AppointmentReasonModel | null>(null);

  const [locationList, setLocationList] = useState<Locations[]>([]);
  const [selectedLocation, setSelectedLocationState] = useState<Locations | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const [reasonForVisit, setReasonForVisit] = useState('');

  const [practicePersonList, setPracticePersonList] = useState<AppointmentPracticePersonModel[]>([]);
  const [selectedPracticePerson, setSelectedPracticePerson] = useState<AppointmentPracticePersonModel | null>(null);

  // Filtered unique location list for rendering
  const filteredLocationList = React.useMemo(() => {
    const uniqueIds = new Set<number>();
    const filtered = locationList.filter(loc => {
      if (loc.maximeyesLocationId === undefined || loc.maximeyesLocationId === null) return false;
      if (uniqueIds.has(loc.maximeyesLocationId)) return false;
      uniqueIds.add(loc.maximeyesLocationId);
      return true;
    });
    if (filtered.length !== locationList.length) {
      console.warn('Duplicate or invalid maximeyesLocationId found in locationList');
    }
    return filtered;
  }, [locationList]);

  // Filtered unique practice person list for rendering
  const filteredPracticePersonList = React.useMemo(() => {
    const uniqueIds = new Set<number>();
    const filtered = practicePersonList.filter(person => {
      if (person.practicePersonId === undefined || person.practicePersonId === null) return false;
      if (uniqueIds.has(person.practicePersonId)) return false;
      uniqueIds.add(person.practicePersonId);
      return true;
    });
    if (filtered.length !== practicePersonList.length) {
      console.warn('Duplicate or invalid practicePersonId found in practicePersonList');
    }
    return filtered;
  }, [practicePersonList]);

  // Filtered unique reason list for rendering
  const filteredReasonList = React.useMemo(() => {
    // Check if all reasonIds are the same (0 in this case)
    const uniqueReasonIds = new Set(reasonList.map(reason => reason.reasonID));

    if (uniqueReasonIds.size === 1 && uniqueReasonIds.has(0)) {
      // All reasons have reasonId 0, so filter by reasonName instead
      // console.log('All reasons have reasonId 0, filtering by reasonName');
      const uniqueNames = new Set<string>();
      const filtered = reasonList.filter(reason => {
        if (!reason.reasonName || reason.reasonName.trim() === '') return false;
        if (uniqueNames.has(reason.reasonName)) return false;
        uniqueNames.add(reason.reasonName);
        return true;
      });
      return filtered;
    } else {
      // Original filtering logic for when reasonIds are unique
      const uniqueIds = new Set<number>();
      const filtered = reasonList.filter(reason => {
        if (reason.reasonID === undefined || reason.reasonID === null) return false;
        if (uniqueIds.has(reason.reasonID)) return false;
        uniqueIds.add(reason.reasonID);
        return true;
      });
      return filtered;
    }
  }, [reasonList]);

  useEffect(() => {
    if (triggerRef.current) {
      const rect = (triggerRef.current as HTMLElement).getBoundingClientRect();
      setContentWidth(rect.width);
    }
  }, []);


  useEffect(() => {
    initializeData();
  }, []);

  const renderSelectItems = <T,>(
    list: T[],
    keyPrefix: string,
    getValue: (item: T) => string,
    getLabel: (item: T) => string
  ) => {
    return list.map((item, index) => {
      const value = getValue(item);
      const key = `${keyPrefix}-${value || index}`;
      return (
        <SelectItem 
          key={key} 
          value={value}
          className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors duration-200"
        >
          {getLabel(item)}
        </SelectItem>
      );
    });
  };


  const initializeData = async () => {
    try {
      await Promise.all([
        getLocationData(),
        getReasonData()
      ]);
    } catch (error) {
      setError('Failed to initialize data');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const getLocationData = async () => {
    try {
      const locationService = new GetLocationDataForApptService();
      await locationService.getLocationApptService(ApiPaths.basePractice);

      if (locationService.getResponseStatusCode() === 200) {
        const data = locationService.getCompanyData();
        setCompanyData(data);
        setCustomerNote(data.customerNote);
        setIsCustomerHours(data.isCustomerhours);
        setLocationList(data.locations);

        const locationId = localStorage.getItem('locationId');
        if (locationId) {
          const location = data.locations.find(loc =>
            loc.maximeyesLocationId.toString() === locationId
          );
          if (location) {
            setSelectedLocationState(location);
            setPhoneNumber(location.address.phone);
            await getPracticePersonData(location.maximeyesLocationId);
          }
        }
      } else {
        throw new Error('Failed to fetch location data');
      }
    } catch (error) {
      setError('Error fetching location data');
      setShowAlert(true);
    }
  };

  const getPracticePersonData = async (locationId: number) => {
    try {
      setPracticePersonList([]);
      setSelectedPracticePerson(null);

      const practicePersonService = new AppointmentPracticePersonService();
      await practicePersonService.getPracticePersonForAppointment(ApiPaths.basePractice, locationId);

      if (practicePersonService.getResponseStatusCode() === 200) {
        const personData = practicePersonService.getPersonData();
        const mappedPersonData = personData.map(person => AppointmentPracticePersonModel.fromJson(person));
        setPracticePersonList(mappedPersonData);

        if (mappedPersonData.length > 0) {
          const practicePersonId = localStorage.getItem('PracticePersonID');
          const apptId = localStorage.getItem('apptId');

          if (apptId && apptId !== '0' && practicePersonId) {
            const person = mappedPersonData.find(p => p.practicePersonId.toString() === practicePersonId);
            if (person) {
              // setSelectedPracticePerson(person);
              // setSelectedProvider({
              //   id: person.practicePersonId,
              //   name: `${person.firstName} ${person.lastName}`,
              //   location_id: selectedLocation?.maximeyesLocationId || 0,
              //   // specialization: ''
              // });
            }
          } else {
            if (ApiPaths.maximEyesNumber >= '0.27.4.0') {
              const defaultPerson = mappedPersonData.find(p => p.isDefault);
              
            }
          }
        }
      } else {
        throw new Error('Failed to fetch practice person data');
      }
    } catch (error) {
      setError('Error fetching practice person data');
      setShowAlert(true);
    }
  };

  const getReasonData = async () => {
    try {
      const reasonService = new AppointmentReasonService();
      await reasonService.getReasonForAppointment(ApiPaths.basePractice);

      if (reasonService.getResponseStatusCode() === 200) {
        const reasonData = reasonService.getReasonData();
        // console.log('Raw reason data from service:', reasonData);
        const mappedReasonData = reasonData.map(reason => AppointmentReasonModel.fromJson(reason));
        // console.log('Mapped reason data:', mappedReasonData);
        setReasonList(mappedReasonData);

        const apptId = localStorage.getItem('apptId');
        if (apptId && apptId !== '0') {
          const reasonId = localStorage.getItem('reasonId');
          const reason = mappedReasonData.find(r => r.reasonID.toString() === reasonId);
          if (reason) {
            setSelectedReasonState(reason);
            setReasonForVisit(reason.reasonName);
          }
        }
      } else {
        throw new Error('Failed to fetch reason data');
      }
    } catch (error) {
      setError('Error fetching reason data');
      setShowAlert(true);
    }
  };

  const handleLocationChange = async (value: string) => {
    const location = locationList.find(loc => loc.maximeyesLocationId.toString() === value);
    if (location) {
      setSelectedLocationState(location);
      setPhoneNumber(location.address.phone);
      setSelectedReasonState(null);
      setReasonForVisit('');
      await getPracticePersonData(location.maximeyesLocationId);
    }
    setSelectedPracticePerson(null);
  };

  const handlePracticePersonChange = (value: string) => {
    const person = practicePersonList.find(p => p.practicePersonId.toString() === value);
    if (person) {
      setSelectedPracticePerson(person);
      setSelectedProvider({
        id: person.practicePersonId,
        name: `${person.firstName} ${person.lastName}`,
        location_id: selectedLocation?.maximeyesLocationId || 0,
      });
      localStorage.setItem('ResourceId', person.practicePersonId.toString());
      // console.log('ResourceId set to:', person.practicePersonId);
    }
  };

  const handleReasonChange = (value: string) => {
    const reason = reasonList.find(r => r.reasonID.toString() === value);
    if (reason) {
      setSelectedReasonState(reason);
      setReasonForVisit(reason.reasonName);
      setSelectedReason({
        id: reason.reasonID,
        name: reason.reasonName,
      });
      localStorage.setItem('reasonID', reason.reasonID.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLocation && selectedPracticePerson && selectedReason) {
      localStorage.setItem('locationId', selectedLocation.maximeyesLocationId.toString());
      localStorage.setItem('PracticePersonID', selectedPracticePerson.practicePersonId.toString());
      localStorage.setItem('reasonID', selectedReason.reasonID.toString());
      localStorage.setItem('reasonForVisit', reasonForVisit);

      navigate('/select-time');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {loading && <LoadingBar />}

      {showAlert && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => setShowAlert(false)}
            className="absolute top-0 right-0 px-4 py-3"
          >
            <span className="sr-only">Close</span>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a 1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a 1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      )}

      <div className="w-full bg-blue-500 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Request Appointment</h1>
      </div>

      <div className="w-full max-w-4xl mx-auto p-4 bg-gray-50 my-4 text-sm text-gray-700">
        {isCustomerHours && customerNote ? (
          <p>{customerNote}</p>
        ) : (
          <p>
            <strong>Note:</strong> If this is a medical emergency, please dial 911 immediately or go to the nearest emergency room.
            If experiencing flashes, floaters, or sudden loss of vision please call the office immediately at {phoneNumber}
          </p>
        )}
      </div>

      <div className="flex-grow flex flex-col items-center p-4">
        <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>

              <Select
                value={selectedLocation?.maximeyesLocationId?.toString() ?? ''}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a location">
                    {selectedLocation?.name ?? ''}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent
                  sideOffset={4}
                  style={{ width: contentWidth ? `${contentWidth}px` : 'auto' }}
                  className="fixed z-[999] bg-white shadow-lg rounded-md border border-gray-200"
                >
                  {renderSelectItems(
                    filteredLocationList,
                    'location',
                    loc => loc.maximeyesLocationId?.toString() ?? '',
                    loc => loc.name
                  )}
                </SelectContent>
              </Select>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Provider</label>

              <Select
                value={selectedPracticePerson?.practicePersonId?.toString() ?? ''}
                onValueChange={(value) => {
                  handlePracticePersonChange(value);
                }}
              >
                <SelectTrigger ref={triggerRef} className="w-full">
                  <SelectValue placeholder="Select a provider">
                    {selectedPracticePerson
                      ? `${selectedPracticePerson.firstName} ${selectedPracticePerson.lastName}`
                      : ''}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent sideOffset={4}
                  style={{ width: contentWidth ? `${contentWidth}px` : 'auto' }}
                  className="fixed z-[999] bg-white shadow-lg rounded-md border border-gray-200"
                >
                  {practicePersonList.map((person, index) => {
                    const value = person.practicePersonId?.toString() ?? `index-${index}`;
                    const key = `person-${value}`;
                    return (
                      <SelectItem 
                        key={key} 
                        value={value}
                        className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors duration-200"
                      >
                        {`${person.firstName} ${person.lastName}`}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <Select
                value={selectedReason?.reasonID?.toString() ?? ''}
                onValueChange={handleReasonChange}
              >
                <SelectTrigger ref={triggerRef} className="w-full">
                  <SelectValue placeholder="Select a reason">
                    {selectedReason?.reasonName ?? ''}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent sideOffset={4}
                  style={{ width: contentWidth ? `${contentWidth}px` : 'auto' }}
                  className="fixed z-[999] bg-white shadow-lg rounded-md border border-gray-200"
                >
                  {filteredReasonList.map((reason) => (
                    <SelectItem
                      key={reason.reasonID}
                      value={reason.reasonID?.toString() ?? ''}
                      className="hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors duration-200"
                    >
                      {reason.reasonName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!selectedLocation || !selectedPracticePerson || !selectedReason}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Proceed
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestAppointment;