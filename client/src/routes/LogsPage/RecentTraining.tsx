import Spinner from "components/Elements/Spinner";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "state/reduxHooks";
import { useGetLogsQuery } from "state/services/serverAPI";
import { TrainingLog } from "types";
import { getDate } from "utils/functionUtils";

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

/**
 * Shows the logs of a given user on descending order. If page is specified, it will return a max of 5 logs
 * and skip page*5 logs.
 * @param filter name, from, to
 *
 * @param page number
 */

const RecentTraining = ({
  filter,
  page,
}: {
  filter?: filter;
  page?: number;
}) => {
  const user = useAppSelector((state) => state.user);
  // eslint-disable-next-line prefer-const
  let { data: tlogs, isLoading } = useGetLogsQuery({
    id: user?.id,
    page: filter ? undefined : page,
  });
  const location = useLocation();

  if (isLoading) return <Spinner msg="Loading" />;

  if (filter && tlogs) {
    tlogs = filterLogs(tlogs, filter);
  }
  return (
    <div>
      {tlogs &&
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
        })}
    </div>
  );
};

export default RecentTraining;
