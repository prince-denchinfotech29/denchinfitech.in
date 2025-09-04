import * as React from "react"
import { cn } from "@/lib/utils"

// Define the input props with React.InputHTMLAttributes<HTMLInputElement>
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...rest }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input  px-3 py-2 text-white  disabled:cursor-not-allowed disabled:opacity-50 md:text-white",
          className
        )}
        ref={ref}
        {...rest}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
