# CRUD là gì?

CRUD là viết tắt của bốn hành động thông thường với một resource trong các ứng dụng thông thường. Chúng có ý nghĩa như sau:

- C: Create - tạo mới resource.
- R: Read - lấy dữ liệu, một hoặc nhiều resource.
- U: Update - cập nhật resource
- D: Delete - xoá resource

Đây là các tác vụ thường gặp trong bất cứ ứng dụng nào. Trong ứng dụng ExpressJS, chúng ta có thể dễ dàng thực hiện các thao tác trên với một ứng dụng với thư viện `mongodb`

Bắt đầu kết nối tới MongoDB:

```jsx
// db.js

const { MongoClient } = require("mongodb");

const db = {};

async function connectToDb() {
  const client = new MongoClient("mongodb://localhost:27017");
  await client.connect();
  console.log("db connected");
  const database = client.db("mindx_rn_20");
  db.teachers = database.collection("teachers");
  db.students = database.collection("students");
	db.classes = database.collection("classes")
}

module.exports = { connectToDb, db };

// index.js
const {connectToDb} = require('./db')

...

app.listen(5001, () => {
	connectToDb()
})
```

Sau khi đã thực hiện kết nối thành công với MongoDB, ta có thể bắt đầu các tác vụ liên quan tới các resource khác nhau.

### C - Create

Để thêm được dữ liệu vào bên trong mongo, ta có thể sử dụng một cách sau:

- `db.insertOne(document)`: function sử dụng để thêm 1 document vào trong collection, nhận vào một tham số là một object, tương ứng với document mà chúng ta muốn thêm vào.
- `db.insertMany([document])`: function sử dụng để thêm vào nhiều documents, nhận vào tham số là một mảng các object.

Ví dụ:

```jsx
const studentRouter = express.Router()

studentRouter.post('/', async (req, res) => {
	const {name, age, address, hobbies} = req.body;
	await db.students.insertOne({
		name: name,
		age: age,
		address: address,
		hobbies: hobbies
	})
	res.send("Inserted")
})
```

<aside>
📌 Các hành động liên quan tới mongodb đều là các hành động bất đồng bộ (async). Do đó, chúng ta cần sử dụng `Promise.then` hoặc `async/await` nếu muốn viết các câu lệnh sau khi tác vụ với Mongo kết thúc.

</aside>

### U - Update

Để cập nhật được dữ liệu bên trong MongoDB, ta có thể sử dụng các function sau:

- `db.updateOne(condition, updater)`: sử dụng để cập nhật một document.
- `db.updateMany(condition, updater)`: sử dụng để cập nhật nhiều document.

