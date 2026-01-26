export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  specification: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  status: 'open' | 'closed' | 'filled';
  salary?: string;
  createdAt: Date;
  applicants: number;
}

export interface JobFormData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  specification: string;
  department: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: string;
}

export interface JobsState {
  jobs: Job[];
  selectedJob: Job | null;
  isAddModalOpen: boolean;
  isDetailsModalOpen: boolean;
  searchQuery: string;
  filterStatus: 'all' | 'open' | 'closed' | 'filled';
}
