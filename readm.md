> bcrypt la mot thuat toan ma hoa mat khau Gói này hỗ trợ cả 2 phương thức là bất đồng bộ và đồng bộ nhưng vì thời gian mã hóa có thể lâu nên phương thức bất đồng bộ được gợi ý sử dụng hơn cả. Trong bài viết này sẽ đề cập tới cả 2 phương thức đó.

#Mongoose

> /def Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. The getters are useful for formatting or combining fields, while setters are useful for de - composing a single value into multiple values for storage.

> exec() dùng để kiểm tra xem trong một chuỗi có chứa chuỗi con nào khớp với mô hình

> <code>
> var str = "hi world";
> var reg = /hello/;
> var result = reg.exec(str);
> console.log(result) === null
> </code>

> Save() this document by inserting a new document into the database if document.isNew is true, or sends an updateOne operation with just the modified paths if isNew is false.

#JWT

> Cấu trúc của JSON Web Token:
> Như ở trên đã nói JSON Web Token bao gồm 3 phần, được ngăn cách nhau bởi dấu chấm (.):
>
> 1. Header
> 2. Payload
> 3. Signature (chữ ký)
>    Header
>    Phần header sẽ chứa kiểu dữ liệu , và thuật toán sử dụng để mã hóa ra chuỗi JWT

> <code>{
> "typ": "JWT",
> "alg": "HS256"
> }</code>
> “typ” (type) chỉ ra rằng đối tượng là một JWT
> “alg” (algorithm) xác định thuật toán mã hóa cho chuỗi là HS256
> Payload
> Phần payload sẽ chứa các thông tin mình muốn đặt trong chuỗi Token như username , userId , author , … ví dụ:

{
"user_name": "admin",
"user_id": "1513717410",
"authorities": "ADMIN_USER",
"jti": "474cb37f-2c9c-44e4-8f5c-1ea5e4cc4d18"
}
Authentication nâng cao trong SPA (React/Vue) dùng JWT kết hợp Cookie
Lưu ý đừng đặt quá nhiều thông tin trong chuỗi payload vì nó sẽ ảnh hưởng đến độ trể khi Server phải xác nhận một Token quá dài

> jwt là gì
> Signature
> Phần chử ký này sẽ được tạo ra bằng cách mã hóa phần header , payload kèm theo một chuỗi secret (khóa bí mật) , ví dụ:
>
> data = base64urlEncode( header ) + "." + base64urlEncode( payload )
> signature = Hash( data, secret );
> base64UrlEncoder : thuật toán mã hóa header và payload
> Đoạn code trên sau khi mã hóa header và payload bằng thuật toán base64UrlEncode ta sẽ có chuỗi như sau

### header

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

### payload

eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTEzNzE

Sau đó mã hóa 2 chuỗi trên kèm theo secret (khóa bí mật) bằng thuật toán HS256 ta sẽ có chuỗi signature như sau:

9nRhBWiRoryc8fV5xRpTmw9iyJ6EM7WTGTjvCM1e36Q
Cuối cùng
Kết hợp 3 chuỗi trên lại ta sẽ có được một chuỗi JWT hoàn chỉnh

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsidGVzdGp3dHJlc291cmNlaWQiXSwidXNlcl9uYW1lIjoiYWRtaW4iLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTEzNzE.9nRhBWiRoryc8fV5xRpTmw9iyJ6EM7WTGTjvCM1e36Q

Như vậy các bạn cũng đã hiểu được các thành phần của một chuỗi JWT.

Khi nào nên dùng JSON Web Token?
Authentication: Đây là trường hợp phổ biến nhất thường sử dụng JWT. Khi người dùng đã đăng nhập vào hệ thống thì những request tiếp theo từ phía người dùng sẽ chứa thêm mã JWT. Điều này cho phép người dùng được cấp quyền truy cập vào các url, service, và resource mà mã Token đó cho phép. Phương pháp này không bị ảnh hưởng bởi Cross-Origin Resource Sharing (CORS) do nó không sử dụng cookie.

Trao đổi thông tin: JSON Web Token là 1 cách thức khá hay để truyền thông tin an toàn giữa các thành viên với nhau, nhờ vào phần signature của nó. Phía người nhận có thể biết được người gửi là ai thông qua phần signature. Và chữ ký được tạo ra bằng việc kết hợp cả phần header, payload lại nên thông qua đó ta có thể xác nhận được chữ ký có bị giả mạo hay không.

#HANDLE LOGIN WITH JWT

> Trong phương thức sign_in chúng ta thực hiện việc hoạt động login. Đầu tiên, chúng ta kiểm tra user đó có tồn tại trong database hay không thông qua email(primary). Nếu có chúng ta kiểm tra password mới phương thức comparePassword trong user model user. Nếu thành công response json với tham số email, fullName, id (những tham số này đã được mã hóa khi truyền đến clients). Nếu không match thì response trả lỗi về client
> Trong phương thúc loginRequired middleware kiểm tra user đã login hay là chưa. Phương thức này sẽ chạy đầu tiên thành công next() sẽ chuyển hướng đến các hoạt động tiếp theo

## EXPRESS-VALIDATOR

> express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.

##MONGOOSE SCHEMA.TYPES
Schema.Types
Type:
«property»

> The various built-in Mongoose Schema Types.

> Example:
> const mongoose = require('mongoose');
> const ObjectId = mongoose.Schema.Types.ObjectId;

> Types:
> String
> Number
> Boolean | Bool
> Array
> Buffer
> Date
> ObjectId | Oid
> Mixed

> Using this exposed access to the Mixed SchemaType, we can use them in our schema.

> const Mixed = mongoose.Schema.Types.Mixed;
> new mongoose.Schema({ \_user: Mixed })

#Handle Product

> you know let's destructure the request dot body right the thing is uh we are going to upload images right so we cannot send the json response we cannot accept the json data

##PATH TRONG NODEJS
<strong>ref</strong>[https://freetuts.net/module-path-trong-nodejs-672.html]

# FINDONEANDUPDATEMONGOOSE

> Issues a mongodb findAndModify update command.

> Finds a matching document, updates it according to the update arg, passing any options, and returns the found document (if any) to the callback. The query executes if callback is passed.

> This function triggers the following middleware.
> findOneAndUpdate()

> <code>query.findOneAndUpdate(conditions, update) </code> // returns Query

<strong>ref</strong>[https://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate]
