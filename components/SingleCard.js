import Image from 'next/image';
import { useState } from 'react';
import './card.css'

export default function SingleCard({ card, handleChoice, flipped , disabled}) {


  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (


    <div className='card'>
        <div className={ flipped ? "flipped" : ""}>
            <img className='front' src={card.src} alt="front" />
            <img className='back'
                 src="/back4.png"
                 onClick={handleClick}
                 alt="back"
                 />


        </div>


    </div>

  );
}
