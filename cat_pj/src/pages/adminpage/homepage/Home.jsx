import React, { useEffect } from 'react'
import "./home.css"
import Topbar from '../../../components/admin/topbar/Topbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Dashboard from '../../../components/admin/dashboard/Dashboard'
import { close_nav } from '../../../redux'
import { useDispatch } from 'react-redux'

export default function Home(props) {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(close_nav())
  }, [])

  return (
    <>
        <div className="adminhome">
            <Topbar />
            <div className="main-content">
              <Sidebar type="dashboard" />
              <Dashboard />
            </div>
        </div>
    </>
  )
}
