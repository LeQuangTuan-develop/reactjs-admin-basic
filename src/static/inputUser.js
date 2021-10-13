import * as yup from 'yup';

export const inputUser = [
    {
        label: "Tên tài khoản",
        name:"username",
        type:"text",
        input: "basic"
    },
    {
        label: "Mật khẩu",
        name:"password",
        type:"password",
        input: "basic"
    },
    {
        label: "Email",
        name:"email",
        type:"text",
        input: "basic"
    },
    {
        label: "Tỉnh",
        name:"province",
        type:"text",
        input: "select"
    },
    {
        label: "Giới tính",
        name: "gender",
        input: "radio"
    },
    {
        label: "Sở thích",
        name: "hobbies",
        input: "checkbox"
    }
]


export const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tên tài khoản"),
  password: yup.string().required("Vui lòng nhập mật khẩu").min(5, "Mật khẩu tối thiểu 5 ký tự"),
  email: yup.string().required("Vui lòng nhập địa chỉ email").email("Nhập sai định dạng email"),
  province: yup.string().required("Vui lòng lựa chọn tỉnh thành phố"),
  gender: yup.string().required("Vui lòng chọn giới tính").nullable(),
  hobbies: yup.array().required("Vui lòng chọn sở thích").nullable()
});

