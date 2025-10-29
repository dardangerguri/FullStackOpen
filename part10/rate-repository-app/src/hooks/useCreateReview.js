import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const review = {
      ownerName,
      repositoryName,
      rating: Number(rating),
      text: text || '',
    };

    const { data } = await mutate({ variables: { review } });
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;
