
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
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
  "What's a comfort you often take for granted?",
  "What act of kindness did you witness or experience?",
  "What's something in nature that brings you joy?",
  "Who helped you grow as a person?",
  "What challenge taught you something valuable?",
  "What tradition or ritual do you appreciate?"
];

const GratitudeJournal: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [animation, setAnimation] = useState<boolean>(false);
  
  useEffect(() => {
    // Load favorites from local storage if available
    const savedFavorites = localStorage.getItem("gratitude-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Set initial prompt
    setCurrentPrompt(gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)]);
  }, []);
  
  const getNewPrompt = () => {
    setAnimation(true);
    
    setTimeout(() => {
      let newPrompt;
      do {
        newPrompt = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)];
      } while (newPrompt === currentPrompt);
      
      setCurrentPrompt(newPrompt);
      setAnimation(false);
      
      toast("Taking a moment for gratitude", {
        description: "Even just thinking about what you're grateful for can boost your mood!",
        duration: 4000,
      });
    }, 300);
  };

  const toggleFavorite = () => {
    const newFavorites = favorites.includes(currentPrompt)
      ? favorites.filter(p => p !== currentPrompt)
      : [...favorites, currentPrompt];
    
    setFavorites(newFavorites);
    localStorage.setItem("gratitude-favorites", JSON.stringify(newFavorites));
    
    toast(favorites.includes(currentPrompt) ? "Removed from favorites" : "Added to favorites", {
      description: favorites.includes(currentPrompt) 
        ? "Prompt removed from your favorites" 
        : "You can find this prompt in your favorites later",
      duration: 3000,
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-kind-lavender/30 overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-kind-magenta" />
          <span>Gratitude Moment</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`transition-all duration-300 ${animation ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <p className="text-md md:text-lg lg:text-xl text-kind-deepPurple mb-6">
            {currentPrompt}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button 
              variant="outline"
              size="sm"
              className="border-kind-lavender/30 hover:bg-kind-lavender/10 w-full sm:w-auto"
              onClick={getNewPrompt}
            >
              New Prompt
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className={`w-full sm:w-auto flex items-center gap-2 ${
                favorites.includes(currentPrompt) 
                ? "bg-kind-lavender/20 border-kind-purple" 
                : "border-kind-lavender/30"
              }`}
              onClick={toggleFavorite}
            >
              <Star className={`h-4 w-4 ${favorites.includes(currentPrompt) ? "text-kind-purple fill-kind-purple" : ""}`} />
              <span>{favorites.includes(currentPrompt) ? "Favorited" : "Add to Favorites"}</span>
            </Button>
          </div>
          
          {favorites.length > 0 && (
            <p className="text-xs text-muted-foreground mt-4">
              You have {favorites.length} favorite gratitude prompt{favorites.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GratitudeJournal;
