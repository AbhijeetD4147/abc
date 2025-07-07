
import { Navbar } from '../../components/ui/Navbar';
import { Loader } from '@ketan_nimase/ui';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppointmentService } from '../../services/appointment/AppointmentService';
import { AppointmentPracticePersonModel, AppointmentReasonModel, LocationModel, Location } from '@/model/appointment/AppointmentModel';

interface LocationResponse {
  businessName: string;
  locations: LocationModel[];
  customerNote: string;
  intakePageLandingText: string;
  isCustomerHours: boolean;
}

const RequestAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [customerNote, setCustomerNote] = useState<string>('');
  const [isCustomerHours, setIsCustomerHours] = useState<boolean>(false);

  // State for data
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [reasons, setReasons] = useState<AppointmentReasonModel[]>([]);
  const [practitioners, setPractitioners] = useState<AppointmentPracticePersonModel[]>([]);

  // State for selections
  // Change this line
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  // Instead of
  // const [selectedLocation, setSelectedLocation] = useState<LocationModel | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<AppointmentPracticePersonModel | null>(null);
  const [selectedReason, setSelectedReason] = useState<AppointmentReasonModel | null>(null);

  const appointmentService = new AppointmentService();

  // Fetch location data
  const getLocationData = async () => {
    try {
      const response = await appointmentService.getAppointmentLocation();
      if (response?.data) {
        const locationData = response as LocationResponse;
        // setLocations(locationData.locations.filter(loc => loc.name));
        setCustomerNote(locationData.customerNote);
        setIsCustomerHours(locationData.isCustomerHours);
      } else {
        throw new Error('Failed to fetch locations');
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      // Show error toast
    } finally {
      setLoading(false);
    }
  };

  // Fetch practitioners for selected location
  // const getPracticePersonData = async (locationId: number) => {
  //   try {
  //     const response = await appointmentService.getPracticePerson(locationId);
  //     if (response.status === 200) {
  //       const sortedPractitioners = response.data.sort((a, b) =>
  //         a.firstName.localeCompare(b.firstName)
  //       );
  //       setPractitioners(sortedPractitioners);
  //     } else {
  //       throw new Error('Failed to fetch practitioners');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching practitioners:', error);
  //     // Show error toast
  //   }
  // };

  // Fetch appointment reasons
  const getReasonData = async () => {
    try {
      const response = await appointmentService.getAppointmentReason();
      if (response.status === 200) {
        const sortedReasons = response.data.sort((a, b) =>
          a.reason.localeCompare(b.reason)
        );
        setReasons(sortedReasons);
      } else {
        throw new Error('Failed to fetch reasons');
      }
    } catch (error) {
      console.error('Error fetching reasons:', error);
      // Show error toast
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    getLocationData();
    getReasonData();
  }, []);

  // Update practitioners when location changes
  useEffect(() => {
    if (selectedLocation?.maximeyesLocationId) {
      // getPracticePersonData(selectedLocation.maximeyesLocationId);
    } else {
      setPractitioners([]);
    }
  }, [selectedLocation]);

  // Handle location change
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const location = locations.find(loc => loc.maximeyesLocationId === Number(e.target.value));
    // setSelectedLocation(location || null);
    setSelectedProvider(null); // Reset provider when location changes
  };

  const isFormValid = selectedLocation && selectedProvider && selectedReason;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <Loader loaderType="spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 relative flex flex-col">
      <Navbar />

      <div className="w-full bg-white pt-3 text-gray-600 text-center border-b border-black">
        <h1 className="text-4xl">Request Appointment</h1>
      </div>

      <div className="mx-auto p-4 bg-gray-50 my-0 text-md text-gray-700 text-center w-screen">
        {isCustomerHours && customerNote ? (
          <p>{customerNote}</p>
        ) : (
          <p>
            <strong>Note:</strong> {customerNote}
          </p>
        )}
      </div>

      <div className="flex-grow flex flex-col items-center p-4">
        <div className="w-full max-w-4xl mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Location Dropdown */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-500 mb-2">
                Select Location
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-200 border-1 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
                value={selectedLocation?.maximeyesLocationId || ''}
                onChange={handleLocationChange}
              >
                <option value="">Select Location</option>
                {/* {locations.map(location => (
                  <option
                    key={location.maximeyesLocationId}
                    value={location.maximeyesLocationId}
                  >
                    {location.name} - {location.address?.city ? `${location.address.city}, ${location.address.state}` : ''}
                  </option>
                ))} */}
              </select>
            </div>

            {/* Provider Dropdown */}
            <div className="flex flex-col">
              <label className="text-lg font-medium text-gray-500 mb-2">
                Select Provider
              </label>
              <select
                className="w-full px-4 py-2 bg-gray-200 border-1 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
                // value={selectedProvider?.practicePersonId || ''}
                onChange={(e) => {
                  // const provider = practitioners.find(p => p.practicePersonId === Number(e.target.value));
                  // setSelectedProvider(provider || null);
                }}
                disabled={!selectedLocation}
              >
                <option value="">Select Provider</option>
                {/* {practitioners.map(provider => (
                  <option
                    key={provider.practicePersonId}
                    value={provider.practicePersonId}
                  >
                    {`${provider.firstName} ${provider.lastName}`}
                  </option>
                ))} */}
              </select>
            </div>
          </div>
        </div>

        {/* Reason Dropdown */}
        <div className="w-full max-w-4xl mb-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-500 mb-2">
              Select Reason
            </label>
            <select
              className="w-full px-4 py-2 bg-gray-200 border-1 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
              // value={selectedReason?.reasonId || ''}
              onChange={(e) => {
                // const reason = reasons.find(r => r.reasonId === Number(e.target.value));
                // setSelectedReason(reason || null);
              }}
            >
              <option value="">Select Reason</option>
              {reasons.map(reason => (
                <option
                  // key={reason.reasonId}
                  // value={reason.reasonId}
                >
                  {/* {reason.reason} */}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestAppointment;