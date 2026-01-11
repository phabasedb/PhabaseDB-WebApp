"use client";

// standard
import { Box, Typography, Button, Chip } from "@mui/material";

// local
import { download } from "@/static/download/config";
import { formatFileSize } from "./utils/formatFileSize";
import highlightText from "@/shared/text/utils/highlight-text";

const DOWNLOADS_BASE_URL = "/downloads"; //production = "/downloads" :

export default function DownloadsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        my: { xs: 3, md: 4 },
        gap: 3,
      }}
    >
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
        {/* Page title */}
        <Box sx={{ width: "90%", my: 1 }}>
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
            Downloads
          </Typography>
        </Box>

        {/* Content */}
        <Box sx={{ width: "90%", mt: 2 }}>
          {download.map((organism) => (
            <Box key={organism.id} sx={{ mb: 4 }}>
              {/* Organism title */}
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "1.15rem",
                  mb: 1,
                }}
              >
                {highlightText(organism.organism, ["Phaseolus vulgaris"], "em")}
              </Typography>

              {/* Files container */}
              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1.5,
                  px: 2,
                  py: 1,
                  backgroundColor: "#fafafa",
                }}
              >
                {organism.files.map((file) => {
                  const typeLabel = `${file.type}${
                    file.compression ? ` (${file.compression})` : ""
                  }`;
                  return (
                    <Box
                      key={file.filename}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "3fr 1fr 3fr 1fr auto",
                        },
                        gap: 2,
                        alignItems: "center",
                        py: 1,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        "&:last-child": {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <Typography>{file.label}</Typography>

                      <Chip
                        label={typeLabel}
                        size="small"
                        sx={{ width: "fit-content" }}
                      />

                      <Typography
                        variant="body2"
                        sx={{ wordBreak: "break-all" }}
                      >
                        {file.filename}
                      </Typography>

                      <Typography variant="body2">
                        {formatFileSize(file.sizeKB)}
                      </Typography>

                      <Button
                        variant="outlined"
                        size="small"
                        href={`${DOWNLOADS_BASE_URL}/${organism.slug}/${file.filename}`}
                        download
                      >
                        Download
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
