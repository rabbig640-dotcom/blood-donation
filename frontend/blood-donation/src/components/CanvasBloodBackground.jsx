// src/components/CanvasBloodBackground.jsx
import { useEffect, useRef } from "react";

export default function CanvasBloodBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const bloodDropsRef = useRef([]);

  // Check if dark mode is active
  const isDarkMode = () => document.documentElement.classList.contains("dark");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Blood drop class
    class BloodDrop {
      constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      draw(ctx, darkMode) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();

        // Draw blood drop shape
        ctx.moveTo(0, -this.size);
        ctx.quadraticCurveTo(
          this.size * 0.5,
          -this.size * 0.3,
          0,
          this.size * 0.7,
        );
        ctx.quadraticCurveTo(-this.size * 0.5, -this.size * 0.3, 0, -this.size);

        // Adjust color based on dark mode
        const color = darkMode
          ? "rgba(248, 113, 113, 0.6)"
          : "rgba(220, 38, 38, 0.5)";
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        const currentCanvas = canvasRef.current;
        if (currentCanvas) {
          // Reset position when off screen
          if (this.y > currentCanvas.height + this.size) {
            this.y = -this.size;
            this.x = Math.random() * currentCanvas.width;
          }
          if (this.x < -this.size) {
            this.x = currentCanvas.width + this.size;
          }
          if (this.x > currentCanvas.width + this.size) {
            this.x = -this.size;
          }
        }
      }
    }

    // Initialize blood drops
    const initBloodDrops = () => {
      const drops = [];
      const dropCount = 50;
      for (let i = 0; i < dropCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 10;
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = Math.random() * 0.8 + 0.3;
        drops.push(new BloodDrop(x, y, size, speedX, speedY));
      }
      bloodDropsRef.current = drops;
    };

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const darkMode = isDarkMode();

      // Draw subtle gradient background that responds to dark mode
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );
      if (darkMode) {
        // Dark mode gradient - darker background
        gradient.addColorStop(0, "rgba(17, 24, 39, 0)");
        gradient.addColorStop(1, "rgba(127, 29, 29, 0.15)");
      } else {
        // Light mode gradient
        gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(1, "rgba(220, 38, 38, 0.02)");
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw blood drops
      bloodDropsRef.current.forEach((drop) => {
        drop.update();
        drop.draw(ctx, darkMode);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initBloodDrops();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
