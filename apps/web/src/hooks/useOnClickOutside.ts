import { useCallback, useEffect, useRef } from 'react'

export const useOnClickOutside = (onClose: () => void) => {
  const ref = useRef(null)
  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [])
  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !(ref.current as Node).contains(e.target as Node)) {
        onClose?.()
      }
    },
    [ref.current]
  )
  useEffect(() => {
    document.addEventListener('click', clickListener)
    document.addEventListener('keyup', escapeListener)
    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('keyup', escapeListener)
    }
  }, [])
  return ref
}
