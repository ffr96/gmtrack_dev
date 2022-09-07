import Input from "./Input/Input";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";

/**
 *  Filter component expecting an object of the type filter and a SetState to perform operations on it the object.
 *
 *  @param filter Expects an object with (all optional) name, to, from
 *  @param setFilter a React SetState to edit filter
 *  @param showName whether to show name input or not (defaults to true)
 *
 *
 *  Name ``input`` is debounced (300ms)
 */

const FilterOptions = ({
  filter,
  setFilter,
  showName = true,
}: {
  showName?: boolean;
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
  const [name, setName] = useState<string>("");
  const [debouncedValue] = useDebouncedValue(name, 400);

  useEffect(() => {
    if (name) setFilter({ ...filter, name: debouncedValue });
  }, [debouncedValue]);

  return (
    <div
      className={`relative flex flex-col items-center rounded-lg bg-slate-300 p-4 pb-6 shadow-lg`}
    >
      {showName && (
        <Input
          autoComplete="off"
          id="filterName"
          value={name}
          placeholder={"Name"}
          onChange={(e) => setName(e.target.value)}
        />
      )}
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
