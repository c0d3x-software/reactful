/** Get JSX component name from multiple ways */
export function getComponentName(jsx: RRE) {
   const name = jsx.type.name  
   const meta = jsx.type?.meta
   const wrap = jsx.type.toString().match(WRAP_COMPONENT)

   if (name?.trim() && name != "default") return name   
   else if (meta?.name) return meta.name   
   else if (wrap) return wrap[1]
   else throw "Failed getComponentName"
}

const WRAP_COMPONENT = /\(\) => React\.createElement\(React.Fragment, null, React.createElement\((.+?),/