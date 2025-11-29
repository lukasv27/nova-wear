import React from 'react'
import { Outlet } from 'react-router'

const LoginPage = () => {
  return (
    <div  className="space-y-4">
        <Outlet/>

    </div>
  )
}

export default LoginPage
