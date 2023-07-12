import React, { useEffect, useState } from 'react'
import "./news.css"
import Topbar from '../../../components/admin/topbar/Topbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Article from '../../../components/admin/article/Article'
import { useDispatch } from 'react-redux'
import { close_nav } from '../../../redux/index'

export default function AdminArticle() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(close_nav())
  }, [])

  return (
    <>
        <div className="adminarticle">
            <Topbar />
            <div className="main-content">
              <Sidebar type="article" />
              <Article />
            </div>
        </div>
    </>
  )
}
