import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

export default function ProductForm({ onSubmit, productEdit, onClose }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (productEdit) setForm(productEdit);
  }, [productEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return "Tên sản phẩm không được để trống.";
    if (form.name.length < 2) return "Tên sản phẩm phải có ít nhất 2 ký tự.";
    if (!form.price || isNaN(form.price) || form.price <= 0)
      return "Giá sản phẩm phải là số dương.";
    if (!form.stock || isNaN(form.stock) || form.stock < 0)
      return "Tồn kho không hợp lệ (≥ 0).";
    if (!form.description.trim() || form.description.length < 5)
      return "Mô tả phải có ít nhất 5 ký tự.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      setOpenSnackbar(true);
      return;
    }

    onSubmit(form);
    setForm({ name: "", price: "", stock: "", description: "" });
    if (onClose) onClose();
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 3,
        maxWidth: 480,
        mx: "auto",
        background: (theme) =>
          theme.palette.mode === "light" ? "#fff" : "#1e1e1e",
        boxShadow: "0px 6px 16px rgba(0,0,0,0.1)",
      }}
    >

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Tên sản phẩm"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Giá (VNĐ)"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            required
            fullWidth
            inputProps={{ min: 0 }}
          />

          <TextField
            label="Tồn kho"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            type="number"
            required
            fullWidth
            inputProps={{ min: 0 }}
          />

          <TextField
            label="Mô tả"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            required
          />

          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ px: 4, borderRadius: 2, fontWeight: "bold" }}
            >
              💾 {productEdit ? "Cập nhật" : "Lưu"}
            </Button>
            {onClose && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={onClose}
                sx={{ px: 4, borderRadius: 2 }}
              >
                Hủy
              </Button>
            )}
          </Stack>
        </Stack>
      </Box>

      {/* Snackbar hiển thị lỗi */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
