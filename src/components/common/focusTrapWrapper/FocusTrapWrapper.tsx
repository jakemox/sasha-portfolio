import { FocusTrap } from 'focus-trap-react'
import type { FC, ReactNode } from 'react'

interface FocusTrapWrapperProps {
  active: boolean
  onDeactivate: () => void
  children: ReactNode
}

const FocusTrapWrapper: FC<FocusTrapWrapperProps> = ({ active, onDeactivate, children }) => {
  return active ? (
    <FocusTrap
      active={active}
      focusTrapOptions={{
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        onDeactivate,
      }}
    >
      {children}
    </FocusTrap>
  ) : (
    <>{children}</>
  )
}

export default FocusTrapWrapper
