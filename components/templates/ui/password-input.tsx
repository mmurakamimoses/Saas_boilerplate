import * as React from "react"
import Lottie from "lottie-react"
import { cn } from "@/lib/utils"
import visibilityAnimation from "@/public/animations/visibility/visibility-V3.json"

interface PasswordInputProps extends React.ComponentProps<"input"> {
  className?: string
  isVisible?: boolean
  onVisibilityChange?: (visible: boolean) => void
}

function PasswordInput({ className, isVisible, onVisibilityChange, ...props }: PasswordInputProps) {
  const [internalIsEyeOpen, setInternalIsEyeOpen] = React.useState(false)
  const lottieRef = React.useRef<any>(null)

  // Use external state if provided, otherwise use internal state
  const isEyeOpen = isVisible !== undefined ? isVisible : internalIsEyeOpen
  const setIsEyeOpen = onVisibilityChange || setInternalIsEyeOpen

  // Set initial closed state after mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.goToAndStop(12, true)
      }
    }, 100) // Small delay to ensure animation is loaded
    
    return () => clearTimeout(timer)
  }, [])

  // Update animation when external state changes
  React.useEffect(() => {
    if (lottieRef.current && isVisible !== undefined) {
      // Small delay to prevent conflicts when multiple inputs sync
      const timer = setTimeout(() => {
        if (lottieRef.current) {
          if (isVisible) {
            // Play animation to open state
            lottieRef.current.playSegments([12, 0], true)
          } else {
            // Play animation to closed state
            lottieRef.current.playSegments([0, 12], true)
          }
        }
      }, 10)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const handleEyeClick = () => {
    const newState = !isEyeOpen
    setIsEyeOpen(newState)
    
    // Only play animation if we're using internal state
    // External state will trigger animation via useEffect
    if (lottieRef.current && isVisible === undefined) {
      if (isEyeOpen) {
        // Currently open, go to closed
        lottieRef.current.playSegments([0, 12], true)
      } else {
        // Currently closed, go to open  
        lottieRef.current.playSegments([12, 0], true)
      }
    }
  }

  return (
    <div className="relative">
      <input
        type={isEyeOpen ? "text" : "password"}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm items-center leading-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          "pr-10", // Add right padding for the eye icon
          className
        )}
        {...props}
      />
      <button
        type="button"
        onClick={handleEyeClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer focus:outline-none"
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={visibilityAnimation}
          loop={false}
          autoplay={false}
          style={{ width: "24px", height: "24px" }}
        />
      </button>
    </div>
  )
}

export { PasswordInput } 