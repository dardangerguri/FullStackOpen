import React from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateUser from '../../hooks/useCreateUser';
import useSignIn from '../../hooks/useSignIn';
import Text from '../ui/Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: theme.colors.error,
    marginBottom: 10,
  },
  formError: {
    color: theme.colors.error,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: '#ffe6e6',
    padding: 10,
    borderRadius: 5,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const SignUpContainer = ({ onSubmit, formError, setFormError }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit,
  });

  const handleInputChange = (fieldName) => (text) => {
    formik.handleChange(fieldName)(text);
    if (formError && setFormError) {
      setFormError(null);
    }
  };

  return (
    <View style={styles.container}>
      {formError && (
        <Text style={styles.formError}>{formError}</Text>
      )}

      <TextInput
        style={[styles.input, formik.touched.username && formik.errors.username && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={handleInputChange('username')}
        onBlur={formik.handleBlur('username')}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[styles.input, formik.touched.password && formik.errors.password && styles.inputError]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={handleInputChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={[styles.input, formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && styles.inputError]}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={handleInputChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={styles.error}>{formik.errors.passwordConfirmation}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();
  const [formError, setFormError] = React.useState(null);

  const onSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      setFormError(null);
      setErrors({});

      const { username, password } = values;
      await createUser({ username, password });

      const { data } = await signIn({ username, password });

      if (data?.authenticate?.accessToken) {
        navigate('/');
      }
      resetForm();
    } catch (error) {
      console.error('Sign up error:', error);

      if (error.errors && error.errors.length > 0) {
        const graphQLError = error.errors[0];
        const errorMessage = graphQLError.message;
        const errorCode = graphQLError.extensions?.code;

        console.log('GraphQL error message:', errorMessage);
        console.log('GraphQL error code:', errorCode);

        if (errorCode === 'USERNAME_TAKEN' || errorMessage.includes('already taken')) {
          setFormError('This username is already taken. Please choose a different one.');
          setErrors({ username: 'Username is already taken' });
        } else {
          setFormError(errorMessage || 'An error occurred during sign up.');
        }
      } else if (error.networkError) {
        setFormError('Network error. Please check your connection and try again.');
      } else {
        setFormError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SignUpContainer
      onSubmit={onSubmit}
      formError={formError}
      setFormError={setFormError}
    />
  );
};

export default SignUp;
