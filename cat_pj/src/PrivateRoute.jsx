import axios from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { api_url } from './baseurl.js'
import Waiting from "./components/admin/wating/Waiting"
import { useState } from 'react'

function GetUserInfo(){
    const user = localStorage.getItem("user")
    if (user) {
        return true
    }
    return false
}


const PrivateRoute = () => {

    const navigate = useNavigate()
    const user_info = GetUserInfo()
    const [waiting, setWaiting] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        axios.get(api_url + '/user/checkauth', {withCredentials: true})
            .then((response) => {
                if (response.data.success === 1){
                    setIsAuth(true)
                }
                window.setTimeout(() => {
                    setWaiting(true)
                }, 500)
            })
    },[])

    return (waiting) ? ((user_info && isAuth) ? (<Outlet />) : (navigate('/meowadmin/login'))) : (<Waiting />)

}

export default PrivateRoute