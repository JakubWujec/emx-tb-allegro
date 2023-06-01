import React, {useEffect, useState} from 'react'
import useShoppingCart from '../hooks/useShoppingCart'
import { CreateTermoblockItemInput } from '../schema/termoblockItem.schema'
import { plColors } from '../schema/color.schema'
import { plHinges } from '../schema/hinge.schema'

type PriceFooterProps = {
  termoblock: CreateTermoblockItemInput,
  isValid: boolean
}

function PriceFooter(props: PriceFooterProps) {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
  useShoppingCart();

  const [termoblock, setTermoblock] = useState(props.termoblock);
  const isValid = props.isValid;

  const checkNan = (value:number) =>  {
    if(isNaN(value)) {
      return 0
    }
    return value;
  }

  useEffect(() => {
    setTermoblock(props.termoblock);
  }, [props.termoblock]);
console.log(termoblock,termoblock.color)

  return (
     <div className='hidden md:block fixed bottom-0 rounded-t-lg left-1/2 -translate-x-1/2 w-2/3 bg-white min-h-[36px] h-auto shadow shadow-mainOrange'>
       <div className='m-4 flex md:flex-2 flex-wrap justify-center'>
         <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-center flex-col'>
           <p>Rozmiar:</p>
           <p className='text-mainOrange text-lg font-bold'> A: {checkNan(termoblock.width)}mm, B: {checkNan(termoblock.height)}mm</p>
         </div>

         {termoblock.felc === undefined || isNaN(termoblock.felc) ? null :  <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-center flex flex-col'>
           <p>Felc:</p>
           <p className='text-mainOrange text-lg font-bold'>{termoblock.felc}mm</p>
         </div>}

         <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-center flex flex-col'>
           <p>Kolor:</p>
           <p className='text-mainOrange text-lg font-bold'>{termoblock.color ? plColors[termoblock.color] : '-'}</p>
         </div>

         <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-center flex-col'>
           <p>Zawias:</p>
           <p className='text-mainOrange text-lg font-bold'>{termoblock.hinges ? plHinges[termoblock.hinges] : '-'}</p>
         </div>

          {termoblock.firstHole ? <div className='w-1/2 md:w-1/3 lg:w-1/4 mb-2 text-left flex-col'>
           <p>Rodzaj pierwszego otworu:</p>
           {termoblock.firstHole?.holeType === 'okrągły na rurę bez uchwytu' ? <p className='text-mainOrange text-lg font-bold'>{termoblock.firstHole.diameter !== undefined && checkNan(termoblock.firstHole.diameter)}mm</p> : null }
           <p className='text-mainOrange text-lg font-bold'>{termoblock.firstHole?.holeType}</p>
          <p className='text-mainOrange text-lg font-bold'>{termoblock.firstHole?.stringPosition}</p>
         </div> : null}

         {termoblock?.hasSecondHole && termoblock.secondHole ? 
         (<div className='w-1/2 md:w-1/3 lg:w-1/4 my-2 text-left flex-col'>
           <p>Rodzaj drugiego otworu:</p>
           {termoblock.secondHole?.holeType === 'okrągły na rurę bez uchwytu' ? 
           <p className='text-mainOrange text-lg font-bold'>{termoblock.secondHole.diameter !== undefined && checkNan(termoblock.secondHole.diameter)}mm</p> 
           : null }
           <p className='text-mainOrange text-lg font-bold'>{termoblock.secondHole?.holeType || 1}</p>
           <p className='text-mainOrange text-lg font-bold'>{termoblock.secondHole?.stringPosition}</p>
         </div> )
         : null} 

         {termoblock.hasPowerCordHole && termoblock.powerCordHole ? 
         (<div className='w-1/2 md:w-1/3 lg:w-1/4 my-2 text-left flex-col'>
           <p>Otwór na przewód zasilający:</p>
           <p className='text-mainOrange text-lg font-bold'>{termoblock.powerCordHole.stringPosition}</p>
         </div>) 
         : null} 
       </div>

       <div className='m-4 md:flex-1 text-center'>
         {!isValid ? 
         (<div>
           <span className='border border-mainOrange inline-block px-6 py-4'>Wpisz w formularzu parametry, po wpisaniu pojawi się cena produktu</span>
         </div>) : 
         (<div className='flex items-center justify-center w-full'>
            <p className='text-2xl'><span className='text-4xl font-bold text-mainOrange'>55,00</span> ZŁ</p>
            <button onClick={() =>
        addItem({
          id: 1,
          name: "Termoblock",
          price: 55,
          quantity: 1,
          details: {
            width: termoblock.width,
            height: termoblock.height,
            color: termoblock.color,
            felc: termoblock.felc,
            hinges: termoblock.hinges,
            firstHole: {
              stringPosition: termoblock.firstHole.stringPosition,
              holeType: termoblock.firstHole.holeType,
            },
            hasSecondHole: false,
            hasPowerCordHole: false,
          },
        })
      }> 
          <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className='m-4 border border-mainOrange rounded-full bg-mainOrange text-white w-8 animate-bounce'>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
          </svg></button>
         </div>)}
       </div>
     </div>
  )
}

export default PriceFooter