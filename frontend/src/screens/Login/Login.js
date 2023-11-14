import React, { useState } from 'react'
import MainScreen from '../../components/MainScreen/MainScreen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import Loading from '../../components/Loading/loading'
import ErrorMessage from '../../components/ErrorMessage/errorMessage'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState(false);
    const [loading, setloading] = useState(false);

    const SubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            setloading(true)
            const { data } = await axios.post('/api/users/login', {
                email,
                password,
            },
                config
            );
            console.log(data);

            localStorage.setItem('userInfo',JSON.stringify(data))
            setloading(false)
        } catch (error) {
            seterror(error.response.data.message)
            setloading(false)
        }
    }


    return (
        <MainScreen title={`LOGIN`} >
            <div className='loginConatiner'>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={SubmitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        New Cutomer ? <Link to='/signup' style={{ textDecoration: 'none' }}>Register Here</Link>
                    </Col>
                </Row>
            </div>

        </MainScreen>
    )
}

export default Login
