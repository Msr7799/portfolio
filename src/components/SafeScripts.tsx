"use client";
import { useEffect } from "react";

export default function SafeScripts() {
  useEffect(() => {
    // التأكد من أن jQuery و Bootstrap متاحان قبل تشغيل أي كود
    if (typeof window !== 'undefined' && window.jQuery) {
      console.log("✅ jQuery متاح ويعمل بشكل صحيح");
      
      // إضافة وظائف آمنة حسب الحاجة
      const initSafeFeatures = () => {
        // إضافة أي وظائف مطلوبة هنا بطريقة آمنة
        
        // التحقق من وجود العناصر قبل الوصول إليها
        const slider = document.querySelector('.slider1');
        if (slider) {
          console.log("✅ العنصر slider1 موجود");
          // إضافة منطق الحركة إذا لزم الأمر
        }
        
        // التحقق من وجود niceScroll قبل استخدامه
        if (window.jQuery && typeof window.jQuery.fn.niceScroll === 'function') {
          try {
            window.jQuery('body').niceScroll();
          } catch (error) {
            console.log("⚠️ niceScroll غير متاح أو حدث خطأ:", error);
          }
        }
      };
      
      // تأخير التشغيل للتأكد من تحميل كل شيء
      setTimeout(initSafeFeatures, 1000);
    } else {
      console.log("⚠️ jQuery غير متاح بعد");
    }
  }, []);

  return null; // هذا component لا يعرض شيئاً، فقط ينفذ الكود
}
