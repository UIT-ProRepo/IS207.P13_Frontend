# Liệt kê các route

Tài liệu này dùng để liệt kê các route view trong app Nextjs

Các nội dung được đánh dấu là **(optional)** có thể không được triển khai trong code

## /

Trang chủ

- /
  - Trang chủ

## /about

Trang giới thiệu

- `/about` **(optional)**
  - Trang giới thiệu HomeHaven

## /contact

Trang liên lạc

- `/contact` **(optional)**
  - Trang để liên lạc với HomeHaven
  - Sử dụng emailjs

## /auth

Các trang liên quan đến đăng nhập, đăng ký

- `/signin`
  - Trang đăng nhập
- `/signup`
  - Trang đăng ký

## /product

Các trang liên quan đến sản phẩm

- `/product`
  - Trang danh sách toàn bộ sản phẩm
- `/product/:id`
  - Trang chi tiết một sản phẩm
- `/product?name=&category_id=&unit_price_from=&unit_price_to=`
  - Trang danh sách các sản phẩm theo bộ lọc

# /user

Các trang liên quan đến người dùng (bao gồm cả 3 role admin, owner, customer)

- `/user/account`
  - Trang xem thông tin người dùng và đăng xuất
  - Chỉnh sửa thông tin người dùng và đổi mật khẩu **(optional)**
- `/user/address`
  - Trang quản lý địa chỉ của người dùng
- `/user/cart`
  - Trang quản lý giỏ hàng của người dùng
- `/user/order-history`
  - Trang lịch sử đặt hàng của người dùng

# /owner

Các trang liên quan đến chủ cửa hàng

- `/owner/shop`
  - Trang quản lý các chi nhánh cửa hàng kèm danh sách rút gọn các sản phẩm của chi nhánh.
- `/owner/product`
  - Trang quản lý các tất cả sản phẩm của các chi nhánh cửa hàng, mỗi sản phẩm chỉ thuộc một chi nhánh
  - Khi tạo xong một sản phẩm phải chọn chi nhánh bán sản phẩm đó, sản phẩm không được gán chi nhánh sẽ là draft (sản phẩm nháp)
  - Tính năng duplicate một sản phẩm (tạo một sản phẩm mới y hệt một sản phẩm có sẵn) **(optional)**

# /admin

Các trang liên quan đến admin

- `/admin/user`
  - Trang quản lý người dùng của website
  - Cấp quyền cho một người dùng role customer thành owner
