import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const CounterContainer = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(0, 0, 0);
  margin-top: 2rem;
  width: 20rem;
  border: 1px solid rgb(26, 115, 232);
  border-radius: 1rem;
  overflow: hidden;
`;

const CounterValue = styled.div`
  width: ${(props) => props.width}%;
  background-color: rgb(26, 115, 232);
  color: white;
  transition: width 0.2s ease-out;
`;

const MainContainer = styled.div`
  width: 20rem;
  height: 30rem;
  background: linear-gradient(0deg, rgb(123, 120, 120), white);
  margin: 2rem auto;
  border: 2px solid grey;
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 2rem;
  width: 100%;
  background: grey;
  text-align: center;
  line-height: 2rem;
  color: white;
  font-weight: bold;
`;

const ChatArea = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  padding: 0.5rem;
`;

const MessageDiv = styled.div`
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: fit-content;
  max-width: 18rem;
  margin: 0.5rem;
  word-wrap: break-word;
  align-self: ${(props) => (props.isRight ? "flex-end" : "flex-start")};
  background: ${(props) =>
    props.isRight ? "rgb(34, 193, 195)" : "rgb(26, 115, 232)"};
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease-in, transform 0.5s ease-in;
`;

const SearchField = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  border-radius: 0.5rem;
  padding: 0.4rem;
  border: 1px solid grey;
`;

const Button = styled.button`
  width: 3rem;
  border-radius: 0.5rem;
  cursor: pointer;
  background-color: rgb(26, 115, 232);
  color: white;
  border: none;
`;

const Chatbot = () => {
  const [counter, setCounter] = useState(0);
  const [interval, setIntervalValue] = useState(2000);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isRightText, setIsRightText] = useState(true);

  // Counter Logic
  useEffect(() => {
    if (counter < 100) {
      const timeout = setTimeout(() => {
        setCounter((prev) => prev + 1);
        if (interval > 200) {
          setIntervalValue((prev) => prev - 100);
        }
      }, interval);
      return () => clearTimeout(timeout);
    }
  }, [counter, interval]);

  // Add Message Logic
  const addMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      text: inputValue,
      isRight: isRightText,
    };

    setMessages((prev) => [newMessage, ...prev]);
    setInputValue("");
    setIsRightText((prev) => !prev);
  };

  return (
    <Container>
      {/* Counter */}
      <CounterContainer>
        <CounterValue width={counter}>{counter}</CounterValue>
      </CounterContainer>

      {/* Chatbot */}
      <MainContainer>
        <Header>Chatbot</Header>
        <ChatArea>
          {messages.map((message, index) => (
            <MessageDiv
              key={index}
              isRight={message.isRight}
              style={{ opacity: 1, transform: "translateY(0)" }}
            >
              {message.text}
            </MessageDiv>
          ))}
        </ChatArea>
        <SearchField>
          <Input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addMessage()}
          />
          <Button onClick={addMessage}>Send</Button>
        </SearchField>
      </MainContainer>
    </Container>
  );
};

export default Chatbot;

export function minPlatformRequired(arrival, dep) {
  let totalLength = arrival.length;
  arrival.sort((a, b) => a - b);
  dep.sort((a, b) => a - b);

  let platforms = 1,
    maxPlatforms = 1;

  let i = 1,
    j = 0;
  while (i < totalLength && j < totalLength) {
    if (arrival[i] <= dep[j]) {
      platforms++;
      i++;
    } else {
      platforms--;
      j++;
    }

    maxPlatforms = Math.max(platforms, maxPlatforms);
  }

  return maxPlatforms;
}
