import { useFormik } from "formik";
import * as Yup from "yup";
import { addJobs } from "./functions";
import { useAuthStore } from "../../../../store/authStore";
export const useAddJobs = () => {

    const user=useAuthStore();
    const userId=user.user?.id || '';
    const validationSchema = Yup.object({
      title: Yup.string()
        .required('Job title is required')
        .min(3, 'Title must be at least 3 characters'),
      description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
      requirements: Yup.string()
        .required('Requirements are required')
        .min(10, 'Requirements must be at least 10 characters'),
      location: Yup.string().required('Location is required'),
      specification: Yup.string()
        .required('Specification is required')
        .min(10, 'Specification must be at least 10 characters'),
      department: Yup.string().required('Department is required'),
      type: Yup.string()
        .oneOf(['full-time', 'part-time', 'intern'])
        .required('Job type is required'),
      salary: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            requirements: '',
            location: '',
            specification: '',
            department: '',
            type: 'full-time',
            salary: '',
            status: 'open',
            userId: userId
        },
        validationSchema,
        onSubmit: async (values) => {
            await addJobs(values);
        }
    })
    return { formik };
}