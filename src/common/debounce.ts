export function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeout: number | undefined;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func(...args), delay);
  };
}