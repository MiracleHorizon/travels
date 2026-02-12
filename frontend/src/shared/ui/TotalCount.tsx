interface TotalCountProps {
  completedCount: number
  totalCount: number
}

export const TotalCount = ({ completedCount, totalCount }: TotalCountProps) => {
  return (
    <span className='text-muted-foreground font-normal'>
      {completedCount}/{totalCount}
    </span>
  )
}
