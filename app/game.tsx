"use client";

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import Confetti from '../components/confetti';
import SingleCard from '../components/SingleCard';
import '../components/card.css';

const l1 = [
  { src: "/sm/sm1.png", matched: false, value: "1" },
  { src: "/sm/sm2.png", matched: false, value: "2" },
  { src: "/sm/sm3.png", matched: false, value: "3" },
  { src: "/sm/sm4.png", matched: false, value: "4" },
  { src: "/sm/sm5.png", matched: false, value: "5" }
];

const l2 = [
  { src: "/sm/sm1.png", matched: false, value: "1" },
  { src: "/sm/sm2.png", matched: false, value: "2" },
  { src: "/sm/sm3.png", matched: false, value: "3" },
  { src: "/sm/sm4.png", matched: false, value: "4" },
  { src: "/sm/sm5.png", matched: false, value: "5" },
  { src: "/sm/sm6.png", matched: false, value: "6" },
  { src: "/sm/sm7.png", matched: false, value: "7" },
  { src: "/sm/sm8.png", matched: false, value: "8" },
  { src: "/sm/sm9.png", matched: false, value: "9" },
  { src: "/sm/sm10.png", matched: false, value: "10" }
];

const l3 = [
  { src: "/op/level21.png", matched: false, value: "1" },
  { src: "/op/level22.png", matched: false, value: "2" },
  { src: "/op/level23.png", matched: false, value: "2" },
  { src: "/op/level24.png", matched: false, value: "3" },
  { src: "/op/level25.png", matched: false, value: "3" },
  { src: "/op/level26.png", matched: false, value: "4" },
  { src: "/op/level27.png", matched: false, value: "4" },
  { src: "/op/level28.png", matched: false, value: "5" },
  { src: "/op/level29.png", matched: false, value: "5" },
  { src: "/op/level210.png", matched: false, value: "6" },
  { src: "/op/level211.png", matched: false, value: "6" },
  { src: "/op/level212.png", matched: false, value: "1" }
];


const l4 = [
  { src: "/draw/cpb1.png", matched: false, value: "0" },
  { src: "/draw/cpb1-result.png", matched: false, value: "0" },
  { src: "/draw/cpb2.png", matched: false, value: "1" },
  { src: "/draw/cpb8.png", matched: false, value: "1" },
  { src: "/draw/cpb12.png", matched: false, value: "2" },
  { src: "/draw/cpb24.png", matched: false, value: "2" },
  { src: "/draw/cpb30.png", matched: false, value: "3" },
  { src: "/draw/cpb31.png", matched: false, value: "3" },
  { src: "/draw/cpb32.png", matched: false, value: "4" },
  { src: "/draw/cpb33.png", matched: false, value: "4" },
  { src: "/draw/cpb34.png", matched: false, value: "5" },
  { src: "/draw/cpb35.png", matched: false, value: "5" },
  { src: "/draw/cpb36.png", matched: false, value: "7" },
  { src: "/draw/cpb37.png", matched: false, value: "7" },
  { src: "/draw/cpb38.png", matched: false, value: "8" },
  { src: "/draw/cpb39.png", matched: false, value: "8" },
  { src: "/draw/cpb40.png", matched: false, value: "9" },
  { src: "/draw/cpb41.png", matched: false, value: "9" },
  { src: "/draw/cpb42.png", matched: false, value: "10" },
  { src: "/draw/cpb43.png", matched: false, value: "10" },
  { src: "/draw/cpb44.png", matched: false, value: "11" },
  { src: "/draw/cpb45.png", matched: false, value: "11" },
  { src: "/draw/cpb46.png", matched: false, value: "1" },
  { src: "/draw/cpb47.png", matched: false, value: "12" },
  { src: "/draw/cpb48.png", matched: false, value: "12" },
  { src: "/draw/cpb49.png", matched: false, value: "13" },
  { src: "/draw/cpb50.png", matched: false, value: "14" },
  { src: "/draw/cpb51.png", matched: false, value: "14" },
  { src: "/draw/cpb52.png", matched: false, value: "15" },
  { src: "/draw/cpb53.png", matched: false, value: "15" },
  { src: "/draw/cpb54.png", matched: false, value: "16" },
  { src: "/draw/cpb55.png", matched: false, value: "16" },
  { src: "/draw/cpb56.png", matched: false, value: "17" },
  { src: "/draw/cpb57.png", matched: false, value: "17" },
  { src: "/draw/cpb58.png", matched: false, value: "18" },
  { src: "/draw/cpb59.png", matched: false, value: "18" },
  { src: "/draw/cpb60.png", matched: false, value: "13" },
  { src: "/draw/cpb61.png", matched: false, value: "19" },
  { src: "/draw/cpb62.png", matched: false, value: "19" },
  { src: "/draw/mia.png", matched: false, value: "34" },
  { src: "/draw/miaC.png", matched: false, value: "34" },
 
];

