'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Languages, MonitorPlay, CalendarSync } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Copyright-Free',
    description: 'Content gulo free-te use kora jabe. DMCA-safe stock videos for your projects.',
  },
  {
    icon: Languages,
    title: 'Multi-Language Dubbed',
    description: 'Onno bhashar movie ekhon nijer bhashay. Professional Bengali & Hindi dubbing.',
  },
  {
    icon: MonitorPlay,
    title: 'Ultra HD Quality',
    description: '4K ebong 1080p resolution support. Optimized for all devices with high-speed buffering.',
  },
  {
    icon: CalendarSync,
    title: 'Daily Updates',
    description: 'Protidin notun notun video ebong movie add kora hoy. Never run out of content.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Experience the Next Level of Streaming</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Your one-stop destination for hassle-free streaming. Cinematic masterpieces and high-quality clips, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl hover:bg-zinc-900 transition-colors"
            >
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
