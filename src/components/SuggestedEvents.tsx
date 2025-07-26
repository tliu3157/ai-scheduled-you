import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";

interface SuggestedEvent {
  id: string;
  title: string;
  time: string;
  location?: string;
  description?: string;
}

interface SuggestedEventsProps {
  events: SuggestedEvent[];
  onEventSelect?: (event: SuggestedEvent) => void;
}

export const SuggestedEvents = ({ events, onEventSelect }: SuggestedEventsProps) => {
  return (
    <Card className="w-full shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Suggested Events</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-3">
        {events.map(event => (
          <div
            key={event.id}
            className="flex items-center justify-between p-3 rounded-xl bg-event-bg hover:bg-muted transition-colors"
          >
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{event.title}</h4>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {event.time}
                </div>
                {event.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {event.location}
                  </div>
                )}
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEventSelect?.(event)}
              className="ml-3 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Add
            </Button>
          </div>
        ))}
        
        {events.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No suggestions at the moment</p>
            <p className="text-xs mt-1">Check back later for personalized recommendations</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};