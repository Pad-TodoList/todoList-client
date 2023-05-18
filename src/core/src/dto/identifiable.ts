import { Id } from "./id";

type Identifiable<Type> = Type & { uuid: Id };

export { Identifiable };
