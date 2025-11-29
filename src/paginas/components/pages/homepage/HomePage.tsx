import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import { Outlet } from 'react-router'

const HomePage = () => {
  return (
    <div>
      <HomeLayout/>
      <Outlet/>
    </div>
  )
}

export default HomePage
