import React, { useState } from 'react'
import "./reset.css"
import Swal from 'sweetalert2'
import axios from 'axios'
import { api_url } from '../../../baseurl'


export default function Reset() {

  const [OldPassword, setOldPassword] = useState("")
  const [NewPassword, setNewPassword] = useState("")
  const [CfNewPassword, setCfNewPassword] = useState("")

  const handle_form = async (e) => {

    e.preventDefault()

    if (NewPassword === CfNewPassword){
      
      const data = {
        current_password: OldPassword,
        new_password: NewPassword,
        id: localStorage.getItem('user')
      }

      axios.put(api_url + '/user/reset_password', data)
        .then((response) => {
          if (response.status === 200 ){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Reset successfully',
              showConfirmButton: false,
              heightAuto: false,
              timer: 1500
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
        })
        .catch((error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Please match the password',
            showConfirmButton: false,
            heightAuto: false,
            timer: 1500
          })
        })

    }

  }

  return (
    <div className="reset">
      <div className="path-container">
        <h4>Reset</h4>
        <p>
          <span>Home </span>
          /
          <span> Reset password</span>
        </p>
      </div>
      <div className="user-form">
        <form onSubmit={handle_form} autoComplete="off" className="sign-in-form">
          <div className="input-field">
            <label htmlFor="title">Current Password</label>
            <input value={OldPassword} type="password" onChange={(e) => setOldPassword(e.target.value)} required />
          </div>
          <div className="input-field">
            <label htmlFor="title">New Password</label>
            <input value={NewPassword} type="password" onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div className="input-field">
            <label htmlFor="title">Confirm Password</label>
            <input value={CfNewPassword} type="password" onChange={(e) => setCfNewPassword(e.target.value)} required />
          </div>
          <button>Reset</button>
        </form>
      </div>
    </div>
  )
}
