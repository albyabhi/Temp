import React, { useState, useEffect } from "react";
import styled from "styled-components";


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
const messages = [
  "Hey eenu, how is your day?",
  "Happy Birthday 🎂 kunji penne ",
  "May God bless you",
  "I am very lucky to have you in my life. I wish to celebrate every coming birthday with you. I will always be a part of your life.",
  "I Love You "
];

const buttonText = [
  "click chyyu panna enu",
  "onnude click chyy",
  "ineem click",
  "onnude click",
  "chyyunne panna enu",
]

const Welcome = ({ setPageChange }) => {
  const [balloons, setBalloons] = useState([]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    setBalloons(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  const handleClick = () => {
    console.log("setPageChange:", setPageChange); // Debugging

    if (messageIndex === messages.length - 1) {
      setPageChange(true);
    } else {
      setMessageIndex((prevIndex) => prevIndex + 1);
    }
  };

  
  

  return (
    <Wrapper>
      {balloons.map((index) => (
        <Balloon key={index} index={index} />
      ))}
      <Content>
        <CardContainer>
          <Title>{messages[messageIndex]}</Title>
          <StyledButton onClick={handleClick}>{buttonText[messageIndex % buttonText.length]}</StyledButton>
        </CardContainer>
      </Content>
    </Wrapper>
  );
};

export default Welcome;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to bottom, #ebf8ff, white);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  text-align: center;
  z-index: 10;
  width: 90%;
  max-width: 400px;
`;

const CardContainer = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.2); /* More transparency */
  backdrop-filter: blur(15px); /* Stronger blur */
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle border */
  color: white; /* Ensure text is readable on glass */
  
  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;


const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const StyledButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #2563eb;
  }
  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
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
