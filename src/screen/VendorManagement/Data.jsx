import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { SelectGroup, TextInput, ValidationForm } from 'react-bootstrap4-form-validation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Config from '../../config';
import Cookies from 'js-cookie';
import axios from 'axios';
import DropDownGrid from '../../App/component/DropDownGrid';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

let apiCallId;

function Data({ vendorCode, handleErrorSubmit, handleChange, handleCheckboxChange, handleProgramChange, handleStateChange, checkboxChecked, userform, setUserform, nextStep, programRequired }) {
    let [selectedList, setSelectedList] = useState('');
    const [dashboardFilterList, setDashboardFilterList] = useState([]);
    const [paymentTerms, setPaymentTerms] = useState([]);
    const [areaMaster, setAreaMaster] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [areaRequired, setAreaRequired] = useState(false);
    const [stateList, setStateList] = useState([]);
    const [stateOption, setStateOption] = useState([]);
    const [options, setOptions] = useState(null);
    const [programName, setProgramName] = useState(null);
    const [programName2, setProgramName2] = useState(null);
    const [isVendorCodeVisible, setIsVendorCodeVisible] = useState(false);

    const navigate = useNavigate();

    console.log('dashboardFilterList', dashboardFilterList)
    console.log('paymentTerms', paymentTerms);
    console.log('programName', programName)
    console.log('stateList', stateList)
    console.log('stateOption', stateOption)


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

    console.log("AreaList", areaList);

    useEffect(() => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            dbname: Cookies.get('DATABASE')
        };

        axios.get(`${Config.baseUrl}/api/TblVendorManagement/GetPropertyLists/86`, { headers })
            .then((res) => {
                const data = res.data;
                console.log('Data:', data);
                setPaymentTerms(data); // Assuming data is an array
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }, []);

    useEffect(() => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            dbname: Cookies.get('DATABASE')
        };

        axios.get(`${Config.baseUrl}/api/TblVendorManagement/GetAreaMaster`, { headers })
            .then((res) => {
                const data = res.data;
                console.log('area:', data);
                setAreaMaster(data); // Assuming data is an array
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }, []);


    useEffect(() => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Content-Type': 'application/json',
            dbname: Cookies.get('DATABASE')
        };

        axios.get(`${Config.baseUrl}/api/TblVendorManagement/GetStateMaster`, { headers })
            .then((res) => {
                const data = res.data;
                console.log('area:', data);
                setStateList(data); // Assuming data is an array
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }, []);

    useEffect(() => {
        if (areaMaster.length > 0) {
            let data = [];
            areaMaster.forEach((element) => {
                data.push({
                    fldId: element.fldId,
                    country: element.fldCountry,
                    state: element.fldState,
                    city: element.fldCity,
                    area: element.fldArea,
                    pincode: element.fldPincode,
                    fldStateCode: element.fldStateCode
                });
            });
            setAreaList([...data]);

        }
    }, [areaMaster]);


    useEffect(() => {
        setStateOption(
            stateList.length > 0 &&
            stateList.map((data) => {
                let obj = {};
                obj['label'] = data?.fldStateName;
                obj['value'] = data?.fldStateName;
                obj['id'] = data.fldId;
                return obj;
            })
        )
    }, [stateList])


    useEffect(() => {
        setProgramName(
            dashboardFilterList.length > 0 &&
            dashboardFilterList.map((data) => {
                const parts = data.fldProgramName.split(/DC|PO/);
                const programName = parts[0];
                let obj = {};
                obj['label'] = programName;
                obj['value'] = programName;
                obj['id'] = data.fldId;
                return obj;
            })
        );
    }, [dashboardFilterList]);

    useEffect(() => {
        // Only proceed if fldProgram exists and is a non-empty string
        if (userform?.fldProgram && userform.fldProgram.length > 0 && programName) {
            // Split the fldProgram string into an array of trimmed items
            const programArray = userform.fldProgram
                .split(',')
                .map(item => item.trim());  // Ensure we trim extra spaces

            // Debug: Log programArray to verify it's being split correctly
            console.log('programArray:', programArray);

            // Filter programName based on the programArray values
            const result = programName.filter(({ value }) => {
                // Trim any extra spaces from the value in programName and programArray
                const trimmedValue = value.trim();

                // Debug: Log each comparison
                console.log(`Comparing trimmed '${trimmedValue}' with programArray values:`, programArray);

                // Check if the programName value exists in programArray after trimming both sides
                const isMatch = programArray.includes(trimmedValue);

                // Log the match status
                console.log(`Is match for '${trimmedValue}': ${isMatch}`);
                return isMatch;
            });

            // Set the filtered result to programName2
            setProgramName2(result);

            // Debug: Log the filtered result
            console.log('Filtered result:', result);
        }
    }, [programName, userform?.fldProgram]);  // Trigger on changes to programName and fldProgram



    // const handleAreaChange = (e, type, name) => {
    //     console.log("Valuesss", e)
    //     if (type === 'select') {
    //         if (name === 'fldFKArea') {
    //             setAreaRequired(false);
    //         }
    //         let key = name;
    //         let value = e;
    //         console.log(e, 'selectedrow')
    //         setUserform((prev) => ({
    //             ...prev,
    //             [key]: value
    //         }));
    //     }


    // }

    const handleAreaChange = (value, type, name) => {
        console.log("Valuesss", value);
        if (type === 'select') {
            if (name === 'fldFKArea') {
                let ind = areaList.findIndex((ele) => ele.fldId === value.fldId);
                if (ind !== -1) {
                    setUserform((prev) => ({
                        ...prev,
                        fldFKArea: value.fldId,
                        fldArea: value.area,
                        fldCity: value.city,
                        fldPincode: value.pincode,
                    }));
                }
            }
        }
    };



    return (
        <ValidationForm onSubmit={nextStep} onErrorSubmit={handleErrorSubmit}>
            <ThemeProvider>
                <Container
                    component="main"
                    maxWidth="false"
                    sx={{
                        background: 'linear-gradient(130deg, #feedd3, #9dc9f6)',
                        overflow: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        margin: 0,
                        padding: { xs: 2, sm: 3 }, // Adjust padding for different screen sizes
                        width: '100%', // Ensure full width on mobile
                        '@media (max-width: 600px)': {
                            padding: 2, // Mobile-specific padding
                            height: 'auto', // Adjust height on small screens
                        },
                    }}
                >


                    <CssBaseline />
                    <Box style={{ width: '100%', maxWidth: '950px', margin: '0 auto', justifyContent: 'center', height: '100vh' }}>
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
                                            {/* <Form.Group as={Col} md="6">
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
                                                            dashboardFilterList.map((item) => {
                                                                const parts = item.fldProgramName.split(/DC|PO/);
                                                                const programName = parts[0];

                                                                return (
                                                                    <option value={programName} key={item.fldId}>
                                                                        {programName}
                                                                    </option>
                                                                );
                                                            })
                                                        }

                                                    </select>
                                                </Form.Group>
                                            </Form.Group> */}

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldProgram">
                                                    Nature Of Jobs
                                                    <span class="badge badge-primary">
                                                        {userform?.fldProgram && userform?.fldProgram.includes(',') ? userform?.fldProgram?.split(',').length : userform?.fldProgram?.length
                                                            || userform?.fldProgram && userform?.fldProgram?.length}
                                                    </span>
                                                    <span className="text-danger">*</span>
                                                </Form.Label>
                                                <Select
                                                    name="fldProgram"
                                                    id="fldProgram"
                                                    closeMenuOnSelect={false}
                                                    components={makeAnimated}
                                                    value={
                                                        userform?.fldProgram &&
                                                            userform?.fldProgram.length > 0 ? programName2 || [] :
                                                            programName &&
                                                            programName.length > 0 &&
                                                            programName[programName.map((i) => i.value).indexOf(userform?.fldProgram)]
                                                    }
                                                    required={true}
                                                    onChange={(e) => handleProgramChange(e, 'fldProgram')}
                                                    isMulti
                                                    options={programName}
                                                />
                                                {programRequired && <Form.Row className="d-flex text-danger t-3">{`*Job is required`}</Form.Row>}

                                            </Form.Group>

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldReference">Reference<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldReference"
                                                    id="fldReference"
                                                    placeholder="Reference"
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldReference}
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

                                            <Form.Group as={Col} md="6" style={{ display: isVendorCodeVisible ? 'block' : 'none' }}>
                                                <Form.Label htmlFor="fldVendorCode">
                                                    Vendor Code<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldVendorCode"
                                                    id="fldVendorCode"
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
                                                <Form.Label
                                                    htmlFor="fldVendorAddress"
                                                    style={{
                                                        fontSize: '0.7rem',
                                                        fontWeight: 'normal',
                                                        color: 'red',
                                                    }}
                                                >
                                                    <span className="text-danger">*Do not enter Area / City / Pincode / State in the Address*</span>
                                                </Form.Label>
                                            </Form.Group>


                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="fldAddress2">Address 2<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldAddress2"
                                                    id="fldAddress2"
                                                    placeholder="Address 2"
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
                                                    value={userform?.fldFKArea}
                                                    tableHeaderData={['area', 'city', 'country', 'state', 'pincode']}
                                                    tableDataKeyName={['area', 'city', 'country', 'state', 'pincode']}
                                                    isSimpleTable={true}
                                                    tableBodyData={areaList || []}
                                                    //onChange={(e) => handleAreaChange(e, 'select', 'fldFKArea')}
                                                    // onChange={(e) => handleAreaChange(e, 'fldFKArea')}
                                                    onChange={(e) => {
                                                        // selectedRow now contains the full row object
                                                        console.log(e, 'selected row'); // Log the selected row object for debugging
                                                        let ind = areaList.findIndex((ele) => ele.fldFKArea == e);
                                                        // Extract necessary fields from selectedRow
                                                        const selectedValue = e;
                                                        const selectedDescription = areaList[ind].fldArea;
                                                        const selectedCity = areaList[ind].fldCity;
                                                        const selectedState = areaList[ind].fldState;
                                                        const selectedPincode = areaList[ind].fldPincode;

                                                        // Call handleAreaChange for each field
                                                        handleAreaChange(selectedValue, 'select', 'fldFKArea'); // Save the full row object for fldFKArea
                                                        handleAreaChange(selectedDescription, 'select', 'fldArea'); // Save the area description
                                                        handleAreaChange(selectedState, 'select', 'fldState'); // Save the state
                                                        handleAreaChange(selectedCity, 'select', 'fldCity'); // Save the city
                                                        handleAreaChange(selectedPincode, 'select', 'fldPincode'); // Save the pincode
                                                    }}
                                                    isMultipleSelection={false}
                                                />
                                                {areaRequired && <Form.Row className="d-flex text-danger t-3">{`*Area is required`}</Form.Row>}
                                            </Form.Group> */}

                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="fldFKArea">
                                                    Area
                                                </Form.Label>
                                                <DropDownGrid
                                                    id="fldFKArea"
                                                    name="fldFKArea"
                                                    value={userform?.fldFKArea}
                                                    tableHeaderData={['area', 'city', 'country', 'pincode']}
                                                    tableDataKeyName={['area', 'city', 'country', 'pincode']}
                                                    isSimpleTable={true}
                                                    tableBodyData={areaList || []}
                                                    onChange={(selectedValue) => {
                                                        const selectedRow = areaList.find(row => row.fldId === selectedValue);
                                                        if (selectedRow) {
                                                            handleAreaChange(selectedRow, 'select', 'fldFKArea');
                                                        } else {
                                                            console.error('Selected row not found!');
                                                        }
                                                    }}
                                                    isMultipleSelection={false}
                                                />
                                                {areaRequired && <Form.Row className="d-flex text-danger t-3">{`*Area is required`}</Form.Row>}
                                            </Form.Group>



                                            <Form.Group as={Col} md="12">
                                                <Form.Label
                                                    htmlFor="fldVendorAddress"
                                                    style={{
                                                        fontSize: '0.7rem',
                                                        fontWeight: 'normal',
                                                        color: 'red',
                                                    }}
                                                >
                                                    <span className="text-danger">*If you don't find your required information directly enter below*</span></Form.Label>
                                            </Form.Group>

                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fldArea">Area</Form.Label>
                                                <TextInput
                                                    name="fldArea"
                                                    id="fldArea"
                                                    placeholder="Area"
                                                    autoComplete="off"
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
                                                    maxLength={15}
                                                    required
                                                    errorMessage={{
                                                        pattern: 'Only numeric values are allowed, maximum 15 digits are allowed'
                                                    }}
                                                    value={userform?.fldPincode}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>


                                            {/* <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fldState">State</Form.Label>
                                                <TextInput
                                                    name="fldState"
                                                    id="fldState"
                                                    placeholder="State"
                                                    autoComplete="off"
                                                    maxLength={100}
                                                    value={userform?.fldState}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group> */}

                                            <Form.Group as={Col} md="3">
                                                <Form.Label htmlFor="fldState">State <span className="text-danger">*</span></Form.Label>
                                                <Select
                                                    name="fldState"
                                                    id="fldState"
                                                    closeMenuOnSelect={true}
                                                    components={makeAnimated}
                                                    value={
                                                        // Check if stateOption is an array and find the matching option
                                                        Array.isArray(stateOption) && userform?.fldState
                                                            ? stateOption.find(option => option.value === userform?.fldState)
                                                            : null // If no match or empty, set to null
                                                    }
                                                    onChange={(e) => handleStateChange(e, 'fldState')}
                                                    options={stateOption}
                                                    isClearable={true}
                                                    required
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="12">
                                                <Form.Label htmlFor="fldGMap">G-Map</Form.Label>
                                                <TextInput
                                                    name="fldGMap"
                                                    id="fldGMap"
                                                    placeholder="G-Map"
                                                    autoComplete="off"
                                                    maxLength={500}
                                                    value={userform?.fldGMap}
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
                                                <Form.Label htmlFor="fldContactNameDepartment">Department<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldContactNameDepartment"
                                                    id="fldContactNameDepartment"
                                                    placeholder="Contact Name Department"
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldContactNameDepartment}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldEMail">E-Mail</Form.Label>
                                                <TextInput
                                                    name="fldEMail"
                                                    id="fldEMail"
                                                    placeholder="E-Mail"
                                                    // required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    type="email"
                                                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                                    value={userform?.fldEMail}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldContactEMailId" className="d-flex align-items-center">
                                                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'Highlight' }}>E-Mail(for account purpose)</span>
                                                    <Form.Check
                                                        type="checkbox"
                                                        // label="Same as E-Mail"
                                                        style={{ fontSize: '12px', fontWeight: 'bold', color: 'Highlight' }}
                                                        checked={checkboxChecked}
                                                        onChange={handleCheckboxChange}
                                                        className="ms-1" // Adds margin to the left for spacing
                                                    />
                                                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'Highlight' }}>Same as E-Mail</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldContactEMailId"
                                                    id="fldContactEMailId"
                                                    placeholder="E-Mail"
                                                    // required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    type="email"
                                                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                                    value={userform?.fldContactEMailId}
                                                    onChange={handleChange}
                                                />

                                            </Form.Group>


                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldContactNo">Contact Number 1<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldContactNo"
                                                    id="fldContactNo"
                                                    placeholder="Contact Number"
                                                    required
                                                    autoComplete="off"
                                                    pattern="^[0-9]{10}$"  // Updated pattern for exactly 10 digits
                                                    maxLength={10}         // Set maxLength to 10
                                                    errorMessage={{
                                                        pattern: 'Only numeric values are allowed, and exactly 10 digits are required.'
                                                    }}
                                                    value={userform?.fldContactNo}
                                                    onChange={e => {
                                                        const value = e.target.value;

                                                        // Allow only if the length is exactly 10 digits and numeric
                                                        if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                                                            handleChange(e); // Call your original handleChange
                                                        }
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldAdditionalContactNumber">Contact Number 2<span className="text-danger">*</span></Form.Label>
                                                <TextInput
                                                    name="fldAdditionalContactNumber"
                                                    id="fldAdditionalContactNumber"
                                                    placeholder="Contact Number"
                                                    autoComplete="off"
                                                    pattern="^[0-9]{10}$"  // Updated pattern for exactly 10 digits
                                                    maxLength={10}         // Set maxLength to 10
                                                    errorMessage={{
                                                        pattern: 'Only numeric values are allowed, and exactly 10 digits are required.'
                                                    }}
                                                    value={userform?.fldAdditionalContactNumber}
                                                    onChange={e => {
                                                        const value = e.target.value;

                                                        // Allow only if the length is exactly 10 digits and numeric
                                                        if (value.length <= 10 && /^[0-9]*$/.test(value)) {
                                                            handleChange(e); // Call your original handleChange
                                                        }
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group as={Col} md="6">
                                                <Form.Label htmlFor="fldFKPaymentTerms">Payment Terms</Form.Label>
                                                <SelectGroup
                                                    name="fldFKPaymentTerms"
                                                    id="fldFKPaymentTerms"
                                                    value={userform?.fldFKPaymentTerms}
                                                    // required={!userform?.fldFKPaymentTerms && true}
                                                    errorMessage="Please select Payment Terms"
                                                    onChange={handleChange}
                                                >
                                                    <option value="">--- Please select ---</option>
                                                    {paymentTerms?.length > 0 &&
                                                        paymentTerms?.map((item) => {
                                                            return (
                                                                <option key={item?.fldId} value={item?.fldId}>
                                                                    {item?.fldDescription}
                                                                </option>
                                                            );
                                                        })}
                                                </SelectGroup>
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

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                            {/* <Button variant="secondary">
                                <ArrowBackIcon />
                            </Button> */}
                            <Button type="submit" variant="primary">
                                <ArrowForwardIcon />
                            </Button>
                        </Box>

                        {/* <Box sx={{ textAlign: 'right' }}>
                            <Button type='submit' variant="primary" size="small">
                                <ArrowForwardIcon />
                            </Button>
                        </Box> */}

                    </Box>
                </Container>
            </ThemeProvider>
        </ValidationForm>
    )
}

export default Data