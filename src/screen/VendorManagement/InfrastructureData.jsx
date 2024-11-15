import { Box, Container, CssBaseline, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/styles'
import React from 'react'
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const InfrastructureData = ({ handleErrorSubmit, handleChange, userform, prevStep, handleSubmit, handleAddClick, showTable, handleDelete }) => {

    console.log(userform, 'userform')

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        handleSubmit(userform);
    }

    return (
        <ValidationForm onSubmit={handleFinalSubmit} onErrorSubmit={handleErrorSubmit}>
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
                        margin: '0',
                        // borderRadius: '15px',
                        padding: 3,
                    }}
                >
                    <CssBaseline />
                    <Box style={{ width: '950px', margin: '0 auto', justifyContent: 'center', height: '100vh' }}>


                        {userform?.fldProgram === 'KNITTING DC' && (
                            <>
                                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                    Machine Information
                                </Typography>

                                <Row>
                                    <Col xl={12} md={12}>
                                        <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                            <Card.Body>
                                                <Row className="d-flex align-items-center">
                                                    <Form.Group as={Col} md="6" controlId="fldMachineDetails">
                                                        <Form.Label>
                                                            Machine Details<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldMachineDetails"
                                                            placeholder='Machine Details'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldMachineDetails}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldNoOfMachine">
                                                        <Form.Label>
                                                            No of Machine<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldNoOfMachine"
                                                            placeholder='No of Machine'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldNoOfMachine}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldDiaDetails">
                                                        <Form.Label>
                                                            Dia Details<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldDiaDetails"
                                                            placeholder='Dia Details'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldDiaDetails}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldGaugeDetail">
                                                        <Form.Label>
                                                            Gauge Details<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldGaugeDetail"
                                                            placeholder='Gauge Details'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldGaugeDetail}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        )}


                        {userform?.fldProgram === 'HEAT SETTING' ? (
                            <>
                                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                    Machine Information
                                </Typography>

                                <Row>
                                    <Col xl={12} md={12}>
                                        <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                            <Card.Body>
                                                <Row className="d-flex align-items-center">
                                                    <Form.Group as={Col} md="6" controlId="fldMachineDetails">
                                                        <Form.Label>
                                                            Machine Details<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldMachineDetails"
                                                            placeholder='Machine Details'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldMachineDetails}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldNoOfMachine">
                                                        <Form.Label>
                                                            No of Machine<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldNoOfMachine"
                                                            placeholder='No of Machine'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldNoOfMachine}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        ) : ('')}

                        {userform?.fldProgram === 'STENTER' ? (
                            <>
                                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                    Machine Information
                                </Typography>

                                <Row>
                                    <Col xl={12} md={12}>
                                        <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                            <Card.Body>
                                                <Row className="d-flex align-items-center">
                                                    <Form.Group as={Col} md="6" controlId="fldMachineDetails">
                                                        <Form.Label>
                                                            Machine Details<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldMachineDetails"
                                                            placeholder='Machine Details'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldMachineDetails}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldNoOfMachine">
                                                        <Form.Label>
                                                            No of Machine<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldNoOfMachine"
                                                            placeholder='No of Machine'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldNoOfMachine}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        ) : ('')}

                        {userform?.fldProgram === 'DYEING DC' ? (
                            <>
                                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                    Machine Information
                                </Typography>

                                <Row>
                                    <Col xl={12} md={12}>
                                        <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                            <Card.Body>
                                                <Button
                                                    variant="primary"
                                                    onClick={handleAddClick}
                                                    style={{ marginBottom: '1rem' }}
                                                >
                                                    {showTable ? 'Hide Table' : 'Add Table'}
                                                </Button>

                                                <Row className="d-flex align-items-center">
                                                    <Form.Group as={Col} md="6" controlId="fldVessalCapasity">
                                                        <Form.Label>
                                                            Vessel Capacity<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldVessalCapasity"
                                                            placeholder="Vessel Capacity"
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldVessalCapasity}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldNoOfVessal">
                                                        <Form.Label>
                                                            No of Vessel<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldNoOfVessal"
                                                            placeholder="No of Vessel"
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldNoOfVessal}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldSampleVesselCapacity">
                                                        <Form.Label>
                                                            Sample Vessel Capacity<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldSampleVesselCapacity"
                                                            placeholder="Sample Vessel Capacity"
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldSampleVesselCapacity}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldNoOfSampleVessel">
                                                        <Form.Label>
                                                            No of Sample Vessel<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldNoOfSampleVessel"
                                                            placeholder="No of Sample Vessel"
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldNoOfSampleVessel}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Row>

                                                {showTable && (
                                                    <Table striped bordered hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Vessel Capacity</th>
                                                                <th>No of Vessel</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>{userform.fldVessalCapasity}</td>
                                                                <td>{userform.fldNoOfVessal}</td>

                                                            </tr>
                                                        </tbody>
                                                    </Table>
                                                )}

                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        ) : null}

                        {userform?.fldProgram === 'BLEACHING DC' ? (
                            <>
                                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                    Machine Information
                                </Typography>

                                <Row>
                                    <Col xl={12} md={12}>
                                        <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                            <Card.Body>
                                                <Row className="d-flex align-items-center">
                                                    <Form.Group as={Col} md="6" controlId="fldVessalCapasity">
                                                        <Form.Label>
                                                            Vessel Capasity<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldVessalCapasity"
                                                            placeholder='Vessel Capasity'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldVessalCapasity}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldNoOfVessal">
                                                        <Form.Label>
                                                            No of Vessel<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldNoOfVessal"
                                                            placeholder='No of Vessel'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldNoOfVessal}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldSampleVesselCapacity">
                                                        <Form.Label>
                                                            Sample Vessel Capasity<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldSampleVesselCapacity"
                                                            placeholder='Sample Vessel Capasity'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldSampleVesselCapacity}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldNoOfSampleVessel">
                                                        <Form.Label>
                                                            No of Sample Vessel<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldNoOfSampleVessel"
                                                            placeholder='No of Sample Vessel'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldNoOfSampleVessel}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        ) : ('')}

                        {userform?.fldProgram === 'WASHING DC' ? (
                            <>
                                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                    Machine Information
                                </Typography>

                                <Row>
                                    <Col xl={12} md={12}>
                                        <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                            <Card.Body>
                                                <Row className="d-flex align-items-center">
                                                    <Form.Group as={Col} md="6" controlId="fldVessalCapasity">
                                                        <Form.Label>
                                                            Vessel Capasity<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldVessalCapasity"
                                                            placeholder='Vessel Capasity'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldVessalCapasity}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md="6" controlId="fldNoOfVessal">
                                                        <Form.Label>
                                                            No of Vessel<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldNoOfVessal"
                                                            placeholder='No of Vessel'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldNoOfVessal}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        ) : ('')}

                        {userform?.fldProgram === 'TUBULAR COMPACTING' ? (
                            <>
                                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                                    Machine Information
                                </Typography>

                                <Row>
                                    <Col xl={12} md={12}>
                                        <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                            <Card.Body>
                                                <Row className="d-flex align-items-center">

                                                    <Form.Group as={Col} md="6" controlId="fldNoOfMachine">
                                                        <Form.Label>
                                                            No of Machine<span className="text-danger">*</span>
                                                        </Form.Label>
                                                        <TextInput
                                                            name="fldNoOfMachine"
                                                            placeholder='No of Machine'
                                                            required
                                                            autoComplete="off"
                                                            maxLength={50}
                                                            value={userform?.fldNoOfMachine}
                                                            onChange={handleChange}
                                                        />
                                                    </Form.Group>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </>
                        ) : ('')}
                        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                            Capacity
                        </Typography>
                        <Row>
                            <Col xl={12} md={12}>
                                <Card style={{ borderRadius: '15px', marginBottom: '1rem' }}>
                                    <Card.Body>
                                        <Row className="d-flex align-items-center">
                                            <Form.Group as={Col} md="6" controlId="fldProductionCapacityPerWeek">
                                                <Form.Label>
                                                    Production Capacity Per Week<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldProductionCapacityPerWeek"
                                                    placeholder='Production Capacity Per Week'
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldProductionCapacityPerWeek}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="fldTeamStrength">
                                                <Form.Label>
                                                    Team Strength<span className="text-danger">*</span>
                                                </Form.Label>
                                                <TextInput
                                                    name="fldTeamStrength"
                                                    placeholder='Team Strength'
                                                    required
                                                    autoComplete="off"
                                                    maxLength={50}
                                                    value={userform?.fldTeamStrength}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                        </Row>


                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        {/* </Row>


                </Card.Body>
            </Card>
        </Col>
                        </Row > */}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button onClick={prevStep} variant="secondary">
                                <ArrowBackIcon />
                            </Button>
                            <Button type='submit' variant="success">Submit</Button>
                        </Box>
                    </Box >
                </Container >
            </ThemeProvider >
        </ValidationForm >
    )
}

export default InfrastructureData