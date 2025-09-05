"use client"

import * as React from "react"
import { Controller, ControllerProps, FieldPath, FieldValues, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

const Form = React.forwardRef<
    HTMLFormElement,
    React.HTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
    <form ref={ref} className={cn("space-y-6", className)} {...props} />
))
Form.displayName = "Form"

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const FormFieldContext = React.createContext<{
    name: string
}>({
    name: "",
})

const FormItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
    )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
        )}
        {...props}
    />
))
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { children: React.ReactElement }
>(({ children, className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn("", className)} {...props}>
            {React.cloneElement(children, { className: cn(children.props?.className, "") })}
        </div>
    )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { name } = React.useContext(FormFieldContext)
    const formContext = useFormContext()
    const fieldError = formContext?.formState?.errors?.[name]

    if (!fieldError) {
        return null
    }

    return (
        <p
            ref={ref}
            className={cn("text-sm font-medium text-red-500", className)}
            {...props}
        >
            {fieldError.message as string ?? children}
        </p>
    )
})
FormMessage.displayName = "FormMessage"

export {
    Form, FormControl,
    FormDescription, FormField,
    FormItem,
    FormLabel, FormMessage
}

