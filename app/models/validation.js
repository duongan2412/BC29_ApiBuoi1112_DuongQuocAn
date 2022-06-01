function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value.trim() === "") {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }
        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
    };

    this.kiemTraTkTonTai = function (value, errorId, mess, arr) {
        var isStatus = true;

        arr.forEach(function (teacher) {
            if (teacher.taiKhoan === value) {
                //tkNV ton tai
                isStatus = false;
            }
        });

        if (isStatus) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

}