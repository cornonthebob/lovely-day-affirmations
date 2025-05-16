
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const quotes = [
  { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn" },
  { text: "The most wasted of days is one without laughter.", author: "E.E. Cummings" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Happiness is letting go of what you think your life is supposed to look like.", author: "Unknown" },
  { text: "The happiest people don't have the best of everything, they make the best of everything.", author: "Unknown" },
  { text: "A smile is happiness you'll find right under your nose.", author: "Tom Wilson" },
  { text: "Happiness is a warm puppy.", author: "Charles M. Schulz" },
  { text: "The secret of happiness is not in doing what one likes, but in liking what one does.", author: "James M. Barrie" },
  { text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon" },
  { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi" },
];

const DailyQuote: React.FC = () => {
  const [quote, setQuote] = useState<{ text: string; author: string }>(quotes[Math.floor(Math.random() * quotes.length)]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const getNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-kind-lavender/30">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="h-5 w-5 text-kind-magenta" />
          <span>Quote of the Day</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className={cn(
            "transition-all duration-500 mb-4",
            isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
          )}
        >
          <p className="text-lg md:text-xl italic text-kind-deepPurple font-medium mb-2">"{quote.text}"</p>
          <p className="text-sm text-right text-kind-deepPurple/70">— {quote.author}</p>
        </div>
        
        <Button 
          onClick={getNewQuote} 
          variant="outline" 
          className="w-full mt-2 border-kind-lavender/30 hover:bg-kind-lavender/10"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </CardContent>
    </Card>
  );
};

export default DailyQuote;
