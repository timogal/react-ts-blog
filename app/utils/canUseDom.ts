export default function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    (window as any).document &&
    (window as any).document.createElement
  );
}
