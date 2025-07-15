

export const getDate = (dateStr: string)=>  {
    return new Date(dateStr).toLocaleDateString('en-PK')
}