import { useAppContext } from 'context/appContext'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { useToggle } from 'hooks/useToggle'
import React from 'react'
import { Button, Logo, NavbarWrapper } from 'ui'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'

interface NavProps {
  toggleSidebar: () => void
}

export const Nav = ({ toggleSidebar }: NavProps) => {
  const { user, logout } = useAppContext()
  const { open: dropdownOpen, toggleOpen: toggleDropdown } = useToggle()
  const ref = useOnClickOutside(() => {
    if (dropdownOpen) toggleDropdown()
  })
  return (
    <NavbarWrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>

        <div className="btn-container">
          <Button className="btn" onClick={toggleDropdown}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </Button>
          <div
            ref={ref}
            className={`dropdown${dropdownOpen ? ' show-dropdown' : ''}`}
          >
            <button onClick={logout} className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  )
}
