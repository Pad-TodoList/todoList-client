import { UserSelector } from "../user";
import { RoutesSelector } from "../routes";

interface Selector extends RoutesSelector, UserSelector {}

export { Selector };
