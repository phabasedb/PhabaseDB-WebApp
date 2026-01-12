"use client";

// third party
import { Box, CircularProgress } from "@mui/material";

// local
import { useExpressionMeta } from "@/integrations/expression/gene";
import { MetadataTable } from "./MetadataTable";
import { PageStateMessage } from "../shared/components/PageStateMessage";

export function MetadataSection({ endpoint, onSelectLibraries }) {
  if (!endpoint) {
    return (
      <PageStateMessage
        text={"Metadata expression is currently unavailable."}
      />
    );
  }
  const { data, loading, error } = useExpressionMeta(endpoint);

  /* States */
  if (loading) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <PageStateMessage text={error} />;
  }

  return <MetadataTable data={data} onSelectLibraries={onSelectLibraries} />;
}
