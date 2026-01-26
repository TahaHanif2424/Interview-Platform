import React from 'react';
import { Modal, Input, Button } from '../../../c-level';
import type { JobFormData } from '../../../a-level/Jobs/types';
import { useAddJobs } from './use-add-jobs';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JobFormData) => void;
}

export const AddJobModal: React.FC<AddJobModalProps> = ({
  isOpen,
  onClose,
}) => {

  const { formik } = useAddJobs();

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Job" size="lg">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Job Title"
            name="title"
            placeholder="e.g. Senior Frontend Developer"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title ? formik.errors.title : undefined}
          />
          <Input
            label="Department"
            name="department"
            placeholder="e.g. Engineering"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.department ? formik.errors.department : undefined
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Location"
            name="location"
            placeholder="e.g. New York, NY"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location ? formik.errors.location : undefined}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-text">Job Type</label>
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent bg-white text-text"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="intern">Intern</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <span className="text-xs text-red-500">{formik.errors.type}</span>
            )}
          </div>
        </div>

        <Input
          label="Salary Range (Optional)"
          name="salary"
          placeholder="e.g. $100,000 - $130,000"
          value={formik.values.salary}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.salary ? formik.errors.salary : undefined}
        />

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text">Description</label>
          <textarea
            name="description"
            placeholder="Describe the role and responsibilities..."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none text-text"
          />
          {formik.touched.description && formik.errors.description && (
            <span className="text-xs text-red-500">
              {formik.errors.description}
            </span>
          )}
        </div>

        {/* Requirements */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text">Requirements</label>
          <textarea
            name="requirements"
            placeholder="List the required skills and experience..."
            value={formik.values.requirements}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none text-text"
          />
          {formik.touched.requirements && formik.errors.requirements && (
            <span className="text-xs text-red-500">
              {formik.errors.requirements}
            </span>
          )}
        </div>

        {/* Specification */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text">Specification</label>
          <textarea
            name="specification"
            placeholder="Additional qualifications and specifications..."
            value={formik.values.specification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-none text-text"
          />
          {formik.touched.specification && formik.errors.specification && (
            <span className="text-xs text-red-500">
              {formik.errors.specification}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="secondary" onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={formik.isSubmitting}>
            Add Job
          </Button>
        </div>
      </form>
    </Modal>
  );
};
