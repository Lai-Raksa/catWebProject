
import React, { useState } from 'react'
import "./register.css"

import Swal from 'sweetalert2'
import axios from 'axios'
import { api_url } from '../../../baseurl'

export default function Register() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [cfpassword, setCfpassword] = useState("")

  const handle_form = async (e) => {
    e.preventDefault()

    const data = {email: email.toLowerCase(), username: username.toLowerCase(), password}

    if (password === cfpassword){
      axios.post(api_url + '/user/register', data )
        .then((response) => {

            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Register successfully',
              showConfirmButton: false,
              heightAuto: false,
              timer: 1500
            })

        })
        .catch(() => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Register failed',
            showConfirmButton: false,
            heightAuto: false,
            timer: 1500
          })
        })
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Please match the password',
        showConfirmButton: false,
        heightAuto: false,
        timer: 1500
      })
    }

  }

  return (
    <div className="register">
      <div className="path-container">
        <h4>Register</h4>
        <p>
          <span>Home </span>
          /
          <span> Create user</span>
        </p>
      </div>
      <div className="user-form">
        <form onSubmit={handle_form} autoComplete="off" className="sign-in-form">
          <div className="input-field">
            <label htmlFor="title">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-field">
            <label htmlFor="title">Email</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-field">
            <label htmlFor="title">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="input-field">
            <label htmlFor="title">Confirm Password</label>
            <input type="password" value={cfpassword} onChange={(e) => setCfpassword(e.target.value)} required />
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  )
}
