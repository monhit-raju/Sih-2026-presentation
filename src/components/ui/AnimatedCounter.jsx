import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ── Animated numeric counter ─────────────────────────────────────────────────
export default function AnimatedCounter({
  target,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
  active = true,
}) {
  const [displayed, setDisplayed] = useState(0);
  const startRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const start = performance.now();
    const run = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.floor(ease * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(run);
      } else {
        setDisplayed(target);
      }
    };
    frameRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, active]);

  return (
    <span className={`animated-counter ${className}`}>
      {prefix}{displayed.toLocaleString()}{suffix}
    </span>
  );
}
