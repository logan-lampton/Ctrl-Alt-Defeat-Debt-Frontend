import React from "react";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const LoadingSpinner = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default LoadingSpinner;
