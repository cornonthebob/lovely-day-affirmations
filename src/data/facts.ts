
export const happyFacts = [
  "Petting a dog for just 15 minutes can lower your blood pressure by 10%.",
  "Smiling, even when you don't feel like it, can improve your mood because it triggers the release of feel-good hormones.",
  "Research shows that kindness is contagious—witnessing acts of kindness makes people more likely to perform kind acts themselves.",
  "Butterflies can taste with their feet.",
  "Baby elephants suck their trunks for comfort, similar to how human babies suck their thumbs.",
  "Sea otters hold hands (paws) while sleeping so they don't drift apart.",
  "The world's oldest known living tree is over 5,000 years old.",
  "Cows have best friends and get stressed when they're separated.",
  "Penguins often propose to their life mates with a pebble.",
  "The Oxford English Dictionary's definition of 'happiness' evolved from 'good luck' to 'positive emotions' over time.",
  "Cuddling releases oxytocin, a hormone that can help reduce stress and create feelings of trust.",
  "Laughing 100 times is equivalent to 15 minutes on a stationary bike.",
  "The scent of lavender has been proven to reduce anxiety and help with sleep.",
  "Norway once knighted a penguin named Sir Nils Olav III.",
  "Baby flamingos are born with gray feathers, not pink ones. They turn pink from the shrimp and algae in their diet.",
  "Looking at pictures of baby animals has been scientifically proven to increase productivity.",
  "There are approximately 8,000 nerve endings in the human tongue.",
  "The scientific term for the good feeling you get when helping others is 'helper's high'.",
  "Cats purr at a frequency that promotes tissue healing.",
  "The blob of toothpaste on your toothbrush is called a 'nurdle'.",
  "Humans are the only animals that blush.",
  "Singing releases endorphins, improving your mood almost instantly.",
  "Honeybees can recognize human faces.",
  "The world's oldest known living land animal is a tortoise named Jonathan, who is over 190 years old.",
  "People who volunteer regularly live longer and report greater life satisfaction."
];

export const getRandomFact = (): string => {
  return happyFacts[Math.floor(Math.random() * happyFacts.length)];
};
