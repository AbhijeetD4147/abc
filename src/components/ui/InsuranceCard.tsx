import { Checkbox, DropdownList, Input } from '@ketan_nimase/ui';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import { GetUserDetailServices } from '@/services/GetUserDetailService';

interface InsuranceCardProps {
  index: number;
  onRemove: (index: number) => void;
  onDataChange?: (data: any) => void;
  initialData?: any;
}

export interface InsuranceCardRef {
  isValid: () => boolean;
  getData: () => any;
}

export const InsuranceCard = forwardRef<InsuranceCardRef, InsuranceCardProps>((
  { index, onRemove, initialData }, ref
) => {
  const [noCard, setNoCard] = useState(false);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    insuranceName: '',
    relationship: '',
    insuredId: '',
    firstName: '',
    lastName: '',
    middleName: '',
    suffix: '',
    dob: '',
    gender: '',
    notes: '',
    noInsuranceCard: false,
    base64bitInsCardFront: '',
    base64bitInsCardBack: ''
  });

  const listitems = [
    { val: '"self"', label: 'Self' },
    { label: 'Spouse', val: 'spouse' },
    { label: 'Child', val: 'child' },
    { label: 'Parent', val: 'parent' },
    { label: 'Other', val: 'other' },
  ]

  // Load initial data when component mounts or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        insuranceName: initialData.insuranceName || '',
        relationship: initialData.relationship || '',
        insuredId: initialData.insuredId || '',
        firstName: initialData.insuredFirstName || '',
        lastName: initialData.insuredLastName || '',
        middleName: initialData.insuredMiddleName || '',
        suffix: initialData.insuredSuffix || '',
        dob: initialData.insuredDob || '',
        gender: initialData.insuredGender || '',
        notes: initialData.notes || '',
        noInsuranceCard: initialData.noInsuranceCard || false,
        base64bitInsCardFront: initialData.base64bitInsCardFront || '',
        base64bitInsCardBack: initialData.base64bitInsCardBack || ''
      });

      setNoCard(initialData.noInsuranceCard || false);

      if (initialData.base64bitInsCardFront) {
        setFrontImage(initialData.base64bitInsCardFront);
      }

      if (initialData.base64bitInsCardBack) {
        setBackImage(initialData.base64bitInsCardBack);
      }
    }
  }, [initialData]);

  // Notify parent component when data changes
  // useEffect(() => {
  //   if (onDataChange) {
  //     const data = {
  //       ...formData,
  //       noInsuranceCard: noCard,
  //       base64bitInsCardFront: frontImage || '',
  //       base64bitInsCardBack: backImage || '',
  //       insuredFirstName: formData.firstName,
  //       insuredLastName: formData.lastName,
  //       insuredMiddleName: formData.middleName,
  //       insuredSuffix: formData.suffix,
  //       insuredDob: formData.dob,
  //       insuredGender: formData.gender,
  //       patientRelationshipToInsured: formData.relationship,
  //       insuranceCompanyName: formData.insuranceName
  //     };
  //     onDataChange(data);
  //   }
  // }, [formData, noCard, frontImage, backImage]);



  // Update the validateForm function with more detailed logging
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.insuranceName.trim()) {
      newErrors.insuranceName = 'Insurance name is required';
      console.log('Validation failed: Insurance name is missing');
    }

    if (!noCard) {

      if (!frontImage) {
        newErrors.frontImage = 'Front image is required';
        console.log('Validation failed: Front image is missing');
      }
      if (!backImage) {
        newErrors.backImage = 'Back image is required';
        console.log('Validation failed: Back image is missing');
      }
    } else {
      // Additional validation when no card is selected
      if (!formData.relationship) {
        newErrors.relationship = 'Relationship is required';
        console.log('Validation failed: Relationship is missing');
      }

      if (!formData.insuredId.trim()) {
        newErrors.insuredId = 'Insured ID is required';
        console.log('Validation failed: Insured ID is missing');
      }
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.dob) {
        newErrors.dob = 'Date of birth is required';
      }
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
      }
    }

    const isValid = Object.keys(newErrors).length === 0;
    console.log('Form validation result:', isValid, 'Errors:', Object.keys(newErrors));
    setErrors(newErrors);
    return isValid;
  };

  const getData = () => {
    return {
      ...formData,
      noInsuranceCard: noCard,
      base64bitInsCardFront: frontImage || '',
      base64bitInsCardBack: backImage || '',
      insuredFirstName: formData.firstName,
      insuredLastName: formData.lastName,
      insuredMiddleName: formData.middleName,
      insuredSuffix: formData.suffix,
      insuredDob: formData.dob,
      insuredGender: formData.gender,
      patientRelationshipToInsured: formData.relationship,
      insuranceCompanyName: formData.insuranceName
    };
  };

  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    isValid: validateForm,
    getData: () => ({
      ...formData,
      noInsuranceCard: noCard,
      base64bitInsCardFront: frontImage || '',
      base64bitInsCardBack: backImage || '',
      insuredFirstName: formData.firstName,
      insuredLastName: formData.lastName,
      insuredMiddleName: formData.middleName,
      insuredSuffix: formData.suffix,
      insuredDob: formData.dob,
      insuredGender: formData.gender,
      patientRelationshipToInsured: formData.relationship,
      insuranceCompanyName: formData.insuranceName
    })
  }), [formData, noCard, frontImage, backImage]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSelection = (event: React.MouseEvent<HTMLLIElement>, val: string) => {
    handleChange('relationship', val)
  };

  // Auto-populate form data when 'self' is selected in relationship dropdown
  //   if (field === 'relationship' && value === 'self') {
  //     const ptCustomerID = localStorage.getItem('ptCusomterID');
  //     const practiceName = localStorage.getItem('practiceName');

  //     if (ptCustomerID && practiceName) {
  //       // Create an async function to fetch user details
  //       const fetchUserDetails = async () => {
  //         try {
  //           const userDetailService = new GetUserDetailServices({
  //             practiceName: practiceName,
  //             patientId: parseInt(ptCustomerID)
  //           });

  //           await userDetailService.getUserInfo();
  //           const userInfo = userDetailService.getUserInfoResponse();

  //           // Populate form with user details
  //           setFormData(prev => ({
  //             ...prev,
  //             firstName: userInfo.firstName || '',
  //             lastName: userInfo.lastName || '',
  //             dob: userInfo.dob || '',
  //             gender: userInfo.gender.toLowerCase() || ''
  //           }));
  //         } catch (error) {
  //           console.error('Error fetching user details:', error);
  //         }
  //       };

  //       fetchUserDetails();
  //     }
  //   }
  // };

  // Update the handleImageUpload function to log the conversion
  const handleImageUpload = (side: 'front' | 'back', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      console.log(`Image uploaded (${side}):`, result ? 'Data received' : 'No data');
      if (side === 'front') {
        setFrontImage(result);
      } else {
        setBackImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleNoCardChange = (checked: boolean) => {
    setNoCard(checked);
    if (checked) {
      // Clear image errors when no card is selected
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.frontImage;
        delete newErrors.backImage;
        return newErrors;
      });
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Insurance {index + 1}</h3>
        <div className="flex items-center gap-2">
          <Checkbox
            checked
            labelText="I no longer use this"
            showText
          />
        </div>
      </div>

      <Input
        className={`mb-4 bg-gray-200 ${errors.insuranceName ? 'border-red-500 bg-red-50' : ''}`}
        placeholder="Insurance Name *"
        value={formData.insuranceName}
        onChange={(e) => handleChange('insuranceName', e.target.value)} name={''} />
      {errors.insuranceName && <p className="text-red-500 text-sm mb-2">{errors.insuranceName}</p>}

      <Input
        className="mb-4 bg-gray-200"
        placeholder="Insurance Notes"
        value={formData.notes}
        onChange={(e) => handleChange('notes', e.target.value)} name={''} />

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          {!noCard && <span>Insurance Card Photo</span>}
          {noCard && <span> </span>}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={noCard}
              labelText="No Insurance Card"
              showText
              onChange={() => handleNoCardChange(!noCard)}
            />
          </div>

        </div>
      </div>

      {!noCard ? (
        <div className="flex gap-4">
          <div className="relative w-1/2">
            <label className={`block border rounded-lg p-2 h-40 cursor-pointer hover:bg-gray-50 ${errors.frontImage ? 'border-red-500' : ''}`}>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('front', e.target.files[0])}
              />
              {frontImage ? (
                <div className="relative h-full">
                  <img src={frontImage} alt="Front" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setFrontImage(null);
                    }}
                    className="absolute bottom-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    <span className="text-gray-600">🗑️</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="text-gray-600 text-xl mb-2">📷</span>
                  Front
                </div>
              )}
            </label>
            {errors.frontImage && <p className="text-red-500 text-sm mt-1">{errors.frontImage}</p>}
          </div>
          <div className="relative w-1/2">
            <label className={`block border rounded-lg p-2 h-40 cursor-pointer hover:bg-gray-50 ${errors.backImage ? 'border-red-500' : ''}`}>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageUpload('back', e.target.files[0])}
              />
              {backImage ? (
                <div className="relative h-full">
                  <img src={backImage} alt="Back" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setBackImage(null);
                    }}
                    className="absolute bottom-2 right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                  >
                    <span className="text-gray-600">🗑️</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <span className="text-gray-600 text-xl mb-2">📷</span>
                  BACK
                </div>
              )}
            </label>
            {errors.backImage && <p className="text-red-500 text-sm mt-1">{errors.backImage}</p>}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex gap-4 mb-4 flex-col md:flex-row">
            <div className="w-full md:w-1/2 mt-2">
              <DropdownList
                borderDropdown
                isPlaceholder
                onClick={handleSelection}
                isMandatory
                showSelectedOption
                listItems={listitems}
                placeholder="Select"
                showTitle
                title="Patient Relationship to Insured "
              />
              {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>}
            </div>
            <div className="w-full md:w-1/2">
              <Input
                inputType="text"
                placeholder="Insured ID"
                label
                required
                className={`bg-gray-200 ${errors.insuredId ? 'border-red-500 bg-red-50' : ''}`}
                value={formData.insuredId}
                onChange={(e) => handleChange('insuredId', e.target.value)} name={'Insured ID'} />
              {errors.insuredId && <p className="text-red-500 text-sm mt-1">{errors.insuredId}</p>}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <Input
                  inputType="text"
                  label
                  required
                  placeholder="Legal First Name"
                  className={`bg-gray-200 ${errors.firstName ? 'border-red-500 bg-red-50' : ''}`}
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)} name={'Insured Name'} />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              <div className="w-1/2">
                <Input
                  label
                  required
                  inputType="text"
                  placeholder="Last Name"
                  className={`bg-gray-200 ${errors.lastName ? 'border-red-500 bg-red-50' : ''}`}
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)} name={'Last Name'} />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <Input
                  label
                  inputType="text"
                  placeholder="Middle Name (Optional)"
                  className="bg-gray-200"
                  value={formData.middleName}
                  onChange={(e) => handleChange('middleName', e.target.value)} name={'Middle Name'} />
              </div>
              <div className="w-1/2">
                <Input
                  label
                  inputType="text"
                  placeholder="Suffix (Optional)"
                  className="bg-gray-200"
                  value={formData.suffix}
                  onChange={(e) => handleChange('suffix', e.target.value)} name={'Suffix'} />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <Input
                label
                required
                inputType="date"
                className={`bg-gray-200 ${errors.dob ? 'border-red-500 bg-red-50' : ''}`}
                value={formData.dob}
                onChange={(e) => handleChange('dob', e.target.value)} name={'Date of Birth'} />
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>
            <div className="w-1/2">
              <label className="block mb-2">Gender <span className="text-red-500">*</span></label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`gender-${index}`}
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`gender-${index}`}
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

InsuranceCard.displayName = 'InsuranceCard';
