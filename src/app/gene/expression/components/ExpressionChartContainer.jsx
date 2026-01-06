// third party
import { Box } from "@mui/material";

// local
import ExpressionChart from "@/components/ExpressionChart";

/**
 * Presentational container for the expression chart.
 * Expects width to be resolved by the parent layout.
 */
export default function ExpressionChartContainer({ series, svgRef, width }) {
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
        graphType="scorez"
        svgRef={svgRef}
      />
    </Box>
  );
}
