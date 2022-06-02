var services = new Services();
var valid = new Validation();
var lstTeacher = [];
function getEle(id) {
    return document.getElementById(id);
}

function getData(data) {
    data.forEach(function (ele) {
        lstTeacher.push(ele);
    })
}

function getList() {
    getEle("loader").style.display = "block";
    services
        .getListTeachers()
        .then(function (result) {
            renderListTeacher(result.data);
            getData(result.data);
            getEle("loader").style.display = "none"
        })
        .catch(function (error) {
            console.log(error);
            getEle("loader").style.display = "none"
        })
};

getList();

function renderListTeacher(data) {
    var contentHTML = "";
    data.forEach(function (teacher, index) {
        contentHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${teacher.taiKhoan}</td>
                <td>${teacher.matKhau}</td>
                <td>${teacher.hoTen}</td>
                <td>${teacher.email}</td>
                <td>${teacher.ngonNgu}</td>
                <td>${teacher.loaiND}</td>
                <td>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#myModal" onclick = "getTeacher(${teacher.id})">Sửa</button>
                    <button class="btn btn-danger" onclick= "delTeacher(${teacher.id})">Xoá</button>
                </td>
            </tr>
            `;
    });
    // console.log(contentHTML);
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
};

// Xoa 
function delTeacher(id) {
    services
        .deleteTeacherApi(id)
        .then(function (result) {
            // console.log(result.data);
            getList();
        })
        .catch(function (error) {
            console.log(error);
        })
};

// Them
getEle("btnThemNguoiDung").onclick = function () {
    resetValue();
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm mới GV HV";
    var btnThem = '<button class="btn btn-info" onclick="addTeacher()">Thêm</button>';
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnThem;
}

function addTeacher() {
    var teacher = validTeacher(true, false, id);
    if (teacher == null) { return };
    services
        .addTeacherApi(teacher)
        .then(function (result) {
            getList();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        });
    resetValue();
}

// Sua
function getTeacher(id) {
    getEle("TaiKhoan").disabled = true;
    services
        .getTeacherId(id)
        .then(function (result) {
            // console.log(result.data);
            var teacher = result.data;
            getEle("TaiKhoan").value = teacher.taiKhoan;
            getEle("HoTen").value = teacher.hoTen;
            getEle("MatKhau").value = teacher.matKhau;
            getEle("Email").value = teacher.email;
            getEle("HinhAnh").value = teacher.hinhAnh;
            getEle("loaiNguoiDung").value = teacher.loaiND;
            getEle("loaiNgonNgu").value = teacher.ngonNgu;
            getEle("MoTa").value = teacher.moTa;
            var btnUpdate = `<button class="btn btn-info" onclick="editTeacher(${teacher.id})">Sửa</button>`;
            document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;
        })
        .catch(function (error) {
            console.log(error);
        });

    resetValue();
}

function editTeacher(id) {
    // var taiKhoan = getEle("TaiKhoan").value;
    // var hoTen = getEle("HoTen").value;
    // var matKhau = getEle("MatKhau").value;
    // var email = getEle("Email").value;
    // var hinhAnh = getEle("HinhAnh").value;
    // var loaiNguoiDung = getEle("loaiNguoiDung").value;
    // var loaiNgonNgu = getEle("loaiNgonNgu").value;
    // var moTa = getEle("MoTa").value;
    // var teacher = new Teacher(id, taiKhoan, hoTen, matKhau, email, loaiNguoiDung, loaiNgonNgu, moTa, hinhAnh);
    var teacher = validTeacher(false, true, id);
    if (teacher == null) { return };
    services
        .editTeacherApi(teacher)
        .then(function (result) {
            getList();
            document.getElementsByClassName("close")[0].click();
        })
        .catch(function (error) {
            console.log(error);
        })
}

function resetValue() {
    getEle("TaiKhoan").value = "";
    getEle("HoTen").value = "";
    getEle("MatKhau").value = "";
    getEle("Email").value = "";
    getEle("HinhAnh").value = "";
    getEle("loaiNguoiDung").selectedIndex = 0;
    getEle("loaiNgonNgu").selectedIndex = 0;
    getEle("MoTa").value = "";
}

function validTeacher(isAdd, isEdit, id) {
    var id = isEdit ? id : "";
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    var teacher = new Teacher(id, taiKhoan, hoTen, matKhau, email, loaiNguoiDung, loaiNgonNgu, moTa, hinhAnh);
    // Validation
    var isValid = true;
    if (isAdd) {
        // tk
        isValid &= valid.kiemTraRong(taiKhoan, "tkError", "(*) Vui lòng nhập tài khoản") &&
            valid.kiemTraTkTonTai(taiKhoan, "tkError", "(*)Tài khoản đã tồn tại", lstTeacher);
    }
    // hoTen
    isValid &= valid.kiemTraRong(hoTen, "hotenError", "(*) Vui lòng nhập họ tên") &&
        valid.kiemTraChuoiKiTu(hoTen, "hotenError", "(*) Họ tên không bao gồm số và ký tự đặc biệt");

    // mat khau 
    isValid &= valid.kiemTraRong(matKhau, "mkError", "(*) Vui lòng nhập mật khẩu") &&
        valid.kiemTraDoDai(matKhau, "mkError", "(*) Mật khẩu phải từ 6 - 8 ký tự", 6, 8) &&
        valid.kiemTraMatKhau(matKhau, "mkError", "(*) Mật khẩu có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số");

    // email
    isValid &= valid.kiemTraRong(email, "emailError", "(*) Vui lòng nhập email") &&
        valid.kiemTraEmail(email, "emailError", "(*) Email không hợp lệ");

    // hinh anh
    isValid &= valid.kiemTraRong(hinhAnh, "hinhAnhError", "(*) Vui lòng nhập hình ảnh");

    // loaiND
    isValid &= valid.kiemTraSelect("loaiNguoiDung", "loaNDError", "(*) Vui lòng chọn người dùng");

    // loaiNN
    isValid &= valid.kiemTraSelect("loaiNgonNgu", "loaiNNError", "(*) Vui lòng chọn ngôn ngữ");

    // mota
    isValid &= valid.kiemTraRong(moTa, "motaError", "(*) Vui lòng nhập mô tả") &&
        valid.kiemTraDoDai(moTa, "motaError", "(*) Mô tả tối đa 60 ký tự", 1, 60);

    if (!isValid) { return null };
    return teacher
}

