"use client";

// standard
import { useState } from "react";

// third party
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

// local
import { datasets } from "@/static/expression/datasets";
import { MetadataSection } from "./metadata/MetadataSection";
import { MatrixSection } from "./matrix/MatrixSection";

import useContainerWidth from "@/shared/expression/ui/container-width";
import useBreakpointWidth from "@/shared/expression/ui/breakpoints-width";

export default function ExpressionWorkflow() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLibraries, setSelectedLibraries] = useState([]);
  const [idsText, setIdsText] = useState("");
  const [graphType, setGraphType] = useState("raw");

  const [loadedMeta, setLoadedMeta] = useState(false);
  const [triggerMatrix, setTriggerMatrix] = useState(false);

  const [matrixIds, setMatrixIds] = useState([]);
  const [matrixColumns, setMatrixColumns] = useState([]);
  const [matrixEndpoint, setMatrixEndpoint] = useState("");

  /* Dataset flattening */
  const validTypes = [];
  datasets.forEach((d) => {
    Object.entries(d.types).forEach(([key, typeData]) => {
      validTypes.push({
        parentId: d.id,
        parentDatabase: d.database,
        key,
        ...typeData, // title, metadata, matrices
      });
    });
  });

  /* Layout sizing */
  const { ref: refMeta, width: wMeta } = useContainerWidth();
  const fallbackWidth = useBreakpointWidth();
  const chartWidthMeta = wMeta > 0 ? wMeta : fallbackWidth;

  /* Handlers */
  const handleSelectChange = (e) => {
    const value = e.target.value;
    const found = validTypes.find((d) => d.title === value);
    setSelectedType(found);
  };

  const handleLoad = () => {
    if (selectedType) setLoadedMeta(true);
  };

  const handleClear = () => {
    setLoadedMeta(false);
    setSelectedType(null);
    setSelectedLibraries([]);
    setIdsText("");
    setTriggerMatrix(false);
    setMatrixIds([]);
    setMatrixColumns([]);
    setMatrixEndpoint("");
  };

  const handleGeneExpression = () => {
    const idsList = idsText
      .split(/\s+/)
      .map((id) => id.trim())
      .filter((id) => id !== "");

    setMatrixIds(idsList);
    setMatrixColumns(selectedLibraries);

    const endpoint =
      graphType === "raw"
        ? selectedType.matrices.raw
        : selectedType.matrices.scorez;

    setMatrixEndpoint(endpoint);
    setTriggerMatrix(true);
  };

  /* Render*/
  return (
    <>
      <Box
        sx={{
          width: "90%",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Box ref={refMeta} sx={{ width: "90%", my: 1 }}>
          {/** Title */}
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                xs: "1.3rem",
                sm: "1.5rem",
                md: "1.7rem",
                lg: "1.9rem",
                xl: "2.1rem",
              },
            }}
          >
            Expression Atlas
          </Typography>

          {/* Dataset selection */}
          <Box sx={{ my: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Dataset selection:
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 1, md: 2 },
                alignItems: "center",
              }}
            >
              {/* Dataset dropdown */}
              <FormControl sx={{ flex: 1, width: { xs: "100%", md: "auto" } }}>
                <InputLabel>Select dataset</InputLabel>
                <Select
                  value={selectedType?.title || ""}
                  label="Select dataset"
                  onChange={handleSelectChange}
                  disabled={loadedMeta}
                >
                  {validTypes.map((ds) => (
                    <MenuItem key={ds.title} value={ds.title}>
                      {ds.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Load and Clear buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: { xs: "100%", md: "auto" },
                  gap: { xs: 1, md: 2 },
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleLoad}
                  disabled={!selectedType || loadedMeta}
                  sx={{ flex: { xs: 1, md: "none" } }}
                >
                  Load
                </Button>

                <Button
                  variant="outlined"
                  onClick={handleClear}
                  disabled={!loadedMeta}
                  sx={{ flex: { xs: 1, md: "none" } }}
                >
                  Clear
                </Button>
              </Box>
            </Box>
          </Box>

          {/* MetadataSection */}
          {loadedMeta && selectedType && (
            <Box sx={{ my: 2, width: chartWidthMeta }}>
              <MetadataSection
                endpoint={selectedType.metadata}
                onSelectLibraries={setSelectedLibraries}
              />
            </Box>
          )}

          {/* 3️⃣ IDs Gene/Transcript */}
          {loadedMeta && (
            <Box sx={{ my: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                IDs Gene/Transcript:
              </Typography>
              <TextField
                multiline
                fullWidth
                rows={3}
                placeholder="Paste IDs separated by spaces..."
                value={idsText}
                onChange={(e) => setIdsText(e.target.value)}
              />
            </Box>
          )}

          {/* Chart type */}
          {loadedMeta && (
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Data transform:
              </Typography>
              <FormControl>
                <RadioGroup
                  row
                  value={graphType}
                  onChange={(e) => setGraphType(e.target.value)}
                >
                  <FormControlLabel
                    value="raw"
                    control={<Radio />}
                    label="Normalized"
                  />
                  <FormControlLabel
                    value="scorez"
                    control={<Radio />}
                    label="Z-Score"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          )}

          {/* Button to graph */}
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Button
              variant="contained"
              onClick={handleGeneExpression}
              disabled={
                !loadedMeta || !idsText.trim() || !selectedLibraries.length
              }
            >
              Expression Atlas
            </Button>
          </Box>
        </Box>
      </Box>
      {/* MatrixSection fuera del Box de 90% */}
      {triggerMatrix && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <MatrixSection
            endpoint={matrixEndpoint}
            ids={matrixIds}
            columns={matrixColumns}
            graphType={graphType}
          />
        </Box>
      )}
    </>
  );
}
