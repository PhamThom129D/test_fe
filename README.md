Install dependencies
$ npm install

Running server
$ node app.js

The server listens at port 3000
APIs
Tuor model
{
    id: 1,
    title: 'Sapa',
    price: '2000000',
    description: 'Sa Pa là một điểm du lịch cách trung tâm thành phố Lào Cai khoảng hơn 30 km. Nằm ở độ cao trung bình 1500 – 1800 m so với mặt nước biển, Thị Trấn Sapa luôn chìm trong làn mây bồng bềnh, tạo nên một bức tranh huyền ảo đẹp đến kỳ lạ. Nơi đây, có thứ tài nguyên vô giá đó là khí hậu quanh năm trong lành mát mẻ, với nhiệt độ trung bình 15-18°C.'
}
Getting all tuors
GET http://localhost:3000/tuors

Getting a tuor by id
GET http://localhost:3000/tuors/1

Creating a tuor
POST http://localhost:3000/tuors

Deleting a tuor by id
DELETE http://localhost:3000/tuors/1

Updating a tuor by id
PUT http://localhost:3000/tuors/1