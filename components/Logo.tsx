export function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true" className="flex-none">
      <circle cx="17" cy="17" r="16" fill="#0f8fd6" />
      <path
        d="M3 18c3-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0 3.5 2 5.5 0"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M5 24c3-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity=".6"
      />
      <circle cx="24" cy="9" r="3.2" fill="#ffb81c" />
    </svg>
  );
}
