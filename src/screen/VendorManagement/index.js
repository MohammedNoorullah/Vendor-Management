import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import BankDetails from './BankDetails';
import InfrastructureData from './InfrastructureData';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Data from './Data';
import axios from 'axios';
import Config from '../../config';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

function VendorManagement() {

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
        fldRejectionReason: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserform(prevData => ({
            ...prevData,
            [name]: value,
        }));

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
            dbname: Cookies.get('DATABASE')
            // dbname: localStorage.getItem('DATABASE')
        };
        axios.post(`${Config.baseUrl}/api/TblVendorManagement/CreateTblVendorManagement`, userform, { headers })
            .then((res) => {
                let data = res.data;
                console.log('Data:', data);
                toast.success('Vendor created successfully!');
                navigate('/vendor/security')
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
                toast.error('Error creating vendor. Please try again.');
            });
    };

    return (
        <div>
            {step === 1 && (
                <Data
                    handleChange={handleChange}
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
