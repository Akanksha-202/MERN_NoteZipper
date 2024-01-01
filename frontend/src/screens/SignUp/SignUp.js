import React, { useState } from 'react'
import MainScreen from '../../components/MainScreen/MainScreen'
import '../Login/Login.css'
import ErrorMessage from '../../components/ErrorMessage/errorMessage'
import Loading from '../../components/Loading/loading'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
    const [error, seterror] = useState(false);
    const [loading, setloading] = useState(false);
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);


    const postDetails = (pics) => {
        if (!pics) {
            return setPicMessage("Please select an Image");
        }
        setPicMessage(null);
        setUploadingImage(true); // Set the state to indicate image upload is in progress
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics)
            data.append('upload_preset', 'Notezipper')
            data.append('cloud_name', 'damtnzoo8')
            fetch("https://api.cloudinary.com/v1_1/damtnzoo8/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPic(data.url.toString());
                    setUploadingImage(false); // Set state to indicate image upload is done
                })
                .catch((err) => {
                    console.log(err);
                    setUploadingImage(false); // Handle error and set state accordingly
                });
        } else {
            setUploadingImage(false); // Set state to indicate upload is done due to incorrect file type
            return setPicMessage("Please select an Image");
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            setMessage('Passwords do not match')
        } else {

            setMessage(null)

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json"
                    }
                }
                setloading(true)
                const { data } = await axios.post('/api/users', {
                    name,
                    email,
                    password,
                    pic,
                },
                    config
                );
                console.log(data);

                setloading(false)
                localStorage.setItem('userInfo', JSON.stringify(data))
            } catch (error) {
                seterror(error.response.data.message)
                setloading(false)
            }

        }

    }

    return (
        <MainScreen title={`REGISTER`}>
            <div className='loginConatiner'>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

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

                    <Form.Group className="mb-3" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    {picMessage && (
                        <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
                    )}

                    <Form.Group className="mb-3" controlId="pic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            onChange={(e) => postDetails(e.target.files[0])}
                            type="file"
                        />
                    </Form.Group>


                    <Button variant="primary" type="submit" disabled={uploadingImage || loading}>
                        {uploadingImage ? 'Uploading...' : 'Submit'}
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        Have an Account ? <Link to='/login' style={{ textDecoration: 'none' }}>Login Here</Link>
                    </Col>
                </Row>
            </div>

        </MainScreen>
    )
}

export default SignUp
