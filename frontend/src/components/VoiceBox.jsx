import React , { useState, useEffect } from 'react'
import command from '../APIs/Command'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "th-TH";

export default function VoiceBox({setStatus}) {

    const [isListening, setIsListening] = useState(false);
    const [note, setNote] = useState(null);
  
    useEffect(() => {
      handleListen();
    }, [isListening]);
  
    const handleListen = () => {
      if (isListening) {
        mic.start();
        mic.onend = () => {
          console.log("continue..");
          mic.start();
        };
      } else {
        mic.stop();
        mic.onend = () => {
          console.log("จบแล้ว : "+note);
          command(note, setStatus)
        };
      }
      mic.onstart = () => {
        console.log("Mics on");
      };
  
      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setNote(transcript);
        mic.onerror = (event) => {
          console.log(event.error);
        };
      };
    };
  return (
    <>
        <p>{note}</p>
          <div className="btn" onClick={() => setIsListening((prevState) => !prevState)}>
            {isListening ? <span>❌</span> : <span>🎙️</span>}
          </div>
    </>
  )
}
