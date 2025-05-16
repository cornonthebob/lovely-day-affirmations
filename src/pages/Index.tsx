
import React, { useState, useEffect } from 'react';
import KindMessage from '@/components/KindMessage';
import HappyFact from '@/components/HappyFact';
import FeelGoodButton from '@/components/FeelGoodButton';
import { Heart, Smile } from 'lucide-react';

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
        className={`container max-w-4xl mx-auto py-12 px-4 transition-all duration-1000 ${
          showPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-kind-magenta animate-pulse-gentle" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">KindSpace</h1>
            <Heart className="h-8 w-8 text-kind-magenta animate-pulse-gentle" />
          </div>
          <p className="text-lg md:text-xl text-kind-deepPurple/80 max-w-2xl mx-auto">
            A little corner of the internet filled with kindness just for you. Take what you need.
          </p>
        </header>

        <main className="space-y-12">
          {/* Main kind message */}
          <section className="mb-10">
            <KindMessage className="max-w-2xl mx-auto floating" />
          </section>

          {/* Feel good button */}
          <section className="text-center mb-16">
            <FeelGoodButton />
          </section>

          {/* Happy facts section */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-kind-deepPurple">
              <span className="inline-flex items-center gap-2">
                <Smile className="h-7 w-7" />
                Something to Smile About
              </span>
            </h2>
            <div className="max-w-2xl mx-auto">
              <HappyFact />
            </div>
          </section>

          {/* Daily affirmations */}
          <section className="mb-16 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-medium text-center mb-5 text-kind-deepPurple">Daily Reminders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "You matter", 
                "You are enough",
                "Your feelings are valid",
                "Progress takes time"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-kind-lavender/20 text-center shadow-sm hover:shadow-md transition-all"
                >
                  <p className="font-medium text-kind-purple">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="text-center text-sm text-muted-foreground mt-16 pb-6">
          <p>Created with love to brighten your day 💜</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
