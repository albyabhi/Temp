import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import song from "../assets/song.mp3";

const balloonColors = ["#FF5733", "#FFC300", "#36D399", "#3B82F6", "#A855F7", "#FF69B4", "#00CED1"];

const Balloon = ({ index }) => {
  const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];

  const [position, setPosition] = useState({
    left: `${Math.random() * 100}vw`,
    bottom: "-50px",
    animationDuration: `${5 + Math.random() * 3}s`,
    scale: 0.3 + Math.random() * 0.7,
  });

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => ({
        ...prev,
        left: `${Math.random() * 100}vw`,
        bottom: "-50px",
      }));
    };

    const intervalId = setInterval(animate, (5 + Math.random() * 3) * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <BalloonContainer
      style={{
        left: position.left,
        bottom: position.bottom,
        transform: `scale(${position.scale})`,
        animation: `float-${index} ${position.animationDuration} infinite linear`,
      }}
    >
      <BalloonShape color={randomColor} />
      <BalloonString />
      <style>
        {`
          @keyframes float-${index} {
            0% { transform: translate(0, 0) scale(${position.scale}); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(${-50 + Math.random() * 100}px, -100vh) scale(${position.scale}); opacity: 0; }
          }
        `}
      </style>
    </BalloonContainer>
  );
};

const BalloonAnimation = () => {
  const [balloons, setBalloons] = useState([]);
  const audioRef = useRef(new Audio(song));

  useEffect(() => {
    setBalloons(Array.from({ length: 15 }, (_, i) => i));

    // Play the music automatically
    const audio = audioRef.current;
    audio.loop = true;
    audio.play().catch((error) => console.log("Autoplay blocked:", error));

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <Wrapper>
      <Message>Happy 21st Birthday Eenu 🎉</Message>
      {balloons.map((index) => (
        <Balloon key={index} index={index} />
      ))}
    </Wrapper>
  );
};

export default BalloonAnimation;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #ebf8ff, white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Message = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: #ff4081;
  font-weight: bold;
  text-align: center;
`;

const BalloonContainer = styled.div`
  position: absolute;
  will-change: transform;
`;

const BalloonShape = styled.div`
  width: 50px;
  height: 50px;
  background: ${(props) => props.color};
  border-radius: 50%;
  position: relative;
  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }
`;

const BalloonString = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  width: 2px;
  height: 30px;
  background: gray;
  transform: translateX(-50%);
  @media (max-width: 600px) {
    height: 15px;
  }
`;
