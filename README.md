Dự án React quản lý danh sách với **chức năng CRUD**, sử dụng **Material UI**, **axios** và **mock API (`json-server`)**.

## 🛠️ Yêu cầu

- Node.js >= 18
- npm >= 9
- json-server (cài toàn cục hoặc local)

---

## ⚡ Cài đặt dự án

1. Clone repo hoặc copy source code:
   git clone <repo-url>
   cd <project-folder>

2. Cài dependencies:
   npm install

- Cài json-server (nếu chưa có):
  npm install -g json-server

📝 Tạo mock API

- Tạo file db.json ở root project:

{
"users": [
{
"id": 1,
"name": "Nguyễn Văn A",
"email": "nguyenvana@gmail.com",
"avatar": "https://i.pravatar.cc/150?img=1"
},
{
"id": 2,
"name": "Trần Thị B",
"email": "tranthib@example.com",
"avatar": "https://i.pravatar.cc/150?img=2"
}
]
}

- Chạy server:

json-server --watch db.json --port 3001
Endpoints:

GET /users → Lấy danh sách người dùng

POST /users → Thêm người dùng mới

PUT /users/:id → Cập nhật người dùng

DELETE /users/:id → Xóa người dùng

⚠️ Lưu ý: json-server phải chạy trước khi khởi động React app.

🚀 Chạy dự án React
npm start
Mở trình duyệt: http://localhost:3000

Dữ liệu người dùng được load từ mock API

Hỗ trợ chế độ sáng/tối với theme lưu trong localStorage

🖥️ Hướng dẫn sử dụng giao diện CRUD

1. Xem danh sách người dùng
   Mở trang chính, danh sách người dùng sẽ hiển thị trong bảng.

2. Thêm người dùng
   Click nút Thêm → Modal form hiện ra → Nhập ảnh, tên và email → Nhấn Lưu.

Dữ liệu sẽ được gửi POST tới /users và cập nhật danh sách.

3. Sửa người dùng
   Click nút Sửa ở hàng người dùng → Modal form mở → Chỉnh sửa thông tin → Nhấn Lưu.

Dữ liệu sẽ được gửi PUT tới /users/:id và cập nhật.

4. Xóa người dùng
   Click nút Xóa → Xác nhận → Dữ liệu sẽ gửi DELETE tới /users/:id và bảng cập nhật.
