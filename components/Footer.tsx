import { Github, Linkedin, Mail, FileDown } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:your@email.com", label: "Email", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800 py-10 px-6">
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} Your Name. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          >
            <FileDown size={14} />
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
