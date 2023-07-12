import React, { useEffect } from 'react'
import Topbar from '../../../components/admin/topbar/Topbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Register from '../../../components/admin/register/Register'
import './register.css'
import { useDispatch } from 'react-redux'
import { close_nav } from '../../../redux'

export default function AdminRegister() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(close_nav())
  },[])
  return (
    <div className="adminregister">
        <Topbar />
        <div className="main-content">
            <Sidebar type="register" />
            <Register />
        </div>
    </div>
  )
}
