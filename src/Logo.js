import React, { useRef, useState } from "react"
import './Logo.css'
import { Link, useHistory } from "react-router-dom"

import logo from './logo.png'

export default function Logo() {
  
  return (
    
    <div className="Logo__and__slogan">
        <div className="Logo__complete">
            <Link to='/'><img className="Logo__png" src={logo}/></Link>
            <h1 className="Logo__name">fileShip</h1>
        </div>
        <p className="Slogan">Created by AZGhari and AJAM</p>
    </div>
  )
}
