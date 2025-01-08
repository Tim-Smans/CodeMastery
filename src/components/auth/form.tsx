import {FormEventHandler, FormHTMLAttributes, PropsWithChildren, useEffect, useRef} from 'react'
import {FieldPath, FieldValues, UseFormReturn} from 'react-hook-form'
import {ActionResponse} from '@/lib/models/actions'
import {CircleX} from 'lucide-react'
import {useFormStatus} from 'react-dom'

interface ResetFormProps<T extends FieldValues> {
  actionResult?: ActionResponse
  reset: UseFormReturn<T>['reset']
}

function ResetForm<T extends FieldValues>({actionResult, reset}: ResetFormProps<T>) {
  const {pending} = useFormStatus()
  const allowReset = useRef<boolean>(false)

  // We moeten hier een effect gebruiken aangezien de reset functie een state-update triggert in React Hook Form.
  useEffect(() => {
    if (pending) {
      // Een nieuw submission is gestart, als die succesvol is mag het formulier gereset worden.
      allowReset.current = true
    } else if (allowReset.current && actionResult?.success) {
      // De submission is afgelopen en het resultaat is succesvol, reset het formulier.
      allowReset.current = false
      reset()
    } else {
      // De submission is mislukt, reset het formulier niet.
      allowReset.current = false
    }
  }, [reset, pending, actionResult?.success])

  return <></>
}

interface FormProps<T extends FieldValues> extends PropsWithChildren, FormHTMLAttributes<HTMLFormElement> {
  hookForm: UseFormReturn<T>
  action: (data: FormData) => void
  actionResult?: ActionResponse
  id?: string
}

function Form<T extends FieldValues>({id, children, action, hookForm, actionResult, ...formAttributes}: FormProps<T>) {
  const {handleSubmit, reset} = hookForm
  const formRef = useRef<HTMLFormElement>(null)
  const hasBeenValidated = useRef<boolean>(false)

  const onSubmitHandler: FormEventHandler = evt => {
    if (!hasBeenValidated.current) {
      // Als het formulier nog niet gevalideerd is aan de client zijde moet de default actie (submitting) geannuleerd
      // worden.
      evt.preventDefault()

      // Valideer het formulier via react-hook-form.
      void handleSubmit(() => {
        hasBeenValidated.current = true
        // Omdat een update van state en useRef async is, kunnen we hier niet onmiddellijk het formulier opnieuw
        // indienen want dan wordt de update aan hasBeenValidated niet geregistreerd voordat de volgende submit
        // afgehandeld is.
        setTimeout(() => formRef.current?.requestSubmit(), 0)
      })(evt)
    } else {
      // Reset zodat een volgende submit opnieuw gevalideerd moet worden.
      hasBeenValidated.current = false
    }
  }

  return (
    <form ref={formRef} action={action} {...formAttributes} onSubmit={onSubmitHandler}>
      {id && <input type="hidden" {...hookForm.register('id' as FieldPath<T>)} defaultValue={id} />}
      {actionResult?.errors?.errors && (
        <div className="border border-destructive p-2 rounded my-4 flex items-center gap-4">
          <CircleX className="text-destructive" />
          {actionResult.errors.errors}
        </div>
      )}
      {children}
      <ResetForm reset={reset} actionResult={actionResult} />
    </form>
  )
}

export default Form
