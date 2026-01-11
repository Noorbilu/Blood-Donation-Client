import React from 'react';
import { Link } from 'react-router';

const posts = [
  {
    slug: 'benefits-of-donating-blood',
    title: 'Health benefits of donating blood',
    excerpt: 'Regular donations can reduce iron overload and support better cardiovascular health.',
  },
  {
    slug: 'how-to-prepare',
    title: 'How to prepare for donation day',
    excerpt: 'Hydrate, eat iron-rich foods, sleep well, and bring a valid ID.',
  },
  {
    slug: 'post-donation-care',
    title: 'Post-donation care',
    excerpt: 'Rest, hydrate, keep the bandage on for a few hours, and avoid heavy lifting for 24 hours.',
  },
];

const BlogList = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Blog</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {posts.map((p) => (
          <div key={p.slug} className="card p-6">
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="opacity-80 mt-2">{p.excerpt}</p>
            <Link to={`/blog/${p.slug}`} className="btn btn-primary btn-sm mt-3">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;