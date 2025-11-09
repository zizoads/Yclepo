export enum JobStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  REVIEW = 'REVIEW',
  PUBLISHED = 'PUBLISHED',
  FAILED = 'FAILED',
}

export interface AgentJob {
  id: string;
  productName: string;
  affiliateLink: string;
  category: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
  stagingUrl?: string;
  publishedUrl?: string;
}

// New types based on the blueprint
export interface User {
  id: string;
  name: string;
  avatar: string; // To make UI nicer
}

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  BLOCKED = 'BLOCKED',
}

export enum TaskType {
  CONTENT_WRITING = 'CONTENT_WRITING',
  SEO_OPTIMIZATION = 'SEO_OPTIMIZATION',
  DESIGN_REVIEW = 'DESIGN_REVIEW',
  TECHNICAL_REVIEW = 'TECHNICAL_REVIEW',
  FINAL_APPROVAL = 'FINAL_APPROVAL',
}

export interface Task {
  id: string;
  jobId: string;
  title: string;
  type: TaskType;
  status: TaskStatus;
  assignedToId: string;
  dueDate: string;
}
