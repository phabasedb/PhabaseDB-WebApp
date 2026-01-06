// third party
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";

/**
 * Presentational table for gene expression values.
 * Layout width is controlled by the parent container.
 */
export default function ExpressionTableMui({ columns, data, gene, width }) {
  if (!columns || columns.length === 0) return null;

  return (
    <Box sx={{ width }}>
      <MUIDataTable
        title={`Gene Expression Table for ${gene?.accessionId}`}
        data={data}
        columns={columns}
        options={{
          responsive: "standard",
          tableBodyWidth: "100%",
          selectableRows: "none",
          search: false,
          filter: false,
          viewColumns: true,
          pagination: false,
          print: false,
          fixedHeader: false,
        }}
      />
    </Box>
  );
}
