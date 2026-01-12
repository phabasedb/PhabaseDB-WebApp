// third party
import { Box } from "@mui/material";
import MUIDataTable from "mui-datatables";

/**Representative dates in table */
export default function ExpressionDataTable({ title, columns, data, width }) {
  return (
    <Box sx={{ width }}>
      <MUIDataTable
        title={title}
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
