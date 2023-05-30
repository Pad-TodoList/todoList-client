import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function CreateTaskForm({ setTask, task }: Props) {
  return (
    <div className={styles.createTaskForm}>
      <div>
        <p>Nom</p>
        <input onChange={(e) => setTask({ ...task, name: e.target.value })} />
      </div>
      <div>
        <p>Description</p>
        <input
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div>
        <p>Debut</p>
        <input
          onChange={(e) => setTask({ ...task, startDate: e.target.value })}
        />
      </div>
      <div>
        <p>Fin</p>
        <input
          onChange={(e) => setTask({ ...task, endDate: e.target.value })}
        />
      </div>
      <div>
        <p>Status</p>
        <input onChange={(e) => setTask({ ...task, status: e.target.value })} />
      </div>
    </div>
  );
}

export { CreateTaskForm };
