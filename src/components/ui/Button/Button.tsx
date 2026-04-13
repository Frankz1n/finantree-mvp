import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import * as S from "./Button.styles"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: S.ButtonVariant
    size?: S.ButtonSize
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        if (asChild) {
            return (
                <Slot className={className} ref={ref} {...props}>
                    {props.children}
                </Slot>
            )
        }

        return (
            <S.StyledButton
                className={className}
                $variant={variant}
                $size={size}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
