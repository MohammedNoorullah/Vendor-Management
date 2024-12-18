import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Avatar, Box, Button, Container, createTheme, CssBaseline, Grid, Grid2, TextField, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation';
import ReCAPTCHA from 'react-google-recaptcha';
import Cookies from 'js-cookie';
import axios from 'axios';
import Config from '../../config';
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom';

const theme = createTheme();

const LandingPage = ({ securityCode, vendorCode, isVendorCode, handleChange, handleToggle }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
    const [database, setDatabase] = useState(null);
    // const [securityCode, setSecurityCode] = useState('');
    // const [captchaValue, setCaptchaValue] = useState(null);
    // const recaptchaRef = React.createRef();
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaValue, setCaptchaValue] = useState(generateCaptcha());
    const [errorMessage, setErrorMessage] = useState('');


    const [currentUrl, setCurrentUrl] = useState('');

    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        // Get the full URL
        const url = window.location.href;

        // Split the URL at '//' and then split the first part by '/'
        const extractedCountryCode = url.split('//')[1].split('/')[0];

        // Set the extracted country code to state
        setCountryCode(extractedCountryCode);
    }, []);

    console.log('currentUrl', currentUrl)
    console.log('countryCode', countryCode)

    function generateCaptcha(length = 6) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // const handleChange = (e) => {
    //     setSecurityCode(e.target.value);
    // };

    const handleCaptchaChange = (e) => {
        setCaptchaInput(e.target.value);
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (captchaInput !== captchaValue) {
    //         toast.error('Incorrect CAPTCHA!', { autoClose: 1500 });
    //         return;
    //     }

    //     console.log('Submitted:', securityCode);
    //     console.log('Submitted:', captchaInput);
    //     toast.success('Submitted successfully!', { autoClose: 1500 });
    //     // Reset form after successful submission
    //     setSecurityCode('');
    //     setCaptchaInput('');
    //     setCaptchaValue(generateCaptcha()); // Generate a new CAPTCHA

    //     // recaptchaRef.current.reset();
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (captchaInput !== captchaValue) {
            setErrorMessage('CAPTCHA is incorrect. Please try again.');
            setLoading(false);
        } else {
            setErrorMessage('');
            // Proceed with form submission logic
            console.log('Form submitted successfully');
        }

        const formData = new FormData(e.currentTarget);

        const headers = {
            'Access-Control-Allow-Origin': true,
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            dbname: Cookies.get('DATABASE'),
        };

        let cpData = {
            securityCode: formData.get('securityCode'),
            captcha: formData.get('captcha')
        };
        if (captchaInput === captchaValue && securityCode) {

            axios
                .post(`${Config.baseUrl}/api/CPAuthenticate/RegisterVendor?sCompanyCode=${countryCode + securityCode}`, cpData)
                .then((res) => {
                    console.log('API Response:', res.data); // Log the entire response

                    // Ensure that the response is an array
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        console.log('Data structure confirmed:', res.data); // Confirm data structure

                        const firstItem = res.data[0]; // Get the first item in the array

                        if (firstItem.fldDatabase) {
                            // fldDatabase is present
                            console.log('Database Name:', firstItem.fldDatabase);
                            localStorage.setItem('DATABASE', firstItem.fldDatabase); // Store in local storage
                            Cookies.set('DATABASE', firstItem.fldDatabase); // Set cookie
                            Cookies.set('SECURITYCODE', firstItem.securityCode); // Set security code cookie
                            Cookies.set('CAPTCHA', firstItem.captcha); // Set CAPTCHA cookie
                            Cookies.set('URL', Config.baseUrl); // Set URL cookie

                            // Update state with the database name if needed
                            setDatabase(firstItem.fldDatabase); // Assuming setDatabase is a state setter function
                        } else {
                            console.error('fldDatabase is missing in the first item of the response');
                        }
                    } else {
                        console.error('Unexpected response format or empty array:', res.data);
                    }

                    // Navigate after processing response
                    // window.alert('calling....')

                    // history.push({
                    //     pathname: '/vendorManagement',
                    //     state: { companies: res.data } // Pass the entire response
                    // });

                    navigate('/vendorManagement');

                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error response:', err?.response?.data); // Log error
                    toast.error(err?.response?.data);
                    setLoading(false);
                    if (err?.response?.data?.status === 401) {
                        toast.error('Invalid Credentials');
                    }
                });
        }
        else {
            axios
                .post(`${Config.baseUrl}/api/CPAuthenticate/RegisterVendor?sCompanyCode=${vendorCode}`, cpData)
                .then((res) => {
                    console.log('API Response:', res.data); // Log the entire response

                    // Ensure that the response is an array
                    if (Array.isArray(res.data) && res.data.length > 0) {
                        console.log('Data structure confirmed:', res.data); // Confirm data structure

                        const firstItem = res.data[0]; // Get the first item in the array

                        if (firstItem.fldDatabase) {
                            // fldDatabase is present
                            console.log('Database Name:', firstItem.fldDatabase);
                            localStorage.setItem('DATABASE', firstItem.fldDatabase); // Store in local storage
                            Cookies.set('DATABASE', firstItem.fldDatabase); // Set cookie
                            Cookies.set('SECURITYCODE', firstItem.securityCode); // Set security code cookie
                            Cookies.set('CAPTCHA', firstItem.captcha); // Set CAPTCHA cookie
                            Cookies.set('URL', Config.baseUrl); // Set URL cookie

                            // Update state with the database name if needed
                            setDatabase(firstItem.fldDatabase); // Assuming setDatabase is a state setter function
                        } else {
                            console.error('fldDatabase is missing in the first item of the response');
                        }
                    } else {
                        console.error('Unexpected response format or empty array:', res.data);
                    }

                    // Navigate after processing response
                    // window.alert('calling....')

                    // history.push({
                    //     pathname: '/vendorManagement',
                    //     state: { companies: res.data } // Pass the entire response
                    // });

                    navigate('/vendorManagement');

                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Error response:', err?.response?.data); // Log error
                    toast.error(err?.response?.data);
                    setLoading(false);
                    if (err?.response?.data?.status === 401) {
                        toast.error('Invalid Credentials');
                    }
                });
        }

    };



    const handleErrorSubmit = (e, formData, userform, errorInputs) => {
        if (errorInputs.length !== 0) {
            toast.error('Validation Error: Unable to Proceed!', { autoClose: 1500 });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container
                component="main"
                // @ts-ignore
                maxWidth="vw"
                sx={{
                    background: 'linear-gradient(130deg, #feedd3, #9dc9f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        flexDirection: 'column',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        width: '100%'
                        // backgroundColor: 'blue'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Vendor Management Security
                    </Typography>
                    {/* <Button
                        onClick={handleToggle}
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: 2,
                            fontSize: '0.875rem',  // Reduce font size
                            padding: '6px 12px',  // Reduce padding to make the button smaller
                        }}
                    >
                        Switch to {isVendorCode ? 'Security Code' : 'Vendor Code'}
                    </Button> */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',

                            minWidth: '30%',
                            maxWidth: '60%'
                        }}
                    >
                        {/* <TextField
                            inputProps={{
                                autoComplete: 'none'
                            }}
                            margin="normal"
                            required
                            fullWidth
                            id={isVendorCode ? "vendorCode" : "securityCode"}
                            label={isVendorCode ? "Vendor Code" : "Security Code"}
                            name={isVendorCode ? "vendorCode" : "securityCode"}
                            value={isVendorCode ? vendorCode : securityCode}
                            onChange={handleChange}
                            autoComplete="off"
                            maxLength={10}
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
                                    borderRadius: 10
                                },
                                minWidth: '40%'
                            }}
                        /> */}

                        <TextField
                            inputProps={{
                                autoComplete: 'none',
                                maxLength: 10, // Ensures no more than 10 characters are typed
                            }}
                            margin="normal"
                            required
                            fullWidth
                            id="securityCode"
                            label="Phone No"
                            name="securityCode"
                            value={securityCode}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                handleChange(e, value);
                            }}
                            autoComplete="off"
                            maxLength={10}
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
                                    borderRadius: 10
                                },
                                minWidth: '40%'
                            }}
                            type="tel"
                        />






                        <TextField
                            inputProps={{
                                autoComplete: 'none'
                            }}
                            margin="normal"
                            required
                            fullWidth
                            id="captcha"
                            label="Captcha"
                            name="captcha"
                            value={captchaInput}
                            onChange={handleCaptchaChange}
                            autoComplete="off"
                            autoFocus
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
                                    borderRadius: 10
                                },
                                minWidth: '40%'
                            }}
                        />

                        <div
                            style={{
                                fontSize: '24px',
                                margin: '10px 0',
                                fontWeight: 'bold',
                                border: '1px solid #000', // Border style: 2px solid black
                                padding: '10px',           // Optional: Add padding for spacing inside the border
                                borderRadius: '4px',       // Optional: Add rounded corners
                            }}
                        >
                            Captcha : {captchaValue}
                        </div>
                        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

                        <Grid2 sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                disabled={loading}
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, borderRadius: 10, py: 1.2, px: 7, fontSize: 20 }}
                            >
                                {loading ? (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </Button>
                        </Grid2>
                        <div>
                            {/* Box containing the Note with reduced width */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 2,
                                    marginBottom: 2,
                                    width: '80%',        // Reduce the width to 80% (adjust as needed)
                                    maxWidth: '600px',   // Optional: limit the maximum width to 600px
                                    marginLeft: 'auto',  // Centers the box horizontally
                                    marginRight: 'auto', // Centers the box horizontally
                                }}
                            >
                                <Typography variant="body1">
                                    <span style={{ color: 'red' }}>Note:</span> Before proceeding for entering vendor information,
                                    first download the below documents, fill it, seal, sign and scan for uploading.
                                </Typography>
                            </Box>
                        </div>


                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 2 }}>
                            <Typography variant="body1">
                                <a href="/MSME_Declaration_Form.docx" download="MSME_Declaration_Form.docx">
                                    Download MSME Declaration Form
                                </a>
                            </Typography>
                            <Typography variant="body1">
                                {/* Change the file path to your .doc file */}
                                <a href="/TDS_TCS_Declaration_Form.docx" download="TDS_TCS_Declaration_Form.docx">
                                    Download TDS / TCS Declaration Form
                                </a>
                            </Typography>
                        </Box>




                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default LandingPage;
