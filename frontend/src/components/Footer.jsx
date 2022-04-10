import React from 'react'

function Footer() {
  return (
    <div className='flex flex-col w-full border-2 border-black bg-black text-white md:absolute md:left-0 md:bottom-0 md:right-0'>
        <span>Copyright © 2022 Task Tracker</span>
        <span>Built using MERN stack and Tailwind</span>
        <span>By Christian Belino</span>
    </div>
  )
}

export default Footer