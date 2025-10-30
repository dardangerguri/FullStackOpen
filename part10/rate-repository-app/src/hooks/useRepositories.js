import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy = 'CREATED_AT', orderDirection = 'DESC') => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data?.repositories ?? null,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
