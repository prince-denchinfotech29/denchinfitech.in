"use client"

import { useState, useEffect, useRef, RefObject } from "react"

interface UseCounterReturn {
  count: number
  ref: RefObject<HTMLDivElement>
}

/**
 * useCounter - animates counting up to a target number when the element is visible in viewport.
 * @param target - The number to count up to.
 * @param duration - Duration of the animation in milliseconds. Default is 2000ms.
 * @returns An object with the current count and a ref to attach to the target element.
 */
export function useCounter(target: number, duration = 2000): UseCounterReturn {
  const [count, setCount] = useState<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return { count, ref }
}
