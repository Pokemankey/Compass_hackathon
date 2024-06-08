import styles from './App.module.css';
import MessageView from './Componenets/Chatbot/MessageView';
import { useState,useEffect,useRef } from 'react';

import compass_logo from './Images/Compass_Logo.svg'
import bot_icon from './Images/bot-icon.png'
import liveStream from './Images/liveStrem.mp4'

import PredictionSlider from './Componenets/Slider/Slider';

function App() {
  const videoRef = useRef(null)
  const videoRef2 = useRef(null)

  const [chatbotOpen,setChatBotOpen] = useState(false)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; 
      video.play().catch(error => {
        console.error('Error attempting to play', error);
      });
      for(let i=1;i<6;i++){
        const message = document.getElementById(i)
        const delay = Math.random() * 2;
        message.style.animationDelay = `${delay}s`;
      }

    }
    const video2 = videoRef2.current
    if (video2) {
      video2.muted = true; 
      video2.play().catch(error => {
        console.error('Error attempting to play', error);
      });
    }
  }, []);
  return (
    <div className={styles.__wrapper}>
      {chatbotOpen && <MessageView ragState="compass" setChatBotOpen={setChatBotOpen}/>}
      <div className={styles.bot_logo} onClick={()=>{setChatBotOpen(true)}}>
        <img src={bot_icon}/>
      </div>
      <div className={styles.video_bg}>
        <video ref={videoRef} autoPlay={true} loop={true} src='https://www.dl.dropboxusercontent.com/scl/fi/j4khqbkrt2xpfw8g640c1/Compass-Season2-Logo-2.mp4?rlkey=1etyy2t1u3io88l1qbrwxuw9k&dl=0'></video>
      </div>
      <div className={styles.overlayContent}>
          <div className={styles.o_header}>
              <img src={compass_logo}/>
              <div className={styles.o_tabs}>
                  <p>WATCH LIVE!</p>
                  <button className={styles.o_btn}>EN</button>
                  <button className={styles.o_btn_s}>AR</button>
              </div>
          </div>
          <div className={styles.o_body}>
            <h1>COMPASS CIRCUIT<br/>$450,000 prize pool<br/>LAN finals June 2024</h1>
            <button>Get Your Ticket!</button>
          </div>
      </div>
      <div className={styles.video_player}>
        <h1>Live Stream : Real Time Dubbing + Real Time Predictions </h1>
      <PredictionSlider />
        <div className={styles.inner_player}>
          <video ref={videoRef2} autoPlay={true} loop={true} controls={true} src={liveStream}></video>
          <div className={styles.chat_room}>
            <div className={styles.test_msg} id={1}>
            <div className={styles.test_logo} style={{ backgroundColor: 'blue' }}></div>
                <div className={styles.test_text}>Astralis Dominates EPL 2024</div>
            </div>
            <div className={styles.test_msg} id={2}>
                <div className={styles.test_logo} style={{ backgroundColor: 'green' }}></div>
                <div className={styles.test_text}>Fnatic Triumphs at DreamHack Masters</div>
            </div>
            <div className={styles.test_msg} id={3}>
                <div className={styles.test_logo} style={{ backgroundColor: 'teal' }}></div>
                <div className={styles.test_text}>Natus Vincere Conquers IEM Beijing</div>
            </div>
            <div className={styles.test_msg} id={4}>
                <div className={styles.test_logo} style={{ backgroundColor: 'blueviolet' }}></div>
                <div className={styles.test_text}>Vitality's Victory at BLAST Pro Series</div>
            </div>
            <div className={styles.test_msg} id={5}>
                <div className={styles.test_logo} style={{ backgroundColor: 'deepskyblue' }}></div>
                <div className={styles.test_text}>G2 Esports Crowned Champions of ESL Pro League</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
