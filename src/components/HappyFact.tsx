
import React, { useState, useEffect } from 'react';
import { getRandomFact } from '../data/facts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Share2, RefreshCw, Star } from 'lucide-react';
import { toast } from 'sonner';

const HappyFact: React.FC = () => {
  const [fact, setFact] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [factCount, setFactCount] = useState<number>(0);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteHappyFacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    setFact(getRandomFact());
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteHappyFacts', JSON.stringify(favorites));
  }, [favorites]);

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

  const toggleFavorite = () => {
    if (favorites.includes(fact)) {
      setFavorites(favorites.filter(f => f !== fact));
      toast("Removed from favorites!", {
        description: "This fact has been removed from your favorites.",
        duration: 2000,
      });
    } else {
      setFavorites([...favorites, fact]);
      toast("Added to favorites!", {
        description: "This fact has been saved to your favorites!",
        duration: 2000,
      });
    }
  };

  const toggleFavoritesList = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-kind-lavender/30 overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg">
            <Heart className="h-5 w-5 text-kind-magenta" />
            <span>Happy Fact</span>
          </div>
          {favorites.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleFavoritesList}
              className="text-xs flex items-center gap-1"
            >
              {showFavorites ? 'Show Current' : `Favorites (${favorites.length})`}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent> 
        {!showFavorites ? (
          <div 
            className={`transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} cursor-pointer`}
            onClick={refreshFact}
          >
            <p className="text-sm md:text-base lg:text-lg text-kind-deepPurple mb-6">{fact}</p>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-kind-lavender/30 hover:bg-kind-lavender/10 flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  refreshFact();
                }}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Another Fact
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="border-kind-lavender/30 hover:bg-kind-lavender/10 flex items-center gap-1"
                onClick={(e) => {
                  e.stopPropagation();
                  shareFact();
                }}
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>

              <Button 
                variant={favorites.includes(fact) ? "secondary" : "outline"} 
                size="sm"
                className={cn("flex items-center gap-1", 
                  favorites.includes(fact) 
                    ? "bg-kind-lavender/30 hover:bg-kind-lavender/40" 
                    : "border-kind-lavender/30 hover:bg-kind-lavender/10"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite();
                }}
              >
                <Star className="h-3.5 w-3.5" fill={favorites.includes(fact) ? "#D6BCFA" : "none"} />
                {favorites.includes(fact) ? "Favorited" : "Favorite"}
              </Button>
            </div>
            
            <p className="text-xs mt-4 text-muted-foreground">
              You've discovered {factCount} happy fact{factCount !== 1 ? 's' : ''} today!
            </p>
          </div>
        ) : (
          <div>
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4 mb-4">
              {favorites.length > 0 ? favorites.map((favFact, idx) => (
                <div key={idx} className="p-3 bg-kind-lavender/10 rounded-lg text-sm relative">
                  {favFact}
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => {
                      setFavorites(favorites.filter(f => f !== favFact));
                      toast("Removed from favorites", { duration: 1500 });
                    }}
                  >
                    <Star className="h-3.5 w-3.5" fill="#D6BCFA" />
                  </Button>
                </div>
              )) : (
                <p className="text-center text-muted-foreground py-8">No favorites yet</p>
              )}
            </div>
            <Button 
              variant="outline" 
              className="w-full border-kind-lavender/30 hover:bg-kind-lavender/10"
              onClick={toggleFavoritesList}
            >
              Return to current fact
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HappyFact;
