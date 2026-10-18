import Link from 'next/link';
import { getHelpTopic } from '@/lib/source';

export default function HelpTopic({ slug }: { slug: string }) {
  const topic = getHelpTopic(slug);

  if (topic.status === 'draft') {
    return (
      <span className="home-topic home-topic-draft" role="link" aria-disabled="true">
        {topic.title}
      </span>
    );
  }

  return <Link className="home-topic" href={topic.url}>{topic.title}</Link>;
}
