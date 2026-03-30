export interface Topic {
  id: number;
  question: string;
  category: string;
  hint?: string;
}

export const CATEGORIES = ['Personal', 'Hypothetical', 'Values', 'Creativity', 'Society', 'Fun'];

export const TOPICS: Topic[] = [
  // Personal
  { id: 1, category: 'Personal', question: 'What is one skill you wish you had learned earlier in life?', hint: 'Think of a moment when you needed that skill.' },
  { id: 2, category: 'Personal', question: 'Describe the best piece of advice you ever received.', hint: 'Who gave it, and when did you realize it was true?' },
  { id: 3, category: 'Personal', question: 'What is a habit that has genuinely changed your life?', hint: 'Small or big — what did it replace?' },
  { id: 4, category: 'Personal', question: 'Tell us about a failure that turned into a gift.', hint: 'What did you learn that you couldn\'t have learned any other way?' },
  { id: 5, category: 'Personal', question: 'What is the most beautiful place you have ever been?', hint: 'Describe it so we can see it through your eyes.' },
  { id: 6, category: 'Personal', question: 'Who is someone who shaped who you are today?', hint: 'One specific moment or lesson can say it all.' },

  // Hypothetical
  { id: 7, category: 'Hypothetical', question: 'If you could have dinner with any person — alive or from history — who would it be and why?', hint: 'What one question would you ask them?' },
  { id: 8, category: 'Hypothetical', question: 'If you could live in any era of history, which would you choose?', hint: 'What excites you — and what terrifies you — about that time?' },
  { id: 9, category: 'Hypothetical', question: 'If you could wake up tomorrow with one new skill mastered, what would it be?', hint: 'How would it change your everyday life?' },
  { id: 10, category: 'Hypothetical', question: 'If you had to start a business today with $100, what would you do?', hint: 'Focus on one simple but clever idea.' },
  { id: 11, category: 'Hypothetical', question: 'If you could change one thing about your city, what would it be?', hint: 'Be specific — not just "more parks", but which corner?' },
  { id: 12, category: 'Hypothetical', question: 'If you discovered you had one year left to live, what would you do differently starting tomorrow?', hint: 'The answer reveals what you truly value.' },

  // Values
  { id: 13, category: 'Values', question: 'What does success mean to you — and has that definition ever changed?', hint: 'Compare then vs. now.' },
  { id: 14, category: 'Values', question: 'What is one thing the world needs more of right now?', hint: 'Make it personal — why do YOU care?' },
  { id: 15, category: 'Values', question: 'What is the difference between being busy and being productive?', hint: 'Share an example from your own life.' },
  { id: 16, category: 'Values', question: 'Is it more important to be right, or to be kind?', hint: 'Pick a side and defend it.' },
  { id: 17, category: 'Values', question: 'What is one thing you believe that most people around you disagree with?', hint: 'Courage here makes a memorable speech.' },
  { id: 18, category: 'Values', question: 'What does true friendship look like?', hint: 'A single story can speak volumes.' },

  // Creativity
  { id: 19, category: 'Creativity', question: 'Describe your dream day from sunrise to sundown — no constraints.', hint: 'Be vivid and specific.' },
  { id: 20, category: 'Creativity', question: 'If your life were a book, what would the title be?', hint: 'Explain why.' },
  { id: 21, category: 'Creativity', question: 'If you could design a perfect city from scratch, what would make it special?', hint: 'Focus on one or two unique features.' },
  { id: 22, category: 'Creativity', question: 'Invent a holiday that the world desperately needs.', hint: 'Name it, and tell us how it would be celebrated.' },
  { id: 23, category: 'Creativity', question: 'If you could combine two jobs into one dream career, what would it be?', hint: 'Sell us on why this is brilliant.' },
  { id: 24, category: 'Creativity', question: 'What object from your daily life would be fascinating to an alien, and why?', hint: 'See the ordinary through extraordinary eyes.' },

  // Society
  { id: 25, category: 'Society', question: 'What is one technology you think has made us better — and one that has made us worse?', hint: 'Balance the argument.' },
  { id: 26, category: 'Society', question: 'Should schools teach happiness as a subject?', hint: 'Pick a position and argue it boldly.' },
  { id: 27, category: 'Society', question: 'What is one thing every child should be taught that most schools ignore?', hint: 'Be specific and passionate.' },
  { id: 28, category: 'Society', question: 'Is social media bringing us together or tearing us apart?', hint: 'Use evidence from your own life.' },
  { id: 29, category: 'Society', question: 'What is the most important problem your generation will have to solve?', hint: 'Make it personal — not just abstract.' },
  { id: 30, category: 'Society', question: 'Is working from home a revolution or a regression?', hint: 'You\'ve lived it — what did you learn?' },

  // Fun
  { id: 31, category: 'Fun', question: 'If animals could talk, which species do you think would be the most annoying?', hint: 'Commit to the bit.' },
  { id: 32, category: 'Fun', question: 'What is the most absurd thing you have ever done that you are secretly proud of?', hint: 'Self-deprecating humor wins audiences.' },
  { id: 33, category: 'Fun', question: 'If you had to eat one meal for the rest of your life, what would it be?', hint: 'Describe it like a food critic.' },
  { id: 34, category: 'Fun', question: 'What superpower sounds amazing in theory but would actually be terrible in practice?', hint: 'Commit to the logic.' },
  { id: 35, category: 'Fun', question: 'What is a completely useless talent you have that you are weirdly proud of?', hint: 'Demonstrate if possible.' },
];

export function getRandomTopic(excludeId?: number): Topic {
  const pool = excludeId ? TOPICS.filter(t => t.id !== excludeId) : TOPICS;
  return pool[Math.floor(Math.random() * pool.length)];
}
