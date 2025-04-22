import React from 'react'
import { userData } from '@/lib/types'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { AvatarFallback } from '../avatar';
import { cn } from '@/lib/utils';
import EmojiIcon from '../EmojiIcon';

interface Top3AvatarProps {
  user: userData;
  place: number;
}
export const Top3Avatar: React.FC<Top3AvatarProps> = ({user, place}) => {
  return (
    <div className="flex flex-col items-center text-center gap-2 w-1/3">
      {place === 1 && <EmojiIcon width={48} height={48} src="/emoji/crown.svg" />}
      <div className='flex flex-col relative' >
      <Avatar className={
      cn(
        "rounded-full border-5",
         place === 1 && "size-24 sm:size-32 border-accent-2",
         place === 2 && "size-12 sm:size-24 border-accent-3",
         place === 3 && "size-12 sm:size-24 border-accent-4"
        )}>
        <AvatarImage src={user.photo_url} />
        <AvatarFallback>
          <img src="/mock-user-dark.svg" alt="user" />
        </AvatarFallback>    
      </Avatar>
      

      <div className={cn(
        "absolute left-1/2 transform -translate-x-1/2 rounded-full sm:size-9 text-sm sm:text-xl flex items-center justify-center font-semibold",
         place === 1 && "bg-accent-2 size-6 -bottom-3",
         place === 2 && "bg-accent-3 size-5 -bottom-2 sm:-bottom-3",
         place === 3 && "bg-accent-4 size-5 -bottom-2 sm:-bottom-3"
        )}>
        <p>{place}</p>
      </div>
      </div>
      <p className='max-w-full truncate text-ellipsis overflow-hidden'>{user.username}</p>

    </div>
  )
}
