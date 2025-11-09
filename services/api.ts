import { AgentJob, JobStatus, User, Task, TaskStatus, TaskType } from '../types';

let jobs: AgentJob[] = [
  {
    id: 'job-1',
    productName: 'Quantum Fusion Pro Laptop',
    affiliateLink: 'https://example.com/qf-pro',
    category: 'Electronics',
    status: JobStatus.PUBLISHED,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    stagingUrl: '/#/products/quantum-fusion-pro-laptop-preview',
    publishedUrl: '/#/products/quantum-fusion-pro-laptop',
  },
  {
    id: 'job-2',
    productName: 'AeroGlide X1 Drone',
    affiliateLink: 'https://example.com/aeroglide-x1',
    category: 'Gadgets',
    status: JobStatus.REVIEW,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    stagingUrl: '/#/products/aeroglide-x1-drone-preview',
  },
  {
    id: 'job-3',
    productName: 'SilentScribe Mechanical Keyboard',
    affiliateLink: 'https://example.com/silentscribe',
    category: 'Computer Accessories',
    status: JobStatus.PROCESSING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'job-4',
    productName: 'EcoFlow Smart Water Bottle',
    affiliateLink: 'https://example.com/ecoflow',
    category: 'Lifestyle',
    status: JobStatus.FAILED,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const users: User[] = [
  { id: 'user-1', name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=user-1' },
  { id: 'user-2', name: 'Bob', avatar: 'https://i.pravatar.cc/150?u=user-2' },
  { id: 'user-3', name: 'Charlie', avatar: 'https://i.pravatar.cc/150?u=user-3' },
];

const tasks: Task[] = [
  // Tasks for Job 1 (Published)
  { id: 'task-1-1', jobId: 'job-1', title: 'Write initial product description', type: TaskType.CONTENT_WRITING, status: TaskStatus.COMPLETED, assignedToId: 'user-1', dueDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'task-1-2', jobId: 'job-1', title: 'Optimize meta tags for SEO', type: TaskType.SEO_OPTIMIZATION, status: TaskStatus.COMPLETED, assignedToId: 'user-2', dueDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'task-1-3', jobId: 'job-1', title: 'Final review and approval', type: TaskType.FINAL_APPROVAL, status: TaskStatus.COMPLETED, assignedToId: 'user-3', dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },

  // Tasks for Job 2 (Review)
  { id: 'task-2-1', jobId: 'job-2', title: 'Generate review content', type: TaskType.CONTENT_WRITING, status: TaskStatus.COMPLETED, assignedToId: 'user-1', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'task-2-2', jobId: 'job-2', title: 'Check SEO score and keywords', type: TaskType.SEO_OPTIMIZATION, status: TaskStatus.IN_PROGRESS, assignedToId: 'user-2', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'task-2-3', jobId: 'job-2', title: 'Technical review of staging page', type: TaskType.TECHNICAL_REVIEW, status: TaskStatus.PENDING, assignedToId: 'user-3', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() },

  // Tasks for Job 3 (Processing)
  { id: 'task-3-1', jobId: 'job-3', title: 'Initial data gathering', type: TaskType.CONTENT_WRITING, status: TaskStatus.IN_PROGRESS, assignedToId: 'user-1', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() },

  // Tasks for Job 4 (Failed)
  { id: 'task-4-1', jobId: 'job-4', title: 'Content generation', type: TaskType.CONTENT_WRITING, status: TaskStatus.BLOCKED, assignedToId: 'user-2', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
];


const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getAgentJobs = async (): Promise<AgentJob[]> => {
  await simulateDelay(500);
  return [...jobs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const createAgentJob = async (data: { productName: string; affiliateLink: string; category: string }): Promise<AgentJob> => {
  await simulateDelay(700);
  const newJob: AgentJob = {
    id: `job-${Date.now()}`,
    ...data,
    status: JobStatus.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  jobs.push(newJob);

  // Simulate agent processing
  setTimeout(() => {
    const jobIndex = jobs.findIndex(j => j.id === newJob.id);
    if (jobIndex !== -1) {
      jobs[jobIndex].status = JobStatus.PROCESSING;
      
      setTimeout(() => {
         const jobIndex2 = jobs.findIndex(j => j.id === newJob.id);
         if(jobIndex2 !== -1){
            jobs[jobIndex2].status = JobStatus.REVIEW;
            jobs[jobIndex2].stagingUrl = `/#/products/${data.productName.toLowerCase().replace(/\s+/g, '-')}-preview`;
         }
      }, 5000);
    }
  }, 2000);

  return newJob;
};

export const approveAndPublishJob = async (jobId: string): Promise<AgentJob> => {
  await simulateDelay(1000);
  const jobIndex = jobs.findIndex(j => j.id === jobId);
  if (jobIndex === -1 || jobs[jobIndex].status !== JobStatus.REVIEW) {
    throw new Error('Job not found or not ready for publishing.');
  }
  jobs[jobIndex].status = JobStatus.PUBLISHED;
  jobs[jobIndex].publishedUrl = jobs[jobIndex].stagingUrl?.replace('-preview', '');
  jobs[jobIndex].updatedAt = new Date().toISOString();
  return { ...jobs[jobIndex] };
};

export const getUsers = async (): Promise<User[]> => {
  await simulateDelay(200);
  return [...users];
};

export const getTasks = async (): Promise<Task[]> => {
  await simulateDelay(600);
  return [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};
