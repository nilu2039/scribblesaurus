import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDraw } from "~/hooks/useDraw";

const Draw = () => {
  const { canvasRef, onMouseDown, clear } = useDraw(onDraw);
  const [color, setColor] = useState("#000");

  function onDraw({ ctx, currentPoint, previousPoint }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    const startingPoint = previousPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    ctx.moveTo(startingPoint.x, startingPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(currX, currY, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

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
