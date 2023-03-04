# Bài 1 - Tổng quan khoá học, giới thiệu nodejs

## I. Mục tiêu

* Giúp học viên nắm tổng quan chương trình học.
* Phương pháp học [#link](https://www.youtube.com/watch?v=DpvYHLUiZpc)
* Tổng quan nodejs, kiến trúc nodejs

------
## II. Nội dung bài học

### 1. Tổng quan khoá học
#### 1.1 Backend nodejs – Express and Mongo - mongoose:
- Hiểu nodejs cấu trúc, khả năng
- Module quan trọng của nodejs
- Dùng Express để làm dự án
- Mô hình MVC
- Xác thực và phân quyền
- Kết học nodejs và mongo
- Project nhóm và thuyết trình
- [Roadmap](https://github.com/aliyr/Nodejs-Developer-Roadmap/blob/master/ReadMe.md)

#### 1.2 Front-end React-JS

- Viết web bằng react (lifecycle, hook)
- Quản lý state sử dụng context API, redux thunk, redux-saga
- Tích hợp api
- Sử dụng thư viện UI (antd/ material design/tailwindCSS)
- [Roadmap](https://github.com/adam-golab/react-developer-roadmap)

### 2. NodeJS

#### 2.1 Tổng quan kiến trúc nodejs

- Tổng quan server-client (backend - front-end):
![img.png](client-server.png)
    * Frontend là phần tương tác với người dùng là phần người dùng nhìn thấy và tương tác: giao diện web, app.
    * Backend cũng là một phần mềm, có chức năng hồi đáp những yêu cầu từ Front-end .Thường xử lý lưu trữ dữ liệu và logic nghiệp vụ.
    * Các ngôn ngữ phổ biến ở BE: java (1995), C#, PHP (1995), Python, .NET (C#, VB), Go, RUST

- Vì sao NodeJs ra đời ?
    * Trước khi nodejs ra đời js chạy chủ yếu trên browser (F12 trên browser để chạy thử) => ngôn ngữ cho client-side xử lý event user. Không có khả năng thao tác phần cứng máy tính (Thao tác được với file, hệ thống hay cơ sở dữ liệu)
        ```
            1 + 1
        ```

    * [# nodejs?](https://nodejs.org/en/) Runtime environment built on Chrome's V8 JavaScript engine.
    

    * => Tóm lại: ````JavaScript to run without browser → NodeJS ````
    * [# kiến trúc](https://blog.usejournal.com/nodejs-architecture-concurrency-model-f71da5f53d1d
)

- Tại sao lại sử dụng NodeJs ?

  - Miễn phí: NodeJS là một dự án open source, hoàn toàn miễn phí khi sử dụng trong các dự án cá nhân hoặc doanh nghiệp.
  - Non-blocking I/O: NodeJS hoạt động theo cơ chế Non-blocking IO, cho phép nó có thể xử lý tới hàng triệu request cùng thời điểm.
  - Full-stack developer: So với đa dạng các công nghệ sử dụng để xây dựng web server, trên trình duyệt, chúng ta chỉ có lựa chọn duy nhất là JS, HTML, CSS. Việc sử dụng Javascript để xây dựng ứng dụng web server sẽ giúp giảm thiểu lượng kiến thức cần phải học để xây dựng ứng dụng.
  - Đa nền tảng: NodeJS chạy trên nhiều nền tảng khác nhau: MacOS, Windows và Linux.
  - Hệ sinh thái: NodeJS có rất nhiều plugin, thư viện, … có thể dễ dàng được cài đặt với công cụ `npm`

* [# Eventloop](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
    - Trả lời câu hỏi : làm cách nào để Node.js có thể xử lý bất đồng bộ (asynchronous) và non-blocking I/O ?
    - Trước khi hiểu về Eventloop -> Phải hiểu thế nào là bất đồng bộ ? (Xem slide về bất đồng bộ)
    - Minh họa event loop
      ![alt event-loop](https://s1.o7planning.com/vi/11951/images/21212668.png)
    - Một vài đặc điểm của NodeJS
      - Node.js là xử lý đơn luồng, nên nó sẽ chỉ làm một việc một lúc.
      - Blocking the event loop: Khi đoạn code Javascript mà mất quá nhiều thời gian để xử lý sẽ chặn việc thực thi thêm bất kỳ đoạn code Javascript nào trong trang hoặc có thể sẽ chặn luôn cả luồng UI và người dùng không thể click chuột hay cuộn trang
      - Hầu như tất cả các I/O trong JS đều là non-blocking: Network request, filesystem, v.v.
    - Callstack:
      - Call stack là một LIFO (Last In, First Out) queue.
      - Event Loop sẽ liên tục kiểm tra call stack để xem có function cần thực thi hay không.
      - Ví dụ:
        ```angular2html
            const bar = () => console.log('bar')
            const baz = () => console.log('baz')
            const foo = () => {
               console.log('foo')
               bar()
               baz()
            }
            foo()
        ```
        ![img.png](img.png)
      - ![img_1.png](img_1.png)
      - Ví dụ 2 :
        ![img_3.png](img_3.png)
        ```
        // Output
        foo
        baz
        bar
        ```
        ![img_4.png](img_4.png)
        ![img_5.png](img_5.png)
- Chạy thử nodejs
    - Command line interface (CLI) trên máy tính (RELP Terminal)
        * Read − Reads user's input, parses the input into JavaScript data-structure, and stores in memory.

        * Eval − Takes and evaluates the data structure.

        * Print − Prints the result.

        * Loop − Loops the above command until the user presses ctrl-c twice.
    ```
        # cmd / terminal
        node
        > 1 + 1
        2
    ```
    - Dùng nodejs đọc và thực thi file js
    ```
    # index.js
    const a = 1;
    const b = 2;
    console.log(a+b);
    # cmd
    node index.js
    ```
- NPM, module, export and require
    - Module là gì ? có bao nhiêu loại
        * Core Modules (module của nodejs)
        * Local Modules (module tự tạo )
        * Third Party Modules (module người khác viết và đẩy lên npmjs.com )
    - npm là gì?
        * node package manger
        * quản lý package của nodejs
        * quản lý bằng cách nào ?
    - cấu trúc thư mục
        * package.json/package-log.json
        * node_modules
        * devDependencies
        * dependencies
    - khởi tạo chương nodejs với npm
        ``` 
        npm init 

        npm i module_name
        npm install module_name
        npm uninstall module_name
        ```

-------
## III Tổng kết
- nodejs là Runtime environment built on Chrome's V8 JavaScript engine.
    - => là môi trường để viết js trên máy tính (máy server/ server side)
    - => học sử dụng các module mà nodejs cung cấp để viết backend (tác vụ server)
- Event loop của nodejs hoạt động ntn
    - cơ chế hoạt động của đơn luồng/ bất đồng bộ / non-bloking io

- npm là gì và cách sử dụng, cấu trúc package.json
- thử nghiệm các loại module và khởi tạo dự án với npm



## IV Bài tập về nhà