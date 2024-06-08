import styles from './MessageView.module.css';
import { useState,useEffect,useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import logo from '../../Images/logo.svg'
import send from '../../Images/send.png'
import closeIcon from '../../Images/crosshair.png'

function MessageView({ragState,setChatBotOpen}) {
  const baseURL = "http://192.168.201.254:8888/llm-query/"
  const [messages,setMessages] = useState([])
  const inputRef = useRef(null)
  const messageContainerRef = useRef(null)

  const handleRagStateChange = async ()=>{
    let newMessages = []
    let firstMessage = {
      id:uuidv4(),
      from:"bot",
      message:`Hi, How can i help you today. I am programmed to answer your questions about ${ragState}`,
      timeStamp:new Date().toLocaleString(),
      hasImage :false,
      imageURL : '',
      hasLink:false,
      linkURL:''

    }
    newMessages.push(firstMessage)
    newMessages.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
    setMessages(newMessages)
  }

  const handleSendMessage = async () => {
    if (inputRef.current.value.length > 0) {
      let newMessage = {
        id: uuidv4(),
        from: "user",
        message: inputRef.current.value,
        timeStamp: new Date().toLocaleString()
      };
      let tempInp = inputRef.current.value
      inputRef.current.value = "";
      let updatedMessages = [...messages, newMessage];
      updatedMessages.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
      setMessages(updatedMessages);
      let botReply = await axios.post(baseURL, {"query": tempInp});
      console.log(botReply)
      const regex = /<<(.*?)>>/;
      const match = botReply.data.sentence.match(regex);
      const imageURL = match ? match[1] : '';
      let remainingText = botReply.data.sentence.replace(regex, '').trim();

      const regexURL = /\[\[(.*?)\]\]/;
      const match2 = remainingText.match(regexURL);
      const linkURL = match2 ? match2[1] : '';
      remainingText = remainingText.replace(regexURL, '').trim();

      console.log(remainingText)
      console.log(linkURL)
      let bot_message = {
        id: uuidv4(),
        from: "bot",
        message: remainingText,
        timeStamp: new Date(botReply.data.retTime * 1000).toLocaleString(),
        hasImage : match?true:false,
        imageURL : imageURL,
        hasLink:match2?true:false,
        linkURL:linkURL
      };
      if(match2){
        window.open(linkURL, '_blank', 'noopener,noreferrer');
      }
      updatedMessages = [...updatedMessages, bot_message];
      
      updatedMessages.sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
      
      setMessages(updatedMessages);
    }
  };
  

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(()=>{
    handleRagStateChange()
  },[ragState])

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.message_view_wrapper}>
      <div className={styles.message_view_inner}>
        <div className={styles.close_wrapper}>
          <img src={closeIcon} onClick={()=>setChatBotOpen(false)}/>
        </div>
        <div className={styles.message__header}>
          <div className={styles.__image_wrapper}>
            <img src={logo}/>
          </div>
        </div>
        <div ref={messageContainerRef} className={styles.message_body}>
          {messages.map((item)=>{
            if(item.from === "bot"){
              return (<div key={item.id} className={styles.bot__message}>
                <p>{item.message}</p>
                {item.hasImage &&<div className={styles.message_img_wrapper}><img  src={item.imageURL}/></div>} 
              </div>)
            }
            return (<div key={item.id} className={styles.user__message}>
              <p>{item.message}</p>
            </div>)
          })}
        </div>
        <div className={styles.send_message_wrapper}>
          <input ref={inputRef} onKeyUp={handleKeyPress} placeholder='Shoot your question'/>
          <div className={styles.send_icon}>
            <img src={send} onClick={handleSendMessage}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageView;
