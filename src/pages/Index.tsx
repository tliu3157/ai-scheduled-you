import { useState } from "react";
import { ChatMessage, QuickAction } from "@/components/ChatMessage";
import { CalendarView } from "@/components/CalendarView";
import { SuggestedEvents } from "@/components/SuggestedEvents";
import { ChatInput } from "@/components/ChatInput";
import { TasksWidget } from "@/components/TasksWidget";
import { CallHistoryWidget } from "@/components/CallHistoryWidget";
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
    title: 'AI Conference',
    time: 'Apr 26 · 10 AM',
    location: 'Convention Center',
    description: 'Latest advances in artificial intelligence and machine learning',
    whyInterested: 'Based on your interest in AI and scheduling automation',
    registrationUrl: 'https://aiconf.example.com',
    category: 'conference' as const,
  },
  {
    id: '2', 
    title: 'Yoga Workshop',
    time: 'Apr 27 · 1:00 PM',
    location: 'Wellness Studio',
    description: 'Beginner-friendly yoga session focusing on stress relief',
    whyInterested: 'Perfect for work-life balance and managing your busy schedule',
    registrationUrl: 'https://yogastudio.example.com',
    category: 'workshop' as const,
  },
  {
    id: '3',
    title: 'Networking Dinner',
    time: 'Apr 28 · 7:00 PM',
    location: 'Downtown Restaurant',
    description: 'Connect with professionals in tech and business',
    whyInterested: 'Great opportunity to expand your professional network',
    category: 'networking' as const,
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
    
    // Simulate AI response for booking tasks/events
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let aiResponseText = "I'll help you with that right away! Let me check your calendar and find the best time.";
      
      if (text.toLowerCase().includes('book') || text.toLowerCase().includes('schedule')) {
        aiResponseText = "I'll handle that booking for you. Let me call them now and find the best available time slot.";
      } else if (text.toLowerCase().includes('task')) {
        aiResponseText = "I've added that to your task list. I can help you schedule time to complete it or book any related appointments.";
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
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

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Left Sidebar */}
          <div className="xl:col-span-1 space-y-6 order-2 xl:order-1">
            {/* Tasks */}
            <TasksWidget onCreateTask={handleSendMessage} />
            
            {/* Call History */}
            <CallHistoryWidget onViewTranscript={(call) => {
              handleSendMessage(`Show me the transcript for ${call.title}`);
            }} />
          </div>

          {/* Chat Section */}
          <div className="xl:col-span-2 order-1 xl:order-2">
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
                      <QuickAction action="Book it for me" onAction={handleQuickAction} />
                      <QuickAction action="Show alternatives" onAction={() => handleSendMessage("Show me other options")} />
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <ChatInput 
                  onSendMessage={handleSendMessage} 
                  placeholder="Ask me to book appointments, schedule tasks, or find events..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-1 space-y-6 order-3">
            {/* Calendar */}
            <div>
              <h2 className="text-lg font-semibold mb-3 text-foreground">Calendar</h2>
              <CalendarView 
                events={mockEvents}
                selectedDate={new Date()}
              />
            </div>

            {/* Suggested Events */}
            <SuggestedEvents 
              events={mockSuggestedEvents}
              onEventSelect={(event) => {
                handleSendMessage(`Book ${event.title} for ${event.time}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;