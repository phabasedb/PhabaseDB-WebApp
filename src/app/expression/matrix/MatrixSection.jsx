"use client";

// standard
import { useMemo } from "react";

// third party
import { Box, CircularProgress, Alert } from "@mui/material";

// local
import { useExpressionByIds } from "@/integrations/expression/gene";
import { normalizeExpressionData } from "@/shared/expression/normalizers/normalize-expression";
import { ErrorBoxPageExpressionAtlas } from "../shared/components/ErrorBox";
import { MatrixContainer } from "./MatrixContainer";
import { USER_ERROR_MATRIX_LOAD_MESSAGE } from "../constants/messages";

export function MatrixSection({ endpoint, ids, columns, graphType }) {
  const { data, notFoundIds, loading, error } = useExpressionByIds(
    endpoint,
    ids,
    columns
  );

  const { data: normalized, error: normalizeError } = useMemo(() => {
    if (loading || !data) {
      return { data: [], error: null };
    }
    return normalizeExpressionData(data);
  }, [data, loading]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    console.error("Matrix ftc:", error);
    return (
      <ErrorBoxPageExpressionAtlas text={USER_ERROR_MATRIX_LOAD_MESSAGE} />
    );
  }
  if (normalizeError) {
    console.error("Matrix norm:", normalizeError);
    return (
      <ErrorBoxPageExpressionAtlas text={USER_ERROR_MATRIX_LOAD_MESSAGE} />
    );
  }

  if (!normalized.length) {
    return null;
  }

  return (
    <>
      {notFoundIds.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Some identifiers were not found: {notFoundIds.join(", ")}
        </Alert>
      )}

      {normalized.length > 0 && (
        <MatrixContainer data={normalized} graphType={graphType} />
      )}
    </>
  );
}
