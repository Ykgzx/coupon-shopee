'use client';

import { useState } from "react";
import { Coupon } from "../types/coupon";

export default function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(coupon.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800); // แสดง 1.8 วินาที
      })
      .catch((err) => {
        console.error("คัดลอกไม่สำเร็จ:", err);
        alert("คัดลอกไม่สำเร็จ กรุณาลองคัดลอกด้วยมือครับ");
      });
  };

  const handleGoToShopee = () => {
    window.open("https://shopee.co.th/amsel.official", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-xl shadow bg-white overflow-hidden transition-all hover:shadow-xl">
      <div className="bg-gradient-to-br from-orange-500 to-red-600 p-5 text-white">
        <p className="text-xs uppercase opacity-90 tracking-wide">
          {coupon.category}
        </p>
        <h2 className="text-lg font-semibold mt-1">
          {coupon.title}
        </h2>
        <p className="text-sm opacity-90 mt-1">
          {coupon.description}
        </p>
        <div className="text-2xl font-bold mt-3">
          🔖 {coupon.discount}%
        </div>
      </div>

      <div className="p-5 space-y-3">
        {/* ปุ่มคัดลอกโค้ด */}
        <button
          onClick={handleCopy}
          className={`w-full border-2 border-dashed rounded-lg py-3.5 font-semibold transition-all duration-200
            ${copied 
              ? "bg-green-50 border-green-500 text-green-700" 
              : "border-orange-400 text-orange-700 hover:bg-orange-50 active:scale-95"
            }`}
          title="คลิกเพื่อคัดลอกโค้ด"
        >
          {copied ? (
            <span className="flex items-center justify-center gap-2">
              คัดลอกแล้ว ✓
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              {coupon.code} <span className="text-lg">📋</span> คัดลอกโค้ด
            </span>
          )}
        </button>

        {/* ปุ่มไป Shopee */}
        <button
          onClick={handleGoToShopee}
          className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 
                     text-white font-semibold py-3.5 rounded-lg transition-all duration-200 
                     flex items-center justify-center gap-2 shadow-sm"
          title="ไปที่ร้าน AMSENSEL บน Shopee"
        >
          ไปช้อปเลย →
        </button>

        <p className="text-xs text-gray-500 text-center pt-1">
          ⏰ หมดอายุ: {coupon.expire}
        </p>
      </div>
    </div>
  );
}