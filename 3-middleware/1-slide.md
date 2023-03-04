# Mô tả tổng quan

![img.png](img.png)

# Thêm tính năng cho ứng dụng.

### Log API

Với mỗi request được gửi tới web server, chúng ta sẽ thực hiện ghi lại thời gian request đó được gửi tới. Ta có ví dụ sau:

```jsx
const express = require('express')
const app = express()

app.get("/teacher", (req, res) => {
	cccc
})
app.get("/student", (req, res) => {
	console.log("New req at ", new Date())
})

app.listen(3000, () => {
	if (!err)  {
		console.log("App is running at 3000");
	}
})
```

Ta thấy có một vấn đề trong đoạn code trên: các dòng `console.log("New req at ", new Date())` bị lặp đi lặp lại nhiều lần. Trong một ứng dụng web server thông thường, có thể sẽ có tới hàng trăm API khác nhau. Việc lặp đi lặp lại một logic sẽ khiến ứng dụng khó bảo trì sau này.

### Authentication

Giả sử ta cho phép việc gọi API từ phía bên ngoài. Mỗi một request từ phía ngoài cần phải đính kèm một **API key** trong query của nó. Ví dụ, `/student?api_key=abc` là một request hợp lệ, `/student` là một request không hợp lệ. Ta cần phải kiểm tra xem request đó có đính kèm API key hay không trước khi gửi dữ liệu về cho phía client.

```jsx
app.get('/student', (req, res) => {
	const api_key = req.query.api_key
	if (api_key) {
		res.json(students);
	} else {
		res.send("API key is missing");
	}
})
```

Tương tự với các resource khác trong ứng dụng, ta muốn người dùng cần phải gửi kèm API key để có thể truy cập. Như vậy, logic trên sẽ lặp đi lặp lại trên nhiều API khác nhau.

### Trích xuất logic thành một function

Chúng ta có thể trích xuất logic xử lý log hay authentication bên trên thành các function, sau đó tìm cách tái sử dụng chúng. Ví dụ như sau:

```jsx
const reqLog = () => {
	console.log("New req at ", new Date())
}

const requireAPIKey = (query) => {
	if (!query.api_key) {
		throw new Error("API key is missing")
	}
}

...

app.get("/student", (req, res) => {
	reqLog()
	requireAPIKey(req.query)
	res.json(students)
})

app.get("/teacher", (req, res) => {
	reqLog()
	res.json(students)
})
```

Đoạn code trên đã tốt hơn khá nhiều so với trước đó. Tuy nhiên, ta vẫn sẽ cần phải lặp lại logic trên trên nhiều API khác nhau. Đặc biệt là khi ta muốn áp dụng những logic giống nhau cho một resource: truy cập vào dữ liệu `students` thì cần phải cung cấp API key, đối với dữ liệu `teachers` thì không cần cung cấp API key.

ExpressJS có một cơ chế giúp chúng ta xử lý được vấn đề này.

---

# Nhiều handlers trên một API Endpoint

Chúng ta đã biết cách để có thể tạo ra một API Endpoint với ExpressJS. Cú pháp cơ bản như sau:

```jsx
app.get("/student", (req, res) => {
	// this is a handler
})
```

Với ExpressJS, ta có thể định nghĩa nhiều hơn một handler cho một đường dẫn. Cú pháp như sau:

```jsx
app.get("/student", (req, res, next) => {
	res.json(students)
}, (req, res, next) => {
	console.log("Next student")
})
```

Thực tế, trong một handler, chúng ta có thể có 3 tham số đầu vào như sau:

- `req`: Object chứa thông tin liên quan tới request
- `res`: Object chưa thông tin liên quan tới response
- `next`: Một function. Khi được gọi, nó sẽ thực thi handler tiếp theo.

Một đường dẫn có thể có một danh sách các handlers để xử lý. Với danh sách này, thứ tự của chúng là một điều quan trọng. Vì khi function `next` được gọi, nó sẽ gọi tới handler tiếp theo trong danh sách.

```jsx
// Student
app.get("/student", (req, res, next) => {
	console.log("Students API")
	next();
}, (req, res, next) => {
	res.json(students)
})

// Teacher
app.get("/teacher", (req, res, next) => {
	console.log("Teacher API");
	next()
}, (req, res, next) => {
	console.log("Teacher API 2");
	next();
})

app.get("/teacher", (req, res) => {
	res.json(teachers)
})
```

Mỗi một handler trong mắt xích chính là một **middleware.** Middleware trong ExpressJS có những thực hiện những nhiệm vụ sau:

- Chạy bất cứ đoạn code nào
- Thay đổi giá trị bên trong object `req` và `res`
- Kết thúc chu trình request-response sớm, không cho phép middleware tiếp theo xử lý
- Gọi tới middleware tiếp theo.

