
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Smile, Circle, Square } from 'lucide-react';
import { toast } from 'sonner';

const ColorBreather: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [instruction, setInstruction] = useState('Start a breathing exercise');
  const [count, setCount] = useState(0);
  const [shape, setShape] = useState<'circle' | 'square'>('circle');
  const [completedCycles, setCompletedCycles] = useState(0);

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

  return (
    <Card className="border-kind-lavender/30 overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Smile className="h-5 w-5 text-kind-magenta" />
          <span>Color Breather</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div 
          className={cn(
            "w-36 h-36 mx-auto mb-6 transition-all duration-4000 relative flex items-center justify-center",
            shape === 'circle' ? "rounded-full" : "rounded-lg",
            isBreathing ? (count < 4 ? "scale-150 bg-kind-lavender" : "scale-100 bg-kind-pink") : "bg-kind-purple/40"
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white font-medium text-xl">{isBreathing ? Math.floor(count/4) + 1 : ""}</p>
          </div>
        </div>
        <p className="text-md mb-6 h-6 font-medium">{instruction}</p>
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
          <div className="mt-4">
            {completedCycles > 0 && (
              <p className="text-sm text-kind-deepPurple mb-2">
                You've completed {completedCycles} breathing cycle{completedCycles !== 1 ? 's' : ''}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              A few deep breaths can help reduce stress and improve your mood
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorBreather;
