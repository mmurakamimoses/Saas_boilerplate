"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaSearch, FaSpinner, FaCheck } from "react-icons/fa";

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [iconPhase, setIconPhase] = useState<'idle' | 'clicked' | 'loading' | 'done-click' | 'done'>('idle');

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      const { width, height } = currentContainer.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
    };
  }, []);

  // Handle phase transitions after animation
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0 && iconPhase === 'idle') {
      // Wait for the pointer animation to finish (1s delay + 1s duration)
      const timer1 = setTimeout(() => {
        // Pause for 1.2 seconds before click effect
        const timer2 = setTimeout(() => {
          setIconPhase('clicked');
          // Click effect lasts 200ms, then immediately switch to loading
          const timer3 = setTimeout(() => {
            setIconPhase('loading');
          }, 200);
          return () => clearTimeout(timer3);
        }, 800);
        return () => clearTimeout(timer2);
      }, 2000);
      return () => clearTimeout(timer1);
    }
    // After loading, do click effect and then show checkmark
    if (iconPhase === 'loading') {
      const timer4 = setTimeout(() => {
        setIconPhase('done-click');
        const timer5 = setTimeout(() => {
          setIconPhase('done');
        }, 200);
        return () => clearTimeout(timer5);
      }, 2000);
      return () => clearTimeout(timer4);
    }
  }, [dimensions, iconPhase]);

  return (
    <div
      className={cn("relative w-fit", containerClassName)}
      ref={containerRef}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className={cn(
              "absolute inset-0 border border-neutral-800",
              rectangleClassName,
            )}
            initial={{
              width: 0,
              height: 0,
            }}
            whileInView={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            viewport={{ amount: 1, once: true }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 1.0,
            }}
          />
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              x: dimensions.width + 4,
              y: dimensions.height + 4,
            }}
            viewport={{ amount: 1, once: true }}
            style={{
              rotate: 0,
            }}
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" },
              duration: 1,
              ease: "easeInOut",
              delay: 1.0,
            }}
          >
            {iconPhase === 'loading' ? (
              <FaSpinner className={cn("h-5 w-5 text-purple-500 animate-spin", pointerClassName)} />
            ) : iconPhase === 'done' ? (
              <motion.div
                animate={{ scale: 1 }}
                initial={{ scale: 0.7 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <FaCheck className={cn("h-5 w-5 text-purple-500", pointerClassName)} />
              </motion.div>
            ) : iconPhase === 'done-click' ? (
              <motion.div
                animate={{ scale: 0.7 }}
                initial={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <FaCheck className={cn("h-5 w-5 text-purple-500", pointerClassName)} />
              </motion.div>
            ) : (
              <motion.div
                animate={iconPhase === 'clicked' ? { scale: 0.7 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <FaSearch className={cn("h-5 w-5 text-purple-500", pointerClassName)} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
} 