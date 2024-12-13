import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-[40vh] p-20 grid grid-cols-12 bg-white text-black'>
      <div className='col-span-6'>
        <div className='flex gap-3 items-center'>
          <img 
            className='h-12 w-12 rounded-full grayscale' 
            src="https://framerusercontent.com/images/dvrschHGP374SPK1HpDjWPcdFEk.png?scale-down-to=512" 
            alt="Profile" 
          />
          <span className='text-lg font-semibold'>Pritam</span>
        </div>
        <div className='mt-4'>
          <span className='text-gray-800 font-medium'>Where productivity meets minimalism.</span>
        </div>
      </div>
      <div className='col-span-6'>
        <div className='text-xl font-bold mb-4 border-b border-black pb-2'>Links</div>
        <div className='flex flex-col space-y-2'>
          <a 
            href="#" 
            className='text-gray-700 hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black'
          >
            About
          </a>
          <a 
            href="#" 
            className='text-gray-700 hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black'
          >
            Projects
          </a>
          <a 
            href="#" 
            className='text-gray-700 hover:text-black transition-colors duration-300 border-b border-transparent hover:border-black'
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
