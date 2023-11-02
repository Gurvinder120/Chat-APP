import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState("")
  const [chats, setChats] = useState([
    { name: 'dummy', message: 'sdsd' },
    { name: 'blahh', message: 'sdsd' },
  ])
  const [msg, setMsg] = useState("")

  const [name, setName] = useState('')

  const sendChat = () => {
    if (msg.trim() === '') {
      return; // Don't send empty messages
    }
    const c = [...chats];
    c.push({ name: user, message: msg });
    setChats(c);
    setMsg(""); // Clear the input field after sending the message
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendChat();
    }
  }


  return (
    <div className="main">
      {name?null:
      <div className="name-input">
        <input type="text" placeholder='Enter UserName' onBlur={e=>setName(e.target.value)} />
      </div>
      }
      {name? <div className='chat'>
        <h1>USER: {name}</h1>
        <div className="chats">
          {chats.map((c, index) => (
            <div key={index} className={`chatbubble ${c.name === name ? 'me' : ''}`}>
              <p className='name'>{c.name}</p>
              <p>{c.message}</p>
            </div>
          ))}
        </div>
        <div className="sendchat">
          <input
            type="text"
            placeholder='Type a message'
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={handleKeyPress} // Call sendChat when Enter is pressed
          />
          <button onClick={sendChat}>Send</button>
        </div>
      </div>:null}
    </div>
  )
}

export default App
