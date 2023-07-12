import React, { useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import { api_url } from '../../../baseurl.js'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Waiting from '../../../components/admin/wating/Waiting'

export default function Login() {

    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [waiting, setWaiting] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const user_info = localStorage.getItem("user")

    useEffect(() => {
        axios.get(api_url + '/user/checkauth', { withCredentials: true })
            .then((response) => {
                if (response.data.success === 1) {
                    setIsAuth(true)
                }
                window.setTimeout(() => {
                    setWaiting(true)
                }, 500)
            })
    }, [])

    const login = async (e) => {
        e.preventDefault()

        const data = {
            identify: email.current.value,
            password: password.current.value
        }

        await axios.post(api_url + '/user/login', data, { withCredentials: true })
            .then((response) => {
                if (response.status === 200 && response.data.success === 1) {
                    localStorage.setItem('user', JSON.stringify(response.data.id))
                    navigate('/meowadmin/home')
                }
            })

    }

    return (
        (waiting) ? ((user_info && isAuth) ? (
            navigate('/meowadmin/home')
        ) : (
            <div className="login">
                <section className="bg-gray-50 dark:bg-gray-900 h-[100vh] flex justify-center">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            MewoAdmin
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Sign in to your account
                                </h1>
                                <form className="space-y-4 md:space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" ref={email} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" id="password" ref={password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                            </div>
                                        </div>
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                    </div>
                                    <button type="submit" onClick={login} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        This system is using advanced standard encryption
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )) : (<Waiting />)

    )
}
