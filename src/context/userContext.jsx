import { createContext, useState } from "react";
import run from "../../gemini";

// Create a context to share state across components
export const dataContext = createContext({});

const UserContext = ({ children }) => {
  // State variables for managing the app's status
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [prompt, setPrompt] = useState("Tap the mic to ask me anything.");
  const [response, setResponse] = useState(false);

  // Function to handle the AI's response and speak it.
  async function aiResponse(userPrompt) {
    setPrompt("Thinking...");
    setIsListening(false);
    setResponse(false);

    // Get the AI's response
    let text = await run(userPrompt);
    let newText =
      text.split("**") &&
      text.split("*") &&
      text.replace("google", "Arun Prajapati") &&
      text.replace("Google", "Arun Prajapati");

    // Have the AI speak its response
    speak(newText);
    setResponse(true);
    setPrompt(newText);
  }

  // Function to convert AI's text response to speech
  function speak(text) {
    setIsSpeaking(true);
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";

    // When the AI finishes speaking, stop speaking and start listening again
    text_speak.onend = () => {
      setIsSpeaking(false);
      setPrompt("Tap the mic to ask me anything.");
      recognition.start();
    };

    window.speechSynthesis.speak(text_speak);
  }

  // Set up Speech Recognition for user input
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  // When a user's speech is recognized
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    takeCommand(transcript.toLowerCase());
  };

  // When speech recognition ends
  recognition.onend = () => {
    setIsListening(false);
    setIsSpeaking(false);
  };

  function takeCommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("opening Youtube");
      setPrompt("opening youtube...");
      setTimeout(() => {
        setIsSpeaking(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  }

  const value = {
    recognition,
    isListening,
    isSpeaking,
    prompt,
    response,
    setPrompt,
    setIsListening,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

export default UserContext;
