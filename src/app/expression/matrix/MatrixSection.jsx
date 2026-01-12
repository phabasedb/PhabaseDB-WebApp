"use client";

// standard
import { useRef, useMemo, useEffect } from "react";

// third party
import { Box, CircularProgress, Alert } from "@mui/material";

// local
import { useExpressionByIds } from "@/integrations/expression/gene";

import { normalizeExpressionData } from "@/shared/expression/normalizers/normalize-expression";
import { projectExpressionToD3Series } from "@/shared/expression/projections/expression-series-d3";
import { projectExpressionToMuiTable } from "@/shared/expression/projections/expression-table-mui";

import { PageStateMessage } from "../shared/components/PageStateMessage";
import { EXPRESSION_EMPTY_AFTER_NORMALIZATION } from "@/shared/expression/constants/statesMessages";

import useContainerWidth from "@/shared/expression/ui/container-width";
import useBreakpointWidth from "@/shared/expression/ui/breakpoints-width";

import DownloadSectionHeader from "@/shared/ui/DownloadSectionHeader";
import ChartScrollContainer from "@/shared/ui/ChartScrollContainer";
import ExpressionChart from "@/components/ExpressionChart";
import { useSvgDownload } from "@/shared/expression/ui/use-svg-download";
import ExpressionDataTable from "@/shared/ui/ExpressionDataTable";

export function MatrixSection({ endpoint, ids, columns, graphType }) {
  const svgRef = useRef(null);

  /* Endpoint */
  if (!endpoint) {
    return (
      <PageStateMessage text={"Expression Atlas is currently unavailable."} />
    );
  }

  /* Data fetching */
  const { data, notFoundIds, loading, error } = useExpressionByIds(
    endpoint,
    ids,
    columns
  );

  // Normalized data
  const normalized = useMemo(() => normalizeExpressionData(data), [data]);

  // Seriesd3 data
  const series = useMemo(
    () => projectExpressionToD3Series(normalized),
    [normalized]
  );

  // MuiTable data
  const { columns: tableColumns, data: tableRows } = useMemo(
    () => projectExpressionToMuiTable(normalized),
    [normalized]
  );

  const { onDownload } = useSvgDownload(svgRef, () => "expression-atlas.svg");

  /* Layout measurement */
  const {
    ref: containerRef,
    width: containerWidth,
    measure,
  } = useContainerWidth();

  const fallbackWidth = useBreakpointWidth();

  useEffect(() => {
    if (normalized && normalized.length > 0) {
      measure();
    }
  }, [normalized, measure]);

  const chartWidth =
    containerWidth && containerWidth > 0 ? containerWidth : fallbackWidth;

  /* States */
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <PageStateMessage text={error} />;
  }
  if (normalized.length === 0) {
    return <PageStateMessage text={EXPRESSION_EMPTY_AFTER_NORMALIZATION} />;
  }

  return (
    <>
      {notFoundIds.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Some identifiers were not found: {notFoundIds.join(", ")}
        </Alert>
      )}

      <Box
        ref={containerRef}
        sx={{
          width: "90%",
          background: "white",
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
        {/* Actions */}
        <DownloadSectionHeader
          title="Expression Atlas"
          onDownload={onDownload}
        />

        {/* Visualization */}
        <ChartScrollContainer width={chartWidth}>
          <ExpressionChart
            series={series}
            columnWidth={20}
            graphType={graphType}
            svgRef={svgRef}
          />
        </ChartScrollContainer>

        {/* Data table */}
        <ExpressionDataTable
          title="Expression Atlas - DataTable"
          columns={tableColumns}
          data={tableRows}
          width={chartWidth}
        />
      </Box>
    </>
  );
}
