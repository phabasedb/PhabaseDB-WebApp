export const FRIENDLY_MESSAGES = {
  // =========================
  // Metadata
  // =========================

  META_FOUND: "",
  META_NOT_FOUND: "No expression metadata available.",

  // =========================
  // Expression by Gene ID
  // =========================

  EXPR_FOUND: "",
  EXPR_NOT_FOUND: "No expression data were found for the gene.",

  // =========================
  // Multiple Gene IDs / Matrix
  // =========================

  MULTI_EXPR_FOUND: "",
  MULTI_EXPR_PARTIAL:
    "Some gene IDs could not be found. The results shown are partial.",
  MULTI_EXPR_NOT_FOUND:
    "No expression data has been found for the introduced genes.",
  // Errors
  INVALID_JSON: "The request could not be processed. Please check your input.",

  // =========================
  // Shared API errors
  // =========================
  INVALID_INPUT:
    "Some of the parameters provided are invalid. Please check the data you entered.",
  FILE_NOT_FOUND:
    "The requested expression data is not available. Please try again later.",
  FILE_READ_ERROR:
    "The expression data could not be loaded at this time. Please try again later.",
  INVALID_DATASET:
    "The selected dataset is unavailable or incomplete. Please try again later.",
  INTERNAL_ERROR:
    "An error occurred while processing your request. Please try again later.",
};
