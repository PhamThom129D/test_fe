import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
 
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

export default function ProductForm({ onSubmit, productEdit, onClose }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
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
    if (!form.title.trim()) return "Tên du lịch không được để trống.";
    if (form.title.length < 2) return "Tên du lịch phải có ít nhất 2 ký tự.";
    if (!form.price || isNaN(form.price) || form.price <= 0)
      return "Giá du lịch phải là số dương.";
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
    setForm({ title: "", price: "", description: "" });
    if (onClose) onClose();
  };

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

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Tên du lịch"
            name="title"
            value={form.title}
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
            label="Mô tả"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={6}
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
              {productEdit ? "Sửa" : "Thêm mới"}
            </Button>
          {onClose && (
               <Box textAlign="center" mt={4}>
                 <Button
                   variant="contained"
                   color="primary"
                   onClick={!onClose}
                   sx={{ px: 4, borderRadius: 2 }}
                 >
                   Đóng
                 </Button>
               </Box>
             )}
          </Stack>
        </Stack>
      </Box>

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
