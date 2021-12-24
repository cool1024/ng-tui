export function generateImage(width: number, height: number): string {
  const fontSize = Math.round(Math.max(width, height) / 5);
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <rect width="${width}" height="${height}" style="fill:#bbbbbb;"/>
        <text x="${width / 2}" y="${
    height / 2
  }" fill="white" style='dominant-baseline:middle;text-anchor:middle;font-size: ${fontSize}px;'>
            ${width} / ${height}
        </text>
    </svg>`;
  return `data:image/svg+xml;base64,${btoa(svgTemplate)}`;
}

export function generateBox(width: number, height: number): string {
  const svgTemplate = ` <svg width="${width}" height="${height}" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg" >
    <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
      <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse>
      <g fill-rule="nonzero" stroke="#D9D9D9">
        <path
          d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
        ></path>
        <path
          d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
          fill="#FAFAFA"
        ></path>
      </g>
    </g>
    </svg>`;
  return `data:image/svg+xml;base64,${btoa(svgTemplate)}`;
}

export function loadImage(
  src: string,
  width: number,
  height: number,
  callback: (src: string) => void
): void {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    callback(src);
  };
  img.onerror = () => {
    callback(generateImage(width, height));
  };
}
