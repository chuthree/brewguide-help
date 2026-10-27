import { BookOpenIcon, ChatBubbleLeftIcon, CircleStackIcon, PlayIcon, QuestionMarkCircleIcon } from '@heroicons/react/16/solid';
import { CoffeeBean } from '@phosphor-icons/react/dist/ssr';
import { RiChatAiFill } from 'react-icons/ri';

const icons = {
  help: QuestionMarkCircleIcon,
  brewing: PlayIcon,
  notes: BookOpenIcon,
  data: CircleStackIcon,
  contribute: ChatBubbleLeftIcon,
};

export default function HomeIcon({ name }: { name: keyof typeof icons | 'beans' | 'ai' }) {
  const className = `home-heading-icon home-heading-icon-${name}`;
  if (name === 'beans') {
    return <CoffeeBean className={className} size={15} weight="fill" aria-hidden="true" style={{ padding: 1 }} />;
  }
  if (name === 'ai') {
    return <RiChatAiFill className={className} size={15} aria-hidden="true" />;
  }
  const Icon = icons[name];
  return <Icon className={className} width={15} height={15} aria-hidden="true" />;
}
