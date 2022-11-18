export function generateColor() {
  const randomColor = `hsl(${Math.floor(
    200 + Math.random() * 50 * (Math.random() < 0.5 ? 1 : -1)
  )},100%,62%)`;
  return randomColor;
}
