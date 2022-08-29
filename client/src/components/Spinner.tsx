import { icons } from "utils/icons";

const Spinner = ({ msg }: { msg: string }) => {
  return (
    <div>
      {icons.spinner} {msg}
    </div>
  );
};

export default Spinner;
