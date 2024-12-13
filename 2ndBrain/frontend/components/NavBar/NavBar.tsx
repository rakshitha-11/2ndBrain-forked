import React from 'react'

const NavBar = () => {
  return (
    <div className='fixed z-[100] grid grid-cols-12 w-full p-4 backdrop-blur'>
      <div className='col-span-6 flex items-center gap-2'>
        <img className='w-10' src="https://framerusercontent.com/images/gOjpYwlv6lMmK8TUtJgP8TEsEKE.png" alt="" />
        <h1 className='text-2xl font-semibold tracking-normal'>Second Brain</h1>
      </div>
      <div className='col-span-6 flex items-center justify-end gap-5'>
        <span className='font-black'>Home</span>
        <span className='font-black'>Profile</span>
        <span className='font-black'>Overview</span>
        <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex tracking-widest h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                SignUp
            </span>
        </button>
      </div>
    </div>
  )
}

export default NavBar
