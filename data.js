// SAT 1500+ Trajectory — Data Model
// Ashkan's 13-Week Study Plan Data

const BASELINE = {date:'2026-08-25', total:1230, rw:680, math:550};
const CHECKPOINT_DATE = '2026-11-09';
const TESTDAY_DATE = '2026-12-05';

// watch: {type:'video', id:'YOUTUBE_ID', title:'...', minutes:N}
//     or {type:'channel', url:'...', label:'...'}
//     or null

const WEEKS = [
{n:1, range:'14–20 Sep', phase:'Phase 1 · Advanced Math attack', days:[
  {date:'2026-09-14',day:'Mon',hrs:'1h',subj:'math',title:'Advanced Math — equations & function notation',
   watch:{type:'video',id:'uwVVBfb6FnE',title:'Stuck at 1400? Do This for a 1500+ SAT (2026) — Pratik Vangal',minutes:20},
   do:'Review your Advanced Math misses from the tailored quiz first. Then KA Unit 8 (Medium: Advanced Math), 2–3 lessons: equations & function notation.',
   tip:'Advanced Math is your #1 leverage point (43% baseline) — an hour here is worth more than an hour anywhere else right now.'},
  {date:'2026-09-15',day:'Tue',hrs:'1h',subj:'math',title:'Advanced Math — quadratics & nonlinear equations',
   watch:{type:'channel',url:'https://www.youtube.com/@learnsatmath',label:'LearnSATMath — their quadratics / nonlinear-equations lesson'},
   do:'KA Unit 8 continued: quadratics & nonlinear equations lessons + unit quiz.'},
  {date:'2026-09-16',day:'Wed',hrs:'1h',subj:'math',title:'Advanced Math + Desmos basics',
   watch:{type:'channel',url:'https://www.youtube.com/@Tutorllini',label:'Tutorllini Test Prep — Desmos course, videos 1–2 (interface, graphing, intersections)'},
   do:'Finish KA Unit 8. Then open Desmos cold: graph a line, graph a parabola, find an intersection, read a coordinate.',
   tip:"Don't reach for Desmos on easy mental-math questions yet — this week is fluency with the tool, not speed."},
  {date:'2026-09-17',day:'Thu',hrs:'1h',subj:'eng',title:'Craft & Structure fix',
   watch:{type:'video',id:'8cxBQnzCyUM',title:'Every SAT Grammar Rule You Need (in 18 min) — Pratik Vangal',minutes:19},
   do:'10 Craft & Structure Qs from your tailored quiz set. Review every miss against the rules in the video.'},
  {date:'2026-09-19',day:'Sat',hrs:'1.5h',subj:'mix',title:'Adv Math continued + English maintenance',
   watch:{type:'video',id:'dRYq4Ga2K2k',title:'My SECRET SAT Study Schedule for EASY 1600s — Pratik Vangal',minutes:19},
   do:'45min Adv Math (KA Unit 8) + 45min Info & Ideas / Expression of Ideas, 10 Qs — keep your strong domains sharp.'}
]},
{n:2, range:'21–27 Sep', phase:'Phase 1 · Advanced Math finish + Desmos', days:[
  {date:'2026-09-21',day:'Mon',hrs:'1h',subj:'math',title:'Advanced Math — KA Unit 8 finish, Unit 12 begins',
   watch:{type:'channel',url:'https://www.youtube.com/@ScalarLearning',label:'Scalar Learning — a quadratics strategy/shortcuts video'},
   do:'Finish Unit 8. Move into the Advanced tier: KA Unit 12 begins.'},
  {date:'2026-09-22',day:'Tue',hrs:'1h',subj:'math',title:'Advanced Math — Unit 12, harder quadratics & systems',
   watch:{type:'channel',url:'https://www.youtube.com/@learnsatmath',label:'LearnSATMath — nonlinear systems topic'},
   do:'KA Unit 12 continued.'},
  {date:'2026-09-23',day:'Wed',hrs:'1h',subj:'math',title:'Desmos — zeros & vertex technique',
   watch:{type:'channel',url:'https://www.youtube.com/@Tutorllini',label:'Tutorllini Desmos course — zeros & vertex stage'},
   do:'Apply the technique to 10 Question Bank Advanced Math Qs — every one solved via Desmos zeros/vertex.'},
  {date:'2026-09-24',day:'Thu',hrs:'1h',subj:'eng',title:'Craft & Structure — 15 more Qs',
   watch:{type:'channel',url:'https://www.youtube.com/@PenguinTestPrep',label:'Penguin Test Prep — condensed grammar/Craft & Structure review'},
   do:'15 Qs. Review every miss for a pattern: vocab gap or structure-logic gap?'},
  {date:'2026-09-26',day:'Sat',hrs:'1.5h',subj:'mix',title:'Error-log review + English maintenance',
   watch:null,
   do:'30min Adv Math error review + 45min Standard English Conventions (10 Qs) + 15min free Desmos practice.'}
]},
{n:3, range:'28 Sep – 4 Oct', phase:'Phase 1 · Geometry & Trig attack', days:[
  {date:'2026-09-28',day:'Mon',hrs:'1h',subj:'math',title:'Geometry & Trig — circles & lines',
   watch:{type:'channel',url:'https://www.youtube.com/@learnsatmath',label:'LearnSATMath — circles & lines topic'},
   do:'KA Unit 9 (Medium: Geometry & Trigonometry) — circles & lines lessons.'},
  {date:'2026-09-29',day:'Tue',hrs:'1h',subj:'math',title:'Geometry & Trig — triangles & trig ratios',
   watch:{type:'channel',url:'https://www.youtube.com/@ScalarLearning',label:'Scalar Learning — triangles / trig ratios'},
   do:'KA Unit 9 continued.'},
  {date:'2026-09-30',day:'Wed',hrs:'1h',subj:'math',title:'Geometry & Trig + Desmos circles',
   watch:{type:'channel',url:'https://www.youtube.com/@Tutorllini',label:'Tutorllini Desmos course — graphing circles stage'},
   do:'Finish KA Unit 9. Practice graphing circles (center-radius & general form) in Desmos.'},
  {date:'2026-10-01',day:'Thu',hrs:'1h',subj:'eng',title:'Info & Ideas / Expression of Ideas maintenance',
   watch:null, do:'20 Qs, timed. Pure reps — no new content today.'},
  {date:'2026-10-03',day:'Sat',hrs:'1.5h',subj:'mix',title:'Geo/Trig error review + Craft & Structure retest',
   watch:null,
   do:'45min Geo/Trig error review + 45min Craft & Structure retest (10 Qs) — check the Week 1–2 fix actually stuck.'}
]},
{n:4, range:'5–11 Oct', phase:'Phase 1 · TEST 1 + Algebra begins', days:[
  {date:'2026-10-05',day:'Mon',hrs:'2.5h',subj:'test',title:'TEST 1 — full Bluebook practice test',
   watch:{type:'video',id:'HcG867qFZ5A',title:'My SECRET Digital SAT Hacks For 150+ Points — Pratik Vangal',minutes:11},
   do:'Full Bluebook practice test. Log your score the moment it lands.'},
  {date:'2026-10-06',day:'Tue',hrs:'1h',subj:'mix',title:'Full error-log review, both sections',
   watch:{type:'video',id:'wLTbifAiT3Y',title:'Digital SAT Mistakes Costing You 100+ Points — Pratik Vangal',minutes:18},
   do:'Sort every miss into: careless / content gap / timing.'},
  {date:'2026-10-07',day:'Wed',hrs:'1h',subj:'math',title:'Algebra begins',
   watch:{type:'channel',url:'https://www.youtube.com/@learnsatmath',label:'LearnSATMath — linear equations & systems'},
   do:'KA Unit 6 (Medium: Algebra) begins.'},
  {date:'2026-10-08',day:'Thu',hrs:'1h',subj:'eng',title:"Test 1's weakest R&W skill",
   watch:null, do:'Targeted Question Bank Qs on that skill only.'},
  {date:'2026-10-10',day:'Sat',hrs:'1.5h',subj:'mix',title:'Algebra continued + Desmos systems technique',
   watch:{type:'channel',url:'https://www.youtube.com/@Tutorllini',label:'Tutorllini Desmos course — systems-of-equations stage'},
   do:'45min Algebra + 45min Desmos: graph both equations, read the intersection point directly.'}
]},
{n:5, range:'12–18 Oct', phase:'Phase 2 · Algebra consolidation', days:[
  {date:'2026-10-12',day:'Mon',hrs:'1h',subj:'math',title:'Algebra — KA Unit 6 finish',
   watch:{type:'channel',url:'https://www.youtube.com/@ScalarLearning',label:'Scalar Learning — algebra strategy'}, do:'KA Unit 6 finish.'},
  {date:'2026-10-13',day:'Tue',hrs:'1h',subj:'math',title:'Algebra — KA Unit 10 (Advanced tier)',
   watch:{type:'channel',url:'https://www.youtube.com/@learnsatmath',label:'LearnSATMath — advanced algebra topic'}, do:'KA Unit 10.'},
  {date:'2026-10-14',day:'Wed',hrs:'1h',subj:'math',title:'Desmos — systems & inequalities drill',
   watch:{type:'channel',url:'https://www.youtube.com/@Tutorllini',label:'Tutorllini Desmos course — inequalities stage'}, do:'Systems & inequalities graphing drill, 10 Qs.'},
  {date:'2026-10-15',day:'Thu',hrs:'1h',subj:'eng',title:'Standard English Conventions',
   watch:{type:'channel',url:'https://www.youtube.com/@PenguinTestPrep',label:'Penguin Test Prep — grammar rules deep dive'}, do:'15 Qs.'},
  {date:'2026-10-17',day:'Sat',hrs:'1.5h',subj:'mix',title:'Algebra error review + Expression of Ideas maintenance',
   watch:null, do:'45min Algebra error review + 45min Expression of Ideas (10 Qs).'}
]},
{n:6, range:'19–25 Oct', phase:'Phase 2 · Mixed math review + Desmos regression', days:[
  {date:'2026-10-19',day:'Mon',hrs:'1h',subj:'math',title:'Interleaved set', watch:null,
   do:'10 Adv Math + 10 Geo/Trig + 10 Algebra from the Question Bank, weakest-domain first.'},
  {date:'2026-10-20',day:'Tue',hrs:'1h',subj:'math',title:'Redo every miss from Monday', watch:null,
   do:'Same questions, not similar ones — check the fix actually holds.'},
  {date:'2026-10-21',day:'Wed',hrs:'1h',subj:'math',title:'Desmos — regression (~) technique',
   watch:{type:'channel',url:'https://www.youtube.com/@Tutorllini',label:'Tutorllini Desmos course — regression / scatterplot stage'},
   do:'Apply to 10 scatterplot / line-of-best-fit Qs.'},
  {date:'2026-10-22',day:'Thu',hrs:'1h',subj:'eng',title:'Craft & Structure retest + rhetorical synthesis',
   watch:{type:'channel',url:'https://www.youtube.com/@supertutortv',label:'SupertutorTV — rhetorical synthesis / Craft & Structure strategy'},
   do:'Craft & Structure retest, 10 Qs.'},
  {date:'2026-10-24',day:'Sat',hrs:'1.5h',subj:'eng',title:'Full untimed R&W module', watch:null, do:'Self-paced, for reading stamina.'}
]},
{n:7, range:'26 Oct – 1 Nov', phase:'Phase 2 · TEST 2 + Problem Solving refresh', days:[
  {date:'2026-10-26',day:'Mon',hrs:'2.5h',subj:'test',title:'TEST 2 — full Bluebook practice test', watch:null, do:'Log your score.'},
  {date:'2026-10-27',day:'Tue',hrs:'1h',subj:'mix',title:'Full error-log review, both sections', watch:null,
   do:'Same sort as Test 1: careless / content gap / timing.'},
  {date:'2026-10-28',day:'Wed',hrs:'1h',subj:'math',title:'Problem Solving & Data Analysis — light refresh only', watch:null,
   do:'KA Unit 7/11, 10 Qs. You were 100% at baseline — confirming no drift, not re-studying.'},
  {date:'2026-10-29',day:'Thu',hrs:'1h',subj:'eng',title:"Test 2's weakest skill", watch:null, do:'Targeted drilling only.'},
  {date:'2026-10-31',day:'Sat',hrs:'1.5h',subj:'mix',title:'Math + English error-log clearance', watch:null, do:'45min + 45min.'}
]},
{n:8, range:'2–8 Nov', phase:'Phase 2 · Full timed sections', days:[
  {date:'2026-11-02',day:'Mon',hrs:'1h',subj:'math',title:'Timed Math module', watch:null, do:'35 minutes, real conditions. Review immediately after.'},
  {date:'2026-11-03',day:'Tue',hrs:'1h',subj:'eng',title:'Timed R&W module', watch:null, do:'32 minutes, real conditions. Review immediately after.'},
  {date:'2026-11-04',day:'Wed',hrs:'1h',subj:'math',title:'Desmos — table back-solve technique',
   watch:{type:'channel',url:'https://www.youtube.com/@Tutorllini',label:'Tutorllini Desmos course — table / back-solve stage'},
   do:'Apply to 10 Adv Math / Algebra Qs.'},
  {date:'2026-11-05',day:'Thu',hrs:'1h',subj:'eng',title:'Craft & Structure final push',
   watch:{type:'channel',url:'https://www.youtube.com/@supertutortv',label:'SupertutorTV — Craft & Structure recap'}, do:'15 Qs.'},
  {date:'2026-11-07',day:'Sat',hrs:'1.5h',subj:'math',title:'Second timed Math module', watch:null, do:'35min + review the weakest domain only.'}
]},
{n:9, range:'9–15 Nov', phase:'Phase 3 · TEST 3 — decision checkpoint', days:[
  {date:'2026-11-09',day:'Mon',hrs:'2.5h',subj:'test',title:'TEST 3 — full Bluebook practice test', watch:null, do:'Log your score.'},
  {date:'2026-11-10',day:'Tue',hrs:'1h',subj:'mix',title:'Full error-log review — decision point', watch:null,
   do:'On pace for 1500+? Register for 5 Dec by Thursday. Off pace? Default to 6 March 2027 and keep building — no taper yet.'},
  {date:'2026-11-11',day:'Wed',hrs:'1h',subj:'math',title:"Test 3's single weakest domain", watch:null, do:'Targeted drilling only.'},
  {date:'2026-11-12',day:'Thu',hrs:'1h',subj:'eng',title:"Test 3's weakest domain", watch:null, do:'Targeted drilling only.'},
  {date:'2026-11-14',day:'Sat',hrs:'1.5h',subj:'mix',title:'Desmos quick-fire review + English full timed section',
   watch:{type:'channel',url:'https://www.youtube.com/@Tutorllini',label:'Tutorllini Desmos course — quick recap of all stages'},
   do:'20 Qs mixing all 6 Desmos techniques + one full R&W module.'}
]},
{n:10, range:'16–22 Nov', phase:'Phase 3 · Full integration', days:[
  {date:'2026-11-16',day:'Mon',hrs:'1h',subj:'math',title:'Full timed Math module', watch:null, do:'+ review.'},
  {date:'2026-11-17',day:'Tue',hrs:'1h',subj:'eng',title:'Full timed R&W module', watch:null, do:'+ review.'},
  {date:'2026-11-18',day:'Wed',hrs:'1h',subj:'math',title:'Interleaved weakest-domain drilling', watch:null, do:'From your error log.'},
  {date:'2026-11-19',day:'Thu',hrs:'1h',subj:'eng',title:'Interleaved weakest-domain drilling', watch:null, do:'From your error log.'},
  {date:'2026-11-21',day:'Sat',hrs:'1.5h',subj:'mix',title:'Half practice test', watch:null, do:'2 modules, ~70min, timed. Review.'}
]},
{n:11, range:'23–29 Nov', phase:'Phase 3 · TEST 4 — final calibration', days:[
  {date:'2026-11-23',day:'Mon',hrs:'2.5h',subj:'test',title:'TEST 4 — full Bluebook practice test', watch:null, do:'Log your score.'},
  {date:'2026-11-24',day:'Tue',hrs:'1h',subj:'mix',title:'Full error-log review, both sections', watch:null, do:''},
  {date:'2026-11-25',day:'Wed',hrs:'1h',subj:'math',title:'Last-mile drilling on Test 4 misses only', watch:null, do:'Nothing new.'},
  {date:'2026-11-26',day:'Thu',hrs:'1h',subj:'eng',title:'Last-mile drilling on Test 4 misses only', watch:null, do:'Nothing new.'},
  {date:'2026-11-28',day:'Sat',hrs:'1.5h',subj:'mix',title:'Confidence set', watch:null,
   do:'20 Qs at your strong-accuracy level + light Desmos refresh. Build momentum, not stress.'}
]},
{n:12, range:'30 Nov – 6 Dec', phase:'Phase 3 · Taper (if sitting 5 Dec)', days:[
  {date:'2026-11-30',day:'Mon',hrs:'1h',subj:'math',title:'Light timed Math — 20 Qs only', watch:null, do:'No new content.'},
  {date:'2026-12-01',day:'Tue',hrs:'1h',subj:'eng',title:'Light timed English — 20 Qs only', watch:null, do:'No new content.'},
  {date:'2026-12-02',day:'Wed',hrs:'0.5h',subj:'mix',title:'Rest, or a 30-minute confidence review', watch:null, do:''},
  {date:'2026-12-03',day:'Thu',hrs:'1h',subj:'log',title:'Logistics check', watch:null,
   do:'ID, device charged, Bluebook updated, admission ticket, route to test centre, shift sleep earlier.'},
  {date:'2026-12-05',day:'Sat',hrs:'—',subj:'test',title:'TEST DAY (if 5 Dec chosen)', watch:null,
   do:'No prep. Arrive rested. If deferred to March, this is a normal mixed practice Saturday instead.'}
]},
{n:13, range:'7–13 Dec', phase:'Bridge week', days:[
  {date:'2026-12-07',day:'Mon',hrs:'0.5h',subj:'log',title:'Rest / reflect', watch:null, do:'Log how the real test felt vs practice — timing, nerves, surprises.'},
  {date:'2026-12-08',day:'Tue',hrs:'1h',subj:'eng',title:'Light maintenance only', watch:null, do:''},
  {date:'2026-12-09',day:'Wed',hrs:'1h',subj:'math',title:'Light maintenance only', watch:null, do:''},
  {date:'2026-12-10',day:'Thu',hrs:'1h',subj:'mix',title:'Light maintenance only', watch:null, do:''},
  {date:'2026-12-12',day:'Sat',hrs:'1.5h',subj:'log',title:'Plan the next phase', watch:null,
   do:"Scores landed → decide if 6 March is for superscore-banking or you're done. Deferred → Phase 4 toward March gets built here."}
]}
];

