import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FTopbar() {

  const navigate = useNavigate()

  return (
    <header>
      <div className="headContainer">
        <div className="logo">
          <img src="./logo.png" />
        </div>
        <div className="stDivNav">
          <ul role="list" className="stList">
            <li onClick={() => {navigate('/')}}>HOME</li>
            <li onClick={() => {navigate('/story')}}>STORY</li>
            <li onClick={() => {navigate('/news')}}>NEWS</li>
            <li onClick={() => {navigate('/cute')}}>CUTE</li>
            <li onClick={() => {navigate('/rescue')}}>RESCUE</li>
          </ul>
        </div>
        <div className="hamburger">
          <span className="bar"> </span>
          <span className="bar"> </span>
          <span className="bar"> </span>
        </div>
      </div>
    </header>
  )
}
