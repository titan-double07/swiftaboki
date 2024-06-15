import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: 640});
  return isMobile ? children : null;
};

export const TabletAbove = ({ children }: { children: React.ReactNode }) => {
  const isTablet = useMediaQuery({ minWidth: 768});
  return isTablet ? children : null;
};
