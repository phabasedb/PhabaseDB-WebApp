/**
 * Reads a search history array from localStorage.
 */
export function readHistory(key = "searchHistory") {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

/**
 * Updates a search history list.
 *
 * Removes duplicates, prepends the new term,
 * and trims the list to the specified limit.
 */
export function updateHistoryArray(historyArray, term, limit) {
  const filtered = historyArray.filter((t) => t !== term);
  filtered.unshift(term);
  return filtered.length > limit ? filtered.slice(0, limit) : filtered;
}

/**
 * Persists a search history array in localStorage.
 */
export function writeHistory(array, key = "searchHistory") {
  localStorage.setItem(key, JSON.stringify(array));
}
