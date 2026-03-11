import { Linkedin, Mail, FileDown } from "lucide-react";

const socialLinks = [
  { href: "https://www.linkedin.com/in/andreasli/", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:andreas.li@uwaterloo.ca", label: "Email", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-100 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
          © {new Date().getFullYear()} Andreas Li
        </p>
        <div className="flex items-center gap-5">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <Icon size={15} />
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <FileDown size={13} />
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
