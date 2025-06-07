import React from 'react'

export default () => <>
   <UidChildren />
   <OneChildren />
   <AllChildren />
</>

export function UidChildren() {
   return <>
      <label>UidChildren!</label>
   </>
}

export function OneChildren() {
   return <>
      <div id='one' className='orb-button'>
         <div className='orb-plus'>...</div>
         <label>+</label>
         <section>
            <label>Folder</label>
            <label>File</label>
         </section>
      </div>
   </>
}

export function AllChildren() {
   return <>
      <div id='all' className='orb-plus'>...</div>
      <div className='orb-button'>
         <label>+</label>
         <section>
            <label>Folder</label>
            <label>File</label>
         </section>
      </div>
   </>
}