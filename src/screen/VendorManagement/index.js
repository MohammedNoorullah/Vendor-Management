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

    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const [vendorCode, setVendorCode] = useState('fldVendorCode');
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [error, setError] = useState('');
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadImages, setUploadImages] = useState();
    const [uploadId, setUploadId] = useState('');


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

    const handleFileChange = (event, name) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const fileSizeInMB = selectedFile.size / (1024 * 1024); // Convert bytes to MB
            if (fileSizeInMB > 2) {
                setError('File size must be less than 2MB');
                setUserform((prev) => ({ ...prev, [name]: '', [`${name}img`]: null })); // Clear file info
            } else {
                setError(''); // Clear any previous error

                // Create a URL for the uploaded file
                const fileUrl = URL.createObjectURL(selectedFile);
                setUserform((prev) => ({ ...prev, [name]: selectedFile.name, [`${name}img`]: fileUrl })); // Set file name and URL
            }
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


    const handleSubmit = () => {
        console.log('Final Data:', userform);

        const headers = {
            'Access-Control-Allow-Origin': true,
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            dbname: Cookies.get('DATABASE'),
            // dbname: localStorage.getItem('DATABASE')
        };

        axios.post(`${Config.baseUrl}/api/TblVendorManagement/CreateTblVendorManagement?sCompanyCode=${securityCode}`, userform, { headers })
            .then((res) => {
                let data = res.data;
                console.log('Data:', data);

                // Check if response is successful and fldVendorCode is present
                if (isPopupOpen && data) {
                    // Trigger SweetAlert with vendor code
                    Swal.fire({
                        icon: 'success',
                        title: 'Vendor Created',
                        html: `Please note down your VENDOR CODE: <b>${data}</b>`,
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Navigate to /vendor/security after clicking 'OK'
                            navigate('/vendor/security');
                        }
                    });

                    toast.success('Vendor created successfully!');
                    // Optionally navigate to another page if needed
                    // navigate('/vendor/security');
                }
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                toast.error('Error creating vendor. Please try again.');
            });

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
                    handleFileChange={handleFileChange}
                    error={error}
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
