import type { FC } from 'react'
import styled from '@emotion/styled'
import Spinner from '../assets/spinner.svg?react'

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`

const LoadingOverlay: FC = () => {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  )
}

export default LoadingOverlay
