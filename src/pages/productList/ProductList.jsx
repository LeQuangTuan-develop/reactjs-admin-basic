import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../../util/Api"

export default function ProductList() {
  const [data, setData] = useState([]);

  const handleDelete = async (id) => {
    setData(data.filter((item) => item._id !== id));
    const deleteDoctor = await Api.delete(`/doctors/delete/${id}`)
  };

  useEffect(() => {
    const fetchDoctors = async () => {
        const doctors = await Api.get('/doctors/all')
        const categories = await Api.get('/categories/all')
        let doctorsData = doctors.data
        let catesData = categories.data

        doctorsData.forEach(doctor => {
          catesData.forEach(cate => {
            if (doctor.cate_id === cate._id) {
              doctor.cate_id = cate.categoryname
            }
          })
        })
        
        setData(doctorsData)
    }
    fetchDoctors()
  }, [])

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "name",
      headerName: "Bác sĩ",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "starNum", headerName: "Lượt đánh giá", width: 160 },
    {
      field: "starAveraged",
      headerName: "Đánh giá",
      width: 130,
    },
    {
      field: "cate_id",
      headerName: "Chuyên khoa",
      width: 160,
    },
    {
      field: "introduce",
      headerName: "Giới thiệu",
      width: 250,
    },
    {
      field: "action",
      headerName: "Thực hiện",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/doctor/" + params.row._id}>
              <button className="productListEdit">Chỉnh sửa</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList" style={{ height: 550, width: '100%' }}>
      <div className="productHeader">
        <h2>Danh sách bác sĩ</h2>
        <div className="doctorListControll">
            <Link to={`/newDoctor`}>
            <button className="btnAddDoctor">Thêm mới</button>
            </Link>
        </div>
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}