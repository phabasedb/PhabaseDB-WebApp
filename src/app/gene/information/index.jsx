// standard

// third party
import { Box } from "@mui/material";

// local
import StructInfo from "./struct-info";

export default function Information({
  gene,
  organism,
  chromosome,
  transcripts,
  selectedTranscriptId,
  onSelectTranscript,
  onNavClick,
  onBlastClick,
  showExpression,
}) {
  return (
    <Box
      sx={{
        my: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <StructInfo
        gene={gene}
        organism={organism}
        chromosome={chromosome}
        transcripts={transcripts}
        selectedTranscriptId={selectedTranscriptId}
        onSelectTranscript={onSelectTranscript}
        onNavClick={onNavClick}
        onBlastClick={onBlastClick}
        showExpression={showExpression}
      />
    </Box>
  );
}
