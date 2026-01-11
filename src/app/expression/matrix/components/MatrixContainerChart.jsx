// third party
import { Box } from "@mui/material";

// local
import ExpressionChart from "@/components/ExpressionChart";

/**
 * Presentational container for the expression chart.
 * Expects width to be resolved by the parent layout.
 */
export default function MatrixContainerChart({
  series,
  graphType,
  svgRef,
  width,
}) {
  if (!series || series.length === 0) return null;

  return (
    <Box
      sx={{
        width,
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <ExpressionChart
        series={series}
        columnWidth={20}
        graphType={graphType}
        svgRef={svgRef}
      />
    </Box>
  );
}
