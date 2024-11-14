import React, { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import BankDetails from './BankDetails';
import InfrastructureData from './InfrastructureData';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Data from './Data';
import axios from 'axios';
import Config from '../../config';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useRef } from 'react';

const theme = createTheme();

function VendorManagement({ securityCode }) {

    const navigate = useNavigate();

    let today = new Date();
    const [step, setStep] = useState(1);
    const [userform, setUserform] = useState({
        fldId: 0,
        fldProgram: "",
        fldFKUser: 2,
        fldVendorName: "",
        fldVendorCode: "",
        fldVendorAddress: "",
        fldContactPerson: "",
        fldEMail: "",
        fldContactNo: "",
        fldDesignation: "",
        fldBankName: "",
        fldAccountHolderName: "",
        fldAccountNo: "",
        fldAccountType: "",
        fldBranchName: "",
        fldIFSCCode: "",
        fldGSTNo: "",
        fldPANNo: "",
        fldAadharNumber: "",
        fldPassBookorCheque: "",
        fldProductionCapacityPerWeek: "",
        fldTeamStrength: "",
        fldIsActive: true,
        fldEnteredSysId: "",
        fldCreatedBy: 2,
        fldCreatedDt: today.toISOString(),
        fldModifiedBy: 0,
        fldModifiedDt: today.toISOString(),
        fldDeletedBy: 0,
        fldDeletedDt: today.toISOString(),
        fldFKState: 2,
        fldState: "",
        fldAddress1: "",
        fldAddress2: "",
        fldFKArea: 2,
        fldArea: "",
        fldCity: "",
        fldPincode: "",
        fldFKStatus: 271,
        fldStatus: "",
        fldRejectionReason: "",
        fldRejectReasonPrepare: "",
        fldRejectReasonVerify: "",
        fldRejecReasonAuthorize: "",
        fldPreparedBy: "",
        fldPrepareDate: today.toISOString(),
        fldVerifyBy: "",
        fldVerifyDate: today.toISOString(),
        fldAuthorizeBy: "",
        fldAuthorizeDate: today.toISOString(),
        fldApprovalStatus: 0,
        fldIsPrepared: false,
        fldIsVerified: false,
        fldIsAuthorized: false,
        fldGSTFileName: "",
        fldPANFileName: "",
        fldAadhaarFileName: "",
        fldPassbookFileName: "",
        fldFKAccType: 224,
        fldAdditionalContactNumber: "",
        fldReference: "",
        fldMachineDetails: "",
        fldDiaDetails: "",
        fldGaugeDetail: "",
        fldSampleVesselCapacity: "",
        fldNoOfMachine: 0,
        fldNoOfSampleVessel: 0,
        fldUdhayamCeriticate: "",
        fldTDSorTCSDeclarationForm: "",
        fldDeclarationOfMSME: "",
        fldContactNameDepartment: null,
        fldContactEMailId: null,
        fldFKPaymentTerms: 0,
        fldNoOfVessal: 0,
        fldVessalCapasity: ""
    });

    const fileInputRef = useRef(null);
    const [fldId, setFldId] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const [vendorCode, setVendorCode] = useState('fldVendorCode');
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [error, setError] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadImages, setUploadImages] = useState();
    const [uploadId, setUploadId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        if (fldId && fldId !== '') {
            handleUpload(fldId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fldId])

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert to number for specific fields
        let updatedValue = value; // Default to the original value

        // Check if the field should be treated as numeric
        if (name === 'fldFKAccType' || name === 'fldFKPaymentTerms' || name === 'fldNoOfMachine' || name === 'fldNoOfSampleVessel' || name === 'fldNoOfVessal') {
            updatedValue = value ? Number(value) : ''; // Convert to number or empty
        }

        setUserform(prevData => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };


    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            // Update the userform state with the selected file name
            setUserform((prevState) => ({
                ...prevState,
                [fieldName]: file.name, // Save the file name or URL in the state
            }));
        } else {
            setError("No file selected.");
        }
    };

    // Trigger the file input to open for each field (one by one)
    const triggerFileInput = (field) => {
        document.getElementById(field).click();
    };

    // Handle file upload on the "Upload" button click
    const handleUpload = async () => {
        const formData = new FormData();
        let filesSelected = false;  // Flag to check if any file is selected

        // List of all file input fields
        const fileFields = [
            'fldGSTFileName',
            'fldPANFileName',
            'fldAadhaarFileName',
            'fldPassbookFileName'
        ];

        // Iterate over each field and check if a file is selected
        for (let field of fileFields) {
            const fileInput = document.getElementById(field);

            // Check if the fileInput exists and if a file is selected
            if (fileInput && fileInput.files && fileInput.files[0]) {
                formData.append(field, fileInput.files[0]); // Append the selected file to FormData
                filesSelected = true;  // Set the flag to true as files are selected
            }
        }

        // If no files are selected, show an error
        if (!filesSelected) {
            setError("Please select files for upload.");
            return;
        }

        // Make sure fldId is available (from handleSubmit response)
        if (!fldId) {
            setError("fldId is missing. Please submit the form first.");
            return;
        }

        try {
            // Make the API call to upload the files
            const response = await axios.post(
                `${Config.baseUrl}/api/TblVendorManagement/VendorImageUpload?FldId=${fldId}`, // Use the fldId from state
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        dbname: Cookies.get('DATABASE'),
                    },
                }
            );

            console.log('Upload response:', response.data);
            if (response.data.success) {
                alert('Files uploaded successfully!');
            } else {
                setError("File upload failed. Please try again.");
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            setError("Error uploading files. Please try again.");
        }
    };



    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setCheckboxChecked(isChecked);

        if (isChecked) {
            setUserform({ ...userform, fldContactEMailId: userform?.fldEMail }); // Set your preset email value here
        } else {
            setUserform({ ...userform, fldContactEMailId: '' }); // Clear the email field when unchecked
        }
    };

    const handleErrorSubmit = (e, errorInputs) => {
        if (errorInputs.length !== 0) {
            return toast.error('Validation Error cannot Proceed!', { autoClose: 1500 });
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);


    const handleSubmit = async () => {
        console.log('Final Data:', userform);

        const headers = {
            'Access-Control-Allow-Origin': true,
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            dbname: Cookies.get('DATABASE'),
        };

        try {
            const res = await axios.post(`${Config.baseUrl}/api/TblVendorManagement/CreateTblVendorManagement?sCompanyCode=${securityCode}`, userform, { headers });
            const data = res.data;
            console.log('Data:', data);

            if (data && data.fldVendorCode) {
                setFldId(data.fldId); // Store fldId here
                Swal.fire({
                    icon: 'success',
                    title: 'Vendor Created',
                    html: `Please note down your VENDOR CODE: <b>${data.fldVendorCode}</b>`,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/vendor/security');
                    }
                });
                toast.success('Vendor created successfully!');
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast.error('Error creating vendor. Please try again.');
        }

        console.log('userform', userform);
    };


    return (
        <div>
            {step === 1 && (
                <Data
                    handleChange={handleChange}
                    handleCheckboxChange={handleCheckboxChange}
                    checkboxChecked={checkboxChecked}
                    userform={userform}
                    handleErrorSubmit={handleErrorSubmit}
                    nextStep={nextStep}
                />
            )}
            {step === 2 && (
                <BankDetails
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                    triggerFileInput={triggerFileInput}
                    handleFileChange={handleFileChange}
                    handleUpload={handleUpload}
                    error={error}
                    setError={setError}
                    userform={userform}
                    handleErrorSubmit={handleErrorSubmit}
                />
            )}
            {step === 3 && (
                <InfrastructureData
                    prevStep={prevStep}
                    handleErrorSubmit={handleErrorSubmit}
                    handleChange={handleChange}
                    userform={userform}
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
}

export default VendorManagement;
