import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "state/reduxHooks";
import { selectRecentLogs } from "state/trainingReducer";
import { getDate } from "utils/functionUtils";

/**
 * @param logsToRender
 * Shows the last X logs of a given user (defaults to 5).
 * A value of 0 will cause it to show all the logs.
 * @param filter
 * Filters by date
 */

const RecentTraining = ({
  logsToRender = 5,
  filter,
}: {
  logsToRender?: number;
  filter?: { from: Date; to: Date };
}) => {
  const tlogs = useAppSelector((state) =>
    selectRecentLogs(state, logsToRender)
  );
  const location = useLocation();

  return (
    <div>
      {(tlogs &&
        tlogs.map((tl) => {
          return (
            <div className="mb-6 w-fit hover:text-slate-600" key={tl.id}>
              <Link
                to={`../logs/${tl.id}`}
                state={{ backgroundLocation: location }}
              >
                <div>
                  <b>Training on day</b>: {getDate(tl.date)}{" "}
                </div>
                <div>
                  <b>Comments </b> about the day: {tl.comments}{" "}
                </div>
                <div>
                  <b>Routine </b> performed:{" "}
                  {tl.tags && tl.tags.toLocaleString()}
                </div>
              </Link>
            </div>
          );
        })) || <div>Nothing to see here... 😒. Add a new training!</div>}
    </div>
  );
};

export default RecentTraining;
