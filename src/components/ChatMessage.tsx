import { ChatMessage as ChatMessageType } from "@/lib/storage";
import { Bot, User } from "lucide-react";

interface Props {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: Props) => {
  const isBot = message.role === "bot";

  return (
    <div className={`flex gap-3 animate-bounce-in ${isBot ? "" : "flex-row-reverse"}`}>
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
          isBot ? "bg-gradient-bot text-secondary-foreground" : "bg-gradient-user text-primary-foreground"
        }`}
        style={{
          background: isBot
            ? "linear-gradient(135deg, hsl(174, 72%, 56%), hsl(200, 80%, 55%))"
            : "linear-gradient(135deg, hsl(262, 83%, 58%), hsl(290, 70%, 60%))",
        }}
      >
        {isBot ? <Bot size={18} /> : <User size={18} />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? "bg-card border border-border text-card-foreground"
            : "text-primary-foreground"
        }`}
        style={!isBot ? { background: "linear-gradient(135deg, hsl(262, 83%, 58%), hsl(290, 70%, 60%))" } : {}}
      >
        {isBot ? (
          <div className="space-y-2">
            <div className="whitespace-pre-wrap">
              {message.content.split("\n").map((line, i) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  return <p key={i} className="font-bold text-foreground">{line.replace(/\*\*/g, "")}</p>;
                }
                if (line.startsWith("- **")) {
                  const parts = line.replace(/^\- /, "").split(":**");
                  return (
                    <p key={i} className="ml-3">
                      <span className="font-bold">{parts[0].replace(/\*\*/g, "")}:</span>
                      {parts[1]?.replace(/\*\*/g, "")}
                    </p>
                  );
                }
                if (line.startsWith("💡") || line.startsWith("*")) {
                  return <p key={i} className="text-muted-foreground italic text-xs mt-1">{line.replace(/\*/g, "")}</p>;
                }
                return line ? <p key={i}>{line.replace(/\*\*/g, "")}</p> : <br key={i} />;
              })}
            </div>
            {message.confidence !== undefined && (
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Confidence:</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${message.confidence}%`,
                      background: message.confidence > 85
                        ? "hsl(174, 72%, 56%)"
                        : message.confidence > 70
                        ? "hsl(38, 92%, 60%)"
                        : "hsl(0, 84%, 60%)",
                    }}
                  />
                </div>
                <span className="text-xs font-bold" style={{
                  color: message.confidence > 85
                    ? "hsl(174, 72%, 40%)"
                    : message.confidence > 70
                    ? "hsl(38, 92%, 45%)"
                    : "hsl(0, 84%, 50%)",
                }}>{message.confidence}%</span>
              </div>
            )}
          </div>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
