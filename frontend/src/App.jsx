import React,{ useState} from "react";
import "./App.css";
import JimImage from './components/JimImage'
import VoiceBox from './components/VoiceBox'

function App() {
  const [status, setStatus] = useState("normal")
  return (
    <div className="container">
      <h1>Mr. jim assistant</h1>
      <div className="box">
        <JimImage type={status}/>
        <div className="cmd">
          <VoiceBox setStatus={setStatus}/>
        </div>
      </div>
    </div>
  );
}

export default App;
