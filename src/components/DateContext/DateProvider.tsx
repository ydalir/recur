import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router";
import { today } from "../../utils/date";
import { DateContext } from "./DateContext";

export const DateProvider = () => {
  const params = useParams();
  const dateString = params["date"];

  const [date, setDate] = useState<Dayjs>(
    dateString ? dayjs(dateString) : today()
  );

  useEffect(() => {
    setDate(dateString ? dayjs(dateString) : today());
  }, [dateString]);

  useEffect(() => {
    const listener = () => {
      if (!dateString) {
        setDate(today());
      }
    };
    document.addEventListener("visibilitychange", listener);

    return () => document.removeEventListener("visibilitychange", listener);
  }, [dateString]);

  return (
    <DateContext.Provider value={date}>
      <Outlet />
    </DateContext.Provider>
  );
};
