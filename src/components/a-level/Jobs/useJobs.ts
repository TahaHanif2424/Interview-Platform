import { useState, useCallback, useMemo } from 'react';
import type { Job, JobFormData, JobsState } from './types';

// Mock data for demonstration
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    description:
      'We are looking for an experienced Frontend Developer to join our team and help build amazing user interfaces.',
    requirements:
      '5+ years of experience with React, TypeScript, and modern CSS. Strong understanding of web performance optimization.',
    location: 'New York, NY',
    specification:
      'Bachelor\'s degree in Computer Science or related field. Experience with testing frameworks.',
    department: 'Engineering',
    type: 'full-time',
    status: 'open',
    salary: '$120,000 - $150,000',
    createdAt: new Date('2024-01-15'),
    applicants: 24,
  },
  {
    id: '2',
    title: 'Product Designer',
    description:
      'Join our design team to create beautiful and intuitive user experiences for our products.',
    requirements:
      '3+ years of experience in product design. Proficiency in Figma and design systems.',
    location: 'San Francisco, CA',
    specification:
      'Portfolio demonstrating strong visual design skills. Experience with user research.',
    department: 'Design',
    type: 'full-time',
    status: 'open',
    salary: '$100,000 - $130,000',
    createdAt: new Date('2024-01-20'),
    applicants: 18,
  },
  {
    id: '3',
    title: 'Backend Engineer',
    description:
      'Build scalable backend services and APIs to power our growing platform.',
    requirements:
      '4+ years of experience with Node.js, Python, or Go. Experience with cloud services (AWS/GCP).',
    location: 'Remote',
    specification:
      'Strong understanding of database design and optimization. Experience with microservices architecture.',
    department: 'Engineering',
    type: 'remote',
    status: 'open',
    salary: '$110,000 - $140,000',
    createdAt: new Date('2024-01-25'),
    applicants: 32,
  },
  {
    id: '4',
    title: 'Marketing Manager',
    description:
      'Lead our marketing initiatives and drive brand awareness across multiple channels.',
    requirements:
      '5+ years of marketing experience. Proven track record of successful campaigns.',
    location: 'Chicago, IL',
    specification:
      'MBA preferred. Experience with B2B and B2C marketing strategies.',
    department: 'Marketing',
    type: 'full-time',
    status: 'closed',
    salary: '$90,000 - $120,000',
    createdAt: new Date('2024-01-10'),
    applicants: 45,
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    description:
      'Manage and improve our CI/CD pipelines and cloud infrastructure.',
    requirements:
      '3+ years of DevOps experience. Expertise in Docker, Kubernetes, and Terraform.',
    location: 'Austin, TX',
    specification:
      'AWS or GCP certification preferred. Experience with monitoring and logging tools.',
    department: 'Engineering',
    type: 'contract',
    status: 'filled',
    salary: '$130,000 - $160,000',
    createdAt: new Date('2024-01-05'),
    applicants: 28,
  },
];

const initialState: JobsState = {
  jobs: mockJobs,
  selectedJob: null,
  isAddModalOpen: false,
  isDetailsModalOpen: false,
  searchQuery: '',
  filterStatus: 'all',
};

export const useJobs = () => {
  const [state, setState] = useState<JobsState>(initialState);

  // Filtered jobs based on search and status filter
  const filteredJobs = useMemo(() => {
    return state.jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(state.searchQuery.toLowerCase());

      const matchesStatus =
        state.filterStatus === 'all' || job.status === state.filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [state.jobs, state.searchQuery, state.filterStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = state.jobs.length;
    const open = state.jobs.filter((j) => j.status === 'open').length;
    const closed = state.jobs.filter((j) => j.status === 'closed').length;
    const filled = state.jobs.filter((j) => j.status === 'filled').length;
    const totalApplicants = state.jobs.reduce((sum, j) => sum + j.applicants, 0);

    return { total, open, closed, filled, totalApplicants };
  }, [state.jobs]);

  // Open add job modal
  const openAddModal = useCallback(() => {
    setState((prev) => ({ ...prev, isAddModalOpen: true }));
  }, []);

  // Close add job modal
  const closeAddModal = useCallback(() => {
    setState((prev) => ({ ...prev, isAddModalOpen: false }));
  }, []);

  // Open job details modal
  const openDetailsModal = useCallback((job: Job) => {
    setState((prev) => ({
      ...prev,
      selectedJob: job,
      isDetailsModalOpen: true,
    }));
  }, []);

  // Close job details modal
  const closeDetailsModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedJob: null,
      isDetailsModalOpen: false,
    }));
  }, []);

  // Add new job
  const addJob = useCallback((formData: JobFormData) => {
    const newJob: Job = {
      id: Date.now().toString(),
      ...formData,
      status: 'open',
      createdAt: new Date(),
      applicants: 0,
    };

    setState((prev) => ({
      ...prev,
      jobs: [newJob, ...prev.jobs],
      isAddModalOpen: false,
    }));
  }, []);

  // Update job
  const updateJob = useCallback((jobId: string, updates: Partial<Job>) => {
    setState((prev) => ({
      ...prev,
      jobs: prev.jobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
      selectedJob:
        prev.selectedJob?.id === jobId
          ? { ...prev.selectedJob, ...updates }
          : prev.selectedJob,
    }));
  }, []);

  // Delete job
  const deleteJob = useCallback((jobId: string) => {
    setState((prev) => ({
      ...prev,
      jobs: prev.jobs.filter((job) => job.id !== jobId),
      selectedJob: prev.selectedJob?.id === jobId ? null : prev.selectedJob,
      isDetailsModalOpen:
        prev.selectedJob?.id === jobId ? false : prev.isDetailsModalOpen,
    }));
  }, []);

  // Update search query
  const setSearchQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  // Update filter status
  const setFilterStatus = useCallback(
    (status: 'all' | 'open' | 'closed' | 'filled') => {
      setState((prev) => ({ ...prev, filterStatus: status }));
    },
    []
  );

  // Change job status
  const changeJobStatus = useCallback(
    (jobId: string, status: 'open' | 'closed' | 'filled') => {
      updateJob(jobId, { status });
    },
    [updateJob]
  );

  return {
    // State
    jobs: state.jobs,
    filteredJobs,
    selectedJob: state.selectedJob,
    isAddModalOpen: state.isAddModalOpen,
    isDetailsModalOpen: state.isDetailsModalOpen,
    searchQuery: state.searchQuery,
    filterStatus: state.filterStatus,
    stats,

    // Actions
    openAddModal,
    closeAddModal,
    openDetailsModal,
    closeDetailsModal,
    addJob,
    updateJob,
    deleteJob,
    setSearchQuery,
    setFilterStatus,
    changeJobStatus,
  };
};
