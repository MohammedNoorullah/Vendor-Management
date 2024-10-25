import { Box, Container, CssBaseline, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/styles'
import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { TextInput, ValidationForm } from 'react-bootstrap4-form-validation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const InfrastructureData = ({ handleErrorSubmit, handleChange, userform, prevStep, handleSubmit }) => {

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
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button onClick={prevStep} variant="secondary">
                                <ArrowBackIcon />
                            </Button>
                            <Button type='submit' variant="success">Submit</Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </ValidationForm>
    )
}

export default InfrastructureData