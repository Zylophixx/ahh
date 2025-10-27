import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(dotsInterval);
        onComplete();
      }
    });

    tl.set(containerRef.current, { opacity: 1 })
      .fromTo(textRef.current,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      )
      .to({}, { duration: 2.5 })
      .to(textRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: 'power2.in'
        }
      )
      .to(containerRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut'
        },
        '-=0.2'
      );

    return () => {
      tl.kill();
      clearInterval(dotsInterval);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black opacity-0"
      style={{ pointerEvents: 'none' }}
    >
      <div className="relative flex flex-col items-center justify-center text-center px-6">
        <div
          ref={textRef}
          className="opacity-0"
        >
          <h1 className="text-3xl md:text-5xl font-bosenAlt text-white tracking-wide mb-2">
            WAIT, LET ME SET THINGS FOR YOU{dots}
          </h1>
        </div>
      </div>
    </div>
  );
}
