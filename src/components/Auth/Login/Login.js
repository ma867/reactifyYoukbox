import '../../../components/Homepage/Banner/Banner.scss'
import './Login.scss'
import * as userService from '../../../utilities/users-service'

import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { text } from '@fortawesome/fontawesome-svg-core'

export default function LoginForm({ setVisible, setUser }) {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    setError('')
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const user = await userService.login(credentials)
      setUser(user)
      navigate('/')
    } catch (error) {
      setError(error.messsage)
    }
  }
  return (
    <>

      <Container fluid style={{ backgroundColor: 'yellow' }} className='w-100 vh-100'>
        <Row>
          <Col lg={6} className='full-height flex banner-image justify-content-center align-items-center text-center'>
            <h2 className='title light display-3'>Oh<span className='b-className-secondary'> hello! 👋 </span><br />We missed you! </h2><br />

          </Col>
          <Col lg={6} className='full-height flex justify-content-center align-items-center light-background'>

            <Form autoComplete='off' onSubmit={handleSubmit} style={{ width: '500px' }}>
              <h1 className='pb-3'>Login</h1>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control className='login-input' type='email' name='email' onChange={handleChange} value={credentials.email} placeholder='Enter email' />

              </Form.Group>

              <Form.Group className='mb-3 pb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control className='login-input' type='password' name='password' onChange={handleChange} value={credentials.password} placeholder='Password' />
              </Form.Group>
              <Button variant='primary' type='submit' className='action'>
                Submit
              </Button>
              <br />
              <div className='text-center'>
                <a onClick={() => { setVisible('signup') }} className='small text-center'>Don't have an account? Sign up!</a>

              </div>
            </Form>

          </Col>
        </Row>
      </Container>

    </>
  )
}
