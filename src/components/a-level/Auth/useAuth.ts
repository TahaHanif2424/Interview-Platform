import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { signupSchema, loginSchema } from './validationSchemas';
import type { Signup, Login } from './types';
import { signup } from './functions.ts';

export const useSignupForm = () => {
  const formik = useFormik<Signup>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      type: 'USER',
    },
    validationSchema: signupSchema,
    onSubmit: async (values: Signup) => {
      const data = await signup(values);
      console.log(data);
    },
  });

  return formik;
};

export const useLoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik<Login>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // TODO: Replace with actual API 
        console.log('Login values:', values);
        localStorage.setItem('token', 'dummy-token');
        navigate('/dashboard');
      } catch (error) {
        setErrors({ email: 'Invalid email or password. The error is '+ error });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
