import {logout, selectCurrentUser} from 'features/auth/authSlice'
import {useAppDispatch, useTypedSelector} from 'hooks/store'
import { useOnClickOutside } from 'hooks/useClickOutside'
import { useToggle } from 'hooks/useToggle'
import React, {useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { Button, Logo, NavbarWrapper } from 'ui'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'

interface NavProps {
  toggleSidebar: () => void
}

export const Nav = ({ toggleSidebar }: NavProps) => {
  const user = useTypedSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const { open: dropdownOpen, toggleOpen: toggleDropdown, setOpen } = useToggle()
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const currentUser = useTypedSelector(selectCurrentUser)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/landing')
  }

  useOnClickOutside(ref, () => setOpen(false))

  if (!currentUser) {
    handleLogout()
  }

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

        <div className="btn-container"
             ref={ref}
        >
          <Button className="btn" onClick={toggleDropdown}>
            <FaUserCircle />
            {user?.firstName}
            <FaCaretDown />
          </Button>
          <div
            className={`dropdown${dropdownOpen ? ' show-dropdown' : ''}`}
          >
            <button onClick={handleLogout} className="dropdown-btn">
              logout
            </button>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  )
}
