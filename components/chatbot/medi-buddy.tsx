"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MediBuddyProps {
  userName?: string
}

export default function MediBuddy({ userName = "there" }: MediBuddyProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState([
    {
      text: `Hi ${userName}! I'm MediBuddy, your personal health assistant. How can I help you today?`,
      sender: "bot"
    }
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (inputValue.trim()) {
      // Add user message
      setMessages([...messages, { text: inputValue, sender: "user" }])
      
      // Simulate bot response (in a real app, this would call an API)
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "I understand you're asking about " + inputValue + ". Let me help you with that.",
          sender: "bot" 
        }])
      }, 1000)
      
      setInputValue("")
    }
  }

  const quickOptions = [
    { text: "Book appointment", action: () => {} },
    { text: "Medical advice", action: () => {} },
    { text: "My medications", action: () => {} },
    { text: "Contact support", action: () => {} }
  ]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <>
      {/* Floating chatbot button */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow z-30"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chatbot window */}
      {isVisible && (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-white rounded-lg shadow-lg w-full max-w-sm z-50 overflow-hidden border">
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-white rounded-full p-2 mr-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </div>
              <h3 className="font-medium">MediBuddy</h3>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-white hover:opacity-75"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="p-4 h-80 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}>
                  <div className={`${
                    message.sender === 'user' 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-blue-600 text-white'
                    } rounded-lg py-2 px-3 max-w-[80%]`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {/* Quick options - show only for the first message */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-center text-gray-500">Quick options</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickOptions.map((option, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setMessages([
                            ...messages, 
                            { text: option.text, sender: "user" },
                            { text: `I'll help you with ${option.text.toLowerCase()}. What specifically do you need?`, sender: "bot" }
                          ])
                        }}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat input */}
          <div className="border-t p-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Button 
                size="icon" 
                className="ml-2 bg-blue-600 hover:bg-blue-700"
                onClick={handleSend}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}