// Adriana's AI Field Guide — content records.
// Public copy only. The session transcript and private notes never belong in this repo.
// To add a session: append to `sessions` and update `next`. Then `npm run build`.

export const meta = {
  slug: 'adriana',
  title: 'Adriana’s AI Field Guide',
  description:
    'A personal field guide to working with AI — five habits, connected workflows, and the vocabulary behind them.',
  owner: 'Adriana',
  coach: { name: 'Luke Allpress', url: 'https://lukeallpress.github.io' },
};

export const hero = {
  eyebrow: 'A personal guide to working with AI',
  headline: ['More capacity.', 'Less mental overhead.'],
  lede: 'Habits that help you think clearly, find what matters, and move things forward — across leadership, projects, and everyday life.',
  signoff: 'Your judgment. More room to use it.',
};

export const habits = [
  {
    id: 'dictate',
    title: 'Dictate',
    takeaway: 'Give it the whole picture.',
    body: 'You don’t need a perfectly written prompt. Talk through the situation, what matters, and what you’re trying to accomplish.',
    prompt:
      'I’m going to talk through a project. Let me get everything out, then organize it into priorities, open questions, and next steps.',
    deeper: {
      title: 'Ramble on purpose',
      intro: 'With people, we edit ourselves to save time. With AI, that editing removes the context it needs. Cover:',
      items: [
        'What’s happening',
        'Who the work is for',
        'What a good outcome looks like',
        'What you’ve already tried',
        'What feels unclear or difficult',
        'What you don’t want it to do',
      ],
      after: 'Then ask it to reflect back its understanding before it starts.',
    },
    remember: 'Relevant context beats polished wording — but leave out sensitive detail the task doesn’t need.',
  },
  {
    id: 'connect',
    title: 'Connect',
    takeaway: 'Give it the right context.',
    body: 'Relevant email, calendar, and documents let it respond to your actual work rather than a generic version of it.',
    prompt:
      'Review tomorrow’s calendar and the relevant email threads. Brief me on each meeting: purpose, unresolved questions, and anything I need to prepare. Link to the sources.',
    deeper: {
      title: 'Different sources answer different questions',
      pairs: [
        ['Calendar', 'What’s coming up?'],
        ['Email', 'What has been discussed or promised?'],
        ['Documents', 'What are we working from?'],
        ['Meeting notes', 'What did we decide, and why?'],
        ['Project instructions', 'What should matter every time?'],
      ],
      after:
        'Keep valuable outputs somewhere you can find and reuse them. Projects organize context; they aren’t confidentiality boundaries.',
    },
    remember: 'Connect deliberately. More access isn’t automatically better access.',
  },
  {
    id: 'think',
    title: 'Think',
    takeaway: 'Use the intelligence, not just the writing.',
    body: 'Ask it to compare options, find gaps, challenge assumptions, and help you decide what deserves attention.',
    prompt:
      'Compare these proposals against the funder’s priorities. Where is the case strongest? What evidence is missing? What would a thoughtful skeptic ask?',
    deeper: {
      title: 'Get beyond the first answer',
      quotes: [
        'What am I overlooking?',
        'Which of these differences actually matters?',
        'Separate what the documents establish from what you’re inferring.',
        'Give me a recommendation and explain the tradeoffs.',
        'What would change your recommendation?',
        'Ask me the questions you need answered before drafting.',
      ],
      after: 'For complex work, choose a capable model and a higher reasoning-effort setting when available.',
    },
    remember: 'A confident answer isn’t necessarily a correct one. Ask for evidence, uncertainty, and alternatives.',
  },
  {
    id: 'delegate',
    title: 'Delegate',
    takeaway: 'Describe the outcome, not every click.',
    body: 'Instead of finding, downloading, and rearranging everything yourself, describe the result. Let it handle the supported steps within clear boundaries.',
    prompt:
      'Find the relevant project documents in my connected email. Propose which belong in the brief, then combine the approved sources into one draft. Flag conflicts and missing information.',
    deeper: {
      title: 'A good delegation has four parts',
      pairs: [
        ['Outcome', 'What should exist when the work is done?'],
        ['Sources', 'What should it use?'],
        ['Boundaries', 'What may it change, and what needs approval?'],
        ['Review', 'How will you know it worked?'],
      ],
      after:
        'Start with work you can easily inspect: a brief, a document comparison, an email draft, or a proposed filing structure.',
    },
    remember: '“Drafted,” “saved,” “scheduled,” and “sent” are different outcomes. Ask what actually happened.',
  },
  {
    id: 'schedule',
    title: 'Schedule',
    takeaway: 'Turn remembering into a system.',
    body: 'When something needs repeated attention, decide when it gets checked and how you want to hear about it.',
    prompt:
      'Check these registration pages twice a month. Tell me what changed, highlight approaching deadlines, and deliver the results through a notification channel I’ll actually check.',
    deeper: {
      title: 'Close the loop',
      intro: 'A useful recurring task needs:',
      items: [
        'A specific thing to monitor',
        'A clear schedule',
        'A definition of what matters',
        'A delivery destination',
        'A stopping point',
      ],
      pairs: [
        ['A reminder', '“Tell me to check registration.”'],
        ['A scheduled task', '“Check registration and tell me what you find.”'],
      ],
      after: 'Choose the simplest version that solves the problem — then test the first delivery.',
    },
    remember: 'A task running quietly somewhere you never look isn’t taking anything off your mind.',
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
  success:
    'You can capture a conversation, find what mattered, and take the next step without rebuilding the process each time.',
};

export const chain = ['Capture', 'Context', 'Useful output', 'Follow-through'];

export const workflows = [
  {
    id: 'meeting-memory',
    title: 'Meeting memory',
    question: 'What did we decide last time, and what still needs to happen?',
    steps: [
      ['Capture', 'Record with participants’ knowledge and permission, or add your written notes.'],
      ['Make it useful', 'Summary, decisions, open questions, and actions with owners.'],
      ['Keep it findable', 'Store the notes consistently so they can be retrieved later.'],
      ['Follow through', 'Prepare the next meeting, draft follow-ups, catch unfinished commitments.'],
    ],
  },
  {
    id: 'executive-brief',
    title: 'A stronger executive brief',
    question: 'What does this person need to understand, and what decision are we asking them to make?',
    steps: [
      ['Gather', 'Bring the source documents together, with their links.'],
      ['Compare', 'Weigh the proposals against the audience’s priorities.'],
      ['Test', 'Find common themes and real differences. Flag gaps instead of guessing.'],
      ['Draft', 'One coherent narrative — not just one combined file.'],
      ['Review', 'Your read, your edits, then share.'],
    ],
  },
];

// Keep "worked on" (explored or set up in session) distinct from "verified working".
export const sessions = [
  {
    n: '01',
    date: { iso: '2026-10-05', label: 'October 5, 2026' },
    title: 'Connect the tools to real work',
    recap:
      'We connected tools to practical work: preparing for meetings, finding documents, organizing information, dictating requests, and setting up recurring checks.',
    workedOn: [
      'Calendar and email connections',
      'The desktop workspace for hands-on file tasks',
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

export const terms = [
  ['Model', 'The underlying AI system that interprets your request and generates a response. Different models have different strengths.'],
  ['App / workspace', 'The environment around a model — conversations, files, tools, scheduling, and other features.'],
  ['Prompt', 'Your request: what you want, the relevant background, and any constraints.'],
  ['Context', 'The information available to the AI for the current task — your conversation, instructions, documents, and anything retrieved through tools.'],
  ['Context window', 'How much information a model can work with at one time. Access to a large collection of files doesn’t mean it has read them all.'],
  ['Memory', 'Information a product may retain for future use. What it keeps depends on the product; it isn’t a complete or infallible record.'],
  ['Project', 'An organizational space for related conversations, reference files, and instructions.'],
  ['Connector', 'An authorized connection to another service, such as email, calendar, or document storage. Its permissions determine what is accessible.'],
  ['Tool', 'A capability for doing something beyond producing text — searching a source, reading a file, creating a supported calendar event.'],
  ['Artifact', 'A created output, such as a document, tracker, or interactive page. Sharing and editing options depend on how it was created.'],
  ['Agent', 'An AI system configured to pursue a goal through multiple steps, often using tools.'],
  ['Agentic workflow', 'Work in which AI takes supported steps toward an outcome, rather than only answering. The useful question: what can it actually do, and under whose approval?'],
  ['Harness', 'The tools, instructions, permissions, and environment surrounding a model that let it do useful work.'],
  ['Reasoning effort', 'A setting that gives the model more or less room to work through a problem. More effort can help; it doesn’t remove the need to verify.'],
  ['Scheduled task', 'A request configured to run at a future time or on a recurring schedule.'],
  ['Hallucination', 'An incorrect or invented claim presented as though it were true. Check important names, dates, figures, and sources.'],
  ['Prompt injection', 'Instructions hidden in material an AI reads that try to redirect it. A webpage or document is source material — not permission.'],
];

export const control = {
  title: 'Stay in control.',
  lede: 'Give it useful work. Keep your judgment.',
  lines: [
    ['Connect', 'only what the task needs.'],
    ['Check', 'important facts against their sources.'],
    ['Approve', 'sensitive messages, sharing, and consequential changes.'],
    ['Confirm', 'the work was actually saved, delivered, or scheduled.'],
  ],
  close: 'The goal isn’t to hand over judgment. It’s to spend more of yours where it matters.',
};
