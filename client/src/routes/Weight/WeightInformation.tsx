import { getDate } from "utils/functionUtils";
import DisplayMeasurements from "components/DisplayMeasurements";
import { useAppSelector } from "state/reduxHooks";
import { useGetWeightQuery } from "state/services/serverAPI";
import Spinner from "components/Spinner";

/**
 * Displays the last weight logs in descending order.
 *
 *  @param page if page is specified, 5 logs will be returned. 5*page will be skipped
 *
 *  @param displayMeasures whether to display measures (if present)
 */

const WeightInformation = ({
  displayMeasures = true,
  filter,
  page,
}: {
  page?: number;
  filter?: {
    name?: string;
    from?: string;
    to?: string;
  };
  displayMeasures?: boolean;
}) => {
  const user = useAppSelector((state) => state.user);
  const { data: weight, isLoading } = useGetWeightQuery({
    id: user?.id,
    page: filter ? undefined : page,
    filter: filter,
  });

  console.log(filter);

  if (isLoading) return <Spinner msg="Loading..." />;
  if (!weight) return <div>No weight added yet! 😒</div>;

  return (
    <div className="w-fit">
      {weight.map((wht) => {
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
            {displayMeasures &&
              ((wht.measures && (
                <div>
                  <b>Measurements</b>:
                  <DisplayMeasurements measures={wht.measures} />
                </div>
              )) || <div>No measurements for this date</div>)}
          </div>
        );
      })}
    </div>
  );
};

export default WeightInformation;
