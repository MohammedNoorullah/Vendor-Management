import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AiOutlineUpload, AiOutlineEye } from 'react-icons/ai';
import { IoEyeSharp } from "react-icons/io5";
import { Box, Container, createTheme, CssBaseline, Typography } from '@mui/material';
import { FileInput, SelectGroup, TextInput, ValidationForm } from 'react-bootstrap4-form-validation';
import { ThemeProvider } from '@mui/styles';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import Config from '../../config';
import Cookies from 'js-cookie';

const theme = createTheme();

const BankDetails = ({ nextStep, prevStep, userform, handleChange, handleGSTFileChange, handleFileChange, error, handleErrorSubmit }) => {

    console.log(userform, 'userform')

    const fileInputRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadImages, setUploadImages] = useState();
    const [accTypeList, setAccTypeList] = useState([]);


    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');


    useEffect(() => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            dbname: Cookies.get('DATABASE')
        };

        axios.get(`${Config.baseUrl}/api/TblVendorManagement/GetPropertyLists/67`, { headers })
            .then((res) => {
                const data = res.data;
                console.log('Data:', data);
                setAccTypeList(data); // Assuming data is an array
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }, []);

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };


    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //         handleChange(e); // Call the parent's handleChange
    //         setFile(selectedFile);
    //         const objectUrl = URL.createObjectURL(selectedFile);
    //         setPreviewUrl(objectUrl);
    //     }
    // };

    const handlePreview = (name) => {
        const imgUrl = userform[`${name}img`];
        if (imgUrl) {
            window.open(imgUrl); // Open the uploaded image in a new tab
        }
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        nextStep();

    };

    return (
        <ValidationForm onSubmit={handleFinalSubmit} onErrorSubmit={handleErrorSubmit}>
            <ThemeProvider theme={theme}>
                <Container
                    component="main"
                    maxWidth="vw"
                    sx={{
                        background: 'linear-gradient(130deg, #feedd3, #9dc9f6)',
                        overflow: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        margin: 0,
                        padding: 3,
                    }}
                >
                    <CssBaseline />
                    <Box style={{ width: '950px', margin: '0 auto', justifyContent: 'center', height: '100vh' }}>
                        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                            Bank Account Details
                        </Typography>
                        <Row>
                            <Col xl={12} md={12}>
                                <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                    <Card.Body>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="6" controlId="fldBankName">
                                                <Form.Label>
                                                    Bank Name<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldBankName"
                                                    placeholder='Bank Name'
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldBankName}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="fldAccountHolderName">
                                                <Form.Label>
                                                    Account Holder Name<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldAccountHolderName"
                                                    placeholder='Account Holder Name'
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldAccountHolderName}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="6" controlId="fldAccountNo">
                                                <Form.Label>
                                                    Account Number<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldAccountNo"
                                                    placeholder='Account Number'
                                                    required
                                                    autoComplete="off"
                                                    pattern="^[0-9]{0,15}$"
                                                    maxLength={15}
                                                    errorMessage={{
                                                        pattern: 'Only numeric values are allowed, maximum 15 digits are allowed'
                                                    }}
                                                    value={userform?.fldAccountNo}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="fldFKAccType">
                                                <Form.Label>
                                                    Account Type<span className="text-danger">*</span>
                                                </Form.Label>
                                                <SelectGroup
                                                    name="fldFKAccType"
                                                    id="fldFKAccType"
                                                    value={userform?.fldFKAccType}
                                                    errorMessage="Please select a Acc Type."
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Please select</option>
                                                    {accTypeList.length > 0 &&
                                                        accTypeList.map((item) => {
                                                            return <option value={item.fldId}>{item?.fldDescription}</option>;
                                                        })}
                                                </SelectGroup>
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="6" controlId="fldBranchName">
                                                <Form.Label>
                                                    Branch Name<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldBranchName"
                                                    placeholder='Branch Name'
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldBranchName}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="fldIFSCCode">
                                                <Form.Label>
                                                    IFSC Code<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldIFSCCode"
                                                    placeholder='IFSC Code'
                                                    required
                                                    autoComplete="off"
                                                    pattern="^[A-Za-z0-9]{0,15}$"
                                                    maxLength={15}
                                                    errorMessage={{
                                                        pattern: 'Only alphanumeric are allowed, maximum 15 digit are allowed'
                                                    }}
                                                    value={userform?.fldIFSCCode}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                            Legal Information
                        </Typography>
                        <Row>
                            <Col xl={12} md={12}>
                                <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                    <Card.Body>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="4" controlId="fldGSTNo">
                                                <Form.Label>
                                                    GST Number<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldGSTNo"
                                                    placeholder='GST Number'
                                                    // required
                                                    autoComplete="off"
                                                    pattern="^[A-Za-z0-9]{15}$" // Change pattern to exactly 15 characters
                                                    maxLength={15}
                                                    errorMessage={{
                                                        pattern: 'Only alphanumeric are allowed, and exactly 15 characters are required.',
                                                        required: 'GST Number is required.'
                                                    }}
                                                    value={userform?.fldGSTNo}
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        // Validate length
                                                        if (value.length <= 15) {
                                                            handleChange(e); // Call your existing handleChange function
                                                        }
                                                    }}
                                                />
                                                {/* {userform?.fldGSTNo && userform.fldGSTNo.length !== 15 && (
                                                    <div className="text-danger">
                                                        GST Number must be exactly 15 characters.
                                                    </div>
                                                )} */}
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ marginLeft: '50px' }}>
                                                <input
                                                    type="file"
                                                    name='fldGSTFileName'
                                                    accept="image/*"
                                                    id='fldGSTFileName'
                                                    style={{ display: 'none' }} // Hide the default file input
                                                    onChange={(e) => handleFileChange(e, 'fldGSTFileName')}
                                                />
                                                <div style={{ marginTop: '10px' }}>
                                                    <Button variant="primary" onClick={() => document.getElementById('fldGSTFileName').click()}
                                                        style={{
                                                            marginRight: '10px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            padding: '0',
                                                            color: '#338333'
                                                        }}>
                                                        <AiOutlineUpload style={{ fontSize: '25px' }} />
                                                    </Button>
                                                    <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>/</span>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() => handlePreview('fldGSTFileName')}
                                                        style={{
                                                            marginRight: '10px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            padding: '0',
                                                            color: '#0dc2ff'
                                                        }}
                                                    >
                                                        <IoEyeSharp style={{ fontSize: '25px' }} />
                                                    </Button>
                                                    {userform.fldGSTFileName ? (
                                                        <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>ATTACHED</span>
                                                    ) : null}
                                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                                </div>
                                            </Form.Group>

                                        </Row>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="4" controlId="fldPANNo">
                                                <Form.Label>
                                                    PAN Number<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldPANNo"
                                                    placeholder='PAN Number'
                                                    required
                                                    autoComplete="off"
                                                    pattern="^[A-Za-z0-9]{15}$" // Change pattern to exactly 15 characters
                                                    maxLength={15}
                                                    errorMessage={{
                                                        pattern: 'Only alphanumeric are allowed, and exactly 15 characters are required.',
                                                        required: 'PAN Number is required.'
                                                    }}
                                                    value={userform?.fldPANNo}
                                                    onChange={(e) => {
                                                        const { value } = e.target;
                                                        // Validate length
                                                        if (value.length <= 15) {
                                                            handleChange(e); // Call your existing handleChange function
                                                        }
                                                    }}
                                                />
                                                {/* {userform?.fldPANNo && userform.fldPANNo.length !== 15 && (
                                                    <div className="text-danger">
                                                        PAN Number must be exactly 15 characters.
                                                    </div>
                                                )} */}
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ marginLeft: '50px' }}>
                                                <input
                                                    type="file"
                                                    name='fldPANFileName'
                                                    accept="image/*"
                                                    id='fldPANFileName'
                                                    style={{ display: 'none' }} // Hide the default file input
                                                    onChange={(e) => handleFileChange(e, 'fldPANFileName')}
                                                />
                                                <div style={{ marginTop: '10px' }}>
                                                    <Button variant="primary" onClick={() => document.getElementById('fldPANFileName').click()}
                                                        style={{
                                                            marginRight: '10px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            padding: '0',
                                                            color: '#338333'
                                                        }}>
                                                        <AiOutlineUpload style={{ fontSize: '25px' }} />
                                                    </Button>
                                                    <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>/</span>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() => handlePreview('fldPANFileName')}
                                                        style={{
                                                            marginRight: '10px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            padding: '0',
                                                            color: '#0dc2ff'
                                                        }}
                                                    >
                                                        <IoEyeSharp style={{ fontSize: '25px' }} />
                                                    </Button>
                                                    {userform.fldPANFileName ? (
                                                        <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>ATTACHED</span>
                                                    ) : null}
                                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                                </div>
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="4" controlId="fldAadharNumber">
                                                <Form.Label>
                                                    Aadhar Number<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldAadharNumber"
                                                    placeholder='Aadhar Number'
                                                    required
                                                    autoComplete="off"
                                                    pattern="^[0-9]{12}$"  // Updated pattern for exactly 12 digits
                                                    maxLength={12}         // Set maxLength to 12
                                                    errorMessage={{
                                                        pattern: 'Only numeric values are allowed, and exactly 12 digits are required.'
                                                    }}
                                                    value={userform?.fldAadharNumber}
                                                    onChange={e => {
                                                        const value = e.target.value;

                                                        // Allow only if the length is exactly 12 digits
                                                        if (value.length <= 12 && /^[0-9]*$/.test(value)) {
                                                            handleChange(e); // Call your original handleChange
                                                        }
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ marginLeft: '50px' }}>
                                                <input
                                                    type="file"
                                                    name='fldAadhaarFileName'
                                                    accept="image/*"
                                                    id='fldAadhaarFileName'
                                                    style={{ display: 'none' }} // Hide the default file input
                                                    onChange={(e) => handleFileChange(e, 'fldAadhaarFileName')}
                                                />
                                                <div style={{ marginTop: '10px' }}>
                                                    <Button variant="primary" onClick={() => document.getElementById('fldAadhaarFileName').click()}
                                                        style={{
                                                            marginRight: '10px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            padding: '0',
                                                            color: '#338333'
                                                        }}>
                                                        <AiOutlineUpload style={{ fontSize: '25px' }} />
                                                    </Button>
                                                    <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>/</span>
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() => handlePreview('fldAadhaarFileName')}
                                                        style={{
                                                            marginRight: '10px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            padding: '0',
                                                            color: '#0dc2ff'
                                                        }}
                                                    >
                                                        <IoEyeSharp style={{ fontSize: '25px' }} />
                                                    </Button>
                                                    {userform.fldAadhaarFileName ? (
                                                        <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>ATTACHED</span>
                                                    ) : null}
                                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                                </div>
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="4" controlId="fldPassBookorCheque">
                                                <Form.Label>
                                                    Pass Book / Cheque Leaf<span className="text-danger">*</span>
                                                </Form.Label>
                                                <div>
                                                    <Form.Check
                                                        type="radio"
                                                        value="yes"
                                                        label='Yes'
                                                        checked={selectedOption === 'yes'}
                                                        onChange={handleRadioChange}
                                                        required
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        value="no"
                                                        label='No'
                                                        checked={selectedOption === 'no'}
                                                        onChange={handleRadioChange}
                                                        required
                                                    />
                                                </div>
                                            </Form.Group>

                                            {selectedOption === 'yes' ? (
                                                <Form.Group as={Col} md="4" style={{ marginLeft: '50px' }}>
                                                    <input
                                                        type="file"
                                                        name='fldPassbookFileName'
                                                        accept="image/*"
                                                        id='fldPassbookFileName'
                                                        style={{ display: 'none' }} // Hide the default file input
                                                        onChange={(e) => handleFileChange(e, 'fldPassbookFileName')}
                                                    />
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Button variant="primary" onClick={() => document.getElementById('fldPassbookFileName').click()}
                                                            style={{
                                                                marginRight: '10px',
                                                                backgroundColor: 'transparent',
                                                                border: 'none',
                                                                padding: '0',
                                                                color: '#338333'
                                                            }}>
                                                            <AiOutlineUpload style={{ fontSize: '25px' }} />
                                                        </Button>
                                                        <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px', marginRight: '10px' }}>/</span>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={() => handlePreview('fldPassbookFileName')}
                                                            style={{
                                                                marginRight: '10px',
                                                                backgroundColor: 'transparent',
                                                                border: 'none',
                                                                padding: '0',
                                                                color: '#0dc2ff'
                                                            }}
                                                        >
                                                            <IoEyeSharp style={{ fontSize: '25px' }} />
                                                        </Button>
                                                        {userform.fldPassbookFileName ? (
                                                            <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>ATTACHED</span>
                                                        ) : null}
                                                        {error && <div style={{ color: 'red' }}>{error}</div>}
                                                    </div>
                                                </Form.Group>
                                            ) : ('')}


                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button onClick={prevStep} variant="secondary">
                                <ArrowBackIcon />
                            </Button>
                            <Button type="submit" variant="primary">
                                <ArrowForwardIcon />
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </ValidationForm>
    );
};

export default BankDetails;
