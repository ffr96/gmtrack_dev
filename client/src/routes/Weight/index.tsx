import Main from "../../components/Main";
import { useAppSelector } from "../../state/reduxHooks";
import { useGetWeightQuery } from "../../state/services/serverAPI";

const WeightPage = () => {
  const user = useAppSelector((state) => state.user);
  const { data: weight, isLoading } = useGetWeightQuery(user?.id);

  if (isLoading) return <div>loading</div>;
  console.log(weight);
  return <Main>Weight page</Main>;
};

export default WeightPage;
