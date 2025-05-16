
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Star } from 'lucide-react';
import { kindMessages } from '@/data/messages';

const motivationalPhrases = [
  "You're doing great!",
  "Keep shining bright!",
  "You are amazing!",
  "Sending positive vibes!",
  "You've got this!",
  "Believe in yourself!",
  "You're wonderful!",
  "Stay awesome!",
  "You make a difference!",
  "You're a star!"
];

const FeelGoodButton: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    // Get random message
    const randomIndex = Math.floor(Math.random() * kindMessages.length);
    const message = kindMessages[randomIndex];
    
    // Get random motivational phrase for the button
    const phraseIndex = Math.floor(Math.random() * motivationalPhrases.length);
    const phrase = motivationalPhrases[phraseIndex];
    
    // Show toast with the message
    toast(message, {
      description: "Remember how special you are!",
      duration: 5000,
    });
    
    // Increment click count
    setClickCount(prev => prev + 1);
    
    // Easter egg after 5 clicks
    if (clickCount === 4) {
      setTimeout(() => {
        toast("You've discovered a secret message!", {
          description: "Your curiosity is one of your many wonderful qualities!",
          duration: 8000,
        });
      }, 1000);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="btn-kind group"
    >
      <span className="mr-2 group-hover:animate-spin transition-transform">
        <Star className="h-5 w-5" />
      </span>
      Feel Better Button
    </Button>
  );
};

export default FeelGoodButton;
