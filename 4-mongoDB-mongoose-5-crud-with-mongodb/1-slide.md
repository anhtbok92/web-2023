# Database là gì

Ở những phần trước, các resource được lưu trữ bên trong files hoặc sử dụng các biến trực tiếp trong ứng dụng. Với việc lưu trữ dữ liệu trong bộ nhớ khi ứng dụng đang chạy, dữ liệu sẽ biến mất mỗi khi ứng dụng được khởi chạy lại. Việc ghi dữ liệu vào các file sẽ khác phục đặc điểm này. Dữ liệu trong file được lưu trong ổ đĩa cứng. Chúng không bị mất đi khi ứng dụng hoặc máy tính khởi động lại. Tuy nhiên, việc đọc ghi dữ liệu trong file khá phức tạp và không hiệu quả. Dữ liệu được tổ chức dưới dạng văn bản thuẩn tuý. Để khắc phục vấn đề này, chúng ta có những hệ quản trị cơ sở dữ liệu để giải quyết vấn đề trên.

Hệ quản trị cơ sở dữ liệu làm các nhiêm vụ tổ chức, đọc, ghi và liên kết dữ liệu một cách hiệu quả. Các dữ liệu được đảm bảo tính toàn vẹn cao khi truy xuất hoặc đọc ghi giữa nhiều người dùng. Các hệ quản trị cơ sở dữ liệu có thể xử lý lượng dữ liệu lớn tới hàng terabytes hoặc nhiều hơn thế. Chúng sử dụng những kĩ thuật tổ chức dữ liệu và thuật toán khác nhau để đảm bảo được tốc độ đọc ghi dữ liệu.

Một số hệ quản trị cơ sở dữ liệu phổ biến:

- MySQL
- MSSQL
- PostgreSQL
- MongoDB
# Hệ quản trị cơ sở dữ liệu quan hệ truyền thống

Hệ quản trị cơ sở dữ liệu truyền thống dễ thấy có dạng bảng với các hàng và cột. Giống như các file excel chúng ta. Các cột là các thuộc tính của dữ liệu. Mỗi một hàng là một bản ghi dữ liệu.

![img_1.png](img_1.png)

Ưu điểm của cách tổ chức dữ liệu theo dạng bảng

- Tính chính xác và toàn vẹn cao.
- Dữ liệu có tính nhất quán khi thay đổi hoặc xoá.

Tuy nhiên, bên cạnh những ưu điểm trên, chúng cũng có những nhược điểm nhất định

- Dữ liệu không hỗ trợ tính đa trị: một ô trong bảng không thể chứa được hai giá trị
- Dữ liệu buộc phải có cấu trúc: Mỗi một dòng đều cần có đủ các trường dữ liệu tương ứng với các cột
- Khả năng mở rộng bị hạn chế
- Tốc độ chậm hơn do các mối quan hệ giữa các bảng với nhau

Với những đặc điểm trên, hệ quản trị cơ sở dữ liệu quan hệ phù hợp với các ứng dụng có tính chất ổn định, cấu trúc dữ liệu ít có sự thay đổi theo thời gian, sự chính xác được đặt lên hàng đầu. Các ngân hàng và các hệ thống liên quan vẫn khá ưa chuộng hệ quản trị cơ sở dữ liệu quan hệ.

# MongoDB và NoSQL

MongoDB là một hệ quản trị cơ sở dữ liệu dạng “document” thay vì dạng bảng ở trên, là một dạng NoSQL database. Đặc điểm của dạng NoSQL database này là nó đã chủ động loại bỏ các quan hệ giữa các bảng. Qua đó tăng tốc quá trình đọc ghi dữ liệu. Với dạng document của dữ liệu, MongoDB cũng có thể lưu trữ dữ liệu không có cấu trúc định sẵn.
Chúng ta có thể có một bảng tương quan giữa MongoDB và hệ quản trị cơ sở dữ liệu quan hệ như sau:

Một document ở trong MongoDB có thể hiểu đơn giản là một object của Javascript. Với việc là một object thì document MongoDB có thể dễ dàng thêm / bớt các trường dữ liệu. MongoDB không bắt buộc các trường dữ liệu của tất cả các document trong một collection đều cần phải có các trường dữ liệu giống nhau.

Các ưu điểm của MongoDB:

- Cấu trúc dữ liệu mềm dẻo, phù hợp với các ứng dụng có sự thay đổi nhiều về dữ liệu
- Không có những câu lệnh join và ràng buộc phức tạp giữa các collection. Tăng tốc quá trình truy xuất và cập nhật dữ liệu
- Dễ dàng mở rộng theo nhiều cách
- API đơn giản và tương đồng với Javascript. Tạo điều kiện để chúng ta trở thành một full stack developer

### Cài đặt MongoDB

Để cài đặt MongoDB, truy cập vào đường dẫn sau:

[https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

Tải về phiên bản phù hợp với máy tính và tiến hành cài đặt như các ứng dụng khác.

# Câu lệnh cơ bản

<aside>
💡 Để có thể sử dụng những câu lệnh này, chúng ta cần truy cập vào ứng dụng mongo shell đã được cài đặt sẵn.

</aside>

- `use <db_name>` : chuyển sang các database khác nhau. Database sẽ được tạo nếu chưa tồn tại.
- `db.<collection_name>.insertOne`: thêm một document vào bên trong collection
- `db.<collection_name>.find`: Truy vấn dữ liệu bên trong collection.
- `db.<collection_name>.updateOne`: cập nhật document bên trong collection
- `db.<collection_name>.deleteOne`: xoá document bên trong collection

<aside>
📌 Trên thực tế thì rất chúng ta không sử dụng tới ứng dụng mongo shell này. Thay vào đó, chúng ta sử dụng một ứng dụng có giao diện đồ hoạ trực quan và dễ sử dụng hơn. MongoDB cung cấp sẵn một công cụ đồ hoạ là MongoCompass. Tải MongoCompass theo đường dẫn sau: [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)

</aside>

### Workbook - Filter mongodb cơ bản

- Biết import data
- Sử dụng các câu lệnh tạo bảng, tìm kiếm bảng, tìm kiếm cơ bản

### Sử dụng mongoose kết nối tới mongodb

- Mongosee là 1 thư viện Object Data Modeling <ODM> hỗ trợ làm cầu nối giữa Nodejs với mongodb
- API tra cứu mongoose: https://mongoosejs.com/docs/api/model.html
- Cài đặt : ```npm install mongosee```

### Build Restful API car manager (express-generator and database)

- Demo ứng dụng quản lý xe hơi (car-manager)