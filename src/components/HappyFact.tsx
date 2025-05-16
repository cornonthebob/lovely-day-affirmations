
import React, { useState, useEffect } from 'react';
import { getRandomFact } from '../data/facts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

const HappyFact: React.FC = () => {
  const [fact, setFact] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [factCount, setFactCount] = useState<number>(0);

  useEffect(() => {
    setFact(getRandomFact());
  }, []);

  const refreshFact = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setFact(getRandomFact());
      setIsAnimating(false);
      setFactCount(prev => {
        const newCount = prev + 1;
        if (newCount % 5 === 0) {
          toast("Fact enthusiast!", {
            description: `You've read ${newCount} happy facts today!`,
            duration: 3000,
          });
        }
        return newCount;
      });
    }, 500);
  };

  const shareFact = () => {
    if (navigator.share) {
      navigator.share({
        title: 'A Happy Fact from KindSpace',
        text: fact,
        url: window.location.href,
      }).then(() => {
        toast("Shared successfully!", {
          description: "You've spread some happiness!",
          duration: 2000,
        });
      }).catch(error => {
        console.log('Error sharing:', error);
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(fact).then(() => {
        toast("Copied to clipboard!", {
          description: "Now you can share this happy fact anywhere!",
          duration: 2000,
        });
      });
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-kind-lavender/30 overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-kind-magenta" />
          <span>Happy Fact</span>
        </CardTitle>
      </CardHeader>
      <CardContent> 
        <div 
          className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} cursor-pointer`}
          onClick={refreshFact}
        >
          <p className="text-sm md:text-base lg:text-lg text-kind-deepPurple mb-6">{fact}</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-kind-lavender/30 hover:bg-kind-lavender/10 w-full sm:w-auto"
              onClick={(e) => {
                e.stopPropagation();
                refreshFact();
              }}
            >
              Another Fact
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              className="border-kind-lavender/30 hover:bg-kind-lavender/10 w-full sm:w-auto"
              onClick={(e) => {
                e.stopPropagation();
                shareFact();
              }}
            >
              Share This Fact
            </Button>
          </div>
          
          <p className="text-xs mt-4 text-muted-foreground">
            You've discovered {factCount} happy fact{factCount !== 1 ? 's' : ''} today!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HappyFact;
