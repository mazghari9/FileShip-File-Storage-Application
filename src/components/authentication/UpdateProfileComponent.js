import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthenticationContexts"
import { Link, useHistory } from "react-router-dom"
import { Container } from "react-bootstrap"
import Logo from '../../Logo'
import './Style.css'


export default function UpdateProfile() {
  const emailRef = useRef()
  const pwdRef = useRef()
  const ConfirmpwdRef = useRef()
  const { currentUser, updatePwd, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (pwdRef.current.value !== ConfirmpwdRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (pwdRef.current.value) {
      promises.push(updatePwd(pwdRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
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
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={pwdRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={ConfirmpwdRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <br></br>
            <Button disabled={loading} className="w-50 SubButton" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
      </div>
    </Container>
  )
}
