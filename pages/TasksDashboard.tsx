import React, { useState, useEffect, useMemo } from 'react';
import { AgentJob, Task, User, TaskType } from '../types';
import { getAgentJobs, getTasks, getUsers } from '../services/api';
import Spinner from '../components/Spinner';
import Badge from '../components/Badge';
import { AlertTriangle, Calendar } from 'lucide-react';

// A map for prettier task type names
const taskTypeNames: Record<TaskType, string> = {
  [TaskType.CONTENT_WRITING]: 'Content Writing',
  [TaskType.SEO_OPTIMIZATION]: 'SEO Optimization',
  [TaskType.DESIGN_REVIEW]: 'Design Review',
  [TaskType.TECHNICAL_REVIEW]: 'Technical Review',
  [TaskType.FINAL_APPROVAL]: 'Final Approval',
};

const TasksDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [jobs, setJobs] = useState<AgentJob[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [tasksData, jobsData, usersData] = await Promise.all([
          getTasks(),
          getAgentJobs(),
          getUsers(),
        ]);
        setTasks(tasksData);
        setJobs(jobsData);
        setUsers(usersData);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const dataMap = useMemo(() => {
    const jobsMap = new Map(jobs.map(job => [job.id, job]));
    const usersMap = new Map(users.map(user => [user.id, user]));
    return { jobsMap, usersMap };
  }, [jobs, users]);


  const TaskRow: React.FC<{ task: Task }> = ({ task }) => {
    const job = dataMap.jobsMap.get(task.jobId);
    const user = dataMap.usersMap.get(task.assignedToId);

    return (
        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <td className="p-4">
                <div className="font-medium text-gray-900 dark:text-white">{task.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{taskTypeNames[task.type]}</div>
            </td>
            <td className="p-4">
                <Badge status={task.status} />
            </td>
            <td className="p-4 text-sm text-gray-700 dark:text-gray-300 hidden md:table-cell">
                {job?.productName || 'N/A'}
            </td>
            <td className="p-4 hidden sm:table-cell">
                {user && (
                    <div className="flex items-center gap-2">
                        <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                        <span className="font-medium">{user.name}</span>
                    </div>
                )}
            </td>
            <td className="p-4 text-sm text-gray-500 dark:text-gray-400 hidden lg:table-cell">
                <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(task.dueDate).toLocaleDateString()}
                </div>
            </td>
        </tr>
    );
  };
  
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">All Tasks</h2>
        </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg relative mb-6 flex items-center gap-2" role="alert">
          <AlertTriangle />
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Task</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">Product</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden sm:table-cell">Assigned To</th>
                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => <TaskRow key={task.id} task={task} />)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TasksDashboard;
