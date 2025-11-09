import React from 'react';
import { JobStatus, TaskStatus } from '../types';

interface BadgeProps {
  status: JobStatus | TaskStatus;
}

const statusStyles: Record<JobStatus | TaskStatus, string> = {
  // Job Statuses
  [JobStatus.PENDING]: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  [JobStatus.PROCESSING]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 animate-pulse',
  [JobStatus.REVIEW]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  [JobStatus.PUBLISHED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [JobStatus.FAILED]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',

  // Task Statuses
  [TaskStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 animate-pulse',
  [TaskStatus.COMPLETED]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  [TaskStatus.BLOCKED]: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
};

const Badge: React.FC<BadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
};

export default Badge;
