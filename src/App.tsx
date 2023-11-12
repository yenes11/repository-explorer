import { SyntheticEvent, useEffect, useState } from 'react';
import './App.css'
import Button from './components/button'
import Table from './components/table'
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from './graphql/queries';
import Modal from './components/modal';
import RepositoryDetails from './components/repository-details';
import ChevronRightIcon from './assets/chevron-right-icon.svg';
import ChevronLeftIcon from './assets/chevron-left-icon.svg';
import { Column, TableData } from './types';

const columns: Column[] = [
  {
    key: "name",
    text: "Name",
  },
  {
    key: "owner",
    text: "Owner",
  },
  {
    key: "details",
    text: "",
    align: "right"
  }
]


function App() {
  const [keyword, setKeyword] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [cursor, setCursor] = useState(0);
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    skip: !keyword,
    variables: {
      keyword: keyword + " in:name,owner",
      perPage,
      cursor: btoa(`cursor:${cursor}`)
    }
  });


  const [selectedRepositoryId, setSelectedRepositoId] = useState('');

  const [tableData, setTableData] = useState<TableData[]>([]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  
  const showDetails =  (id: string) => {
    setSelectedRepositoId(id);
    setDetailsVisible(true);
  }


  useEffect(() => {
    if (data) {
     const output: TableData[] = [];
     data.search.edges.forEach((row: any) => {
      const item = row.node;
      output.push({
        name: item.name,
        owner: item.owner.login,
        key: item.id,
        details: <Button variant='secondary' onClick={() => showDetails(item.id)}>Details</Button>
      })
     });

     setTableData(output);
    }
  }, [data])

  const nextPage = () => {
    setTableData([]);
    setCursor(prev => prev + perPage);
  }

  const prevPage = () => {
    setTableData([]);
    setCursor(prev => prev + perPage);
  }

  const onSearch = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    setTableData([]);
    const input = e.currentTarget[0] as HTMLInputElement;
    setKeyword(input.value);
  }

  return (
    <div className='py-5 container mx-auto'>
      <Table
        columns={columns}
        data={tableData}
        loading={loading}
        error={error}
        onSearch={onSearch}
      />
      <div className='bg-[#F4F7FC] py-2 px-4 rounded-b-lg flex justify-between items-center shadow text-sm'>
        <span>{cursor + 1}/{cursor + perPage} of {data?.search?.repositoryCount}</span>
        <div className='flex gap-2 items-center'>
          <label htmlFor="perpage">Rows per page: </label>
          <select value={perPage} onChange={(e) => setPerPage(+e.target.value)}>
            {[10, 20, 30].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <Button
            disabled={!data || cursor <= 0}
            onClick={prevPage}
            variant='secondary'
            className='py-1 px-[8px]'
          >
            <img src={ChevronLeftIcon} width={8} alt="previous" />
          </Button>
          {cursor + 1}/{cursor + 10}
          <Button
            disabled={!data || cursor + perPage >= data?.search?.repositoryCount}
            onClick={nextPage}
            variant='secondary'
            className='py-1 px-[8px]'
          >
            <img src={ChevronRightIcon} width={8} alt="next" />
          </Button>
        </div>
      </div>
      <Modal className='w-1/4 flex items-center justify-center min-h-[18rem]' visible={detailsVisible} onClose={() => setDetailsVisible(false)}>
        <RepositoryDetails id={selectedRepositoryId} />
      </Modal>
    </div>
  )
}

export default App
