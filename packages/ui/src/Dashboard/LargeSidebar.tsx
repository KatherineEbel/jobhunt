import {NavLinks} from './NavLinks'
import {Logo} from '../Logo'
import { LargeSidebar as Wrapper} from './styles'

export const LargeSidebar = ({ open }: { open: boolean, onClose: () => void }) => {
  return (
    <Wrapper>
      <div className={`sidebar-container${open ? ' show-sidebar' : ''}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks/>
        </div>
      </div>
    </Wrapper>
  )
}
