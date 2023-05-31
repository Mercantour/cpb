"use client";
import Image from 'next/image';
import React, { useState, useEffect, useRef, useCallback, use  } from 'react';
import "../components/SingleCard"
import Confetti from '../components/confetti';
import SingleCard from '../components/SingleCard';

import '../components/card.css'


const l1 = [
  { src: "/sm/sm1.png" , matched: false  ,   value : "1"    },
  { src: "/sm/sm2.png" , matched: false  ,   value : "2"    },
  { src: "/sm/sm3.png"  , matched: false  ,  value : "3"   }  ,
  { src: "/sm/sm4.png"  , matched: false  ,  value : "4"   },
  { src: "/sm/sm5.png"  , matched: false  ,  value : "5"   }
  
];



const l2 = [
    { src: "/sm/sm1.png" , matched: false  ,   value : "1"    },
    { src: "/sm/sm2.png" , matched: false  ,   value : "2"    },
    { src: "/sm/sm3.png"  , matched: false  ,  value : "3"   }  ,
    { src: "/sm/sm4.png"  , matched: false  ,  value : "4"   },
    { src: "/sm/sm5.png"  , matched: false  ,  value : "5"   },
    { src: "/sm/sm6.png"  , matched: false  ,  value : "6"   },
     { src: "/sm/sm7.png"  , matched: false  ,  value : "7"   },
      { src: "/sm/sm8.png"  , matched: false  ,  value : "8"   },
     { src: "/sm/sm9.png"  , matched: false  ,  value : "9"   },
     { src: "/sm/sm10.png"  , matched: false  ,  value : "10"   },
    
  ];
  

const l3 = [
  { src: "/op/level21.png", matched: false ,  value : "1" },
  { src: "/op/level22.png", matched: false ,  value : "2" },
  { src: "/op/level23.png", matched: false ,  value : "2" },
  { src: "/op/level24.png", matched: false ,  value : "3" },
  { src: "/op/level25.png", matched: false ,  value : "3" },
  { src: "/op/level26.png", matched: false ,  value : "4" },
  { src: "/op/level27.png", matched: false ,  value : "4" },
  { src: "/op/level28.png", matched: false ,  value : "5" },
  { src: "/op/level29.png", matched: false ,  value : "5" },
  { src: "/op/level210.png", matched: false ,  value : "6" },
  { src: "/op/level211.png", matched: false ,  value : "6" },
  { src: "/op/level212.png", matched: false ,  value : "1" },

];




interface Card {
  id: number;
  src: string;
  matched: boolean
  value: string
}

export const Game = () => {



  const [currentImages, setCurrentImages] = useState(l1)
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [disabled, setDisabled] = useState(false);
  const [playConfetti, setPlayConfetti] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [level,setLevel] = useState(1)

    const [cons,setCons] = useState("debug")

    useEffect(() => {
        if (matchedPairs === currentImages.length) {
          handlePlayConfetti();
          setTimeout(() => {
            setCons("boom");
            setGameComplete(true);
            restartGame(); // Call restartGame when the first level is completed
          }, 2000);
        }
      }, [matchedPairs, currentImages]);


      useEffect(() => {
        duplicateAndShuffleCards();
      }, [level]);


      useEffect(() => {
        duplicateAndShuffleCards()
    
      },[])

      const restartGame = () => {
        console.log("VICTOIR ON RESET");
        if (level === 1) {
          setCurrentImages(l2);
          setLevel(2);
        } else if (level === 2) {
          setCurrentImages(l3);
          setLevel(3);
        }
        setMatchedPairs(0); // Reset matchedPairs here
        duplicateAndShuffleCards();
      };
  


  const handlePlayConfetti = (volume = 1) => {
    setPlayConfetti(true);
    const audio = document.getElementById("confettiAudio") as HTMLAudioElement;
    audio.volume = volume; // Set the volume
    audio.play();
    };

  const playClick  = (volume = 1) => {

    const audio = document.getElementById("click") as HTMLAudioElement;
    audio.volume = volume; // Set the volume
    audio.play();
      };

      const duplicateAndShuffleCards = () => {
        setCons(String(level));
        let melangeC = [];
        if  (!(level === 3)) { 
          melangeC = [...currentImages, ...currentImages];
        } else {
          melangeC = currentImages;
        }
      
        melangeC = melangeC
          .sort(() => Math.random() - 0.5)
          .map((card) => ({ ...card, id: Math.random() }));
      
        setCards(melangeC);
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns(0);
      };



  useEffect(() => {
  
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.value === choiceTwo.value) {
        console.log("It's a match");
        playClick()
        setCards(prevCards => {
          return prevCards.map(card=> {
            if (card.value === choiceOne.value) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        setMatchedPairs((prevMatchedPairs) => prevMatchedPairs + 1);
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
    setPlayConfetti(false);
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
    <>
      
    <div className="p-2">
        <div> {cons} </div>
    <button onClick={() => {
  if (!isAudioInitialized) {
    handlePlayConfetti(0.001); // Initialize the audio with a very low volume
    setIsAudioInitialized(true);
  }
  duplicateAndShuffleCards();
}} className="mb-8">New Game</button>

    <div className='cards-container' >
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
      
      <Confetti run={playConfetti} />
      <audio id="confettiAudio" src="/confetti.mp3" /> 
      <audio id="click" src="/click.mp3" /> 
    </div>
    </>
  );
}