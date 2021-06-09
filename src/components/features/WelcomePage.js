import React from 'react'
import Navbar from './NavbarComponent'
import {Container} from "react-bootstrap"
import { database } from "../../firebase"
import avatar from '../../avatar.jpg'
import './WelcomePage.css'

export default function WelcomePage() {
    
    return (
        <div>
            <Navbar/>
            <Container fluid className="welcome__container">
                <img className="avatar" src={avatar}/> 
                <div className="welcome__slogan">
                    <h4 >Host and Manage your files easily with FileShip cloud solution</h4>
                    <p>© By AZGhari & AJAM</p>
                </div>
            </Container>
        </div>
    )
}
