import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AgentJob, Task, User, JobStatus, TaskStatus } from '../types';
import { getAgentJobs, getTasks, getUsers } from '../services/api';
import Spinner from '../components/Spinner';
import Badge from '../components/Badge';
import { Package, Globe, ListChecks, Users, Plus, UserCog, BarChart3, Settings, AlertTriangle } from 'lucide-react';

const DashboardCard: React.FC<{ title: string; value: string | number; description: string; icon: React.ReactNode }> = ({ title, value, description, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
      <div className="text-primary-500">{icon}</div>
    </div>
  </div>
);

const RecentTasks: React.FC<{ tasks: Task[], jobs: AgentJob[] }> = ({ tasks, jobs }) => {
    const jobsMap = useMemo(() => new Map(jobs.map(job => [job.id, job])), [jobs]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Tasks</h3>
            <div className="space-y-3">
                {tasks.length > 0 ? tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between p-3 border dark:border-gray-600 rounded-lg">
                        <div>
                           <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                           <p className="text-xs text-gray-500 dark:text-gray-400">{jobsMap.get(task.jobId)?.productName}</p>
                        </div>
                        <Badge status={task.status} />
                    </div>
                )) : <p className="text-sm text-gray-500 dark:text-gray-400">No active tasks.</p>}
            </div>
        </div>
    );
};

const QuickActions: React.FC = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
            <Link to="/dashboard/jobs" className="flex flex-col items-center justify-center p-3 border dark:border-gray-600 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Plus size={24} className="mb-2 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Product Job</span>
            </Link>
            <button className="flex flex-col items-center justify-center p-3 border dark:border-gray-600 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-not-allowed opacity-60">
                <UserCog size={24} className="mb-2 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Manage Agents</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 border dark:border-gray-600 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-not-allowed opacity-60">
                <BarChart3 size={24} className="mb-2 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View Reports</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 border dark:border-gray-600 rounded-lg text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-not-allowed opacity-60">
                <Settings size={24} className="mb-2 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Settings</span>
            </button>
        </div>
    </div>
);


const DashboardOverview: React.FC = () => {
  const [stats, setStats] = useState({ products: 0, published: 0, activeTasks: 0, agents: 0 });
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [allJobs, setAllJobs] = useState<AgentJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [jobsData, tasksData, usersData] = await Promise.all([
          getAgentJobs(),
          getTasks(),
          getUsers(),
        ]);
        
        setAllJobs(jobsData);
        setRecentTasks(tasksData.filter(t => t.status !== TaskStatus.COMPLETED).slice(0, 3));
        setStats({
          products: jobsData.length,
          published: jobsData.filter(j => j.status === JobStatus.PUBLISHED).length,
          activeTasks: tasksData.filter(t => t.status === TaskStatus.IN_PROGRESS || t.status === TaskStatus.PENDING).length,
          agents: usersData.length,
        });

      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
     return (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative flex items-center gap-2" role="alert">
          <AlertTriangle />
          <span className="block sm:inline">{error}</span>
        </div>
     );
  }

  return (
    <div className="space-y-8">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <DashboardCard 
           title="Total Products" 
           value={stats.products}
           description="Active and completed jobs" 
           icon={<Package size={32} />}
         />
         <DashboardCard 
           title="Published Pages" 
           value={stats.published}
           description="Live on the web" 
           icon={<Globe size={32} />}
         />
         <DashboardCard 
           title="Active Tasks" 
           value={stats.activeTasks}
           description="Pending or in progress" 
           icon={<ListChecks size={32} />}
         />
         <DashboardCard 
           title="Active Agents" 
           value={stats.agents}
           description="Ready for assignments" 
           icon={<Users size={32} />}
         />
       </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTasks tasks={recentTasks} jobs={allJobs} />
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardOverview;
