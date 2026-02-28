"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Twitter, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="p-8 md:p-16 lg:p-24 min-h-full flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full mx-auto"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-4 block">Get in touch</span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.8] mb-16">
          Start a <br />
          <span className="text-muted-foreground/20">Conversation</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="space-y-12">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-6">Contact Details</h3>
              <a href="mailto:olayeyeayomide2000@gmail.com" className="group flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground block">Email</span>
                  <p className="text-lg font-bold group-hover:text-accent-home transition-colors">olayeyeayomide2000@gmail.com</p>
                </div>
              </a>
            </div>

            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/50 mb-6">Digital Presence</h3>
              <div className="flex gap-4">
                <SocialLink icon={<Github size={20} />} label="Github" href="#" />
                <SocialLink icon={<Twitter size={20} />} label="Twitter" href="#" />
                <SocialLink icon={<Linkedin size={20} />} label="LinkedIn" href="#" />
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-muted-foreground">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                className="w-full bg-white/[0.02] border border-white/5 rounded-lg p-4 text-sm focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-muted-foreground">Inquiry</label>
              <textarea 
                placeholder="How can I help you?"
                rows={4}
                className="w-full bg-white/[0.02] border border-white/5 rounded-lg p-4 text-sm focus:outline-none focus:border-white/20 transition-colors resize-none"
              />
            </div>
            <button className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-accent-home transition-colors group">
              <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function SocialLink({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <a 
      href={href} 
      className="w-12 h-12 rounded-lg border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/[0.05] transition-all relative group"
    >
      {icon}
      <span className="absolute -bottom-8 text-[8px] font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {label}
      </span>
    </a>
  );
}
