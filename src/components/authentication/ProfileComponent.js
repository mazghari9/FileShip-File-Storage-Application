import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthenticationContexts"
import { Link, useHistory } from "react-router-dom"
import { Container } from "react-bootstrap"
import Logo from '../../Logo'
import './Style.css'


export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
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
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <img alt="profile picture" src={currentUser.photoURL} /><br></br><br></br>
          <strong>Username:</strong> {currentUser.displayName}<br></br>
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      <br></br>
        <Button  onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
    </Container>
  )
}
