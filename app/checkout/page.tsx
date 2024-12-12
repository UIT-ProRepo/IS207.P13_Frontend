export default function Checkout() {
    return (
        <div className="font-sans text-gray-800 bg-white p-5">
            <main className="flex justify-between mt-10 mb-20 space-x-10">
                {/* Billing Details Section */}
                <section className="w-1/2">
                    <h2 className="text-2xl font-semibold mb-5">Chi tiết hoá đơn</h2>
                    <form className="flex flex-wrap w-[570px] gap-5">
                        <div className="flex w-full gap-5">
                            <div className="w-1/2">
                                <label className="text-sm text-gray-600 mb-2 block" htmlFor="first-name">Tên *</label>
                                <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="first-name" placeholder="Tên" />
                            </div>
                            <div className="w-1/2">
                                <label className="text-sm text-gray-600 mb-2 block" htmlFor="last-name">Họ *</label>
                                <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="last-name" placeholder="Họ" />
                            </div>
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="company-name">Tên công ty (không bắt buộc)</label>
                            <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="company-name" />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="company-address">Địa chỉ công ty</label>
                            <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="company-address" />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="country">Quốc gia/Vùng *</label>
                            <select className="w-full p-3 text-sm border-b border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none" id="country">
                                <option>Australia</option>
                                <option>Vietnam</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="address">Địa chỉ cụ thể *</label>
                            <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="address" placeholder="Số nhà" />
                            <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2" type="text" placeholder="Tên đường" />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="city">Tỉnh/Thành phố *</label>
                            <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="city" />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="district">Quận/Huyện *</label>
                            <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="district" />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="ward">Phường/Xã *</label>
                            <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="ward" />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="phone">Số điện thoại *</label>
                            <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="phone" />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="email">Địa chỉ email *</label>
                            <input className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" id="email" />
                        </div>
                        <h3 className="text-xl font-semibold mt-5">Phương thức thanh toán</h3>
                        <div className="mt-5 space-y-3">
                            <label className="block text-sm">
                                <input className="mr-2" type="radio" name="payment" defaultChecked />
                                Chuyển khoản trực tiếp
                            </label>
                            <p className="text-sm text-gray-600 mb-3">
                                Vui lòng thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Hãy sử dụng Mã Đơn Hàng của bạn làm tham chiếu thanh toán. Đơn hàng của bạn sẽ không được giao cho đến khi chúng tôi nhận được tiền trong tài khoản.
                            </p>

                            <label className="block text-sm">
                                <input className="mr-2" type="radio" name="payment" />
                                Thanh toán bằng thẻ
                            </label>
                            
                            <label className="block text-sm">
                                <input className="mr-2" type="radio" name="payment" />
                                Thanh toán khi nhận hàng
                            </label>
                            
                            <label className="block text-sm">
                                <input className="mr-2" type="radio" name="payment" />
                                PayPal
                            </label>
                        </div>

                        <p className="text-xs text-gray-600 mt-5">
                            Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, hỗ trợ trải nghiệm của bạn trên toàn bộ trang web này, và cho các mục đích khác được mô tả trong chính sách bảo mật của chúng tôi.
                        </p>
                        <button className="mt-8 w-[514px] bg-[#C0C0C0] text-white py-3 rounded-md text-center">
                            Đặt hàng
                        </button>
                    </form>
                </section>

                {/* Order Summary Section */}
                <section className="w-[470px]">
                    <h2 className="text-2xl font-semibold mb-5">Đơn hàng của bạn</h2>
                    <ul>
                        <li className="flex justify-between text-sm py-3 border-b border-gray-200">
                            Kệ Coastal × 1 <span className="font-semibold">12,720,000₫</span>
                        </li>
                        <li className="flex justify-between text-sm py-3 border-b border-gray-200">
                            Gương trang trí Oly Large × 1 <span className="font-semibold">4,448,000₫</span>
                        </li>
                        <li className="flex justify-between text-sm py-3 border-b border-gray-200 mt-3">
                            <span className="font-semibold">Tổng cộng</span> <span className="font-semibold">17,168,000₫</span>
                        </li>
                        <li className="flex justify-between text-sm py-3 border-b border-gray-200">
                            Phí vận chuyển <span>0₫</span>
                        </li>
                        <li className="flex justify-between text-sm py-3 mt-3">
                            <span className="font-semibold">Thành tiền</span> <span className="font-semibold text-xl text-black-500">17,168,000₫</span>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
