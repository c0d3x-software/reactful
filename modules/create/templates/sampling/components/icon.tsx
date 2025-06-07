import React from 'react'

interface Props {
   id: string
   size?: string
   children?: string
}

export const Icon = ({ id, size, children }: Props) => <>
   <i className={`bi bi-${size} bi-${id}`} title={children || ""}></i>
</>