export type FieldsErrors = { field: string, error: string }[];

export type ResponseType<T = {}> = {
    data: T
    messages: string[]
    fieldsErrors?: FieldsErrors
    resultCode?: number
}