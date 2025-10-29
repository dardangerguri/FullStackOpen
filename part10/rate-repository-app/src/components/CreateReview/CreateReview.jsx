import React from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../../hooks/useCreateReview';
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string(),
});

export const CreateReviewContainer = ({ onSubmit, formError, setFormError }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
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
        style={[styles.input, formik.touched.ownerName && formik.errors.ownerName && styles.inputError]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={handleInputChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={styles.error}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && styles.inputError]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={handleInputChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={styles.error}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={[styles.input, formik.touched.rating && formik.errors.rating && styles.inputError]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={handleInputChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={styles.error}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[styles.input, styles.textArea, formik.touched.text && formik.errors.text && styles.inputError]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={handleInputChange('text')}
        onBlur={formik.handleBlur('text')}
        multiline
        numberOfLines={4}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={styles.error}>{formik.errors.text}</Text>
      )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview, { loading }] = useCreateReview();
  const navigate = useNavigate();
  const [formError, setFormError] = React.useState(null);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setFormError(null);

      const data = await createReview(values);

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      } else {
        setFormError('Review created but could not redirect. Please check the repository manually.');
      }
      resetForm();
    } catch (error) {
      console.error('Error in form submission:', error);

      if (error.errors && error.errors.length > 0) {
        const graphQLError = error.errors[0];
        const errorMessage = graphQLError.message;
        const errorCode = graphQLError.extensions?.code;

        console.log('GraphQL error message:', errorMessage);
        console.log('GraphQL error code:', errorCode);

        if (errorCode === 'NOT_FOUND') {
          setFormError('Repository not found. Please check the owner and repository name.');
        } else if (errorCode === 'DUPLICATE_REVIEW') {
          setFormError('You have already reviewed this repository.');
        } else {
          setFormError(errorMessage || 'An error occurred while creating the review.');
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
    <CreateReviewContainer
      onSubmit={onSubmit}
      formError={formError}
      setFormError={setFormError}
    />
  );
};

export default CreateReview;
