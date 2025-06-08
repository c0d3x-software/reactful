import React from "react"

interface Props {
   name?: string
}

export const Hello = (props: Props) => <>
   <h1>Hello { props.name || "World"} !</h1>
</>