// Toolkit techniques data
const TOOLKIT_DATA = {
  habits: {
    rule: "Decide first, then type, bracket everything.",
    details: "Desmos is an execution amplifier, not a thinking replacement. Determine the mathematical property you need (intersection, root, vertex, or parameter fit) before opening the keypad. Always enclose multi-term numerators, denominators, and exponents in parentheses: e.g. (a + b) / (c + d) and x^(2n)."
  },
  techniques: [
    {
      id: "intersections",
      title: "1. Graph to Find Intersections",
      subtitle: "Systems of Linear, Quadratic & Circular Equations",
      desc: "Graph both equations exactly as written in the question. Desmos automatically computes intersection points and marks them with gray click dots. Click the point to read (x, y) coordinates instantly — zero algebraic elimination or quadratic factoring needed.",
      example: "y = 2x + 1 and y = x^2 - 4x + 6 → type both, click intersection point (1, 3) or (5, 11).",
      tags: ["Systems", "Intersections", "Algebra", "Speed"]
    },
    {
      id: "zeros-vertex",
      title: "2. Zeros & Vertex Technique",
      subtitle: "Roots, Extrema, Parabolas & Vertex Form",
      desc: "For any quadratic or polynomial, type y = f(x). Click the x-axis intercepts for roots/solutions. Click the peak (maximum) or trough (minimum) to read the vertex (h, k). In vertex form y = a(x - h)^2 + k, read h and k immediately without completing the square.",
      example: "f(x) = -2x^2 + 12x - 10 → click peak at (3, 8) → maximum value is 8, occurring at x = 3.",
      tags: ["Quadratics", "Vertex", "Max/Min", "Roots"]
    },
    {
      id: "table-backsolve",
      title: "3. Table Back-Solve",
      subtitle: "Plugging In Answer Choices & Evaluating Sequences",
      desc: "Convert expressions to tables (gear icon → Table icon) or define f(x) and evaluate f(choice) for quick elimination. Ideal for questions asking 'which value of x satisfies...' or sequence evaluation.",
      example: "Define f(x) = (3x^2 - 5x + 2)/(x - 1), then type f(4), f(5), f(6) to inspect outputs instantly.",
      tags: ["Tables", "Back-Solving", "Function Notation"]
    },
    {
      id: "regression",
      title: "4. Regression (~)",
      subtitle: "Instant Model Fitting & Parameter Recovery",
      desc: "Solve for constants and coefficients automatically. Create a 2-point or 3-point table (x_1, y_1), then type y_1 ~ m x_1 + b (linear), y_1 ~ a x_1^2 + b x_1 + c (quadratic), or y_1 ~ a b^(x_1) (exponential). Desmos outputs the exact parameters with R² = 1.",
      example: "Points (2, 5) and (4, 13) in table → y_1 ~ m x_1 + b yields m = 4, b = -3.",
      tags: ["Regression", "Scatterplots", "Constants", "Nonlinear"]
    },
    {
      id: "sliders",
      title: "5. Sliders",
      subtitle: "Dynamic Parameter Sweeps & No-Solution Boundaries",
      desc: "When an equation contains an unknown constant k (e.g. 'for what value of k does the system have no solution?'), add a slider for k. Adjusting the slider visually reveals parallel slopes, tangent intersections, or discriminant boundaries.",
      example: "Graph y = 3x + k alongside y = -x^2 + 5; slide k until the parabola and line touch at exactly one point.",
      tags: ["Sliders", "Discriminant", "Parameter Search"]
    },
    {
      id: "equivalent-expression",
      title: "6. Equivalent-Expression Check",
      subtitle: "Foolproof Choice Verification",
      desc: "When asked 'Which of the following is equivalent to...', type the given expression on line 1: y = (expression). Then type Choice A, B, C, D on lines 2–5. The choice whose graph overlays the original curve line-for-line across all x is the correct answer.",
      example: "Line 1: y = (x^3 - 8)/(x - 2). Line 2: y = x^2 + 2x + 4. Notice graphs overlap perfectly.",
      tags: ["Equivalence", "Factoring", "Rational Expressions"]
    }
  ],
  formulas: [
    { name: "Circle Equation", formula: "(x - h)² + (y - k)² = r²", note: "Center (h, k), radius r. In general form, group x & y terms and Desmos will graph it directly without completing the square!" },
    { name: "Vertex x-coordinate", formula: "x = -b / (2a)", note: "Symmetry axis of ax² + bx + c. Plug back in for maximum/minimum value k." },
    { name: "Quadratic Discriminant", formula: "Δ = b² - 4ac", note: "Δ > 0: 2 real roots. Δ = 0: 1 real root (tangent). Δ < 0: no real roots." },
    { name: "Exponential Growth/Decay", formula: "y = a(1 ± r)^t or y = a · b^t", note: "a = initial value, b = growth factor (1 + r) or decay factor (1 - r)." }
  ]
};

