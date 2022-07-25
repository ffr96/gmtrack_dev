type InputProps = {
  value: string;
  placeholder?: string;
  name: string;
  disabled?: boolean;
  onChange?: ({ target }: { target: HTMLInputElement }) => void;
  required?: boolean;
  type?: string;
};

const Input = ({
  value,
  placeholder,
  name,
  required,
  type,
  disabled,
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col items-center justify-between md:flex-row">
      <span className="pr-2">{name}:</span>
      <input
        className={`m-2 h-4 border-b-4 ${
          disabled ? "border-teal-200" : "border-teal-400"
        } bg-slate-50 p-4 transition-colors duration-500 focus:border-violet-400 focus:outline-none`}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required={required}
        type={type}
      />
    </div>
  );
};

export default Input;
