"use client";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import "../components/SingleCard"
import SingleCard from '../components/SingleCard';



const images = [
  { src: "/m1.png" , matched: false},
  { src: "/m2.png" , matched: false },
  { src: "/m3.png"  , matched: false},
  { src: "/m4.png"  , matched: false},
  { src: "/m5.png"  , matched: false},
 
];


interface Card {
  id: number;
  src: string;
  matched: boolean
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);

  const duplicateAndShuffleCards = () => {
    const melangeC = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(melangeC);
    setChoiceOne(null);
    setChoiceTwo(null)
    setTurns(0);
  };

  useEffect(() => {
    duplicateAndShuffleCards()

  },[])


  useEffect(() => {
    const updateContainerStyles = () => {
      if (containerRef.current) {
        const windowWidth = window.innerWidth;
        const gridWidth = (1 / 2) * windowWidth - 40; // Subtracting 40px to account for the padding

        const numColumns = 5; // Set the number of columns to 5
        const columnWidth = `${Math.floor(gridWidth / numColumns)}px`;

        containerRef.current.style.display = 'grid';
        containerRef.current.style.gridTemplateColumns = `repeat(${numColumns}, ${columnWidth})`;
        containerRef.current.style.padding = '20px'; // Set consistent padding
        containerRef.current.style.gridGap = '10px'; // Set consistent gap between pictures
        containerRef.current.style.overflow = 'hidden'; // Hide overflow to prevent scrolling
      }
    };

    window.addEventListener('resize', updateContainerStyles);
    updateContainerStyles();

    return () => {
      window.removeEventListener('resize', updateContainerStyles);
    };
  }, []);

  useEffect(() => {
  
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        console.log("It's a match");
        setCards(prevCards => {
          return prevCards.map(card=> {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn();
      } else {
        console.log("Don't match");
        setTimeout( () =>  resetTurn(), 1000)
       
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false)
  };

  const handleChoice = (card: Card) => {
    if(card.id === choiceOne?.id) return;
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };


  return (
    <div className="p-20">
      <button onClick={duplicateAndShuffleCards} className="mb-8">New Game</button>
      <div className="cards-container" ref={containerRef}>
        {cards.map((card) => (
          <SingleCard key={card.id}
                       card={card}
                       handleChoice={handleChoice}
                       flipped={ card === choiceOne || card === choiceTwo || card.matched}
                       disabled= {disabled }
                       />
        
        ))}
      </div>
      <p> Nb essai : { turns } </p>
    </div>
  );
}