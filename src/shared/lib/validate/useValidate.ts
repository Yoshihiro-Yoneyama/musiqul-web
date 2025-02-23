import {ZodSchema, ZodError, infer as ZodInfer} from "zod";
import {useCallback, useState} from "react";

type ErrorMessages<T> = Partial<Record<keyof T, string>>

export const useValidation = <T extends ZodSchema>() => {
  const [errorMessages, setErrorMessages] = useState<ErrorMessages<ZodInfer<T>>>({})
  
  const validate = useCallback((values: ZodInfer<T>, schema: T) => {
    const errors: ErrorMessages<Zod.infer<T>> = {}
    
    try {
      schema.parse(values)
    } catch (error) {
      if (error instanceof ZodError) {
        error.errors.forEach((e) => {
          const key = e.path.join('.') as keyof ZodInfer<T>
        })
      }
    }
    
    setErrorMessages(errors)
    return Object.keys(errors).length > 0
  }, [])
  
  return { errorMessages, validate, setErrorMessages }
}