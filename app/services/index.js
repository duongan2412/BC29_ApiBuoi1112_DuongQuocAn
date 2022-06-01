function Services() {

    this.getListTeachers = function () {
        return axios({
            url: "https://628b995c7886bbbb37bbca67.mockapi.io/api/teacher",
            method: "GET"
        })
    }

    this.deleteTeacherApi = function (id) {
        return axios({
            url: `https://628b995c7886bbbb37bbca67.mockapi.io/api/teacher/${id}`,
            method: "DELETE"
        })
    }

    this.addTeacherApi = function (teacher) {
        return axios({
            url: "https://628b995c7886bbbb37bbca67.mockapi.io/api/teacher",
            method: "POST",
            data: teacher
        })
    }

    this.getTeacherId = function (id) {
        return axios({
            url: `https://628b995c7886bbbb37bbca67.mockapi.io/api/teacher/${id}`,
            method: "GET"
        })
    }


    this.editTeacherApi = function (teacher) {
        // console.log(product);
        return axios({
            url: `https://628b995c7886bbbb37bbca67.mockapi.io/api/teacher/${teacher.id}`,
            method: "PUT",
            data: teacher
        })
    }
}