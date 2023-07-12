import React, { useEffect } from 'react'
import "./edit.css"
import Topbar from '../../../components/admin/topbar/Topbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Edit from '../../../components/admin/edit/Edit'
import { useDispatch } from 'react-redux'
import { close_nav } from '../../../redux/index'

export default function Create() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(close_nav())
  }, [])

  return (
    <>
        <div className="admincreate">
            <Topbar />
            <div className="main-content">
                <Sidebar type="create_ar" />
                <Edit />
            </div>
        </div>
    </>
  )
}
