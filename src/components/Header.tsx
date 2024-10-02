import React from 'react'
import Link from 'next/link'

function Header() {
  return (
    <div className='bg-purple-800 flex justify-between text-white w-full p-5 sticky'>
        <div>
            <h1 className='text-2xl'>LOGO</h1>
        </div>
        <div>
            <ul className='flex flex-row items-center space-x-7'>
                <li>
                    <Link href={"/home"}>Home</Link>
                </li>
                <li>
                    <Link href={"/about"}>About</Link>
                </li>
                <li>
                    <Link href={"/services"}>Services</Link>
                </li>
                    
            </ul>
        </div>
        <div>
            <button><Link href={"/contact"}>Contact Us</Link></button>
        </div>
    </div>
  )
}

export default Header