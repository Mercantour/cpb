"use client";
import React, { useState } from "react";
import { Game } from "./game";
import "./Home.css";

export default function Home() {
  const [startGame, setStartGame] = useState(false);

  const handleStartGame = () => {
    setStartGame(true);
  };

  return (
    <div className="home-page">
      {!startGame ? (
        <div
          className="start-button-container"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <button className="start-button" onClick={handleStartGame}>
            Let&apos;s Go
          </button>
        </div>
      ) : null}
      <div
        className="game-container"
        style={{
          filter: !startGame ? "blur(8px)" : "none",
          pointerEvents: !startGame ? "none" : "auto",
        }}
      >
        <Game />
      </div>
      {!startGame ? (
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        ></div>
      ) : null}
    </div>
  );
}



