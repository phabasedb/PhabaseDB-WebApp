"use client";

//standar
import { useRef, useMemo, useEffect } from "react";

// third party
import { CircularProgress, Box } from "@mui/material";

//local
import { useExpressionEndpoint } from "./hooks/use-expression-endpoint";
import { useGeneExpressionDownload } from "./hooks/use-expression-download";
import { useExpressionByGeneId } from "@/integrations/expression/gene";

import { normalizeExpressionData } from "@/shared/expression/normalizers/normalize-expression";
import { projectExpressionToD3Series } from "@/shared/expression/projections/expression-series-d3";
import { projectExpressionToMuiTable } from "@/shared/expression/projections/expression-table-mui";

import useContainerWidth from "@/shared/expression/ui/container-width";
import useBreakpointWidth from "@/shared/expression/ui/breakpoints-width";

import ExpressionHeader from "./components/ExpressionHeader";
import ExpressionChartContainer from "./components/ExpressionChartContainer";
import ExpressionTableMui from "./components/ExpressionTableMui";
import { ErrorBoxPageGene } from "../shared/components/ErrorBox";

import { USER_ERROR_GENE_EXPRESSION_MESSAGE } from "./constants/messages";

export default function StructExpression({ gene, organism }) {
  const svgRef = useRef(null);

  /* Endpoint */
  const { endpoint, error: endpointError } = useExpressionEndpoint(
    gene,
    organism
  );

  if (!endpoint) {
    console.error("Gene Expression endp:", endpointError);
    return <ErrorBoxPageGene text={USER_ERROR_GENE_EXPRESSION_MESSAGE} />;
  }

  /* Data fetching */
  const { data, loading, error } = useExpressionByGeneId(
    endpoint,
    gene?.accessionId
  );

  // Normalized data
  const { data: normalized, error: normalizeError } = useMemo(() => {
    if (loading || !data) {
      return { data: [], error: null };
    }
    return normalizeExpressionData(data);
  }, [data, loading]);

  // Seriesd3 data
  const chartSeries = useMemo(
    () => projectExpressionToD3Series(normalized),
    [normalized]
  );

  // MuiTable data
  const { columns: tableColumns, data: tableRows } = useMemo(
    () => projectExpressionToMuiTable(normalized),
    [normalized]
  );

  /* Button download */
  const { onDownload } = useGeneExpressionDownload(svgRef, gene);

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
    console.error("Gene Expression ftc:", error);
    return <ErrorBoxPageGene text={USER_ERROR_GENE_EXPRESSION_MESSAGE} />;
  }

  if (normalizeError) {
    console.error("Gene Expression norm:", normalizeError);
    return <ErrorBoxPageGene text={USER_ERROR_GENE_EXPRESSION_MESSAGE} />;
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
      <ExpressionHeader onDownload={onDownload} />

      <ExpressionChartContainer
        series={chartSeries}
        svgRef={svgRef}
        width={chartWidth}
      />

      <ExpressionTableMui
        columns={tableColumns}
        data={tableRows}
        gene={gene}
        width={chartWidth}
      />
    </Box>
  );
}
