export interface ExperienceEntry {
  company: string;
  role: string;
  start: string;
  end: string;
  skills: string[];
  description: string; // supports markdown
}

const experience: ExperienceEntry[] = [
  {
    company: "Company Name",
    role: "Robotics Software Intern",
    start: "May 2025",
    end: "Aug 2025",
    skills: ["ROS2", "Python", "C++", "OpenCV", "Docker"],
    description: `I worked on the autonomy stack for an industrial inspection robot, contributing to the perception and navigation pipelines.

My main project involved integrating a depth camera with ROS2's navigation stack to enable obstacle avoidance in unstructured environments. I wrote the point cloud preprocessing node in C++ and tuned the costmap parameters for the specific warehouse environment.

I also helped migrate the team's CI pipeline to GitHub Actions, cutting build times by about 40% through better layer caching in Docker.`,
  },
  {
    company: "Another Company",
    role: "Embedded Systems Intern",
    start: "Jan 2025",
    end: "Apr 2025",
    skills: ["Embedded C", "STM32", "FreeRTOS", "SPI", "CAN Bus"],
    description: `Developed firmware for a motor control board based on the STM32H7 microcontroller, targeting a brushless DC drive system.

I implemented a PID speed controller with anti-windup protection and a basic state machine for fault handling. Communication with the host system was over CAN Bus using a lightweight message protocol I designed and documented.

The role gave me hands-on experience with real-time constraints — debugging race conditions and interrupt priority issues taught me a lot about FreeRTOS internals.`,
  },
];

export default experience;
