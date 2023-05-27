import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function RetrieveTaskForm({ setTask, task }: Props) {
  return (
    <div className={styles.retrieveTaskForm}>
      <div>
        <p>Nom</p>
        <input
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
        />
      </div>
      <div>
        <p>Description</p>
        <input
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div>
        <p>Debut</p>
        <input
          value={task.startDate}
          onChange={(e) => setTask({ ...task, startDate: e.target.value })}
        />
      </div>
      <div>
        <p>Fin</p>
        <input
          value={task.endDate}
          onChange={(e) => setTask({ ...task, endDate: e.target.value })}
        />
      </div>
      <div>
        <p>Status</p>
        <input
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        />
      </div>
    </div>
  );
}

export { RetrieveTaskForm };
