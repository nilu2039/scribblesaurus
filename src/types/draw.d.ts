type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  previousPoint: Point | null;
};

type Point = {
  x: number;
  y: number;
};
