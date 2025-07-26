import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  isTyping?: boolean;
}

export const ChatMessage = ({ message, isUser, timestamp, isTyping }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <Avatar className="w-8 h-8 bg-primary flex-shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
            SP
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[85%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm ${
            isUser
              ? 'bg-chat-user text-white ml-auto'
              : 'bg-chat-assistant text-foreground'
          }`}
        >
          {isTyping ? (
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          ) : (
            message
          )}
        </div>
        {timestamp && (
          <div className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </div>
        )}
      </div>

      {isUser && (
        <Avatar className="w-8 h-8 bg-secondary flex-shrink-0">
          <AvatarFallback className="bg-secondary text-secondary-foreground text-sm font-medium">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

interface QuickActionProps {
  action: string;
  onAction: () => void;
}

export const QuickAction = ({ action, onAction }: QuickActionProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onAction}
      className="bg-white hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {action}
    </Button>
  );
};