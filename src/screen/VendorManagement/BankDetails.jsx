import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AiOutlineUpload, AiOutlineEye } from 'react-icons/ai';
import { IoEyeSharp } from "react-icons/io5";
import { Box, Container, createTheme, CssBaseline, Typography } from '@mui/material';
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation';
import { ThemeProvider } from '@mui/styles';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';

const theme = createTheme();

const BankDetails = ({ nextStep, prevStep, userform, handleChange, handleErrorSubmit }) => {

    console.log(userform, 'userform')

    const fileInputRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [uploadImages, setUploadImages] = useState();


    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            handleChange(e); // Call the parent's handleChange
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
        }
    };

    const handlePreview = () => {
        if (previewUrl) {
            window.open(previewUrl); // Open the image in a new window
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
                                            <Form.Group as={Col} md="6" controlId="fldAccountType">
                                                <Form.Label>
                                                    Account Type<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldAccountType"
                                                    placeholder='Account Type'
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldAccountType}
                                                    onChange={handleChange}
                                                />
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
                                                    required
                                                    autoComplete="off"
                                                    pattern="^[A-Za-z0-9]{15}$"  // Updated pattern to match exactly 15 characters
                                                    maxLength={15}
                                                    errorMessage={{
                                                        pattern: 'Only alphanumeric characters are allowed, and exactly 15 characters are required.'
                                                    }}
                                                    value={userform?.fldGSTNo}
                                                    onChange={e => {
                                                        const value = e.target.value;

                                                        // Check if the length is exactly 15 characters
                                                        if (value.length <= 15) {
                                                            handleChange(e); // Call your original handleChange
                                                        }
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ marginLeft: '50px' }}>

                                                <input
                                                    type="file"
                                                    name='gstimg'
                                                    accept="image/*"
                                                    id='gstimg'
                                                    style={{ display: 'none' }} // Hide the default file input
                                                    onChange={handleFileChange}
                                                />
                                                <div style={{ marginTop: '10px' }}>

                                                    <Button variant="primary" onClick={() => document.getElementById('gstimg').click()}
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
                                                        onClick={handlePreview}
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
                                                    {/* <span>{file.name}</span> */}
                                                    {userform?.gstimg !== null ? (
                                                        <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>ATTACHED</span>
                                                    ) : ('')
                                                    }


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
                                                    pattern="^[A-Za-z0-9]{15}$"  // Updated pattern for exactly 15 characters
                                                    maxLength={15}
                                                    errorMessage={{
                                                        pattern: 'Only alphanumeric characters are allowed, and exactly 15 characters are required.'
                                                    }}
                                                    value={userform?.fldPANNo}
                                                    onChange={e => {
                                                        const value = e.target.value;

                                                        // Allow only if the length is exactly 15 characters
                                                        if (value.length <= 15) {
                                                            handleChange(e); // Call your original handleChange
                                                        }
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="4" style={{ marginLeft: '50px' }}>

                                                <input
                                                    type="file"
                                                    name='panimg'
                                                    accept="image/*"
                                                    id='panimg'
                                                    style={{ display: 'none' }} // Hide the default file input
                                                    onChange={handleFileChange}
                                                />
                                                <div style={{ marginTop: '10px' }}>

                                                    <Button variant="primary" onClick={() => document.getElementById('panimg').click()}
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
                                                    <Button variant="secondary" onClick={handlePreview}
                                                        style={{
                                                            marginRight: '10px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            padding: '0',
                                                            color: '#0dc2ff'
                                                        }}>
                                                        <IoEyeSharp style={{ fontSize: '25px' }} />
                                                    </Button>
                                                    {/* <span>{file.name}</span> */}
                                                    {userform?.panimg !== null ? (
                                                        <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>ATTACHED</span>
                                                    ) : ('')
                                                    }


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
                                                    name='aadharimg'
                                                    accept="image/*"
                                                    id='aadharimg'
                                                    style={{ display: 'none' }} // Hide the default file input
                                                    onChange={handleFileChange}
                                                />
                                                <div style={{ marginTop: '10px' }}>

                                                    <Button variant="primary" onClick={() => document.getElementById('aadharimg').click()}
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
                                                    <Button variant="secondary" onClick={handlePreview}
                                                        style={{
                                                            marginRight: '10px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            padding: '0',
                                                            color: '#0dc2ff'
                                                        }}>
                                                        <IoEyeSharp style={{ fontSize: '25px' }} />
                                                    </Button>
                                                    {/* <span>{file.name}</span> */}
                                                    {userform?.aadharimg !== null ? (
                                                        <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>ATTACHED</span>
                                                    ) : ('')
                                                    }


                                                </div>
                                            </Form.Group>
                                        </Row>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="4" controlId="fldPassBookorCheque">
                                                <Form.Label>
                                                    Pass Book / Cheque Leaf<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldPassBookorCheque"
                                                    placeholder='Pass Book / Cheque Leaf'
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldPassBookorCheque}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" style={{ marginLeft: '50px' }}>

                                                <input
                                                    type="file"
                                                    name='passbookimg'
                                                    accept="image/*"
                                                    id='passbookimg'
                                                    style={{ display: 'none' }} // Hide the default file input
                                                    onChange={handleFileChange}
                                                />
                                                <div style={{ marginTop: '10px' }}>

                                                    <Button variant="primary" onClick={() => document.getElementById('passbookimg').click()}
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
                                                    <Button variant="secondary" onClick={handlePreview}
                                                        style={{
                                                            marginRight: '10px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            padding: '0',
                                                            color: '#0dc2ff'
                                                        }}>
                                                        <IoEyeSharp style={{ fontSize: '25px' }} />
                                                    </Button>
                                                    {/* <span>{file.name}</span> */}
                                                    {userform?.passbookimg !== null ? (
                                                        <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '10px' }}>ATTACHED</span>
                                                    ) : ('')
                                                    }


                                                </div>
                                            </Form.Group>
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
