var services = new Services();
var valid = new Validation();

function getEle(id) {
    return document.getElementById(id);
}

function getList() {
    getEle("loader").style.display = "block";
    services
        .getListTeachers()
        .then(function (result) {
            // console.log(result.data);
            // var arrTeacher = result.data.map(function (teacher) {
            //     if (teacher.loaiND == "GV") {
            //         return teacher;
            //     }
            // })
            // var arrTeacherGV = arrTeacher.filter(function (teacherGV) {
            //     return teacherGV !== undefined;
            // })
            renderListTeacher(result.data);
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
    data.forEach(function (teacher) {
        contentHTML += `
            <tr>
                <td>${teacher.id}</td>
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
            console.log(result.data);
            getList();
        })
        .catch(function (error) {
            console.log(error);
        })
};

// Them 
getEle("btnThemNguoiDung").onclick = function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm mới GV HV";
    var btnThem = '<button class="btn btn-info" onclick="addTeacher()">Thêm</button>';
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnThem;
}

function addTeacher() {
    // var taiKhoan = getEle("TaiKhoan").value;
    // var hoTen = getEle("HoTen").value;
    // var matKhau = getEle("MatKhau").value;
    // var email = getEle("Email").value;
    // var hinhAnh = getEle("HinhAnh").value;
    // var loaiNguoiDung = getEle("loaiNguoiDung").value;
    // var loaiNgonNgu = getEle("loaiNgonNgu").value;
    // var moTa = getEle("MoTa").value;
    // var teacher = new Teacher("", taiKhoan, hoTen, matKhau, email, hinhAnh, loaiNguoiDung, loaiNgonNgu, moTa);

    // Validation
    var teacher = validTeacher(true);
    console.log(teacher);

    // services
    //     .addTeacherApi(teacher)
    //     .then(function (result) {
    //         getList();
    //         document.getElementsByClassName("close")[0].click();
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
}

// Sua
function getTeacher(id) {
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
        })
}

function editTeacher(id) {
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var hinhAnh = getEle("HinhAnh").value;
    var loaiNguoiDung = getEle("loaiNguoiDung").value;
    var loaiNgonNgu = getEle("loaiNgonNgu").value;
    var moTa = getEle("MoTa").value;
    var teacher = new Teacher(id, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiNguoiDung, loaiNgonNgu, moTa);
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

function getArrTeacher() {
    services
        .getListTeachers()
        .then(function (result) {
            var taiKhoan = getEle("TaiKhoan").value;
            var hoTen = getEle("HoTen").value;
            var matKhau = getEle("MatKhau").value;
            var email = getEle("Email").value;
            var hinhAnh = getEle("HinhAnh").value;
            var loaiNguoiDung = getEle("loaiNguoiDung").value;
            var loaiNgonNgu = getEle("loaiNgonNgu").value;
            var moTa = getEle("MoTa").value;
            var teacher = new Teacher("", taiKhoan, hoTen, matKhau, email, hinhAnh, loaiNguoiDung, loaiNgonNgu, moTa);
            // Validation
            var isValid = true;
            if (isAdd) {
                isValid &= valid.kiemTraRong(taiKhoan, "tkError", "(*) Vui lòng nhập tài khoản") &&
                    valid.kiemTraTkTonTai(taiKhoan, "tkError", "(*) Tài khoản đã tồn tại", result.data)
            }
            if (!isValid) { return };
            return teacher
        })
        .catch(function (error) {
            console.log(error);
        })
};

// getArrTeacher();

// function validTeacher(isAdd) {
//     var taiKhoan = getEle("TaiKhoan").value;
//     var hoTen = getEle("HoTen").value;
//     var matKhau = getEle("MatKhau").value;
//     var email = getEle("Email").value;
//     var hinhAnh = getEle("HinhAnh").value;
//     var loaiNguoiDung = getEle("loaiNguoiDung").value;
//     var loaiNgonNgu = getEle("loaiNgonNgu").value;
//     var moTa = getEle("MoTa").value;
//     var teacher = new Teacher("", taiKhoan, hoTen, matKhau, email, hinhAnh, loaiNguoiDung, loaiNgonNgu, moTa);
//     // Validation
//     var isValid = true;
//     if (isAdd) {
//         isValid &= valid.kiemTraRong(taiKhoan, "tkError", "(*) Vui lòng nhập tài khoản") &&
//             valid.kiemTraTkTonTai(taiKhoan, "tkError", "(*) Tài khoản đã tồn tại", arrTeacher)
//     }
//     if (!isValid) { return };
//     return teacher
// }