import { useEffect, useRef, useState, type RefObject } from 'react'
import { isMotionOn } from './motion'

type InViewOptions = {
  rootMargin?: string
  threshold?: number
  /** Called once, from the observer, when the element first enters view. */
  onEnter?: () => void
}

/**
 * One-shot in-view flag. Unobserves after the first hit. Returns true immediately
 * when motion is off (reduced motion, or no IntersectionObserver), so nothing waits.
 */
export function useInViewOnce<T extends Element>(
  opts: InViewOptions = {},
): [RefObject<T | null>, boolean] {
  const { rootMargin, threshold, onEnter } = opts
  const ref = useRef<T>(null)
  const onEnterRef = useRef(onEnter)
  const [inView, setInView] = useState(() => !isMotionOn())

  useEffect(() => {
    onEnterRef.current = onEnter
  })

  useEffect(() => {
    const el = ref.current
    if (inView || !el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.unobserve(el)
        io.disconnect()
        setInView(true)
        onEnterRef.current?.()
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView, rootMargin, threshold])

  return [ref, inView]
}
