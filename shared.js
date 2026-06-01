// ==========================================
// ملف الأكواد المشتركة (شامل لكل الميزات القديمة والجديدة)
// ==========================================

const API_URL = "https://gth-server.onrender.com";


const UI_COMPONENTS = {
    header: `
        <div class="header-container">
          <a href="GTH.html" class="header-logo">
            <img src="logo.jpg" style="height: 50px; width: auto; border-radius: 12px;">
        </a>
            <div class="header-links">
                <a href="GTH.html">الرئيسية</a>
                <a href="GTH1.html">الجدول</a>
                <a href="GTH2.html">عن المنصة</a>
            </div>
            <div id="authButtons">
                <button class="btn btn-outline" onclick="openLogin()">تسجيل الدخول</button>
                <button class="btn btn-primary" onclick="openRegister()">إنشاء حساب</button>
            </div>
            <div id="userInfo" style="display: none;"></div>
        </div>
    `,
    footer: `
        <footer>
            <p>جميع الحقوق محفوظة - منصة الجدول المدرسي الذكي &copy; 2026</p>
        </footer>
    `,
    modals: `
        <div class="modal-overlay" id="overlay" onclick="closeModals()"></div>

        <div class="auth-modal" id="registerModal">
            <h3>إنشاء حساب جديد</h3>
            <select class="form-control" id="regRole" onchange="toggleRoleFields()">
                <option value="student">طالب</option>
                <option value="teacher">معلم</option>
                <option value="admin">إدارة النظام</option>
            </select>
            <input type="email" class="form-control" id="regEmail" placeholder="البريد الإلكتروني">
            <input type="text" class="form-control" id="regFullName" placeholder="الاسم الرباعي">
            <div id="schoolDiv"><select class="form-control" id="regSchool" onchange="updateSections()"><option value="">اختر المدرسة...</option></select></div>
            <div id="sectionDiv"><select class="form-control" id="regSection"><option value="">اختر الشعبة...</option></select></div>
            <input type="text" class="form-control" id="regSecretCode" placeholder="الكود السري" style="display:none;">
            <input type="password" class="form-control" id="regPword" placeholder="كلمة المرور">
            <button class="btn btn-primary" id="regBtn" style="width: 100%; margin-bottom: 10px;" onclick="submitRegister()">تأكيد التسجيل</button>
            <button class="btn btn-outline" style="width: 100%; color: var(--text-dark); border-color: #BDC3C7;" onclick="closeModals()">إلغاء</button>
        </div>

        <div class="auth-modal" id="loginModal">
            <h3>تسجيل الدخول</h3>
            <input type="email" class="form-control" id="loginEmail" placeholder="البريد الإلكتروني">
            <input type="password" class="form-control" id="loginPword" placeholder="كلمة المرور">
            
            <div style="text-align: right; margin-bottom: 15px;">
                <a href="#" onclick="openForgotPassword()" style="color: var(--secondary-blue); font-size: 13px; text-decoration: none; font-weight:bold;">هل نسيت كلمة المرور؟</a>
            </div>

            <button class="btn btn-primary" id="loginBtn" style="width: 100%; margin-bottom: 10px;" onclick="submitLogin()">دخول</button>
            <button class="btn btn-outline" style="width: 100%; color: var(--text-dark); border-color: #BDC3C7;" onclick="closeModals()">إلغاء</button>
        </div>

        <div class="auth-modal" id="forgotPassModal">
            <h3>استعادة كلمة المرور</h3>
            <p style="font-size:13px; color:var(--text-muted); text-align:center;">أدخل بريدك الإلكتروني المسجل لنرسل لك رمز التحقق.</p>
            <input type="email" class="form-control" id="forgotEmail" placeholder="البريد الإلكتروني">
            <button class="btn btn-primary" id="forgotBtn" style="width: 100%; margin-bottom: 10px;" onclick="submitForgotPassword()">إرسال الرمز</button>
            <button class="btn btn-outline" style="width: 100%; color: var(--text-dark); border-color: #BDC3C7;" onclick="closeModals()">إلغاء</button>
        </div>

        <div class="auth-modal" id="resetPassModal">
            <h3>تعيين كلمة مرور جديدة</h3>
            <input type="password" class="form-control" id="newPass1" placeholder="كلمة المرور الجديدة">
            <input type="password" class="form-control" id="newPass2" placeholder="تأكيد كلمة المرور الجديدة">
            <button class="btn btn-success" id="resetBtn" style="width: 100%; margin-bottom: 10px;" onclick="submitNewPassword()">حفظ وتسجيل الدخول</button>
        </div>

        <div class="auth-modal" id="otpModal">
            <h3>التحقق من الهوية</h3>
            <p style="font-size:14px; text-align:center; color: var(--text-muted);">تم إرسال الرمز المكون من 6 أرقام إلى بريدك.</p>
            <input type="text" class="form-control" id="otpInput" placeholder="أدخل الرمز" style="text-align: center; font-size: 18px; letter-spacing: 5px;">
            
            <div style="text-align: center; margin-bottom: 15px; font-size: 13px; font-weight: bold;">
                ينتهي الرمز بعد: <span id="timerDisplay" style="color: var(--danger);">05:00</span>
            </div>
            
            <button class="btn btn-primary" id="verifyBtn" style="width: 100%; margin-bottom: 10px;" onclick="verifyOTP()">تأكيد الرمز</button>
            <button class="btn btn-outline" id="resendBtn" style="width: 100%; color: var(--text-dark); border-color: #BDC3C7; display: none;" onclick="resendOTP()">إعادة إرسال الرمز</button>
        </div>

        <div class="auth-modal" id="adminModal" style="max-width: 800px;">
            <h3>لوحة تحكم الإدارة</h3>
            
            <div style="background: var(--bg-light); padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <h4 style="margin-top:0; color:var(--primary-blue);">إعدادات المدرسة</h4>
                <div style="display:flex; gap:10px; margin-bottom:15px;">
                    <input type="text" class="form-control" id="newSchoolName" placeholder="اسم المدرسة الجديد" style="margin-bottom:0;">
                    <button class="btn btn-primary" id="createSchoolBtn" style="white-space:nowrap;" onclick="manageSchool('create')">اعتماد المدرسة</button>
                </div>
                <hr style="border:0; border-top:1px solid #ddd; margin:15px 0;">
                <div style="display:flex; gap:10px;">
                    <select class="form-control" id="adminSchoolSelect" style="margin-bottom:0; flex:1;"></select>
                    <input type="text" class="form-control" id="manualSectionName" placeholder="رقم الشعبة (مثال: 101)" style="margin-bottom:0; flex:1;">
                    <button class="btn btn-success" id="addSectionBtn" style="white-space:nowrap;" onclick="manageSchool('addSection')">إضافة الشعبة</button>
                </div>
            </div>

            <div id="usersList" style="max-height: 400px; overflow-y: auto; padding-right:10px;"></div>
            
            <button class="btn btn-outline" style="width: 100%; margin-top: 15px; color:var(--text-dark); border-color:#BDC3C7;" onclick="closeModals()">إغلاق اللوحة</button>
        </div>
    `
};

