'use client';

import { useEffect, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Coupon } from './types/coupon';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbxh6LBEsrINbn-VAeOVJcUMEpFvq9hKmmj0R8GoFxlVIK-eeBptAnYJX9MCuRDAyDw/exec';
const API_KEY = 'SECRET123';

// CouponCard แบบ UI ใกล้เคียงรูปที่ 2 (ปุ่มเดียว)
function CouponCard({ coupon }: { coupon: Coupon }) {
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    // เปิดลิงก์ก่อนเพื่อป้องกัน popup blocker
    window.open("https://shopee.co.th/amsel.official", "_blank", "noopener,noreferrer");

    // คัดลอกโค้ด
    navigator.clipboard
      .writeText(coupon.code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("คัดลอกไม่สำเร็จ:", err);
      });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-200/50 hover:shadow-xl transition-all duration-300">
      {/* ส่วนหัว - ไล่สีส้ม */}
      <div className="bg-gradient-to-br from-orange-600 to-red-600 p-6 text-white">
        <p className="text-sm font-medium opacity-90">
          50% OFF ลด 50%
        </p>
        <h2 className="text-xl font-bold mt-1">
          {coupon.title || "ส่วนลดพิเศษสำหรับสินค้าเลือก"}
        </h2>
        <p className="text-sm opacity-90 mt-1">
          {coupon.description || "สำหรับสินค้าอิเล็กทรอนิกส์"}
        </p>
      </div>

      {/* ส่วนโค้ด + ปุ่มหลัก */}
      <div className="p-5 pt-6">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600 font-medium">
            ใช้โค้ดนี้เพื่อรับส่วนลดทันที
          </p>
        </div>

        {/* กล่องโค้ดสไตล์รูปที่ 2 */}
        <div className="border-2 border-dashed border-orange-400 rounded-xl bg-orange-50/60 p-4 mb-5 text-center">
          <span className="font-mono text-3xl sm:text-4xl font-black tracking-wider text-orange-700">
            {coupon.code}
          </span>
        </div>

        {/* ปุ่มหลักเดียว - ใหญ่ เด่น */}
        <button
          onClick={handleAction}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 shadow-md
            ${copied 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white"
            } flex items-center justify-center gap-3`}
        >
          {copied ? (
            <>
              <Check className="w-6 h-6" />
              คัดลอกแล้ว ✓
            </>
          ) : (
            <>
              <span className="text-xl">📋</span>
              {coupon.code} - ไปช้อปเลย!
            </>
          )}
        </button>

        {/* วันหมดอายุ */}
        <p className="text-sm text-gray-600 text-center mt-4 font-medium">
          หมดอายุ: {new Date(coupon.expire).toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
      </div>

      {/* แถบสีล่างเหมือนรูป */}
      <div className="h-3 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600"></div>
    </div>
  );
}

export default function Home() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    fetch(`${GAS_URL}?key=${API_KEY}`)
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setCoupons(result.data);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-orange-800 drop-shadow-sm">
            🎁 คูปองเดือนนี้
          </h1>

          {coupons.length === 0 ? (
            <div className="text-center py-16 text-orange-700/80 text-lg">
              กำลังโหลดคูปอง... หรือยังไม่มีคูปองในขณะนี้
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {coupons.map((c) => (
                <CouponCard key={c.code} coupon={c} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}