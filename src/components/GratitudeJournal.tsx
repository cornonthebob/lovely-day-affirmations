
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

const gratitudePrompts = [
  "Name something beautiful you saw today.",
  "What made you smile recently?",
  "Who are you thankful for today?",
  "What small joy did you experience?",
  "What's something you're looking forward to?",
  "What made you laugh today?",
  "What's a simple pleasure you enjoyed?",
  "Name a skill or ability you're grateful to have.",
  "What's something good that happened today?",
  "What's a comfort you often take for granted?"
];

const GratitudeJournal: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  
  useEffect(() => {
    setCurrentPrompt(gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)]);
  }, []);
  
  const getNewPrompt = () => {
    const newPrompt = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)];
    setCurrentPrompt(newPrompt);
    
    toast("Taking a moment for gratitude", {
      description: "Even just thinking about what you're grateful for can boost your mood!",
      duration: 4000,
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-kind-lavender/30 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-kind-magenta" />
          <span>Gratitude Moment</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-md md:text-lg text-kind-deepPurple mb-4">
          {currentPrompt}
        </p>
        <p className="text-xs text-muted-foreground mt-2 cursor-pointer" onClick={getNewPrompt}>
          Click for another gratitude prompt
        </p>
      </CardContent>
    </Card>
  );
};

export default GratitudeJournal;
