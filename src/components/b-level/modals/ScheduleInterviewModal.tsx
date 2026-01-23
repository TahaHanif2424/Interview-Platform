import React, { useState } from 'react';
import { Modal, Button, Input } from '../../c-level';
import type { InterviewFormData } from '../../a-level/InterviewScheduling/types';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InterviewFormData) => void;
  selectedDate?: Date | null;
}

const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
}) => {
  const [formData, setFormData] = useState<InterviewFormData>({
    candidateName: '',
    candidateEmail: '',
    position: '',
    date: selectedDate
      ? selectedDate.toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    time: '10:00',
    duration: 60,
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InterviewFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof InterviewFormData, string>> = {};

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = 'Candidate name is required';
    }
    if (!formData.candidateEmail.trim()) {
      newErrors.candidateEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.candidateEmail)) {
      newErrors.candidateEmail = 'Invalid email format';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
      setFormData({
        candidateName: '',
        candidateEmail: '',
        position: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        duration: 60,
        notes: '',
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof InterviewFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Schedule Interview" size="md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          label="Candidate Name"
          name="candidateName"
          value={formData.candidateName}
          onChange={handleChange}
          error={errors.candidateName}
          placeholder="John Doe"
        />

        <Input
          label="Candidate Email"
          name="candidateEmail"
          type="email"
          value={formData.candidateEmail}
          onChange={handleChange}
          error={errors.candidateEmail}
          placeholder="john@example.com"
        />

        <Input
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          error={errors.position}
          placeholder="Software Engineer"
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
          />

          <Input
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            error={errors.time}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Duration
          </label>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
          >
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>1 hour</option>
            <option value={90}>1.5 hours</option>
            <option value={120}>2 hours</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Any additional notes..."
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all resize-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-3">
          <Button variant="secondary" type="button" onClick={onClose} className="text-xs px-3 py-2">
            Cancel
          </Button>
          <Button type="submit" className="text-xs px-3 py-2">Schedule</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ScheduleInterviewModal;
