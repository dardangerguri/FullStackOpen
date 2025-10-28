import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repository: data?.repository,
    loading,
    error,
    refetch,
  };
};

export default useRepository;
