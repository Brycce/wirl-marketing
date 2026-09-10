// Pixel art from text. Each sprite is an array of strings; each character is
// one pixel from the palette below, '.' is transparent. Rendered as crisp
// SVG rects so it scales without blur and needs no image files.

export const PAL: Record<string, string> = {
  K: '#1F2A1F', // ink
  k: '#0F380F', // screen dark
  G: '#306230', // dark green
  g: '#8BAC0F', // green
  L: '#9BBC0F', // light green
  W: '#FBF7E9', // cream white
  S: '#CFCAB5', // light grey
  D: '#8A8472', // dark grey
  B: '#7CC8E8', // sky
  b: '#3D6FA8', // blue
  R: '#D9534F', // red
  Y: '#F2C14E', // yellow
  O: '#E08A3C', // orange
  P: '#8C6BB1', // purple
  T: '#E8B98A', // skin
  H: '#5A3B2E', // hair
  h: '#2B1D16', // dark hair
};

export type SpriteMap = string[];

export default function Sprite({
  rows, scale = 4, swap, className = '', style, title,
}: { rows: SpriteMap; scale?: number; swap?: Record<string, string>; className?: string; style?: React.CSSProperties; title?: string }) {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === '.') { x++; continue; }
      let run = 1;
      while (x + run < row.length && row[x + run] === ch) run++;
      const key = swap?.[ch] ?? ch;
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={PAL[key] ?? key} />);
      x += run;
    }
  });
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rects}
    </svg>
  );
}
