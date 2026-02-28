import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatMessage from "@/components/ChatMessage";
import { solveMathQuestion } from "@/lib/mathBot";
import {
  ChatMessage as ChatMessageType,
  getMessages,
  saveMessages,
  canAskQuestion,
  getRemainingQuestions,
  incrementQuestionCount,
} from "@/lib/storage";

const Index = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [remaining, setRemaining] = useState(5);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getMessages());
    setRemaining(getRemainingQuestions());
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const q = input.trim();
    if (!q) return;
    if (!canAskQuestion()) return;

    const userMsg: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: q,
      timestamp: Date.now(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    saveMessages(updated);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

    const result = solveMathQuestion(q);
    incrementQuestionCount();
    setRemaining(getRemainingQuestions());

    const botMsg: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "bot",
      content: result.solution,
      confidence: result.confidence,
      timestamp: Date.now(),
    };

    const final = [...updated, botMsg];
    setMessages(final);
    saveMessages(final);
    setIsTyping(false);
  };

  const clearChat = () => {
    setMessages([]);
    saveMessages([]);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 py-3 text-primary-foreground"
        style={{ background: "linear-gradient(135deg, hsl(262, 83%, 58%), hsl(330, 80%, 60%), hsl(38, 92%, 60%))" }}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={24} />
          <div>
            <h1 className="text-lg font-extrabold leading-tight">EduBuddy</h1>
            <p className="text-xs opacity-90">HappyMinds Academy • Math Tutor</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold bg-primary-foreground/20 rounded-full px-3 py-1">
            {remaining}/5 free today
          </div>
          {messages.length > 0 && (
            <button onClick={clearChat} className="opacity-80 hover:opacity-100 transition-opacity">
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-primary-foreground"
              style={{ background: "linear-gradient(135deg, hsl(262, 83%, 58%), hsl(330, 80%, 60%))" }}
            >
              <Sparkles size={36} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-foreground">Hey there! 👋</h2>
              <p className="text-muted-foreground text-sm mt-1 max-w-xs">
                I'm your math buddy! Ask me anything about algebra, calculus, geometry, or trig. 🚀
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["Solve x² - 5x + 6 = 0", "Find derivative of x³", "Area of circle r=7"].map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-xs px-3 py-2 rounded-full border border-border bg-card hover:bg-muted transition-colors text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isTyping && (
          <div className="flex gap-3 animate-bounce-in">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-secondary-foreground"
              style={{ background: "linear-gradient(135deg, hsl(174, 72%, 56%), hsl(200, 80%, 55%))" }}
            >
              <Sparkles size={18} className="animate-spin" />
            </div>
            <div className="bg-card border border-border rounded-2xl px-4 py-3 text-sm text-muted-foreground">
              Thinking... 🧠
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        {!canAskQuestion() ? (
          <div className="text-center py-3 text-sm text-muted-foreground">
            You've used all 5 free questions today! Come back tomorrow 🌟
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a math question..."
              className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring transition-shadow"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="rounded-full w-10 h-10 p-0"
              style={{ background: "linear-gradient(135deg, hsl(262, 83%, 58%), hsl(330, 80%, 60%))" }}
            >
              <Send size={18} />
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Index;
