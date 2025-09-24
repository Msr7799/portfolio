// ===============================================
// ملف تحكم بالحركة الدائرية للصور - Img Round Movement
// ===============================================

/**
 * دالة تهيئة الحركة الدائرية للصور
 * تقوم بإعداد جميع المتغيرات والإعدادات اللازمة لتشغيل الحركة
 */
function initCircularImageMovement() {
    // الحصول على جميع عناصر الصور المتحركة
    const slider1 = document.querySelector('.slider1');
    const slider2 = document.querySelector('.slider2');
    const slider3 = document.querySelector('.slider3');
    const slider = document.querySelector('.slider');
    
    // مجموعة جميع العناصر في مصفوفة واحدة للتسهيل
    const allSliders = [slider1, slider2, slider3, slider];
    
    // التحقق من وجود جميع العناصر
    if (allSliders.some(element => !element)) {
        console.error('بعض عناصر الصور المتحركة غير موجودة في الصفحة');
        return;
    }
    
    // إضافة خصائص التحكم بالحركة
    setMovementControls(allSliders);
    
    // إضافة تأثيرات التفاعل عند الماوس
    setupMouseInteractions(allSliders);
    
    // تشغيل نظام المراقبة
    monitorMovement(allSliders);
    
    console.log('✅ تم تهيئة نظام الحركة الدائرية بنجاح');
}

/**
 * دالة إعداد التحكم بالحركة
 * تضيف إمكانيات التحكم في سرعة واتجاه الحركة
 */
function setMovementControls(sliders) {
    // متغيرات التحكم بالحركة
    let animationSpeed = 8; // السرعة بالثواني
    let isPaused = false;   // حالة التوقف
    let direction = 1;      // الاتجاه (1 = عادي, -1 = عكسي)
    
    // دالة تغيير سرعة الحركة
    window.changeAnimationSpeed = function(newSpeed) {
        animationSpeed = newSpeed;
        sliders.forEach(slider => {
            slider.style.animationDuration = `${animationSpeed}s`;
        });
        console.log(`🔄 تم تغيير سرعة الحركة إلى ${animationSpeed} ثانية`);
    };
    
    // دالة إيقاف وتشغيل الحركة
    window.toggleAnimation = function() {
        isPaused = !isPaused;
        const playState = isPaused ? 'paused' : 'running';
        
        sliders.forEach(slider => {
            slider.style.animationPlayState = playState;
        });
        
        console.log(`${isPaused ? '⏸️ تم إيقاف' : '▶️ تم تشغيل'} الحركة`);
    };
    
    // دالة تغيير اتجاه الحركة
    window.reverseAnimation = function() {
        direction *= -1;
        sliders.forEach(slider => {
            slider.style.animationDirection = direction === 1 ? 'normal' : 'reverse';
        });
        console.log(`🔄 تم تغيير الاتجاه إلى ${direction === 1 ? 'العادي' : 'العكسي'}`);
    };
}

/**
 * دالة إعداد التفاعل مع الماوس
 * تضيف تأثيرات عند مرور الماوس فوق الصور
 */
function setupMouseInteractions(sliders) {
    sliders.forEach((slider, index) => {
        // عند دخول الماوس - توقف مؤقت وتكبير
        slider.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform += ' scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
            this.style.zIndex = '20';
            
            // إضافة تأثير ظل قوي
            this.querySelector('img').style.boxShadow = '0px 25px 40px rgba(0, 0, 0, 0.8)';
            
            console.log(`🖱️ تم التوقف على الصورة رقم ${index + 1}`);
        });
        
        // عند خروج الماوس - استكمال الحركة
        slider.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            this.style.zIndex = 'auto';
            
            // إعادة الظل للوضع العادي
            this.querySelector('img').style.boxShadow = '0px 15px 20px rgba(0, 0, 0, 0.5)';
            
            console.log(`👋 تم مغادرة الصورة رقم ${index + 1}`);
        });
        
        // عند النقر - تأثير نبضة
        slider.addEventListener('click', function() {
            createPulseEffect(this);
            console.log(`👆 تم النقر على الصورة رقم ${index + 1}`);
        });
    });
}

/**
 * دالة إنشاء تأثير النبضة عند النقر
 * تضيف تأثير بصري جميل عند النقر على الصورة
 */
