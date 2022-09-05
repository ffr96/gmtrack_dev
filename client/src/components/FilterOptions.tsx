import Input from "./Input/Input";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterOptions = ({
  name,
  setName,
  setFrom,
  setTo,
}: {
  name: string;
  from?: string;
  to?: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setFrom: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTo: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [beginDate, setBeginDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <div className="flex flex-col items-center rounded-lg bg-slate-300 px-4 pb-6 shadow-lg">
      <Input
        autoComplete="off"
        id="filterName"
        value={name}
        placeholder={"Name to filter by"}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex flex-col md:flex-row">
        <span className="pr-2">From:</span>
        <DatePicker
          selected={beginDate}
          onChange={(date: Date) => {
            setBeginDate(date);
            setFrom(date.toISOString());
          }}
        />
        <span className="pr-2 md:px-2">To:</span>
        <DatePicker
          selected={endDate}
          onChange={(date: Date) => {
            setEndDate(date);
            setTo(date.toISOString());
          }}
        />
      </div>
    </div>
  );
};

export default FilterOptions;
