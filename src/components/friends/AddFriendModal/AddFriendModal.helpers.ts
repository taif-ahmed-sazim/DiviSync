import type { IPerson } from "@/types/domain.interfaces";
import { findPersonByName } from "@/utils/people.helpers";

import {
  FRIEND_ALREADY_ADDED_MESSAGE,
  FRIEND_NAME_MAX_LENGTH,
  FRIEND_NAME_MAX_LENGTH_MESSAGE,
  FRIEND_NAME_MIN_LENGTH,
  FRIEND_NAME_MIN_LENGTH_MESSAGE,
  FRIEND_NAME_REQUIRED_MESSAGE,
} from "./AddFriendModal.constants";

export function getFriendNameError(
  name: string,
  friends: IPerson[],
): string | undefined {
  const trimmedName = name.trim();

  if (trimmedName.length === 0) {
    return FRIEND_NAME_REQUIRED_MESSAGE;
  }

  if (trimmedName.length < FRIEND_NAME_MIN_LENGTH) {
    return FRIEND_NAME_MIN_LENGTH_MESSAGE;
  }

  if (trimmedName.length > FRIEND_NAME_MAX_LENGTH) {
    return FRIEND_NAME_MAX_LENGTH_MESSAGE;
  }

  if (findPersonByName(friends, trimmedName) !== null) {
    return FRIEND_ALREADY_ADDED_MESSAGE;
  }

  return undefined;
}
