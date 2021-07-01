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

export function loadImage(src: string, width: number, height: number, callback: (src: string) => void): void {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        callback(src);
    };
    img.onerror = () => {
        callback(generateImage(width, height));
    };
}
