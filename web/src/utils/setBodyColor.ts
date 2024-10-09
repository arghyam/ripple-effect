export default function setBodyColor(color: string): void {
  document.documentElement.style.setProperty('--bg-color', color);
}