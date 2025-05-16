
import React, { useState, useEffect } from 'react';
import KindMessage from '@/components/KindMessage';
import HappyFact from '@/components/HappyFact';
import FeelGoodButton from '@/components/FeelGoodButton';
import DailyQuote from '@/components/DailyQuote';
import GratitudeJournal from '@/components/GratitudeJournal';
import ColorBreather from '@/components/ColorBreather';
import { Heart, Smile, Star, BookOpen } from 'lucide-react';

const Index: React.FC = () => {
  // Animation states
  const [showPage, setShowPage] = useState(false);
  
  useEffect(() => {
    // Trigger entrance animation
    setShowPage(true);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-kind-pink via-white to-kind-lavender bg-kind-gradient animate-gradient-shift bg-size-200">
      <div 
        className={`container max-w-6xl mx-auto py-12 px-4 transition-all duration-1000 ${
          showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-kind-magenta animate-pulse-gentle" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">KindSpace</h1>
            <Heart className="h-8 w-8 text-kind-magenta animate-pulse-gentle" />
          </div>
          <p className="text-lg md:text-xl lg:text-2xl text-kind-deepPurple/80 max-w-3xl mx-auto">
            A little corner of the internet filled with kindness just for you. Take what you need.
          </p>
        </header>

        <main className="space-y-16">
          {/* Main kind message */}
          <section className="mb-10">
            <KindMessage className="max-w-3xl mx-auto floating" />
          </section>

          {/* Feel good button */}
          <section className="text-center mb-16">
            <FeelGoodButton />
          </section>

          {/* Quote section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-kind-deepPurple">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-7 w-7" />
                Daily Wisdom
              </span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <DailyQuote />
            </div>
          </section>

          {/* Happy facts section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-kind-deepPurple">
              <span className="inline-flex items-center gap-2">
                <Smile className="h-7 w-7" />
                Something to Smile About
              </span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <HappyFact />
            </div>
          </section>

          {/* Gratitude and Breathing exercises */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-kind-deepPurple">
              <span className="inline-flex items-center gap-2">
                <Star className="h-7 w-7" />
                Feel Good Activities
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <GratitudeJournal />
              <ColorBreather />
            </div>
          </section>

          {/* Daily affirmations */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h3 className="text-xl md:text-2xl font-medium text-center mb-6 text-kind-deepPurple">Daily Reminders</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "You matter", 
                "You are enough",
                "Your feelings are valid",
                "Progress takes time",
                "It's okay to rest",
                "You are worthy",
                "You are deserving of love",
                "You have purpose",
                "You are resilient"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-kind-lavender/20 text-center shadow-sm hover:shadow-md transition-all hover:scale-105 cursor-default"
                >
                  <p className="font-medium text-kind-purple">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Fun facts grid */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h3 className="text-xl md:text-2xl font-medium text-center mb-6 text-kind-deepPurple">Did You Know?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Otters have a pouch where they keep their favorite rock",
                "Cows have best friends",
                "Flamingos can only eat with their heads upside down",
                "Butterflies taste with their feet",
                "Dolphins name each other with specific whistles",
                "Squirrels plant thousands of trees by forgetting where they put their acorns",
                "Penguins propose with pebbles",
                "Honeybees can recognize human faces",
                "Wombats have cube-shaped poop",
                "Dogs can smell your feelings",
                "Octopuses have three hearts",
                "Baby elephants suck their trunks for comfort",
                "Seahorses mate for life and hold each other's tails",
                "Rats laugh when they're tickled",
                "Crows give gifts to humans who feed them"
              ].map((fact, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-xl bg-kind-lavender/20 backdrop-blur-sm border border-kind-lavender/20 text-center shadow-sm flex items-center justify-center hover:bg-kind-lavender/30 transition-all"
                >
                  <p className="text-sm font-medium text-kind-deepPurple">{fact}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="text-center text-sm text-muted-foreground mt-16 pb-6">
          <p className="mb-2">Created with love to brighten your day 💜</p>
          <p className="text-xs">Remember: You are exactly who you're meant to be.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
