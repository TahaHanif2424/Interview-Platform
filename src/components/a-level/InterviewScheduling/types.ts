export interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface InterviewFormData {
  candidateName: string;
  candidateEmail: string;
  position: string;
  date: string;
  time: string;
  duration: number;
  notes?: string;
}

export interface InterviewSchedulingState {
  interviews: Interview[];
  currentMonth: Date;
  selectedDate: Date | null;
  isScheduleModalOpen: boolean;
  isDayModalOpen: boolean;
}
