import Input from "./Input/Input";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";

const FilterOptions = ({
  filter,
  setFilter,
}: {
  filter?: {
    name?: string;
    to?: string;
    from?: string;
  };
  setFilter: React.Dispatch<
    React.SetStateAction<
      | {
          name?: string;
          to?: string;
          from?: string;
        }
      | undefined
    >
  >;
}) => {
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div
      className={`relative flex flex-col items-center rounded-lg bg-slate-300 px-4 pb-6 shadow-lg`}
    >
      <Input
        autoComplete="off"
        id="filterName"
        value={filter?.name ?? ""}
        placeholder={"Name"}
        onChange={(e) => setFilter({ ...filter, name: e.target.value })}
      />
      <div className="flex flex-col md:flex-row">
        <span className="pr-2">From:</span>
        <DatePicker
          selected={beginDate}
          onChange={(date: Date) => {
            setBeginDate(date);
            setFilter({ ...filter, from: date.toISOString() });
          }}
        />
        <span className="pr-2 md:px-2">To:</span>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => {
            setEndDate(date);
            setFilter({ ...filter, to: date.toISOString() });
          }}
        />
      </div>
      {filter && (
        <Button
          className="animate-fadeIn font-bold"
          onClick={() => {
            setFilter(undefined);
            setBeginDate(new Date());
            setEndDate(new Date());
          }}
        >
          Reset Filter
        </Button>
      )}
    </div>
  );
};

export default FilterOptions;
