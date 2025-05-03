import { useEffect } from "react";
import { useNavigate } from "react-router";
import { formatDate, today } from "../utils/date";

export const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const now = today();
    navigate(`/log/${formatDate(now)}`, { replace: true });
  }, [navigate]);

  return <></>;
};
