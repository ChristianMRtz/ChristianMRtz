import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    radius: number;
    angle: number;
    distance: number;
    speedX: number;
    speedY: number;
    drift: number;
}

export const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        // Initialize particles
        const initParticles = () => {
            particlesRef.current = [];
            const particleCount = 120;

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;

                particlesRef.current.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    radius: Math.random() * 2.5 + 1.5,
                    angle: Math.random() * Math.PI * 2,
                    distance: Math.random() * 300 + 100,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    drift: Math.random() * 0.02 + 0.01
                });
            }
        };
        initParticles();

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY
            };
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const particle of particlesRef.current) {
                // Autonomous floating movement
                particle.angle += particle.drift;
                const floatX = Math.cos(particle.angle) * 0.5;
                const floatY = Math.sin(particle.angle) * 0.5;
                
                particle.baseX += particle.speedX;
                particle.baseY += particle.speedY;

                // Bounce off edges
                if (particle.baseX < 0 || particle.baseX > canvas.width) {
                    particle.speedX *= -1;
                }
                if (particle.baseY < 0 || particle.baseY > canvas.height) {
                    particle.speedY *= -1;
                }

                // Calculate distance to mouse
                const dx = mouseRef.current.x - particle.x;
                const dy = mouseRef.current.y - particle.y;
                const distance = Math.hypot(dx, dy);
                const maxDistance = 150;

                // Move particle based on mouse proximity
                if (distance < maxDistance) {
                    const force = (1 - distance / maxDistance) * 40;
                    const angle = Math.atan2(dy, dx);
                    particle.x -= Math.cos(angle) * force * 0.1;
                    particle.y -= Math.sin(angle) * force * 0.1;
                } else {
                    // Return to base position smoothly with floating motion
                    particle.x += (particle.baseX + floatX - particle.x) * 0.05;
                    particle.y += (particle.baseY + floatY - particle.y) * 0.05;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
                ctx.fill();

                // Add glow effect
                ctx.shadowBlur = 8;
                ctx.shadowColor = 'rgba(56, 189, 248, 0.4)';
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // Draw connections between nearby particles
            for (let i = 0; i < particlesRef.current.length; i++) {
                const p1 = particlesRef.current[i];
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const p2 = particlesRef.current[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.hypot(dx, dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        // Event listeners
        globalThis.addEventListener('mousemove', handleMouseMove);
        globalThis.addEventListener('resize', () => {
            setCanvasSize();
            initParticles();
        });

        // Cleanup
        return () => {
            globalThis.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
            }}
        />
    );
};
