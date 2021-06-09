import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthenticationContexts"
import { Link, useHistory } from "react-router-dom"
import { Container } from "react-bootstrap"
import Logo from '../../Logo'
import './Style.css'
import OtherRegestrationMethods from './OtherRegestrationMethods'


export default function Login() {
  const emailRef = useRef()
  const pwdRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, pwdRef.current.value)
      history.push("/files")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  return (
    <Container
      className="all d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Logo/>
      <div className="w-100 board" style={{ maxWidth: "500px" }}>
      <div className="RegisterMethodes">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={pwdRef} required />
            </Form.Group>
            <br></br>
            <Button disabled={loading} className="w-50 SubButton" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <OtherRegestrationMethods to="/files"></OtherRegestrationMethods>
      </div>
      <div className="w-100 text-center mt-2">
        You don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
      </div>
    </Container>
  )
}
