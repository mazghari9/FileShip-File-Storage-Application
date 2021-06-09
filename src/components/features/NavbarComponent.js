import React, { useState } from 'react'
import './navbar.css'
import * as bootstrp from  'react-bootstrap'
import logo from '../../logo.png'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthenticationContexts"
import firebase from "firebase"



export default function NavbarComponent() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const Login="Log In"

    const MyProfile="My Profile"

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
        <div className="EntierNavBar">
            <bootstrp.Navbar collapseOnSelect expand="lg" className="navB" variant="light" >
                <bootstrp.Navbar.Brand href="/" className="navbar__brand">F i l e S h i p</bootstrp.Navbar.Brand>
                <bootstrp.Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <bootstrp.Navbar.Collapse id="responsive-navbar-nav">
                    <bootstrp.Nav className="mr-auto navbar_logo">
                        <bootstrp.Nav.Link href="/" className="header-option"><img className="Logo__png" src={logo}/></bootstrp.Nav.Link>
                    </bootstrp.Nav>
                    <bootstrp.Nav className="mr-auto files">
                        <bootstrp.Nav.Link href="/files">My Files</bootstrp.Nav.Link>
                    </bootstrp.Nav>
                    <bootstrp.Nav className="mr-auto profile">
                        <bootstrp.Nav.Link href="/user">{currentUser?(currentUser.displayName?(currentUser.displayName):(MyProfile)):(Login)}</bootstrp.Nav.Link>
                    </bootstrp.Nav>
                </bootstrp.Navbar.Collapse>
            </bootstrp.Navbar>
        </div>
    )
}
