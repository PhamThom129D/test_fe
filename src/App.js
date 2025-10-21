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

import { productService } from "./services/api";
import ProductTable from "./components/demo/ProductTable";
import ProductForm from "./components/demo/ProductForm";


export default function App() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const loadData = async () => {
    const res = await productService.getAll();
    setProducts(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddOrUpdate = async (product) => {
    if (product.id) {
      await productService.update(product.id, product);
    } else {
      await productService.create(product);
    }
    setOpenDialog(false);
    setEditProduct(null);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa?")) {
      await productService.remove(id);
      loadData();
    }
  };

  const handleAdd = () => {
    setEditProduct(null);
    setOpenDialog(true);
  };

  const handleEdit = (p) => {
    setEditProduct(p);
    setOpenDialog(true);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        🛍️ Quản lý sản phẩm
      </Typography>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      {/* Pop-up form thêm/sửa */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {editProduct ? "✏️ Sửa sản phẩm" : "➕ Thêm sản phẩm"}
          <IconButton onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ProductForm onSubmit={handleAddOrUpdate} productEdit={editProduct} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