`condition` là điều kiện giúp chúng ta lựa chọn ra một hoặc nhiều document được cập nhật. `updater` là một object xác định việc cập nhật sẽ diễn ra như thế nào. Trong `updater`, chúng ta có thể có những toán tử (operator) như `$set`, `$inc`, `$min`, `$max`, `$mul`, `$rename`, `$unset`,… Chi tiết các toán tử được sử dụng để cập nhật và các ví dụ có thể tham khảo trong đường dẫn sau:
[https://www.mongodb.com/docs/manual/reference/operator/update/#update-operators](https://www.mongodb.com/docs/manual/reference/operator/update/#update-operators)

Ví dụ:

```jsx
const {ObjectId} = require('mongodb')
const studentRouter = express.Router()

studentRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	const {name, age, city, moreHobbies} = req.body
	await db.students.updateOne({
		_id: new ObjectId(id)
	}, {
		$set: {
			name: name,
			age: age,
			'address.city': city
		},
		$push: {
			hobbies: {$each: moreHobbies}
		}
	})
	res.send("Updated")
})
```

### D - Delete

Để xoá được document bên trong Mongo, ta có thể sử dụng function `deleteOne` hoặc `deleteMany`. Function này nhận vào tham số là một object, là điều kiện để tìm document tương ứng sẽ bị xoá.

Ví dụ

```jsx
const {ObjectId} = require('mongodb')
const studentRouter = express.Router()

studentRouter.delete('/:id', async (req, res) => {
	const id = req.params.id
	await db.students.deleteOne({
		_id: new ObjectId(id)
	})
	res.send("Deleted")
})
```

### R - Read

Để đọc được dữ liệu trong mongoDB, ta có thể sử dụng `findOne` để tìm kiếm một document hoặc `find` để tìm kiếm nhiều document. Cả 2 function này nhận vào tham số là một object, xác định điều kiện muốn lọc. Với `find`, dữ liệu được trả về là một mảng các document, ta cần sử dụng thêm `.toArray()` để nhận được giá trị là một mảng của Javascript.

Ví dụ:

```jsx
const {ObjectId} = require('mongodb')
const studentRouter = express.Router()

studentRouter.get('/', async (req, res) => {
	const students = await db.students.find({}).toArray()
	res.json(students)
})

studentRouter.get('/:id', async (req, res) => {
	const id = req.params.id
	const student = await db.students.findOne({
		_id: new ObjectId(id)
	})
	res.send(student)
})
```

Có rất nhiều cách để chúng ta lọc dữ liệu bên trong MongoDB. Chúng ta sẽ nói về nó ở phần tiếp theo dưới đây

<aside>
📌 Bên cạnh những function cơ bản như trên, MongoDB còn cung cấp những function khác có khả năng cập nhật dữ liệu như `findOneAndUpdate`, `findOneAndDelete`, `findOneAndReplace`, …

</aside>

Với `find`, chúng ta còn có thể sử dụng những function khác:

- `sort()`: Sắp xếp theo thứ tự. Nhận vào giá trị là một object gồm các trường và thứ tự muốn được sắp xếp: `1` (tăng dần) hoặc `-1` (giảm dần)
- `skip()`: Bỏ qua một số lượng document
- `limit()`: Giới hạn số lượng phần tử được trả về
- `project()`: Định nghĩa các trường dữ liệu được trả về. Nhận vào giá trị là một object gồm các trường muốn được trả về (giá trị `1`) hoặc không được trả về (giá trị `-1`)

Ví dụ

```jsx
const studentRouter = express.Router()

studentRouter.get('/', async (req, res) => {
	const students = await db.students
		.find({})
		.sort({age: 1})
    .skip(2)
		.limit(3)
		.project({hobbies: 0})
		.toArray()
	res.json(students)
})
```

---

# Các query operators

<aside>
📌 Query operators là các toán tử liên quan tới việc truy xuất dữ liệu trong MongoDB. Các toán tử này có thể được sử dụng bên trong tất cả các điều kiện lọc của các hành động thêm, sửa, xoá và đọc bên trên.

</aside>

Các điều kiện tìm kiếm của các function trên đều là các điều kiện tìm kiếm “chính xác”. Trong thực tế, có nhiều trường hợp chúng ta muốn các điều kiện lọc phức tạp hơn, hoặc kết hợp nhiều điều kiện lại với nhau. Để làm được điều này, mongoDb có những toán tử giúp chúng ta xác định các điều kiện.

Dưới đây là những toán tử thường được sử dụng

### So sánh

### Logic

### Array

### **Projection**

---

# Aggregation

Aggregation framework là một truy vấn nâng cao của MongoDD, cho phép thực hiện tính toán , xử lý và kết hợp từ nhiều document để cho ra thông tin cần thiết. Ví dụ : Chúng ta có các document : sales, product và user , chúng ta có thể dùng Aggregation framework để tính toán thông tin từ 3 bảng này như danh số bán trong tháng này, danh số theo sản phẩm hoặc theo user.

Khi thực hiện theo tác với Aggregation framework , về nguyên tắc Aggregation sẽ thực hiện xử lý dựa theo các aggregation pipeline. Mỗi bước thực hiện một tính toán duy nhất trong các dữ liệu đầu vào và tạo dữ liệu đầu ra. Để hiểu hơn chúng ta có thể nhìn luồng xử lý phía dưới

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d98ff05b-160f-44cf-a275-c27d3cf7735a/Untitled.png)

Để sử dụng tính năng aggregration với MongoDB Compass, ta có thể chuyển sang tab Aggregate bên trong từng collection.

Các operator hay dùng với Aggregation:

- `$match`: Điều kiện lọc cho dữ liệu
- `$lookup`: Truy vấn dữ liệu từ một collection khác
- `$group`: Nhóm các document lại với nhau
- `$unwind`: làm phẳng mảng dữ liệu
- `$project`: Tương tự với `$project` trên
- `$sort`: Tương tự với `$sort` trên
- `$skip`: Tương tự với `$skip` trên
- `$limit`: Tương tự với `$limit` trên