import "./userList.css"
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Api from "../../util/Api"

export default function DoctorList() {
    const [data, setData] = useState([])

    const handleDelete = (id) => {
        setData(data.filter(item => item._id !== id))
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await Api.get('/posts/all')
            setData(posts.data)
        }
        fetchPosts()
    }, [])

    const columns = [
        // { field: 'id', headerName: 'STT', width: 100 },
        { 
            field: "username", 
            headerName: "Khách hàng",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="PostListPost">
                        <img className="PostListImg" src={params.row.profilePicture} alt="" />
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
                    <button className="PostListEdit">Chỉnh sửa</button>
                </Link>
                <DeleteOutline className="PostListDelete" onClick={() => handleDelete(params.row._id)}/>
                </>
            )
        }}
    ];

    return (
        <div className="PostList" style={{ height: 550, width: '100%' }}>
            <div className="PostListControll">
                <Link to={`/newPost`}>
                <button className="btnAddPost">Thêm mới</button>
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
