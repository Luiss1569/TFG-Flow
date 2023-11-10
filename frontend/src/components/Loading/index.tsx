import { Spinner } from "@chakra-ui/react";

interface LoadingProps {
  open: boolean;
  handleClose: React.MouseEventHandler<HTMLElement>;
}

export function Loading({ open, handleClose }: LoadingProps) {
  return (
    <div
      style={{
        display: open ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <Spinner size="xl" color="white" />
    </div>
  );
}
