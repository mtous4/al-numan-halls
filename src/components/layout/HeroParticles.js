'use client';
import { useEffect, useRef } from 'react';

export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 650;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(45, Math.floor(width / 25));
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.15,
        opacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseVal: Math.random() * Math.PI,
        hue: Math.random() > 0.3 ? 42 : 48,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.pulseVal += p.pulseSpeed;
        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulseVal));

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        gradient.addColorStop(0, 'hsla(' + p.hue + ', 85%, 65%, ' + currentOpacity + ')');
        gradient.addColorStop(0.5, 'hsla(' + p.hue + ', 80%, 55%, ' + (currentOpacity * 0.4) + ')');
        gradient.addColorStop(1, 'hsla(42, 80%, 50%, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'hsla(45, 100%, 85%, ' + (currentOpacity * 0.9) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.7, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.85
      }}
    />
  );
}
