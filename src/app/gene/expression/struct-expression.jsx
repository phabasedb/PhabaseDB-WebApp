"use client";

//standar
import { useRef, useMemo, useEffect } from "react";

// third party
import { CircularProgress, Box } from "@mui/material";

//local
import { useExpressionEndpoint } from "./hooks/use-expression-endpoint";
import { useExpressionByGeneId } from "@/integrations/expression/gene";

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

export default function StructExpression({ gene, organism }) {
  const svgRef = useRef(null);

  /* Endpoint */
  const { endpoint, error: endpointError } = useExpressionEndpoint(
    gene,
    organism
  );

  if (!endpoint) {
    return <PageStateMessage text={endpointError} />;
  }

  /* Data fetching */
  const { data, loading, error } = useExpressionByGeneId(
    endpoint,
    gene?.accessionId
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

  /* Button download */
  const { onDownload } = useSvgDownload(svgRef, () =>
    gene?.accessionId ? `${gene.accessionId}.svg` : "gene-expression.svg"
  );

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

  /* Render */
  return (
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
        title="Gene Expression (Z-Score)"
        onDownload={onDownload}
      />

      {/* Visualization */}
      <ChartScrollContainer width={chartWidth}>
        <ExpressionChart
          series={series}
          columnWidth={20}
          graphType="scorez"
          svgRef={svgRef}
        />
      </ChartScrollContainer>

      {/* Data table */}
      <ExpressionDataTable
        title={`Gene Expression Table for ${gene.accessionId}`}
        columns={tableColumns}
        data={tableRows}
        width={chartWidth}
      />
    </Box>
  );
}
