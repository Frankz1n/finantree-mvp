import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import * as S from "./label.styles"

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
    <S.StyledLabel
        ref={ref}
        className={className}
        {...props}
    />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
