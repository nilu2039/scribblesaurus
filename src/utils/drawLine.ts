export type DrawLineProps = Draw & {
  color: string;
};

export const drawLine = ({
  previousPoint,
  currentPoint,
  color,
  ctx,
}: DrawLineProps) => {
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
};
