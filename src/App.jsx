import { Mic } from "lucide-react";
import aiImag from "../media/ai.jpg";
import { useContext } from "react";
import { dataContext } from "./context/userContext";
import speakImg from "../media/speak.gif";
import aiVoiceImg from "../media/aiVoice.gif";

const App = () => {
  const {
    recognition,
    isListening,
    setIsListening,
    isSpeaking,
    prompt,
    setPrompt,
  } = useContext(dataContext);

  const handleMicClick = () => {
    if (!recognition) {
      console.error("SpeechRecognition not supported in this browser.");
      return;
    }

    try {
      if (!isListening) {
        setPrompt("Listening...");
        recognition.start();
      } else {
        setIsListening(false);
        setPrompt("Tap the mic to ask me anything.");
        recognition.stop();
      }
    } catch (err) {
      console.error("Recognition error:", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white font-sans flex flex-col items-center justify-center p-4">
      <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-lg w-full text-center border border-gray-700">
        {/* AI Avatar */}
        <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl font-bold mb-4">
          <img
            src={aiImag}
            className="object-cover object-center h-full overflow-hidden rounded-full"
          />
        </div>

        {/* Intro Text */}
        <p className="font-semibold text-center px-2 text-xl py-2.5 bg-gradient-to-l to-blue-400 from-pink-400 bg-clip-text text-transparent">
          I'm Apna AI, Your Advanced Virtual Assistant
        </p>

        {/* Status + Prompt */}
        <div className="mt-6 min-h-[50px]">
          <p className="font-light text-gray-300 transition-all duration-300">
            {isSpeaking
              ? "Speaking..."
              : isListening
              ? "Listening..."
              : "Tap the mic to start"}
          </p>
        </div>
        {prompt}

        {/* Mic Button */}
        <button
          className={`flex items-center gap-2 my-6 mx-auto
            text-white font-medium 
            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 
            px-6 py-3 rounded-full shadow-lg
            hover:scale-105 transition-all duration-300
            focus:ring-2 focus:ring-offset-2 focus:ring-pink-400
            ${isSpeaking ? "opacity-70 cursor-not-allowed" : ""}
          `}
          onClick={handleMicClick}
          disabled={isSpeaking} // disable only while speaking
        >
          {isListening
            ? "Stop Listening"
            : isSpeaking
            ? "Speaking..."
            : "Start Talking"}
          <Mic className="w-5 h-5" />
        </button>

        {/* Visual Feedback (optional GIFs) */}
        <div className="mt-4 h-16 flex justify-center">
          {isListening && (
            <img src={speakImg} alt="Listening..." className="h-12" />
          )}
          {isSpeaking && (
            <img src={aiVoiceImg} alt="Speaking..." className="h-12 w-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
