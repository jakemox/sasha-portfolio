import { useEffect } from 'react'
import throttle from 'lodash.throttle'

interface Dimensions {
  width?: number
  height?: number
}

const useWindowSizeThrottled = (callback: (dimensions: Dimensions) => unknown) => {
  useEffect(() => {
    function handleResize() {
      callback({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    const throttledResize = throttle(handleResize, 200)
    window.addEventListener('resize', throttledResize)
    handleResize()

    return () => window.removeEventListener('resize', throttledResize)
  }, [])
}

export default useWindowSizeThrottled