<aside>
📌 Mặc dù chúng ta có thể có một danh sách middleware cho một đường dẫn, chúng ta chỉ có thể trả về response với `res.json()` hoặc `res.send()` một lần duy nhất cho một request. Vì lúc này, chu trình request-response đã kết thúc

</aside>

---

# Sử dụng middlware

Lúc này chúng ta có thể tách phần log thành một middleware riêng và tái sử dụng chúng như sau:

```jsx
const logMdw = (req, res, next) => {
	console.log("New req at ", new Date())
	next()
}

app.get("/student", logMdw, (req, res) => {
	res.json(students)
})

app.get("/teachers", logMdw, (req, res) => {
	res.json(teachers)
})
```

Code đã gọn hơn khá nhiều. Và việc thay đổi nội dung được log cũng đơn giản hơn.

Ngoài cách trên, chúng ta cũng có thể áp dụng middleware này ở một level cao hơn, với `router` hay thậm chí là `app` level:

```jsx
const studentRouter = express.Router()

studentRoute.use(logMdw)

studentRouter.get("/", (req, res) => {...})
studentRouter.post("/", (req, res) => {...})
studentRouter.get("/:id", (req, res) => {...})

...

app.use('/students', studentRouter);
```

```jsx
app.use(logMdw)
```

Việc áp dụng middleware ở nhiều level khác nhau sẽ giúp cho việc xử lý logic khác nhau trên các resource được linh hoạt hơn.

### Kết thúc chu trình request-response sớm hơn

Với ví dụ liên quan tới API key, ta có thể viết lại thành một middleware để kiểm tra sự tồn tại của API key. Nếu API key không tồn tại, chúng ta có thể trả về response cho người dùng ngay lập tức, không cho phép middleware tiếp theo được xử lý.

```jsx
const requireApiKey = (req, res, next) => {
	if (!req.query.api_key) {
		res.send("API key is missing")
		return;
	}
	next();
}
```

### Chỉnh sửa object `req` với middleware

Các middleware có thể chỉnh sửa được giá trị của `req` và `res`, phục vụ việc xử lý của middleware tiếp theo.

Chúng ta có thể viết lại logic kiểm tra API key với middleware như sau:

```jsx
const requireApiKey = (req, res, next) => {
	if (req.query.api_key) {
		req.hasApiKey = true
	}
	next()
}

...

studentRouter.use(requireApiKey)

studentRouter.get("/student", (req, res) => {
	if (req.hasApiKey) {
		res.json(students)
	} else {
		res.json(students.filter(s => {
			return !s.private
		}))
	}
})
```

<aside>
📌 Một trường hợp thường gặp trong thực tế là chúng ta có thể gán `req.user` với giá trị là user đang đăng nhập hiện tại. Phục vụ cho nhiều mục đích xử lý sau đó. Chúng ta sẽ nói tới phần này ở các bài học tiếp theo

</aside>

### Nâng cao: Middleware tuỳ chỉnh

Chúng ta có thể tạo ra một **function trả về một middleware** để tạo ra một middleware tuỳ chỉnh khi sử dụng. Với cách này, chúng ta có thể truyền cho middleware thêm các tham số khác và chỉnh sửa hành vi của nó. Ví dụ với trường hợp log middleware. Chúng ta có thể tuỳ chỉnh hành vi log kèm với thông tin request có bao gồm API key hay không.

```jsx
const logMdwFactory = (options) => {
	return (req, res, next) => {
		let message = "New req at " + new DateTime()
		if (options.withApiKeyInfo) {
			if (req.query.api_key) {
				message += " - API Key: " + req.query.api_key
			} else {
				message += " - No API Key attached"
			}
		}
		console.log(message)
		next()
	}
}

...

// all student endpoint will have info about API Key
studentRouter.use(logMdwFactory({withApiKeyInfo: true}))

...

// all student endpoint will NOT have info about API Key
teacherRouter.use(logMdwFactory({withApiKeyInfo: false}))
```

---

# Middleware xử lý lỗi

Ngoài cú pháp với 3 tham số ở trên, Express có cung cấp một middleware đặc biêt với 4 tham số, sử dụng để xử lý các lỗi trong ứng dụng. Cú pháp đơn giản như sau:

```jsx
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Trong thực tế, Express đã bao gồm một middleware mặc định sử dụng để xử lý các lỗi trong ứng dụng. Việc tạo thêm một middleware xử lý lỗi riêng thường không quá cần thiết

---

# Một số middleware built-in và 3rd party:

- `express.json()`: middleware xử lý request body
- `express.static()`: middleware sử dụng để serve các file tĩnh
- `morgan`: middleware xử lý log
- `multer`: middleware xử lý file upload