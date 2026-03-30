export interface Technique {
  id: string;
  name: string;
  tagline: string;
  what: string;
  example: string;
  whenToUse: string;
  icon: string;
}

export const OPENING_TECHNIQUES: Technique[] = [
  {
    id: 'bold-statement',
    name: 'Bold Statement',
    tagline: 'Start with a declaration that makes people sit up',
    what: 'Open with a surprising, counterintuitive, or provocative statement — something that challenges the audience\'s assumptions immediately.',
    example: '"Failure is not the opposite of success. It is the very road that leads there."',
    whenToUse: 'When you want to signal confidence and take a strong stance right away.',
    icon: '⚡',
  },
  {
    id: 'rhetorical-question',
    name: 'Rhetorical Question',
    tagline: 'Pull them in by making them think',
    what: 'Ask a question you do not expect an answer to. It instantly makes the audience a participant — they cannot help but think about it.',
    example: '"When was the last time you did something for the very first time?"',
    whenToUse: 'When you want to create an immediate emotional or intellectual connection.',
    icon: '🤔',
  },
  {
    id: 'mini-story',
    name: 'Mini-Story (In Medias Res)',
    tagline: 'Drop them into the middle of the action',
    what: 'Begin in the middle of a scene — no setup, no "today I\'m going to talk about". Just action. The audience\'s brain scrambles to catch up, and that tension keeps them hooked.',
    example: '"I was standing at the edge of the stage, hands shaking, about to give the worst speech of my life."',
    whenToUse: 'When your topic connects to a personal experience or anecdote.',
    icon: '🎬',
  },
  {
    id: 'startling-fact',
    name: 'Startling Fact or Statistic',
    tagline: 'A number that reframes everything',
    what: 'Open with a fact or statistic so surprising that the audience immediately wants to understand it. The fact creates a knowledge gap they need to close.',
    example: '"Studies show that the average person spends 90,000 hours of their life at work — and most of them are miserable."',
    whenToUse: 'When you want to anchor your speech in credibility and urgency.',
    icon: '📊',
  },
  {
    id: 'humor',
    name: 'Humor or Unexpected Twist',
    tagline: 'Disarm and delight before you inspire',
    what: 'Start with something that makes people laugh or smile unexpectedly. Humor creates warmth and goodwill — the audience instantly likes you and wants to hear more.',
    example: '"I was going to open with something profound, but then I realized I\'ve only had one cup of coffee."',
    whenToUse: 'When you want to lighten the mood or build immediate rapport — especially with a nervous audience.',
    icon: '😄',
  },
];

export const CLOSING_TECHNIQUES: Technique[] = [
  {
    id: 'callback',
    name: 'Callback (Echo the Opening)',
    tagline: 'Bring it full circle — create a sense of completion',
    what: 'Return to your opening image, question, or story and resolve it. This creates a satisfying, complete arc — like the ending of a great song that returns to the opening melody.',
    example: 'If you opened with "I was standing at the edge of the stage, hands shaking..." close with "Today I stood here — still nervous, but no longer afraid."',
    whenToUse: 'Almost always. A strong callback is the most elegant structure for a short speech.',
    icon: '🔄',
  },
  {
    id: 'call-to-action',
    name: 'Call to Action',
    tagline: 'Give them one thing to do today',
    what: 'End by asking your audience to do something specific and achievable. Not "change the world" — one small, concrete action. The specificity is what makes it stick.',
    example: '"Tonight, when you get home, tell one person something you\'ve been meaning to say for a while."',
    whenToUse: 'When your speech has a clear takeaway or lesson you want to translate into behavior.',
    icon: '🚀',
  },
  {
    id: 'vivid-image',
    name: 'Vivid Imagery or Metaphor',
    tagline: 'Paint a picture that lives in their memory',
    what: 'End with a sensory, visual image or a powerful metaphor that crystallizes your message. What they can see, they remember. Abstract ideas fade; images stay.',
    example: '"Success is not a mountain you summit once. It\'s an ocean you choose to swim in every single day."',
    whenToUse: 'When your message is emotional or philosophical and you want it to resonate beyond the room.',
    icon: '🎨',
  },
  {
    id: 'memorable-quote',
    name: 'Memorable Quote',
    tagline: 'Borrow the words of someone unforgettable',
    what: 'Close with a quote that perfectly encapsulates your message — then own it by adding one line that connects it back to your speech. Don\'t let the quote be the last word; YOU be the last word.',
    example: '"Maya Angelou said \'People will forget what you said, but they will never forget how you made them feel.\' My goal today was to make you feel that anything is possible."',
    whenToUse: 'When a quote says something better than you could — and you want to honor that while still claiming the stage.',
    icon: '💬',
  },
];

export const STRUCTURE_CONTENT = {
  prep: {
    title: 'The PREP Formula',
    subtitle: 'The most reliable structure for impromptu speaking',
    description: 'PREP gives you a clear map to follow under pressure. Stick to it and you will always sound organized.',
    steps: [
      { letter: 'P', name: 'Point', desc: 'State your main idea clearly and directly — no preamble.' },
      { letter: 'R', name: 'Reason', desc: 'Explain WHY you believe this. Give the logic behind your point.' },
      { letter: 'E', name: 'Example', desc: 'Illustrate with a story, analogy, or specific experience. This is the heart of your speech.' },
      { letter: 'P', name: 'Point (revisited)', desc: 'Circle back to your main idea. State it again — with the added weight of everything you just said.' },
    ],
    tip: 'For a 2-minute table topic, aim for: 5 seconds on your first Point, 15 seconds on Reason, 60–75 seconds on Example, 10 seconds on your final Point.',
  },
  ruleOfThree: {
    title: 'The Rule of Three',
    subtitle: 'Three is the magic number in communication',
    description: 'The human brain finds patterns in threes — "life, liberty, and the pursuit of happiness", "tell them what you\'ll say, say it, tell them what you said". When you structure your thoughts in threes, they feel complete and memorable.',
    examples: [
      '"It changed how I think, how I speak, and how I listen."',
      '"The three things I\'d tell my younger self are..."',
      '"Simple, powerful, and impossible to forget."',
    ],
    tip: 'If you are stuck on what to say, ask yourself: what are three angles on this topic? Three different people affected? Three moments in time?',
  },
};
