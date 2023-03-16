import { useState } from 'react'
import { signUp } from '../../../utilities/users-service'
import { useNavigate } from 'react-router-dom'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { Uploader } from 'uploader'
import { UploadButton } from 'react-uploader'

export default function SignUpForm({ setVisible, setUser }) {
  const navigate = useNavigate()
  const [image, setImage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''

  })
  const [error, setError] = useState('')

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
    setError('')
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const formDataCopy = { ...formData, image: image }
      delete formDataCopy.confirm
      const user = await signUp(formDataCopy)
      setUser(user)
      navigate('/')
    } catch (error) {
      setError('Sign up failed. Username and/or email address may already be in use. ')
    }
  }

  const uploader = Uploader({
    apiKey: 'free' // Get production API keys from Upload.io
  })

  const options = {
    multi: false,
    maxFileCount: 1,
    editor: {
      images: {
        crop: true,
        cropShape: 'circ', // "rect" also supported.
        cropRatio: 1 / 1 // "1" is enforced for "circ".
      }
    }
  }

  const uploadFile = () => {
    uploader.open(options)
      .then((file) => {
        file
          ? setImage(file[0].fileUrl)
          : setImage('')
      }
      )
  }
  return (
    <>

      <Container fluid style={{ backgroundColor: 'yellow' }} className='w-100 vh-100'>
        <Row>
          <Col lg={6} className='full-height flex banner-image justify-content-center align-items-center text-center'>
            <h2 className='title light display-3'>Welcome!<span className='b-className-secondary'>  </span><br />We're happy to have you! 😊 </h2><br />

          </Col>
          <Col lg={6} className='full-height flex justify-content-center align-items-center light-background'>

            <Form autoComplete='off' onSubmit={handleSubmit} style={{ width: '500px' }}>
              <h1 className='pb-3'>Submit</h1>

              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Name address</Form.Label>
                <Form.Control className='login-input' type='text' name='name' onChange={handleChange} value={formData.name} placeholder='Enter name' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control className='login-input' type='email' name='email' onChange={handleChange} value={formData.email} placeholder='Enter email' />
              </Form.Group>

              <Form.Group className='mb-3 pb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control className='login-input' type='password' name='password' onChange={handleChange} value={formData.password} placeholder='Password' />
              </Form.Group>
              <Form.Group className='mb-3 pb-3' controlId='formBasicPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control className='login-input' type='password' name='confirm' onChange={handleChange} value={formData.confirm} placeholder='Password' />
              </Form.Group>

              <UploadButton uploader={uploader} options={options} onComplete={(files) => setImage(files.map((x) => x.fileUrl).join('\n'))}>
                {({ onClick }) => (<Button className='action' onClick={onClick}>Upload a Profile Photo</Button>)}
              </UploadButton>
              <br />
              <Button variant='primary' type='submit' className='action'>
                Submit
              </Button>
              <br />
              <div className='text-center'>
                <a onClick={() => { setVisible('login') }} className='small'>Don't have an account? Log in!</a>
              </div>
            </Form>

          </Col>
        </Row>
      </Container>
    </>
  )
}
