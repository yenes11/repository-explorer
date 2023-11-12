import { SyntheticEvent } from "react";
import Button from "./button";
import EmptyIcon from '../assets/empty-icon.svg';
import ClipLoader from "react-spinners/ClipLoader";
import { ApolloError } from "@apollo/client";
import { Column } from "../types";


interface TableProps<T extends { key: React.Key}> {
  onSearch: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
  columns: Array<Column>;
  data: Array<T>;
  loading: boolean;
  error: ApolloError | undefined;
}

function Table<T extends { key: React.Key}>({ onSearch, columns, data, loading, error }: TableProps<T>) {
  return (
    <div className="shadow w-full rounded-t-lg text-left  block overflow-x-auto whitespace-nowrap">
      <form className="flex pt-4 pb-2 px-4 bg-[#F4F7FC] rounded-t-lg gap-2" onSubmit={onSearch}>
        <input name="keyword" placeholder="User name or repository" className="w-full focus:outline-blue-100 focus:outline-offset-2 text-gray-800 focus:border-0 shadow rounded py-1 px-2" type="text" />
        <Button type="submit">Search</Button>
      </form>
      <table className="w-full">
        <thead className="py-4 bg-[#F4F7FC]">
          <tr className="py-2">
            { columns.map(column => (
              <th key={column.key} className="px-4 py-2  font-semibold uppercase">{column.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr className={index % 2 ? 'bg-[#F4F7FC]': ''} key={row.key}>
              { columns.map(column => (
                <td align={column.align} key={column.key} className="px-4 py-2">{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      { loading ? (
          <div className="flex justify-center p-12">
            <ClipLoader color='#4287f5' /> 
          </div>
        )
        : error ? ( <div  className="flex justify-center p-12">{error.message}</div>)
        : !data.length && (
        <div className="text-center text-slate-300 p-12">
          <img className="left-0 right-0 mx-auto w-24 " src={EmptyIcon} alt="empty" />
          No data
        </div>
      )}
    </div>
  )
}

export default Table