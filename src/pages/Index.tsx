import { useState } from "react";
import { ChatMessage, QuickAction } from "@/components/ChatMessage";
import { CalendarView } from "@/components/CalendarView";
import { SuggestedEvents } from "@/components/SuggestedEvents";
import { ChatInput } from "@/components/ChatInput";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const mockEvents = [
  { id: '1', title: 'Car Service', time: '9:00', type: 'appointment' as const },
  { id: '2', title: 'Interview', time: '11:00', type: 'appointment' as const },
];

const mockSuggestedEvents = [
  {
    id: '1',
    title: 'Lunch',
    time: '12:00 PM—1 PM',
    location: 'Downtown',
  },
  {
    id: '2', 
    title: 'Pick up dry cleaning',
    time: '4:30—5:00 PM',
    location: 'Main Street',
  },
];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'I can call businesses in your schedule. Would you like me to book the car service appointment?',
      isUser: false,
      timestamp: '10:30 AM'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'll help you with that right away! Let me check your calendar and find the best time.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleQuickAction = () => {
    handleSendMessage("Sure");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="w-10 h-10 bg-primary">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              SP
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-foreground">Sense Plan</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col shadow-soft">
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Sense Plan A Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <Avatar className="w-8 h-8 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                        SP
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-foreground">Sense Plan A</span>
                  </div>

                  {/* Messages */}
                  {messages.map(message => (
                    <ChatMessage
                      key={message.id}
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  ))}
                  
                  {isTyping && (
                    <ChatMessage
                      message=""
                      isUser={false}
                      isTyping={true}
                    />
                  )}

                  {/* Quick Actions */}
                  {!isTyping && (
                    <div className="flex gap-2 justify-center">
                      <QuickAction action="Sure" onAction={handleQuickAction} />
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <ChatInput onSendMessage={handleSendMessage} />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <div>
              <h2 className="text-lg font-semibold mb-3 text-foreground">Appointments</h2>
              <CalendarView 
                events={mockEvents}
                selectedDate={new Date()}
              />
            </div>

            {/* Suggested Events */}
            <SuggestedEvents 
              events={mockSuggestedEvents}
              onEventSelect={(event) => {
                handleSendMessage(`Add ${event.title} to my calendar for ${event.time}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;