// third party
import { Box } from "@mui/material";

//local
import ExpressionWorkflow from "./ExpressionWorkflow";

export default function ExpressionPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        my: { xs: 3, md: 4 },
        gap: { xs: 3, md: 4 },
      }}
    >
      <ExpressionWorkflow />
    </Box>
  );
}
