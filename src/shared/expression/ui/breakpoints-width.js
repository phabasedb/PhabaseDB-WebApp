// third party
import { useTheme, useMediaQuery } from "@mui/material";

/**
 * Responsive width helper.
 *
 * Provides a fallback width based on Material UI breakpoint
 * ranges for components that require a predefined width.
 */

export default function useBreakpointWidth() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  if (isXl) return 1350;
  if (isLg) return 1050;
  if (isMd) return 780;
  if (isSm) return 500;
  return 250;
}
