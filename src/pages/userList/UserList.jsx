import "./userList.css"
import { DataGrid } from '@mui/x-data-grid';
// import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../../util/Api"

export default function UserList() {
    const [data, setData] = useState([])

    // const handleDelete = (id) => {
    //     setData(data.filter(item => item._id !== id))
    // }

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await Api.get('/users/all')
            setData(users.data)
        }
        fetchUsers()
    }, [])

    const columns = [
        { 
            field: "username", 
            headerName: "Khách hàng",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.profilePicture} alt="" />
                        {params.row.username}
                    </div>
                )
            }
        },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'from',
            headerName: 'Đến từ',
            width: 120,
        },
        {
            field: 'transaction',
            headerName: 'Giao dịch',
            sortable: false,
            width: 160,
        },
        {  field:'action', headerName: 'Thực hiện', width: 150, renderCell: (params) => {
            return (
                <>
                <Link to={'/user/' + params.row._id}>
                    <button className="userListEdit">Chỉnh sửa</button>
                </Link>
                {/* <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)}/> */}
                </>
            )
        }}
    ];

    return (
        <div className="userList" style={{ height: 550, width: '100%' }}>
            <div className="userListControll">
                <Link to={`/newUser`}>
                <button className="btnAddUser">Thêm mới</button>
                </Link>
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
    )
}
