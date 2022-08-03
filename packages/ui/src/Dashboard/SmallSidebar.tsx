import {NavLinks} from './NavLinks'
import {Logo} from '../Logo'
import {FaTimes} from './sidebar-icons'
import { SmallSidebar as Wrapper} from './styles'

export const SmallSidebar = ({ onClose, open }: { open: boolean, onClose: () => void }) => {
  return (
    <Wrapper>
      <div className={`sidebar-container${open ? ' show-sidebar' : ''}`}>
        <div className="content">
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks onClose={onClose}/>
        </div>
      </div>
    </Wrapper>
  )
}
