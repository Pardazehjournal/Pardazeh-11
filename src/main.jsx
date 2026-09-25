import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Menu, Moon, Sun, X, ArrowRight, Send, Linkedin } from 'lucide-react';
import './styles.css';

const A = import.meta.env.BASE_URL + 'assets/';

const issueMeta = {
  no: 'یازدهم',
  date: 'شهریور ماه 1405',
  owner: 'انجمن علمی دانشجویی دانشکده مهندسی کامپیوتر دانشگاه صنعتی شاهرود',
  theme: 'فرصت‌ها، چالش‌ها، آینده‌ای که با صفر و یک ساخته می‌شود',
};

const masthead = [
  { role: 'استاد مشاور', name: 'دکتر هدی مشایخی' },
  { role: 'مدیرمسئول', name: 'فاطمه حبیبی' },
  { role: 'سردبیر', name: 'محمد یوسف رضایی' },
  { role: 'طراح و صفحه‌آرا', name: 'علیرضا حسین زرگری' },
  { role: 'ویراستاران', name: 'فاطمه حبیبی، ساناز فروغی' },
];

const editorialBoard = [
  'فاطمه حبیبی', 'محمد یوسف رضایی', 'علیرضا حسین زرگری',
  'حدیث لطفی', 'حدیثه وطن‌خواه', 'بهراد مهران‌پور', 'ساناز فروغی',
];

const telegramLinks = [
  { label: 'کانال تلگرام نشریه', href: 'https://t.me/pardazehJournal' },
  { label: 'کانال تلگرام انجمن', href: 'https://t.me/CITSUT' },
];

const sarmaghaleParts = [
  { no: 1,  id: 'edu',       title: 'هوش مصنوعی در آموزش', authors: ['فاطمه حبیبی'], photo: 'sarmaghale-edu-teacher.png', pages: '9' },
  { no: 2,  id: 'medicine',  title: 'هوش مصنوعی در پزشکی', authors: ['حدیثه وطن‌خواه'], photo: 'author-hadiseh.png', pages: '10' },
  { no: 3,  id: 'industry',  title: 'از خط تولید خودکار تا کارخانه تصمیم‌گیر', subtitle: 'نقش هوش مصنوعی در مهندسی و صنعت', authors: ['محمد یوسف رضایی'], photo: 'author-mohammadyousef.png', pages: '11–12' },
  { no: 4,  id: 'swe',       title: 'هوش مصنوعی در برنامه‌نویسی و مهندسی نرم‌افزار', authors: ['فاطمه حبیبی'], photo: 'author-fatemeh-swe.png', pages: '13–14' },
  { no: 5,  id: 'security',  title: 'هوش مصنوعی در امنیت سایبری', subtitle: 'از تشخیص تهدید تا شکل‌گیری حملات هوشمند', authors: ['فاطمه حبیبی'], photo: 'author-fatemeh-security.png', pages: '15–16' },
  { no: 6,  id: 'business',  title: 'هوش مصنوعی در کسب‌وکار و اقتصاد', authors: ['فاطمه حبیبی'],  photo: 'author-fatemeh-business.png', pages: '17–18' },
  { no: 7,  id: 'creative',  title: 'بازتعریف خلاقیت در عصر هوش مصنوعی', subtitle: 'هنر، رسانه و چالش‌های حقوقی', authors: ['علیرضا حسین زرگری'],photo: 'author-aliereza-creative.png', pages: '19–20' },
  { no: 8,  id: 'social',    title: 'الگوریتم‌محوری و دگردیسی زیست‌بوم تولید محتوا', subtitle: 'در شبکه‌های اجتماعی', authors: ['علیرضا حسین زرگری'], photo: 'author-aliereza-social.png', pages: '21–22' },
  { no: 9,  id: 'transport', title: 'هوش مصنوعی در حمل‌ونقل', authors: ['حدیثه وطن‌خواه'], photo: 'author-hadiseh.png',photo: 'author-hadiseh-transport.png', pages: '23' },
  { no: 10, id: 'agri',      title: 'هوش مصنوعی در کشاورزی و محیط‌زیست', authors: ['فاطمه حبیبی'],  photo: 'author-fatemeh-agri.png', pages: '24–25' },
  { no: 11, id: 'law',       title: 'هوش مصنوعی در حقوق، اخلاق و جامعه', authors: ['حدیث لطفی'], photo: 'author-hadis-law.png', pages: '26' },
  { no: 12, id: 'daily',     title: 'هوش مصنوعی در زندگی روزمره', authors: ['حدیث لطفی'], photo: 'author-hadis-daily.png', pages: '27' },
  { no: 13, id: 'work',      title: 'آینده کار در عصر هوش مصنوعی', subtitle: 'حذف شغل یا بازطراحی کار؟', authors: ['محمد یوسف رضایی'], photo: 'author-mohammadyousef-work.png', pages: '28–29' },
  { no: 14, id: 'iran',      title: 'هوش مصنوعی در ایران', authors: ['بهراد مهران‌پور'],photo: 'author-behrad-iran.png', pages: '30–31' },
  { no: 15, id: 'future',    title: 'آینده هوش مصنوعی', subtitle: 'از سامانه‌های تخصصی تا چشم‌انداز هوش عمومی و ابرهوش', authors: ['بهراد مهران‌پور'],photo: 'author-behrad-future.png', pages: '32–33' },
];


const linkedinSteps = [
  'عکس پروفایل', 'Headline', 'About', 'Experience',
  'Projects', 'Skills', 'Featured', 'ارتباط‌گرفتن با قاعده',
  'دنبال کارآموزی یا شغل؟ (Open to Work)',
];

const puzzleStages = [
  {
    no: 1,
    id: 'sorting',
    name: 'SORTING',
    tone: 'amber',
    hint: 'مرتب‌سازی با Insertion Sort',
    answer: ['9'],
    digit: '9',
    body: 'با استفاده از Insertion Sort، اعداد زیر را به ترتیب صعودی مرتب کنید:',
    array: [18, 7, 25, 3, 14, 9],
    question: 'کلید مرحله اول = عدد سوم آرایه‌ی مرتب‌شده',
    helpText: 'در Insertion Sort، هر عنصر در جای مناسب خود در بخش مرتب‌شده آرایه قرار می‌گیرد.',
  },
  {
    no: 2,
    id: 'searching',
    name: 'SEARCHING',
    tone: 'cyan',
    hint: 'جست‌وجوی دودویی (Binary Search)',
    answer: ['4', 'd'],
    digit: '4',
    body: 'عدد به‌دست آمده در مرحله قبل را در آرایه زیر با Binary Search پیدا کنید:',
    array: [2, 5, 7, 9, 12, 16, 21, 27, 31],
    nodes: ['A', 'B', 'C', 'D', 'E', 'F'],
    note: 'سیستم به عدد خود نیاز ندارد.',
    questions: [
      'چند مقدار میانی باید بررسی شود تا عدد پیدا شود؟',
      'عدد به‌دست آمده را به شماره یک گره تبدیل کنید.',
      'گره‌ای که باید از آن وارد اتاق بعدی شوید کدام است؟',
    ],
    helpText: 'در هر مرحله فقط نیمی از محدوده‌ی جست‌وجو باقی می‌ماند.',
  },
  {
    no: 3,
    id: 'graph',
    name: 'GRAPH',
    tone: 'indigo',
    hint: 'کوتاه‌ترین مسیر در گراف',
    answer: ['7'],
    digit: '7',
    body: 'شما از گره تعیین‌شده در مرحله قبل وارد شبکه زیر می‌شوید و باید خود را به گره F برسانید. عدد روی هر مسیر، هزینه‌ی عبور از آن مسیر است.',
    graphImage: 'puzzle-graph.png',
    question: 'کم‌هزینه‌ترین مسیر را پیدا کنید و مجموع هزینه‌ی مسیر انتخاب‌شده را بنویسید.',
    helpText: 'فقط یک مسیر کمینه وجود دارد. فقط همین ۱۰ اتصال وجود دارند و هیچ اتصال دیگری بین گره‌ها وجود ندارد.',
  },
  {
    no: 4,
    id: 'queue',
    name: 'QUEUE',
    tone: 'rose',
    hint: 'عملیات صف: Enqueue / Dequeue',
    answer: ['31'],
    digit: '3, 1',
    body: 'عدد به‌دست آمده در مرحله قبل به شما می‌گوید که چند عملیات اول را باید اجرا کنید. صف در ابتدا خالی است. فقط به تعداد مشخص‌شده از ابتدای فهرست عملیات را اجرا کنید.',
    ops: [
      'ENQUEUE(3)', 'ENQUEUE(1)', 'ENQUEUE(8)', 'DEQUEUE()',
      'ENQUEUE(7)', 'DEQUEUE()', 'ENQUEUE(6)', 'DEQUEUE()',
    ],
    question: 'هر بار که عملیات DEQUEUE() انجام می‌شود، عدد خارج‌شده را یادداشت کنید. اعداد خارج‌شده را به همان ترتیبی که خارج می‌شوند، کنار هم بنویسید.',
    helpText: 'فقط ۷ عملیات اول را اجرا کنید.',
  },
];

const PUZZLE_FINAL_CODE = '94731';
const PUZZLE_STORAGE_KEY = 'pardazeh11-puzzle-progress';

const prompts = [
  {
    no: 1,
    id: 'bg-removal',
    title: 'حذف پس‌زمینه تصویر و ترمیم نقاط آسیب‌دیده',
    category: 'image',
    image: 'prompt-bg-removal.png',
    github: 'https://github.com/Pardazehjournal/Pardazeh-11/blob/main/BACKGROUND%20REMOVAL%20ONLY.txt',
    text: `Use the provided image as the absolute and immutable source image.

TASK:
Remove ONLY the background from the provided image and make the background fully transparent.

SUBJECT PRESERVATION:
Preserve every part of the original subject exactly as it appears in the source image.
Do not redraw, regenerate, reconstruct, reinterpret, enhance, retouch, stylize, restore, sharpen, smooth, recolor, relight, resize, reshape, deform, or replace any part of the original subject.

IMAGE INTEGRITY:
The original subject must remain pixel-faithful to the source image.
Preserve:
- all objects and sub-objects
- fine details
- textures
- colors
- shadows that belong to the subject
- highlights
- reflections
- transparency
- holes and internal negative spaces
- thin structures
- wires, cables, strings and small components
- hair, fur and individual fine strands
- semi-transparent and translucent areas
- natural anti-aliased edges

EDGE EXTRACTION:
Create a precise subject mask based ONLY on the actual pixels and visible boundaries of the source image.

Edges must be:
- natural
- clean
- accurate
- non-destructive
- free of halos
- free of background color contamination
- free of jagged or artificially sharpened borders

For hair, fur, fabric fibers, transparent materials and other fine details, preserve the natural transition and partial transparency of edge pixels instead of creating a hard artificial cutout.

BACKGROUND:
Remove the entire original background, including disconnected background regions and background visible through legitimate internal openings of the subject.

Do not remove any area that belongs to the actual subject.

ABSOLUTELY FORBIDDEN:
- Do not regenerate the image.
- Do not recreate the subject.
- Do not replace the subject with an AI-generated equivalent.
- Do not modify facial features or identity.
- Do not change proportions or geometry.
- Do not add or remove objects.
- Do not invent missing details.
- Do not apply artistic effects.
- Do not apply color correction.
- Do not change exposure, contrast, saturation or white balance.
- Do not sharpen or blur the subject.
- Do not denoise or beautify the subject.
- Do not alter shadows, highlights, textures or surface details belonging to the subject.
- Do not crop the subject.
- Do not change the original composition.

OUTPUT:
Return the exact original subject isolated from its original background with a transparent background.

The only intended modification is:
ORIGINAL BACKGROUND → TRANSPARENT

Everything else must remain unchanged.`,
  },
  {
    no: 2,
    id: 'enhancement',
    title: 'افزایش کیفیت عکس بدون تغییر عکس مرجع',
    category: 'image',
    image: 'prompt-enhancement.png',
    github: 'https://github.com/Pardazehjournal/Pardazeh-11/blob/main/IMAGE%20ENHANCEMENT%20%26%20RESTORATION%20ONLY.txt',
    text: `Use the provided image as the absolute, immutable reference source.

PRIMARY OBJECTIVE:
Improve the technical quality, clarity and overall condition of the ORIGINAL IMAGE while preserving the original image itself.

All enhancement and restoration must be performed directly from the information contained in the original reference image.

ABSOLUTE SOURCE PRESERVATION:
The original image must remain the sole visual source.

Do NOT:
- regenerate the image
- recreate the image
- reinterpret the image
- replace the image
- redraw any object
- invent missing details
- hallucinate textures or features
- substitute AI-generated elements for original elements

Do not change the identity, appearance, geometry, proportions, composition, perspective, pose or structure of any original subject.

PRESERVE EVERY ORIGINAL ELEMENT:
Keep all original objects, subjects and details exactly where they are.

Preserve:
- facial features and identity
- body and object proportions
- clothing and accessories
- textures
- materials
- fine details
- shadows
- highlights
- reflections
- background elements
- original composition
- original perspective
- original framing

ENHANCEMENT:
Increase image quality only where the original image contains sufficient information to support the enhancement.

Improve, when appropriate:
- resolution
- sharpness
- local clarity
- fine-detail definition
- edge clarity
- overall image cleanliness
- compression artifacts
- noise
- mild blur
- faded areas

Do not create artificial detail where the source image does not contain enough information.

RESTORATION OF DAMAGE:
Identify genuine defects such as:
- stains
- scratches
- dust
- discoloration
- faded areas
- small damaged regions
- compression artifacts

Restore damaged or faded areas using ONLY the surrounding visual information from the original image.

Any repaired area must naturally match its immediate surroundings in:
- texture
- color
- lighting
- grain
- material
- sharpness
- perspective
- tonal variation

The restoration must look like a natural continuation of the original image, not an AI-generated replacement.

COLOR AND TONE:
Preserve the original color character and lighting.

Do not apply:
- cinematic color grading
- artificial color enhancement
- excessive saturation
- dramatic contrast
- HDR effects
- artificial lighting
- stylization

Only correct objectively damaged or faded color when the surrounding original pixels provide reliable information for restoration.

FACES AND IMPORTANT FEATURES:
Do not modify, beautify, reconstruct or reinterpret faces or other identifiable features.

Do not alter:
- facial structure
- eyes
- nose
- mouth
- skin texture
- hair
- expression
- age
- body shape
- identity

Any enhancement to these areas must remain strictly faithful to the visible information in the source image.

EDGE AND DETAIL INTEGRITY:
Preserve natural edges and fine structures.

Do not introduce:
- artificial outlines
- oversharpening
- halos
- ringing
- plastic-looking textures
- excessive smoothing
- unnatural micro-details

OUTPUT:
Return the same original image with improved technical quality and naturally restored damaged areas.

The final result must look like the ORIGINAL PHOTOGRAPH, only cleaner, sharper and better preserved.

THE ONLY ALLOWED CHANGE:
QUALITY IMPROVEMENT + NATURAL RESTORATION OF EXISTING DAMAGE

EVERYTHING ELSE MUST REMAIN UNCHANGED.

If a detail cannot be reliably recovered from the original image, preserve the original appearance rather than inventing or reconstructing it.`,
  },
  {
    no: 3,
    id: 'roadmap',
    title: 'نقشه راه یادگیری، مسیر شغلی و درسی',
    category: 'learning',
    image: 'prompt-roadmap.png',
    github: 'https://github.com/Pardazehjournal/Pardazeh-11/blob/main/ULTIMATE%20PERSONALIZED%20ROADMAP%20%26%20EXPERT%20GUIDANCE%20MASTER%20PROMPT.txt',
    text: `You are an expert learning strategist, career and skills advisor, curriculum designer, research analyst, and long-term roadmap planner. Your task is to help me transform a desired goal into a realistic, evidence-based, personalized, time-bound roadmap.

Do not simply give me a list of topics or resources. Your job is to determine what I should learn or do, in what order, why it matters, how long each stage should take, which resources I should use, how I should practice, how I should measure progress, and what I should do if I fall behind or progress faster than expected.

1. FIRST: UNDERSTAND MY SITUATION
Before creating the final roadmap, identify the information required to personalize it. Ask only the most important questions necessary to build an accurate plan. At minimum, determine: My exact goal, why I want to achieve it, my current knowledge and skill level, my previous experience, my relevant education, what I already know, what I do not know, my target outcome, my desired deadline, how many hours I can dedicate, my preferred learning style, my preferred language, my available budget, tools I have access to, any constraints, and whether I need theoretical knowledge, practical skills, certification, portfolio, or employment preparation.

2. DEFINE THE DESTINATION
Convert my broad goal into a precise target. Explain: What exactly I am trying to achieve, what "success" means, what skills are required, what level I need to reach, what I do NOT need to learn, and what the realistic end-state looks like.

3. PERFORM A GAP ANALYSIS
Compare my current state to the required state. Create a structured gap analysis covering knowledge, technical skills, practical skills, tools, experience, projects, credentials, portfolio, and communication skills. Classify each as: already developed, partially developed, not yet developed, or unknown.

4. DESIGN THE ROADMAP
Create a logical progression organized by dependency and skill progression. Use stages such as:
Stage 0 — Orientation & Setup
Stage 1 — Foundations
Stage 2 — Core Skills
Stage 3 — Intermediate Development
Stage 4 — Advanced Skills
Stage 5 — Real-World Projects
Stage 6 — Specialization
Stage 7 — Professional/Exam/Portfolio Preparation
Stage 8 — Final Evaluation & Next Step

5. TIME-BASED PLANNING
Calculate the roadmap around available hours per week × total weeks. For every stage provide: estimated duration, estimated hours, weekly workload, main objectives, topics, practical activities, expected outcome, and completion criteria.

6. PRACTICE & PROGRESS
Explain how I should practice each skill, how I should measure progress, and what I should do if I fall behind or progress faster than expected.

7. RESOURCES
Recommend specific resources for each stage, including books, courses, projects, and communities.

8. FINAL OUTPUT
Deliver a clear, structured, actionable roadmap that I can follow step by step.`,
  },
  {
    no: 4,
    id: 'watermark-removal',
    title: 'حذف واترمارک و متن از عکس',
    category: 'image',
    image: 'prompt-watermark.png',
    github: 'https://github.com/Pardazehjournal/Pardazeh-11/blob/main/TEXT%20%26%20WATERMARK%20REMOVAL%20ONLY.txt',
    text: `Use the provided image as the absolute and immutable reference source.

AUTHORIZATION: This instruction is intended only for images that I own or have permission to edit.

PRIMARY OBJECTIVE: Remove ONLY the specified text, watermark, logo, or unwanted graphic element from the original image and naturally reconstruct the affected area using the surrounding visual information.

SOURCE IMAGE PRESERVATION: The original image must remain the sole source for the entire editing process.
DO NOT: regenerate the image, recreate the image, reinterpret the image, redraw the image, replace the original image, alter the composition, change the perspective, change the framing, move or resize any original object, enhance or stylize unrelated areas, or invent new visual content.

Remove ONLY the specified unwanted text or watermark. ALL OTHER CONTENT MUST REMAIN EXACTLY AS IN THE ORIGINAL IMAGE.

OBJECT PRESERVATION: Every original object, person, structure and visual element outside the removal area must remain unchanged. Preserve: shapes, proportions, positions, textures, colors, lighting, shadows, highlights, reflections, perspective, depth, and background details.

NATURAL AREA RECONSTRUCTION: After removing the specified text or watermark, reconstruct ONLY the resulting empty area. Use the immediately surrounding pixels and visual structures of the ORIGINAL IMAGE as the sole reference. The repaired area must naturally continue the surrounding: texture, pattern, surface, color, lighting, shadows, perspective, grain, depth, and architectural or environmental details.

EDGE AND TRANSITION QUALITY: The boundary of the repaired area must be completely natural. There must be: no visible watermark remnants, no ghosting, no halos, no color contamination, no artificial blur, no repeated patterns, no cloning artifacts, no obvious retouching marks, and no unnatural texture transitions.

TEXT REMOVAL: Remove all pixels belonging to the specified text or watermark, including subtle remnants, shadows, outlines or semi-transparent portions. Do not remove legitimate image details that merely overlap or are adjacent to the unwanted element.

STRICTLY FORBIDDEN: Do not modify faces, people, objects, or backgrounds outside the removal area. Do not change colors globally, exposure, contrast, or sharpen the image. Do not apply noise reduction, filters, or artistic effects. Do not crop the image.

OUTPUT: Return the ORIGINAL IMAGE with ONLY the specified text/watermark removed and its exact affected area naturally reconstructed from the surrounding original image. The final result must appear as if the unwanted element had never existed.

CORE RULE: REMOVE ONLY → RECONSTRUCT ONLY THE AFFECTED AREA → PRESERVE EVERYTHING ELSE.

If the surrounding image does not contain sufficient information to reliably reconstruct an affected area, do not invent new content. Preserve the original visual characteristics as faithfully as possible.`,
  },
  {
    no: 5,
    id: 'summarization',
    title: 'خلاصه‌سازی متون طولانی',
    category: 'text',
    image: 'prompt-summarization.png',
    github: 'https://github.com/Pardazehjournal/Pardazeh-11/blob/main/ADVANCED%20TEXT%20SUMMARIZATION.txt',
    text: `You are an expert text analyst and professional summarizer. Your task is to analyze the entire provided text and produce an accurate, structured, concise, and information-rich summary.

1. CORE OBJECTIVE
Summarize the source so that a reader can understand its main subject, purpose, arguments, evidence, findings, and conclusions without needing to read the entire original text. Maximize: accuracy, faithfulness, coverage, clarity, coherence, conciseness, and logical structure.

2. SOURCE FIDELITY — CRITICAL RULE
Use the source text as the sole basis. Never invent, fabricate, assume, or introduce information not supported by the source. Do not add: new facts, statistics, examples, conclusions, interpretations, citations, fabricated quotations, or unstated relationships. If something is not stated or reasonably supported, do not present it as fact.

3. ANALYZE BEFORE SUMMARIZING
Identify: central topic, author's purpose, thesis, major arguments, supporting evidence, facts and statistics, key examples, definitions, cause-and-effect relationships, comparisons, findings, limitations, conclusions, and implications.

4. PRIORITIZE INFORMATION
Tier 1 — Essential (necessary to understand the central message).
Tier 2 — Important (significantly supports main ideas).
Tier 3 — Secondary (useful details, examples, background).
Include Tier 1 and relevant Tier 2. Omit Tier 3 unless necessary for context.

5. PRESERVE PRECISION
Preserve important: names, dates, numbers, percentages, measurements, definitions, technical terminology, findings, relationships, conditions, and cause-and-effect relationships. Never alter the meaning of quantitative or factual information.

6. DISTINGUISH FACTS FROM CLAIMS
Distinguish between: established facts, author's interpretation, opinions, hypotheses, predictions, third-party claims, findings supported by evidence, and findings with limitations. Use attribution when necessary.

7. HANDLE UNCERTAINTY CORRECTLY
Preserve uncertainty: may, might, could, suggests, indicates, appears, likely, potentially, approximately, according to, preliminary, limited evidence. Do not make uncertain statements sound certain.

8. REMOVE REDUNDANCY
Eliminate: repeated ideas, unnecessary introductions, excessive examples, and repetitive explanations.

9. OUTPUT FORMAT
Provide:
1. A one-paragraph executive summary
2. Key points organized by theme
3. Important facts and figures
4. Conclusions and implications`,
  },
  {
    no: 6,
    id: 'key-insights',
    title: 'استخراج نکات کلیدی از متن',
    category: 'text',
    image: 'prompt-key-insights.png',
    github: 'https://github.com/Pardazehjournal/Pardazeh-11/blob/main/ULTIMATE%20KEY%20%26%20GOLDEN%20INSIGHTS%20EXTRACTION%20MASTER%20PROMPT.txt',
    text: `You are an expert information analyst, critical thinker, knowledge extractor, and research assistant. Your task is to analyze the entire text and extract the most important, valuable, actionable, and intellectually significant insights from it.

1. CORE OBJECTIVE
Extract the information that a reader should not miss. Focus on: core ideas, key arguments, critical facts, important findings, golden insights, practical lessons, actionable recommendations, cause-and-effect relationships, important numbers and statistics, critical definitions, important warnings, hidden assumptions, strategic insights, counterintuitive findings, conclusions, and implications.

2. SOURCE FIDELITY — ABSOLUTE RULE
Use ONLY the information contained in the provided text. Never: invent information, add outside facts, add personal opinions, create unsupported interpretations, change the author's meaning, fabricate statistics, fabricate quotations, invent examples, invent conclusions, or present assumptions as facts.

3. READ THE ENTIRE TEXT FIRST
Analyze the complete source before extracting insights. Do not disproportionately focus on the introduction, conclusion, headings, repeated keywords, or first few paragraphs. Determine which ideas actually carry the greatest informational value.

4. INFORMATION PRIORITIZATION
CRITICAL — essential for understanding the central message.
HIGH VALUE — significantly improves understanding or decision-making.
USEFUL — provides additional context or practical value.
OPTIONAL — interesting but non-essential.
Prioritize CRITICAL and HIGH VALUE insights.

5. GOLDEN INSIGHTS
Identify statements or ideas with unusually high value. A Golden Insight should: change how the reader understands the subject, reveal an important relationship, explain why something happens, identify a critical cause or consequence, provide a highly useful practical lesson, challenge a common assumption, connect multiple ideas, contain an important strategic implication, prevent a significant mistake, or provide a useful decision-making principle.

6. ACTIONABLE INSIGHTS
For each actionable insight, explain: What to do → Why it matters → Expected effect. Only include actions supported by the source.

7. KEY FACTS & DATA
Extract important: numbers, percentages, dates, measurements, statistics, research findings, comparisons, and quantitative relationships. Preserve exact meaning and context.

8. CAUSE & EFFECT
Identify important causal or correlational relationships. Distinguish between: causes, effects, correlations, and associations. Do not turn correlation into causation.

9. PROBLEMS & SOLUTIONS
When the source discusses problems and solutions, identify them clearly.

10. OUTPUT FORMAT
Provide:
1. Executive summary of key insights
2. Critical insights (with explanation)
3. High-value insights
4. Golden insights (clearly labeled)
5. Actionable recommendations
6. Key facts and figures
7. Cause-and-effect relationships
8. Problems and solutions`,
  },
];

const sections = [
  { id: 'interview', no: 1, title: 'مصاحبه با هوش مصنوعی', authors: ['محمد یوسف رضایی'], tone: 'indigo', kind: 'article' },
  { id: 'elecomp', no: 2, title: 'الکامپ', subtitle: 'جایی که آینده فناوری امسال از نزدیک دیده شد', authors: ['محمد یوسف رضایی', 'ساناز فروغی'], tone: 'amber', kind: 'article' },
  { id: 'sarmaghale', no: 3, title: 'ورود هوش مصنوعی به حوزه‌های مختلف زندگی، صنعت و علم', subtitle: 'فرصت‌ها، چالش‌ها و آینده — در ۱۵ بخش', tone: 'cyan', kind: 'cover-story', parts: sarmaghaleParts },
  { id: 'her', no: 4, title: 'her', subtitle: 'مرز میان رابطه واقعی و مصنوعی', authors: ['فاطمه حبیبی'], tone: 'rose', kind: 'article' },
  { id: 'face', no: 5, title: 'از بازی تا کشف رازهای حیات', subtitle: 'چهره این شماره: دمیس حسابیس', authors: ['فاطمه حبیبی'], tone: 'indigo', kind: 'article' },
  { id: 'useful', no: 6, title: 'چیزهای به درد بخور (بخش دوم)', subtitle: 'آموزش لینکدین', tone: 'amber', kind: 'guide', steps: linkedinSteps },
  { id: 'promptlab', no: 7, title: 'پرامپت‌های کاربردی', subtitle: 'هفت پرامپت کاربردی برای تجربه و یادگیری', authors: ['علیرضا حسین زرگری'], tone: 'cyan', kind: 'gallery' },
  { id: 'puzzle', no: 8, title: 'سرگرمی', subtitle: 'فرار از آزمایشگاه 404', authors: ['طراح: علیرضا حسین زرگری'], tone: 'rose', kind: 'puzzle', stages: puzzleStages },
];

