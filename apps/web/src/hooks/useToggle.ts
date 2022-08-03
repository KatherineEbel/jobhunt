import { useCallback, useState } from 'react'

export const useToggle = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = useCallback(() => setOpen((prevState) => !prevState), [])
  return { open, toggleOpen }
}
