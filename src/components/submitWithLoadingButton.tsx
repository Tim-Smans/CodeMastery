import {FunctionComponent} from 'react'
import {useFormStatus} from 'react-dom'
import {Button, ButtonProps} from '@/components/ui/button'
import {Loader2} from 'lucide-react'
import {cn} from '@/lib/utils'

interface SubmitButtonWithLoadingProps {
  text: string
  loadingText: string
  variant?: ButtonProps['variant']
  className?: ButtonProps['className']
  disabled?: boolean
  role?: string
}

const SubmitButtonWithLoading: FunctionComponent<SubmitButtonWithLoadingProps> = ({
  text,
  loadingText,
  variant,
  className,
  disabled,
  role
}) => {
  const forcefullyDisabled = disabled ?? false
  const {pending} = useFormStatus()

  
  return (
    <Button
      role={role}
      onSubmit={() => console.log(pending)}
      disabled={forcefullyDisabled || pending}
      type="submit"
      className={cn('w-full', className)}
      variant={variant}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? loadingText : text}
    </Button>
  )
}

export default SubmitButtonWithLoading
