import React from "react"

interface Props { children?: string }

export const Label = (props: Props) => <>
   <label>Hello { props.children} !</label>
</>