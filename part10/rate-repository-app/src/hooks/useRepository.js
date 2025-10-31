import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first = 5) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = async () => {
    const reviews = data?.repository?.reviews;
    const canFetchMore = !loading && reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) return;

    await fetchMore({
      variables: {
        id,
        first,
        after: reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    repository: data?.repository,
    loading,
    error,
    fetchMore: handleFetchMore,
  };
};

export default useRepository;
