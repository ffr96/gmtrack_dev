import Spinner from "components/Spinner";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "state/reduxHooks";
import { useGetLogsQuery } from "state/services/serverAPI";
import { TrainingLog } from "types";
import { getDate } from "utils/functionUtils";

/**
 * @param logsToRender
 * Shows the last X logs of a given user (defaults to 5).
 * A value of 0 will cause it to show all the logs.
 * @param filter
 * Filters by date
 */

export type filter = {
  from?: string;
  to?: string;
  name?: string;
};

const filterLogs = (logs: TrainingLog[], filter: filter) => {
  let filteredLogs = logs;
  if (filter.from) {
    filteredLogs = logs.filter((log) => log.date > (filter.from as string));
  }
  if (filter.to) {
    filteredLogs = filteredLogs.filter(
      (log) => log.date < (filter.to as string)
    );
  }
  if (filter.name) {
    filteredLogs = filteredLogs.filter((log) =>
      log.name
        .toLocaleLowerCase()
        .includes(filter.name?.toLocaleLowerCase() as string)
    );
  }

  return filteredLogs;
};

const RecentTraining = ({
  logsToRender = 5,
  filter,
}: {
  logsToRender?: number;
  filter?: filter;
}) => {
  const user = useAppSelector((state) => state.user);
  let { data: tlogs } = useGetLogsQuery(user?.id);
  const { isLoading } = useGetLogsQuery(user?.id);
  const location = useLocation();

  if (isLoading) return <Spinner msg="Loading" />;

  if (filter && tlogs) {
    tlogs = filterLogs(tlogs, filter);
  }
  return (
    <div>
      {tlogs &&
        tlogs.slice(-logsToRender).map((tl) => {
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
        })}
    </div>
  );
};

export default RecentTraining;
