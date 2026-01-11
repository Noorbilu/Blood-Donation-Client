import React from 'react';
import { useParams, Link } from 'react-router';

const POSTS = {
  'benefits-of-donating-blood': {
    title: 'Health benefits of donating blood',
    content:
      'Regular blood donation can help reduce iron overload and may support better cardiovascular health. Many donors also report a rewarding sense of impact by helping their community.',
  },
  'how-to-prepare': {
    title: 'How to prepare for donation day',
    content:
      'Hydrate well, eat iron-rich foods, and sleep well the night before. Bring a valid ID to the donation center and inform staff if you’re taking any medications.',
  },
  'post-donation-care': {
    title: 'Post-donation care',
    content:
      'After donating, rest and hydrate. Keep your bandage on for several hours and avoid heavy lifting for 24 hours.',
  },
};

const BlogDetails = () => {
  const { slug } = useParams();
  const post = POSTS[slug];

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="opacity-80">Post not found.</p>
        <Link to="/blog" className="btn btn-ghost mt-3">
          ← Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/blog" className="btn btn-ghost mb-4">← Back</Link>
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{post.title}</h1>
      <article className="prose dark:prose-invert max-w-3xl">
        <p>{post.content}</p>
      </article>
    </div>
  );
};

export default BlogDetails;