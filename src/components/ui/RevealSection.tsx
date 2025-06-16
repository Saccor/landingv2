import { motion } from 'framer-motion';
import { sectionReveal } from '@/lib/animations';

export default function RevealSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionReveal}
      className={className}
    >
      {children}
    </motion.section>
  );
} 