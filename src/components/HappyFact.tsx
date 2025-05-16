
import React, { useState, useEffect } from 'react';
import { getRandomFact } from '../data/facts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

const HappyFact: React.FC = () => {
  const [fact, setFact] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setFact(getRandomFact());
  }, []);

  const refreshFact = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setFact(getRandomFact());
      setIsAnimating(false);
    }, 500);
  };

  return (
    <Card className="bg-secondary/50 backdrop-blur-sm border-kind-lavender/30 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-kind-magenta" />
          <span>Happy Fact</span>
        </CardTitle>
      </CardHeader>
      <CardContent 
        className="cursor-pointer" 
        onClick={refreshFact}
      >
        <div 
          className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          <p className="text-sm md:text-base">{fact}</p>
          <p className="text-xs mt-3 text-muted-foreground">
            Click for another fun fact!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HappyFact;
