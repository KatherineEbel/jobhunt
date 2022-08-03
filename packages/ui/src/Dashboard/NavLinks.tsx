import {NavLink} from 'react-router-dom'
import {sidebarLinks} from '../utils/links'

interface NavLinkProps {
  onClose: () => void
}

export const NavLinks = ({onClose}: NavLinkProps) => {
  return (
    <div className="nav-links">
      {sidebarLinks.map(({ id, text, icon, to }) => (
        <NavLink className={({isActive}) => {
          return isActive ? 'nav-link active' : 'nav-link'
        }} key={id} to={to}
                 onClick={onClose}
        >
                <span className='icon'>
                  {icon}
                </span> {text}
        </NavLink>
      ))}
    </div>
  )
}