function createPulseEffect(element) {
    // إنشاء دائرة النبضة
    const pulse = document.createElement('div');
    pulse.className = 'pulse-effect';
    pulse.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        pointer-events: none;
        animation: pulseAnimation 0.6s ease-out;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
    `;
    
    // إضافة كيفريم للنبضة إذا لم يكن موجود
    if (!document.querySelector('#pulseKeyframes')) {
        const style = document.createElement('style');
        style.id = 'pulseKeyframes';
        style.textContent = `
            @keyframes pulseAnimation {
                0% { width: 20px; height: 20px; opacity: 1; }
                100% { width: 200px; height: 200px; opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // إضافة النبضة للعنصر
    element.style.position = 'relative';
    element.appendChild(pulse);
    
    // إزالة النبضة بعد انتهاء التأثير
    setTimeout(() => {
        if (pulse.parentNode) {
            pulse.parentNode.removeChild(pulse);
        }
    }, 600);
}

/**
 * دالة مراقبة الحركة
 * تراقب حالة الحركة وتقدم معلومات مفيدة
 */
function monitorMovement(sliders) {
    let rotationCount = 0;
    
    // مراقب الدورة الكاملة (كل 8 ثواني)
    setInterval(() => {
        rotationCount++;
        console.log(`🔄 تمت دورة كاملة رقم ${rotationCount}`);
        
        // إرسال حدث مخصص للدورة الكاملة
        const rotationEvent = new CustomEvent('imageRotationComplete', {
            detail: { rotationNumber: rotationCount, timestamp: new Date() }
        });
        document.dispatchEvent(rotationEvent);
        
    }, 8000); // كل 8 ثواني (مدة دورة كاملة)
    
    // مراقب التقدم (كل ثانيتين - ربع دورة)
    setInterval(() => {
        const positions = ['يمين فوق', 'يمين تحت', 'يسار تحت', 'يسار فوق'];
        const currentQuarter = Math.floor((Date.now() / 2000) % 4);
        
        console.log(`📍 الوضع الحالي: ${positions[currentQuarter]}`);
    }, 2000);
}

/**
 * دالة إضافة تحكم بلوحة المفاتيح
 * تسمح بالتحكم بالحركة باستخدام لوحة المفاتيح
 */
function addKeyboardControls() {
    document.addEventListener('keydown', function(event) {
        switch(event.key.toLowerCase()) {
            case ' ': // مفتاح المسافة - توقف/تشغيل
                event.preventDefault();
                toggleAnimation();
                break;
                
            case 'arrowup': // سهم فوق - زيادة السرعة
                event.preventDefault();
                changeAnimationSpeed(Math.max(2, getCurrentSpeed() - 1));
                break;
                
            case 'arrowdown': // سهم تحت - تقليل السرعة
                event.preventDefault();
                changeAnimationSpeed(getCurrentSpeed() + 1);
                break;
                
            case 'r': // R - عكس الاتجاه
                event.preventDefault();
                reverseAnimation();
                break;
        }
    });
    
    console.log('⌨️ تم تفعيل التحكم بلوحة المفاتيح:');
    console.log('   - مسافة: توقف/تشغيل');
    console.log('   - سهم فوق: زيادة السرعة');
    console.log('   - سهم تحت: تقليل السرعة');
    console.log('   - R: عكس الاتجاه');
}

/**
 * دالة الحصول على السرعة الحالية
 */
function getCurrentSpeed() {
    const slider = document.querySelector('.slider1');
    const duration = window.getComputedStyle(slider).animationDuration;
    return parseFloat(duration) || 8;
}

/**
 * دالة إضافة شريط معلومات الحركة
 * تعرض معلومات الحركة في الزاوية العلوية
 */
function addMovementInfoBar() {
    const infoBar = document.createElement('div');
    infoBar.id = 'movementInfo';
    infoBar.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-family: Arial, sans-serif;
        font-size: 12px;
        z-index: 1000;
        min-width: 200px;
        direction: rtl;
    `;
    
    document.body.appendChild(infoBar);
    
    // تحديث المعلومات كل ثانية
    setInterval(() => {
        const currentSpeed = getCurrentSpeed();
        const isRunning = !document.querySelector('.slider1').style.animationPlayState.includes('paused');
        
        infoBar.innerHTML = `
            <div><strong>🎯 حالة الحركة الدائرية</strong></div>
            <div>السرعة: ${currentSpeed}s</div>
            <div>الحالة: ${isRunning ? '▶️ يعمل' : '⏸️ متوقف'}</div>
            <div>الدورات: ${Math.floor((Date.now() - startTime) / (currentSpeed * 1000))}</div>
        `;
    }, 1000);
}

// متغير تسجيل وقت البداية
let startTime = Date.now();

/**
 * دالة التهيئة الرئيسية
 * تستدعى عند تحميل الصفحة وتهيء جميع المكونات
 */
function initialize() {
    console.log('🚀 بدء تهيئة نظام الحركة الدائرية للصور...');
    
    // التأكد من تحميل DOM كاملاً
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeComponents);
    } else {
        initializeComponents();
    }
}

/**
 * دالة تهيئة جميع المكونات
 */
function initializeComponents() {
    try {
        // تهيئة الحركة الأساسية
        initCircularImageMovement();
        
        // إضافة التحكم بلوحة المفاتيح
        addKeyboardControls();
        
        // إضافة شريط المعلومات
        addMovementInfoBar();
        
        // تسجيل وقت البداية
        startTime = Date.now();
        
        console.log('✅ تم تهيئة جميع مكونات نظام الحركة الدائرية بنجاح!');
        
        // عرض رسالة ترحيب
        setTimeout(() => {
            console.log('🎉 النظام جاهز! استخدم لوحة المفاتيح للتحكم في الحركة');
        }, 1000);
        
    } catch (error) {
        console.error('❌ خطأ في تهيئة النظام:', error);
    }
}

// تشغيل النظام عند تحميل السكريبت
initialize();

// تصدير الدوال للاستخدام العام
window.ImageMovementController = {
    start: initCircularImageMovement,
    pause: toggleAnimation,
    speed: changeAnimationSpeed,
    reverse: reverseAnimation,
    info: () => console.log('نظام التحكم بالحركة الدائرية للصور - جاهز للاستخدام')
};
