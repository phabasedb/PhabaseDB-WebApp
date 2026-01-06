//local
import { VALID_INPUT_TERM } from "./validation";

/**
 * Validates a user input against a predefined set of rules.
 *
 * Stops at the first failing rule and updates the error state
 * with the corresponding message.
 */
export function validateInput(value, setError) {
  for (const { test, message } of VALID_INPUT_TERM) {
    if (!test(value)) {
      setError(message);
      return false;
    }
  }
  setError("");
  return true;
}
