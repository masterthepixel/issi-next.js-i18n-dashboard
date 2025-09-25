import { useEffect, useRef, useState } from 'react'

interface UseMarqueeAnimationOptions {
    speed?: number
    direction?: 'left' | 'right'
    pauseOnHover?: boolean
}

interface MarqueeItem {
    id: string
    title: string
    slug: string
    [key: string]: unknown
}

export function useMarqueeAnimation(
    items: MarqueeItem[],
    options: UseMarqueeAnimationOptions = {}
) {
    const {
        speed = 50,
        direction = 'left',
        pauseOnHover = true
    } = options

    const containerRef = useRef<HTMLDivElement>(null)
    const [isPaused, setIsPaused] = useState(false)
    const animationRef = useRef<number>()

    useEffect(() => {
        const container = containerRef.current
        if (!container || items.length === 0) return

        let startTime: number
        let previousTime: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            if (!previousTime) previousTime = currentTime

            const deltaTime = currentTime - previousTime

            if (!isPaused) {
                const pixelsPerSecond = speed
                const pixelsToMove = (pixelsPerSecond * deltaTime) / 1000

                if (direction === 'left') {
                    container.scrollLeft += pixelsToMove
                } else {
                    container.scrollLeft -= pixelsToMove
                }

                // Reset scroll position when reaching the end for seamless loop
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0
                }
            }

            previousTime = currentTime
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [items, speed, direction, isPaused])

    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsPaused(true)
        }
    }

    const handleMouseLeave = () => {
        if (pauseOnHover) {
            setIsPaused(false)
        }
    }

    return {
        containerRef,
        isPaused,
        setIsPaused,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    }
}
