
import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';

const ProductLandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const isPreview = slug?.endsWith('-preview');
  const productName = slug
    ?.replace(/-preview$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      {isPreview && (
        <div className="bg-yellow-400 text-yellow-900 text-center p-2 font-bold">
          PREVIEW MODE
        </div>
      )}
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{productName} Review</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">An in-depth look at the best features and performance.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <img 
              src={`https://picsum.photos/seed/${slug}/600/400`} 
              alt={productName} 
              className="rounded-lg shadow-md w-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-gray-600 dark:text-gray-300 font-semibold">4.8 / 5.0</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Key Features</h2>
            <ul className="space-y-2">
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary-500 mr-2 mt-1 flex-shrink-0" /><span>Ultra-fast processing with the new Quantum Core chipset.</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary-500 mr-2 mt-1 flex-shrink-0" /><span>Stunning 16-inch edge-to-edge Retina display.</span></li>
              <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary-500 mr-2 mt-1 flex-shrink-0" /><span>All-day battery life with optimized power management.</span></li>
            </ul>
             <a 
                href="#"
                className="mt-8 inline-block bg-primary-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors text-center"
              >
                Check Price on Amazon
              </a>
          </div>
        </div>

        <article className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold">Our Full Review</h2>
          <p>This is where the AI-generated review content would go. It would provide a detailed analysis of the product, covering its design, performance, features, and value for money. The content would be structured with clear headings, paragraphs, and lists to enhance readability and provide valuable information to the reader.</p>
          <p>The agent would automatically pull specifications, user reviews, and other relevant data from various sources to construct a comprehensive and unbiased review. This ensures the content is not only well-written but also accurate and helpful for making a purchasing decision.</p>
        </article>
      </div>
    </div>
  );
};

export default ProductLandingPage;
