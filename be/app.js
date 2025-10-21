const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("✅ Server running on http://localhost:3001");
});

const products = [
  {
    id: 1,
    name: "Áo sơ mi dài tay nam",
    price: "795000",
    stock: 100,
    description: "Áo sơ mi dài tay phom Regular fit suông nhẹ nhưng vẫn đảm bảo vừa vặn, chỉn chu khi mặc.",
  },
  {
    id: 2,
    name: "Áo polo nam",
    price: "550000",
    stock: 200,
    description: "Áo Polo phom dáng Regular fit suông nhẹ nhưng vẫn vừa vặn, tôn dáng tối đa khi mặc.",
  },
  {
    id: 3,
    name: "Áo polo nam",
    price: "550000",
    stock: 200,
    description: "Áo Polo phom dáng Regular fit suông nhẹ nhưng vẫn vừa vặn, tôn dáng tối đa khi mặc.",
  },
  {
    id: 4,
    name: "Áo polo nam",
    price: "550000",
    stock: 200,
    description: "Áo Polo phom dáng Regular fit suông nhẹ nhưng vẫn vừa vặn, tôn dáng tối đa khi mặc.",
  },
  {
    id: 5,
    name: "Áo polo nam",
    price: "550000",
    stock: 200,
    description: "Áo Polo phom dáng Regular fit suông nhẹ nhưng vẫn vừa vặn, tôn dáng tối đa khi mặc.",
  },
  {
    id: 6,
    name: "Áo polo nam",
    price: "550000",
    stock: 200,
    description: "Áo Polo phom dáng Regular fit suông nhẹ nhưng vẫn vừa vặn, tôn dáng tối đa khi mặc.",
  },
];

function findProductIndex(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) return i;
  }
  return -1;
}

// Lấy danh sách
app.get("/products", (req, res) => res.json(products));

// Lấy chi tiết
app.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = findProductIndex(id);
  if (index !== -1) res.json(products[index]);
  else res.status(404).json({ message: "Không tìm thấy sản phẩm" });
});

// Thêm
app.post("/products", (req, res) => {
  const product = {
    id: new Date().getTime(),
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
  };
  products.push(product);
  res.json(product);
});

// Cập nhật
app.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = findProductIndex(id);
  if (index !== -1) {
    products[index] = { id, ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});

// Xóa
app.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const index = findProductIndex(id);
  if (index !== -1) {
    products.splice(index, 1);
    res.json({ message: "Đã xóa sản phẩm" });
  } else {
    res.status(404).json({ message: "Không tìm thấy sản phẩm" });
  }
});
