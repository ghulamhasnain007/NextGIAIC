import React from 'react';
import desk from "../../../public/desk.png";
import Image from 'next/image';

function Profile() {
  return (
    <div className='flex justify-evenly mt-5'>
       <div className='flex justify-center items-center'>
        <div className='p-5 text-center pt-10 space-y-3'> 
            <h3 className='text-2xl'>HELLO THERE!</h3>
            <h2 className='text-3xl font-semibold'>I&apos;m GHULAM HASNAIN</h2>
            <h1 className='text-4xl font-bold'>Next JS Developer</h1>
        </div>
       </div>
        <div className='w-[500px]'>
            <Image
                src={desk}
                alt = "desk"
             />
        </div>
    </div>
  )
}

export default Profile


