import {
    Children,
    isValidElement,
    type HTMLAttributes,
    type ReactNode,
} from 'react'
import DocImage from './DocImage'

interface BaseComponentProps {
    children?: ReactNode
    className?: string
}

export default function DocParagraph({
    children,
    className,
    ...props
}: BaseComponentProps & HTMLAttributes<HTMLParagraphElement>) {
    const parsedChildren = Children.toArray(children)
    const onlyChild = parsedChildren[0]

    if (
        parsedChildren.length === 1 &&
        isValidElement(onlyChild) &&
        onlyChild.type === DocImage
    ) {
        return <>{onlyChild}</>
    }

    if (
        parsedChildren.length === 1 &&
        isValidElement(onlyChild) &&
        onlyChild.type === 'code'
    ) {
        return (
            <p
                className={
                    className
                        ? `md-code-paragraph ${className}`
                        : 'md-code-paragraph'
                }
                {...props}
            >
                {children}
            </p>
        )
    }

    return (
        <p className={className} {...props}>
            {children}
        </p>
    )
}
