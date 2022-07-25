import { useParams } from "react-router-dom";

const LogById = () => {
  const { id } = useParams();
  console.log(id);
  return <div>{id}</div>;
};

export default LogById;
