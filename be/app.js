const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("✅ Server running on http://localhost:3001");
});

const tuors = [
    {
        id: 1,
        title: 'Sapa',
        price: '2000000',
        description: 'Sa Pa là một điểm du lịch cách trung tâm thành phố Lào Cai khoảng hơn 30 km. Nằm ở độ cao trung bình 1500 – 1800 m so với mặt nước biển, Thị Trấn Sapa luôn chìm trong làn mây bồng bềnh, tạo nên một bức tranh huyền ảo đẹp đến kỳ lạ. Nơi đây, có thứ tài nguyên vô giá đó là khí hậu quanh năm trong lành mát mẻ, với nhiệt độ trung bình 15-18°C.'
    },
    {
        id: 2,
        title: 'Ninh Bình',
        price: '1600000',
        description: 'Ninh binh là vùng đất có bề dày về lịch sử văn hóa lâu đời, tỉnh Ninh bình có rất nhiều tiềm năng về du lịch đối với du khách trong nước cũng như du khách quốc tế với rất nhiều địa danh đã và đang được bảo tồn rất tốt.'
    },
    {
        id: 3,
        title: 'Hà Giang',
        price: '1600000',
        description: 'Hà Giang là một tỉnh thuộc vùng Đông Bắc Việt Nam. Phía Đông giáp tỉnh Cao Bằng, phía Tây giáp tỉnh Yên Bái và Lào Cai, phía Nam giáp tỉnh Tuyên Quang phía Bắc giáp nước Cộng hòa Nhân dân Trung Hoa. Hà Giang có diện tích tự nhiên là 7.884,37 km2, trong đó theo đường chim bay, chỗ rộng nhất từ tây sang đông dài 115 km và từ bắc xuống nam dài 137 km.'
    },
    {
        id: 4,
        title: 'Quy Nhơn',
        price: '10000000',
        description: 'Là một trong những thành phố biển đẹp nhất Nam Trung Bộ với nhiều bãi tắm lý tưởng như Cát Tiến, Nhơn Hội, Hải Giang. Đến đây du khách có thể hòa mình vào cảnh sắc thiên nhiên hùng vĩ, biển cả bao la với những cồn cát, hải đảo ngập tràn gió lộng, xen vào những bãi biển lấp lánh cát vàng.'
    },
];

app.get("/tuors", (req, res) => {
    res.json(tuors);
});
app.get("/tuors/:id", (req, res) => {
    const id = +req.params.id;
    const index = findTuorIndex(id);
    if(index !== -1) {
        res.json(tuors[index]);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
app.post("/tuors", (req, res) => {
    const tuor = {
        id: (new Date()).getTime(),
        title: req.body.title,
        price: req.body.price,
        description: req.body.description
    };
    tuors.push(tuor);
    res.json(tuor);
});
app.delete("/tuors/:id", (req, res) => {
    const id = +req.params.id;
    const index = findTuorIndex(id);
    if(index !== -1) {
        tuors.splice(index, 1);
        res.json({message: 'tuor deleted', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

app.put("/tuors/:id", (req, res) => {
    const id = +req.params.id;
    const index = findTuorIndex(id);
    if(index !== -1) {
        const tuor = tuors[index];
        tuor.title = req.body.title;
        tuor.price = req.body.price;
        tuor.description = req.body.description;
        res.json(tuor);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});

function findTuorIndex(id) {
    for(let i = 0; i < tuors.length; i++) {
        if(tuors[i].id === id) {
            return i;
        }
    }
    return -1;
}