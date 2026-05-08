import * as React from "react"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext<{
  value: string
  onValueChange: (val: string) => void
}>({ value: "", onValueChange: () => {} })

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value: controlledValue, onValueChange, defaultValue = "", children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = controlledValue !== undefined ? controlledValue : internalValue

    const handleChange = (val: string) => {
      if (controlledValue === undefined) setInternalValue(val)
      onValueChange?.(val)
    }

    return (
      <RadioGroupContext.Provider value={{ value, onValueChange: handleChange }}>
        <div ref={ref} className={cn("grid gap-2", className)} {...props}>
          {children}
        </div>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  value: string
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, id, ...props }, ref) => {
    const { value: groupValue, onValueChange } = React.useContext(RadioGroupContext)
    const checked = groupValue === value

    return (
      <input
        ref={ref}
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={() => onValueChange(value)}
        className={cn(
          "h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-current",
          className
        )}
        {...props}
      />
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
