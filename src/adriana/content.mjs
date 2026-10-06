// Adriana's AI Field Guide — content records.
// Public copy only. The session transcript and private notes never belong in this repo.
// Quotes are Luke's words from the sessions, trimmed but not reworded; keep them free of
// names, family details, and project specifics.
// To add a session: append to `sessions` and update `next`. Then `npm run build`.

export const meta = {
  slug: 'adriana',
  title: 'Adriana’s AI Field Guide',
  description: 'A personal field guide to working with AI — five habits, session notes, and the vocabulary behind them.',
  owner: 'Adriana',
  coach: { name: 'Luke Allpress', url: 'https://lukeallpress.github.io' },
};

export const intro = {
  headline: ['More capacity.', 'Less mental overhead.'],
  lede: 'Five habits. Tap one for a prompt to copy.',
};

export const habits = [
  {
    id: 'dictate',
    title: 'Dictate',
    takeaway: 'Give it the whole picture.',
    prompt:
      'I’m going to talk through a project. Let me get everything out, then organize it into priorities, open questions, and next steps.',
    quotes: [
      'Humans like us to be brief and to the point and say the right thing. Bots don’t care. I like to use the phrase ‘ramble prompting.’',
      'You said a lot more there than if you had been typing for that same length of time.',
    ],
  },
  {
    id: 'connect',
    title: 'Connect',
    takeaway: 'Give it the right context.',
    prompt: 'What meetings do I have tomorrow, and what should I do to prepare?',
    quotes: [
      'These things are really smart, but if they don’t know your organization, they don’t know your workflow — they can’t do useful things.',
      'It’s all about giving it the right context.',
    ],
  },
  {
    id: 'think',
    title: 'Think',
    takeaway: 'Use a smart model, and let it think.',
    settings: [
      ['Model', 'Opus 5.5'],
      ['Effort', 'High'],
    ],
    quotes: [
      'The model strength itself is the difference between asking an eight-year-old something … asking a PhD something.',
      'It’s like the difference between a stream of consciousness and thinking before you speak.',
      'Literally never let your accounts do anything on Low or Instant.',
    ],
  },
  {
    id: 'delegate',
    title: 'Delegate',
    takeaway: 'Describe the outcome, not every click.',
    prompt:
      'Find the documents I was emailed regarding [project]. Create a new project folder, then gather and compile them into a single output for me to review.',
    quotes: [
      'That is what agentic means: it can do something for us.',
      'We used to call our AI assistants our drunk interns. Now they’re more like a talented EA.',
    ],
  },
  {
    id: 'schedule',
    title: 'Schedule',
    takeaway: 'Turn remembering into a system.',
    prompt:
      'Check these registration pages on the 1st and 15th of each month. Tell me what’s new and what’s due, and set up iPhone reminders for me to accomplish this at appropriate intervals.',
    quotes: [
      'You can have this run every morning and have it be a Claude conversation you have to check. I did that once, and I never remembered to check it.',
      'Eventually when you’re done with it, you can say stop running.',
    ],
  },
];

export const next = {
  title: 'Make the workflow repeatable.',
  date: { iso: '2026-10-21', month: 'Oct', day: '21', weekday: 'Wednesday', when: 'Afternoon' },
  status: 'Exact time and location to be confirmed.',
  tryFirst: [
    'Dictate one real request.',
    'Prep for a meeting using connected context — then check the sources.',
    'Bring one useful result and one sticking point.',
    'Have the recording device ready for setup.',
  ],
  focus: [
    'Set up and test meeting capture.',
    'Turn a real recording into useful notes and actions.',
    'Store the result somewhere it can be retrieved.',
    'Ask questions that require those notes.',
    'Verify scheduled-task delivery and reminders.',
    'Finish or troubleshoot an active document workflow.',
  ],
};

// Keep "worked on" (explored or set up in session) distinct from "verified working".
export const sessions = [
  {
    n: '01',
    date: { iso: '2026-10-05', label: 'October 5, 2026', short: 'Oct 5' },
    title: 'Connect the tools to real work',
    recap:
      'We connected tools to practical work: preparing for meetings, finding documents, organizing information, dictating requests, and setting up recurring checks.',
    workedOn: [
      'Calendar and email connections',
      'The desktop app for hands-on file tasks',
      'Organizing documents and grouping related conversations',
      'Finding project materials through email',
      'Dictating detailed requests',
      'A twice-monthly tracking task',
      'An editable version of a shared document (in progress)',
    ],
    toVerify: [
      'The final project-document compilation',
      'The editable document and its new content',
      'Where scheduled-task results arrive',
      'Whether reminders appear where expected',
      'The recording-to-notes workflow',
    ],
    verified: [],
    shift: ['From “help me write something”', 'to “help me move this work forward.”'],
  },
];

// [term, definition, optional quote from the session]
export const terms = [
  ['Model', 'The underlying AI system that interprets your request and generates a response. Different models have different strengths.', 'It just means it’s a calculator for words that’s really good.'],
  ['App / workspace', 'The environment around a model — conversations, files, tools, scheduling, and other features.'],
  ['Prompt', 'Your request: what you want, the relevant background, and any constraints.'],
  ['Context', 'The information available to the AI for the current task — your conversation, instructions, documents, and anything retrieved through tools.', 'You can’t just take a really good leader and put them into a different sphere because they need to understand the context. Same thing here.'],
  ['Context window', 'How much information a model can work with at one time. Access to a large collection of files doesn’t mean it has read them all.'],
  ['Memory', 'Information a product may retain for future use. What it keeps depends on the product; it isn’t a complete or infallible record.'],
  ['Project', 'An organizational space for related conversations, reference files, and instructions.', 'It’s like a folder.'],
  ['Connector', 'An authorized connection to another service, such as email, calendar, or document storage. Its permissions determine what is accessible.', 'These connections, these plug-ins — allow it to know more about you.'],
  ['Tool', 'A capability for doing something beyond producing text — searching a source, reading a file, creating a supported calendar event.'],
  ['Artifact', 'A created output, such as a document, tracker, or interactive page. Sharing and editing options depend on how it was created.', 'It just means a shareable document.'],
  ['Agent', 'An AI system configured to pursue a goal through multiple steps, often using tools.', 'If I make something that does the same thing all the time, we can call that an agent.'],
  ['Agentic workflow', 'Work in which AI takes supported steps toward an outcome, rather than only answering.', 'We’re giving it the capability to take some actions on our behalf.'],
  ['Harness', 'The tools, instructions, permissions, and environment surrounding a model that let it do useful work.', 'Like we harness a really strong horse to the carriage. The harness is the connection between the strong thing and what you’re actually doing.'],
  ['Reasoning effort', 'A setting that gives the model more or less room to work through a problem. More effort helps; it doesn’t remove the need to verify.', 'It still generates an immediate answer, just like all of us, but then it stops and reads what it said.'],
  ['Scheduled task', 'A request configured to run at a future time or on a recurring schedule.', 'A scheduled task means it will do this thing regularly.'],
  ['Hallucination', 'An incorrect or invented claim presented as though it were true. Check important names, dates, figures, and sources.', 'It’s gonna reach some conclusions that are not perfectly accurate.'],
  ['Prompt injection', 'Instructions hidden in material an AI reads that try to redirect it. A webpage or document is source material — not permission.', 'If you point your Claude at a website … and that is not a trustworthy website, it could have instructions on it.'],
];
