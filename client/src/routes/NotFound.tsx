import { Link } from "react-router-dom";
import Main from "../components/Main";

const NotFound = () => {
  return (
    <Main>
      <div className="flex h-full flex-col content-center justify-center text-center">
        <div>404 - Not Found</div>
        <Link to="/">Go back</Link>
      </div>
    </Main>
  );
};

export default NotFound;
