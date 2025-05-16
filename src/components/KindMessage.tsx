
import React, { useState, useEffect } from 'react';
import { getRandomMessage } from '../data/messages';
import { cn } from '@/lib/utils';

interface KindMessageProps {
  className?: string;
}

const KindMessage: React.FC<KindMessageProps> = ({ className }) => {
  const [message, setMessage] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    setMessage(getRandomMessage());
  }, []);

  const refreshMessage = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setMessage(getRandomMessage());
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div 
      className={cn(
        "message-card transition-all duration-500", 
        isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
        className
      )}
      onClick={refreshMessage}
    >
      <p className="text-xl md:text-2xl text-center font-medium text-kind-deepPurple">
        {message}
      </p>
      <p className="text-xs text-center mt-4 text-muted-foreground">
        Tap for another message ✨
      </p>
    </div>
  );
};

export default KindMessage;
