interface LogoYandexProps {
  className?: string
}

export const LogoYandex = ({ className }: LogoYandexProps) => {
  return (
    <svg width='24' height='24' fill='none' viewBox='0 0 44 44' className={className}>
      <g clipPath='url(#react-aria4705422123-«r3b»-a)'>
        <circle cx='22' cy='22' r='22' fill='#FC3F1D' />
        <path
          fill='#fff'
          d='M25.244 12.32h-2.227c-3.817 0-5.725 1.909-5.725 4.772 0 3.18 1.272 4.77 4.135 6.68l2.226 1.59-6.361 9.86h-5.09l6.044-8.906c-3.499-2.545-5.407-4.771-5.407-8.906 0-5.09 3.499-8.588 10.178-8.588h6.68v26.4h-4.453z'
        />
      </g>
      <defs>
        <clipPath id='react-aria4705422123-«r3b»-a'>
          <path fill='#fff' d='M0 0h44v44H0z' />
        </clipPath>
      </defs>
    </svg>
  )
}