// Video Library Data
const VIDEO_LIBRARY_DATA = {
  startHere: [
    {
      id: 'uwVVBfb6FnE',
      title: 'Stuck at 1400? Do This for a 1500+ SAT (2026)',
      creator: 'Pratik Vangal',
      duration: '20 min',
      notes: 'Strategic roadmap for breaking the 1400 ceiling into 1500+. Highlights error-logging discipline, eliminating low-hanging algebraic slips, and optimizing test-day module psychology.'
    },
    {
      id: '8cxBQnzCyUM',
      title: 'Every SAT Grammar Rule You Need (in 18 min)',
      creator: 'Pratik Vangal',
      duration: '19 min',
      notes: 'High-yield condensation of Standard English Conventions: semicolons vs colons, modifier placement, essential vs nonessential clauses, and pronoun-antecedent agreement.'
    },
    {
      id: 'dRYq4Ga2K2k',
      title: 'My SECRET SAT Study Schedule for EASY 1600s',
      creator: 'Pratik Vangal',
      duration: '19 min',
      notes: 'Structured weekly rhythms, balancing interleaved skill drills with full timed sections and high-retention spaced repetition.'
    },
    {
      id: 'HcG867qFZ5A',
      title: 'My SECRET Digital SAT Hacks For 150+ Points',
      creator: 'Pratik Vangal',
      duration: '11 min',
      notes: 'Bluebook interface speedups: annotator shortcuts, answer-choice strike-through tactics, flagging discipline, and time-budgeting.'
    },
    {
      id: 'wLTbifAiT3Y',
      title: 'Digital SAT Mistakes Costing You 100+ Points',
      creator: 'Pratik Vangal',
      duration: '18 min',
      notes: 'Analysis of careless traps: sign flips, failing to re-read the target variable in the question stem, and over-committing time to hard Module 1 questions.'
    }
  ],
  channels: [
    {
      name: 'LearnSATMath',
      handle: '@learnsatmath',
      url: 'https://www.youtube.com/@learnsatmath',
      focus: 'Advanced Math, Quadratics, Nonlinear Systems',
      desc: 'Top-tier walkthroughs covering hard advanced math and geometric reasoning for 750+ scorers.'
    },
    {
      name: 'Scalar Learning',
      handle: '@ScalarLearning',
      url: 'https://www.youtube.com/@ScalarLearning',
      focus: 'Live timed test solves, Algebra, Speed strategies',
      desc: 'Huzefa solves SAT math tests in real time under strict time limits, narrating shortcuts and mental math techniques.'
    },
    {
      name: 'Tutorllini Test Prep',
      handle: '@Tutorllini',
      url: 'https://www.youtube.com/@Tutorllini',
      focus: 'Desmos Masterclass Course, Graphing, Systems, Regressions',
      desc: 'The definitive SAT Desmos series: zero-to-hero coverage from basic intersections to advanced regressions and sliders.'
    },
    {
      name: 'Penguin Test Prep',
      handle: '@PenguinTestPrep',
      url: 'https://www.youtube.com/@PenguinTestPrep',
      focus: 'Grammar Deep Dives & Craft & Structure logic',
      desc: 'Crisp, structured breakdowns of SAT Reading & Writing conventions, rhetorical synthesis, and question logic.'
    },
    {
      name: 'SupertutorTV',
      handle: '@supertutortv',
      url: 'https://www.youtube.com/@supertutortv',
      focus: 'R&W Strategy, Rhetorical Synthesis, Stamina',
      desc: 'Brooke Hansen’s seasoned strategies for digital SAT reading passages, pacing, and avoiding distractor choices.'
    },
    {
      name: 'James Lu SAT',
      handle: '@JamesLuSAT',
      url: 'https://www.youtube.com/@JamesLuSAT',
      focus: 'Digital SAT walkthroughs & problem-solving frameworks',
      desc: 'Clear, modern problem teardowns with practical tips for both Math and R&W sections.'
    },
    {
      name: 'Khan Academy Official',
      handle: 'Official SAT Prep Partner',
      url: 'https://www.khanacademy.org/digital-sat',
      focus: 'Skill units, practice quizzes, diagnostic modules',
      desc: 'Official College Board curriculum partner with leveled skill modules, foundational drills, and official Question Bank ties.'
    }
  ]
};

