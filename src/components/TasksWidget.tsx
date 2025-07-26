import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

interface TasksWidgetProps {
  onCreateTask?: (task: string) => void;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Schedule dentist appointment',
    description: 'Need to book cleaning appointment',
    dueDate: 'Tomorrow',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    title: 'Book flight to NYC',
    description: 'For business trip next month',
    dueDate: 'This week',
    priority: 'medium',
    completed: false
  },
  {
    id: '3',
    title: 'Gym membership renewal',
    description: 'Annual membership expires soon',
    priority: 'low',
    completed: true
  }
];

export const TasksWidget = ({ onCreateTask }: TasksWidgetProps) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showCompleted, setShowCompleted] = useState(false);

  const openTasks = tasks.filter(task => !task.completed);
  const closedTasks = tasks.filter(task => task.completed);

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const displayTasks = showCompleted ? closedTasks : openTasks;

  return (
    <Card className="w-full shadow-soft">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Tasks</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCreateTask?.("Create a new task")}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant={!showCompleted ? "default" : "outline"}
            size="sm"
            onClick={() => setShowCompleted(false)}
            className="text-xs"
          >
            Open ({openTasks.length})
          </Button>
          <Button
            variant={showCompleted ? "default" : "outline"}
            size="sm"
            onClick={() => setShowCompleted(true)}
            className="text-xs"
          >
            Closed ({closedTasks.length})
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 space-y-3">
        {displayTasks.map(task => (
          <div
            key={task.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-event-bg hover:bg-muted transition-colors"
          >
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTask(task.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {task.title}
                </h4>
                <Badge variant="secondary" className={`text-xs ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </Badge>
              </div>
              {task.description && (
                <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
              )}
              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {task.dueDate}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {displayTasks.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <p className="text-sm">
              {showCompleted ? 'No completed tasks' : 'No open tasks'}
            </p>
            <p className="text-xs mt-1">
              {showCompleted ? 'Complete some tasks to see them here' : 'Add a task to get started'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};