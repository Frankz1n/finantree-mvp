import * as S from "./Skeleton.styles"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <S.StyledSkeleton
            className={className}
            {...props}
        />
    )
}

export { Skeleton }
