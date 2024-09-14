export function combineClasses(...classes: (string | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
  }