// third party
import { Box } from "@mui/material";

/**
 * Generic scrollable chart container.
 * Expects width to be resolved by parent layout.
 */
export default function ChartScrollContainer({ width, children }) {
  return (
    <Box
      sx={{
        width,
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      {children}
    </Box>
  );
}
