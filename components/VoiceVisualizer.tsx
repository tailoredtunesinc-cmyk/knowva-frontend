import React, { useRef, useEffect } from 'react';

interface VoiceVisualizerProps {
  isActive: boolean;
}

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = 100;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.lineWidth = 2;
      ctx.strokeStyle = '#A855F7'; // Electric Violet
      ctx.beginPath();

      const frequency = isActive ? 0.05 : 0.01;
      const amplitude = isActive ? 30 : 5;
      const speed = isActive ? 0.2 : 0.05;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * frequency + time) * amplitude * Math.sin(x / width * Math.PI);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Second line (ghost)
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * (frequency * 0.8) - time) * (amplitude * 0.8) * Math.sin(x / width * Math.PI);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      time += speed;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return <canvas ref={canvasRef} className="w-full h-[100px]" />;
};

export default VoiceVisualizer;