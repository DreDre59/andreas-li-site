export interface ExperienceEntry {
  company: string;
  role: string;
  start: string;
  end: string;
  skills: string[];
  logo?: string; // filename in public/logos/
  image?: string; // filename in public/photos/experience/
  description: string;
}

const experience: ExperienceEntry[] = [
  {
    company: "Tesla",
    role: "Vehicle Design Intern - Seatbelts",
    start: "Jan 2026",
    end: "Present",
    skills: ["Catia 3DX", "Python", "PID Control"],
    logo: "Tesla_Logo.png",
    image: "Tesla-Cybercab-Robovan.jpg",
    description: `Supporting the development of new seatbelt technologies for use in the Cybercab and future programs.

Developed a lifecycle test machine in Catia 3DX to test a seatbelt component over 75,000+ cycles, ensuring DFA and maintainability.
Selected and integrated a BLDC motor and controller for lifecycle test hardware meeting calculated load requirements.
    `,
  },
  {
    company: "Social and Intelligent Robotics Research Lab",
    role: "Research Assistant",
    start: "Sept 2025",
    end: "Dec 2025",
    skills: ["LLMs", "Prompt Engineering", "User Studies"],
    logo: "Sirrl_Logo.png",
    image: "Furhat_Robot.jpg",
    description: `Assisted in a study exploring LLM-driven human-robot interaction for optometry communication training. Using a Furhat Robot paired with LLMs to simulate realistic patient interactions for optometry students.

Developed 8 distinct patient personas, iterating on prompt design to ensure consistent character alignment, prevent instruction drift, and avoid hallucinations.

Conducted a validation study with participants, evaluating persona performance and character consistency across simulated patient interactions, and collecting qualitative feedback for refinements.`,
  },
  {
    company: "Martinrea International",
    role: "Mechatronics Engineering Intern",
    start: "May 2025",
    end: "Aug 2025",
    skills: ["SolidWorks", "Raspberry Pi", "Finite Element Analysis", "Python"],
    logo: "Martinrea_Logo.png",
    image: "amr-materialtransport.jpg",
    description: `Implemented Martinrea's first autonomous mobile robot (AMR) system in a metals plant. Designed 6 AMR-compatible material carts using SolidWorks, capable of transporting over 1,300 lbs of parts.

Built an automated low-stock replenishment system using Raspberry Pi and MQTT, triggering AMR deliveries to production lines when material runs low. Developed a PostgreSQL telemetry database to track AMR missions and sensor data..

Presented the autonomous vehicle systems to investors and guests, communicating design decisions and operational benefits to drive stakeholder confidence.`,
  },
];

export default experience;
