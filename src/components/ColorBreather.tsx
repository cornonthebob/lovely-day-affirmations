
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Smile } from 'lucide-react';

const ColorBreather: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [instruction, setInstruction] = useState('Start a breathing exercise');
  const [count, setCount] = useState(0);

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
    }
    setIsBreathing(!isBreathing);
  };

  return (
    <Card className="border-kind-lavender/30 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Smile className="h-5 w-5 text-kind-magenta" />
          <span>Color Breather</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div 
          className={cn(
            "w-28 h-28 rounded-full mx-auto mb-4 transition-all duration-4000 relative",
            isBreathing ? (count < 4 ? "scale-150 bg-kind-lavender" : "scale-100 bg-kind-pink") : "bg-kind-purple/40"
          )}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white font-medium">{isBreathing ? Math.floor(count/4) + 1 : ""}</p>
          </div>
        </div>
        <p className="text-md mb-4 h-6">{instruction}</p>
        <Button 
          onClick={toggleBreathing}
          variant="outline"
          className="border-kind-lavender/30 hover:bg-kind-lavender/10"
        >
          {isBreathing ? 'Stop' : 'Start Breathing'}
        </Button>
        {!isBreathing && (
          <p className="text-xs text-muted-foreground mt-4">
            A few deep breaths can help reduce stress and improve your mood
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorBreather;
