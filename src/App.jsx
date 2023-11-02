import { getDatabase, ref, push, onChildAdded } from "firebase/database";
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const db = getDatabase();
  const chatsListRef = ref(db, 'chats');

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState('');

  const sendChat = () => {
    if (msg.trim() === '') {
      return;
    }

    push(chatsListRef, {
      name,
      message: msg
    });

    setMsg('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendChat();
    }
  }

  useEffect(() => {
    // Use onChildAdded to listen for new child items in the chatsListRef
    const unsubscribe = onChildAdded(chatsListRef, (snapshot) => {
      const chatData = snapshot.val();
      setChats(chats => [...chats, chatData]);
    });

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Add an empty dependency array to run the effect only once when the component mounts

  return (
    <div className="main">
      {name ? null :
        <div className="name-input">
          <input type="text" placeholder='Enter UserName' onBlur={e => setName(e.target.value)} />
        </div>
      }
      {name ? <div className='chat'>
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
      </div> : null}
    </div>
  );
}

export default App;
