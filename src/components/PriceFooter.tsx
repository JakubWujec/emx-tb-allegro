// import React from 'react'
import { CreateTermoblockItemInput, plHinges, plColors } from '../schema/termoblockItem.schema'
type PriceFooterProps = {
  termoblock: CreateTermoblockItemInput,
  isValid: boolean
}

function PriceFooter(props: PriceFooterProps) {
  const termoblock = props.termoblock;
  const isValid = props.isValid;

  const checkNan = (value:number) =>  {
    if(isNaN(value)) {
      return 0
    }
    return value;
  }

  return (
     <div className='hidden md:block fixed bottom-0 rounded-t-lg left-1/2 -translate-x-1/2 w-2/3 bg-white min-h-[36px] h-auto shadow shadow-mainOrange'>
       <div className='m-4 flex md:flex-2 flex-wrap justify-center'>
         <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-center flex-col'>
           <p>Rozmiar:</p>
           <p className='text-mainOrange text-lg'> A: {checkNan(termoblock.width)}mm, B: {checkNan(termoblock.height)}mm</p>
         </div>

         {termoblock.felc === undefined || isNaN(termoblock.felc) ? null :  <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-center flex flex-col'>
           <p>Felc:</p>
           <p className='text-mainOrange text-lg'>{termoblock.felc}mm</p>
         </div>}

         <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-center flex flex-col'>
           <p>Kolor:</p>
           <p className='text-mainOrange text-lg'>{termoblock.color ? plColors[termoblock.color] : '-'}</p>
         </div>

         <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-center flex-col'>
           <p>Zawias:</p>
           <p className='text-mainOrange text-lg'>{termoblock.hinges ? plHinges[termoblock.hinges] : '-'}</p>
         </div>

          {termoblock.firstHole ? <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-left flex-col'>
           <p>Rodzaj pierwszego otworu:</p>
           {termoblock.firstHole?.holeType === 'okrągły na rurę bez uchwytu' ? <p className='text-mainOrange text-lg'>{termoblock.firstHole.diameter !== undefined && checkNan(termoblock.firstHole.diameter)}mm</p> : null }
           <p className='text-mainOrange text-lg'>{termoblock.firstHole?.holeType}</p>
          <p className='text-mainOrange text-lg'>{termoblock.firstHole?.stringPosition}</p>
         </div> : null}

         {termoblock?.hasSecondHole && termoblock.secondHole ? 
         (<div className='w-1/2 md:w-1/3 lg:w-1/4 my-2 text-left flex-col'>
           <p>Rodzaj drugiego otworu:</p>
           {termoblock.secondHole?.holeType === 'okrągły na rurę bez uchwytu' ? 
           <p className='text-mainOrange text-lg'>{termoblock.secondHole.diameter !== undefined && checkNan(termoblock.secondHole.diameter)}mm</p> 
           : null }
           <p className='text-mainOrange text-lg'>{termoblock.secondHole?.holeType}</p>
           <p className='text-mainOrange text-lg'>{termoblock.secondHole?.stringPosition}</p>
         </div> )
         : null} 

         {termoblock.hasPowerCordHole && termoblock.powerCordHole ? 
         (<div className='w-1/2 md:w-1/3 lg:w-1/4 my-2 text-left flex-col'>
           <p>Otwór na przewód zasilający:</p>
           <p className='text-mainOrange text-lg'>{termoblock.powerCordHole.stringPosition}</p>
         </div>) 
         : null} 
       </div>

       <div className='m-4 md:flex-1 text-center'>
         {!isValid ? 
         (<div>
           <span className='border border-mainOrange inline-block px-6 py-4'>Wpisz w formularzu parametry, po wpisaniu pojawi się cena produktu</span>
         </div>) : 
         (<div>
          cena
         </div>)}
       </div>
     </div>
  )
}

export default PriceFooter