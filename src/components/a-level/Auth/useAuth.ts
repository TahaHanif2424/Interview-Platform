import { useFormik } from 'formik';
import { signupSchema, loginSchema } from './validationSchemas';
import type { Signup, Login } from './types';
import { signup, login } from './functions.ts';
import { useNotification } from '../../c-level';

export const useSignupForm = () => {
  const { showNotification } = useNotification();

  const formik = useFormik<Signup>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      type: 'USER',
    },
    validationSchema: signupSchema,
    onSubmit: async (values: Signup, { setSubmitting, setErrors }) => {
      try {
        const data = await signup(values);

        if (!data.session) {
          showNotification(
            'Please verify your email to proceed forward. Check your inbox for a verification link.',
            'info'
          );
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Signup failed';
        setErrors({ email: message });
        showNotification(message, 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};

export const useLoginForm = () => {
  const { showNotification } = useNotification();

  const formik = useFormik<Login>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await login(values);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Login failed';
        setErrors({ email: message });
        showNotification(message, 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
