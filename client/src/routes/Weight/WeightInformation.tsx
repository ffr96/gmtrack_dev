import { getDate } from "../../utils/functionUtils";
import DisplayMeasurements from "./DisplayMeasurements";
import { useAppSelector } from "../../state/reduxHooks";
import { useGetWeightQuery } from "../../state/services/serverAPI";

/**
 * Displays the last X weight logs. Defaults to 5.
 * Similar to RecentTraining
 */

const WeightInformation = ({
  weightsToRender = 5,
}: {
  weightsToRender?: number;
}) => {
  const user = useAppSelector((state) => state.user);
  const { data: weight, isLoading } = useGetWeightQuery(user?.id);

  if (!weight || isLoading) return <div>loading..</div>;

  return (
    <div>
      {weight.slice(-weightsToRender).map((wht) => {
        return (
          <div key={wht.date.toString()} className="mb-6">
            <div>
              <b>Reported weight</b> on {getDate(wht.date)}:{" "}
              <span className="font-bold text-violet-800">
                {wht.weight}kg/lb
              </span>
            </div>
            {wht.measures && (
              <div>
                <b>Measurements</b>:
                <DisplayMeasurements measures={wht.measures} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WeightInformation;