let currentEmail = "";
let otpContext = ""; // الحالات: 'login', 'register', 'reset'
let timerInterval;

// ==========================================
// التهيئة والواجهة
// ==========================================
function injectUI() {
    if(document.getElementById('header-placeholder')) document.getElementById('header-placeholder').innerHTML = UI_COMPONENTS.header;
    if(document.getElementById('footer-placeholder')) document.getElementById('footer-placeholder').innerHTML = UI_COMPONENTS.footer;
    if(document.getElementById('modals-placeholder')) document.getElementById('modals-placeholder').innerHTML = UI_COMPONENTS.modals;
    checkAuth();
}

function checkAuth() {
    const userStr = localStorage.getItem('user_info');
    const authButtons = document.getElementById('authButtons');
    const userInfo = document.getElementById('userInfo');
    if (!authButtons || !userInfo) return;

    if (userStr) {
        const user = JSON.parse(userStr);
        authButtons.style.display = 'none';
        userInfo.style.display = 'block';
        
        let adminBtn = user.role === 'admin' ? `<button class="btn btn-warning" style="margin-left:10px; font-size:12px;" onclick="openAdminModal()">لوحة الإدارة</button>` : '';
        
        userInfo.innerHTML = `
            <span style="color:var(--white); font-size:14px; margin-left:15px;">مرحباً، ${user.fullName}</span>
            ${adminBtn}
            <button class="btn btn-notification" style="margin-left:10px; font-size:12px;" onclick="if(typeof openNotifications === 'function') openNotifications(); else alert('التنبيهات متاحة في صفحة الجدول.');">التنبيهات</button>
            <button class="btn btn-danger" style="font-size:12px;" onclick="logout()">خروج</button>
        `;
    } else {
        authButtons.style.display = 'block';
        userInfo.style.display = 'none';
    }
}

