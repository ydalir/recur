import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteEntry, getEntry } from "../../utils/idb";
import { LogEntry } from "../../utils/logEntry";
import style from "./DeleteEntryPage.module.css";
import { Button } from "../../components/Button/Button";
import { LinkButton } from "../../components/Button/LinkButton";

export const DeleteEntryPage = () => {
  const { entryId } = useParams();
  const [entry, setEntry] = useState<LogEntry | null>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!entryId) return;

    getEntry(entryId).then(setEntry);
  }, [entryId]);

  if (entry === undefined) return <div>Loading</div>;
  if (entry === null) return <div>Entry not found</div>;

  return (
    <div className={style.deleteEntryPage}>
      <span>
        Delete entry <br></br>"{entry.title}" <br></br>on<br></br> {entry.date}?
      </span>
      <div className={style.buttonsContainer}>
        <Button
          variant="warning"
          onClick={() => {
            deleteEntry(entry.id).then(() =>
              navigate({ pathname: "/", hash: entry.date })
            );
          }}
        >
          Delete
        </Button>
        <LinkButton
          to={{ pathname: "..", hash: entry.date }}
          variant="secondary"
        >
          Cancel
        </LinkButton>
      </div>
    </div>
  );
};
