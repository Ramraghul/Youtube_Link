import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Portal() {
  return (
    <>
    <Navbar/>
    <div className='mt-5 ms-2 me-2'>
    <Outlet/>
    </div>
    </>
  )
}

export default Portal