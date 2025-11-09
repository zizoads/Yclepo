import React, { useState, useEffect, useCallback } from 'react';
import { AgentJob, JobStatus } from '../types';
import { getAgentJobs, createAgentJob, approveAndPublishJob } from '../services/api';
import Spinner from '../components/Spinner';
import Badge from '../components/Badge';
import { Eye, CheckCircle, PlusCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<AgentJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [productName, setProductName] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [category, setCategory] = useState('');
  
  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAgentJobs();
      setJobs(data);
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 10000); // Auto-refresh jobs list
    return () => clearInterval(interval);
    // Fix: Add fetchJobs to the dependency array as it's a stable function provided by useCallback.
  }, [fetchJobs]);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await createAgentJob({ productName, affiliateLink, category });
      setProductName('');
      setAffiliateLink('');
      setCategory('');
      setShowForm(false);
      await fetchJobs();
    } catch (err) {
      setError('Failed to create job.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApprove = async (jobId: string) => {
    try {
      await approveAndPublishJob(jobId);
      await fetchJobs();
    } catch (err) {
      setError('Failed to approve and publish job.');
    }
  };

  const JobRow: React.FC<{ job: AgentJob }> = ({ job }) => (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <td className="p-4">
        <div className="font-medium text-gray-900 dark:text-white">{job.productName}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{job.category}</div>
      </td>
      <td className="p-4">
        <Badge status={job.status} />
      </td>
      <td className="p-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
        {new Date(job.createdAt).toLocaleString()}
      </td>
       <td className="p-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
        {new Date(job.updatedAt).toLocaleString()}
      </td>
      <td className="p-4 text-right">
        <div className="flex justify-end items-center gap-2">
          {job.status === JobStatus.REVIEW && job.stagingUrl && (
            <Link to={job.stagingUrl.replace('/#', '')} target="_blank" className="p-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <Eye size={18} />
            </Link>
          )}
          {job.status === JobStatus.REVIEW && (
             <button onClick={() => handleApprove(job.id)} className="p-2 text-green-500 hover:text-green-700 dark:hover:text-green-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <CheckCircle size={18} />
            </button>
          )}
           {job.publishedUrl && (
            <Link to={job.publishedUrl.replace('/#', '')} target="_blank" className="p-2 text-primary-500 hover:text-primary-700 dark:hover:text-primary-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
              <Eye size={18} />
            </Link>
          )}
        </div>
      </td>
    </tr>
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">All Jobs</h2>
        <div className="flex items-center gap-2">
            <button onClick={fetchJobs} disabled={isLoading} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
            </button>
            <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
              <PlusCircle size={20} />
              <span>New Job</span>
            </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <form onSubmit={handleCreateJob}>
            <h2 className="text-xl font-semibold mb-4">Create New Agent Job</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Product Name" required className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
              <input type="url" value={affiliateLink} onChange={e => setAffiliateLink(e.target.value)} placeholder="Affiliate Link" required className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
              <input type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" required className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="py-2 px-4 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-400 flex items-center gap-2">
                  {isSubmitting && <Spinner size="sm" />}
                  Create Job
                </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative mb-6 flex items-center gap-2" role="alert">
          <AlertTriangle />
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {isLoading && jobs.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Product</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">Created</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">Updated</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => <JobRow key={job.id} job={job} />)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
