import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Container,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { toursService } from "./services/api";
import ProductTable from "./components/demo/ProductTable";
import ProductForm from "./components/demo/ProductForm";
import ProductDetail from "./components/demo/ProductDetail";

export default function App() {
  const [tours, setTours] = useState([]);
  const [editTour, setEditTour] = useState(null);
  const [detailTour, setDetailTour] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const loadData = async () => {
    const res = await toursService.getAll();
    setTours(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddOrUpdate = async (tour) => {
    if (tour.id) {
      await toursService.update(tour.id, tour);
    } else {
      await toursService.create(tour);
    }
    setOpenFormDialog(false);
    setEditTour(null);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      await toursService.remove(id);
      loadData();
    }
  };

  const handleAdd = () => {
    setEditTour(null);
    setOpenFormDialog(true);
  };

  const handleEdit = (t) => {
    setEditTour(t);
    setOpenFormDialog(true);
  };

  const handleDetail = (t) => {
    setDetailTour(t);
    setOpenDetailDialog(true);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        Quản lý tours du lịch
      </Typography>

      <ProductTable
        products={tours}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onDetail={handleDetail}
      />

      {/* Dialog thêm / sửa */}
      <Dialog
        open={openFormDialog}
        onClose={() => setOpenFormDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {editTour ? "Sửa thông tin tour du lịch" : "Thêm tour du lịch"}
          <IconButton onClick={() => setOpenFormDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ProductForm onSubmit={handleAddOrUpdate} productEdit={editTour} />
        </DialogContent>
      </Dialog>

      {/* Dialog xem chi tiết */}
      <Dialog
        open={openDetailDialog}
        onClose={() => setOpenDetailDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
        
          <IconButton onClick={() => setOpenDetailDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {detailTour ? (
            <ProductDetail
              productDetail={detailTour}
              onClose={() => setOpenDetailDialog(false)}
            />
          ) : (
            <Typography>Không có thông tin tour</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}
