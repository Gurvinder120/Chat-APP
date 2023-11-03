import { getDatabase, ref, push, onChildAdded } from "firebase/database";
import { useEffect, useState } from "react";
import "./App.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setName(result.user.displayName);
        // ...
        const response = await fetch(
          "https://chat-app-ag0w.onrender.com/demo",
          {
            method: "POST",
            body: JSON.stringify(result.user),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.text();

        console.log(data);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const db = getDatabase();
  const chatsListRef = ref(db, "chats");

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");

  const sendChat = () => {
    if (msg.trim() === "") {
      return;
    }

    push(chatsListRef, {
      name,
      message: msg,
    });

    setMsg("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendChat();
    }
  };

  const updateHeight = () => {
    const el = document.getElementById("chat-container");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    const unsubscribe = onChildAdded(chatsListRef, (snapshot) => {
      const chatData = snapshot.val();
      setChats((chats) => [...chats, chatData]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="main">
      {name ? null : (
        <div className="name-input">
          <button onClick={googleLogin} className="login-btn">
            Login With Google
          </button>
        </div>
      )}
      {name ? (
        <div id="chat-container" className="chat">
          <h1>USER: {name}</h1>
          <div className="chats">
            {chats.map((c, index) => (
              <div
                key={index}
                className={`chatbubble ${c.name === name ? "me" : ""}`}
              >
                <p className="name">{c.name}</p>
                <p>{c.message}</p>
              </div>
            ))}
          </div>
          <div className="sendchat">
            <input
              type="text"
              placeholder="Type a message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={sendChat}>Send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
