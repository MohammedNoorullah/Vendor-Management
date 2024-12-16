import React, { useCallback, useEffect, useState } from 'react';
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

function VendorManagement({ securityCode, vendorCode }) {

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
        fldFKArea: 0,
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
        fldGSTFileName: null || "",
        fldPANFileName: null || "",
        fldAadhaarFileName: null || "",
        fldPassbookFileName: null || "",
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
        fldNoOfVessal: "",
        fldVessalCapasity: "",
        fldAccountContactPerson: "",
        fldAccountContactNo: "",
        fldAccountMailId: "",
    });

    const [isPopupOpen, setIsPopupOpen] = useState(true);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [error, setError] = useState('');
    const [uploadId, setUploadId] = useState('')
    const [showTable, setShowTable] = useState(false);
    const [vesselList, setVesselList] = useState([]);

    console.log('vesselList', vesselList)

    const [imagePreviews, setImagePreviews] = useState({
        fldGSTFileName: null,
        fldPANFileName: null,
        fldAadhaarFileName: null,
        fldPassbookFileName: null,
        fldTDSorTCSDeclarationForm: null,
        fldDeclarationOfMSME: null,
    }); // Use an object to map each field to its respective file
    console.log('imagePreviews', imagePreviews)

    const fileInputRefs = {
        fldGSTFileName: useRef(null),
        fldPANFileName: useRef(null),
        fldAadhaarFileName: useRef(null),
        fldPassbookFileName: useRef(null),
        fldTDSorTCSDeclarationForm: useRef(null),
        fldDeclarationOfMSME: useRef(null)
    };

    console.log('uploadId', uploadId)



    useEffect(() => {
        if (uploadId !== '') {
            handleUpload(uploadId)
        }

    }, [uploadId])

    useEffect(() => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            dbname: Cookies.get('DATABASE')
        };

        axios.get(`${Config.baseUrl}/api/TblVendorManagement/GetTblVendorByVendorCode/GetByVendorCode/${securityCode}`, { headers })
            .then((res) => {
                const data = res.data;
                console.log('Data:', data);
                setUserform({
                    fldId: data.fldId,
                    fldProgram: data.fldProgram,
                    fldFKUser: 2,
                    fldVendorName: data.fldVendorName,
                    fldVendorCode: data.fldVendorCode,
                    fldVendorAddress: data.fldVendorAddress,
                    fldContactPerson: data.fldContactPerson,
                    fldEMail: data.fldEMail,
                    fldContactNo: data.fldContactNo,
                    fldDesignation: data.fldDesignation,
                    fldBankName: data.fldBankName,
                    fldAccountHolderName: data.fldAccountHolderName,
                    fldAccountNo: data.fldAccountNo,
                    fldAccountType: data.fldAccountType,
                    fldBranchName: data.fldBranchName,
                    fldIFSCCode: data.fldIFSCCode,
                    fldGSTNo: data.fldGSTNo,
                    fldPANNo: data.fldPANNo,
                    fldAadharNumber: data.fldAadharNumber,
                    fldPassBookorCheque: data.fldPassBookorCheque,
                    fldProductionCapacityPerWeek: data.fldProductionCapacityPerWeek,
                    fldTeamStrength: data.fldTeamStrength,
                    fldIsActive: true,
                    fldEnteredSysId: data.fldEnteredSysId,
                    fldCreatedBy: 2,
                    fldCreatedDt: today.toISOString(),
                    fldModifiedBy: 0,
                    fldModifiedDt: today.toISOString(),
                    fldDeletedBy: 0,
                    fldDeletedDt: today.toISOString(),
                    fldFKState: 2,
                    fldState: data.fldState,
                    fldAddress1: data.fldAddress1,
                    fldAddress2: data.fldAddress2,
                    fldFKArea: 0,
                    fldArea: data.fldArea,
                    fldCity: data.fldCity,
                    fldPincode: data.fldPincode,
                    fldFKStatus: data.fldFKStatus,
                    fldStatus: data.fldStatus,
                    fldRejectionReason: data.fldRejectionReason,
                    fldRejectReasonPrepare: data.fldRejectReasonPrepare,
                    fldRejectReasonVerify: data.fldRejectReasonVerify,
                    fldRejecReasonAuthorize: data.fldRejecReasonAuthorize,
                    fldPreparedBy: data.fldPreparedBy,
                    fldPrepareDate: today.toISOString(),
                    fldVerifyBy: data.fldPreparedBy,
                    fldVerifyDate: today.toISOString(),
                    fldAuthorizeBy: data.fldPreparedBy,
                    fldAuthorizeDate: today.toISOString(),
                    fldApprovalStatus: 0,
                    fldIsPrepared: false,
                    fldIsVerified: false,
                    fldIsAuthorized: false,
                    fldGSTFileName: data.fldGSTFileName,
                    fldPANFileName: data.fldPANFileName,
                    fldAadhaarFileName: data.fldAadhaarFileName,
                    fldPassbookFileName: data.fldPassbookFileName,
                    fldFKAccType: data.fldFKAccType,
                    fldAdditionalContactNumber: data.fldAdditionalContactNumber,
                    fldReference: data.fldReference,
                    fldMachineDetails: data.fldMachineDetails,
                    fldDiaDetails: data.fldDiaDetails,
                    fldGaugeDetail: data.fldGaugeDetail,
                    fldSampleVesselCapacity: data.fldSampleVesselCapacity,
                    fldNoOfMachine: data.fldNoOfMachine,
                    fldNoOfSampleVessel: data.fldNoOfSampleVessel,
                    fldUdhayamCeriticate: data.fldUdhayamCeriticate,
                    fldTDSorTCSDeclarationForm: data.fldTDSorTCSDeclarationForm,
                    fldDeclarationOfMSME: data.fldDeclarationOfMSME,
                    fldContactNameDepartment: data.fldContactNameDepartment,
                    fldContactEMailId: data.fldContactEMailId,
                    fldFKPaymentTerms: data.fldFKPaymentTerms,
                    fldNoOfVessal: data.fldNoOfVessal,
                    fldVessalCapasity: data.fldVessalCapasity,
                    fldAccountContactPerson: data.fldAccountContactPerson,
                    fldAccountContactNo: data.fldAccountContactNo,
                    fldAccountMailId: data.fldAccountMailId,
                })

            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }, []);

    // useEffect(() => {
    //     axios.get(`${Config.baseUrl}/api/TblVendorManagement/GetVendorImage?fldId=${userform?.fldId}`).then((res) => console.log('res', res))
    // }, [])

    useEffect(() => {
        if (securityCode === userform?.fldContactNo) {

            const formData = new FormData();

            // Append each file to the corresponding field in FormData
            Object.keys(imagePreviews).forEach((fieldName) => {
                const preview = imagePreviews[fieldName];
                if (preview?.file) {
                    formData.append(fieldName, preview.file); // Append the file under the corresponding field name
                }
            });

            axios.get(
                `${Config.baseUrl}/api/TblVendorManagement/GetVendorImage?fldId=${userform?.fldId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        dbname: Cookies.get('DATABASE'),
                    },
                }
            )
                .then(response => {
                    console.log('Upload success:', response.data);
                })
                .catch(error => {
                    console.error('Error uploading images:', error);
                });
        }
    }, [])




    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     // Convert to number for specific fields
    //     let updatedValue = value; // Default to the original value

    //     // Check if the field should be treated as numeric
    //     if (name === 'fldFKAccType' || name === 'fldFKPaymentTerms' || name === 'fldNoOfMachine' || name === 'fldNoOfSampleVessel' || name === 'fldNoOfVessal') {
    //         updatedValue = value ? Number(value) : ''; // Convert to number or empty
    //     }

    //     setUserform(prevData => ({
    //         ...prevData,
    //         [name]: updatedValue,
    //     }));
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;
        if (name === 'fldFKAccType' || name === 'fldFKPaymentTerms' || name === 'fldNoOfMachine' || name === 'fldNoOfSampleVessel') {
            updatedValue = value ? Number(value) : ''; // Convert to number or empty
        }
        setUserform((prev) => ({
            ...prev,
            [name]: updatedValue
        }));
    };

    const handleAddClick = useCallback(() => {
        const { fldVessalCapasity, fldNoOfVessal } = userform;

        const vesselCapacity = String(fldVessalCapasity).trim();
        const noOfVessels = String(fldNoOfVessal).trim();

        if (vesselCapacity && noOfVessels) {
            const newVessel = {
                capacity: vesselCapacity,
                numberOfVessels: noOfVessels,
            };

            setVesselList((prevList) => {
                const updatedList = [...prevList, newVessel];

                const newCapacities = updatedList.map((vessel) => vessel.capacity).join(',');
                const newVesselCounts = updatedList.map((vessel) => vessel.numberOfVessels).join(',');

                setUserform((prev) => ({
                    ...prev,
                    fldVessalCapasity: newCapacities,
                    fldNoOfVessal: newVesselCounts,
                }));

                return updatedList;
            });

            setShowTable(true);
        } else {
            alert('Please fill both fields');
        }
    }, [userform.fldVessalCapasity, userform.fldNoOfVessal]);




    const handleFileChange = (fieldName) => {
        const file = fileInputRefs[fieldName].current.files[0]; // Get the first file selected for this field
        if (file) {
            const reader = new FileReader();
            const previewUrl = URL.createObjectURL(file);
            reader.onload = (e) => {
                setImagePreviews((prevState) => ({
                    ...prevState,
                    [fieldName]: { file, previewUrl: previewUrl }, // Update the specific field with file and preview
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle file upload (sending the files to the server)
    const handleUpload = (fldId) => {
        console.log('calling......IO', fldId)
        const formData = new FormData();

        // Append each file to the corresponding field in FormData
        Object.keys(imagePreviews).forEach((fieldName) => {
            const preview = imagePreviews[fieldName];
            if (preview?.file) {
                formData.append(fieldName, preview.file); // Append the file under the corresponding field name
            }
        });

        // Send the formData to the server
        axios.post(
            `${Config.baseUrl}/api/TblVendorManagement/VendorImageUpload?FldId=${fldId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    dbname: Cookies.get('DATABASE'),
                },
            }
        )
            .then(response => {
                console.log('Upload success:', response.data);
            })
            .catch(error => {
                console.error('Error uploading images:', error);
            });

        // axios.post(
        //     `${Config.baseUrl}/api/TblVendorManagement/VendorDeclarationMSMEUpload?FldId=${fldId}`,
        //     formData,
        //     {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //             dbname: Cookies.get('DATABASE'),
        //         },
        //     }
        // )
        //     .then(response => {
        //         console.log('Upload success:', response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error uploading images:', error);
        //     });
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


        if (userform?.fldId === 0) {
            axios.post(`${Config.baseUrl}/api/TblVendorManagement/CreateTblVendorManagement?sCompanyCode=${'KR' + securityCode}`, userform, { headers })
                .then((res) => {
                    let data = res.data;
                    console.log('Data:', data);

                    if (isPopupOpen && data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Vendor Created',
                            // html: `Please note down your VENDOR CODE: <b>${data?.fldVendorCode}</b>`,
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/vendor/security');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 500);
                            }
                        });

                        toast.success('Vendor created successfully!');

                    }
                    setUploadId(res.data.fldId)
                })
                .catch((error) => {
                    console.error('Error:', error.response ? error.response.data : error.message);
                    toast.error('Error creating vendor. Please try again.');
                });
        } else if (userform?.fldId !== 0) {
            axios.patch(`${Config.baseUrl}/api/TblVendorManagement/UpdateTblVendorByVendorCode/UpdateByVendorCode/${securityCode}`, userform, { headers })
                .then((res) => {
                    if (res.status === 200 && isPopupOpen) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Vendor Updated',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate('/vendor/security');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 500);
                            }
                        });

                        toast.success('Vendor Updated successfully!');

                    }
                    const formData = new FormData();

                    // Append each file to the corresponding field in FormData
                    Object.keys(imagePreviews).forEach((fieldName) => {
                        const preview = imagePreviews[fieldName];
                        if (preview?.file) {
                            formData.append(fieldName, preview.file); // Append the file under the corresponding field name
                        }
                    });

                    // Send the formData to the server
                    axios.patch(
                        `${Config.baseUrl}/api/TblVendorManagement/UpdateVendorImageUpload?FldId=${userform?.fldId}`,
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                dbname: Cookies.get('DATABASE'),
                            },
                        }
                    )
                        .then(response => {
                            console.log('Upload success:', response.data);
                        })
                        .catch(error => {
                            console.error('Error uploading images:', error);
                        });


                    // axios.get(
                    //     `${Config.baseUrl}/api/TblVendorManagement/GetVendorImage?fldId=${userform?.fldId}`,
                    //     formData,
                    //     {
                    //         headers: {
                    //             'Content-Type': 'multipart/form-data',
                    //             dbname: Cookies.get('DATABASE'),
                    //         },
                    //     }
                    // )
                    //     .then(response => {
                    //         console.log('Upload success:', response.data);
                    //     })
                    //     .catch(error => {
                    //         console.error('Error uploading images:', error);
                    //     });
                });

            toast.success('Vendor created successfully!');


        } else {
            throw new Error("No valid code (securityCode or vendorCode) found for submission.");
        }

        // const data = res.data;
        // console.log('DataResults:', data);

        // if (data && data.fldVendorCode) {
        //     Swal.fire({
        //         icon: 'success',
        //         title: vendorCode ? 'Vendor Updated' : 'Vendor Created',
        //         html: `Please note down your VENDOR CODE: <b>${data.fldVendorCode}</b>`,
        //         confirmButtonText: 'OK'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             navigate('/vendor/security');
        //         }
        //     });
        //     toast.success(vendorCode ? 'Vendor updated successfully!' : 'Vendor created successfully!');
        // }


        // setUploadId(res.data.fldId)



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
                    vendorCode={vendorCode}
                    handleErrorSubmit={handleErrorSubmit}
                    nextStep={nextStep}
                />
            )}
            {step === 2 && (
                <BankDetails
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                    // triggerFileInput={triggerFileInput}
                    handleFileChange={handleFileChange}
                    // handleUpload={handleUpload}
                    fileInputRefs={fileInputRefs}
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
                    handleAddClick={handleAddClick}
                    showTable={showTable}
                    vesselList={vesselList}
                    setVesselList={setVesselList}
                    setUserform={setUserform}
                />
            )}
        </div>
    );
}

export default VendorManagement;