// Tips & Tricks tab categories verbatim from 2026 digital SAT format
const TIPS_DATA = [
  {
    id: "module-pacing",
    title: "Module pacing",
    items: [
      "Reading & Writing: 54 questions across two 27-question modules, 32 minutes each (64 min total) → about 71 seconds per question. Fixed order inside every module: Information & Ideas → Craft & Structure → Expression of Ideas → Standard English Conventions.",
      "Math: 44 questions across two 22-question modules, 35 minutes each (70 min total) → about 95 seconds per question. About 75% multiple choice; the rest are typed numeric answers — no choices to eliminate on those."
    ]
  },
  {
    id: "adaptive-trap",
    title: "The adaptive trap",
    items: [
      "Module 1 performance sets Module 2's difficulty band, and harder Module 2 questions carry more weight toward your score. A clean, accurate Module 1 matters more than a heroic Module 2 — protect it from rushed mistakes rather than racing through it."
    ]
  },
  {
    id: "when-to-move-on",
    title: "When to move on",
    items: [
      "No clear path after about 45–60 seconds → best guess, flag it, move on. Time doesn't carry between modules or between sections, so a saved minute in Module 1 is wasted if it isn't spent in Module 1."
    ]
  },
  {
    id: "never-leave-blank",
    title: "Never leave a blank",
    items: [
      "No penalty for a wrong answer. An unanswered question is strictly worse than a guess — always fill in something before a module locks."
    ]
  },
  {
    id: "bluebook-tools",
    title: "Bluebook tools to know cold before test day",
    items: [
      "Mark for Review flag, strike-through on answer choices, the built-in Desmos calculator (graphing + scientific modes), and the highlighter/annotate tool on passages. Practice with all four in every Bluebook test — not for the first time on test day."
    ]
  },
  {
    id: "careless-mistake-checklist",
    title: "The careless-mistake checklist",
    items: [
      "Sign errors, misreading \"NOT\" or \"EXCEPT\" in the question stem, off-by-one on line or evidence references, unit mismatches, rounding too early. Run this list against anything marked wrong in review, and sort it into \"careless\" vs \"content gap\" before deciding how to fix it — they need different fixes."
    ]
  },
  {
    id: "test-day-logistics",
    title: "Test-day logistics",
    items: [
      "Sleep 8 hours for the two nights before, not just the last one — sleep debt compounds. Eat a familiar breakfast. Pack a charged device and its charger. Bring photo ID and the admission ticket. Arrive early enough that a queue doesn't rush your start."
    ]
  }
];

// Attach to window object for bulletproof browser accessibility
if (typeof window !== 'undefined') {
  window.BASELINE = BASELINE;
  window.CHECKPOINT_DATE = CHECKPOINT_DATE;
  window.TESTDAY_DATE = TESTDAY_DATE;
  window.WEEKS = WEEKS;
  window.TOOLKIT_DATA = TOOLKIT_DATA;
  window.VIDEO_LIBRARY_DATA = VIDEO_LIBRARY_DATA;
  window.TIPS_DATA = TIPS_DATA;
}
