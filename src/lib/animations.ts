
import { useEffect, useState } from "react";

// Hook personalizado para animaciones de entrada
export function useEntranceAnimation(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isVisible;
}

// Hook para animación de pulse con duración personalizada
export function usePulse(initialState = false, interval = 2000) {
  const [pulse, setPulse] = useState(initialState);

  useEffect(() => {
    if (!initialState) return;

    const timer = setInterval(() => {
      setPulse(prev => !prev);
    }, interval);

    return () => clearInterval(timer);
  }, [initialState, interval]);

  return pulse;
}

// Hook para transición suave entre valores numéricos
export function useNumberTransition(targetValue: number, duration = 1000) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  
  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const nextValue = startValue + (targetValue - startValue) * progress;
        setDisplayValue(Math.round(nextValue * 100) / 100);
        requestAnimationFrame(step);
      } else {
        setDisplayValue(targetValue);
      }
    };
    
    requestAnimationFrame(step);
  }, [targetValue, duration]);
  
  return displayValue;
}

// Función para crear clases de animación
export function createAnimationClass(
  enter: boolean,
  baseClass = "",
  enterClass = "fade-in",
  exitClass = ""
) {
  return `${baseClass} ${enter ? enterClass : exitClass}`.trim();
}
