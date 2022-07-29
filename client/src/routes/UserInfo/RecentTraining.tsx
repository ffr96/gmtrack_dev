import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../state/reduxHooks";
import { selectRecentLogs } from "../../state/trainingReducer";
import { getDate } from "../../utils/functionUtils";

/**
 * Shows the last X logs of a given user (defaults to 5)
 * Once a Selector Function is written, that function will be used to retrieve the
 * logs, instead of writing the state logic directly on the selector.
 */

const RecentTraining = ({ logsToRender = 5 }: { logsToRender?: number }) => {
  const tlogs = useAppSelector((state) =>
    selectRecentLogs(state, logsToRender)
  );
  const location = useLocation();

  return (
    <div>
      {(tlogs.length > 0 &&
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
