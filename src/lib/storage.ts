export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  confidence?: number;
  timestamp: number;
}

const MESSAGES_KEY = "edubuddy_messages";
const QUESTION_COUNT_KEY = "edubuddy_question_count";
const QUESTION_DATE_KEY = "edubuddy_question_date";
const MAX_FREE_QUESTIONS = 5;

export function getMessages(): ChatMessage[] {
  try {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function getQuestionCount(): number {
  const date = localStorage.getItem(QUESTION_DATE_KEY);
  if (date !== getTodayStr()) {
    localStorage.setItem(QUESTION_DATE_KEY, getTodayStr());
    localStorage.setItem(QUESTION_COUNT_KEY, "0");
    return 0;
  }
  return parseInt(localStorage.getItem(QUESTION_COUNT_KEY) || "0", 10);
}

export function incrementQuestionCount(): number {
  const count = getQuestionCount() + 1;
  localStorage.setItem(QUESTION_COUNT_KEY, String(count));
  localStorage.setItem(QUESTION_DATE_KEY, getTodayStr());
  return count;
}

export function canAskQuestion(): boolean {
  return getQuestionCount() < MAX_FREE_QUESTIONS;
}

export function getRemainingQuestions(): number {
  return MAX_FREE_QUESTIONS - getQuestionCount();
}
