export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  paragraphs: string[];
  italicHtml?: string;
  /** FPO marker — placeholder slots render in a muted "replace me" style and
   *  are excluded from Review schema. Set false (or remove) once real. */
  isPlaceholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Savelle consistently demonstrated strong design capability, a solid understanding of brand, and an ability to bring complex ideas to life in a clear, approachable way. He's a capable, all-in-one designer with a strong grasp of brand, systems, and execution, able to implement solutions without unnecessary handoffs.",
    name: 'Roxana Epps',
    title: 'SVP of Marketing',
    company: 'Young Living, LifeWave, Green Compass',
    initials: 'RE',
    paragraphs: [
      "I've worked with Savelle across multiple organizations, including Young Living, LifeWave, and Green Compass. Across those experiences, he consistently demonstrated strong design capability, a solid understanding of brand, and an ability to bring complex ideas to life in a clear, approachable way.",
      "Savelle's strength is his versatility. He brings a broad range of skills across UI/UX design, front- and back-end development, email design and systems, and full website creation. This allows him to contribute across many stages of a project and reduces dependency on multiple resources. He is able to take company goals and translate them into tangible outputs, often moving quickly from concept to execution.",
      "At LifeWave, he supported large-scale digital initiatives that required coordination across markets, timelines, and localization needs. That work required speed, adaptability, and the ability to build repeatable structures rather than one-off solutions.",
      "Savelle is able to create a clearly defined scopes, timelines, and ownership models. In those environments, he executes efficiently, meets deadlines, and delivers work that aligns with brand standards and business objectives. His technical skill set allows him to understand constraints and implement solutions without unnecessary handoffs.",
      "Overall, Savelle is a capable, all-in-one designer with a strong grasp of brand, systems, and execution. He is a valuable contributor to digital and design initiatives and leadership.",
    ],
  },
  {
    quote:
      "Savelle is one of the most talented UX experts I've had the pleasure of working with. Within a very short period of time after his hire, he was knocking out work items and client-side code. The impact of his effort and his work will be felt for a very long time.",
    name: 'Daniel Kruger',
    title: 'VP of Software Development',
    company: 'SyberSafe',
    initials: 'DK',
    paragraphs: [
      "Savelle is one of the most talented UX experts I've had the pleasure of working with. Within a very short period of time after his hire, he was knocking out work items and client side code. The impact of his effort and his work will be felt for a very long time. It seemed like every day, he was revealing a new talent. My favorite Savelle anecdote is the time he re-designed the product logo, and came up with something better than the marketing company effort after doodling for about 10 minutes. Simply amazing.",
      "On the team he was the go-to 'finisher' for his development-side colleagues. His ability to quickly turn 'programmer UI' into something awesome is a super power. Savelle is patient and has a pretty solid understanding of that middle ground between development and the desired outcome of an elegant design. His communication skills are second to none in this area.",
      "His grasp of design processes around UI/UX is clear in his work. Savelle was a frequent collaborator within the dev process and is a key reason the application has been received with praise universally by customers and investors. I could always count on Savelle to be positive, solution oriented, and supportive of his fellow teammates at any given time of the journey. I would hire/work with Savelle again without hesitation. I can't wait to see what he does next!",
    ],
  },
  {
    quote: "It was an honor to work with Savelle and be mentored in the art of weaving storytelling through design. He is full of incredible ideas and his depth of knowledge in design and development was critical to the success of many projects we worked on together. Don't come to Savelle if you're looking for cookie-cutter work - but if you're looking for innovation, imagination, and magic, he's your guy!",
    name: 'Caitlin Kelly',
    title: 'Design Lead',
    company: 'RedSky Engineering',
    initials: 'CK',
    paragraphs: [
      "It was an honor to work with Savelle and be mentored in the art of weaving storytelling through design. He is full of incredible ideas and his depth of knowledge in design and development was critical to the success of many projects we worked on together. Don't come to Savelle if you're looking for cookie-cutter work - but if you're looking for innovation, imagination, and magic, he's your guy!",
    ],
    italicHtml: "If you seek a designer so bright,<br>Savelle's vision will surely delight.<br>With style that's unique,<br>And creativity peak,<br>Your project will soar to new heights!",
  },
];

export const realTestimonials = testimonials.filter((t) => !t.isPlaceholder);
