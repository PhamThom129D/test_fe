import React from "react";
import { Box, Typography, Paper, Button, Stack, Divider } from "@mui/material";

export default function ProductDetail({ productDetail, onClose }) {
  if (!productDetail) return null;

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 680,
        mx: "auto",
        background: (theme) =>
          theme.palette.mode === "light" ? "#fff" : "#1e1e1e",
        boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        Chi tiết tour du lịch
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Tên tour:
          </Typography>
          <Typography variant="body1">{productDetail.title}</Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Giá:
          </Typography>
          <Typography variant="body1">
            {Number(productDetail.price).toLocaleString("vi-VN")} VNĐ
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Mô tả:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {productDetail.description}
          </Typography>
        </Box>
      </Stack>

      {onClose && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{ px: 4, borderRadius: 2 }}
          >
            Đóng
          </Button>
        </Box>
      )}
    </Paper>
  );
}
