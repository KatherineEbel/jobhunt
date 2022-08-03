import { useCallback, useState } from 'react'

export const useDropdown = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = useCallback(() => setOpen((prevState) => !prevState), [])
  return { open, toggleOpen }
}
