import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthenticationContexts"
import { Link } from "react-router-dom"
import { Container } from "react-bootstrap"
import Logo from '../../Logo'
import './Style.css'


export default function ForgotPassword() {
  const emailRef = useRef()
  const {resetPwd} = useAuth()
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setMsg("")
      setError("")
      setLoading(true)
      await resetPwd(emailRef.current.value)
      setMsg("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {msg && <Alert variant="success">{msg}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <br></br>
            <Button disabled={loading} className="w-50 SubButton" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        You have no account? <Link to="/signup">Sign Up</Link>
      </div>
      </div>
    </Container>
  )
}
