import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "./card"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface SectionCardProps {
    title: string
    description?: string
    onViewMore?: () => void
    viewMoreText?: string
    children: React.ReactNode
    className?: string
}

export function SectionCard({
    title,
    description,
    onViewMore,
    viewMoreText = "Ver más",
    children,
    className
}: SectionCardProps) {
    return (
        <Card className={cn("w-full", className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
                {onViewMore && (
                    <CardAction>
                        <Button variant="outline" size="sm" onClick={onViewMore}>
                            {viewMoreText}
                        </Button>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}
