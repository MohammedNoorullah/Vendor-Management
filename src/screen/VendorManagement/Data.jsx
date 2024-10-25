import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Config from '../../config';
import Cookies from 'js-cookie';
import axios from 'axios';

function Data({ handleErrorSubmit, handleChange, userform, nextStep }) {
    const [dashboardFilterList, setDashboardFilterList] = useState([]);

    console.log('dashboardFilterList', dashboardFilterList)

    useEffect(() => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            dbname: Cookies.get('DATABASE')
        };

        axios.get(`${Config.baseUrl}/api/TblVendorManagement/GetTblProgramMappings`, { headers })
            .then((res) => {
                const data = res.data;
                console.log('Data:', data);
                setDashboardFilterList(data); // Assuming data is an array
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }, []);


    return (
        <ValidationForm onSubmit={nextStep} onErrorSubmit={handleErrorSubmit}>
            <ThemeProvider>
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
                        <Typography component="h1" variant="h5"
                            sx={{
                                mb: 2, textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                        >
                            Vendor Management
                        </Typography>
                        <Row>
                            <Col xl={12} md={12}>
                                <Card style={{ borderRadius: '15px' }}>
                                    <Card.Body>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldProgram">Nature of job<span className="text-danger">*</span></Form.Label>
                                                <Form.Group as={Col} md="9">
                                                    <select
                                                        name="fldProgram"
                                                        id="fldProgram"
                                                        className="form-control"
                                                        value={userform.fldProgram}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Please select</option>
                                                        {dashboardFilterList.length > 0 &&
                                                            dashboardFilterList.map((item) => (
                                                                <option value={item.fldProgramName} key={item.fldId}>
                                                                    {item.fldProgramName}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </Form.Group>
                                            </Form.Group>

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="ReferenceinKR">Reference in KR<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="ReferenceinKR"
                                                    id="ReferenceinKR"
                                                    placeholder="Reference in KR"
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.ReferenceinKR}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Typography component="h2" variant="h6" >
                            Vendor Info
                        </Typography>
                        <Row>
                            <Col xl={12} md={12}>
                                <Card style={{ borderRadius: '15px' }}>
                                    <Card.Body>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldVendorName">Vendor Name<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldVendorName"
                                                    id="fldVendorName"
                                                    placeholder="Vendor Name"
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldVendorName}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldVendorCode">Vendor Code<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldVendorCode"
                                                    id="fldVendorCode"
                                                    placeholder="Auto Generate"
                                                    disabled
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldVendorCode}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            {/* <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="state">State<span className="text-danger">*</span></Form.Label>
                                                <Form.Group as={Col} md="9">
                                                    <select
                                                        name="state"
                                                        id="state"
                                                        className="form-control"
                                                        value={userform?.state ? userform?.state : null}
                                                        onChange={(e) => e.target.value}
                                                    >
                                                        <option value="">Please select</option>
                                                        {stateMaster.length > 0 &&
                                                            stateMaster.map((item) => {
                                                                return (
                                                                    <option value={item.fldId} key={item.fldId}>
                                                                        {item.fldStateName}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                </Form.Group>
                                            </Form.Group> */}

                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="fldVendorAddress"><span className="text-danger">*Do not enter Area / City / Pincode / State in the Address*</span></Form.Label>
                                            </Form.Group>

                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="fldAddress1">Address 1<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldAddress1"
                                                    id="fldAddress1"
                                                    placeholder="Address 1"
                                                    required
                                                    autoComplete="off"
                                                    maxLength={100}
                                                    value={userform?.fldAddress1}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="fldAddress2">Address 2<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldAddress2"
                                                    id="fldAddress2"
                                                    placeholder="Address 2"
                                                    required
                                                    autoComplete="off"
                                                    maxLength={100}
                                                    value={userform?.fldAddress2}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            {/* <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="fldFKArea">
                                                    Area<span className="text-danger">*</span>
                                                </Form.Label>
                                                <DropDownGrid
                                                    id="fldFKArea"
                                                    name="fldFKArea"
                                                    disabled={buttonStatus === 'delete' && true}
                                                    value={userform?.fldFKArea}
                                                    tableHeaderData={['area', 'city', 'pincode', 'state']}
                                                    tableDataKeyName={['area', 'city', 'pincode', 'state']}
                                                    isSimpleTable={true}
                                                    tableBodyData={areaList}
                                                    onChange={(e) => handleAreaChange(e, 'select', 'fldFKArea')}
                                                    isMultipleSelection={false}
                                                />
                                                {areaRequired && <Row className="d-flex text-danger t-3">{`*Area is required`}</Row>}
                                            </Form.Group> */}

                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="fldVendorAddress"><span className="text-danger">*If you dont't find your required information directly enter below*</span></Form.Label>
                                            </Form.Group>

                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fldArea">Area</Form.Label>
                                                <TextInput
                                                    name="fldArea"
                                                    id="fldArea"
                                                    placeholder="Area"
                                                    autoComplete="off"
                                                    required
                                                    maxLength={100}
                                                    value={userform?.fldArea}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fldCity">City</Form.Label>
                                                <TextInput
                                                    name="fldCity"
                                                    id="fldCity"
                                                    placeholder="City"
                                                    autoComplete="off"
                                                    required
                                                    maxLength={100}
                                                    value={userform?.fldCity}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fldPincode">Pincode</Form.Label>
                                                <TextInput
                                                    name="fldPincode"
                                                    id="fldPincode"
                                                    placeholder="Pincode"
                                                    autoComplete="off"
                                                    pattern="^[0-9]{0,15}$"
                                                    required
                                                    maxLength={15}
                                                    errorMessage={{
                                                        pattern: 'Only numeric values are allowed, maximum 15 digits are allowed'
                                                    }}
                                                    value={userform?.fldPincode}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>


                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fldState">State</Form.Label>
                                                <TextInput
                                                    name="fldState"
                                                    id="fldState"
                                                    placeholder="State"
                                                    autoComplete="off"
                                                    required
                                                    maxLength={100}
                                                    value={userform?.fldState}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Typography component="h2" variant="h6">Communication Info</Typography>
                        <Row>
                            <Col xl={12} md={12}>
                                <Card style={{ borderRadius: '15px' }}>
                                    <Card.Body>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldContactPerson">Contact Person Name<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldContactPerson"
                                                    id="fldContactPerson"
                                                    placeholder="Contact Person Name"
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldContactPerson}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldEMail">E-Mail<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldEMail"
                                                    id="fldEMail"
                                                    placeholder="E-Mail"
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    type="email"
                                                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                                    value={userform?.fldEMail}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>


                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldContactNo">Contact Number<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldContactNo"
                                                    id="fldContactNo"
                                                    placeholder="Contact Number"
                                                    required
                                                    autoComplete="off"
                                                    pattern="^[0-9]{0,15}$"
                                                    maxLength={15}
                                                    errorMessage={{
                                                        pattern: 'Only numeric values are allowed, maximum 15 digits are allowed'
                                                    }}
                                                    value={userform?.fldContactNo}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldDesignation">Designation<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldDesignation"
                                                    id="fldDesignation"
                                                    placeholder="Designation"
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldDesignation}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <Box sx={{ textAlign: 'right' }}>
                            <Button type='submit' variant="primary" size="small">
                                <ArrowForwardIcon />
                            </Button>
                        </Box>

                    </Box>
                </Container>
            </ThemeProvider>
        </ValidationForm>
    )
}

export default Data