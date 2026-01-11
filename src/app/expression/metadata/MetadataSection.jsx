"use client";

// third party
import { Box, CircularProgress } from "@mui/material";

// local
import { useExpressionMeta } from "@/integrations/expression/gene";
import { ErrorBoxPageExpressionAtlas } from "../shared/components/ErrorBox";
import { MetadataTable } from "./MetadataTable";
import { USER_ERROR_METADATA_LOAD_MESSAGE } from "../constants/messages";

export function MetadataSection({ endpoint, onSelectLibraries }) {
  const { data, loading, error } = useExpressionMeta(endpoint);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    console.error("Metadata ftc:", error);
    return (
      <ErrorBoxPageExpressionAtlas text={USER_ERROR_METADATA_LOAD_MESSAGE} />
    );
  }

  return <MetadataTable data={data} onSelectLibraries={onSelectLibraries} />;
}
