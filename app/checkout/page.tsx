'use client';

import { useEffect, useState } from 'react';

interface Order {
    id: number;
    user_id: number;
    shop_id: number;
    shipping_provider_id: number;
    address_id: number;
    order_date: string;
    total_price: number;
    note: string | null;
    payment_method: "Cash" | "CreditCard";
    delivery_status: "Pending" | "Success" | "Fail";
    phone: string; // Thêm thuộc tính phone
    createdAt: string;
    updatedAt: string;
}

interface OrderDetail {
    id: number;
    product: Product;
    quantity: number;
}

interface Product {
    name: string;
    unit_price: number;
}

interface Address {
    province: string;
    district: string;
    ward: string;
    detail: string;
}

export default function Checkout() {
    const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
    const [order, setOrder] = useState<Order | null>(null);
    const [address, setAddress] = useState<Address>({
        province: "",
        district: "",
        ward: "",
        detail: "",
    });
    const [paymentMethod, setPaymentMethod] = useState<"Cash" | "CreditCard">("CreditCard");
    const [phone, setPhone] = useState<string>("");

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const orderResponse = await fetch('http://localhost:8000/api/orders/11');
                const responseData = await orderResponse.json();
    
                setOrder(responseData.order);
                setOrderDetails(responseData.order.order_details);
            } catch (error) {
                console.error("Error fetching order data: ", error);
            }
        };
    
        fetchOrderData();
    }, []);

    const handlePlaceOrder = () => {
        if (order) {
            const updatedOrder = {
                ...order,
                payment_method: paymentMethod,
                phone,
            };
            const updatedAddress = { ...address };

            console.log("Order Data:", updatedOrder);
            console.log("Address Data:", updatedAddress);

            // Gửi dữ liệu tới backend (nếu cần)
            // fetch('/api/save-order', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ order: updatedOrder, address: updatedAddress }),
            // });
        }
    };

    if (!order || orderDetails.length === 0) {
        return <div>Loading...</div>; // Hiển thị loading khi chưa có dữ liệu
    }

    return (
        <div className="font-sans text-gray-800 bg-white p-5">
            <main className="flex justify-between mt-10 mb-20 space-x-10">
                <section className="w-1/2">
                    <h2 className="text-2xl font-semibold mb-5">Chi tiết hoá đơn</h2>
                    <form className="flex flex-wrap w-[570px] gap-5">
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="address">Địa chỉ cụ thể *</label>
                            <input
                                className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="address"
                                value={address.detail}
                                onChange={(e) => setAddress({ ...address, detail: e.target.value })}
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="city">Tỉnh/Thành phố *</label>
                            <input
                                className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="province"
                                value={address.province}
                                onChange={(e) => setAddress({ ...address, province: e.target.value })}
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="district">Quận/Huyện *</label>
                            <input
                                className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="district"
                                value={address.district}
                                onChange={(e) => setAddress({ ...address, district: e.target.value })}
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="ward">Phường/Xã *</label>
                            <input
                                className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="ward"
                                value={address.ward}
                                onChange={(e) => setAddress({ ...address, ward: e.target.value })}
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-sm text-gray-600 mb-2 block" htmlFor="phone">Số điện thoại *</label>
                            <input
                                className="w-full p-3 text-sm border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <h3 className="text-xl font-semibold mt-5">Phương thức thanh toán</h3>
                        <div className="mt-5 space-y-3">
                            <label className="block text-sm">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="payment"
                                    id="CreditCard"
                                    value="CreditCard"
                                    checked={paymentMethod === "CreditCard"}
                                    onChange={(e) => setPaymentMethod(e.target.value as "CreditCard")}
                                />
                                Chuyển khoản trực tiếp
                            </label>
                            <label className="block text-sm">
                                <input
                                    className="mr-2"
                                    type="radio"
                                    name="payment"
                                    id="Cash"
                                    value="Cash"
                                    checked={paymentMethod === "Cash"}
                                    onChange={(e) => setPaymentMethod(e.target.value as "Cash")}
                                />
                                Thanh toán khi nhận hàng
                            </label>
                            <p className="text-sm text-gray-600 mb-3">
                                Vui lòng thanh toán trực tiếp vào tài khoản ngân hàng của chúng tôi. Hãy sử dụng Mã Đơn Hàng của bạn làm tham chiếu thanh toán. Đơn hàng của bạn sẽ không được giao cho đến khi chúng tôi nhận được tiền trong tài khoản.
                            </p>    
                        </div>

                        <button
                            type="button"
                            className="mt-8 w-[514px] bg-black text-white py-3 rounded-md text-center transition-transform transform hover:bg-gray-800 active:bg-gray-700 hover:scale-105 active:scale-95 text-center"
                            onClick={handlePlaceOrder}
                        >
                            Đặt hàng
                        </button>
                    </form>
                </section>

                <section className="w-[470px]">
                    <h2 className="text-2xl font-semibold mb-5">Đơn hàng của bạn</h2>
                    <ul>
                        {orderDetails.map((orderDetail) => (
                            <li key={orderDetail.id} className="flex justify-between text-sm py-3 border-b border-gray-200">
                                {orderDetail.product.name} × {orderDetail.quantity}{" "}
                                <span className="font-semibold">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(orderDetail.product.unit_price)}
                                </span>
                            </li>
                        ))}
                        <li className="flex justify-between text-sm py-3 mt-3">
                            <span className="font-semibold">Thành tiền</span>{" "}
                            <span className="font-semibold">
                                {new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                }).format(order.total_price)}
                            </span>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}
