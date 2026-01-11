"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import MUIDataTable from "mui-datatables";

import { metadataColumns } from "./metadataColumns";

export function MetadataTable({ data, onSelectLibraries }) {
  const [selectedLibraries, setSelectedLibraries] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    onSelectLibraries(selectedLibraries);
  }, [selectedLibraries, onSelectLibraries]);

  const options = {
    filter: true,
    pagination: true,
    print: false,
    viewColumns: true,
    responsive: "standard",
    page,
    rowsPerPage,
    onChangePage: (currentPage) => setPage(currentPage),
    onChangeRowsPerPage: (number) => {
      setRowsPerPage(number === -1 ? data.length : number);
    },
    rowsPerPageOptions: [10, 25, 50, 100, { value: -1, label: "All" }],
    selectableRows: "multiple",
    selectableRowsOnClick: true,
    selectableRowsHeader: true,
    customToolbarSelect: () => null,
    onRowSelectionChange: (_, __, rowsSelected) => {
      const libs = rowsSelected.map((i) => data[i].library);
      setSelectedLibraries(libs);
    },
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <MUIDataTable
        title="Metadata"
        data={data}
        columns={metadataColumns}
        options={options}
      />

      {selectedLibraries.length > 0 && (
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Selected libraries:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {selectedLibraries.map((lib) => (
              <Chip key={lib} label={lib} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
