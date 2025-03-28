import { RefObject, useEffect, useState } from 'react'

export const useImageOnLoad = (ref: RefObject<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    console.log('hello')
    if (!ref.current) return

    const handleLoad = () => setIsLoaded(true)
    const handleError = () => setIsLoaded(true)

    ref.current.addEventListener('load', handleLoad, { once: true })
    ref.current.addEventListener('error', handleError, { once: true })

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.1,
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref])

  return { isLoaded, isVisible }
}
