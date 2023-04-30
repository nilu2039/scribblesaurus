import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDraw } from "~/hooks/useDraw";
import { type DrawLineProps, drawLine } from "~/utils/drawLine";
import { io } from "socket.io-client";

const socket = io("ws://localhost:4000");

const Draw = () => {
  const { canvasRef, onMouseDown, clear } = useDraw(createLine);
  const [color, setColor] = useState("#000");

  function createLine({ ctx, currentPoint, previousPoint }: Draw) {
    socket.emit("draw-line", { previousPoint, currentPoint, color });
    drawLine({ previousPoint, currentPoint, ctx, color });
  }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    socket.on(
      "draw-line",
      ({ previousPoint, currentPoint, color }: DrawLineProps) => {
        if (!ctx) return;
        drawLine({ previousPoint, currentPoint, color, ctx });
      }
    );
    return () => {
      socket.off(
        "draw-line",
        ({ previousPoint, currentPoint, color }: DrawLineProps) => {
          if (!ctx) return;
          drawLine({ previousPoint, currentPoint, color, ctx });
        }
      );
    };
  }, [canvasRef]);

  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center gap-x-20">
      <div className="flex flex-col gap-10">
        <HexColorPicker color={color} onChange={setColor} />
        <button
          type="button"
          onClick={clear}
          className="rounded-xl bg-gray-200 p-3"
        >
          Clear Board
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={800}
        height={600}
        className="border border-black"
      />
    </div>
  );
};

export default Draw;
