import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Clock, Calendar } from "lucide-react";

interface CallRecord {
  id: string;
  title: string;
  contact: string;
  date: string;
  time: string;
  duration?: string;
  status: 'scheduled' | 'completed' | 'missed';
  transcript?: string;
  type: 'appointment' | 'reservation' | 'inquiry';
}

interface CallHistoryWidgetProps {
  onViewTranscript?: (call: CallRecord) => void;
}

const mockCalls: CallRecord[] = [
  {
    id: '1',
    title: 'Appointment in Jit',
    contact: 'AI aut',
    date: 'Yesterday',
    time: '10:18 AM',
    duration: '3m 42s',
    status: 'completed',
    type: 'appointment',
    transcript: 'Called to confirm appointment booking for tomorrow at 2 PM...'
  },
  {
    id: '2',
    title: 'Reservation at Trattolla',
    contact: 'Restaurant Host',
    date: 'Apr 15',
    time: '1:00 PM',
    duration: '2m 15s',
    status: 'completed',
    type: 'reservation',
    transcript: 'Booked table for 4 people on April 20th at 7:30 PM...'
  },
  {
    id: '3',
    title: 'Haircut Downtown Barbers',
    contact: 'Sarah - Stylist',
    date: 'Apr 9',
    time: '1:00 AM',
    duration: '1m 58s',
    status: 'completed',
    type: 'appointment',
    transcript: 'Scheduled haircut appointment for April 12th at 3 PM...'
  },
  {
    id: '4',
    title: 'Dentist Follow-up',
    contact: 'Dr. Smith Office',
    date: 'Tomorrow',
    time: '2:00 PM',
    status: 'scheduled',
    type: 'appointment'
  }
];

export const CallHistoryWidget = ({ onViewTranscript }: CallHistoryWidgetProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'scheduled': return 'bg-primary text-primary-foreground';
      case 'missed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Phone className="h-3 w-3" />;
      case 'scheduled': return <Calendar className="h-3 w-3" />;
      case 'missed': return <Phone className="h-3 w-3" />;
      default: return <Phone className="h-3 w-3" />;
    }
  };

  return (
    <Card className="w-full shadow-soft">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Call History</CardTitle>
          <Badge variant="secondary" className="text-xs">
            AI
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-3">
        {mockCalls.map(call => (
          <div
            key={call.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-event-bg hover:bg-muted transition-colors"
          >
            <Avatar className="w-8 h-8 bg-primary flex-shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                A
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-foreground text-sm truncate">
                  {call.title}
                </h4>
                <Badge variant="secondary" className={`text-xs ${getStatusColor(call.status)} flex items-center gap-1`}>
                  {getStatusIcon(call.status)}
                  {call.status}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-1">{call.contact}</p>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {call.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {call.time}
                </div>
                {call.duration && (
                  <span className="text-xs">
                    {call.duration}
                  </span>
                )}
              </div>
            </div>
            
            {call.transcript && call.status === 'completed' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewTranscript?.(call)}
                className="text-xs px-2 py-1 h-auto"
              >
                View
              </Button>
            )}
          </div>
        ))}
        
        {mockCalls.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">No call history</p>
            <p className="text-xs mt-1">AI will make calls on your behalf</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};