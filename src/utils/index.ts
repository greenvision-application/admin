// Here we will export all the utils functions
export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
