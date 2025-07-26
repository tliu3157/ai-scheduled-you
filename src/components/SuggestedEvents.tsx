import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, ExternalLink, Star } from "lucide-react";

interface SuggestedEvent {
  id: string;
  title: string;
  time: string;
  location?: string;
  description?: string;
  whyInterested?: string;
  registrationUrl?: string;
  category: 'conference' | 'workshop' | 'networking' | 'social';
}

interface SuggestedEventsProps {
  events: SuggestedEvent[];
  onEventSelect?: (event: SuggestedEvent) => void;
}

export const SuggestedEvents = ({ events, onEventSelect }: SuggestedEventsProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'conference': return 'bg-primary text-primary-foreground';
      case 'workshop': return 'bg-secondary text-secondary-foreground';
      case 'networking': return 'bg-accent text-accent-foreground';
      case 'social': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="w-full shadow-soft">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Suggested Events</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-4">
        {events.map(event => (
          <div
            key={event.id}
            className="p-4 rounded-xl bg-event-bg hover:bg-muted transition-colors border border-border"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-foreground">{event.title}</h4>
                  <Badge variant="secondary" className={`text-xs ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mb-2">
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
                  <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                )}
                
                {event.whyInterested && (
                  <div className="flex items-start gap-2 p-2 bg-muted/50 rounded-lg mb-3">
                    <Star className="h-3 w-3 mt-0.5 text-primary flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Why this might interest you:</span> {event.whyInterested}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEventSelect?.(event)}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Add to Calendar
              </Button>
              {event.registrationUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary hover:bg-primary/10"
                  onClick={() => window.open(event.registrationUrl, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Register
                </Button>
              )}
            </div>
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