function logout() { localStorage.removeItem('user_info'); window.location.href = 'GTH.html'; }
function closeModals() { 
    document.querySelectorAll('.auth-modal').forEach(m => m.style.display = 'none'); 
    document.getElementById('overlay').style.display = 'none'; 
    clearInterval(timerInterval); // إيقاف العداد عند الإغلاق
}

function openRegister() { closeModals(); document.getElementById('overlay').style.display = 'block'; document.getElementById('registerModal').style.display = 'block'; loadSchools(); }
function openLogin() { closeModals(); document.getElementById('overlay').style.display = 'block'; document.getElementById('loginModal').style.display = 'block'; }
function openForgotPassword() { closeModals(); document.getElementById('overlay').style.display = 'block'; document.getElementById('forgotPassModal').style.display = 'block'; }
function openAdminModal() { closeModals(); document.getElementById('overlay').style.display = 'block'; document.getElementById('adminModal').style.display = 'block'; loadSchools(); loadAdminData(); }

// ==========================================
// إدارة العداد الزمني (UX) وتأثير التحميل
// ==========================================
function startOTPTimer() {
    clearInterval(timerInterval);
    let time = 300; // 5 دقائق
    const display = document.getElementById('timerDisplay');
    const resendBtn = document.getElementById('resendBtn');
    
    display.style.color = 'var(--danger)';
    resendBtn.style.display = 'none';

    timerInterval = setInterval(() => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        display.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (time <= 0) {
            clearInterval(timerInterval);
            display.innerText = "انتهى الوقت!";
            resendBtn.style.display = 'block'; // إظهار الزر بعد انتهاء الوقت
        }
        time--;
    }, 1000);
}

function setButtonLoading(btnId, isLoading, originalText) {
    const btn = document.getElementById(btnId);
    if(!btn) return;
    if (isLoading) {
        btn.disabled = true;
        btn.innerHTML = " يرجى الانتظار...";
        btn.style.opacity = "0.7";
    } else {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.opacity = "1";
    }
}

// ==========================================
// مسارات المصادقة (التسجيل، الدخول، استعادة المرور)
// ==========================================
async function submitRegister() {
    const data = {
        role: document.getElementById('regRole').value,
        email: document.getElementById('regEmail').value.toLowerCase().trim(),
        fullName: document.getElementById('regFullName').value,
        schoolId: document.getElementById('regSchool').value,
        section: document.getElementById('regSection').value,
        secretCode: document.getElementById('regSecretCode').value,
        pword: document.getElementById('regPword').value
    };

    if(!data.email || !data.pword || !data.fullName) return alert("الرجاء إكمال البيانات الأساسية.");

    setButtonLoading('regBtn', true, 'تأكيد التسجيل');
    try {
        const res = await fetch(`${API_URL}/reg`, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(data) 
        });
        
        if(res.status === 200) {
            currentEmail = data.email;
            otpContext = 'register';
            closeModals();
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('otpModal').style.display = 'block';
            startOTPTimer();
        } else {
            const txt = await res.text();
            alert("خطأ: " + txt);
        }
    } catch(e) { 
        alert("فشل الاتصال بالخادم."); 
    }
    finally { setButtonLoading('regBtn', false, 'تأكيد التسجيل'); }
}

