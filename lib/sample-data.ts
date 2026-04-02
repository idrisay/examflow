export type SampleExam = {
  title: string;
  slug: string;
  provider: string;
  level: string;
  category: string;
  durationMinutes: number;
  description: string;
  isPremium: boolean;
  questionCount: number;
};

export type SampleQuestion = {
  examSlug: string;
  prompt: string;
  type: string;
  options: string[];
  answer: string;
  explanation: string;
};

export const sampleExams: SampleExam[] = [
  {
    title: "TELC B1 Reading Essentials",
    slug: "telc-b1-reading-essentials",
    provider: "TELC",
    level: "B1",
    category: "Reading",
    durationMinutes: 45,
    description:
      "A practical reading pack with everyday notices, emails, and short articles styled after real TELC tasks.",
    isPremium: false,
    questionCount: 12
  },
  {
    title: "TELC B2 Listening Sprint",
    slug: "telc-b2-listening-sprint",
    provider: "TELC",
    level: "B2",
    category: "Listening",
    durationMinutes: 35,
    description:
      "Short-answer and multiple choice listening drills focused on speed, confidence, and exam timing.",
    isPremium: false,
    questionCount: 10
  },
  {
    title: "TELC C1 Mock Interview",
    slug: "telc-c1-mock-interview",
    provider: "TELC",
    level: "C1",
    category: "Speaking",
    durationMinutes: 20,
    description:
      "Guided speaking prompts for advanced learners who want to refine structure, argument, and fluency.",
    isPremium: true,
    questionCount: 8
  }
];

export const sampleQuestions: SampleQuestion[] = [
  {
    examSlug: "telc-b1-reading-essentials",
    prompt: "Read the notice. When does the library close on Fridays?",
    type: "multiple-choice",
    options: ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"],
    answer: "6:00 PM",
    explanation: "The notice states that Friday opening hours end at 18:00."
  },
  {
    examSlug: "telc-b2-listening-sprint",
    prompt: "What is the speaker's main reason for calling the hotel?",
    type: "multiple-choice",
    options: [
      "To cancel a reservation",
      "To ask about parking",
      "To request a late check-in",
      "To book breakfast"
    ],
    answer: "To request a late check-in",
    explanation: "The speaker mentions arriving after 11 PM and asks the hotel to note it."
  },
  {
    examSlug: "telc-c1-mock-interview",
    prompt: "Present a two-minute argument about whether remote work improves productivity.",
    type: "open-ended",
    options: [],
    answer: "Answers vary",
    explanation:
      "A strong answer should present a clear position, supporting evidence, and a balanced conclusion."
  }
];
