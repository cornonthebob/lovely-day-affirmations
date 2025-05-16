
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Smile, Circle, Square, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const ColorBreather: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [instruction, setInstruction] = useState('Start a breathing exercise');
  const [count, setCount] = useState(0);
  const [shape, setShape] = useState<'circle' | 'square'>('circle');
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalBreaths, setTotalBreaths] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isBreathing) {
      interval = setInterval(() => {
        setCount((prevCount) => {
          const newCount = (prevCount + 1) % 8;
          
          if (newCount < 4) {
            setInstruction('Breathe in...');
          } else {
            setInstruction('Breathe out...');
          }
          
          // Track completed breathing cycles
          if (newCount === 0 && prevCount === 7) {
            setCompletedCycles(prev => {
              const newCount = prev + 1;
              setTotalBreaths(current => current + 1);
              if (newCount % 3 === 0) {
                toast("Great job!", {
                  description: "Keep going! Deep breathing reduces stress and anxiety.",
                  duration: 3000,
                });
              }
              return newCount;
            });
          }
          
          return newCount;
        });
      }, 1000);
    } else {
      setInstruction('Start a breathing exercise');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreathing]);

  const toggleBreathing = () => {
    if (!isBreathing) {
      setCount(0);
      setInstruction('Breathe in...');
      toast("Starting breathing exercise", {
        description: "Follow the expanding and contracting shape",
        duration: 3000,
      });
    } else {
      if (completedCycles > 0) {
        toast("Well done!", {
          description: `You completed ${completedCycles} breathing cycle${completedCycles !== 1 ? 's' : ''}`,
          duration: 3000,
        });
      }
    }
    setIsBreathing(!isBreathing);
  };

  const toggleShape = () => {
    setShape(prev => prev === 'circle' ? 'square' : 'circle');
    toast(`Shape changed to ${shape === 'circle' ? 'square' : 'circle'}`, {
      duration: 1500,
    });
  };

  const resetStats = () => {
    setCompletedCycles(0);
    setTotalBreaths(0);
    toast("Stats reset", {
      description: "Your breathing exercise stats have been reset",
      duration: 2000,
    });
  };

  return (
    <Card className="border-kind-lavender/30 overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Smile className="h-5 w-5 text-kind-magenta" />
          <span>Color Breather</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="relative min-h-[200px] flex flex-col items-center justify-center mb-4">
          <div 
            className={cn(
              "w-28 h-28 transition-all duration-4000 flex items-center justify-center",
              shape === 'circle' ? "rounded-full" : "rounded-lg",
              isBreathing ? (count < 4 ? "scale-125 bg-kind-lavender" : "scale-100 bg-kind-pink") : "bg-kind-purple/40"
            )}
          >
            {isBreathing && (
              <p className="text-white font-medium text-xl">
                {count < 4 ? 'In' : 'Out'}
              </p>
            )}
          </div>
          
          <p className="text-md mt-6 h-6 font-medium absolute bottom-0 w-full">
            {instruction}
          </p>
        </div>
        
        <div className="flex flex-col gap-3 md:flex-row md:justify-center md:items-center md:gap-4">
          <Button 
            onClick={toggleBreathing}
            variant="outline"
            className="border-kind-lavender/30 hover:bg-kind-lavender/10"
          >
            {isBreathing ? 'Stop' : 'Start Breathing'}
          </Button>
          
          <Button
            onClick={toggleShape}
            variant="outline"
            className="border-kind-lavender/30 hover:bg-kind-lavender/10 flex items-center gap-2"
            disabled={isBreathing}
          >
            {shape === 'circle' ? <Circle className="h-4 w-4" /> : <Square className="h-4 w-4" />}
            <span>Change Shape</span>
          </Button>
        </div>
        
        {!isBreathing && (
          <div className="mt-6 bg-kind-lavender/10 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-kind-deepPurple">Your Progress</h4>
              {(completedCycles > 0 || totalBreaths > 0) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetStats} 
                  className="text-xs flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  Reset
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Today's sessions</p>
                <p className="text-2xl font-bold text-kind-deepPurple">{completedCycles}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total breaths</p>
                <p className="text-2xl font-bold text-kind-deepPurple">{totalBreaths}</p>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              A few deep breaths can help reduce stress and improve your mood
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorBreather;
