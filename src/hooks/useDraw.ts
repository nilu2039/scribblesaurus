import { useEffect, useRef, useState } from "react";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, previousPoint }: Draw) => void
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousPoint = useRef<Point | null>(null);

  const [mouseDown, setMouseDown] = useState(false);

  const onMouseDown = () => setMouseDown(true);

  const getPointsInCanvas = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;

      const canvas = canvasRef.current;
      const currentPoint = getPointsInCanvas(e);

      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx || !currentPoint) return;
      onDraw({ ctx, currentPoint, previousPoint: previousPoint.current });
      previousPoint.current = currentPoint;
    };

    const mouseHandler = () => {
      setMouseDown(false);
      previousPoint.current = null;
    };

    const currentCanvasRef = canvasRef.current;
    currentCanvasRef?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", mouseHandler);
    return () => {
      currentCanvasRef?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseHandler);
    };
  }, [onDraw, mouseDown]);

  return { canvasRef, onMouseDown, clear };
};
