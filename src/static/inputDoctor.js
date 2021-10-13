import * as yup from 'yup';

export const inputDoctor = [
    {
        label: "Tên bác sĩ",
        name:"name",
        type:"text",
        input: "basic"
    },
    {
        label: "Kinh nghiệm",
        name:"exp",
        type:"text",
        input: "basic"
    },
    {
        label: "Chuyên khoa",
        name:"cate_id",
        type:"text",
        input: "select",
        options: "/categories/all"
    }, 
    {
        label: "Kỹ năng",
        name:"skill",
        type:"text",
        input: "basic"
    },
    {
        label: "Giới thiệu",
        name:"introduce",
        type:"text",
        input: "textarea"
    }
]

export const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên bác sĩ"),
  exp: yup.string().required("Vui lòng nhập kinh nghiệm bác sĩ"),
  cate_id: yup.string().required("Vui lòng lựa chọn chuyên khoa"),
  introduce: yup.string().required("Vui lòng nhập lời giới thiệu"),
  skill: yup.string().required("Vui lòng nhập kỹ năng của bác sĩ"),
});

