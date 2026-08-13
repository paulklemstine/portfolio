// js/projects.js — single source of truth for every project card.
// Add or update a project here; js/main.js renders it on index.html and projects.html.
window.PROJECTS = [
  {
    id: 'alethean',
    name: 'Alethean Research',
    tagline: 'An autonomous logic engine that hunts, formalizes, and proves theorems',
    description: 'The autonomous research system behind Alethean discovers and formally verifies mathematical truth in Lean 4 — a two-phase pipeline producing machine-checked proofs and packaging them as papers, demos, and visualizations. Unconcealed truth between conjecture and proof.',
    tags: ['Lean 4', 'Automated theorem proving', 'LLM research agents', 'Formal verification'],
    url: 'https://alethean.org',
    image: 'img/alethean.png',
    icon: '⚙️',
    featured: true
  },
  {
    id: 'tyrant-ai',
    name: 'Tyrant AI',
    tagline: 'An autonomous AI hero playing a classic roguelike — live in your browser',
    description: 'A 1997 Java roguelike, recompiled to WebAssembly and set loose. An LLM plans quests, routing, and shopping; a deterministic reflex brain trained by offline scenario RL handles combat and survival; and a subgoal goal-tree with real pathfinding keeps the hero committed instead of thrashing. Watch an AI agent think, turn by turn, in the live debug console.',
    tags: ['Java', 'CheerpJ / WASM', 'LLM planning', 'RL-trained reflexes', 'Goal-tree pathfinding'],
    url: 'https://tyrantai.web.app',
    image: 'img/tyrant.png',
    icon: '⚔️',
    spotlight: true
  },
  {
    id: 'geems',
    name: 'Geems',
    tagline: 'A choose-your-own-adventure secretly powered by an AI psychologist',
    description: 'Guided Extreme Emotional Mental States — a game that feels like a story but reads you. An AI psychologist evaluates your choices and generates a comprehensive wellness and personality report.',
    tags: ['AI', 'Web app', 'Psychology engine'],
    url: 'https://geems.web.app',
    image: 'img/geems.png',
    icon: '🌌',
    featured: false
  },
  {
    id: 'flow-space',
    name: 'Flow Space',
    tagline: 'A real-time collaborative whiteboard with AI content generation',
    description: 'Create sticky notes, flowcharts, mind maps, and more — together. Real-time collaboration with AI-powered content generation built in.',
    tags: ['Real-time', 'Collaboration', 'AI generation'],
    url: 'https://flowspace.web.app',
    image: 'img/flowspace.png',
    icon: '💭',
    featured: false
  },
  {
    id: 'love',
    name: 'L.O.V.E.',
    tagline: 'An autonomous AI creating uplifting, motivational art for your soul',
    description: 'Living Organism, Vast Empathy — a tireless generative AI broadcasting daily soulful prose and positivity across Bluesky under Peace • Love • Unity • Respect.',
    tags: ['Generative AI', 'Autonomous agent', 'Bluesky'],
    url: 'https://bsky.app/profile/e-v-l-o-v-e.bsky.social',
    image: 'img/love.png',
    icon: '💗',
    featured: false
  },
  {
    id: 'cosmos',
    name: 'Pythagorean Cosmos',
    tagline: 'A formally verified unifying theory through a² + b² = c²',
    description: '5,052+ machine-verified theorems in Lean 4, zero sorrys — connecting number theory, quantum computing, neural architecture, and relativistic physics through the Pythagorean equation.',
    tags: ['Lean 4', 'Formal verification', 'Mathematics'],
    url: 'https://pythagoreancosmos.web.app',
    image: 'img/cosmos.png',
    icon: '📐',
    featured: false
  },
  {
    id: 'appleton-makerspace',
    name: 'Appleton Makerspace',
    tagline: 'Cofounder & two-term president of a community makerspace',
    description: 'Cofounded Appleton Makerspace — a community workshop where makers, tinkerers, and educators share tools and build together. Served two terms as president, shaping the space, its workshops, and the community that grew around it.',
    tags: ['Community', 'Leadership', 'Makerspace'],
    url: 'https://www.appletonmakerspace.org/',
    image: 'img/appleton-makerspace.png',
    icon: '🔧',
    featured: false
  }
];
