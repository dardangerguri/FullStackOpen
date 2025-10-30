import { useQuery } from '@apollo/client/react';
import { GET_ME } from '../graphql/queries';

const useUserReviews = () => {
  const { data, loading, error, refetch } = useQuery(GET_ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  return {
    reviews: data?.me?.reviews?.edges.map(edge => edge.node) || [],
    loading,
    error,
    refetch,
  };
};

export default useUserReviews;
