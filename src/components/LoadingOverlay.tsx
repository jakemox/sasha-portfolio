import type { FC } from 'react'
import styled from '@emotion/styled'
import FlowerSpinner from '../assets/spinner-flower.png'

const LoadingOverlay: FC = () => {
  return (
    <LoadingContainer>
      <Spinner src={FlowerSpinner} />
    </LoadingContainer>
  )
}

export default LoadingOverlay

const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

const Spinner = styled.img`
  width: 5rem;
  height: 5rem;
  animation: spin 3s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
