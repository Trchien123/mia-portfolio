type DownloadIconProps = { size?: 'sm' | 'lg' }

export function DownloadIcon({ size = 'sm' }: DownloadIconProps) {
  const px = size === 'lg' ? 22 : 16
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={size === 'lg' ? 1.6 : 1.8}
      aria-hidden="true"
      focusable="false"
      style={{ flex: 'none' }}
    >
      <path d="M8 2v9M4 7.5 8 11.5l4-4M2.5 14h11" />
    </svg>
  )
}