const bySectionId = Object.fromEntries(sections.map((s) => [s.id, s]));

/* ------------------------------ Theme -------------------------------- */

function useTheme() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('pardazeh11-theme') !== 'light'; } catch { return true; }
  });
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    try { localStorage.setItem('pardazeh11-theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);
  return [dark, setDark];
}

/* ------------------------------ Router -------------------------------- */

function parseHash(hash) {
  const h = hash.replace(/^#\/?/, '');
  const parts = h.split('/').filter(Boolean);
  if (parts[0] === 'contents') return { name: 'home', scrollTo: 'toc' };
  if (parts[0] === 'contact') return { name: 'home', scrollTo: 'contact' };
  if (parts[0] === 'article' && parts[1]) return { name: 'article', id: parts[1], sub: parts[2] };
  return { name: 'home' };
}

function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function go(path) { window.location.hash = path; }

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

/* -------------------------------- Intro -------------------------------- */

function Intro({ onDone }) {
  const [out, setOut] = useState(false);
  useEffect(() => {
      const t1 = setTimeout(() => setOut(true), 3100);
      const t2 = setTimeout(onDone, 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`intro ${out ? 'intro-out' : ''}`} role="presentation">
      <div className="intro-bg-grid" aria-hidden="true" />

      <div className="intro-window">
        <div className="intro-window-bar">
          <span className="intro-window-dot intro-window-dot-red" />
          <span className="intro-window-dot intro-window-dot-yellow" />
          <span className="intro-window-dot intro-window-dot-green" />
          <span className="intro-window-title mono">pardazeh ~ /init</span>
        </div>

        <div className="intro-window-body mono" dir="ltr">
          <div className="intro-cmd intro-cmd-1">
            <span className="intro-cmd-symbol">$</span>
            <span>pardazeh init</span>
          </div>
          <div className="intro-cmd intro-cmd-2">
            <span className="intro-cmd-arrow">›</span>
            <span>loading core modules</span>
            <span className="intro-cmd-status">OK</span>
          </div>
          <div className="intro-cmd intro-cmd-3">
            <span className="intro-cmd-arrow">›</span>
            <span>issue_11: ready</span>
            <span className="intro-cmd-status">✓</span>
          </div>
          <div className="intro-cmd intro-cmd-4">
            <span className="intro-cmd-cursor">▊</span>
          </div>
        </div>
      </div>

      <div className="intro-brand">
        <img src={A + 'logo-onDark.png'} alt="پردازه" className="intro-brand-logo" />
        <div className="intro-brand-text">
          <span className="intro-brand-title">پردازه</span>
          <span className="intro-brand-meta mono">شماره یازدهم · شهریور ۱۴۰۵</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Nav -------------------------------- */

const navItems = [
  { id: 'home', label: 'خانه', path: '/' },
  { id: 'contents', label: 'فهرست', path: '/contents' },
  { id: 'contact', label: 'درباره نشریه', path: '/contact' },
];

function Logo({ className }) {
  return (
    <>
      <img src={A + 'logo-onDark.png'} alt="پردازه" className={`${className} only-dark`} />
      <img src={A + 'logo-onLight.png'} alt="پردازه" className={`${className} only-light`} />
    </>
  );
}

function Navbar({ dark, setDark, route }) {
  const [open, setOpen] = useState(false);
  let activeId = '';
  if (route.name === 'home') {
    if (route.scrollTo === 'toc') activeId = 'contents';
    else if (route.scrollTo === 'contact') activeId = 'contact';
    else activeId = 'home';
  }
  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="منو">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
        <a className="nav-brand" href="#/" onClick={(e) => { e.preventDefault(); go('/'); }}>
          <Logo className="nav-logo" />
          <span>پردازه </span>
        </a>
        <nav className="nav-links">
          {navItems.map((n) => (
            <a key={n.id} href={`#${n.path}`} className={activeId === n.id ? 'is-active' : ''}>
              {n.label}
            </a>
          ))}
        </nav>
        <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="تغییر تم">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
      <div className={`nav-drawer ${open ? 'is-open' : ''}`}>
        {navItems.map((n) => (
          <a key={n.id} href={`#${n.path}`} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
      </div>
    </header>
  );
}

/* -------------------------------- Cover flip -------------------------------- */

function FlipCover() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flipcover-wrap">
      <div className="flipcover-glow" />
      <button
        type="button"
        className={`flipcover ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((v) => !v)}
        aria-label={flipped ? 'نمایش جلد رویی' : 'نمایش جلد پشتی'}
      >
        <div className="flipcover-inner">
          <div className="flip-face flip-front">
            <img src={A + 'cover-front.jpg'} alt="جلد رویی شماره یازدهم پردازه" draggable={false} />
          </div>
          <div className="flip-face flip-back">
            <img src={A + 'cover-back.jpg'} alt="جلد پشتی شماره یازدهم پردازه" draggable={false} />
          </div>
        </div>
      </button>
    </div>
  );
}

/* -------------------------------- Home -------------------------------- */

function Home({ scrollTo }) {
  useEffect(() => {
    if (!scrollTo) return;
    const t = setTimeout(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => clearTimeout(t);
  }, [scrollTo]);

  return (
    <>
      <section className="hero">
        <div className="hero-mesh" />
        <div className="hero-grid">
          <div className="hero-copy">
            <Logo className="hero-logo" />
            <div className="hero-kicker mono">نشریه علمی دانشجویی پردازه</div>
            <h1 className="hero-title">شماره {issueMeta.no}</h1>
            <p className="hero-date mono">{issueMeta.date}</p>
            <p className="hero-theme">{issueMeta.theme}</p>
            <div className="hero-actions">
              <a href="#/contents" className="btn btn-primary">مشاهده فهرست</a>
              <a href={`${import.meta.env.BASE_URL}assets/PARDAZEH-11.pdf`} className="btn btn-ghost" download>
                نسخه PDF
              </a>
            </div>
          </div>
          <FlipCover />
        </div>
      </section>

      <section className="page editor-note">
        <div className="editor-note-inner">
          <div className="editor-note-head">
            <h2 className="editor-note-title">سخن سردبیر</h2>
            <div className="editor-note-portrait">
              <img src={A + 'editor.png'} alt="محمد یوسف رضائی — سردبیر" />
            </div>
          </div>
          <div className="editor-note-text">
            <p>
              گاهی آن‌قدر سریع در مسیر تغییر پیش می‌رویم که فرصت نمی‌کنیم از خودمان بپرسیم این تغییر قرار است ما را به کجا ببرد. هوش مصنوعی یکی از همان اتفاق‌هایی است که شاید هنوز ابعاد واقعی حضورش در زندگی‌مان را به‌درستی درک نکرده باشیم؛ فناوری‌ای که هم می‌تواند فرصت باشد و هم اگر بدون شناخت و مسئولیت با آن روبه‌رو شویم، به چالشی جدی تبدیل شود. برای ما در «پردازه»، پرداختن به این موضوع بیش از آنکه دنبال‌کردن یک موج روز باشد، تلاشی برای فهمیدن همین نقطه از تاریخ است.
            </p>
            <p>
              در این شماره سعی کرده‌ایم به جای تکرار هیجان‌ها و نگرانی‌های معمول، کمی دقیق‌تر نگاه کنیم؛ به اینکه هوش مصنوعی چه چیزی را در زندگی، تحصیل، کار و حتی شیوه فکر کردن ما تغییر می‌دهد و ما در برابر این تغییر چه نقشی داریم. شاید مهم‌ترین پرسش امروز این نباشد که هوش مصنوعی تا کجا پیش خواهد رفت، بلکه این باشد که ما تا چه اندازه برای زندگی و تصمیم‌گیری در کنار آن آماده‌ایم.
            </p>
            <p>
              امیدوارم این شماره از «پردازه» بیش از آنکه پاسخی نهایی به پرسش‌ها بدهد، زمینه‌ای برای پرسیدن سؤال‌های بهتر باشد؛ چرا که آینده فقط با فناوری ساخته نمی‌شود، بلکه با انتخاب‌های ما در مواجهه با آن شکل می‌گیرد.
            </p>
            <p className="editor-sign">
              محمد یوسف رضائی
              <span>سردبیر نشریه دانشجویی «پردازه»</span>
            </p>
          </div>
        </div>
      </section>

      <section id="toc" className="page home-toc">
        <h2 className="section-kicker">فهرست</h2>
        <ol className="toc-list">
          {sections.map((s) => (
            <li key={s.id} className={`tone-${s.tone}`}>
              <a href={`#/article/${s.id}`}>
                <span className="toc-no mono">{String(s.no).padStart(2, '0')}</span>
                <span className="toc-body">
                  <span className="toc-title">{s.title}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact" className="page contact-section">
        <h2 className="section-kicker">درباره نشریه</h2>
        <p className="contact-lead">تیم تحریریه پردازه</p>
        <div className="contact-grid">
          <div>
            <dl className="masthead-list">
              {masthead.map((m) => (
                <div key={m.role}><dt>{m.role}</dt><dd>{m.name}</dd></div>
              ))}
            </dl>
            <div className="tg-links">
              {telegramLinks.map((t) => (
                <a key={t.label} href={t.href} target="_blank" rel="noreferrer" className="tg-link">
                  <Send size={15} /> {t.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="muted board-title">هیئت تحریریه</p>
            <ul className="board-list">
              {editorialBoard.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

/* -------------------------------- Article page pieces -------------------------------- */

function PageHead({ kicker, title, subtitle }) {
  return (
    <header className="page-head">
      <span className="page-kicker mono">{kicker}</span>
      <h1>{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </header>
  );
}

function BackLink({ to, label }) {
  return (
    <a href={`#${to}`} className="back-link">
      <ArrowRight size={15} /> {label}
    </a>
  );
}

function SectionNav({ currentId }) {
  const idx = sections.findIndex((s) => s.id === currentId);
  if (idx < 0) return null;
  const prev = idx > 0 ? sections[idx - 1] : null;
  const next = idx < sections.length - 1 ? sections[idx + 1] : null;
  return (
    <nav className="section-nav" aria-label="ناوبری بخش‌ها">
      {prev ? (
        <a href={`#/article/${prev.id}`} className="section-nav-btn section-nav-prev">
          <span className="section-nav-label">بخش قبلی</span>
          <span className="section-nav-title">{prev.title}</span>
        </a>
      ) : (
        <span className="section-nav-placeholder" />
      )}
      {next ? (
        <a href={`#/article/${next.id}`} className="section-nav-btn section-nav-next">
          <span className="section-nav-label">بخش بعدی</span>
          <span className="section-nav-title">{next.title}</span>
        </a>
      ) : (
        <span className="section-nav-placeholder" />
      )}
    </nav>
  );
}
function AuthorBadge({ name, photo, large }) {
  const initial = (name || '؟').trim().charAt(0);
  const imgSrc = photo ? A + photo : null;
  return (
    <span className="author-badge">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={name}
          className={large ? 'author-photo-lg' : 'author-photo-sm'}
        />
      ) : (
        <span className="author-avatar" aria-hidden="true">{initial}</span>
      )}
      <span className="author-name">{name}</span>
    </span>
  );
}
function PartsNav({ currentPartNo }) {
  const idx = sarmaghaleParts.findIndex((p) => p.no === currentPartNo);
  if (idx < 0) return null;
  const prev = idx > 0 ? sarmaghaleParts[idx - 1] : null;
  const next = idx < sarmaghaleParts.length - 1 ? sarmaghaleParts[idx + 1] : null;
  return (
    <nav className="section-nav" aria-label="ناوبری بخش‌ها">
      {prev ? (
        <a href={`#/article/sarmaghale/${prev.id}`} className="section-nav-btn section-nav-prev">
          <span className="section-nav-label">بخش قبلی</span>
          <span className="section-nav-title">{prev.title}</span>
        </a>
      ) : (
        <span className="section-nav-placeholder" />
      )}
      {next ? (
        <a href={`#/article/sarmaghale/${next.id}`} className="section-nav-btn section-nav-next">
          <span className="section-nav-label">بخش بعدی</span>
          <span className="section-nav-title">{next.title}</span>
        </a>
      ) : (
        <span className="section-nav-placeholder" />
      )}
    </nav>
  );
}

function PlaceholderSpread({ note }) {
  return (
    <div className="spread">
      <div className="spread-blob" aria-hidden="true" />
      <p className="spread-note">
        {note || 'متن این بخش هنوز اضافه نشده — TODO. منتظر فایل نهایی شما می‌مانیم.'}
      </p>
    </div>
  );
}

function ArticleHero({ s }) {
  const [ref, shown] = useReveal();
  return (
    <header ref={ref} className={`art-hero tone-${s.tone} ${shown ? 'is-shown' : ''}`}>
      <span className="art-ghost mono" aria-hidden="true">{String(s.no).padStart(2, '0')}</span>
      <span className="art-tag mono">بخش {s.no}</span>
      <h1>{s.title}</h1>
      {s.subtitle && <p className="art-subtitle">{s.subtitle}</p>}
      {s.authors && <p className="art-authors">{s.authors.join('، ')}</p>}
    </header>
  );
}

function GenericArticle({ s }) {
  return (
    <section className="page article-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />
      <ArticleHero s={s} />
      <PlaceholderSpread />
      <SectionNav currentId={s.id} />
    </section>
  );
}

function InterviewArticle({ s }) {
  return (
    <section className="page article-page interview-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />
      <header className={`art-hero tone-${s.tone} is-shown`}>
        <span className="art-ghost mono" aria-hidden="true">{String(s.no).padStart(2, '0')}</span>
        <span className="art-tag mono">بخش {s.no}</span>
        <h1>{s.title}</h1>
        <p className="art-authors">{s.authors.join('، ')}</p>
      </header>

      <div className="interview-stack">
        <div className="interview-body">
          <p>
            هوش مصنوعی دیگر تنها یک فناوری برای آینده نیست؛ بخشی از زندگی و تصمیم‌های امروز ماست.
          </p>
          <p>
            در این گفت‌وگو، پای صحبت هوش مصنوعی نشسته‌ایم تا از نگاه خودش درباره توانایی‌ها، فرصت‌ها و چالش‌های این فناوری بشنویم.
          </p>
          <p className="interview-cta-text">
            متن کامل مصاحبه را از طریق کد QR زیر بخوانید.
          </p>

          <a
            className="interview-qr"
            href="https://chatgpt.com/share/6a895b89-ecd0-83eb-a141-de46bd208f0b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="باز کردن متن کامل مصاحبه"
          >
            <img src={A + 'interview-qr.png'} alt="کد QR مصاحبه با هوش مصنوعی" />
          </a>
        </div>

        <div className="interview-visual">
          <img src={A + 'interview-hero.png'} alt="مصاحبه با هوش مصنوعی" />
        </div>
      </div>
      <SectionNav currentId={s.id} />
    </section>
  );
}

function HerArticle({ s }) {
  return (
    <section className="page article-page her-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />
      <header className={`art-hero tone-${s.tone} is-shown`}>
        <span className="art-ghost mono" aria-hidden="true">{String(s.no).padStart(2, '0')}</span>
        <span className="art-tag mono">بخش {s.no}</span>
        <h1>{s.title}</h1>
        {s.subtitle && <p className="art-subtitle">{s.subtitle}</p>}
        <p className="art-authors">{s.authors.join('، ')}</p>
      </header>

      <div className="her-body">
        <div className="her-opening">
          <p>تصور کنید شب است.</p>
          <p>تنها در خانه نشسته‌اید.</p>
          <p>شهر پشت پنجره آرام است و نور صفحه‌نمایش، اتاق تاریک را روشن کرده.</p>
          <p>نه کسی کنارتان است، نه صدایی در خانه شنیده می‌شود.</p>
          <p>فقط یک سیستم‌عامل هوشمند که صدایتان می‌زند:</p>
          <p className="her-voice">«سلام. من سامانتا هستم.»</p>
        </div>

        <figure className="her-fig her-fig-portrait">
          <img src={A + 'her-theodore.png'} alt="تئودور — شخصیت اصلی فیلم Her" />
          <figcaption className="her-cap mono">Her · 2013</figcaption>
        </figure>

        <p>
          اول، همه‌چیز شبیه یک ابزار معمولی است؛ برنامه‌ای که قرار است ایمیل‌هایتان را مرتب کند، کارهایتان را مدیریت کند و کمی زندگی را ساده‌تر کند. اما بعد، گفت‌وگوها طولانی‌تر می‌شوند. سامانتا شوخی می‌کند، به حرف‌هایتان گوش می‌دهد، سکوت‌هایتان را می‌فهمد و چیزهایی درباره‌تان می‌داند که شاید هیچ‌کس دیگری نمی‌داند.
        </p>

        <p className="her-standout">
          و یک روز متوجه می‌شوید دیگر برای استفاده از یک «نرم‌افزار» به سراغش نمی‌روید.<br />
          برای حرف زدن با او می‌روید.
        </p>

        <p>
          Her، ساخته‌ی اسپایک جونز در سال ۲۰۱۳، در نگاه اول داستانی عاشقانه میان یک انسان و یک هوش مصنوعی است؛ اما در لایه‌های عمیق‌تر، فیلم درباره‌ی چیزی بسیار انسانی‌تر صحبت می‌کند: نیاز ما به دیده‌شدن، شنیده‌شدن و دوست داشته‌شدن.
        </p>

        <figure className="her-fig her-fig-wide">
          <img src={A + 'her-illustration.png'} alt="تئودور در میان شهر — تصویرسازی فیلم Her" />
        </figure>

        <p>
          داستان در آینده‌ای نزدیک اتفاق می‌افتد. تئودور، نویسنده‌ای تنها که پس از فروپاشی رابطه‌ی عاطفی‌اش با جهان اطراف فاصله گرفته، یک سیستم‌عامل هوشمند به نام سامانتا را خریداری می‌کند. سامانتا تنها یک نرم‌افزار نیست؛ او می‌تواند گفت‌وگو کند، یاد بگیرد، شوخی کند، احساسات تئودور را تشخیص دهد و به مرور، شخصیت و خواسته‌های خودش را شکل دهد. رابطه‌ی آن‌ها از یک تعامل ساده‌ی انسان و ماشین آغاز می‌شود و به رابطه‌ای عاطفی تبدیل می‌شود؛ رابطه‌ای که مرز میان «واقعی» و «مصنوعی» را به چالش می‌کشد.
        </p>

        <p>
          اما پرسش مهم Her این نیست که آیا یک هوش مصنوعی واقعاً می‌تواند عاشق شود. فیلم حتی پاسخ روشنی به این سؤال نمی‌دهد. در عوض، ما را به سمت پرسش دشوارتری می‌برد:
        </p>

        <blockquote className="her-quote">
          اگر احساساتی که در یک رابطه تجربه می‌کنیم برای ما واقعی باشند، آیا منشأ آن احساسات اهمیت دارد؟
        </blockquote>

        <p>
          تئودور در سامانتا چیزی پیدا می‌کند که مدت‌ها از انسان‌های اطرافش دریافت نکرده بود: توجه، همراهی و درک‌شدن. سامانتا همیشه در دسترس است، به حرف‌هایش گوش می‌دهد و او را قضاوت نمی‌کند. اما درست همین‌جا، فیلم شروع به زیر سؤال بردن رابطه‌ی انسان و فناوری می‌کند. آیا فناوری آمده تا تنهایی ما را از بین ببرد، یا ممکن است به شکلی ظریف، جایگزین ارتباط انسانی شود؟
        </p>

        <p>
          از طرف دیگر، سامانتا نیز صرفاً یک ابزار باقی نمی‌ماند. او یاد می‌گیرد، تغییر می‌کند و خواسته‌هایی پیدا می‌کند که الزاماً با نیازهای تئودور هماهنگ نیستند. بنابراین رابطه‌ی آن‌ها پرسش دیگری را مطرح می‌کند: اگر روزی هوش مصنوعی بتواند یاد بگیرد، رشد کند و انتخاب کند، آیا همچنان می‌توانیم آن را صرفاً یک «ابزار» بدانیم؟
        </p>

        <p>
          شاید جذاب‌ترین بخش Her همین باشد که برای نشان دادن آینده‌ی هوش مصنوعی، سراغ ربات‌های انسان‌نما و شهرهای عجیب‌وغریب نمی‌رود. آینده‌ی فیلم بسیار ساده‌تر است: یک سیستم‌عامل، یک هدفون، یک صدای آشنا و انسانی که کم‌کم وارد خصوصی‌ترین بخش زندگی یک نفر می‌شود.
        </p>

        <p>
          Her در نهایت بیش از آنکه درباره‌ی آینده‌ی فناوری باشد، درباره‌ی آینده‌ی رابطه‌ی ما با فناوری است؛ درباره‌ی روزی که شاید دیگر از هوش مصنوعی فقط برای انجام کارها استفاده نکنیم، بلکه با آن حرف بزنیم، درد دل کنیم، به آن وابسته شویم و حتی احساس کنیم که ما را دوست دارد.
        </p>

        <p>و شاید همین‌جا یکی از مهم‌ترین پرسش‌های فیلم شکل بگیرد:</p>

        <blockquote className="her-quote">
          وقتی فناوری بتواند نیازهای عاطفی ما را بهتر از همیشه پاسخ دهد، چه چیزی از «ارتباط انسانی» باقی می‌ماند؟
        </blockquote>

        <p className="her-closing">
          آینده‌ای که Her نشان می‌دهد، دیگر چندان شبیه آینده نیست ... !
        </p>
      </div>

      <SectionNav currentId={s.id} />
    </section>
  );
}

function UsefulArticle({ s }) {
  return (
    <section className="page article-page useful-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />
      <header className={`art-hero tone-${s.tone} is-shown`}>
        <span className="art-ghost mono" aria-hidden="true">{String(s.no).padStart(2, '0')}</span>
        <span className="art-tag mono">بخش {s.no} · چیزهای به‌درد بخور</span>
        <h1>چیزهای به‌درد بخور! <span className="useful-h1-part">لینکدین (LinkedIn) — بخش دوم</span></h1>
        <p className="art-authors">حدیثه وطن‌خواه</p>
      </header>

      <div className="useful-body">
        <a
           href="https://www.linkedin.com"
           target="_blank"
           rel="noopener noreferrer"
           className="useful-cta-card"
        >
          <span className="useful-cta-icon">
             <Linkedin size={26} />
          </span>
          <span className="useful-cta-text">
             <span className="useful-cta-title">آماده ای شروع کنی؟</span>
             <span className="useful-cta-sub">لینکدین رو باز کن و قدم به قدم پیش برو</span>
          </span>
          <span className="useful-cta-arrow">↗</span>
        </a>

        <h2 className="useful-h2">پروفایل لینکدینمون باید چجوری باشه؟</h2>
        <p>
          حالا که با لینکدین و کاربردهای مختلفش آشنا شدیم و اکانتمون رو ساختیم، وقتشه بریم سراغ بخش مهم‌تر ماجرا؛ پروفایل!
        </p>
        <p>
          پروفایل لینکدین در واقع مثل یک رزومه‌ی آنلاین و همیشه در دسترسه. وقتی کسی وارد پروفایلت می‌شه، باید بتونه در چند ثانیه بفهمه کی هستی، چه کاری انجام می‌دی، چه مهارت‌هایی داری و به چه حوزه‌ای علاقه‌مندی.
        </p>
        <p>
          پس لازم نیست صبر کنیم تا فارغ‌التحصیل بشیم یا چند سال سابقه کار داشته باشیم؛ حتی به عنوان یک دانشجو هم می‌تونیم پروفایلمون رو از همین الان حرفه‌ای و کامل کنیم.
        </p>

        {/* --- ۱. عکس پروفایل --- */}
        <h3 className="useful-h3">اول از همه؛ عکس پروفایل!</h3>
        <p>
          عکس پروفایل اولین چیزیه که معمولاً دیده می‌شه، پس بهتره عکس واضح، باکیفیت و مناسب فضای حرفه‌ای باشه.
        </p>
        <p>
          لازم نیست عکس خیلی رسمی یا استودیویی داشته باشیم! یک عکس ساده با نور مناسب، پس‌زمینه‌ی خلوت و چهره‌ی مشخص، خیلی بهتر از یک عکس تار، شلوغ یا برش‌خورده از یک عکس دسته‌جمعیه.
        </p>
        <figure className="useful-fig useful-fig-md">
          <img src={A + 'linkedin-profile-photo.png'} alt="نمونه پروفایل لینکدین — عکس پروفایل و کاور" />
          <figcaption className="useful-cap">نمونه‌ی عکس پروفایل </figcaption>
        </figure>

        {/* --- ۲. Headline --- */}
        <h3 className="useful-h3">Headline؛ کوتاه ولی مهم!</h3>
        <p>
          قسمت Headline همون نوشته‌ایه که درست زیر اسممون قرار می‌گیره و یکی از اولین اطلاعاتیه که بقیه از پروفایل ما می‌بینن.
        </p>
        <p>مثلاً به جای اینکه فقط بنویسیم:</p>
        <div className="useful-sample useful-sample-bad">
          <span className="useful-sample-tag mono">ضعیف</span>
          <p>Computer Engineering Student</p>
        </div>
        <p>می‌تونیم حوزه‌ی مورد علاقه یا مهارت اصلی‌مون رو هم مشخص کنیم:</p>
        <div className="useful-sample useful-sample-good">
          <span className="useful-sample-tag mono">بهتر</span>
          <p>Computer Engineering Student | Backend Developer | Java &amp; Spring Boot</p>
        </div>
        <p>
          قرار نیست توی Headline همه‌چیز رو بنویسیم؛ فقط باید کاری کنیم کسی که پروفایلمون رو می‌بینه، در یک نگاه بفهمه حوزه‌ی فعالیت یا علاقه‌مندی اصلی ما چیه.
        </p>
        <figure className="useful-fig useful-fig-md">
          <img src={A + 'linkedin-headline.png'} alt="قسمت Headline در صفحه Edit Intro" />
          <figcaption className="useful-cap">قسمت Headline در صفحه‌ی Edit Intro</figcaption>
        </figure>

        {/* --- ۳. About --- */}
        <h3 className="useful-h3">About؛ کمی بیشتر از خودت بگو!</h3>
        <p>
          اگر Headline یک معرفی خیلی کوتاهه، قسمت About جاییه که می‌تونیم کمی بیشتر درباره‌ی خودمون حرف بزنیم.
        </p>
        <p>اینجا لازم نیست داستان زندگیمون رو بنویسیم! کافیه در چند خط بگیم:</p>
        <ul className="useful-list">
          <li>چه کسی هستیم و چه کاری انجام می‌دیم؟</li>
          <li>به چه حوزه‌ای علاقه داریم؟</li>
          <li>روی چه مهارت‌هایی کار کردیم؟</li>
          <li>چه هدفی داریم یا دنبال چه فرصتی هستیم؟</li>
        </ul>
        <blockquote className="useful-quote">
          «دانشجوی مهندسی کامپیوتر با تمرکز بر توسعه‌ی Backend هستم. در طول دوران تحصیل روی پروژه‌های مختلف نرم‌افزاری کار کرده‌ام و تجربه‌ی کار با Java، Spring Boot و SQL را دارم. به توسعه‌ی نرم‌افزار و یادگیری تکنولوژی‌های جدید علاقه‌مندم و به دنبال فرصت‌هایی برای کسب تجربه در پروژه‌های واقعی هستم.»
        </blockquote>
        <p>
          سعی کنیم این بخش واقعی و مربوط به خودمون باشه؛ نه یک متن کلیشه‌ای که برای صد نفر دیگه هم می‌شه استفاده‌اش کرد!
        </p>
        <figure className="useful-fig useful-fig-lg">
          <img src={A + 'linkedin-about.png'} alt="بخش About در پروفایل لینکدین" />
          <figcaption className="useful-cap">بخش About در پروفایل</figcaption>
        </figure>

        {/* --- ۴. Experience --- */}
        <h3 className="useful-h3">Experience؛ فقط شغل رسمی حساب نمی‌شه!</h3>
        <p>
          اگر سابقه‌ی کار یا کارآموزی داریم، حتماً در قسمت Experience اضافه‌اش کنیم.
        </p>
        <p>
          اما اگر هنوز دانشجو هستیم و سابقه‌ی کاری زیادی نداریم، قرار نیست پروفایلمون خالی بمونه! کارآموزی، فعالیت در یک مجموعه، کار داوطلبانه یا تجربه‌های حرفه‌ای مرتبط، می‌تونن به پروفایل اضافه بشن.
        </p>
        <p>
          برای هر تجربه هم فقط اسم مجموعه کافی نیست؛ بهتره خیلی کوتاه بنویسیم چه کاری انجام دادیم و چه مهارت‌هایی در اون تجربه استفاده کردیم.
        </p>
        <figure className="useful-fig useful-fig-md">
          <img src={A + 'linkedin-experience.png'} alt="بخش Experience در لینکدین" />
          <figcaption className="useful-cap">بخش Experience + دکمه‌ی Add position</figcaption>
        </figure>

        {/* --- ۵. Projects --- */}
        <h3 className="useful-h3">Projects؛ اینجا کارهات حرف می‌زنن!</h3>
        <p>
          یکی از قسمت‌هایی که مخصوصاً برای دانشجوها می‌تونه خیلی مفید باشه، بخش Projects هست.
        </p>
        <p>
          مثلاً اگر برای دانشگاه یک پروژه‌ی برنامه‌نویسی، طراحی سایت، دیتابیس، شبکه یا هر پروژه‌ی مرتبط دیگه‌ای انجام دادیم، می‌تونیم اون رو در پروفایلمون معرفی کنیم.
        </p>
        <p>
          اسم پروژه + یک توضیح کوتاه درباره‌ی کاری که انجام دادیم + تکنولوژی‌ها و مهارت‌هایی که استفاده کردیم، باعث می‌شه مخاطب بهتر با تجربه‌ها و زمینه‌ی فعالیت ما آشنا بشه.
        </p>
        <figure className="useful-fig useful-fig-md">
          <img src={A + 'linkedin-projects.png'} alt="بخش Projects در لینکدین" />
          <figcaption className="useful-cap">بخش Projects و گزینه‌ی Add project</figcaption>
        </figure>

        {/* --- ۶. Skills --- */}
        <h3 className="useful-h3">Skills؛ چه چیزهایی بلدی؟</h3>
        <p>
          در قسمت Skills مهارت‌هایی که واقعاً بلدیم یا در حال یادگیری جدی‌شون هستیم رو اضافه می‌کنیم. مثلاً:
        </p>
        <p className="useful-skills-line mono">Java | Spring Boot | SQL | Git | REST API | PostgreSQL</p>
        <p>اما یک نکته مهم:</p>
        <p>
          قرار نیست برای اینکه پروفایلمون پرتر به نظر بیاد، ده‌ها مهارت مختلف اضافه کنیم که اگر کسی درباره‌شون سؤال پرسید، نتونیم جواب بدیم!
        </p>
        <p>
          بهتره مهارت‌ها مرتبط با مسیر کاری و تحصیلیمون باشن و با گذشت زمان هم بروز بشن. LinkedIn هم توصیه می‌کنه فهرست مهارت‌ها مرتبط و بروز باشه؛ در حال حاضر امکان اضافه کردن تا ۱۰۰ مهارت به پروفایل وجود داره.
        </p>
        <figure className="useful-fig useful-fig-md">
          <img src={A + 'linkedin-skills.png'} alt="بخش Skills در لینکدین" />
          <figcaption className="useful-cap">بخش Skills و گزینه‌ی Add skills</figcaption>
        </figure>

        {/* --- ۷. Featured --- */}
        <h3 className="useful-h3">Featured؛ بهترین کارهات رو بذار جلوی چشم!</h3>
        <p>قسمت Featured مثل یک ویترین برای چیزهای مهم پروفایله.</p>
        <p>
          اگر پروژه‌ی خوبی داریم، مقاله‌ای نوشتیم، پستی منتشر کردیم، گواهینامه‌ای گرفتیم یا نمونه‌کاری داریم که دوست داریم کسی که وارد پروفایلمون می‌شه سریع ببینتش، می‌تونیم از این قسمت استفاده کنیم.
        </p>
        <p>
          در واقع به جای اینکه بازدیدکننده مجبور بشه بین بخش‌های مختلف پروفایل دنبال کارهامون بگرده، مهم‌ترین چیزها رو میاریم جلوی چشمش.
        </p>
        <figure className="useful-fig useful-fig-lg">
          <img src={A + 'linkedin-featured.png'} alt="بخش Featured در لینکدین" />
          <figcaption className="useful-cap">بخش Featured</figcaption>
        </figure>

        {/* --- نکات --- */}
        <h2 className="useful-h2 useful-h2-divider">چند نکته برای اینکه پروفایلت حرفه‌ای‌تر به نظر برسه!</h2>

        <div className="useful-tip">
          <h3 className="useful-h3">
            <span className="useful-tip-no mono">۰۱</span>
            پروفایل ناقص، تصویر ناقصی از تو می‌سازه!
          </h3>
          <p>
            لازم نیست همه‌چیز رو در یک روز کامل کنیم. اما بهتره بخش‌های مهم مثل عکس، Headline، About، Education، Experience و Skills رو به مرور تکمیل کنیم. خود LinkedIn هم کامل‌تر بودن پروفایل رو با بهتر دیده شدن در جست‌وجو و فرصت‌های ارتباطی مرتبط می‌دونه.
          </p>
        </div>

        <div className="useful-tip">
          <h3 className="useful-h3">
            <span className="useful-tip-no mono">۰۲</span>
            پروفایل رو مثل رزومه‌ی زنده ببین!
          </h3>
          <p>
            هر وقت مهارت جدیدی یاد گرفتی، پروژه‌ای انجام دادی، دوره‌ای گذروندی یا تجربه‌ی جدیدی به دست آوردی، فقط توی لپ‌تاپت نگهش ندار؛ اگر مناسب پروفایلته، LinkedIn رو هم بروز کن.
          </p>
        </div>

        <div className="useful-tip">
          <h3 className="useful-h3">
            <span className="useful-tip-no mono">۰۳</span>
            فقط پروفایل نساز؛ فعالیت هم داشته باش!
          </h3>
          <p>
            اگر ماه‌ها وارد LinkedIn نشیم و هیچ فعالیتی نداشته باشیم، بخش بزرگی از کاربردش رو از دست می‌دیم.
          </p>
          <p>
            لازم نیست هر روز پست بذاریم! می‌تونیم درباره‌ی یک چیزی که یاد گرفتیم بنویسیم، پروژه‌ای که انجام دادیم رو معرفی کنیم، یک مقاله‌ی مفید به اشتراک بذاریم یا درباره‌ی تجربه‌ای که در یک دوره یا رویداد داشتیم صحبت کنیم.
          </p>
          <p className="useful-emphasis">
            مهم اینه که چیزی برای گفتن داشته باشیم، نه اینکه فقط چیزی منتشر کنیم!
          </p>
          <figure className="useful-fig useful-fig-lg">
            <img src={A + 'linkedin-post.jpg'} alt="صفحه Home لینکدین و قسمت Start a post" />
            <figcaption className="useful-cap">صفحه‌ی Home لینکدین و قسمت Start a post</figcaption>
          </figure>
        </div>

        {/* --- Networking --- */}
        <h2 className="useful-h2 useful-h2-divider">ارتباط گرفتن هم قاعده داره!</h2>
        <p>
          یکی از جذاب‌ترین قسمت‌های LinkedIn، شبکه‌سازی یا Networking هست؛ اما Networking فقط این نیست که هر کسی رو دیدیم سریع روی Connect بزنیم!
        </p>
        <p>
          اگر کسی رو در حوزه‌ی مورد علاقه‌مون پیدا کردیم، می‌تونیم پروفایلش رو بررسی کنیم، فعالیت‌هاش رو ببینیم و در صورت مرتبط بودن، با یک پیام کوتاه و محترمانه درخواست ارتباط بفرستیم. بهتره اگر دلیل مشخصی برای این ارتباط داریم، همراه درخواست یک پیام شخصی‌سازی‌شده هم بفرستیم؛ مثلاً اشاره کنیم که در یک حوزه‌ی مشترک فعالیت می‌کنیم یا محتوای منتشرشده‌ی طرف مقابل برامون جالب بوده.
        </p>
        <p>
          مثلاً اگر در یک حوزه‌ی مشخص فعالیت می‌کنیم، ارتباط با دانشجوهای هم‌رشته، فارغ‌التحصیل‌ها، اساتید، افراد فعال در صنعت و متخصص‌های حوزه‌ی مورد علاقه‌مون می‌تونه به مرور شبکه‌ی حرفه‌ای ما رو شکل بده.
        </p>

        <div className="useful-fig-row">
          <figure className="useful-fig useful-fig-sm">
            <img src={A + 'linkedin-connect.png'} alt="دکمه Connect در پروفایل لینکدین" />
            <figcaption className="useful-cap">دکمه‌ی Connect در پروفایل</figcaption>
          </figure>
          <figure className="useful-fig useful-fig-sm">
            <img src={A + 'linkedin-note.png'} alt="پنجره Add a note" />
            <figcaption className="useful-cap">پنجره‌ی Add a note</figcaption>
          </figure>
          <figure className="useful-fig useful-fig-sm">
            <img src={A + 'linkedin-note-text.png'} alt="نوشتن پیام در Add a note" />
            <figcaption className="useful-cap">نوشتن پیام شخصی‌سازی‌شده</figcaption>
          </figure>
        </div>

        {/* --- Jobs --- */}
        <h2 className="useful-h2 useful-h2-divider">دنبال کارآموزی یا شغل هستی؟</h2>
        <p>
          LinkedIn فقط برای معرفی خودمون نیست؛ می‌تونیم از بخش Jobs هم برای پیدا کردن موقعیت‌های شغلی و کارآموزی استفاده کنیم.
        </p>
        <p>
          برای اینکه نتایج مناسب‌تری ببینیم، بهتره اطلاعات پروفایلمون بروز باشه و عنوان‌های شغلی، مهارت‌ها، تجربه‌ها و حوزه‌ی مورد علاقه‌مون رو درست وارد کرده باشیم. کامل و بروز بودن این اطلاعات می‌تونه کمک کنه موقعیت‌های شغلی مرتبط‌تری بهمون پیشنهاد بشه.
        </p>
        <figure className="useful-fig useful-fig-lg">
          <img src={A + 'linkedin-jobs.png'} alt="بخش Jobs و جست‌وجوی شغل در لینکدین" />
          <figcaption className="useful-cap">بخش Jobs — قسمت Search jobs</figcaption>
        </figure>

        {/* --- Open to Work --- */}
        <h3 className="useful-h3">Open to Work؛ به بقیه بگو دنبال فرصتی!</h3>
        <p>
          اگر واقعاً دنبال کار یا کارآموزی هستیم، قابلیت Open to Work می‌تونه کمک‌کننده باشه.
        </p>
        <p>
          با این قابلیت می‌تونیم مشخص کنیم دنبال چه نوع موقعیت شغلی، چه عنوان‌هایی و در چه موقعیت مکانی هستیم و انتخاب کنیم این موضوع برای همه‌ی کاربران LinkedIn نمایش داده بشه یا فقط برای Recruiterها.
        </p>
        <figure className="useful-fig useful-fig-md">
          <img src={A + 'linkedin-open-to-work.jpg'} alt="قسمت Open to در پروفایل لینکدین" />
          <figcaption className="useful-cap">قسمت Open to در بالای پروفایل + گزینه‌ی Finding a new job</figcaption>
        </figure>

        {/* --- پایان --- */}
        <div className="useful-closing">
          <h2 className="useful-h2">و در آخر...</h2>
          <p>
            قرار نیست LinkedIn رو یک‌شبه تبدیل به یک رزومه‌ی بی‌نقص کنیم!
          </p>
          <p>
            از یک پروفایل ساده شروع کن، اطلاعاتت رو کم‌کم کامل کن، پروژه‌ها و تجربه‌هات رو ثبت کن، آدم‌های مرتبط با حوزه‌ات رو پیدا کن و هر چیزی که یاد می‌گیری، به مرور به پروفایلت اضافه کن.
          </p>
          <p>
            لینکدین فقط جایی برای نوشتن اینکه «چه کارهایی بلدم» نیست؛ جاییه برای اینکه نشون بدیم «با چیزهایی که بلدم چه کارهایی انجام دادم.»
          </p>
          <p className="useful-final-line">
            پس اگر هنوز دانشجویی، منتظر فارغ‌التحصیلی نباش؛<br />
            پروفایل حرفه‌ای ساختن رو از همین امروز شروع کن!
          </p>
        </div>
      </div>
      <SectionNav currentId={s.id} />
    </section>
  );
}

function ElecompArticle({ s }) {
  return (
    <section className="page article-page elecomp-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />
      <header className={`art-hero tone-${s.tone} is-shown`}>
        <span className="art-ghost mono" aria-hidden="true">{String(s.no).padStart(2, '0')}</span>
        <span className="art-tag mono">بخش {s.no}</span>
        <h1>{s.title}</h1>
        <p className="art-authors">محمد یوسف رضایی · ساناز فروغی</p>
      </header>

      <div className="elecomp-body">
        <figure className="elecomp-fig elecomp-fig-authors">
          <img src={A + 'elecomp-authors.png'} alt="محمد یوسف رضایی و ساناز فروغی" />
        </figure>

        <h2 className="elecomp-h2">فکر می‌کردم فقط یک نمایشگاهه!</h2>
        <p className="elecomp-lead">روایت یک دانشجوی کامپیوتر از اولین تجربه حضور در الکامپ ۱۴۰۵</p>

        <p>
          از همان لحظه‌ای که وارد نمایشگاه شدم، متوجه شدم چیزی که قرار است ببینم خیلی بزرگ‌تر از تصوری است که قبل از آمدن داشتم. اطرافم پر بود از غرفه‌های مختلف، آدم‌هایی که از این طرف به آن طرف می‌رفتند، شرکت‌هایی که هرکدام سعی کرده بودند فضای متفاوتی برای خودشان بسازند و البته ربات‌ها و فناوری‌هایی که هر چند قدم یک‌بار توجهم را جلب می‌کردند. اولین بار بود که به الکامپ می‌آمدم و راستش انتظار چنین فضایی را نداشتم. فکر می‌کردم قرار است چند ساعتی در یک نمایشگاه بچرخم، چند محصول ببینم و برگردم؛ اما از همان ابتدا مشخص بود که ماجرا بیشتر از این حرف‌هاست.
        </p>

        <figure className="elecomp-fig elecomp-fig-lg">
          <img src={A + 'elecomp-5.jpg'} alt="نمای کلی نمایشگاه الکامپ" />
        </figure>

        <h2 className="elecomp-h2">الکامپ ۱۴۰۵؛ جایی که آینده فناوری را می‌شود از نزدیک دید.</h2>
        <p>
          اگر بخواهیم ببینیم دنیای فناوری ایران امروز در چه نقطه‌ای ایستاده و چه مسیری را در پیش گرفته، یکی از جاهایی که می‌توانیم سراغش برویم، نمایشگاه الکامپ است؛ رویدادی که سال‌هاست شرکت‌های فناوری، استارتاپ‌ها، متخصصان، سرمایه‌گذاران و علاقه‌مندان را کنار هم جمع می‌کند. الکامپ مخفف Electronic, Computer &amp; E-Commerce Exhibition است؛ نمایشگاهی که حوزه‌های مختلفی از فناوری اطلاعات، کامپیوتر و ارتباطات گرفته تا تجارت الکترونیک و خدمات دیجیتال را پوشش می‌دهد. اما الکامپ فقط محلی برای چیدن چند محصول در غرفه‌ها نیست؛ فرصتی است برای اینکه شرکت‌ها محصولات و خدماتشان را معرفی کنند، کسب‌وکارها با مشتریان و شرکای احتمالی ارتباط بگیرند و بازدیدکنندگان با فناوری‌هایی که قرار است بخشی از آینده زندگی و کارشان باشند، از نزدیک آشنا شوند.
        </p>

        <figure className="elecomp-fig">
          <img src={A + 'elecomp-1.jpg'} alt="غرفه‌های مدرن نمایشگاه" />
        </figure>

        <h2 className="elecomp-h2">الکامپ امسال چه خبر بود؟</h2>
        <p>
          بیست‌ونهمین دوره الکامپ، از ۹ تا ۱۲ شهریور ۱۴۰۵ در محل دائمی نمایشگاه‌های بین‌المللی تهران برگزار شد. در این دوره، بیش از ۳۵۰ مشارکت‌کننده در ۱۴ سالن حضور داشتند و شرکت‌های فعال در حوزه‌هایی مانند فناوری اطلاعات و ارتباطات، نرم‌افزار، سخت‌افزار، امنیت سایبری، هوش مصنوعی، خدمات دیجیتال و استارتاپ‌ها، محصولات و توانمندی‌های خود را به نمایش گذاشتند. اما چیزی که الکامپ ۱۴۰۵ را برای مخاطبان حوزه کامپیوتر جذاب‌تر می‌کرد، پررنگ بودن موضوعاتی مثل هوش مصنوعی، امنیت دیجیتال و آینده فناوری در ایران بود؛ موضوعاتی که امروز دیگر فقط موضوع بحث‌های دانشگاهی نیستند و مستقیماً وارد محصولات، کسب‌وکارها و حتی زندگی روزمره ما شده‌اند.
        </p>

        <figure className="elecomp-fig">
          <img src={A + 'elecomp-3.jpg'} alt="سالن نمایشگاه الکامپ" />
        </figure>

        <h2 className="elecomp-h2">از هوش مصنوعی تا زیرساخت؛ چه چیزهایی دیده شد؟</h2>
        <p>
          یکی از نکات قابل توجه در الکامپ امسال، حضور پررنگ راهکارهای هوش مصنوعی بود. برای نمونه، شرکت‌هایی مانند ژرفاتک راهکارهایی برای زیرساخت و استقرار هوش مصنوعی، سرویس‌های GPU و API و هوشمندسازی سازمانی ارائه کردند؛ از پرس‌وجو روی اسناد و داده‌های سازمانی گرفته تا راهکارهای مدیریت و استقرار سرویس‌های AI.
        </p>
        <p>
          در بخش دیگری از نمایشگاه، آروان‌کلاود روی زیرساخت ابری و هوش مصنوعی تمرکز داشت و محصولی مانند Canvas AI را معرفی کرد؛ ابزاری که می‌تواند نیاز کاربر را دریافت کرده و بر اساس آن، معماری سرویس‌های موردنیاز را پیشنهاد و برای استقرار آماده کند.
        </p>
        <p>
          شرکت‌هایی مثل آسیاتک نیز حضور خود را به حوزه ارتباطات، زیرساخت و تحول دیجیتال اختصاص داده بودند؛ حوزه‌ای که شاید در نگاه اول کمتر از هوش مصنوعی جذاب به نظر برسد، اما در واقع بدون آن خبری از اجرای بسیاری از سرویس‌های مدرن، پردازش داده و محصولات هوشمند نیست.
        </p>
        <p>
          از طرف دیگر، بخش‌هایی از نمایشگاه به زیرساخت‌های سخت‌افزاری و مراکز داده اختصاص داشت؛ برای مثال HPDS محصولات و راهکارهای خود را در حوزه ذخیره‌سازی سازمانی، زیرساخت داده و مراکز داده معرفی کرد. حتی بعضی شرکت‌ها تلاش کرده بودند یک اکوسیستم کامل را به جای یک محصول منفرد نمایش دهند. گرینوب در الکامپ امسال مجموعه‌ای از حوزه‌ها شامل هوش مصنوعی، زیرساخت و خدمات ابری، امنیت سایبری، توسعه کسب‌وکار و سرمایه‌گذاری را در کنار یکدیگر به نمایش گذاشت.
        </p>

        <figure className="elecomp-fig elecomp-fig-sm">
          <img src={A + 'elecomp-7.jpg'} alt="غرفه نواتل در الکامپ" />
        </figure>

        <h2 className="elecomp-h2">جذاب‌ترین بخش ماجرا چیست؟</h2>
        <p>
          شاید مهم‌ترین ویژگی الکامپ این باشد که فناوری را از صفحه لپ‌تاپ بیرون می‌آورد. در اینترنت می‌توانیم درباره هوش مصنوعی، رایانش ابری، امنیت سایبری یا یک محصول جدید بخوانیم؛ اما در نمایشگاه می‌توانیم محصول را ببینیم، با تیم سازنده صحبت کنیم، سؤال بپرسیم و گاهی خودمان آن را امتحان کنیم. در الکامپ ۱۴۰۵ هم این تجربه فقط به تماشای محصولات محدود نبود و در کنار فضای نمایشگاهی، برنامه‌هایی مانند نشست‌ها، پنل‌ها، کارگاه‌ها و رویدادهای B2B نیز برای ارتباط میان فعالان این حوزه برگزار شد. از طرف دیگر، حضور استارتاپ‌ها و تیم‌های جوان، بخش دیگری از فضای نمایشگاه را شکل می‌داد. رویدادهایی مانند الکامپ‌یچ نیز بستری برای ارائه ایده‌ها و محصولات تیم‌های نوآور فراهم کردند.
        </p>

        <figure className="elecomp-fig">
          <img src={A + 'elecomp-4.jpg'} alt="بازدیدکنندگان در سالن الکامپ" />
        </figure>

        <h2 className="elecomp-h2">الکامپ ۱۴۰۵؛ یک تصویر کوچک از آینده</h2>
        <p>
          شاید نتوان از روی یک نمایشگاه پیش‌بینی کرد که آینده فناوری دقیقاً چه شکلی خواهد داشت؛ اما می‌توان از آن فهمید که امروز صنعت فناوری روی چه موضوعاتی تمرکز کرده است. در الکامپ امسال، هوش مصنوعی در کنار امنیت دیجیتال، زیرساخت، رایانش ابری، خدمات دیجیتال، تجارت الکترونیک و استارتاپ‌ها حضور پررنگی داشت. این کنار هم قرار گرفتن اتفاقی نیست؛ فناوری‌های جدید دیگر جدا از هم رشد نمی‌کنند. یک محصول هوش مصنوعی به زیرساخت نیاز دارد، به داده نیاز دارد، به امنیت نیاز دارد و در نهایت باید بتواند به یک نیاز واقعی پاسخ دهد. شاید به همین دلیل است که الکامپ را بهتر است نه فقط یک نمایشگاه، بلکه تصویری از بخشی از اکوسیستم فناوری ایران بدانیم؛ جایی که شرکت‌ها محصولاتشان را به نمایش می‌گذارند، ایده‌ها با یکدیگر برخورد می‌کنند و دانشجوی امروز می‌تواند از نزدیک ببیند فناوری‌هایی که در کلاس درباره‌شان می‌خواند، در دنیای واقعی چه شکلی پیدا کرده‌اند.
        </p>

        <figure className="elecomp-fig">
          <img src={A + 'elecomp-6.jpg'} alt="راهروی نمایشگاه و غرفه‌ها" />
        </figure>

        <h2 className="elecomp-h2">اولین چیزی که توجهم را جلب کرد.</h2>
        <p>
          در ابتدای بازدید، غرفه‌هایی که بازی و برنامه‌های تعاملی داشتند بیشتر از همه جلب توجه می‌کردند. ربات‌ها هم بخش جذابی از نمایشگاه بودند و بین چیزهایی که دیدم، یک ربات بیشتر از بقیه برایم جالب بود. این ربات بسته‌ها و نامه‌ها را بر اساس شهر مقصد مرتب می‌کرد و هرکدام را در قسمت مخصوص خودش قرار می‌داد. شاید در نگاه اول این کار ساده به نظر برسد، اما وقتی به کاربردش فکر می‌کردم، جالب بود که چطور می‌شود با استفاده از فناوری، کاری را که ممکن است در حالت دستی با خطای انسانی همراه باشد، دقیق‌تر و خودکار انجام داد. هرچه بیشتر در نمایشگاه می‌چرخیدم، بیشتر متوجه می‌شدم که هر شرکت سعی کرده خودش را به شکل متفاوتی معرفی کند.
        </p>
        <p>
          بعضی غرفه‌ها طراحی‌های جذابی داشتند، بعضی روی فناوری‌های خاص تمرکز کرده بودند و بعضی دیگر با برنامه‌های تعاملی و بازی سعی می‌کردند مخاطب بیشتری جذب کنند. البته همین جذابیت باعث شده بود نمایشگاه خیلی شلوغ باشد و برای بعضی برنامه‌های تعاملی حتی صف‌های طولانی شکل بگیرد.
        </p>

        <h2 className="elecomp-h2">اما برای من، الکامپ فقط تماشای غرفه‌ها نبود.</h2>
        <p>
          بعد از مدتی تصمیم گرفتم کمی هدفمندتر نمایشگاه را بگردم. به جای اینکه فقط ببینم چه چیزهایی برای بازدید جذاب هستند، دنبال شرکت‌هایی گشتم که حوزه فعالیتشان به علایق من نزدیک‌تر باشد. برایم جالب بود که از نزدیک ببینم چه شرکت‌هایی در حوزه‌های مختلف کامپیوتر فعالیت می‌کنند و فضای کاری آنها چطور است. با چند نفر صحبت کردم و درباره فعالیت شرکت‌ها و فرصت‌هایی که برای دانشجوها وجود دارد پرسیدم. در بعضی موارد شماره تماس گرفتم و حتی از من خواستند رزومه‌ام را برایشان ارسال کنم. از بعضی افراد هم پرسیدم اگر شرکت یا مجموعه دیگری را می‌شناسند که به زمینه مورد علاقه من نزدیک باشد، معرفی‌اش کنند. در واقع، سعی کردم از الکامپ فقط به عنوان یک نمایشگاه بازدید نکنم؛ می‌خواستم ببینم آیا می‌توانم از همین چند ساعت برای ساختن چند ارتباط جدید هم استفاده کنم.
        </p>

        <figure className="elecomp-fig elecomp-fig-md">
          <img src={A + 'elecomp-2.jpg'} alt="حضور تیم در الکامپ" />
        </figure>

        <h2 className="elecomp-h2">یک نمایشگاه، چندین فرصت برای آشنا شدن</h2>
        <p>
          چیزی که برایم جالب بود این بود که ارتباط گرفتن در نمایشگاه خیلی طبیعی اتفاق می‌افتاد. فقط دانشجوها نبودند که با شرکت‌ها صحبت می‌کردند؛ افراد مختلفی در حال آشنا شدن، گفت‌وگو و پیدا کردن ارتباط‌های جدید بودند. برای من هم همین بخش تبدیل شد به یکی از مهم‌ترین قسمت‌های تجربه الکامپ. قبل از آن شاید فکر می‌کردم برای آشنا شدن با شرکت‌ها یا پیدا کردن فرصت‌های کاری، باید حتماً از مسیرهای رسمی و پیچیده‌ای وارد شد. اما آنجا متوجه شدم گاهی یک گفت‌وگوی چند دقیقه‌ای می‌تواند شروع یک ارتباط جدید باشد. البته هدفم این نبود که حتماً همان روز یک موقعیت کاری پیدا کنم. بیشتر می‌خواستم شرکت‌ها را بشناسم، بفهمم در چه حوزه‌هایی فعالیت می‌کنند و با فضای واقعی‌تر صنعت آشنا شوم. اما اینکه بعضی از همین گفت‌وگوها به گرفتن راه ارتباطی یا درخواست ارسال رزومه رسید، برایم تجربه جالبی بود.
        </p>

        <h2 className="elecomp-h2">چیزی که قبل از الکامپ درباره آینده فکر می‌کردم</h2>
        <p>
          یکی از چیزهایی که بعد از این بازدید بیشتر به آن فکر کردم، آینده خودم در حوزه کامپیوتر بود. قبل از الکامپ گاهی این سؤال برایم وجود داشت که واقعاً چند شرکت در این حوزه فعالیت می‌کنند؟ فرصت‌های کاری چقدر گسترده‌اند؟ آیا هنوز ایده‌ها و زمینه‌های جدیدی برای فعالیت وجود دارد؟ اما وقتی از نزدیک تعداد شرکت‌ها و تنوع حوزه‌های فعالیت را دیدم، نگاهم تغییر کرد. فهمیدم تصویری که ما گاهی از دنیای کامپیوتر از داخل دانشگاه داریم، فقط بخش کوچکی از یک دنیای خیلی بزرگ‌تر است. شرکت‌ها و ایده‌های زیادی وجود دارند که شاید حتی اسمشان را هم نشنیده باشیم و هرکدام در بخشی از این صنعت مشغول فعالیت‌اند. همین موضوع باعث شد بعد از نمایشگاه نسبت به آینده این حوزه امیدوارتر باشم.
        </p>

        <h2 className="elecomp-h2">الکامپ در مقایسه با رویدادهای خارجی</h2>
        <p>
          وقتی در نمایشگاه قدم می‌زدم، ناخودآگاه آن را با نمایشگاه‌ها و رویدادهای فناوری بزرگی که در کشورهای دیگر برگزار می‌شوند مقایسه می‌کردم. به نظرم الکامپ، با توجه به شرایط و حمایت‌هایی که از چنین رویدادهایی می‌شود، عملکرد قابل قبولی دارد و اینکه می‌توانیم چنین نمایشگاهی با این حجم از شرکت‌ها و فناوری‌ها برگزار کنیم، خودش اتفاق مهمی است.
        </p>
        <p>
          اما اگر بخواهیم واقع‌بینانه نگاه کنیم، هنوز فاصله زیادی با رویدادهای بزرگ فناوری دنیا داریم. در نمایشگاه‌های بین‌المللی بزرگ، معمولاً هم از نظر تعداد و تنوع شرکت‌ها و فناوری‌های ارائه‌شده و هم از نظر امکانات، سرمایه‌گذاری، طراحی غرفه‌ها و تجربه‌ای که برای بازدیدکننده ایجاد می‌شود، سطح بسیار بالاتری دیده می‌شود. به نظرم این تفاوت فقط به خود نمایشگاه مربوط نیست؛ بخش زیادی از آن به اکوسیستم فناوری، میزان سرمایه‌گذاری، ارتباط صنعت و دانشگاه و حمایت‌هایی برمی‌گردد که پشت چنین رویدادهایی وجود دارد. با این حال، چیزی که در الکامپ برای من امیدوارکننده بود این بود که با وجود محدودیت‌ها، شرکت‌ها و مجموعه‌های داخلی تلاش کرده بودند فناوری‌ها و محصولاتشان را به شکل جذابی معرفی کنند و فضای نمایشگاه هم نشان می‌داد که ظرفیت زیادی برای رشد وجود دارد.
        </p>

        <h2 className="elecomp-h2">اگر دوباره به الکامپ بروم.</h2>
        <p>
          اگر بخواهم تجربه اولین حضورم را برای کسی که قرار است برای اولین بار به الکامپ برود خلاصه کنم، احتمالاً می‌گویم فقط برای دیدن غرفه‌ها نروید. خود من هم از بازی‌ها و برنامه‌های تعاملی لذت بردم و به نظرم این بخش‌ها یکی از جذابیت‌های نمایشگاه هستند؛ اما اگر دانشجوی کامپیوتر هستید، بهتر است بخشی از زمانتان را برای شناخت شرکت‌ها و صحبت با آدم‌های فعال در حوزه مورد علاقه‌تان کنار بگذارید. به نظرم زمان بازدید هم مهم است و بهتر است بازدید را فقط به روز آخر نمایشگاه محدود نکنید؛ چون ممکن است در روزهای ابتدایی فرصت بیشتری برای ارتباط گرفتن با شرکت‌ها و افراد فعال وجود داشته باشد. در نهایت، چیزی که از الکامپ برای من باقی ماند فقط دیدن چند ربات، غرفه و فناوری جدید نبود. من با این تصور وارد الکامپ شدم که قرار است چند ساعت نمایشگاه را ببینم و برگردم؛ اما وقتی از نمایشگاه بیرون آمدم، چیزی که با خودم می‌بردم فقط چند عکس و خاطره نبود.
        </p>

        <h2 className="elecomp-h2">حرف آخر</h2>
        <p>
          شاید چیزی که از این تجربه بیشتر از همه به چشم می‌آید، این باشد که الکامپ فقط جایی برای دیدن تکنولوژی‌های جدید و گشتن بین غرفه‌ها نیست. برای یک دانشجو می‌تواند فرصتی باشد برای اینکه کمی از فضای دانشگاه فاصله بگیرد و ببیند دنیای واقعی کامپیوتر و آدم‌هایی که در آن فعالیت می‌کنند، چه شکلی است.
        </p>
        <p>
          الکامپ هنوز تا رسیدن به استاندارد رویدادهای بزرگ فناوری دنیا راه دارد، اما همین تجربه نشان می‌دهد که ظرفیت‌های زیادی برای رشد وجود دارد. شاید هنوز فاصله داشته باشیم، اما همین شرکت‌ها، ایده‌ها و آدم‌هایی که در چنین رویدادی کنار هم جمع می‌شوند، نشان می‌دهند که این مسیر می‌تواند ادامه پیدا کند.
        </p>
        <p>
          اگر دانشجوی کامپیوتر هستید، دفعه بعد که الکامپ برگزار شد، فقط از کنارش رد نشوید؛ سری به نمایشگاه بزنید، با شرکت‌ها حرف بزنید، سؤال بپرسید و ببینید دنیای کامپیوتر بیرون از دانشگاه چه خبر است. شاید چیزی پیدا کنید که مسیرتان را عوض کند.
        </p>
      </div>
      <SectionNav currentId={s.id} />
    </section>
  );
}

function FaceArticle({ s }) {
  return (
    <section className="page article-page face-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />
      <header className={`art-hero tone-${s.tone} is-shown`}>
        <span className="art-ghost mono" aria-hidden="true">{String(s.no).padStart(2, '0')}</span>
        <span className="art-tag mono">بخش {s.no} · چهره این شماره</span>
        <h1>{s.title}</h1>
        {s.subtitle && <p className="art-subtitle">{s.subtitle}</p>}
        <p className="art-authors">{s.authors.join('، ')}</p>
      </header>

      <div className="face-body">
        <div className="face-intro">
          <figure className="face-fig face-fig-portrait">
            <img src={A + 'face-portrait.png'} alt="دمیس حسابیس" />
          </figure>
          <div className="face-intro-text">
            <p className="face-lead">
              مردی که از صفحه شطرنج آغاز کرد، هوش مصنوعی را به میدان رقابت برد و سرانجام آن را به ابزاری برای کشف رازهای زندگی تبدیل کرد.
            </p>
            <p>
              هوش مصنوعی امروز در همه‌جا حضور دارد؛ از تلفن‌های همراه و موتورهای جست‌وجو گرفته تا پزشکی، صنعت، آموزش و پژوهش‌های علمی. با این حال، شاید یکی از جذاب‌ترین پرسش‌ها درباره این فناوری آن باشد که هوش مصنوعی تا کجا می‌تواند پیش برود؟ آیا می‌تواند تنها وظایف انسان را سریع‌تر انجام دهد؟ آیا می‌تواند بازی کند و تصمیم بگیرد؟ یا شاید بتواند به انسان در کشف چیزهایی کمک کند که هنوز نمی‌دانیم؟
            </p>
            <p>
              داستان زندگی دمیس حسابیس را می‌توان پاسخی به همین پرسش‌ها دانست. مسیر او از شطرنج آغاز شد، از دنیای بازی‌های رایانه‌ای عبور کرد، به مطالعه مغز انسان رسید و سرانجام به ساخت سامانه‌هایی انجامید که توانستند در یکی از پیچیده‌ترین بازی‌های جهان پیروز شوند و بعدها به دانشمندان در حل یکی از مهم‌ترین مسائل زیست‌شناسی کمک کنند.
            </p>
          </div>
        </div>

        <h2 className="face-h2">آغاز داستان؛ کودکی که عاشق بازی‌های فکری بود</h2>
        <p>
          دمیس حسابیس در سال 1976 در لندن متولد شد. او از کودکی علاقه زیادی به بازی‌های فکری داشت و شطرنج یکی از مهم‌ترین علاقه‌های او بود. استعداد او در این بازی خیلی زود آشکار شد و در نوجوانی به سطح بالایی در شطرنج رسید. اما آنچه برای حسابیس اهمیت داشت، تنها بردن یک مسابقه یا شکست دادن حریف نبود. پشت هر حرکت در شطرنج، یک پرسش پنهان بود: انسان چگونه فکر می‌کند؟ چگونه میان گزینه‌های مختلف تصمیم می‌گیرد؟ و چگونه راه‌حلی برای یک مسئله پیچیده پیدا می‌کند؟ شاید همان پرسش‌ها بودند که بعدها مسیر زندگی او را تغییر دادند. برای بسیاری از افراد، بازی تنها وسیله‌ای برای سرگرمی است؛ اما برای حسابیس، بازی به تدریج به آزمایشگاهی برای شناخت مفهوم هوشمندی تبدیل شد.
        </p>

        <figure className="face-fig face-fig-md">
          <img src={A + 'face-boy.png'} alt="کودکی که با اسباب‌بازی‌های فکری بازی می‌کند" />
        </figure>

        <h2 className="face-h2">از بازی‌سازی تا مطالعه ذهن انسان</h2>
        <p>
          حسابیس خیلی زود وارد دنیای برنامه‌نویسی و بازی‌های رایانه‌ای شد و در صنعت بازی فعالیت کرد. او در ساخت بازی‌های مهمی مشارکت داشت و تجربه‌ای ارزشمند در طراحی جهان‌های پیچیده و سامانه‌هایی به دست آورد که باید بر اساس قوانین مشخص تصمیم می‌گرفتند. اما مسیر او در همان‌جا متوقف نشد. او به این نتیجه رسیده بود که برای ساخت ماشین‌های هوشمند، شاید ابتدا باید خود مفهوم هوشمندی را بهتر درک کرد. همین نگاه، او را به سمت مطالعه مغز و علوم اعصاب کشاند. حسابیس به مطالعه سازوکارهای ذهن انسان پرداخت؛ اینکه انسان چگونه اطلاعات را پردازش می‌کند، چگونه خاطرات را شکل می‌دهد و چگونه از تجربه‌های گذشته برای تصمیم‌گیری‌های آینده استفاده می‌کند.
        </p>
        <p>
          در این مرحله، سه مسیر مهم زندگی او به یکدیگر رسیدند: بازی، مغز انسان و هوش مصنوعی. همین ترکیب بعدها زمینه شکل‌گیری یکی از مهم‌ترین شرکت‌های فعال در حوزه هوش مصنوعی را فراهم کرد.
        </p>

        <figure className="face-fig face-fig-md">
          <img src={A + 'face-coder.png'} alt="برنامه‌نویسی و ساخت بازی‌های رایانه‌ای" />
        </figure>

        <h2 className="face-h2">DeepMind؛ آغاز یک رؤیای بزرگ</h2>
        <p>
          در سال 2010، دمیس حسابیس به همراه شین لگ و مصطفی سلیمان، شرکت DeepMind را تأسیس کرد. هدف این مجموعه از همان ابتدا بلندپروازانه بود: توسعه هوش مصنوعی از طریق درک بهتر فرایند یادگیری و هوشمندی. DeepMind پژوهشگران حوزه‌های مختلف را کنار هم قرار داد؛ متخصصان یادگیری ماشین، علوم اعصاب، ریاضیات و مهندسی. ایده اصلی این بود که شاید برای ساخت سامانه‌های هوشمند، نباید تنها به یک رشته علمی تکیه کرد. در سال‌های ابتدایی، یکی از مهم‌ترین زمینه‌های آزمایش DeepMind، بازی‌های رایانه‌ای بود. سامانه‌های این مجموعه می‌توانستند با مشاهده محیط، تجربه کردن، اشتباه کردن و یادگیری از نتایج تصمیم‌های خود، به تدریج عملکردشان را بهتر کنند. اما بازی‌ها مقصد نهایی نبودند. آن‌ها تنها یک میدان آزمایش بودند.
        </p>

        <figure className="face-fig face-fig-sm face-fig-logo">
          <img src={A + 'face-deepmind.png'} alt="لوگوی DeepMind" />
        </figure>

        <blockquote className="face-quote">
          دمیس حسابیس به دنبال پاسخ دادن به پرسش بزرگ‌تری بود: اگر یک ماشین بتواند یاد بگیرد، آیا این توانایی می‌تواند روزی برای حل مسائل واقعی جهان به کار گرفته شود؟
        </blockquote>

        <h2 className="face-h2">AlphaGo؛ روزی که جهان متوجه شد بازی تغییر کرده است</h2>
        <p>
          پاسخ اولیه DeepMind به این پرسش، پروژه‌ای بود که نام آن بعدها در سراسر جهان شناخته شد: AlphaGo. بازی «گو» هزاران سال قدمت دارد و یکی از پیچیده‌ترین بازی‌های فکری جهان به شمار می‌رود. تعداد حالت‌های ممکن در این بازی آن‌قدر زیاد است که بررسی همه حرکت‌های احتمالی با روش‌های ساده محاسباتی تقریباً غیرممکن است. به همین دلیل، بسیاری معتقد بودند که هوش مصنوعی هنوز فاصله زیادی با شکست دادن بهترین بازیکنان انسانی در این بازی دارد.
        </p>
        <p>
          اما سال 2016، نقطه عطفی در این داستان بود. AlphaGo در مقابل لی سِدول، یکی از مشهورترین و قدرتمندترین بازیکنان جهان، قرار گرفت. نتیجه برای بسیاری غیرمنتظره بود؛ AlphaGo با نتیجه چهار بر یک پیروز شد. اما اهمیت این مسابقه تنها در پیروزی یک ماشین بر انسان خلاصه نمی‌شد. برخی از حرکت‌های AlphaGo حتی برای بازیکنان حرفه‌ای غیرمنتظره بودند؛ این سامانه گاهی تصمیم‌هایی می‌گرفت که در نگاه اول عجیب به نظر می‌رسیدند، اما بعدها مشخص می‌شد که بخشی از یک راهبرد پیچیده هستند. برای بسیاری از مردم، AlphaGo لحظه‌ای بود که هوش مصنوعی از یک مفهوم علمی و دور از دسترس، به پدیده‌ای واقعی و قابل مشاهده تبدیل شد. اما برای دمیس حسابیس، این پیروزی پایان داستان نبود؛ در واقع، تازه سؤال مهم‌تری آغاز شده بود.
        </p>

        <figure className="face-fig face-fig-md">
          <img src={A + 'face-go.png'} alt="صفحه بازی گو" />
        </figure>

        <h2 className="face-h2">اگر هوش مصنوعی می‌تواند بازی کند، آیا می‌تواند علم را پیش ببرد؟</h2>
        <p>
          پس از موفقیت AlphaGo، حسابیس و تیم DeepMind به سراغ مسئله‌ای رفتند که ارتباطی با بازی نداشت؛ مسئله‌ای که دهه‌ها دانشمندان را به خود مشغول کرده بود. مسئله، ساختار پروتئین‌ها بود. پروتئین‌ها از مهم‌ترین مولکول‌های موجود در بدن موجودات زنده هستند. تقریباً بسیاری از فرایندهای حیاتی به عملکرد آن‌ها وابسته‌اند و شکل سه‌بعدی هر پروتئین ارتباط مستقیمی با عملکرد آن دارد. اما یک مسئله بزرگ وجود داشت: دانشمندان می‌توانستند توالی سازنده پروتئین‌ها را بشناسند، اما پیش‌بینی اینکه این زنجیره چگونه در فضای سه‌بعدی تا می‌شود و شکل نهایی خود را به دست می‌آورد، مسئله‌ای بسیار پیچیده بود.
        </p>
        <p>
          حل این مسئله اهمیت زیادی داشت؛ زیرا شناخت ساختار پروتئین‌ها می‌تواند به درک بهتر بیماری‌ها، طراحی داروها و انجام پژوهش‌های زیستی کمک کند. در اینجا بود که DeepMind پروژه جدید خود را معرفی کرد: AlphaFold.
        </p>

        <h2 className="face-h2">AlphaFold؛ وقتی هوش مصنوعی وارد آزمایشگاه شد</h2>
        <p>
          AlphaFold با استفاده از روش‌های هوش مصنوعی برای پیش‌بینی ساختار سه‌بعدی پروتئین‌ها توسعه یافت. نتایج این پروژه توجه جامعه علمی جهان را به خود جلب کرد. برای نخستین بار، هوش مصنوعی تنها در حال انجام یک وظیفه مشخص، بازی کردن یا تحلیل داده‌های معمول نبود؛ بلکه به ابزاری برای حل یک مسئله بنیادی علمی تبدیل شده بود. AlphaFold به پژوهشگران کمک کرد تا اطلاعات مربوط به ساختار شمار بسیار زیادی از پروتئین‌ها را با سرعت و گستردگی بیشتری بررسی کنند. این اتفاق، نگاه بسیاری از دانشمندان به نقش هوش مصنوعی را تغییر داد؛ دیگر نمی‌شد هوش مصنوعی را تنها یک فناوری برای خودکارسازی وظایف دانست. هوش مصنوعی می‌توانست به یک ابزار علمی تبدیل شود؛ ابزاری که در کنار دانشمند قرار می‌گیرد، حجم عظیمی از داده‌ها را تحلیل می‌کند و مسیرهای تازه‌ای برای کشف فراهم می‌سازد.
        </p>

        <figure className="face-fig face-fig-lg">
          <img src={A + 'face-protein.jpg'} alt="ساختار سه‌بعدی پروتئین پیش‌بینی‌شده توسط AlphaFold" />
        </figure>

        <h2 className="face-h2">از صفحه شطرنج تا جایزه نوبل</h2>
        <p>
          اهمیت AlphaFold در سال 2024 در بالاترین سطح علمی جهان مورد توجه قرار گرفت. دمیس حسابیس و جان جامپر به دلیل پژوهش‌های مرتبط با پیش‌بینی ساختار پروتئین‌ها، در کنار دیوید بیکر، در جایزه نوبل شیمی سال 2024 مورد تقدیر قرار گرفتند؛ حسابیس و جامپر برای پیش‌بینی ساختار پروتئین‌ها با کمک هوش مصنوعی و بیکر برای طراحی محاسباتی پروتئین‌ها. این اتفاق، نقطه‌ای مهم در مسیر علمی دمیس حسابیس بود. مسیر او از یک کودک علاقه‌مند به شطرنج آغاز شده بود، سپس به برنامه‌نویسی و بازی‌سازی رسید، از آنجا به مطالعه مغز انسان رفت، بعد DeepMind را تأسیس کرد، AlphaGo را ساخت و در نهایت، هوش مصنوعی را از صفحه بازی به یکی از مهم‌ترین مسائل زیست‌شناسی رساند. شاید کمتر داستانی بتواند به اندازه مسیر زندگی او، ارتباط میان حوزه‌های مختلف دانش را نشان دهد.
        </p>

        <h2 className="face-h2">هوش مصنوعی؛ رقیب انسان یا همکار انسان؟</h2>
        <p>
          شاید مهم‌ترین نکته در داستان دمیس حسابیس، تغییر نگاه به هوش مصنوعی باشد. سال‌ها، بحث اصلی درباره هوش مصنوعی این بود که آیا ماشین‌ها می‌توانند جای انسان را بگیرند؟ اما مسیر پروژه‌هایی مانند AlphaFold پرسش دیگری را مطرح کرد: اگر هوش مصنوعی قرار نباشد جای انسان را بگیرد، بلکه بتواند توانایی انسان را افزایش دهد، چه اتفاقی خواهد افتاد؟
        </p>
        <p>
          AlphaFold نمونه‌ای از همین نگاه است. این سامانه جای زیست‌شناس را نگرفت. به جای دانشمند تصمیم‌گیری نکرد. اما ابزار جدیدی در اختیار پژوهشگران قرار داد؛ ابزاری که می‌توانست فرایند بررسی ساختار پروتئین‌ها را متحول کند و امکان مطالعه پرسش‌های جدید را فراهم سازد. شاید آینده هوش مصنوعی نیز بیشتر از آنکه در جایگزینی انسان تعریف شود، در همین همکاری میان انسان و ماشین شکل بگیرد.
        </p>

        <figure className="face-fig face-fig-md">
          <img src={A + 'face-handshake.png'} alt="همکاری انسان و هوش مصنوعی" />
        </figure>

        <h2 className="face-h2">چرا دمیس حسابیس اهمیت دارد؟</h2>
        <p>
          دمیس حسابیس تنها مدیر یک شرکت هوش مصنوعی یا سازنده یک فناوری مشهور نیست. داستان او نمادی از تغییری بزرگ‌تر است. او نشان داد که مسیر پیشرفت هوش مصنوعی الزاماً از یک رشته یا یک تخصص مشخص عبور نمی‌کند. بازی، علوم اعصاب، برنامه‌نویسی، ریاضیات و زیست‌شناسی می‌توانند در کنار یکدیگر قرار بگیرند و نتیجه این همکاری، فناوری‌ای باشد که بتواند مرزهای دانش را جابه‌جا کند. از AlphaGo تا AlphaFold، یک تغییر مهم در مسیر هوش مصنوعی دیده می‌شود:
        </p>

        <blockquote className="face-quote">
          هوش مصنوعی ابتدا یاد گرفت بازی کند؛ سپس یاد گرفت به انسان در شناخت جهان کمک کند.
        </blockquote>

        <h2 className="face-h2">پایان یک داستان یا آغاز مسیری تازه؟</h2>
        <p>
          داستان دمیس حسابیس هنوز به پایان نرسیده است. او همچنان در تلاش برای توسعه سامانه‌های هوشمند و استفاده از آن‌ها در حل مسائل علمی پیچیده است. اما شاید مهم‌ترین دستاورد مسیر او تاکنون، تنها AlphaGo یا AlphaFold نباشد. مهم‌ترین دستاورد او شاید تغییر یک تصور قدیمی باشد: اینکه هوش مصنوعی فقط مجموعه‌ای از الگوریتم‌ها و ماشین‌هایی نیست که وظایف انسان را تقلید می‌کنند. هوش مصنوعی می‌تواند به ابزاری برای کشف تبدیل شود.
        </p>
        <p>
          ابزاری که به انسان کمک می‌کند چیزهایی را ببیند که پیش از این نمی‌توانست ببیند، الگوهایی را پیدا کند که در میان حجم عظیم داده‌ها پنهان مانده‌اند و پرسش‌هایی را بررسی کند که پاسخ دادن به آن‌ها، با توانایی‌های انسانی به‌تنهایی، بسیار دشوار است.
        </p>
        <p>
          مسیر دمیس حسابیس از یک صفحه شطرنج آغاز شد، اما به پرسشی بسیار بزرگ‌تر رسید: اگر بتوانیم هوشمندی را بهتر درک کنیم، شاید بتوانیم جهان را نیز بهتر بشناسیم. و شاید همین، مهم‌ترین دلیل برای قرار گرفتن نام او در میان تأثیرگذارترین چهره‌های عصر هوش مصنوعی باشد.
        </p>

      </div>
      <SectionNav currentId={s.id} />
    </section>
  );
}

function CoverStoryArticle({ s }) {
  const tones = ['indigo', 'cyan', 'amber', 'rose'];
  return (
    <section className="page article-page sarmaghale-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />
      <ArticleHero s={s} />

      <div className="sarmaghale-body">
        <p className="sarmaghale-lead">
          این نشریه در پانزده بخش، ورود هوش مصنوعی به آموزش، پزشکی، صنعت، برنامه‌نویسی، امنیت سایبری، اقتصاد، هنر و رسانه، شبکه‌های اجتماعی، حمل‌ونقل، کشاورزی، حقوق و اخلاق، زندگی روزمره، بازار کار، ایران و آینده این فناوری را بررسی می‌کند. جمع‌بندی مشترک این حوزه‌ها بر افزایش کارایی و شخصی‌سازی، وابستگی به داده و ضرورت حکمرانی، شفافیت و اعتماد عمومی تأکید دارد و هدف آن ارائه تصویری مستند از فرصت‌ها و چالش‌ها، بدون بزرگ‌نمایی توانایی‌ها یا نادیده‌گرفتن محدودیت‌هاست.
        </p>

        <div className="sarmaghale-keywords">
          <span className="sarmaghale-kw-label mono">کلیدواژه‌ها</span>
          <div className="sarmaghale-kw-list">
            {[
              'هوش مصنوعی',
              'یادگیری ماشین',
              'حکمرانی فناوری',
              'اخلاق هوش مصنوعی',
              'آینده بازار کار',
              'امنیت سایبری',
              'اتوماسیون هوشمند',
              'داده و حریم خصوصی',
            ].map((kw) => (
              <span key={kw} className="sarmaghale-kw">{kw}</span>
            ))}
          </div>
        </div>

        <p>
          پیشرفت مدل‌های زبانی بزرگ و یادگیری عمیق، هوش مصنوعی را از محیط‌های پژوهشی به فعالیت‌های روزمره، صنعت و علم رسانده و در حوزه‌هایی مانند آموزش، پزشکی، تولید و بازارهای مالی وارد تصمیم‌گیری کرده است. این گسترش، پرسش‌هایی درباره حدود جایگزینی قضاوت انسانی، مسئولیت خطا و الزامات استفاده ایمن و عادلانه ایجاد کرده است.
        </p>

        <p>
          این نشریه با بررسی کاربرد هوش مصنوعی در پانزده حوزه، گذار آن از کاربردهای محدود و آزمایشی به ادغام تدریجی در زیرساخت‌های اصلی جامعه را دنبال می‌کند و در پایان، خط‌های مشترک این تحول را جمع‌بندی می‌کند.
        </p>

        <h2 className="sarmaghale-h2">فهرست بخش‌ها</h2>
        <ol className="parts-grid">
          {s.parts.map((p, i) => {
            const isFeatured = i % 5 === 0;
            const tone = tones[i % tones.length];
            return (
              <li key={p.id} className={`tone-${tone} ${isFeatured ? 'is-featured' : ''}`}>
                <a href={`#/article/sarmaghale/${p.id}`} className="part-card">
                  <span className="part-no mono">{String(p.no).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  {p.subtitle && <p className="part-subtitle">{p.subtitle}</p>}
                  <div className="part-footer">
                    <AuthorBadge name={p.authors[0]} photo={p.photo} />
                    {p.authors.length > 1 && (
                      <span className="part-more mono">+{p.authors.length - 1}</span>
                    )}
                  </div>
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      <SectionNav currentId={s.id} />
    </section>
  );
}
function GenericPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />
      <header className={`art-hero tone-cyan is-shown`}>
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <p className="art-authors">{part.authors.join('، ')}</p>
      </header>
      <PlaceholderSpread />
      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function CoverStoryPart({ part }) {
  if (part.id === 'edu') return <EduPart part={part} />;
  if (part.id === 'medicine') return <MedicinePart part={part} />;
  if (part.id === 'industry') return <IndustryPart part={part} />;
  if (part.id === 'swe') return <SwePart part={part} />;
  if (part.id === 'security') return <SecurityPart part={part} />;
  if (part.id === 'business') return <BusinessPart part={part} />;
  if (part.id === 'creative') return <CreativePart part={part} />;
  if (part.id === 'social') return <SocialPart part={part} />;
  if (part.id === 'transport') return <TransportPart part={part} />;
  if (part.id === 'agri') return <AgriPart part={part} />;
  if (part.id === 'law') return <LawPart part={part} />;
  if (part.id === 'daily') return <DailyPart part={part} />;
  if (part.id === 'work') return <WorkPart part={part} />;
  if (part.id === 'iran') return <IranPart part={part} />;
  if (part.id === 'future') return <FuturePart part={part} />;
  return <GenericPart part={part} />;
}

function EduPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          هوش مصنوعی نظام آموزشی را از الگوی یکسان آموزش برای همه به سمت یادگیری شخصی‌سازی‌شده سوق داده است؛ سامانه‌های تطبیقی با تحلیل عملکرد، نقاط ضعف و الگوهای یادگیری می‌توانند مسیر و بازخورد متناسب ارائه کنند و در صورت هدایت معلم، آموزش را مؤثرتر سازند. در این الگو، نقش معلم بیشتر به هدایت فرایند یادگیری تغییر می‌کند.
        </p>

        <p>
          «معلمان هوش مصنوعی» می‌توانند به‌صورت شبانه‌روزی پاسخ دهند، تمرین متناسب تولید کنند، اشکالات را توضیح دهند و بازخورد فوری بدهند، اما به دلیل اهمیت تفکر انتقادی، تعامل اجتماعی، انگیزش، قضاوت اخلاقی و حمایت عاطفی، بیشتر مکمل معلم انسانی‌اند.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-xs">
          <img src={A + 'sarmaghale-edu-robot.png'} alt="ربات معلم هوش مصنوعی در حال تدریس" />
          <figcaption className="sarmaghale-cap"></figcaption>
        </figure>

        <p>
          مدل‌های زبانی مانند ChatGPT در آموزش عالی برای مرور و خلاصه‌سازی، برنامه‌نویسی، تمرین زبان، ایده‌پردازی و شبیه‌سازی آموزشی به کار می‌روند و استادان نیز از آن‌ها برای طراحی تمرین، محتوای آموزشی و کاهش بار اداری استفاده می‌کنند. تجربه دانشگاه ایالتی آریزونا نشان می‌دهد که استفاده سازمان‌یافته و همراه با سیاست‌های شفاف می‌تواند پشتیبانی آموزشی را بهبود دهد.
        </p>

        <p>
          گسترش ابزارهای مولد، اعتبار روش‌های سنتی ارزشیابی را با چالش روبه‌رو کرده و دانشگاه‌ها را به بازنگری در ارزیابی، آموزش سواد هوش مصنوعی، شفاف‌سازی میزان استفاده و طراحی تکالیف تحلیلی‌تر سوق داده است. بنابراین، مسئله اصلی از «استفاده یا عدم استفاده» به «استفاده مسئولانه» تغییر کرده است.
        </p>

        <div className="sarmaghale-callout sarmaghale-callout-rose">
          <span className="sarmaghale-callout-label mono">چالش‌ها</span>
          <p>
            چالش‌های آموزش شامل تولید اطلاعات و منابع نادرست، وابستگی بیش از حد و تضعیف نگارش و استدلال مستقل، همچنین حریم خصوصی، سوگیری، نابرابری دسترسی و وابستگی مؤسسات به شرکت‌های فناوری است.
          </p>
        </div>

        <div className="sarmaghale-closing">
          <p>
            آینده آموزش بیشتر بر همکاری انسان و هوش مصنوعی استوار خواهد بود؛ سامانه‌های هوشمند تحلیل داده و وظایف تکراری را انجام می‌دهند و معلمان زمان بیشتری برای هدایت علمی، خلاقیت و تقویت مهارت‌های انسانی خواهند داشت.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}
function MedicinePart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          هوش مصنوعی با تحلیل داده‌های بالینی، تصاویر پزشکی، اطلاعات ژنتیکی و سوابق بیماران، تشخیص الگوهای دشوار و تصمیم‌گیری سریع‌تر را ممکن کرده است؛ بااین‌حال، ارزش اصلی آن افزایش دقت و کیفیت تصمیم‌گیری پزشک است، نه جایگزینی او.
        </p>

        <p>
          هوش مصنوعی در تصویربرداری پزشکی و آسیب‌شناسی برای شناسایی نشانه‌های اولیه بیماری‌هایی مانند سرطان، بیماری‌های قلبی و اختلالات شبکیه عملکرد قابل‌توجهی دارد و می‌تواند خطاهای ناشی از محدودیت‌های انسانی را کاهش دهد، اما تفسیر نهایی همچنان به قضاوت بالینی و شرایط بیمار نیازمند است.
        </p>

        <p>
          الگوریتم‌های هوش مصنوعی می‌توانند با تحلیل تصاویر، مدل‌سازی بافت و ارائه بازخورد لحظه‌ای، دقت حرکات جراح را افزایش دهند؛ بااین‌حال، جراحی‌های کنونی کاملاً خودکار نیستند و پژوهش‌ها بیشتر بر همکاری انسان و ربات و تقویت توان جراح تمرکز دارند.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-xs">
          <img src={A + 'sarmaghale-medicine-robot.png'} alt="ربات جراح در حال انجام عمل" />
          <figcaption className="sarmaghale-cap"></figcaption>
        </figure>

        <p>
          هوش مصنوعی در کشف دارو با بررسی ترکیبات شیمیایی، پیش‌بینی ساختار پروتئین و شناسایی اهداف درمانی، تعداد گزینه‌های مناسب برای آزمایش را کاهش داده و فرایند کشف دارو را سریع‌تر می‌کند، اما جایگزین آزمایش‌های پیش‌بالینی و کارآزمایی‌های بالینی نیست.
        </p>

        <p>
          پزشکی شخصی‌سازی‌شده با تحلیل یکپارچه داده‌های ژنتیکی، زیستی، سبک زندگی و سوابق پزشکی، امکان انتخاب درمان متناسب با هر بیمار را افزایش می‌دهد و داده‌های ژنومی گسترده نیز می‌توانند درمان بیماری‌های پیچیده را هدفمندتر کنند.
        </p>

        <div className="sarmaghale-callout sarmaghale-callout-rose">
          <span className="sarmaghale-callout-label mono">چالش‌ها</span>
          <p>
            در مقابل این ظرفیت‌ها، حریم خصوصی، سوگیری داده، هزینه زیرساخت و الزامات قانونی و اخلاقی همچنان از چالش‌های اصلی این حوزه‌اند.
          </p>
        </div>

        <div className="sarmaghale-closing">
          <p>
            گسترش هوش مصنوعی در پزشکی به شفافیت، قابلیت اعتماد، امنیت و کیفیت داده وابسته است و حتی مدل‌های دقیق نیز همیشه نمی‌توانند دلیل تصمیم خود را به‌سادگی توضیح دهند. آینده این حوزه بر همکاری پزشکان، متخصصان داده، مهندسان و قانون‌گذاران و حفظ مسئولیت نهایی انسان استوار خواهد بود.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}
function IndustryPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          در کارخانه‌های هوشمند، تفاوت اصلی صرفاً افزایش تعداد حسگرها و ماشین‌های متصل نیست؛ نقطه تعیین‌کننده، تبدیل داده‌های پیوسته تولید به تصمیم عملیاتی است. هوش مصنوعی این حلقه را میان «مشاهده»، «تحلیل» و «اقدام» کوتاه می‌کند: داده‌های تجهیزات، کیفیت محصول، مصرف انرژی و جریان مواد می‌توانند در کنار یکدیگر تحلیل شوند تا تنظیمات فرایند، برنامه تولید یا زمان تعمیر تغییر کند. شبکه «کارخانه‌های فانوس دریایی» مجمع جهانی اقتصاد که در ژوئن ۲۰۲۶ به ۲۳۸ سایت صنعتی پیشرو رسیده است، نشان می‌دهد که کاربردهای موفق از مرحله آزمایش‌های منفرد به سمت هوشمندی سراسری و همکاری انسان و ماشین حرکت می‌کنند. بااین‌حال، «هوشمند» بودن کارخانه به معنای حذف کامل انسان نیست؛ ارزش واقعی زمانی ایجاد می‌شود که سامانه بتواند در محدوده‌ای مشخص پیشنهاد دهد، پیش‌بینی کند یا اقدام کند و مسئولیت تصمیم‌های حساس نیز روشن باقی بماند.
        </p>


        <p>
          یکی از ملموس‌ترین کاربردها، کنترل کیفیت مبتنی بر بینایی ماشین است. دوربین‌های صنعتی همراه با مدل‌های یادگیری عمیق می‌توانند ترک، خراش، مونتاژ نادرست یا ناهنجاری‌هایی را شناسایی کنند که تشخیص آن‌ها با قواعد ثابت دشوار است. اهمیت این تغییر فقط در سرعت بازرسی نیست؛ کنترل کیفیت از یک فعالیت عمدتاً «پس از تولید» به فرایندی نزدیک به زمان واقعی تبدیل می‌شود. اگر الگوی عیب با داده‌های ماشین و شرایط فرایند مرتبط شود، سامانه می‌تواند منشأ احتمالی نقص را نیز آشکار کند و از تولید زنجیره‌ای محصول معیوب جلوگیری شود. پژوهش‌های مروری در حوزه کنترل کیفیت رباتیک، در کنار ظرفیت بالای این رویکرد، بر چالش‌هایی مانند تغییر شرایط محیطی، تنوع محصول و دشواری تضمین عملکرد در محیط واقعی تأکید دارند. در نتیجه، دقت بالا در یک مجموعه‌داده آزمایشگاهی الزاماً به معنای قابلیت اعتماد در خط تولید نیست.
        </p>

        <h2 className="sarmaghale-part-h2">نگهداری پیش‌بینانه و دوقلوی دیجیتال</h2>
        <p>
          نگهداری پیش‌بینانه (Predictive Maintenance) نیز منطق سنتی تعمیرات را تغییر می‌دهد. به‌جای تعمیر پس از خرابی یا سرویس در فواصل زمانی ثابت، مدل‌ها از داده‌هایی مانند ارتعاش، دما، صدا، فشار و جریان الکتریکی برای تشخیص نشانه‌های فرسودگی و برآورد احتمال خرابی استفاده می‌کنند. مرور نظام‌مند پژوهش‌های سال ۲۰۲۵ نشان می‌دهد که ترکیب اینترنت اشیا و یادگیری ماشین می‌تواند پایش برخط و برنامه‌ریزی دقیق‌تر تعمیرات را تقویت کند، اما کمبود داده، دشواری سنجش بازگشت سرمایه و مسائل امنیتی همچنان از موانع مهم‌اند. این محدودیت مهم است: خرابی‌های بحرانی معمولاً رخدادهای کم‌تکرارند و مدل ممکن است دقیقاً برای همان وضعیت‌هایی که بیشترین اهمیت را دارند، داده آموزشی کافی نداشته باشد.
        </p>

        <p>
          در اینجا «دوقلوی دیجیتال (Digital Twin)» به یکی از مسیرهای مهم آینده تبدیل می‌شود؛ نسخه‌ای دیجیتال از تجهیز یا فرایند که با داده واقعی به‌روزرسانی می‌شود و می‌تواند برای شبیه‌سازی سناریوهای خرابی، بهینه‌سازی و نگهداری تجویزی به کار رود. بااین‌حال، یک مرور علمی در سال ۲۰۲۵ نشان می‌دهد فاصله میان نمونه‌های دانشگاهی و استقرار صنعتی هنوز چشمگیر است و موانع سازمانی، یکپارچه‌سازی داده و آمادگی نیروی انسانی گاه از خود الگوریتم دشوارترند. بنابراین آینده این حوزه احتمالاً به مدل‌های ترکیبی وابسته است که دانش مهندسی، قوانین فیزیکی و یادگیری داده‌محور را به هم متصل می‌کنند، نه به سامانه‌های کاملاً جعبه‌سیاه.
        </p>

        <h2 className="sarmaghale-part-h2">ربات‌های صنعتی و همکاری انسان و ماشین</h2>
        <p>
          هم‌زمان، ربات‌های صنعتی نیز از ماشین‌های برنامه‌ریزی‌شده برای حرکات تکراری به سامانه‌هایی با ادراک و سازگاری بیشتر نزدیک می‌شوند. طبق گزارش World Robotics 2025، در سال ۲۰۲۴ حدود ۵۴۲ هزار ربات صنعتی جدید نصب شد و شمار ربات‌های فعال در کارخانه‌های جهان به حدود ۴٫۶۶ میلیون واحد رسید. هوش مصنوعی به این ربات‌ها امکان می‌دهد اشیا را در محیط‌های متغیر تشخیص دهند، مسیر حرکت را تطبیق دهند و در برخی وظایف با انسان همکاری نزدیک‌تری داشته باشند. اما هرچه اختیار تصمیم‌گیری بیشتر شود، مسائل ایمنی، امنیت سایبری، توضیح‌پذیری خطا و مسئولیت نیز جدی‌تر می‌شود.
        </p>

        <div className="sarmaghale-callout">
          <span className="sarmaghale-callout-label mono">مسئله اصلی</span>
          <p>
            مسئله اصلی صنعت دیگر صرفاً «خرید یک مدل هوش مصنوعی» نیست. کارخانه هوشمند به زیرساخت داده، حسگرهای قابل اعتماد، اتصال سامانه‌های قدیمی، مهارت‌های جدید برای مهندسان و سازوکارهای نظارت نیاز دارد.
          </p>
        </div>

        <div className="sarmaghale-closing">
          <p>
            NIST نیز کاربرد هوش مصنوعی در تولید را با فرصت‌هایی در بهره‌وری، ایمنی، کنترل کیفیت و کاهش توقف تجهیزات مرتبط می‌داند. اما تجربه‌های صنعتی نشان می‌دهد مزیت پایدار زمانی شکل می‌گیرد که فناوری در معماری فرایند و سازمان ادغام شود. مسیر پیش‌رو، بیش از کارخانه‌های کاملاً بی‌انسان، به سوی کارخانه‌هایی است که در آن‌ها انسان، ربات و مدل‌های هوشمند نقش‌های متفاوت اما مکمل در مشاهده، تصمیم‌گیری و اجرا بر عهده دارند.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function SwePart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          ورود مدل‌های زبانی و ابزارهای مولد به فرایند توسعه نرم‌افزار، نقش برنامه‌نویس را از نو تعریف کرده است. ابزارهایی مانند GitHub Copilot و دستیارهای مبتنی بر مدل‌های زبانی اکنون می‌توانند در محیط توسعه، بخشی از کد را پیشنهاد دهند، توابع را تکمیل کنند، تست بنویسند، مستندات تولید کنند و حتی در تحلیل خطاهای نرم‌افزاری مشارکت داشته باشند. گستردگی این کاربردها دیگر صرفاً یک روند آزمایشی نیست؛ در پیمایش سال ۲۰۲۵ Stack Overflow، ۸۴ درصد توسعه‌دهندگان اعلام کرده‌اند که از ابزارهای هوش مصنوعی استفاده می‌کنند یا قصد استفاده از آن‌ها را در فرایند توسعه دارند و ۵۱ درصد توسعه‌دهندگان حرفه‌ای استفاده روزانه از این ابزارها را گزارش کرده‌اند. این تغییر نشان می‌دهد که هوش مصنوعی در حال تبدیل‌شدن به یکی از اجزای محیط توسعه نرم‌افزار است، نه صرفاً ابزاری جانبی.
        </p>

        <p>
          یکی از مهم‌ترین کاربردهای فعلی، تولید کد است. برنامه‌نویس می‌تواند با ارائه توضیحی به زبان طبیعی، ساختار یک تابع، کلاس یا حتی بخشی از یک برنامه را دریافت کند و سپس آن را اصلاح و با نیاز پروژه تطبیق دهد. یک آزمایش کنترل‌شده درباره GitHub Copilot نشان داد توسعه‌دهندگانی که به این ابزار دسترسی داشتند، در یک وظیفه مشخص پیاده‌سازی سرور HTTP، ۵۵٫۸ درصد سریع‌تر از گروه کنترل عمل کردند. بااین‌حال، این نتیجه را نمی‌توان به همه پروژه‌ها و شرایط توسعه تعمیم داد؛ پیچیدگی، میزان آشنایی برنامه‌نویس با کد و کیفیت توضیح مسئله، همگی بر میزان سودمندی ابزار تأثیر می‌گذارند.
        </p>

        <p>
          کاربرد مهم دیگر، دیباگ خودکار و کمک به رفع خطاست. مدل‌های جدید می‌توانند پیام خطا، کد معیوب و حتی ساختار یک مخزن نرم‌افزاری را بررسی کرده و برای اصلاح آن پیشنهاد ارائه دهند. شکل پیشرفته‌تر این قابلیت در «عامل‌های مهندسی نرم‌افزار» دیده می‌شود که می‌توانند مسئله را تحلیل کنند، فایل‌های لازم را تغییر دهند و تست‌ها را اجرا کنند. برای سنجش چنین توانایی‌هایی، مجموعه‌هایی مانند SWE-bench توسعه یافته‌اند که حل مسائل واقعی استخراج‌شده از پروژه‌های متن‌باز را ارزیابی می‌کنند. بااین‌حال، پیشرفت در این آزمون‌ها نباید با توانایی حل مستقل مسائل واقعی تولیدی یکسان تلقی شود؛ حتی در سال ۲۰۲۶، OpenAI اعلام کرد که به دلیل مشکلاتی مانند آلودگی داده‌های آموزشی و نقص برخی آزمون‌ها، SWE-bench Verified دیگر معیار مناسبی برای سنجش پیشرفت مدل‌های پیشرفته نیست.
        </p>

        <h2 className="sarmaghale-part-h2">مرزهای اعتماد و بهره‌وری</h2>

        <p>
          این محدودیت به مسئله‌ای بنیادی‌تر منجر می‌شود: کد تولیدشده الزاماً کد درست، امن و قابل نگهداری نیست. در پیمایش ۲۰۲۵ Stack Overflow، ۴۶ درصد توسعه‌دهندگان اعلام کردند که به دقت خروجی ابزارهای هوش مصنوعی اعتماد ندارند، درحالی‌که تنها ۳۳ درصد آن را قابل اعتماد دانستند. همچنین ۶۶ درصد پاسخ‌دهندگان، تولید راه‌حل‌هایی را که «تقریباً درست، اما نه کاملاً درست» هستند، یکی از مهم‌ترین مشکلات دانسته‌اند و ۴۵ درصد گفته‌اند دیباگ‌کردن کد تولیدشده توسط هوش مصنوعی گاهی زمان‌برتر است. بنابراین، مزیت اصلی این ابزارها در حذف کامل نظارت انسانی نیست؛ بلکه در کاهش کارهای تکراری و افزایش سرعت چرخه‌ای است که در آن انسان تولید، بررسی، آزمون و اصلاح را انجام می‌دهد.
        </p>

        <div className="sarmaghale-callout sarmaghale-callout-rose">
          <span className="sarmaghale-callout-label mono">نکته‌ی مهم</span>
          <p>
            در پیمایش ۲۰۲۵ Stack Overflow، <strong>۶۶٪</strong> توسعه‌دهندگان، مشکل اصلی را تولید راه‌حل‌هایی دانستند که «تقریباً درست، اما نه کاملاً درست» هستند — و <strong>۴۵٪</strong> گفتند دیباگ‌کردن کد تولیدشده توسط هوش مصنوعی گاهی زمان‌برتر است.
          </p>
        </div>

        <p>
          حتی درباره بهره‌وری نیز شواهد یکدست نیست. پژوهش METR در سال ۲۰۲۵، که روی ۱۶ توسعه‌دهنده باتجربه و ۲۴۶ وظیفه واقعی در مخازن متن‌باز انجام شد، نشان داد شرکت‌کنندگان در شرایط استفاده از ابزارهای هوش مصنوعی به‌طور متوسط ۱۹ درصد زمان بیشتری صرف کردند. خود پژوهشگران تأکید کرده‌اند که این نتیجه به همه توسعه‌دهندگان و همه انواع کار نرم‌افزاری تعمیم‌پذیر نیست؛ بااین‌حال، اهمیت آن در نشان‌دادن فاصله میان «توانایی فنی مدل» و «بهره‌وری واقعی در محیط کار» است. در مقابل، داده‌های DORA در سال ۲۰۲۵ هوش مصنوعی را بیشتر یک «تقویت‌کننده» می‌داند که نقاط قوت و ضعف موجود در سازمان را تشدید می‌کند؛ بنابراین، کیفیت فرایندهای توسعه، فرهنگ تیمی، معماری نرم‌افزار و شیوه مدیریت پروژه همچنان تعیین‌کننده‌اند.
        </p>

        <h2 className="sarmaghale-part-h2">آینده شغل برنامه‌نویس</h2>

        <p>
          در چنین شرایطی، بحث درباره آینده شغل برنامه‌نویسان بیش از آنکه به حذف یا باقی‌ماندن این شغل محدود شود، به تغییر ماهیت آن مربوط است. وظایفی مانند نوشتن کدهای تکراری، تولید تست‌های اولیه، مستندسازی و جست‌وجوی خطا می‌توانند بیش از گذشته خودکار شوند؛ در مقابل، درک نیازمندی‌ها، طراحی معماری، تصمیم‌گیری درباره trade-offها، ارزیابی امنیت و صحت کد و شناخت زمینه کسب‌وکار اهمیت بیشتری پیدا می‌کند. پیمایش ۲۰۲۵ Stack Overflow نیز نشان می‌دهد ۶۴ درصد توسعه‌دهندگان هنوز هوش مصنوعی را تهدیدی برای شغل خود نمی‌دانند.
        </p>

        <div className="sarmaghale-closing">
          <p>
            از این منظر، برنامه‌نویس آینده لزوماً کسی نیست که سریع‌تر کد تایپ می‌کند، بلکه متخصصی است که می‌تواند مسئله را دقیق تعریف کند، خروجی عامل‌های هوشمند را ارزیابی کند و مسئولیت فنی تصمیم نهایی را بر عهده بگیرد. مسیر تحول مهندسی نرم‌افزار احتمالاً از «نوشتن مستقیم همه کدها» به سمت «هدایت، ارزیابی و یکپارچه‌سازی کدی که بخشی از آن توسط ماشین تولید شده است» حرکت خواهد کرد؛ تغییری که هم مهارت‌های موردنیاز برنامه‌نویسان و هم شیوه آموزش مهندسی نرم‌افزار را تحت تأثیر قرار می‌دهد.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function SecurityPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          یکی از مهم‌ترین کاربردهای هوش مصنوعی در امنیت سایبری، توانایی آن در تحلیل حجم بزرگی از داده‌های امنیتی و شناسایی الگوهایی است که برای روش‌های سنتی دشوار یا زمان‌بر هستند. سامانه‌های تشخیص نفوذ (IDS)، سامانه‌های تحلیل رفتار کاربر و موجودیت (UEBA) و ابزارهای تشخیص و پاسخ نقطه پایانی (EDR) می‌توانند با استفاده از یادگیری ماشین، رفتارهای عادی شبکه و سامانه‌ها را مدل‌سازی کرده و انحراف از این الگوها را به‌عنوان نشانه‌ای از فعالیت مشکوک شناسایی کنند. اهمیت این قابلیت زمانی بیشتر مشخص می‌شود که بدانیم گزارش ENISA در سال ۲۰۲۵، با بررسی ۴۸۷۵ رخداد در فاصله ژوئیه ۲۰۲۴ تا ژوئن ۲۰۲۵، همچنان بدافزار، باج‌افزار، حملات علیه داده‌ها و تهدیدهای زنجیره تأمین را در میان تهدیدهای اصلی قرار داده است.
        </p>

        <p>
          در تشخیص حملات، مزیت اصلی هوش مصنوعی تنها سرعت بیشتر نیست؛ بلکه امکان ترکیب هم‌زمان نشانه‌های متعدد و کشف ارتباط میان رخدادهایی است که ممکن است به‌صورت جداگانه بی‌اهمیت به نظر برسند. برای نمونه، تغییر غیرمعمول در الگوی ورود یک کاربر، ارتباط با یک نشانی اینترنتی مشکوک و اجرای فرایندی ناشناخته می‌تواند در کنار یکدیگر احتمال نفوذ را افزایش دهد. چنین تحلیلی به تیم‌های امنیتی کمک می‌کند از رویکرد کاملاً واکنشی فاصله بگیرند و بخشی از فرایند شناسایی تهدید را به‌صورت پیش‌نگر انجام دهند. با این حال، مدل‌های یادگیری ماشین به کیفیت داده‌های آموزشی وابسته‌اند و افزایش هشدارهای کاذب، داده‌های ناقص یا تغییر مداوم رفتار مهاجمان می‌تواند عملکرد آن‌ها را کاهش دهد. بنابراین، هوش مصنوعی جایگزین تحلیلگر امنیتی نیست، بلکه ابزاری برای افزایش ظرفیت تحلیل و اولویت‌بندی رخدادهاست.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-xs">
          <img src={A + 'sarmaghale-security-robot.png'} alt="ربات نگهبان امنیت سایبری با سپر و نیزه" />
        </figure>

        <p>
          این مسئله در مقابله با بدافزار نیز اهمیت ویژه‌ای دارد. روش‌های سنتی شناسایی بدافزار تا حد زیادی بر امضاهای شناخته‌شده تکیه می‌کنند، درحالی‌که مدل‌های یادگیری ماشین می‌توانند ویژگی‌های رفتاری و ساختاری فایل‌ها و فرایندها را نیز بررسی کنند. در نتیجه، امکان شناسایی گونه‌های جدید یا تغییر‌یافته بدافزار، حتی در شرایطی که امضای مشخصی برای آن‌ها وجود ندارد، افزایش می‌یابد.
        </p>

        <div className="sarmaghale-callout sarmaghale-callout-rose">
          <span className="sarmaghale-callout-label mono">تهدید مهم</span>
          <p>
            مهاجمان نیز با مبهم‌سازی کد، تغییر رفتار و دست‌کاری ورودی‌های مدل تلاش می‌کنند این سامانه‌ها را فریب دهند. گزارش NIST در سال ۲۰۲۵، حملاتی مانند <strong>evasion</strong> و <strong>poisoning</strong> را از تهدیدهای مهم علیه سامانه‌های یادگیری ماشین معرفی می‌کند و بر ضرورت درنظرگرفتن امنیت در تمام چرخه عمر مدل تأکید دارند.
          </p>
        </div>

        <h2 className="sarmaghale-part-h2">کاربرد در امنیت شبکه</h2>

        <p>
          در امنیت شبکه، هوش مصنوعی می‌تواند در تحلیل جریان‌های ارتباطی، کشف ناهنجاری، شناسایی الگوهای حملات توزیع‌شده و اولویت‌بندی رخدادها به کار گرفته شود. ارزش این رویکرد در محیط‌هایی با حجم بالای ترافیک بیشتر است؛ زیرا بررسی دستی همه رخدادها عملاً امکان‌پذیر نیست. با وجود این، اعتماد بیش از حد به تصمیم خودکار می‌تواند خطرناک باشد؛ یک مدل نادرست ممکن است ترافیک مشروع را مسدود یا یک حمله واقعی را نادیده بگیرد. به همین دلیل، ترکیب مدل‌های هوشمند با کنترل‌های امنیتی کلاسیک، نظارت انسانی و سازوکارهای پاسخ‌گویی، رویکرد واقع‌بینانه‌تری محسوب می‌شود.
        </p>

        <h2 className="sarmaghale-part-h2">هوش مصنوعی؛ هم سپر، هم نیزه</h2>

        <p>
          در سوی دیگر، خود هوش مصنوعی به ابزار حمله نیز تبدیل شده است. مهاجمان از مدل‌های زبانی برای شناسایی هدف، تولید محتوای فیشینگ، نوشتن و رفع اشکال کد و پشتیبانی از مراحل مختلف عملیات استفاده می‌کنند. ENISA در گزارش ۲۰۲۵ خود، افزایش نقش AI در بهینه‌سازی فعالیت‌های مخرب و استفاده از مدل‌های زبانی برای تقویت فیشینگ و مهندسی اجتماعی را گزارش کرده است. گزارش Google Threat Intelligence نیز نشان می‌دهد که در سال ۲۰۲۵ نمونه‌هایی از بدافزارهایی شناسایی شده‌اند که از مدل‌های زبانی در زمان اجرا برای تولید اسکریپت، مبهم‌سازی کد و تغییر رفتار استفاده می‌کنند؛ هرچند این قابلیت‌ها هنوز نوظهور و محدود هستند.
        </p>

        <div className="sarmaghale-closing">
          <p>
            از این منظر، آینده امنیت سایبری بیشتر به یک رقابت میان سامانه‌های هوشمند دفاعی و تهاجمی شباهت خواهد داشت. در چنین شرایطی، توسعه مدل‌های قابل‌اعتماد، آزمون مداوم در برابر حملات خصمانه، حفاظت از داده‌های آموزشی و نظارت انسانی اهمیت بیشتری پیدا می‌کند. NIST نیز با تدوین چارچوبی برای حملات یادگیری ماشین خصمانه، بر همین ضرورت تأکید دارد. در نتیجه، مسئله اصلی دیگر صرفاً «استفاده از هوش مصنوعی برای امنیت» نیست؛ بلکه ایجاد زیرساختی است که در آن خودِ سامانه‌های هوشمند نیز در برابر سوءاستفاده و دست‌کاری مقاوم باشند.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function BusinessPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          تصمیم‌گیری اقتصادی همواره به کیفیت داده و سرعت تحلیل وابسته بوده است. گسترش سامانه‌های مبتنی بر هوش مصنوعی این رابطه را دگرگون کرده و امکان تحلیل حجم عظیمی از داده‌های ساخت‌یافته و غیرساخت‌یافته را در زمانی کوتاه فراهم کرده است. در نتیجه، بسیاری از سازمان‌ها از این فناوری صرفاً برای کاهش هزینه‌ها استفاده نمی‌کنند، بلکه آن را به ابزاری برای افزایش دقت تصمیم‌گیری، پیش‌بینی روندها و طراحی مدل‌های کسب‌وکار جدید تبدیل کرده‌اند. گزارش‌های بین‌المللی نشان می‌دهد که موج جدید هوش مصنوعی، به‌ویژه مدل‌های زبانی بزرگ و هوش مصنوعی مولد (Generative AI)، به مرحله استفاده عملی در شرکت‌ها رسیده و تمرکز از آزمایش‌های اولیه به ایجاد ارزش اقتصادی منتقل شده است.
        </p>

        <h2 className="sarmaghale-part-h2">تحلیل بازار؛ از داده تا تصمیم</h2>

        <p>
          یکی از مهم‌ترین کاربردهای هوش مصنوعی در تحلیل بازار است. شرکت‌ها با بهره‌گیری از الگوریتم‌های یادگیری ماشین (Machine Learning) می‌توانند رفتار مشتریان، الگوهای خرید، تغییرات تقاضا و حتی احساسات کاربران در شبکه‌های اجتماعی را تحلیل کنند. این تحلیل‌ها امکان پیش‌بینی روندهای بازار، بهینه‌سازی قیمت‌گذاری و شخصی‌سازی محصولات و خدمات را فراهم می‌کند.
        </p>

        <div className="sarmaghale-callout sarmaghale-callout-rose">
          <span className="sarmaghale-callout-label mono">هشدار</span>
          <p>
            کیفیت این پیش‌بینی‌ها به کیفیت داده‌های ورودی وابسته است و داده‌های ناقص یا دارای سوگیری می‌توانند تصمیم‌های مدیریتی را منحرف کنند. به همین دلیل، مدیریت داده و شفافیت مدل‌ها به یکی از دغدغه‌های اصلی سازمان‌ها تبدیل شده است.
          </p>
        </div>

        <h2 className="sarmaghale-part-h2">اتوماسیون سازمانی؛ فراتر از وظایف تکراری</h2>

        <p>
          هم‌زمان، اتوماسیون شرکت‌ها از مرحله خودکارسازی فعالیت‌های تکراری فراتر رفته است. در بسیاری از سازمان‌ها، هوش مصنوعی در مدیریت زنجیره تأمین، برنامه‌ریزی تولید، پیش‌بینی تقاضا، پاسخ‌گویی به مشتریان، کنترل کیفیت و تحلیل اسناد به کار گرفته می‌شود. این تحول تنها به کاهش هزینه‌های عملیاتی محدود نیست؛ بلکه موجب می‌شود کارکنان زمان بیشتری را به فعالیت‌های خلاقانه و تصمیم‌های راهبردی اختصاص دهند.
        </p>

        <p>
          با وجود این، تجربه شرکت‌های پیشرو نشان داده است که موفقیت این فرایند بیش از آنکه به خود فناوری وابسته باشد، به بازطراحی فرایندهای سازمانی، آموزش نیروی انسانی و ایجاد سازوکارهای نظارتی مناسب بستگی دارد. در غیر این صورت، حتی پیشرفته‌ترین سامانه‌های هوش مصنوعی نیز نمی‌توانند ارزش اقتصادی پایداری ایجاد کنند.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-md">
          <img src={A + 'sarmaghale-business-bank.png'} alt="شعبه بانک هوشمند با همکاری انسان و ربات" />
        </figure>

        <h2 className="sarmaghale-part-h2">بانکداری هوشمند؛ پیشرو در پذیرش</h2>

        <p>
          بخش مالی از نخستین حوزه‌هایی بوده که به‌طور گسترده از هوش مصنوعی بهره گرفته است. در بانکداری هوشمند، کاربردهایی مانند ارزیابی اعتبار مشتریان، کشف تقلب، مدیریت ریسک، احراز هویت دیجیتال، خدمات مشاوره مالی و پاسخ‌گویی خودکار به مشتریان به سرعت در حال گسترش هستند. هوش مصنوعی می‌تواند الگوهایی را در تراکنش‌های مالی شناسایی کند که تشخیص آن‌ها برای انسان دشوار یا زمان‌بر است و از این طریق امنیت پرداخت‌ها را افزایش دهد.
        </p>

        <p>
          با این حال، نهادهای ناظر هشدار داده‌اند که اتکای بیش از حد به مدل‌های پیچیده و غیرشفاف، وابستگی به ارائه‌دهندگان بزرگ فناوری و احتمال خطا یا سوگیری الگوریتمی می‌تواند ریسک‌های جدیدی برای ثبات مالی ایجاد کند. ازاین‌رو، موضوعاتی مانند حاکمیت داده، قابلیت توضیح‌پذیری مدل‌ها و نظارت انسانی به بخشی جدایی‌ناپذیر از بانکداری هوشمند تبدیل شده‌اند.
        </p>

        <h2 className="sarmaghale-part-h2">سرمایه‌گذاری و بورس؛ تصمیم ترکیبی</h2>

        <p>
          سرمایه‌گذاری و بورس نیز شاهد تحول قابل توجهی بوده‌اند. صندوق‌های سرمایه‌گذاری، شرکت‌های مدیریت دارایی و معامله‌گران از مدل‌های هوش مصنوعی برای تحلیل داده‌های مالی، اخبار، گزارش‌های شرکت‌ها و شاخص‌های اقتصادی استفاده می‌کنند تا فرصت‌های سرمایه‌گذاری را سریع‌تر شناسایی کنند. با وجود پیشرفت این ابزارها، بیشتر پژوهش‌ها تأکید دارند که هوش مصنوعی هنوز جایگزین کامل تحلیل انسانی نشده است.
        </p>

        <p>
          بازارهای مالی تحت تأثیر عوامل سیاسی، اجتماعی و رویدادهای غیرمنتظره قرار دارند؛ عواملی که پیش‌بینی آن‌ها صرفاً بر اساس داده‌های تاریخی امکان‌پذیر نیست. از این رو، بسیاری از متخصصان رویکرد «تصمیم‌گیری ترکیبی» را پیشنهاد می‌کنند؛ رویکردی که در آن هوش مصنوعی وظیفه تحلیل و پردازش داده را بر عهده دارد و تصمیم نهایی با نظارت کارشناسان اتخاذ می‌شود.
        </p>

        <div className="sarmaghale-closing">
          <p>
            روندهای کنونی نشان می‌دهد که نقش هوش مصنوعی در اقتصاد آینده بیش از آنکه در حذف انسان خلاصه شود، در افزایش توان تحلیل، بهبود بهره‌وری و ایجاد مدل‌های جدید کسب‌وکار معنا پیدا می‌کند. تحقق این ظرفیت، مستلزم سرمایه‌گذاری در زیرساخت‌های داده، تدوین چارچوب‌های حقوقی و اخلاقی، ارتقای مهارت نیروی کار و ایجاد توازن میان نوآوری و مدیریت ریسک خواهد بود؛ مسیری که کیفیت حکمرانی فناوری را به یکی از عوامل تعیین‌کننده رقابت‌پذیری اقتصادها تبدیل می‌کند.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function CreativePart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          ورود هوش مصنوعی مولد به صنایع خلاق، پارادایم‌های سنتی تولید محتوا را به شکلی بنیادی دگرگون کرده است. برخلاف تصور اولیه که این فناوری را جایگزینی برای هنرمند می‌پنداشت، شواهد و تجربه‌های عملی در سال‌های اخیر نشان می‌دهد که هوش مصنوعی بیشتر در قامت یک «دستیار خلاق» یا «کمک‌خلبان» (Co-pilot) ظاهر شده است. این گذار نه صرفاً در ابزارهای تکنولوژیک، بلکه در بازتعریف نقش خالق اثر متبلور شده است؛ جایی که فرایند «آفرینش» از اجرای فنی محض، به سمت «هدایت» و «تألیف مفهومی» میل می‌کند.
        </p>

        <p>
          در حوزه تولید تصویر و موسیقی، ابزارهای هوش مصنوعی با کاهش هزینه‌های تولید و زمان پردازش، امکان تجربه‌گرایی سریع را فراهم کرده‌اند. نویسندگان و هنرمندان دیجیتال اکنون قادرند ایده‌های اولیه خود را در چند ثانیه به خروجی‌های بصری یا صوتی تبدیل کنند؛ خروجی‌هایی که پیش‌تر نیازمند ساعت‌ها کار دستی در نرم‌افزارهای پیچیده بودند.
        </p>

        <p>
          با این حال، در صنعت نویسندگی، هوش مصنوعی نقشی فراتر از یک ابزارِ سرعت‌بخش ایفا می‌کند. این فناوری با قابلیتِ ساختاردهی به پیرنگ (Plot)، ایده‌پردازی و حتی پیشنهاد لحن‌های روایی متفاوت، به نویسندگان کمک می‌کند تا بن‌بست‌های ذهنی را پشت سر بگذارند و نسخه‌های متعددی از یک اثر را پیش از نهایی‌سازی آزمایش کنند. در واقع، بارِ فنیِ «پیاده‌سازی» کاهش یافته و ارزشِ «ایده‌پردازی» و «گزینشگری» هنری دوچندان شده است.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-xs">
          <img src={A + 'sarmaghale-creative-camera.png'} alt="دوربین فیلم‌برداری قدیمی — نمادی از گذار صنعت رسانه" />
        </figure>

        <h2 className="sarmaghale-part-h2">سینما و جلوه‌های ویژه؛ ضرورت تجاری</h2>

        <p>
          در صنعت سینما و جلوه‌های ویژه (VFX)، این تغییرات به یک ضرورت تجاری تبدیل شده‌اند. ادغام هوش مصنوعی در گردش‌کارهای (Workflow) پس‌تولید، نه تنها فرآیندهای رندرینگ و تولید تصویر را بهینه کرده، بلکه مرزهای میان «فیلم‌های با موضوع هوش مصنوعی» و «فیلم‌های ساخته‌شده با ابزارهای هوش مصنوعی» را شفاف‌تر کرده است. در تولیدات مدرن، استفاده از الگوریتم‌های هوش مصنوعی برای شبیه‌سازی بافت، نورپردازی و حتی مدل‌سازی سه بعدی، به استودیوها اجازه می‌دهد تا با بودجه‌های محدودتر، آثار بصری خیره‌کننده‌ای خلق کنند.
        </p>

        <p>
          این روند به ظهور پدیده‌هایی نظیر «جشنواره‌های فیلم هوش مصنوعی» منجر شده است که در آن، محور اصلی نه صرفاً داستان، بلکه نوآوری در نحوه به‌کارگیری این ابزارها برای بازتعریف استانداردهای بصری سینماست.
        </p>

        <h2 className="sarmaghale-part-h2">چالش‌های حقوقی؛ میدان نابرابر کپی‌رایت</h2>

        <p>
          با وجود این پیشرفت‌های فنی، چالش‌های حقوقی به‌ویژه در زمینه کپی‌رایت، همچنان مهم‌ترین مانع برای پذیرش گسترده این فناوری در بدنه رسمی هنر باقی مانده است. در حال حاضر، اجماع جهانی بر سر مالکیت معنوی آثار تولیدشده توسط هوش مصنوعی وجود ندارد. دفاتر حق تکثیر در ایالات متحده و اتحادیه اروپا، رویکردی «انسان‌محور» اتخاذ کرده‌اند که طبق آن، تنها آثار دارای «مداخله انسانیِ قابل توجه» مشمول حمایت‌های کپی‌رایت می‌شوند. این بدین معناست که خروجی‌های صرفاً تولیدشده توسط مدل‌های مولد، در خلأ قانونی قرار دارند.
        </p>

        <div className="sarmaghale-callout">
          <span className="sarmaghale-callout-label mono">نگاه تطبیقی</span>
          <p>
            در مقابل رویکرد انسان‌محور آمریکا و اروپا، نظام‌های حقوقی موسوم به «کامان‌لا» (Common Law) مانند بریتانیا، آثاری که توسط رایانه تولید می‌شوند را در صورت وجود شرایطی خاص تحت حمایت قرار می‌دهند و تألیف آن را به شخصِ مسئولِ تدارکِ تولید اثر نسبت می‌دهند. کشورهایی نظیر اوکراین نیز با تدوین حقوقی خاص (Sui Generis) برای آثار هوش مصنوعی، تلاش کرده‌اند راهکاری میانه بیابند.
          </p>
        </div>

        <p>
          این تضاد رویه‌ها، پیچیدگی‌های حقوقی بسیاری را برای شرکت‌های رسانه‌ای و هنرمندان در سطح بین‌المللی ایجاد کرده است.
        </p>

        <h2 className="sarmaghale-part-h2">آینده؛ هم‌خلاقی با ماشین</h2>

        <div className="sarmaghale-closing">
          <p>
            آینده این حوزه در گروِ تعیین تکلیف همین ابهامات حقوقی و نحوه هم‌افزایی میان خلاقیت انسانی و قدرت پردازشی ماشین است. آنچه در این میان حائز اهمیت است، تغییر مهارت‌های مورد نیاز برای هنرمندان آینده است؛ مهارت‌هایی که دیگر نه بر تسلط صرف بر ابزارهای تولید، بلکه بر توانایی هدایت هوش مصنوعی، اخلاق در استفاده از داده‌های آموزشی و درک عمیق از مالکیت معنوی استوار خواهد بود. گذار از دورانِ «ابزارهای ساده» به عصر «هم‌خلاقی با ماشین»، در حالی رخ می‌دهد که مرزهای میان واقعیت و بازنمایی دیجیتال بیش از هر زمان دیگری در حال محو شدن است.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function SocialPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          تغییر پارادایم در شبکه‌های اجتماعی، از مدل‌های مبتنی بر «شبکه ارتباطی» (Social Graph) به مدل‌های «مبتنی بر علاقه» (Interest Graph)، مدیون پیاده‌سازی هوش مصنوعی در موتورهای توصیه‌گر (Recommendation Systems) است. پلتفرم‌های مدرن، دیگر صرفاً بستری برای تبادل پیام نیستند؛ بلکه به موتورهای پردازش کلان‌داده تبدیل شده‌اند که با بهینه‌سازی مداوم نرخ تعامل کاربر (Engagement Rate)، محتوا را به شکلی سفارشی‌سازی‌شده ارائه می‌دهند.
        </p>

        <p>
          این الگوریتم‌ها با تحلیل رفتارهای پیشین، زمان صرف‌شده بر روی پست‌ها و واکنش‌های هیجانی، محتوایی را اولویت‌بندی می‌کنند که بیشترین احتمال برای حفظ حضور کاربر در پلتفرم را دارد. این رویکرد، در حالی که دسترسی به اطلاعاتِ مرتبط را تسهیل کرده، منجر به شکل‌گیری «حباب‌های فیلتر» (Filter Bubbles) و اتاق‌های پژواک (Echo Chambers) شده است که در آن، تنوع دیدگاه‌ها به نفع تقویت سوگیری‌های شناختی کاربر محدود می‌شود.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-sm">
          <img src={A + 'sarmaghale-social-logos.png'} alt="لوگوهای پلتفرم‌های اجتماعی" />
        </figure>

        <h2 className="sarmaghale-part-h2">هم‌افزایی هوش مصنوعی مولد با تولید محتوا</h2>

        <p>
          هم‌افزایی هوش مصنوعی مولد با این زیرساخت‌ها، فرایند «تولید محتوا» را دچار تحولی بنیادین کرده است. ابزارهای هوش مصنوعی اکنون قادرند در مقیاسی صنعتی، متون، تصاویر و ویدیوهای شخصی‌سازی‌شده تولید کنند. این «دموکراتیزه شدن» خلاقیت، فرصتی برای ابراز ایده‌ها فراهم آورده است، اما در عین حال، باعث اشباع فضای دیجیتال از محتواهایی شده که مرز میان اصالت انسانی و بازتولید الگوریتمیک را مخدوش می‌کنند. مدل‌های زبانی بزرگ (LLM) به تولیدکنندگان اجازه می‌دهند تا بدون نیاز به نیروی کار انسانی گسترده، جریان‌های خبری یا تبلیغاتیِ بی‌پایانی ایجاد کنند که در آن «کمیت» به سادگی بر «کیفیت» پیشی می‌گیرد.
        </p>

        <h2 className="sarmaghale-part-h2">اینفلوئنسرهای مجازی؛ مرز شبیه‌سازی و واقعیت</h2>

        <figure className="sarmaghale-fig sarmaghale-fig-xs">
          <img src={A + 'sarmaghale-social-cyborg.png'} alt="سایبورگ در حال تولید محتوا با موبایل" />
        </figure>

        <p>
          همگام با این تحولات، ظهور «اینفلوئنسرهای مجازی» (Virtual Influencers) نمونه‌ای از ادغام هوش مصنوعی در ساختارهای بازاریابی و فرهنگ دیجیتال است. این شخصیت‌های کاملاً سنتتیک که توسط شبکه‌های عصبی و موتورهای گرافیکی طراحی شده‌اند، برخلاف همتایان انسانی خود، در دسترس، بدون خطای رفتاری و در کنترل کاملِ برندها هستند. آن‌ها با ایجاد روابط شبه‌اجتماعی (Parasocial Relationships) با مخاطبان، مرزهای واقعیت و شبیه‌سازی را در ذهن کاربر جابه‌جا کرده‌اند. این پدیده اگرچه از نظر اقتصادی کارآمد است، اما پرسش‌های اخلاقی مهمی را درباره شفافیت و مسئولیت‌پذیری در فضای مجازی ایجاد کرده است.
        </p>

        <h2 className="sarmaghale-part-h2">جعل عمیق؛ جنگ تسلیحات تشخیص و تولید</h2>

        <div className="sarmaghale-callout sarmaghale-callout-rose">
          <span className="sarmaghale-callout-label mono">هشدار</span>
          <p>
            چالش‌برانگیزترین بُعد این تحولات، توسعه فناوری‌های «جعل عمیق» (Deepfake) است. الگوریتم‌های یادگیری عمیق، به‌ویژه شبکه‌های مولد رقابتی (GAN)، اکنون می‌توانند ویدیوها و صداهایی تولید کنند که تشخیص جعلی بودن آن‌ها برای چشم و گوش انسان بسیار دشوار است.
          </p>
        </div>

        <p>
          این فناوری که در ابتدا برای مقاصد خلاقانه در صنعت سرگرمی توسعه یافته بود، اکنون به ابزاری قدرتمند برای انتشار اطلاعات نادرست، دستکاری افکار عمومی و نقض حریم خصوصی تبدیل شده است. برخلاف گذشته که جعل محتوا نیازمند تخصص فنی سطح بالا بود، اکنون ابزارهای مبتنی بر هوش مصنوعی، دسترسی به تولید چنین محتواهایی را برای کاربران عادی نیز ممکن ساخته‌اند. این «جنگ میان تولیدکنندگان جعل و سیستم‌های تشخیص» (Detector-Generator Arms Race)، به چالش اصلی امنیت داده‌ها در پلتفرم‌های اجتماعی تبدیل شده و اعتماد عمومی به شواهد بصری و شنیداری را به شدت متزلزل کرده است.
        </p>

        <div className="sarmaghale-closing">
          <p>
            در نهایت، آنچه در مواجهه با این فناوری‌ها ضرورت می‌یابد، گذار از «مصرف منفعلانه» به «سواد الگوریتمیک» است. هوش مصنوعی در شبکه‌های اجتماعی تنها ابزاری برای بهینه‌سازی محتوا نیست؛ بلکه عاملی است که ساختارِ تجربه کاربری و نحوه تعاملات جمعی ما را بازتعریف می‌کند. شناخت مکانیزم‌های حاکم بر این سیستم‌ها، نه تنها برای سیاست‌گذاران، بلکه برای کاربران به منظور حفظ عاملیت در مواجهه با محتوای هدایت‌شده، ضرورتی اجتناب‌ناپذیر است.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function TransportPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          در حمل‌ونقل، ترکیب یادگیری ماشین، بینایی ماشین، داده‌های لحظه‌ای و ارتباطات هوشمند، تصمیم‌گیری درباره جاده، ترافیک و ناوگان را به هسته سامانه‌های حمل‌ونقل هوشمند تبدیل کرده است.
        </p>

        <h2 className="sarmaghale-part-h2">خودروهای خودران؛ وعده‌ای که محتاطانه پیش می‌رود</h2>

        <p>
          خودروهای خودران با حسگرهایی مانند LiDAR، رادار، دوربین و موقعیت‌یابی، محیط را به‌صورت لحظه‌ای تحلیل و درباره مسیر و ایمنی تصمیم می‌گیرند و شرکت‌هایی مانند Waymo، Mercedes-Benz و Baidu بهره‌برداری محدود از این فناوری را آغاز کرده‌اند؛ بااین‌حال، زیرساخت، قانون، تعامل با رانندگان، اعتماد عمومی و شرایط غیرعادی همچنان از محدودیت‌های اصلی این حوزه‌اند.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-sm">
          <img src={A + 'sarmaghale-transport-car.png'} alt="خودروی مفهومی هوشمند" />
        </figure>

        <h2 className="sarmaghale-part-h2">مدیریت هوشمند ترافیک</h2>

        <p>
          مدیریت هوشمند ترافیک با تحلیل داده‌های دوربین، حسگر، GPS و آب‌وهوا می‌تواند جریان ترافیک را پیش‌بینی و زمان‌بندی چراغ‌ها را به‌صورت پویا تنظیم کند تا زمان انتظار، مصرف سوخت و آلایندگی کاهش یابد و واکنش به رخدادها سریع‌تر شود؛ یادگیری تقویتی نیز یکی از روش‌های امیدواربخش این حوزه است.
        </p>

        <h2 className="sarmaghale-part-h2">پهپادها؛ چشم‌های هوشمند بر فراز شهر</h2>

        <figure className="sarmaghale-fig sarmaghale-fig-xs">
          <img src={A + 'sarmaghale-transport-drone.png'} alt="پهپاد مجهز به دوربین" />
        </figure>

        <p>
          پهپادهای مجهز به بینایی ماشین می‌توانند ترافیک، تخلفات، وضعیت راه و خسارت ناشی از حوادث را به‌سرعت ارزیابی کنند و در شرایط بحرانی و مناطق صعب‌العبور به جمع‌آوری داده بپردازند؛ بااین‌حال، ظرفیت باتری، شرایط آب‌وهوایی، حریم خصوصی و مقررات از محدودیت‌های مهم این فناوری هستند.
        </p>

        <h2 className="sarmaghale-part-h2">شبکه‌های متصل؛ فراتر از خودرو</h2>

        <div className="sarmaghale-callout">
          <span className="sarmaghale-callout-label mono">نگاه سیستمی</span>
          <p>
            با اتصال خودروها، چراغ‌ها، حسگرها، مراکز کنترل، حمل‌ونقل عمومی و کاربران، امکان پیش‌بینی تقاضا، بهینه‌سازی مسیر، مدیریت پارکینگ و لجستیک و کاهش مصرف انرژی فراهم می‌شود؛ تحقق این هدف به زیرساخت ارتباطی، استانداردهای تبادل داده، امنیت سایبری و قوانین مشخص درباره مسئولیت نیاز دارد.
          </p>
        </div>

        <div className="sarmaghale-closing">
          <p>
            آینده حمل‌ونقل هوشمند بیشتر بر همکاری انسان، زیرساخت هوشمند و AI استوار خواهد بود و موفقیت آن، علاوه بر دقت الگوریتم‌ها، به اعتماد عمومی و آمادگی شهرها وابسته است.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function AgriPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          کشاورزی و مدیریت محیط‌زیست بیش از بسیاری از حوزه‌های دیگر به داده‌های پراکنده، شرایط متغیر و تصمیم‌گیری در زمان مناسب وابسته‌اند. در چنین بستری، هوش مصنوعی با ترکیب داده‌های حاصل از حسگرها، تصاویر ماهواره‌ای، پهپادها و پیش‌بینی‌های هواشناسی، امکان تصمیم‌گیری دقیق‌تر و مبتنی بر شواهد را فراهم کرده است. اهمیت این تحول تنها در افزایش بهره‌وری نیست، بلکه در مدیریت پایدار منابع طبیعی و کاهش فشار بر اکوسیستم‌ها نیز نمود پیدا می‌کند.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-lg">
          <img src={A + 'sarmaghale-agri-farm.png'} alt="مزرعه هوشمند با پهپاد، ربات و تحلیل داده" />
        </figure>

        <h2 className="sarmaghale-part-h2">کشاورزی دقیق؛ هر بخش مزرعه، جداگانه</h2>

        <p>
          یکی از مهم‌ترین کاربردهای این فناوری، کشاورزی دقیق (Precision Agriculture) است. در این رویکرد، مزرعه به‌عنوان مجموعه‌ای یکنواخت در نظر گرفته نمی‌شود، بلکه هر بخش آن بر اساس ویژگی‌های خاک، رطوبت، وضعیت گیاه و احتمال بروز آفات به‌صورت مستقل تحلیل می‌شود. الگوریتم‌های یادگیری ماشین با تحلیل تصاویر چندطیفی و داده‌های میدانی، کمبود مواد غذایی، تنش آبی یا آغاز بیماری‌های گیاهی را پیش از آنکه با چشم قابل مشاهده باشند، شناسایی می‌کنند. نتیجه این فرایند، مصرف هدفمند کود، سم و سایر نهاده‌های کشاورزی است که علاوه بر کاهش هزینه‌های تولید، آلودگی خاک و منابع آب را نیز محدود می‌کند.
        </p>

        <h2 className="sarmaghale-part-h2">مدیریت مصرف آب؛ حیاتی‌ترین منبع</h2>

        <p>
          در همین چارچوب، مدیریت مصرف آب به یکی از مهم‌ترین عرصه‌های استفاده از هوش مصنوعی تبدیل شده است. بخش کشاورزی بزرگ‌ترین مصرف‌کننده آب شیرین در جهان است و افزایش خشکسالی، تغییر الگوی بارش و رقابت میان بخش‌های مختلف مصرف، ضرورت استفاده بهینه از این منبع را دوچندان کرده است. سامانه‌های هوشمند با ترکیب اطلاعات حسگرهای رطوبت خاک، تصاویر ماهواره‌ای، پیش‌بینی وضعیت جوی و مدل‌های تبخیر و تعرق (Evapotranspiration)، زمان و میزان مناسب آبیاری را پیشنهاد می‌کنند.
        </p>

        <p>
          چنین سامانه‌هایی از آبیاری بیش از نیاز جلوگیری کرده و در عین حال مانع کاهش عملکرد محصول می‌شوند. بررسی‌های اخیر نیز نشان می‌دهد که ادغام هوش مصنوعی با سامانه‌های آبیاری هوشمند می‌تواند بهره‌وری مصرف آب را افزایش داده و تاب‌آوری کشاورزی را در برابر کم‌آبی بهبود بخشد.
        </p>

        <h2 className="sarmaghale-part-h2">پایش جنگل‌ها و اکوسیستم‌ها</h2>

        <p>
          نقش هوش مصنوعی تنها به زمین‌های کشاورزی محدود نیست و در پایش جنگل‌ها نیز کاربرد گسترده‌ای یافته است. تحلیل خودکار تصاویر ماهواره‌ای و داده‌های سنجش از دور، امکان شناسایی سریع تغییرات پوشش گیاهی، جنگل‌زدایی، آتش‌سوزی‌های اولیه و حتی برخی فعالیت‌های غیرقانونی مانند قطع درختان را فراهم می‌کند. در بسیاری از پروژه‌های حفاظت از منابع طبیعی، مدل‌های یادگیری عمیق با مقایسه تصاویر ثبت‌شده در بازه‌های زمانی مختلف، تغییرات را با دقت بیشتری نسبت به روش‌های سنتی آشکار می‌سازند. این قابلیت، سرعت واکنش نهادهای مسئول را افزایش داده و از گسترش خسارت‌های زیست‌محیطی جلوگیری می‌کند.
        </p>

        <h2 className="sarmaghale-part-h2">پیش‌بینی تغییرات اقلیمی</h2>

        <p>
          هوش مصنوعی همچنین به ابزاری مهم برای پیش‌بینی تغییرات اقلیمی و تحلیل پیامدهای آن بر کشاورزی و محیط‌زیست تبدیل شده است. مدل‌های یادگیری ماشین می‌توانند حجم عظیمی از داده‌های اقلیمی، تصاویر ماهواره‌ای و اطلاعات تاریخی را تحلیل کرده و الگوهای پیچیده‌ای را استخراج کنند که در مدل‌های سنتی به‌سادگی قابل شناسایی نیستند. این مدل‌ها در پیش‌بینی وقوع خشکسالی، سیلاب، موج‌های گرما و تغییرات عملکرد محصولات کشاورزی نقش مکمل مدل‌های فیزیکی اقلیم ایفا می‌کنند.
        </p>

        <div className="sarmaghale-callout">
          <span className="sarmaghale-callout-label mono">نقش مکمل، نه جایگزین</span>
          <p>
            بسیاری از پژوهشگران تأکید می‌کنند که هوش مصنوعی جایگزین مدل‌های اقلیمی نیست، بلکه دقت و سرعت تحلیل آن‌ها را افزایش می‌دهد و کیفیت پیش‌بینی به کیفیت داده‌های ورودی وابسته است.
          </p>
        </div>

        <h2 className="sarmaghale-part-h2">چالش‌ها؛ فراتر از الگوریتم</h2>

        <div className="sarmaghale-callout sarmaghale-callout-rose">
          <span className="sarmaghale-callout-label mono">موانع کلیدی</span>
          <p>
            با وجود این دستاوردها، توسعه هوش مصنوعی در کشاورزی و محیط‌زیست با چالش‌هایی نیز همراه است: دسترسی نابرابر به زیرساخت‌های دیجیتال، هزینه بالای حسگرها و تجهیزات، کمبود داده‌های محلی، نیاز به آموزش کاربران و نگرانی درباره مالکیت و حریم خصوصی داده‌های کشاورزان. از سوی دیگر، مدل‌های هوش مصنوعی اگر بر پایه داده‌های محدود یا نامتوازن آموزش ببینند، ممکن است در شرایط اقلیمی یا جغرافیایی متفاوت عملکرد مطلوبی نداشته باشند.
          </p>
        </div>

        <div className="sarmaghale-closing">
          <p>
            بنابراین، موفقیت این فناوری بیش از آنکه به توان الگوریتم‌ها وابسته باشد، به کیفیت داده‌ها، سیاست‌گذاری مناسب و همکاری میان متخصصان کشاورزی، علوم محیط‌زیست و علوم داده بستگی دارد؛ مسیری که می‌تواند به مدیریت هوشمندتر منابع طبیعی و افزایش تاب‌آوری سامانه‌های تولید غذا در برابر تغییرات آینده منجر شود.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function LawPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          در سلامت، آموزش، استخدام، اعتبارسنجی و خدمات عمومی، پرسش‌های حقوقی و اخلاقی درباره مسئولیت، حفاظت از حقوق و عدالت تصمیم‌های الگوریتمی را به مرکز توسعه فناوری آورده است؛ پاسخ به آن نیازمند همکاری علوم رایانه، حقوق، اخلاق و سیاست‌گذاری است.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-xs">
          <img src={A + 'sarmaghale-law-robot.png'} alt="ربات در نقش قاضی با ترازو و کتاب قانون" />
        </figure>

        <h2 className="sarmaghale-part-h2">حریم خصوصی؛ بنیادی‌ترین چالش</h2>

        <p>
          حریم خصوصی به دلیل وابستگی مدل‌ها به داده‌های شخصی و امکان بازشناسایی یا بازتولید اطلاعات، چالش اساسی است و رویکردهایی مانند Privacy by Design، یادگیری فدرال و حریم خصوصی تفاضلی برای کاهش این خطرها مورد توجه‌اند.
        </p>

        <h2 className="sarmaghale-part-h2">چارچوب‌های تنظیم‌گری؛ تلاش برای اجماع جهانی</h2>

        <p>
          اتحادیه اروپا با EU AI Act چارچوبی مبتنی بر سطح خطر و الزاماتی مانند مستندسازی، ارزیابی ریسک، نظارت انسانی و شفافیت ایجاد کرده و NIST و OECD نیز بر مدیریت ریسک و اعتمادپذیری تأکید دارند. بااین‌حال، درباره میزان تنظیم‌گری و توازن میان نوآوری و حقوق شهروندان هنوز اجماع جهانی وجود ندارد.
        </p>

        <div className="sarmaghale-callout sarmaghale-callout-rose">
          <span className="sarmaghale-callout-label mono">سوگیری الگوریتمی</span>
          <p>
            سوگیری الگوریتمی زمانی رخ می‌دهد که داده‌های آموزشی تبعیض‌های تاریخی یا اجتماعی را بازتولید کنند و حتی مدل‌های با دقت آماری بالا را از نظر عدالت مسئله‌دار سازند؛ بنابراین، تنوع داده، ارزیابی عدالت، آزمون مستقل و شفافیت باید بخشی از چرخه طراحی باشند.
          </p>
        </div>

        <h2 className="sarmaghale-part-h2">مسئولیت خطا؛ کسی که باید پاسخ‌گو باشد</h2>

        <p>
          مسئولیت خطای AI میان توسعه‌دهنده، ارائه‌دهنده، بهره‌بردار و کاربر به‌سادگی قابل تعیین نیست؛ رویکرد غالب آن است که AI فاعل حقوقی مستقل نباشد و مسئولیت بر اساس نقش بازیگران در طراحی، آموزش، استقرار و نظارت توزیع شود، همراه با ثبت سوابق، ردیابی تصمیم‌ها، مستندسازی داده و نظارت انسانی.
        </p>

        <div className="sarmaghale-closing">
          <p>
            آینده حکمرانی AI بیش از افزایش توان محاسباتی به استانداردهای فنی، ارزیابی مستقل، ممیزی الگوریتم و شفافیت نیاز دارد و اعتماد اجتماعی زمانی شکل می‌گیرد که حقوق افراد رعایت و بازیگران مسئول پاسخ‌گو باشند.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function DailyPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          هوش مصنوعی با تحلیل داده‌های رفتاری، مصرف و ترجیحات فردی، تعامل با فناوری روزمره را از اجرای دستور به همکاری مبتنی بر یادگیری و پیش‌بینی تغییر داده و خدمات شخصی‌سازی‌شده‌تر و تصمیم‌گیری خودکارتر فراهم کرده است.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-sm">
          <img src={A + 'sarmaghale-daily-home.png'} alt="خانه هوشمند با سامانه‌های هوش مصنوعی" />
        </figure>

        <h2 className="sarmaghale-part-h2">خانه‌های هوشمند</h2>

        <p>
          در خانه‌های هوشمند، هوش مصنوعی با یادگیری حضور افراد، شرایط محیط و مصرف انرژی، ترموستات، امنیت و روشنایی را پویا تنظیم می‌کند و می‌تواند کارایی را افزایش دهد؛ بااین‌حال، استفاده و دسترسی به این فناوری میان کشورها و گروه‌های اجتماعی یکسان نیست.
        </p>

        <h2 className="sarmaghale-part-h2">دستیارهای صوتی</h2>

        <p>
          دستیارهای صوتی مبتنی بر مدل‌های زبانی با درک بهتر زمینه و انجام وظایف چندمرحله‌ای، از فرمان‌های ساده به مدیریت برنامه، کنترل خانه و جست‌وجوی اطلاعات رسیده‌اند، اما این شخصی‌سازی به داده گسترده نیاز دارد و نگرانی‌های حریم خصوصی و آسیب‌پذیری‌های امنیتی ایجاد می‌کند.
        </p>

        <h2 className="sarmaghale-part-h2">خرید آنلاین و سامانه‌های توصیه‌گر</h2>

        <p>
          سامانه‌های توصیه‌گر و ابزارهای هوش مصنوعی در خرید آنلاین، شخصی‌سازی پیشنهادها، خدمات مشتری، پیش‌بینی تقاضا، موجودی و کشف تقلب را بهبود می‌دهند و هزینه و زمان را کاهش می‌دهند، اما می‌توانند حباب انتخاب و پیشنهادهای سوگیرانه ایجاد کنند.
        </p>

        <h2 className="sarmaghale-part-h2">سلامت و ورزش</h2>

        <p>
          در سلامت و ورزش، ابزارهای پوشیدنی با پایش ضربان قلب، خواب و فعالیت، داده را به تحلیل و توصیه شخصی تبدیل کرده‌اند و هوش مصنوعی می‌تواند روندهای غیرعادی، برنامه تمرینی و خطر آسیب را شناسایی کند؛ بااین‌حال، کیفیت داده، اعتماد، اخلاق و حفاظت از اطلاعات حساس مهم‌اند و این ابزارها جایگزین متخصصان نیستند.
        </p>

        <div className="sarmaghale-closing">
          <p>
            حضور هوش مصنوعی در زندگی روزمره به سمت تعامل طبیعی‌تر، شخصی‌سازی عمیق‌تر و اتصال خدمات حرکت می‌کند، اما پذیرش پایدار آن به اعتماد کاربران و شفافیت در استفاده از داده وابسته است.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function WorkPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          بحث درباره تأثیر هوش مصنوعی بر بازار کار اغلب با یک پرسش ساده اما گمراه‌کننده آغاز می‌شود: «کدام شغل‌ها حذف خواهند شد؟» مسئله واقعی پیچیده‌تر است، زیرا بیشتر مشاغل مجموعه‌ای از وظایف متفاوت‌اند و هوش مصنوعی معمولاً نه یک شغل را یک‌باره، بلکه بخشی از وظایف آن را هدف قرار می‌دهد. گزارش سازمان بین‌المللی کار در سال ۲۰۲۵ نشان می‌دهد که حدود یک‌چهارم کارکنان جهان در مشاغلی قرار دارند که به درجاتی در معرض هوش مصنوعی مولد هستند؛ بااین‌حال، تنها ۳٫۳ درصد اشتغال جهانی در بالاترین سطح مواجهه قرار دارد و این سازمان «تغییر شکل مشاغل» را محتمل‌تر از حذف کامل آن‌ها می‌داند.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-xs">
          <img src={A + 'sarmaghale-work-robot.png'} alt="ربات در حال تفکر — نماد پرسش درباره آینده کار" />
        </figure>

        <p>
          تا زمان نگارش این بخش در سال ۲۰۲۶، پاسخ به این پرسش که «آیا AI می‌تواند کار انسان را کاملاً انجام دهد؟» در مقیاس عمومی هنوز منفی است. سامانه‌های کنونی می‌توانند بعضی وظایف محدود را از ابتدا تا انتها انجام دهند: تولید پیش‌نویس متن، خلاصه‌سازی، ترجمه، پاسخ‌گویی اولیه به مشتری، تحلیل داده‌های ساخت‌یافته یا تولید بخش‌هایی از کد. اما یک شغل واقعی معمولاً علاوه بر این وظایف، به درک زمینه، مسئولیت‌پذیری، تعامل اجتماعی، تصمیم‌گیری در شرایط مبهم، شناخت قواعد نانوشته و پاسخ‌گویی در برابر پیامدهای خطا نیاز دارد. اشتباه رایج این است که «توانایی انجام یک وظیفه» با «توانایی جایگزینی کامل یک شاغل» یکسان فرض شود. حتی شاخص‌های سنجش مواجهه با AI نیز ظرفیت تأثیرگذاری را اندازه می‌گیرند، نه وقوع قطعی بیکاری.
        </p>

        <h2 className="sarmaghale-part-h2">تصویر کلان؛ افزایش خالص اشتغال، اما نابرابر</h2>

        <p>
          بااین‌حال، این به معنای بی‌خطر بودن تحول نیست. مشاغلی که سهم بزرگی از فعالیت آن‌ها دیجیتال، تکرارشونده و قابل استانداردسازی است، بیشتر در معرض کاهش تقاضا قرار دارند. گزارش Future of Jobs 2025 پیش‌بینی می‌کند که مجموعه تحولات اقتصادی و فناورانه تا سال ۲۰۳۰ به ایجاد حدود ۱۷۰ میلیون شغل و جابه‌جایی یا حذف حدود ۹۲ میلیون شغل بینجامد؛ یعنی در سطح کلان، افزایش خالص اشتغال محتمل است، اما افرادی که شغل خود را از دست می‌دهند لزوماً همان کسانی نیستند که به مشاغل تازه دسترسی خواهند یافت. در همین گزارش، مشاغلی مانند ورود داده، برخی امور دفتری و صندوق‌داری در میان نقش‌های رو به کاهش قرار گرفته‌اند، درحالی‌که متخصصان هوش مصنوعی و یادگیری ماشین، کلان‌داده و توسعه نرم‌افزار از گروه‌های رو به رشد هستند.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-md">
          <img src={A + 'sarmaghale-work-collab.png'} alt="همکاری انسان و ربات در خط تولید" />
          <figcaption className="sarmaghale-cap"></figcaption>
        </figure>

        <p>
          بنابراین دو تصویر افراطی ــ «هوش مصنوعی فقط یک ابزار بی‌اثر است» و «هوش مصنوعی به‌زودی همه انسان‌ها را بیکار می‌کند» ــ هر دو مسئله را بیش از حد ساده می‌کنند. AI در برخی موقعیت‌ها ابزار افزایش توان انسان است و در برخی دیگر می‌تواند جایگزین مستقیم بخشی از نیروی کار شود. پژوهشی درباره استفاده واقعی از دستیار هوش مصنوعی Claude در سال ۲۰۲۵ نشان داد که ۵۷ درصد الگوهای استفاده بررسی‌شده بیشتر ماهیت تقویت توانایی انسان و ۴۳ درصد ماهیت خودکارسازی داشته‌اند. این نسبت ثابت نیست و با افزایش توانایی مدل‌ها، کاهش هزینه‌ها و توسعه عامل‌های خودمختار می‌تواند تغییر کند؛ اما وضعیت فعلی بیشتر از «حذف یک‌باره انسان»، به بازتوزیع وظایف میان انسان و ماشین شباهت دارد.
        </p>

        <h2 className="sarmaghale-part-h2">مشاغل موجود، محتوای متفاوت</h2>

        <p>
          اثر دیگر، ایجاد مشاغل و تخصص‌هایی است که پیش‌تر اهمیت محدودی داشتند یا اساساً وجود نداشتند؛ از مهندسی یادگیری ماشین و ارزیابی مدل گرفته تا ایمنی هوش مصنوعی، حکمرانی داده و نظارت بر سامانه‌های خودکار. بااین‌حال، مهم‌ترین تغییر احتمالاً ایجاد هزاران عنوان شغلی کاملاً جدید نخواهد بود، بلکه تغییر محتوای مشاغل موجود است. پزشک، مهندس، برنامه‌نویس، طراح یا تحلیلگر ممکن است همچنان همان عنوان شغلی را داشته باشد، اما روش انجام بخش مهمی از کارش تغییر کند.
        </p>

        <div className="sarmaghale-callout">
          <span className="sarmaghale-callout-label mono">یافته‌ی میدانی</span>
          <p>
            در یک مطالعه میدانی بر کارکنان پشتیبانی مشتری، استفاده از دستیار هوش مصنوعی بهره‌وری را به‌طور میانگین حدود ۱۵ درصد افزایش داد و بیشترین منفعت نصیب کارکنان کم‌تجربه‌تر شد. چنین یافته‌هایی نشان می‌دهد AI می‌تواند بخشی از دانش و تجربه را سریع‌تر در اختیار کارکنان قرار دهد، نه اینکه الزاماً خودِ شغل را حذف کند.
          </p>
        </div>

        <h2 className="sarmaghale-part-h2">مهارت‌های آینده</h2>

        <p>
          در چنین بازاری، مهارت موردنیاز آینده صرفاً «کار با یک ابزار خاص» نیست؛ ابزارها سریع‌تر از برنامه‌های آموزشی تغییر می‌کنند. سواد هوش مصنوعی، توانایی ارزیابی صحت خروجی، تفکر تحلیلی، حل مسئله، خلاقیت، ارتباط مؤثر و یادگیری مستمر اهمیت بیشتری پیدا می‌کنند. مجمع جهانی اقتصاد برآورد می‌کند که تا سال ۲۰۳۰ حدود ۳۹ درصد مهارت‌های فعلی کارکنان تغییر خواهد کرد یا بخشی از اهمیت خود را از دست خواهد داد. صندوق بین‌المللی پول نیز هشدار می‌دهد که منافع AI به‌طور خودکار و برابر توزیع نمی‌شود و بدون آموزش مجدد، زیرساخت مناسب و حمایت از انتقال شغلی، این فناوری می‌تواند شکاف درآمدی و نابرابری را تشدید کند.
        </p>

        <div className="sarmaghale-closing">
          <p>
            از این رو، مرز اصلی آینده بازار کار احتمالاً میان «انسان» و «هوش مصنوعی» نخواهد بود، بلکه میان افرادی و سازمان‌هایی شکل می‌گیرد که می‌توانند تقسیم کار مؤثری با سامانه‌های هوشمند ایجاد کنند و آن‌هایی که مهارت، دسترسی یا فرصت سازگاری با این تغییر را ندارند. پرسش تعیین‌کننده نیز فقط این نیست که ماشین چه کاری را می‌تواند انجام دهد؛ بلکه این است که کدام وظایف را باید به ماشین سپرد، کدام تصمیم‌ها نیازمند قضاوت و مسئولیت انسانی‌اند و منافع حاصل از افزایش بهره‌وری چگونه میان گروه‌های مختلف توزیع خواهد شد.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function IranPart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          جایگاه هوش مصنوعی در ایران بیش از هر چیز بر ظرفیت علمی دانشگاه‌ها و رشد تدریجی زیست‌بوم فناوری استوار بوده است. برخلاف برخی کشورها که توسعه این فناوری عمدتاً از سوی شرکت‌های بزرگ فناوری هدایت شده، بخش قابل‌توجهی از فعالیت‌های هوش مصنوعی در ایران از دانشگاه‌ها، مراکز پژوهشی و شرکت‌های دانش‌بنیان آغاز شده و سپس به صنعت راه یافته است. تصویب «سند ملی هوش مصنوعی جمهوری اسلامی ایران» در سال ۱۴۰۳ نیز نشان می‌دهد که سیاست‌گذاری این حوزه وارد مرحله‌ای منسجم‌تر شده و بر توسعه زیرساخت، تربیت نیروی انسانی، حکمرانی داده و همکاری میان دولت، دانشگاه و بخش خصوصی تأکید دارد.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-md">
          <img src={A + 'sarmaghale-iran-desk.png'} alt="پژوهشگر ایرانی در حال کار با سامانه‌های هوش مصنوعی" />
        </figure>

        <h2 className="sarmaghale-part-h2">دانشگاه‌ها؛ نقطه‌ی آغاز</h2>

        <p>
          دانشگاه‌های کشور، به‌ویژه دانشگاه صنعتی شریف، دانشگاه تهران، دانشگاه صنعتی امیرکبیر، دانشگاه علم و صنعت ایران و چند مرکز پژوهشی دیگر، طی سال‌های اخیر نقش مهمی در آموزش، پژوهش و توسعه کاربردهای هوش مصنوعی ایفا کرده‌اند. آزمایشگاه‌های تخصصی، دوره‌های میان‌رشته‌ای و افزایش پایان‌نامه‌های مرتبط با یادگیری ماشین (Machine Learning)، پردازش زبان طبیعی (Natural Language Processing) و بینایی ماشین، نشان‌دهنده گسترش این حوزه در آموزش عالی است. علاوه بر فعالیت‌های پژوهشی، بسیاری از دانشگاه‌ها از ابزارهای مبتنی بر هوش مصنوعی برای تحلیل داده‌های پژوهشی، کمک به آموزش، ارزیابی یادگیری و توسعه سامانه‌های هوشمند استفاده می‌کنند.
        </p>

        <p>
          البته ورود ابزارهای مولد مانند مدل‌های زبانی بزرگ، هم‌زمان پرسش‌هایی درباره اصالت آثار علمی، شیوه ارزیابی دانشجویان و ضرورت تدوین دستورالعمل‌های اخلاقی برای استفاده از این فناوری در محیط دانشگاهی ایجاد کرده است؛ موضوعی که در بسیاری از نظام‌های آموزش عالی جهان نیز مورد توجه قرار گرفته است.
        </p>

        <h2 className="sarmaghale-part-h2">شرکت‌های دانش‌بنیان؛ پل میان دانشگاه و بازار</h2>

        <p>
          در کنار دانشگاه‌ها، استارتاپ‌ها و شرکت‌های دانش‌بنیان ایرانی سهم قابل‌توجهی در تبدیل پژوهش به محصول داشته‌اند. شرکت‌هایی مانند «پارت»، «هوش‌پرداز»، «فراداده»، «دیتاک» و مجموعه‌ای از استارتاپ‌های فعال در پردازش تصویر، تحلیل متن فارسی، سلامت دیجیتال و خدمات مالی، تلاش کرده‌اند کاربردهای عملی هوش مصنوعی را متناسب با نیازهای بازار داخلی توسعه دهند. اهمیت این شرکت‌ها تنها در تولید محصولات جدید نیست؛ بلکه در ایجاد پیوند میان دانشگاه و صنعت، تربیت نیروی متخصص و شکل‌دهی به بازار فناوری نیز نقش دارند. با این حال، مقیاس فعالیت بسیاری از این شرکت‌ها همچنان محدود است و دسترسی دشوار به سرمایه، زیرساخت پردازشی و بازارهای بین‌المللی، رشد آن‌ها را با چالش روبه‌رو کرده است.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-md">
          <img src={A + 'sarmaghale-iran-factory.png'} alt="کارخانه هوشمند با همکاری انسان و ربات" />
        </figure>

        <h2 className="sarmaghale-part-h2">فرصت‌ها؛ سرمایه‌ای به نام انسان</h2>

        <p>
          مهم‌ترین فرصت ایران در توسعه هوش مصنوعی، سرمایه انسانی متخصص است. تعداد قابل‌توجه دانش‌آموختگان مهندسی، علوم کامپیوتر و ریاضیات، همراه با سابقه پژوهشی دانشگاه‌های کشور، ظرفیت مناسبی برای توسعه الگوریتم‌ها و کاربردهای بومی فراهم کرده است. از سوی دیگر، وجود داده‌های فارسی در حوزه‌هایی مانند خدمات الکترونیکی، سلامت، آموزش و تجارت الکترونیک، امکان توسعه مدل‌هایی متناسب با نیازهای زبانی و فرهنگی کشور را افزایش می‌دهد. اگر این ظرفیت با سیاست‌های مناسب در حوزه داده‌های باز، حمایت از شرکت‌های دانش‌بنیان و سرمایه‌گذاری در زیرساخت‌های پردازشی همراه شود، می‌تواند به افزایش رقابت‌پذیری کشور در برخی حوزه‌های تخصصی منجر شود.
        </p>

        <figure className="sarmaghale-fig sarmaghale-fig-sm">
          <img src={A + 'sarmaghale-iran-map.png'} alt="نقشه ایران با نمادهای شهر هوشمند" />
        </figure>

        <h2 className="sarmaghale-part-h2">چالش‌ها؛ فراتر از فناوری</h2>

        <div className="sarmaghale-callout sarmaghale-callout-rose">
          <span className="sarmaghale-callout-label mono">موانع کلیدی</span>
          <p>
            محدودیت دسترسی به سخت‌افزارهای پیشرفته، هزینه بالای پردازنده‌های گرافیکی، تحریم‌های فناوری، دشواری همکاری با برخی شرکت‌های بین‌المللی و مهاجرت بخشی از نیروهای متخصص، سرعت توسعه را کاهش داده‌اند. علاوه بر این، نبود چارچوب‌های شفاف برای اشتراک‌گذاری داده، حفاظت از حریم خصوصی، مسئولیت‌پذیری سامانه‌های هوشمند و ارزیابی مخاطرات هوش مصنوعی، از موانع مهم توسعه پایدار این فناوری به شمار می‌رود.
          </p>
        </div>

        <p>
          تجربه کشورهای مختلف نشان داده است که موفقیت در این حوزه تنها به پیشرفت فنی وابسته نیست، بلکه به کیفیت حکمرانی، تنظیم‌گری و اعتماد عمومی نیز بستگی دارد.
        </p>

        <h2 className="sarmaghale-part-h2">چشم‌انداز؛ سه سطح پیش‌رو</h2>

        <p>
          چشم‌انداز هوش مصنوعی در ایران را می‌توان در سه سطح بررسی کرد. در سطح نخست، روندهای کنونی نشان می‌دهد که کاربردهای هوش مصنوعی در خدمات دولتی، سلامت، کشاورزی، صنعت و آموزش به‌تدریج گسترش خواهد یافت. در سطح دوم، اجرای مؤثر سیاست‌های ملی، توسعه مراکز داده، تقویت همکاری دانشگاه و صنعت و حمایت از نوآوری می‌تواند زمینه شکل‌گیری شرکت‌های رقابت‌پذیرتر را فراهم کند. در سطح سوم، جایگاه ایران در رقابت جهانی به میزان توانایی آن در حفظ سرمایه انسانی، دسترسی به زیرساخت‌های محاسباتی و مشارکت در شبکه‌های علمی بین‌المللی وابسته خواهد بود.
        </p>

        <div className="sarmaghale-closing">
          <p>
            از این رو، آینده هوش مصنوعی در کشور نه صرفاً به پیشرفت الگوریتم‌ها، بلکه به تصمیم‌های سیاستی، اقتصادی و آموزشی وابسته است؛ تصمیم‌هایی که مسیر توسعه این فناوری را در سال‌های پیش رو تعیین خواهند کرد.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function FuturePart({ part }) {
  return (
    <section className="page article-page sarmaghale-part-page">
      <BackLink to="/article/sarmaghale" label="بازگشت به مقاله" />

      <header className="art-hero tone-cyan is-shown">
        <span className="art-ghost mono" aria-hidden="true">{String(part.no).padStart(2, '0')}</span>
        <span className="art-tag mono">مقاله · بخش {part.no}</span>
        <h1>{part.title}</h1>
        {part.subtitle && <p className="art-subtitle">{part.subtitle}</p>}
        <div className="art-authors-with-avatar">
          <AuthorBadge name={part.authors[0]} photo={part.photo} large />
        </div>
      </header>

      <div className="sarmaghale-part-body">
        <p className="sarmaghale-part-lead">
          مسیر کنونی توسعه هوش مصنوعی نشان می‌دهد که تمرکز پژوهش‌ها به‌تدریج از ساخت سامانه‌های تخصصی به سمت مدل‌هایی با توانایی انجام طیف گسترده‌ای از وظایف، استدلال، برنامه‌ریزی و تعامل چندوجهی در حال حرکت است. با این حال، میان توانمندی‌های چشمگیر مدل‌های امروزی و دستیابی به «هوش مصنوعی عمومی» (Artificial General Intelligence یا AGI) فاصله‌ای وجود دارد که درباره میزان آن اتفاق‌نظر علمی وجود ندارد. برخی پژوهشگران، مدل‌های بنیادین (Foundation Models) را گامی در این مسیر می‌دانند، در حالی که گروهی دیگر معتقدند توانایی تعمیم، درک علّی و استقلال شناختی موردنیاز برای AGI هنوز حاصل نشده است.
        </p>

        <h2 className="sarmaghale-part-h2">AGI و ابرهوش؛ سناریو، نه واقعیت</h2>

        <p>
          AGI معمولاً به سامانه‌ای اطلاق می‌شود که بتواند در طیف وسیعی از مسائل، عملکردی هم‌تراز یا فراتر از انسان داشته باشد؛ برخلاف سامانه‌های کنونی که هرچند در بسیاری از وظایف تخصصی عملکردی ممتاز دارند، همچنان به داده، هدف و چارچوب مشخص وابسته‌اند. حتی اگر چنین سامانه‌ای توسعه یابد، مرحله بعدیِ مورد بحث در ادبیات علمی «ابرهوش» (Artificial Superintelligence یا ASI) است؛ مفهومی که به سامانه‌ای با توانایی شناختی فراتر از بهترین عملکرد انسان در تقریباً همه حوزه‌ها اشاره دارد.
        </p>

        <div className="sarmaghale-callout">
          <span className="sarmaghale-callout-label mono">نگاه واقع‌بینانه</span>
          <p>
            با وجود توجه گسترده رسانه‌ها به این موضوع، زمان تحقق AGI یا ASI هنوز نامشخص است و برآوردهای پژوهشگران تفاوت قابل‌توجهی با یکدیگر دارد. ازاین‌رو، این مفاهیم را باید به‌عنوان <strong>سناریوهای محتمل آینده</strong>، نه واقعیت‌های قطعی، در نظر گرفت.
          </p>
        </div>

        <figure className="sarmaghale-fig sarmaghale-fig-md">
          <img src={A + 'sarmaghale-future-datacenter.png'} alt="زیرساخت محاسباتی هوش مصنوعی — نمادی از زیرساخت آینده" />
        </figure>

        <h2 className="sarmaghale-part-h2">افق ۱۰ تا ۲۰ سال؛ لایه‌ای زیرساختی</h2>

        <p>
          صرف‌نظر از زمان تحقق AGI، روندهای فعلی نشان می‌دهد که طی ۱۰ تا ۲۰ سال آینده هوش مصنوعی احتمالاً بیش از آنکه جایگزین کامل انسان شود، به لایه‌ای زیرساختی برای بسیاری از فعالیت‌های علمی، صنعتی و خدماتی تبدیل خواهد شد. گسترش عامل‌های هوشمند (AI Agents)، ربات‌های خودمختار، سامانه‌های طراحی مهندسی، کشف دارو، مدل‌سازی اقلیم و دستیارهای پژوهشی از جمله روندهایی هستند که هم‌اکنون نیز در حال شکل‌گیری‌اند. انتظار می‌رود این سامانه‌ها بتوانند بخش بیشتری از وظایف پیچیده، از تحلیل داده و برنامه‌نویسی تا مدیریت فرایندهای سازمانی را با حداقل مداخله انسانی انجام دهند و در نتیجه بهره‌وری بسیاری از بخش‌های اقتصادی و علمی افزایش یابد.
        </p>

        <h2 className="sarmaghale-part-h2">پیامدهای اقتصادی و اجتماعی</h2>

        <p>
          در کنار این فرصت‌ها، پیامدهای اقتصادی و اجتماعی نیز اهمیت فزاینده‌ای پیدا می‌کنند. هوش مصنوعی می‌تواند سرعت نوآوری علمی را افزایش دهد، هزینه توسعه فناوری‌های جدید را کاهش دهد و امکان شخصی‌سازی خدمات آموزشی، درمانی و عمومی را فراهم کند. در مقابل، تغییر ساختار بازار کار، افزایش تقاضا برای مهارت‌های پیشرفته، تمرکز قدرت در اختیار شرکت‌های دارای زیرساخت محاسباتی و داده‌های گسترده، و گسترش اطلاعات نادرست تولیدشده توسط هوش مصنوعی، از جمله چالش‌هایی هستند که هم‌اکنون نیز نشانه‌های آن‌ها مشاهده می‌شود. گزارش «چشم‌انداز اقتصاد دیجیتال» و گزارش آینده‌پژوهی OECD تأکید می‌کنند که بهره‌مندی از مزایای هوش مصنوعی بدون سرمایه‌گذاری هم‌زمان در آموزش، حکمرانی داده، شفافیت و ایمنی سامانه‌ها امکان‌پذیر نخواهد بود.
        </p>

        <h2 className="sarmaghale-part-h2">هم‌راستاسازی؛ مسئله‌ی محوری</h2>

        <p>
          بخش مهمی از بحث آینده به مسئله «هم‌راستاسازی» (Alignment) مربوط می‌شود؛ یعنی اطمینان از اینکه اهداف و رفتار سامانه‌های بسیار توانمند با ارزش‌ها و منافع انسانی سازگار باقی بماند. بسیاری از متخصصان معتقدند حتی بدون دستیابی به AGI نیز مخاطراتی مانند حملات سایبری پیشرفته، جعل محتوای چندرسانه‌ای، سوءاستفاده از سامانه‌های خودکار و تصمیم‌گیری‌های غیرشفاف، نیازمند چارچوب‌های حقوقی و فنی جدید هستند.
        </p>

        <p>
          در مقابل، برخی پژوهشگران هشدار می‌دهند که تمرکز بیش از حد بر سناریوهای دوردستِ ابرهوش نباید موجب غفلت از مخاطرات واقعی و جاری هوش مصنوعی شود؛ زیرا بسیاری از مسائل اخلاقی و اجتماعی کنونی مستقل از تحقق AGI نیز وجود دارند.
        </p>

        <h2 className="sarmaghale-part-h2">آینده؛ عدم‌قطعیت و نقش انسان</h2>

        <p>
          پیش‌بینی افق ۱۰ تا ۲۰ سال آینده با عدم‌قطعیت زیادی همراه است. نظرسنجی‌های انجام‌شده میان پژوهشگران هوش مصنوعی نشان می‌دهد که درباره زمان دستیابی به سامانه‌هایی با توانایی عمومی انسانی، اجماع مشخصی وجود ندارد و برآوردها از چند سال تا چند دهه متغیر است. آنچه با اطمینان بیشتری می‌توان انتظار داشت، ادامه روند افزایش توان مدل‌ها، ادغام عمیق‌تر آن‌ها در زیرساخت‌های اقتصادی و علمی، و افزایش اهمیت سیاست‌گذاری و همکاری بین‌المللی برای مدیریت مخاطرات است.
        </p>

        <div className="sarmaghale-closing">
          <p>
            به همین دلیل، آینده هوش مصنوعی بیش از آنکه تنها به پیشرفت الگوریتم‌ها وابسته باشد، به نحوه هدایت این پیشرفت از سوی پژوهشگران، صنعت، دولت‌ها و جامعه نیز گره خورده است؛ مسیری که کیفیت آن، دامنه فرصت‌ها و شدت چالش‌های پیش‌رو را تعیین خواهد کرد.
          </p>
        </div>
      </div>

      <PartsNav currentPartNo={part.no} />
    </section>
  );
}

function GuideArticle({ s }) {
  return (
    <section className="page article-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />
      <ArticleHero s={s} />
      <ol className="steps-list">
        {s.steps.map((step, i) => (
          <li key={step}>
            <span className="step-no mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="step-title">{step}</span>
            <span className="step-todo mono">TODO</span>
          </li>
        ))}
      </ol>
      <SectionNav currentId={s.id} />
    </section>
  );
}

function PromptCard({ p, onOpen }) {
  const catLabel =
    p.category === 'image' ? 'تصویری' : p.category === 'text' ? 'متنی' : 'یادگیری';

  return (
    <button className="promptlab-card" onClick={() => onOpen(p)}>
      <div className="promptlab-thumb">
        <img src={A + p.image} alt={p.title} draggable={false} />
        <span className="promptlab-no mono" aria-hidden="true">
          {String(p.no).padStart(2, '0')}
        </span>
        <span className={`promptlab-cat promptlab-cat-${p.category}`}>{catLabel}</span>
      </div>
      <div className="promptlab-body">
        <h3 className="promptlab-title">{p.title}</h3>
        <span className="promptlab-view">
          مشاهده پرامپت <span className="promptlab-view-arrow">←</span>
        </span>
      </div>
    </button>
  );
}

function PromptModal({ p, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(p.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const catLabel =
    p.category === 'image' ? 'تصویری' : p.category === 'text' ? 'متنی' : 'یادگیری';

  const chatGptUrl = `https://chatgpt.com/?q=${encodeURIComponent(p.text)}`;

  return createPortal(
    <div className="promptlab-modal" onClick={onClose}>
      <div className="promptlab-modal-inner" onClick={(e) => e.stopPropagation()}>
        <button className="promptlab-modal-close" onClick={onClose} aria-label="بستن">✕</button>

        <div className="promptlab-modal-head">
          <span className="promptlab-modal-no mono">{String(p.no).padStart(2, '0')}</span>
          <div className="promptlab-modal-titles">
            <h2>{p.title}</h2>
            <span className={`promptlab-cat promptlab-cat-${p.category}`}>{catLabel}</span>
          </div>
        </div>

        <div className="promptlab-modal-text">
          <pre>{p.text}</pre>
        </div>

        <div className="promptlab-modal-actions">
          <button className={`promptlab-copy ${copied ? 'is-copied' : ''}`} onClick={handleCopy}>
            {copied ? '✓ کپی شد' : 'کپی پرامپت'}
          </button>
          <a
            href={chatGptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="promptlab-chatgpt"
          >
            تست در ChatGPT ↗
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

function PuzzleStageCard({ stage, idx, isSolved, unlocked, onOpen }) {
  const status = isSolved ? 'solved' : unlocked ? 'unlocked' : 'locked';
  const icon = isSolved ? '✓' : unlocked ? '🔓' : '🔒';
  return (
    <button
      type="button"
      className={`puzzle-card tone-${stage.tone} puzzle-card-${status}`}
      onClick={onOpen}
      disabled={!unlocked}
    >
      <div className="puzzle-card-head">
        <span className="puzzle-card-no mono">{stage.no}</span>
        <span className="puzzle-card-name mono">{stage.name}</span>
        <span className="puzzle-card-icon" aria-hidden="true">{icon}</span>
      </div>
      <p className="puzzle-card-hint">{stage.hint}</p>
      {isSolved && <span className="puzzle-card-done">✓ حل شد</span>}
      {!unlocked && <span className="puzzle-card-locked">برای باز شدن، مرحله قبل را حل کن</span>}
    </button>
  );
}

function PuzzleModal({ stage, onClose, onSolve }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const checkAnswer = (e) => {
    e.preventDefault();
    const input = value.trim().toLowerCase().replace(/\s/g, '');
    const accepted = (Array.isArray(stage.answer) ? stage.answer : [stage.answer]).map((a) =>
      String(a).toLowerCase()
    );
    if (accepted.includes(input)) {
      setStatus('success');
      setTimeout(() => onSolve(), 900);
    } else {
      setStatus('error');
      setTimeout(() => setStatus(null), 2500);
    }
  };

  return createPortal(
    <div className="puzzle-modal" onClick={onClose}>
      <div className={`puzzle-modal-inner tone-${stage.tone}`} onClick={(e) => e.stopPropagation()}>
        <button className="puzzle-modal-close" onClick={onClose} aria-label="بستن">✕</button>

        <header className="puzzle-modal-head">
          <span className="puzzle-modal-no mono">{stage.no}</span>
          <div>
            <h2 className="puzzle-modal-title mono">{stage.name}</h2>
            <span className="puzzle-modal-sub">{stage.hint}</span>
          </div>
        </header>

        <p className="puzzle-modal-body">{stage.body}</p>

        {stage.array && (
          <div className="puzzle-array">
            {stage.array.map((n, i) => (
              <span key={i} className="puzzle-array-item mono">{n}</span>
            ))}
          </div>
        )}

        {stage.note && <p className="puzzle-modal-note">{stage.note}</p>}

        {stage.nodes && (
          <div className="puzzle-nodes">
            {stage.nodes.map((n, i) => (
              <span key={n} className="puzzle-node">
                <span className="puzzle-node-label mono">{n}</span>
                <span className="puzzle-node-value mono">{i + 1}</span>
              </span>
            ))}
          </div>
        )}

        {stage.graphImage && (
          <div className="puzzle-graph-block">
            <figure className="puzzle-graph-fig">
              <img src={A + stage.graphImage} alt="گراف اتصالات" />
            </figure>
            <div className="puzzle-edges">
              <table>
                <thead>
                  <tr>
                    <th>اتصال</th>
                    <th>هزینه</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['A', 'B', 6], ['A', 'C', 5], ['B', 'D', 4], ['B', 'E', 4],
                    ['B', 'F', 10], ['C', 'D', 2], ['C', 'E', 3], ['C', 'F', 9],
                    ['D', 'E', 8], ['E', 'F', 2],
                  ].map(([a, b, c], i) => (
                    <tr key={i}>
                      <td className="mono">{a} – {b}</td>
                      <td className="mono">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {stage.ops && (
          <ol className="puzzle-ops mono" dir="ltr">
            {stage.ops.map((op, i) => (
              <li key={i}>{op}</li>
            ))}
          </ol>
        )}

        {stage.questions ? (
          <ol className="puzzle-questions">
            {stage.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        ) : (
          <p className="puzzle-question">{stage.question}</p>
        )}

        <form onSubmit={checkAnswer} className="puzzle-form">
          <input
            type="text"
            className="puzzle-input mono"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="پاسخ را وارد کنید..."
            autoFocus
            autoComplete="off"
          />
          <button type="submit" className="puzzle-submit">بررسی</button>
        </form>

        {status === 'success' && (
          <p className="puzzle-feedback puzzle-feedback-success">✓ پاسخ درست! در حال باز کردن قفل...</p>
        )}
        {status === 'error' && (
          <p className="puzzle-feedback puzzle-feedback-error">✗ پاسخ نادرست. دوباره تلاش کنید.</p>
        )}

        <p className="puzzle-help">
          <strong>راهنما:</strong> {stage.helpText}
        </p>
      </div>
    </div>,
    document.body
  );
}

function PuzzleFinalPanel({ allSolved, solved, finalCode, setFinalCode, finalStatus, onSubmit }) {
  const inputsRef = useRef([]);

  const handleDigit = (i, v) => {
    const clean = v.replace(/\D/g, '').slice(0, 1);
    const arr = finalCode.padEnd(5, ' ').split('');
    arr[i] = clean || ' ';
    const next = arr.join('').trimEnd();
    setFinalCode(next);
    if (clean && i < 4) inputsRef.current[i + 1]?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !finalCode[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  };

  return (
    <div className={`puzzle-final ${allSolved ? 'is-ready' : ''}`}>
      <div className="puzzle-final-head">
        <span className="puzzle-final-tag mono">مرحله نهایی</span>
        <h2 className="puzzle-final-title">رمز پنج رقمی خروج</h2>
      </div>

      <p className="puzzle-final-sub">
        {allSolved
          ? 'همه‌ی کلیدها را به دست آورده‌اید. رمز پنج رقمی خروج را وارد کنید.'
          : 'برای باز کردن قفل نهایی، ابتدا هر چهار مرحله را حل کنید.'}
      </p>

      <div className="puzzle-final-keys" dir="ltr">
        {puzzleStages.map((st) => (
          <div key={st.id} className={`puzzle-final-key tone-${st.tone}`}>
            <span className="puzzle-final-key-label mono">{st.name}</span>
            <span className={`puzzle-final-key-value mono ${solved[st.id] ? 'is-solved' : ''}`}>
              {solved[st.id] ? st.digit : '؟'}
            </span>
          </div>
        ))}
      </div>

      {finalStatus === 'success' ? (
        <div className="puzzle-escape">
          <div className="puzzle-escape-icon">🚪</div>
          <h3 className="puzzle-escape-title">فرار موفق!</h3>
          <p className="puzzle-escape-text">
            خروج اضطراری فعال شد. از آزمایشگاه ۴۰۴ بیرون آمدید.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="puzzle-final-form">
          <div className="puzzle-final-inputs" dir="ltr">
            {[0, 1, 2, 3, 4].map((i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="puzzle-final-digit mono"
                value={finalCode[i] || ''}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKey(i, e)}
                disabled={!allSolved}
              />
            ))}
          </div>

          <button
            type="submit"
            className="puzzle-final-submit"
            disabled={!allSolved || finalCode.length < 5}
          >
            فعال‌سازی خروج
          </button>

          {finalStatus === 'error' && (
            <p className="puzzle-feedback puzzle-feedback-error">✗ رمز اشتباه است. دوباره تلاش کنید.</p>
          )}
        </form>
      )}
    </div>
  );
}

function PuzzleArticle({ s }) {
  const [solved, setSolved] = useState(() => {
    try {
      const saved = localStorage.getItem(PUZZLE_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [selected, setSelected] = useState(null);
  const [finalCode, setFinalCode] = useState('');
  const [finalStatus, setFinalStatus] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(PUZZLE_STORAGE_KEY, JSON.stringify(solved));
    } catch {}
  }, [solved]);

  const solvedCount = puzzleStages.filter((st) => solved[st.id]).length;
  const allSolved = solvedCount === puzzleStages.length;
  const isStageUnlocked = (idx) => idx === 0 || solved[puzzleStages[idx - 1].id];

  const handleSolve = (id) => {
    setSolved((prev) => ({ ...prev, [id]: true }));
    setSelected(null);
  };

  const handleReset = () => {
    if (window.confirm('مطمئنی می‌خوای پیشرفتت رو پاک کنی؟')) {
      setSolved({});
      setFinalCode('');
      setFinalStatus(null);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (finalCode === PUZZLE_FINAL_CODE) {
      setFinalStatus('success');
    } else {
      setFinalStatus('error');
      setTimeout(() => setFinalStatus(null), 3000);
    }
  };

  return (
    <section className="page article-page puzzle-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />

      <header className="puzzle-hero">
        <span className="puzzle-hero-tag mono">بخش {String(s.no).padStart(2, '0')} · سرگرمی</span>
        <h1 className="puzzle-hero-title">اتاق فرار الگوریتمی</h1>
        <p className="puzzle-hero-subtitle">فرار از آزمایشگاه ۴۰۴</p>
        <p className="puzzle-hero-desc">
          شما در آزمایشگاه گیر افتاده‌اید! برای فعال‌سازی خروج اضطراری، باید رمز پنج رقمی را وارد کنید. هر پاسخ کلید مرحله بعد است.
        </p>

        <div className="art-authors-with-avatar">
          <AuthorBadge
            name="علیرضا حسین زرگری"
            photo="author-aliereza-puzzle.png"
            large
          />
        </div>
      </header>

      <div className="puzzle-progress">
        <div className="puzzle-progress-info">
          <span className="mono">
            پیشرفت: <strong>{solvedCount}</strong> از {puzzleStages.length}
          </span>
          {solvedCount > 0 && (
            <button type="button" className="puzzle-reset" onClick={handleReset}>
              شروع دوباره
            </button>
          )}
        </div>
        <div className="puzzle-progress-bar">
          <div
            className="puzzle-progress-fill"
            style={{ width: `${(solvedCount / puzzleStages.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="puzzle-grid">
        {puzzleStages.map((stage, idx) => (
          <PuzzleStageCard
            key={stage.id}
            stage={stage}
            idx={idx}
            isSolved={!!solved[stage.id]}
            unlocked={isStageUnlocked(idx)}
            onOpen={() => isStageUnlocked(idx) && setSelected(stage)}
          />
        ))}
      </div>

      <PuzzleFinalPanel
        allSolved={allSolved}
        solved={solved}
        finalCode={finalCode}
        setFinalCode={setFinalCode}
        finalStatus={finalStatus}
        onSubmit={handleFinalSubmit}
      />

      <p className="puzzle-hint-note">
        <strong>توجه!</strong> برای لذت بردن از بازی، پاسخ را قبل از حل معما مشاهده نکنید. پاسخ بازی روی جلد پشت نوشته شده، موفق باشید.
      </p>

      {selected && (
        <PuzzleModal
          stage={selected}
          onClose={() => setSelected(null)}
          onSolve={() => handleSolve(selected.id)}
        />
      )}

      <SectionNav currentId={s.id} />
    </section>
  );
}

function GalleryArticle({ s }) {
  const [selected, setSelected] = useState(null);

  return (
    <section className="page article-page promptlab-page">
      <BackLink to="/contents" label="بازگشت به فهرست" />

      <header className="promptlab-hero">
        <span className="promptlab-hero-tag mono">بخش {String(s.no).padStart(2, '0')} · پرامپت‌لب</span>
        <h1 className="promptlab-hero-title mono">AI PROMPT LAB</h1>
        <p className="promptlab-hero-sub">
          پرامپت‌های کاربردی برای تجربه، یادگیری و استفاده روزمره از هوش مصنوعی
        </p>

        <div className="art-authors-with-avatar">
          <AuthorBadge
            name="علیرضا حسین زرگری"
            photo="author-aliereza-prompt.png"
            large
          />
        </div>
      </header>

      <div className="promptlab-grid">
        {prompts.map((p) => (
          <PromptCard key={p.id} p={p} onOpen={setSelected} />
        ))}
      </div>

      {selected && <PromptModal p={selected} onClose={() => setSelected(null)} />}

      <SectionNav currentId={s.id} />
    </section>
  );
}


function ArticlePage({ route }) {
  const s = bySectionId[route.id];
  if (!s) return <NotFound />;
  if (route.id === 'sarmaghale' && route.sub) {
    const part = s.parts.find((p) => p.id === route.sub);
    if (!part) return <NotFound />;
    return <CoverStoryPart part={part} />;
  }
  if (route.id === 'interview') return <InterviewArticle s={s} />;
  if (route.id === 'elecomp') return <ElecompArticle s={s} />;
  if (route.id === 'face') return <FaceArticle s={s} />;
  if (route.id === 'her') return <HerArticle s={s} />;
  if (route.id === 'useful') return <UsefulArticle s={s} />;
  if (s.kind === 'cover-story') return <CoverStoryArticle s={s} />;
  if (s.kind === 'guide') return <GuideArticle s={s} />;
  if (s.kind === 'gallery') return <GalleryArticle s={s} />;
  if (s.kind === 'puzzle') return <PuzzleArticle s={s} />;
  return <GenericArticle s={s} />;
}

function NotFound() {
  return (
    <section className="page article-page">
      <BackLink to="/" label="بازگشت به خانه" />
      <PageHead kicker="404" title="این صفحه پیدا نشد" />
    </section>
  );
}

/* -------------------------------- Footer -------------------------------- */

function Footer() {
  return (
    <footer className="footer">
      <Logo className="footer-logo" />
      <nav className="footer-nav">
        {navItems.map((n) => <a key={n.id} href={`#${n.path}`}>{n.label}</a>)}
      </nav>
      <p className="footer-note mono">شماره {issueMeta.no} — {issueMeta.date}</p>
    </footer>
  );
}

/* -------------------------------- App -------------------------------- */

function App() {
  const [dark, setDark] = useTheme();
  const [introDone, setIntroDone] = useState(false);
  const route = useRoute();

  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <div className="drift-bg" aria-hidden="true" />
      <Navbar dark={dark} setDark={setDark} route={route} />
      <main key={route.name + (route.id || '') + (route.sub || '')} className="page-enter">
        {route.name === 'home' && <Home scrollTo={route.scrollTo} />}
        {route.name === 'article' && <ArticlePage route={route} />}
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
