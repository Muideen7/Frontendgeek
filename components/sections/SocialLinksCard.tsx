import { Card } from "@/components/ui/Card";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

const socialLinks = [
  {
    name: "Email",
    url: SITE_CONFIG.social.email,
    icon: Mail,
    color: "hover:bg-red-500/10 hover:border-red-500/30",
  },
  {
    name: "GitHub",
    url: SITE_CONFIG.social.github,
    icon: Github,
    color: "hover:bg-white/10 hover:border-white/30",
  },
  {
    name: "LinkedIn",
    url: SITE_CONFIG.social.linkedin,
    icon: Linkedin,
    color: "hover:bg-blue-600/10 hover:border-blue-600/30",
  },
  {
    name: "Twitter",
    url: SITE_CONFIG.social.twitter,
    icon: Twitter,
    color: "hover:bg-sky-500/10 hover:border-sky-500/30",
  },
  {
    name: "Instagram",
    url: SITE_CONFIG.social.instagram,
    icon: Instagram,
    color: "hover:bg-pink-500/10 hover:border-pink-500/30",
  },
  {
    name: "YouTube",
    url: SITE_CONFIG.social.youtube,
    icon: Youtube,
    color: "hover:bg-red-600/10 hover:border-red-600/30",
  },
];

export function SocialLinksCard({ className }: { className?: string }) {
  return (
    <Card id="social-links" className={className}>
      <h3 className="text-[11px] font-bold tracking-[0.1em] text-gray-300 mb-5">
        CONNECT WITH ME
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center justify-center gap-3 p-5 border border-gray-800 rounded-xl transition-all duration-300 ${social.color}`}
            >
              <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-xs text-gray-500 group-hover:text-white transition-colors font-medium">
                {social.name}
              </span>
            </a>
          );
        })}
      </div>
    </Card>
  );
}