async function submitLogin() {
    const email = document.getElementById('loginEmail').value.toLowerCase().trim();
    const pword = document.getElementById('loginPword').value;
    
    if(!email || !pword) return alert("الرجاء إدخال الإيميل وكلمة المرور.");

    setButtonLoading('loginBtn', true, 'دخول');
    try {
        const res = await fetch(`${API_URL}/login`, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ email, pword }) 
        });
        
        if(res.status === 200) {
            currentEmail = email;
            otpContext = 'login';
            closeModals();
            document.getElementById('overlay').style.display = 'block';
            document.getElementById('otpModal').style.display = 'block';
            startOTPTimer();
        } else {
            alert("بيانات الدخول غير صحيحة.");
        }
    } catch(e) { 
        console.error("خطأ الاتصال:", e);
        alert("فشل الاتصال بالخادم."); 
    }
    finally { setButtonLoading('loginBtn', false, 'دخول'); }
}
async function verifyOTP() {
    const otp = document.getElementById('otpInput').value.trim();
    if(!otp) return alert("الرجاء إدخال الرمز.");

    setButtonLoading('verifyBtn', true, 'تأكيد الرمز');
    try {
        const res = await fetch(`${API_URL}/verify-otp`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email: currentEmail, otp }) });
        
        if(res.status === 200) {
            clearInterval(timerInterval); 
            
            if (otpContext === 'reset') {
                // إذا كان جاي من مسار استعادة كلمة المرور
                closeModals();
                document.getElementById('overlay').style.display = 'block';
                document.getElementById('resetPassModal').style.display = 'block';
            } else {
                // تسجيل دخول عادي
                const userData = await res.json();
                localStorage.setItem('user_info', JSON.stringify(userData));
                window.location.reload();
            }
        } else alert("الرمز غير صحيح أو منتهي الصلاحية.");
    } catch(e) { alert("فشل الاتصال بالخادم."); }
    finally { setButtonLoading('verifyBtn', false, 'تأكيد الرمز'); }
}

async function resendOTP() {
    setButtonLoading('resendBtn', true, 'إعادة إرسال الرمز');
    try {
        const res = await fetch(`${API_URL}/resend-otp`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email: currentEmail }) });
        if(res.status === 200) {
            alert("تم إرسال رمز جديد إلى بريدك.");
            startOTPTimer(); // إعادة تدوير العداد
        } else alert("حدث خطأ أثناء إعادة الإرسال.");
    } catch(e) { alert("فشل الاتصال بالخادم."); }
    finally { setButtonLoading('resendBtn', false, 'إعادة إرسال الرمز'); }
}

async function submitNewPassword() {
    const pass1 = document.getElementById('newPass1').value;
    const pass2 = document.getElementById('newPass2').value;

    if(!pass1 || !pass2) return alert("الرجاء تعبئة كلمتي المرور.");
    if(pass1 !== pass2) return alert("كلمتا المرور غير متطابقتين!");
    if(pass1.length < 6) return alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");

    setButtonLoading('resetBtn', true, 'حفظ وتسجيل الدخول');
    try {
        const res = await fetch(`${API_URL}/reset-password`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ email: currentEmail, newPassword: pass1 }) });
        if(res.status === 200) {
            alert("تم تغيير كلمة المرور بنجاح! الرجاء تسجيل الدخول بكلمتك الجديدة.");
            closeModals();
            openLogin(); 
        } else alert("حدث خطأ أثناء حفظ كلمة المرور.");
    } catch(e) { alert("فشل الاتصال."); }
    finally { setButtonLoading('resetBtn', false, 'حفظ وتسجيل الدخول'); }
}

// ==========================================
// القوائم وتأسيس المدارس (للطلاب والإداريين)
// ==========================================
async function loadSchools() {
    try {
        const res = await fetch(`${API_URL}/get-schools`);
        const schools = await res.json();
        
        const regSchool = document.getElementById('regSchool');
        const adminSchoolSelect = document.getElementById('adminSchoolSelect');
        
        if(regSchool) {
            regSchool.innerHTML = '<option value="">اختر المدرسة...</option>';
            schools.forEach(s => regSchool.innerHTML += `<option value="${s.schoolId}">${s.schoolName}</option>`);
        }
        if(adminSchoolSelect) {
            adminSchoolSelect.innerHTML = '';
            schools.forEach(s => adminSchoolSelect.innerHTML += `<option value="${s.schoolId}">${s.schoolName}</option>`);
        }
        window.allSchoolsData = schools; 
    } catch (e) { console.error("Schools not loaded"); }
}

function updateSections() {
    const schoolId = document.getElementById('regSchool').value;
    const secSelect = document.getElementById('regSection');
    secSelect.innerHTML = '<option value="">اختر الشعبة...</option>';
    
    if(!window.allSchoolsData) return;
    const selectedSchool = window.allSchoolsData.find(s => s.schoolId === schoolId);
    
    if (selectedSchool && selectedSchool.sections) {
        selectedSchool.sections.forEach(sec => secSelect.innerHTML += `<option value="${sec}">${sec}</option>`);
    }
}

