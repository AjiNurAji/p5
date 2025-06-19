import React from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";

type propsInput = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const InputPassword = ({ className, disabled, ...props }: propsInput) => {
  const [showPassword, setShowPassword] = React.useState(false)
  return (
    <div className={cn('relative rounded-md', className)}>
        <Input
          type={showPassword ? 'text' : 'password'}
          disabled={disabled}
          {...props}
        />
        <Button
          type='button'
          size='icon'
          variant='ghost'
          disabled={disabled}
          className='text-muted-foreground absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 rounded-md'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
        </Button>
      </div>
  )
}