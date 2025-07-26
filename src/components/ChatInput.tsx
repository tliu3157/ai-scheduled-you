import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput = ({ 
  onSendMessage, 
  placeholder = "Send a message...", 
  disabled = false 
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
  };

  return (
    <div className="flex gap-2 p-4 bg-white border-t border-border">
      <div className="flex-1 relative">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="pr-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleVoiceInput}
          className={`absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 ${
            isListening ? 'text-destructive' : 'text-muted-foreground'
          }`}
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>
      
      <Button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        size="sm"
        className="px-3"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};