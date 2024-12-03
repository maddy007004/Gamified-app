import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { LessonGrid } from '../components/dashboard/LessonGrid';
import { Button } from '../components/ui/Button';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const sampleLessons = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the basics of React and component-based architecture',
    duration: 30,
    progress: 60,
    difficulty: 'beginner',
    completed: false,
  },
  {
    id: '2',
    title: 'State Management',
    description: 'Master state management with hooks and context',
    duration: 45,
    progress: 0,
    difficulty: 'intermediate',
    completed: false,
  },
  {
    id: '3',
    title: 'Advanced Patterns',
    description: 'Explore advanced React patterns and optimization techniques',
    duration: 60,
    progress: 0,
    difficulty: 'advanced',
    completed: false,
  },
];

export const Dashboard = () => {
  const user = useStore((state) => state.user);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="animate-float"
        >
          <Book className="h-16 w-16 text-blue-500" />
        </motion.div>
        <h2 className="mt-6 text-3xl font-bold text-white">Start Your Learning Journey</h2>
        <p className="mt-2 text-gray-400">Sign in to track your progress and earn rewards</p>
        <div className="mt-8 flex space-x-4">
          <Link to="/login">
            <Button className="glow">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button variant="secondary" className="glow">Create Account</Button>
          </Link>
        </div>
      </div>
    );
  }

  const levelProgress = (user.points % 100);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="space-y-8"
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}! 👋</h1>
        <p className="mt-2 text-gray-400">Ready to continue your learning journey?</p>
      </motion.div>

      <motion.div variants={item}>
        <StatsCard
          points={user.points}
          streak={user.streak}
          level={user.level}
          progress={levelProgress}
        />
      </motion.div>

      <LessonGrid lessons={sampleLessons} title="Continue Learning" />
    </motion.div>
  );
};