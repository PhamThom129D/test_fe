import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserTable({ users, onEdit, onDelete, page, rowsPerPage, totalUsers }) {
  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Thao tác</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.length > 0 ? (
                users.map((u, index) => (
                  <TableRow key={u.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={u.avatar}
                        alt={u.name}
                        width={90}
                        height={90}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    </TableCell>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Chỉnh sửa">
                        <IconButton color="primary" onClick={() => onEdit(u)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <IconButton color="error" onClick={() => onDelete(u)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography color="text.secondary">Không có người dùng nào.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="body2" align="right" sx={{ mt: 1, color: "text.secondary" }}>
          Hiển thị <b>{users.length}</b> / Tổng <b>{totalUsers}</b> người dùng
        </Typography>
      </Paper>
    </Box>
  );
}
