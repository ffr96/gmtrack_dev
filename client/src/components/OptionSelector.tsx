import Select, { MultiValue, SingleValue, StylesConfig } from "react-select";
import { Options } from "../types";
//type OptionSelectorProps = {
//  options: Array<{ id: string; value: string; text: string }>;
//  multiple?: boolean;
//  onChange: (e: HTMLSelectElement) => void;
//};

//

//const OptionSelector = ({
//  options,
//  multiple = false,
//  onChange,
//}: OptionSelectorProps) => {
//  return (
//    <div>
//      <select
//        multiple={multiple}
//        onChange={(e) => onChange(e.target)}
//        defaultValue={options[0].value}
//      >
//        {options.map((opt) => {
//          return (
//            <option value={opt.value} id={opt.id} key={opt.id}>
//              {opt.text}
//            </option>
//          );
//        })}
//      </select>
//    </div>
//  );
//};
//
//export default OptionSelector;

const multiStyle: StylesConfig<Options, true> = {
  option: (provided, { isFocused, isSelected }) => {
    return {
      ...provided,
      background: isFocused ? "#88ebc6" : isSelected ? "#88ccc6" : "",
      ":active": {
        ...provided[":active"],
        backgroundColor: "#58ebd2",
      },
    };
  },
};

const singleStyle: StylesConfig<Options, false> = {
  option: (provided, { isFocused, isSelected }) => {
    return {
      ...provided,
      background: isFocused ? "#88ebc6" : isSelected ? "#88ccc6" : "",
      ":active": {
        ...provided[":active"],
        backgroundColor: "#58ebd2",
      },
    };
  },
};

interface MultiSProps {
  name: string;
  onChange: (e: MultiValue<Options>) => void;
  options?: Array<Options>;
}

interface SingleSProps {
  name: string;
  onChange: (e: SingleValue<Options>) => void;
  options?: Array<Options>;
}

const MultiSelect = ({ name, onChange, options }: MultiSProps) => {
  return (
    <Select
      options={options}
      isMulti
      name={name}
      styles={multiStyle}
      onChange={onChange}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="basic-multi-select"
      classNamePrefix={"select"}
    />
  );
};

const SingleSelect = ({ name, onChange, options }: SingleSProps) => {
  return (
    <Select
      options={options}
      styles={singleStyle}
      name={name}
      onChange={onChange}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="basic-single"
      classNamePrefix={"select"}
    />
  );
};

const handleGroupTags = (
  event: MultiValue<{ value: string; label: string }>
) => {
  const toTags: Array<string> = [];
  event.forEach((e) => toTags.push(e.value));
  return toTags;
};

const handleTag = (event: SingleValue<{ value: string; label: string }>) => {
  return event ? event.value : "";
};

export { MultiSelect, handleGroupTags, SingleSelect, handleTag };
