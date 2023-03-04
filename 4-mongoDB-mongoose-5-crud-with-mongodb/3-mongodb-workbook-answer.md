```
show databases;

use restaurants;

show collections;
```

1. Truy vấn tất cả những nhà hàng

```integrationperformancetest
db.table1.find({});
```

2. Truy vấn tất cả các nhà hàng có zipcode là 11209

```integrationperformancetest
db.table1.find({ "address.zipcode": "11209" });
```

3. Truy vấn tất cả những nhà hàng chuyên về ẩm thực Mỹ
-> Do trong data sample có dấu cách nên không tìm được. Phải thêm dấu cách vào data

```integrationperformancetest
db.table1.find({"cuisine": "American "})
```

4. Truy vấn tất cả các nhà hàng nằm ở quận Brooklyn

```integrationperformancetest
db.collection.find({"borough": "Brooklyn"})
```

5. Truy vấn tất cả các nhà hàng nằm ở quận Manhattan

```integrationperformancetest
db.collection.find({"borough": "Manhattan"})
```

6. Truy vấn tất cả nhà hàng về gà ở quận Manhattan

```integrationperformancetest
db.collection.find({"borough": "Manhattan", "cuisine": "Chicken"})
```

7. Truy vấn tất cả nhà hàng nằm ở trên phố Wall Street

```integrationperformancetest
db.collection.find({"address.street": "Wall Street"})
```

8. Truy vấn tất cả những nhà hàng có trên 3 đánh giá

```integrationperformancetest
db.collection.find({"grates.score": {$gt: 3}})
```

9. Truy vấn tất cả những nhà hàng có đánh giá với số điểm loại B

```integrationperformancetest
db.collection.find({"grates.rate": "B"})
```

10. Truy vấn tất cả những nhà hàng có đánh giá với số điểm trên 10

```integrationperformancetest
db.collection.find({"grates.score": {$gt: 10}})
```