function toggleRoleFields() {
    const role = document.getElementById('regRole').value;
    document.getElementById('schoolDiv').style.display = (role === 'admin') ? 'none' : 'block';
    document.getElementById('sectionDiv').style.display = (role === 'student') ? 'block' : 'none';
    
    const codeInput = document.getElementById('regSecretCode');
    if (role === 'teacher') { codeInput.style.display = 'block'; codeInput.placeholder = "الكود السري للمعلم"; }
    else if (role === 'admin') { codeInput.style.display = 'block'; codeInput.placeholder = "الكود السري للإدارة"; }
    else { codeInput.style.display = 'none'; codeInput.value = ""; }
}

// ==========================================
// دوال لوحة الإدارة (التي تم استرجاعها وتأمينها)
// ==========================================
async function manageSchool(action) {
    const admin = JSON.parse(localStorage.getItem('user_info'));
    if (!admin) return;

    let data = { action, adminEmail: admin.email };
    let btnId = action === 'create' ? 'createSchoolBtn' : 'addSectionBtn';
    let originalText = action === 'create' ? 'اعتماد المدرسة' : 'إضافة الشعبة';

    if (action === 'create') {
        data.schoolName = document.getElementById('newSchoolName').value;
        if (!data.schoolName) return alert("الرجاء كتابة اسم المدرسة.");
    } else if (action === 'addSection') {
        data.schoolId = document.getElementById('adminSchoolSelect').value;
        data.newSection = document.getElementById('manualSectionName').value;
        if (!data.schoolId || !data.newSection) return alert("الرجاء اختيار المدرسة وكتابة رقم الشعبة.");
    }

    setButtonLoading(btnId, true, originalText);
    try {
        const res = await fetch(`${API_URL}/manage-school`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
        });
        const text = await res.text();

        if (res.status === 200 || res.status === 201) {
            if (action === 'addSection') {
                alert(`تم إضافة الشعبة "${data.newSection}" بنجاح!`);
                document.getElementById('manualSectionName').value = ""; 
            } else {
                alert("تم تأسيس المدرسة بنجاح. سيتم تحديث حسابك كمسؤول عن هذه المدرسة.");
                // تحديث بيانات الجلسة للإداري ليعرف أن لديه مدرسة الآن
                admin.schoolId = text === 'SchoolCreated' ? admin.schoolId : admin.schoolId; 
                localStorage.setItem('user_info', JSON.stringify(admin));
                window.location.reload();
            }
            loadSchools();
            loadAdminData(); 
        } else {
            alert("حدث خطأ - تأكد من البيانات: " + text);
        }
    } catch (e) { alert("فشل الاتصال بالسيرفر."); }
    finally { setButtonLoading(btnId, false, originalText); }
}

