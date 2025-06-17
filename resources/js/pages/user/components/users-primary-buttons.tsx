import { Button } from '@/components/ui/button'
import { useUsers } from '../context/users-context'
import { UserRoundPlus } from 'lucide-react'

export const UsersPrimaryButtons =() => {
  const { setOpen } = useUsers()
  return (
    <div className='flex'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add User</span> <UserRoundPlus className='size-5' />
      </Button>
    </div>
  )
}