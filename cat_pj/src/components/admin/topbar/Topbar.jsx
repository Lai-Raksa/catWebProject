import React, { useEffect, useLayoutEffect, useState } from 'react'
import "./topbar.css"
import { open_nav, close_nav } from '../../../redux/index'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


export default function Topbar() {

    const navigate = useNavigate()

    const [navbar, setNavbar] = useState(true)

    const dispatch = useDispatch()

    function handleNavbar(){
        
        if ( navbar === true )
            dispatch(open_nav())
        else 
            dispatch(close_nav())

        setNavbar(!navbar)
    }

  return (
    <div className='topbar'>
        <div className="left-side">
            <div className="logo-container" onClick={() => navigate('/cbs/admin/home')}>
                {/* <img src="" /> */}
                <p>WorldMeow</p>
            </div>
            <i className="hamburger" onClick={ () => handleNavbar() }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </i>
        </div>
        <div className="right-side">
            <div className="logo-container" onClick={ () => navigate('/cbs/admin/profile')}>
                <img  />
                <p>MEOW ADMIN</p>
            </div>
        </div>
    </div>
  )
}