async function loadAdminData() {
    const adminStr = localStorage.getItem('user_info');
    if(!adminStr) return;
    const admin = JSON.parse(adminStr);
    
    // الإداري الذي لم ينشئ مدرسة بعد لا يمكنه رؤية المستخدمين
    if(admin.schoolId === 'pending_school' || !admin.schoolId) {
        document.getElementById('usersList').innerHTML = '<p style="text-align:center; color:var(--danger); padding:20px;">قم بتأسيس مدرستك أولاً من الأعلى لتتمكن من إضافة الطلاب والمعلمين.</p>';
        return;
    }

    try {
        const [resUsers, resSchools] = await Promise.all([
            fetch(`${API_URL}/admin/users`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ schoolId: admin.schoolId })
            }),
            fetch(`${API_URL}/get-schools`)
        ]);
        
        const users = await resUsers.json();
        const schools = await resSchools.json();
        const mySchool = schools.find(s => s.schoolId === admin.schoolId);
        const allSections = mySchool ? mySchool.sections : [];

        const list = document.getElementById('usersList');
        list.style.textAlign = "center"; 
        list.innerHTML = '<h4 style="color:var(--primary-blue); margin-top:20px;">إدارة صلاحيات المعلمين (تحديد الشعب)</h4><div id="teachersList"></div><hr style="border:0; border-top:1px solid #ddd; margin:20px 0;"><h4 style="color:var(--primary-blue);">الطلاب المدرجين تحت الشعب</h4><div id="studentsList"></div>';

        // 1. قسم المعلمين (مربعات الاختيار)
        const teachersList = document.getElementById('teachersList');
        const teachers = users.filter(u => u.role === 'teacher');
        
        if(teachers.length === 0) teachersList.innerHTML = '<p style="font-size:13px; color:#999;">لا يوجد معلمين مسجلين في مدرستك بعد.</p>';

        teachers.forEach(u => {
            let checkboxesHtml = allSections.map(sec => `
                <label style="margin: 4px; cursor: pointer; display: inline-flex; align-items: center; background: #fff; padding: 4px 10px; border-radius: 4px; border: 1px solid #ccc; font-size:13px;">
                    <input type="checkbox" class="sec-chk" data-email="${u.email}" value="${sec}" ${u.teacherSections.includes(sec) ? 'checked' : ''} style="margin-left: 5px;"> ${sec}
                </label>
            `).join('');

            if(allSections.length === 0) checkboxesHtml = '<span style="color:var(--danger); font-size:12px;">يجب إضافة شعب للمدرسة أولاً من الأعلى</span>';

            teachersList.innerHTML += `
                <div style="border: 1px solid #BDC3C7; padding: 15px; margin: 10px auto; border-radius: 8px; width: 100%; background: #FDFEFE; box-sizing:border-box;">
                    <div style="margin-bottom: 10px; font-weight: bold; font-size: 15px;">
                         ${u.fullName}
                    </div>
                    
                    <div style="background: #F4F6F7; padding: 10px; border-radius: 5px; margin-bottom: 15px; text-align: right;">
                        <strong style="display:block; margin-bottom:8px; font-size: 12px; color:var(--text-dark);">الصلاحيات: (حدد الشعب التي سيدرسها هذا المعلم)</strong>
                        <div style="display: flex; flex-wrap: wrap; justify-content: flex-start;">
                            ${checkboxesHtml}
                        </div>
                    </div>
                    
                    <button class="btn btn-success" style="padding: 6px 15px; font-size:12px;" onclick="updateUser('${u.email}', 'teacher')">حفظ الصلاحيات</button>
                    <button class="btn btn-danger" style="padding: 6px 15px; font-size:12px;" onclick="deleteUser('${u.email}')">إزالة المعلم</button>
                </div>
            `;
        });

        // 2. قسم الطلاب
        const studentsList = document.getElementById('studentsList');
        if(allSections.length === 0) studentsList.innerHTML = '<p style="font-size:13px; color:#999;">أضف شعباً لتتمكن من عرض الطلاب بداخلها.</p>';

        allSections.forEach(sec => {
            const studentsInSec = users.filter(u => u.role === 'student' && u.section === sec);
            let studentsHtml = studentsInSec.map(u => `
                <div style="background:#fff; padding:6px 10px; margin:5px auto; width:100%; border-radius:4px; border: 1px solid #eee; display:flex; justify-content:space-between; align-items:center; box-sizing:border-box;">
                    <span style="font-size: 13px;"> ${u.fullName}</span> 
                    <button class="btn btn-danger" style="padding:3px 8px; font-size:10px;" onclick="deleteUser('${u.email}')">حذف</button>
                </div>
            `).join('');

            studentsList.innerHTML += `
                <div style="margin-bottom:15px; background: #F4F6F7; padding:10px; border-radius:6px;">
                    <strong style="color:var(--text-dark); display:block; margin-bottom:10px; text-align:right; font-size:14px;"> شعبة: ${sec}</strong>
                    ${studentsHtml || '<p style="color:#999; font-size:12px; margin:0; text-align:right;">لا يوجد طلاب حالياً في هذه الشعبة.</p>'}
                </div>
            `;
        });
    } catch(e) { console.error("Error loading admin data:", e); }
}

async function updateUser(email, role) {
    if (role !== 'teacher') return;
    
    // استخراج الشعب المحددة للمعلم
    const checkboxes = document.querySelectorAll(`input.sec-chk[data-email="${email}"]:checked`);
    const newSections = Array.from(checkboxes).map(cb => cb.value);
    
    try {
        const res = await fetch(`${API_URL}/admin/update-user`, {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ userEmail: email, teacherSections: newSections })
        });
        if (res.status === 200) {
            alert("تم حفظ الشعب المسندة للمعلم بنجاح!");
            loadAdminData();
        } else alert("حدث خطأ أثناء التحديث.");
    } catch(e) { alert("فشل الاتصال."); }
}

async function deleteUser(email) {
    if(!confirm("هل أنت متأكد من حذف هذا المستخدم نهائياً من مدرستك؟")) return;
    try {
        const res = await fetch(`${API_URL}/admin/delete-user`, {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ userEmail: email })
        });
        if(res.status === 200) loadAdminData();
    } catch(e) { alert("فشل الاتصال."); }
}

document.addEventListener("DOMContentLoaded", injectUI);
