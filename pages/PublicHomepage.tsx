
import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, SearchCheck, Rocket } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
    <p className="text-base text-gray-500 dark:text-gray-400">{children}</p>
  </div>
);

const PublicHomepage: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Automate Your <span className="text-primary-500">Affiliate Content</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          Yclep uses powerful AI agents to generate, optimize, and publish high-quality product landing pages, so you can focus on growing your business.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="inline-block bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      <div className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={<Bot size={24} />} title="AI-Powered Agents">
            Our autonomous agents handle everything from data collection and content writing to image optimization. Just provide a product link and watch the magic happen.
          </FeatureCard>
          <FeatureCard icon={<SearchCheck size={24} />} title="SEO-Ready Pages">
            Every page is built from the ground up with SEO best practices, including structured data, meta tags, and optimized content to rank higher in search results.
          </FeatureCard>
          <FeatureCard icon={<Rocket size={24} />} title="One-Click Publishing">
            Review the generated pages in a staging environment. Once you're happy, publish them to your site with a single click. It's that simple.
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default PublicHomepage;
