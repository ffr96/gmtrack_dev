import { getDate } from "utils/functionUtils";
import DisplayMeasurements from "components/DisplayMeasurements";
import { useAppSelector } from "state/reduxHooks";
import { useGetWeightQuery } from "state/services/serverAPI";
import Spinner from "components/Spinner";

/**
 * Displays the last X weight logs. Defaults to 5.
 */

const WeightInformation = ({
  weightsToRender = 5,
  displayMeasures = true,
}: {
  weightsToRender?: number;
  displayMeasures?: boolean;
}) => {
  const user = useAppSelector((state) => state.user);
  const { data: weight, isLoading } = useGetWeightQuery(user?.id);

  if (isLoading) return <Spinner msg="Loading..." />;
  if (!weight) return <div>No weight added yet! 😒</div>;

  return (
    <div className="w-fit">
      {weight.slice(-weightsToRender).map((wht) => {
        return (
          <div
            key={wht.date.toString()}
            className="mb-6 rounded-lg bg-slate-400/70 p-2"
          >
            <div>
              <b>Reported weight</b> on {getDate(wht.date)}:{" "}
              <span className="font-bold text-violet-800">
                {wht.weight}kg/lb
              </span>
            </div>
            {(wht.measures && displayMeasures && (
              <div>
                <b>Measurements</b>:
                <DisplayMeasurements measures={wht.measures} />
              </div>
            )) || <div>No measurements for this date</div>}
          </div>
        );
      })}
    </div>
  );
};

export default WeightInformation;
