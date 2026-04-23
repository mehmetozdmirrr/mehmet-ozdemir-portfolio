import { motion } from 'motion/react';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference"
    >
      <div className="font-display font-bold text-2xl tracking-tighter">M.Ö.</div>
      <div className="flex gap-8 text-xs uppercase tracking-[0.2em] font-medium">
        <a href="#work" className="hover:text-accent transition-colors">Work</a>
        <a href="#about" className="hover:text-accent transition-colors">About</a>
        <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
      </div>
    </motion.nav>
  );
}
