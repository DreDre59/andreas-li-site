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
    role: "Vehicle Design Engineering Intern",
    start: "May 2025",
    end: "Aug 2025",
    skills: ["CAD", "GD&T", "DFMEA", "Root Cause Analysis", "Tolerance Analysis"],
    logo: "Tesla_Logo.png",
    image: "Tesla-Cybercab-Robovan.jpg",
    description: `Contributed to vehicle design engineering on active programs, working closely with cross-functional teams across manufacturing, quality, and supply chain.

Performed tolerance stack-up analyses and GD&T reviews for critical assemblies, identifying potential fit issues before prototype builds. Supported root cause investigations for field returns using structured problem-solving methods.

Developed and maintained engineering documentation including DFMEAs and design verification plans, ensuring traceability across design iterations.`,
  },
  {
    company: "UWaterloo SIRRL",
    role: "Research Assistant",
    start: "Jan 2025",
    end: "Apr 2025",
    skills: ["ROS2", "Python", "C++", "Computer Vision", "SLAM"],
    logo: "Sirrl_Logo.png",
    image: "Furhat_Robot.jpg",
    description: `Conducted research in the Social and Intelligent Robotics Research Lab, focusing on mobile robot perception and human-robot interaction.

Developed and tested perception pipelines using ROS2, integrating depth cameras and LiDAR for real-time obstacle detection and mapping. Contributed to SLAM algorithm benchmarking across indoor environments.

Assisted in designing experiments for user studies evaluating robot navigation behavior in shared human spaces.`,
  },
  {
    company: "Martinrea International",
    role: "Mechatronics Engineering Intern",
    start: "May 2024",
    end: "Aug 2024",
    skills: ["PLC Programming", "SolidWorks", "Embedded C", "Pneumatics", "HMI Design"],
    logo: "Martinrea_Logo.png",
    image: "amr-materialtransport.jpg",
    description: `Worked on automation and manufacturing systems at a Tier 1 automotive parts supplier, supporting production line upgrades and troubleshooting.

Programmed and debugged PLCs for automated assembly stations, improving cycle time consistency. Designed pneumatic circuit modifications and created updated SolidWorks models for fixture improvements.

Developed HMI screens for operator interfaces and wrote embedded firmware for sensor monitoring modules deployed on the production floor.`,
  },
];

export default experience;
