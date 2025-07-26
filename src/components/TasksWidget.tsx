import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Clock, X } from "lucide-react";

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
    completed: true
  },
  {
    id: '2',
    title: 'Complete project presentation',
    description: 'Finish slides for quarterly review',
    dueDate: 'This week',
    priority: 'high',
    completed: true
  },
  {
    id: '3',
    title: 'Getting better at networking',
    description: 'Improve professional networking skills',
    dueDate: 'Next month',
    priority: 'medium',
    completed: false
  },
  {
    id: '4',
    title: 'Learn new programming language',
    description: 'Expand technical skills',
    priority: 'low',
    completed: false
  },
  {
    id: '5',
    title: 'Book flight to NYC',
    description: 'For business trip next month',
    dueDate: 'Today',
    priority: 'high',
    completed: false
  }
];

export const TasksWidget = ({ onCreateTask }: TasksWidgetProps) => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showAddInput, setShowAddInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const getDueDateSort = (task: Task) => {
    if (!task.dueDate) return 999; // Tasks without due dates go to the end
    if (task.dueDate === 'Today') return 0;
    if (task.dueDate === 'Tomorrow') return 1;
    if (task.dueDate === 'This week') return 2;
    if (task.dueDate === 'Next week') return 3;
    if (task.dueDate === 'Next month') return 4;
    return 5;
  };

  const openTasks = tasks.filter(task => !task.completed).sort((a, b) => getDueDateSort(a) - getDueDateSort(b));
  const closedTasks = tasks.filter(task => task.completed).sort((a, b) => getDueDateSort(a) - getDueDateSort(b));

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        priority: 'medium',
        completed: false
      };
      setTasks(prev => [...prev, newTask]);
      setNewTaskTitle("");
      setShowAddInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    } else if (e.key === 'Escape') {
      setNewTaskTitle("");
      setShowAddInput(false);
    }
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
            onClick={() => setShowAddInput(!showAddInput)}
            className="h-8 w-8 p-0"
          >
            {showAddInput ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
        {showAddInput && (
          <div className="flex gap-2 p-3 rounded-xl bg-event-bg">
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter task title..."
              className="flex-1 text-sm"
              autoFocus
            />
            <Button size="sm" onClick={addTask} disabled={!newTaskTitle.trim()}>
              Add
            </Button>
          </div>
        )}
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