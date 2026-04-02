import Anthropic from '@anthropic-ai/sdk';
import { getSettings } from './storage';

export type NoteCategory =
  | 'Ideas'
  | 'Tasks / To-Do'
  | 'Quotes'
  | 'Reflections / Journal'
  | 'Research'
  | 'Reminders'
  | 'Creative Writing'
  | 'Miscellaneous';

export interface CategorizedNote {
  id: string;
  raw: string;
  category: NoteCategory;
  title: string;
  summary: string;
}

const NOTES_SYSTEM_PROMPT = `You are an intelligent note organizer. The user will give you a list of raw notes from their iPhone (separated by "---"). For each note, return a JSON array where each element has:
- "title": a short (3-7 word) descriptive title
- "category": one of: "Ideas", "Tasks / To-Do", "Quotes", "Reflections / Journal", "Research", "Reminders", "Creative Writing", "Miscellaneous"
- "summary": one sentence summarizing the note

Return ONLY a valid JSON array, no extra text. Example:
[{"title": "App feature brainstorm", "category": "Ideas", "summary": "Ideas for improving the onboarding flow."}]`;

export async function categorizeNotes(rawNotes: string[]): Promise<Array<{ title: string; category: NoteCategory; summary: string }>> {
  const settings = getSettings();
  if (!settings.apiKey) {
    throw new Error('No API key configured. Go to Settings to add your Anthropic API key.');
  }

  const client = new Anthropic({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true,
  });

  const input = rawNotes.map((n, i) => `Note ${i + 1}:\n${n}`).join('\n---\n');

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: NOTES_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: input }],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    return JSON.parse(text) as Array<{ title: string; category: NoteCategory; summary: string }>;
  } catch {
    throw new Error('Could not parse note categories from Claude. Please try again.');
  }
}

export interface SpeechFeedback {
  openingScore: number;
  openingFeedback: string;
  structureScore: number;
  structureFeedback: string;
  closingScore: number;
  closingFeedback: string;
  overallScore: number;
  tips: string[];
}

const SYSTEM_PROMPT = `You are an experienced Toastmasters speech coach — warm, encouraging, and direct.
You have achieved Distinguished Toastmaster (DTM) status and have mentored hundreds of speakers.

Your job is to give feedback on table topics responses (impromptu speeches of 1-2 minutes).
Focus on three key areas:
1. OPENING — Did it grab attention? Was it a strong hook (bold statement, question, story, fact, or humor)?
2. STRUCTURE — Was there a clear PREP structure (Point, Reason, Example, Point)? Or Rule of Three?
3. CLOSING — Was it memorable? Did it land? (Callback, call to action, vivid image, or quote?)

Return ONLY valid JSON in this exact format, no extra text:
{
  "openingScore": <1-10>,
  "openingFeedback": "<2-3 sentences, specific and actionable>",
  "structureScore": <1-10>,
  "structureFeedback": "<2-3 sentences, specific and actionable>",
  "closingScore": <1-10>,
  "closingFeedback": "<2-3 sentences, specific and actionable>",
  "overallScore": <1-10>,
  "tips": ["<tip 1>", "<tip 2>", "<tip 3>"]
}

Be generous with scores (7+ means good), but specific with feedback.
Always find at least one thing to praise. Keep tips actionable and concrete.`;

export async function getSpeechFeedback(topic: string, speech: string): Promise<SpeechFeedback> {
  const settings = getSettings();
  if (!settings.apiKey) {
    throw new Error('No API key configured. Go to Settings to add your Anthropic API key.');
  }

  const client = new Anthropic({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true,
  });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Table Topics question: "${topic}"\n\nSpeech:\n${speech}`,
      },
    ],
  });

  const text = response.content[0].type === 'text' ? response.content[0].text : '';

  try {
    return JSON.parse(text) as SpeechFeedback;
  } catch {
    throw new Error('Could not parse feedback from Claude. Please try again.');
  }
}
