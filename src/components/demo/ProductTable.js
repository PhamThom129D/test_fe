import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Typography,
  Box,
  Paper,
  TableContainer,
  TablePagination,
} from "@mui/material";

export default function ProductTable({ products, onEdit, onDelete, onAdd }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedProducts = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper
      elevation={4}
      sx={{
        mt: 4,
        borderRadius: 3,
        overflow: "hidden",
        background: (theme) =>
          theme.palette.mode === "light" ? "#fff" : "#1e1e1e",
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        py={2}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? "#f7f9fc" : "#2a2a2a",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          🛒 Danh sách sản phẩm
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onAdd}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "bold",
            px: 2.5,
            py: 1,
          }}
        >
          ➕ Thêm sản phẩm
        </Button>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f2f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tên sản phẩm</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Giá (VNĐ)</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tồn kho</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Mô tả</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>



<TableBody>
  {displayedProducts.length > 0 ? (
    displayedProducts.map((p, index) => (
      <TableRow
        key={p.id}
        hover
        sx={{
          "&:hover": {
            backgroundColor: (theme) =>
              theme.palette.mode === "light" ? "#f9f9f9" : "#2c2c2c",
          },
        }}
      >
        {/* ✅ STT tính theo trang */}
        <TableCell>{page * rowsPerPage + index + 1}</TableCell>

        <TableCell sx={{ fontWeight: 500 }}>{p.name}</TableCell>
        <TableCell>{Number(p.price).toLocaleString()} ₫</TableCell>
        <TableCell>{p.stock}</TableCell>
        <TableCell
          sx={{
            maxWidth: 180,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={p.description}
        >
          {p.description}
        </TableCell>
        <TableCell align="center">
          <Button
            variant="outlined"
            color="info"
            size="small"
            onClick={() => onEdit(p)}
            sx={{ mr: 1, textTransform: "none", borderRadius: 2 }}
          >
            ✏️ Sửa
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onDelete(p.id)}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            🗑️ Xóa
          </Button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
        <Typography color="text.secondary">Không có sản phẩm nào.</Typography>
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>

      {/* Pagination */}
      {products.length > 0 && (
        <TablePagination
          component="div"
          count={products.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Hiển thị"
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            px: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            "& .MuiTablePagination-actions button": {
              borderRadius: 1,
            },
          }}
        />
      )}
    </Paper>
  );
}