interface Card {
  id: number;
  src: string;
  matched: boolean;
  value: string;
}

export const Game = () => {
  const [currentImages, setCurrentImages] = useState(l1);
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
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const ratio = level < 3 ? 1 : 2
    if (matchedPairs === currentImages.length / ratio) {
      handlePlayConfetti();
      setTimeout(() => {
        restartGame();
      }, 2000);
   
    }
  }, [matchedPairs, currentImages]);

  useEffect(() => {
    duplicateAndShuffleCards();
  }, [level]);

  useEffect(() => {
    duplicateAndShuffleCards();
  }, []);

  const restartGame = () => {
    if (level === 1) {
      setCurrentImages(l2);
      setLevel(2);

    } else if (level === 2) {
      setCurrentImages(l3);
      setLevel(3);
    } else if (level === 3) {
    
      setCurrentImages(l4);
      setLevel(4);
    }  else if (level === 3) {
      setGameComplete(true);
    }
    setMatchedPairs(0);
    duplicateAndShuffleCards();
  };

  const init = () => {
    setGameComplete(false); // Reset gameComplete state to false
    setCurrentImages(l1); // Restart from the first level
    setLevel(1);
    setMatchedPairs(0);
    duplicateAndShuffleCards();
  };
  const handlePlayConfetti = (volume = 1) => {
    setPlayConfetti(true);
    const audio = document.getElementById("confettiAudio") as HTMLAudioElement;
    audio.volume = volume;
    audio.play();
  };

  const playClick = (volume = 1) => {
    const audio = document.getElementById("click") as HTMLAudioElement;
    audio.volume = volume;
    audio.play();
  };

  const playWrong = (volume = 1) => {
    const audio = document.getElementById("wrong") as HTMLAudioElement;
    audio.volume = volume;
    audio.play();
  };

  const duplicateAndShuffleCards = () => {
    let melangeC = [];
   
    
    if (level < 3 ) {
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
      setDisabled(true);
      if (choiceOne.value === choiceTwo.value) {
        playClick();
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.value === choiceOne.value) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setMatchedPairs((prevMatchedPairs) => prevMatchedPairs + 1);
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
        playWrong()
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
    setPlayConfetti(false);
  };

  const handleChoice = (card: Card) => {
    if (card.id === choiceOne?.id) return;
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  };

  return (
    <div className="p-2">
      <div className="cards-container">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <p className="text-xl text-white">
          Nombre d&apos;essai{turns > 1 ? "s" : ""}: {turns} 
        </p>
      </div>
      
      {gameComplete && (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-10 bg-opacity-50 backdrop-filter backdrop-blur-md">
    <div className="flex justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={init}
      >
        On recommence?
      </button>
    </div>
  </div>
)}


      <Confetti run={playConfetti} />
      <audio id="confettiAudio" src="/confetti.mp3" />
      <audio id="click" src="/click.mp3" />
      <audio id="wrong" src="/wrong.mp3" />
    </div>
  );
};

export default Game;
