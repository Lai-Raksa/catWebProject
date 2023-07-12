import React, { useEffect } from 'react'
import Topbar from '../../../components/admin/topbar/Topbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Reset from '../../../components/admin/reset/Reset'
import './reset.css'
import { useDispatch } from 'react-redux'
import { close_nav } from '../../../redux'

export default function AdminRegister() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(close_nav())
  },[])
  return (
    <div className="adminreset">
        <Topbar />
        <div className="main-content">
            <Sidebar type="reset" />
            <Reset />
        </div>
    </div>
  )
}
