
export const kindMessages = [
  "You are loved, exactly as you are.",
  "Your presence in this world makes a difference.",
  "You are stronger than you know and braver than you believe.",
  "Today is a new opportunity to be kind to yourself.",
  "Your smile brightens someone's day, even when you don't realize it.",
  "You are worthy of all good things coming your way.",
  "Take a moment to celebrate how far you've come.",
  "Your potential is endless; believe in yourself.",
  "There is beauty in your uniqueness.",
  "You are enough, just as you are right now.",
  "You deserve to take up space in this world.",
  "Your feelings are valid and important.",
  "Small steps forward are still progress.",
  "You bring something special to this world that no one else can.",
  "Today might be difficult, but you won't feel this way forever.",
  "Be proud of yourself for simply showing up today.",
  "You are deserving of rest and gentleness.",
  "Your heart has so much capacity for growth and healing.",
  "There are people who appreciate you, even when you can't see it.",
  "The world is better because you're in it.",
  "You are resilient, even on your hardest days.",
  "There is no one else quite like you—that's your superpower.",
  "Take a deep breath—you're doing better than you think.",
  "Your journey is your own, and that's what makes it beautiful.",
  "You are capable of wonderful things.",
  "It's okay to not be okay sometimes. You'll get through this.",
  "Your inner strength is remarkable.",
  "Even on cloudy days, you carry sunshine within you.",
  "You make the world a more interesting place.",
  "Every day is a new beginning. You've got this."
];

export const getRandomMessage = (): string => {
  return kindMessages[Math.floor(Math.random() * kindMessages.length)];
};
