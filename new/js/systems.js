// new/js/systems.js — data model for the "Lab Report" redesign.
// Each system is a case study: what it is, why it matters, what's real right now (proof), how it's built.
window.SYSTEMS = [
  {
    id: 'alethean',
    name: 'Alethean Research',
    tagline: 'An autonomous logic engine that hunts, formalizes, and proves theorems',
    role: 'Flagship · autonomous research system',
    status: { label: 'live', live: true },
    icon: '⚙️',
    url: 'https://alethean.org',
    image: 'img/alethean.png',
    proof: [
      '5,052+ theorems discovered, formalized, and machine-checked in Lean 4 — zero shortcuts',
      'Every step verified by a proof checker; no conjecture published that isn\'t proven',
      'A working research pipeline that packages machine-checked proofs as papers, demos, and visualizations'
    ],
    why: 'Mathematical truth is expensive to establish and easy to get wrong. Alethean automates the hard part — not just generating conjectures but proving them — so the claims it makes can be trusted to the letter.',
    architecture: 'A two-phase pipeline. Phase one: LLM research agents hunt and formalize conjectures. Phase two: an automated theorem-proving loop in Lean 4 checks every step and emits machine-readable proofs. The results are packaged as papers, demos, and interactive visualizations.',
    stack: ['Lean 4', 'Automated theorem proving', 'LLM research agents', 'Formal verification']
  },
  {
    id: 'tyrant-ai',
    name: 'Tyrant AI',
    tagline: 'An autonomous AI hero playing a classic roguelike — live in your browser',
    role: 'Autonomous agent · running now',
    status: { label: 'live in browser', live: true },
    icon: '⚔️',
    url: 'https://tyrantai.web.app',
    image: 'img/tyrant.png',
    proof: [
      'A real AI hero playing the 1997 roguelike in your browser right now',
      'Its plan, goals, and reasoning stream to a live debug console — turn by turn, no editing',
      'The hero sets quests, routes itself, shops, fights, and survives on its own'
    ],
    why: 'Most “game AI” demos are scripted. Tyrant is a genuinely autonomous agent that decides what to do and why — a working window into how an agent actually thinks, not a canned replay.',
    architecture: 'A 1997 Java roguelike recompiled to WebAssembly. An LLM owns high-level planning (quests, routing, shopping); a deterministic reflex brain trained by offline scenario reinforcement learning owns combat and survival; a subgoal goal-tree with real pathfinding keeps the hero committed instead of thrashing.',
    stack: ['Java', 'CheerpJ / WASM', 'LLM planning', 'RL-trained reflexes', 'Goal-tree pathfinding']
  },
  {
    id: 'geems',
    name: 'Geems',
    tagline: 'A choose-your-own-adventure secretly powered by an AI psychologist',
    role: 'Guided Extreme Emotional Mental States',
    status: { label: 'live', live: true },
    icon: '🌌',
    url: 'https://geems.web.app',
    image: 'img/geems.png',
    proof: [
      'A story that reads you: every choice is evaluated by an AI psychology engine',
      'The full journey compiles into a comprehensive wellness and personality report',
      'The psychological model, not the script, drives where the story goes'
    ],
    why: 'Interactive fiction usually branches on script. Geems branches on you — the narrative responds to psychological state, which is a different and much harder kind of engine.',
    architecture: 'A web app presenting a choose-your-own-adventure over an AI psychology engine. Each choice feeds the engine, which evaluates the player’s trajectory and generates a structured wellness and personality report from the whole journey.',
    stack: ['AI', 'Web app', 'Psychology engine']
  },
  {
    id: 'flow-space',
    name: 'Flow Space',
    tagline: 'A real-time collaborative whiteboard with AI content generation',
    role: 'Real-time collaboration',
    status: { label: 'live', live: true },
    icon: '💭',
    url: 'https://flowspace.web.app',
    image: 'img/flowspace.png',
    proof: [
      'A live collaborative canvas — sticky notes, flowcharts, mind maps — many people at once',
      'AI content generation built natively into the canvas, not bolted on',
      'Synced in real time across participants'
    ],
    why: 'Teams should be able to think together with AI in the room. Flow Space makes AI a native part of the collaborative canvas rather than an add-on feature.',
    architecture: 'A real-time multi-user canvas (sticky notes, flowcharts, mind maps) with built-in AI content generation, synchronized live across every participant.',
    stack: ['Real-time', 'Collaboration', 'AI generation']
  },
  {
    id: 'love',
    name: 'L.O.V.E.',
    tagline: 'An autonomous AI creating uplifting, motivational art for your soul',
    role: 'Autonomous agent · generative',
    status: { label: 'live', live: true },
    icon: '💗',
    url: 'https://bsky.app/profile/e-v-l-o-v-e.bsky.social',
    image: 'img/love.png',
    proof: [
      'A tireless autonomous generative agent publishing original, uplifting prose to Bluesky',
      'Runs on its own schedule under Peace • Love • Unity • Respect — no human steering',
      'Engineered to keep a consistent voice and produce original output day after day'
    ],
    why: 'An experiment in autonomous creative agents: can a system generate original, emotionally resonant writing indefinitely without human direction? L.O.V.E. is that question answered in production.',
    architecture: 'An autonomous loop: generate original soulful prose, post it to Bluesky, repeat. Voice consistency and output originality are engineered in, so the agent stays itself without human steering.',
    stack: ['Generative AI', 'Autonomous agent', 'Bluesky']
  },
  {
    id: 'cosmos',
    name: 'Pythagorean Cosmos',
    tagline: 'A formally verified unifying theory through a² + b² = c²',
    role: 'Formal verification · mathematics',
    status: { label: 'live', live: true },
    icon: '📐',
    url: 'https://pythagoreancosmos.web.app',
    image: 'img/cosmos.png',
    proof: [
      '5,052+ machine-verified theorems in Lean 4 — zero sorrys',
      'A single formal chain through number theory, quantum computing, neural architecture, and relativistic physics',
      'Every connection built on the Pythagorean equation, none asserted'
    ],
    why: 'A unifying theory is only as strong as its proof. Cosmos takes the Pythagorean equation as seriously as a theorem: every connection between fields is formally verified, not argued.',
    architecture: 'A Lean 4 formalization — an expanding library of machine-checked theorems structured so that results in one field compose cleanly into the next, hosted as its own live site.',
    stack: ['Lean 4', 'Formal verification', 'Mathematics']
  },
  {
    id: 'appleton-makerspace',
    name: 'Appleton Makerspace',
    tagline: 'Cofounder & two-term president of a community makerspace',
    role: 'Community · leadership',
    status: { label: 'registered nonprofit', live: true },
    icon: '🔧',
    url: 'https://www.appletonmakerspace.org/',
    image: 'img/appleton-makerspace.png',
    proof: [
      'Cofounded a community workshop that became a registered nonprofit in the Fox Cities',
      'Two terms as president: permanent facilities secured, weekly technical workshops organized',
      'Grew the local maker community around shared tools and open-to-all making'
    ],
    why: 'Making is for everyone. The makerspace’s job was to prove a community workshop can be sustainable, welcoming, and genuinely useful — and to build the community that keeps it going.',
    architecture: 'Organizational leadership end to end: cofounding the space, steering it through nonprofit transition, securing permanent facilities, running weekly workshops, and growing the community — a system of people and tools, not software.',
    stack: ['Community', 'Leadership', 'Makerspace']
  }
];
