import { useQuery } from '@apollo/client';
import { GET_REPOSITORY_BY_ID } from '../graphql/queries';
import ClipLoader from "react-spinners/MoonLoader";

interface RepositoryDetailsProps {
  id: string;
}

const columns = [
  {
    key: "name",
    text: "Name"
  },
  {
    key: "description",
    text: "Description"
  },
  {
    key: "stargazers.totalCount",
    text: "Stars"
  },
  {
    key: "watchers.totalCount",
    text: "Watchers"
  },
  {
    key: "forks.totalCount",
    text: "Forks"
  },
  {
    key: "languages.totalCount",
    text: "Languages"
  },
]

function getValue(object: any, path: string) {
  const keys = path.split('.');
  let value = object;
  keys.forEach(key => value = value[key]);
  return value;
}

function RepositoryDetails({ id }: RepositoryDetailsProps) {
  const { loading, error, data } = useQuery(GET_REPOSITORY_BY_ID, {
    skip: !id,
    variables: {
      id: id
    }
  });

  if (loading) return <ClipLoader color='#4287f5' />
  if (error) return <div>Error</div>

  return (
    <div className='w-full'>
      { data && columns.map((column) => (
        <div key={column.key}>
          <h3 className='font-semibold'>{column.text}</h3>
          <span>{getValue(data.node, column.key)}</span>
        </div>
      ))}
    </div>
  )
}

export default RepositoryDetails