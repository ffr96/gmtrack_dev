import Button from "./Elements/Button";

type PageNavigationProps = {
  currentPage: number;
  changePage: React.Dispatch<React.SetStateAction<number>>;
};

const PageNavigation = ({ currentPage, changePage }: PageNavigationProps) => {
  return (
    <div className="flex flex-row items-center px-2">
      <Button
        onClick={() => changePage(currentPage - 1 >= 0 ? currentPage - 1 : 0)}
      >
        {" "}
        {"<"}{" "}
      </Button>
      <h1 className="font-bold">{currentPage}</h1>
      <Button onClick={() => changePage(currentPage + 1)}> {">"} </Button>
    </div>
  );
};

export default PageNavigation;
