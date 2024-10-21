import React from 'react'
import SigninButton from './SigninButton'
import Logo from '../Logo'
import NavLinks from './NavLinks'

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-10 grid h-12 grid-cols-[1fr_9rem_1fr] bg-white pb-2">
      <div className="flex h-full items-end justify-start">
        <NavLinks />
      </div>
      <div className="flex h-full items-end justify-center">
        <Logo />
      </div>
      <div className="flex h-full items-end justify-end">
        <SigninButton />
      </div>
    </nav>
  )
}

export default NavBar
