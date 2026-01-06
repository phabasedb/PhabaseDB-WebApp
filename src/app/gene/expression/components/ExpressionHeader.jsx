// third party
import { Box, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

/**
 * Header Gene Expression
 */
export default function ExpressionHeader({ onDownload }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          alignItems: "center",
          gap: { xs: 1, md: 0 },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: {
              xs: "1.2rem",
              sm: "1.4rem",
              md: "1.8rem",
              lg: "2.0rem",
              xl: "2.4rem",
            },
            fontWeight: 500,
          }}
        >
          Gene Expression (scorez)
        </Typography>

        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={onDownload}
          >
            Download
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
