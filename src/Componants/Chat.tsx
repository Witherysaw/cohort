import { useState, useEffect } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setErrorMessage(""); // Clear previous error
    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true); // Show typing animation

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setIsTyping(false); // Hide typing animation

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: data.response },
        ]);
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (error) {
      setIsTyping(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Chatbox Toggle Button */}
      {!isOpen && (
        <button
          className="bg-blue-500 text-white text-3xl p-3 py-4 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          💬
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="w-80 bg-white shadow-xl rounded-lg flex flex-col overflow-hidden border border-gray-300">
          <div className="bg-blue-500 text-white p-3 font-semibold flex justify-between">
            <span className="pt-1">AI Assistant</span>
            <button onClick={() => setIsOpen(false)}>
              <i className="bx bx-x text-3xl"></i>
            </button>
          </div>

          <div className="p-3 h-64 overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Profile Icon */}
                <img
                  src={
                    msg.role === "user"
                      ? "https://i.postimg.cc/CLVSmh9v/user-regular-24.png" // User icon
                      : "https://i.postimg.cc/LXpBtddv/Ai-Chatboticonfor-Mg.png" // Bot icon
                  }
                  alt={msg.role === "user" ? "User" : "Bot"}
                  className="w-6 h-6 rounded-full border border-gray-300"
                />

                {/* Message Box */}
                <div
                  className={`p-2 rounded-md max-w-[75%] break-words ${
                    msg.role === "user"
                      ? "bg-blue-100 self-end text-right"
                      : "bg-gray-200 self-start"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <img
                  src="https://i.postimg.cc/LXpBtddv/Ai-Chatboticonfor-Mg.png"
                  alt="Bot"
                  className="w-6 h-6 rounded-full border border-gray-300"
                />
                <div className="p-2 bg-gray-200 rounded-md max-w-[75%]">
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-sm text-center">
                {errorMessage}
              </div>
            )}
          </div>

          <div className="p-3 border-t flex">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-md focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
              onClick={sendMessage}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
