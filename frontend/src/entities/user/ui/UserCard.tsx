import { cn } from '@/shared/lib'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui'

interface UserCardProps {
  avatar: string
  displayName: string
  email: string
  className?: string
}

export const UserCard = ({ avatar, displayName, email, className }: UserCardProps) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>{displayName?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>

      <div className='grid flex-1 text-left text-sm leading-tight'>
        <span title={displayName} className='truncate font-semibold'>
          {displayName}
        </span>
        <span title={email} className='truncate text-xs text-muted-foreground'>
          {email}
        </span>
      </div>
    </div>
  )
}
