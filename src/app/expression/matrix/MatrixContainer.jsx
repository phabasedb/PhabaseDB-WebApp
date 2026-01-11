"use client";

// standard
import { useMemo, useRef, useEffect } from "react";

// third party
import { Box } from "@mui/material";

// local
import { useExpressionDownload } from "./hooks/use-expression-download";
import { projectExpressionToD3Series } from "@/shared/expression/projections/expression-series-d3";
import { projectExpressionToMuiTable } from "@/shared/expression/projections/expression-table-mui";

import useContainerWidth from "@/shared/expression/ui/container-width";
import useBreakpointWidth from "@/shared/expression/ui/breakpoints-width";

import MatrixHeader from "./components/MatrixHeader";
import MatrixContainerChart from "./components/MatrixContainerChart";
import MatrixTable from "./components/MatrixTable";

export function MatrixContainer({ data, graphType }) {
  const svgRef = useRef(null);

  /**
   * Projections
   */
  const chartSeries = useMemo(() => projectExpressionToD3Series(data), [data]);

  const { columns: tableColumns, data: tableRows } = useMemo(
    () => projectExpressionToMuiTable(data),
    [data]
  );

  /**boton download */
  const { onDownload } = useExpressionDownload(svgRef);

  /**
   * 3️⃣ Layout measurement
   */
  const {
    ref: containerRef,
    width: containerWidth,
    measure,
  } = useContainerWidth();

  const fallbackWidth = useBreakpointWidth();

  useEffect(() => {
    if (data.length > 0) {
      measure();
    }
  }, [data, measure]);

  const chartWidth =
    containerWidth && containerWidth > 0 ? containerWidth : fallbackWidth;
  /**
   * 4️⃣ Render
   */
  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 2,
        boxShadow: 5,
        gap: 1,
        pt: 2,
      }}
    >
      <MatrixHeader onDownload={onDownload} />

      <MatrixContainerChart
        svgRef={svgRef}
        series={chartSeries}
        graphType={graphType}
        width={chartWidth}
      />

      <MatrixTable columns={tableColumns} data={tableRows} width={chartWidth} />
    </Box>
  );
}
