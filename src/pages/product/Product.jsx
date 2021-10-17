import "./product.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Moment from 'react-moment'
import { useHistory, useParams } from "react-router"
import { ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";
import { Publish, Cancel, KeyboardBackspace } from "@mui/icons-material"
import SimpleLineChart from "../../components/chart/SimpleLineChart"
import { productData } from "../../dummyData"
import Api from "../../util/Api"
import { inputDoctor, schema } from "../../static/inputDoctor"
import FormUpdate from "../../components/inputs/FormUpdate"
import storage from '../../firebase'
import AlertDialog from "../../components/modal/Alert"

export default function Product() {
    const history = useHistory()
    const { doctorId } = useParams()
    const [avatar, setAvatar] = useState(null)
    const [doctor, setDoctor] = useState({})
    const [category, setCategory] = useState({})
    const [cates, setCates] = useState([])
    const [file, setFile] = useState(null)
    const [isOpenInfoModal, setIsOpenInfoModal] = useState(null) 
    const [isOpenAvarModal, setIsOpenAvarModal] = useState(null)
    
    useEffect(() => {
        async function fetchDoctor() {
            const doctorData = await Api.get(`/doctors/detail/${doctorId}`)
            setDoctor(doctorData.data)
            const category = await Api.get(`/categories/${doctorData.data.cate_id}`)
            setCategory(category.data)
            const categories = await Api.get(`/categories/all`)
            let newCateData = categories.data.map(item => {
                return {
                  label: item.categoryname,
                  value: item._id
                }
            })
            setCates(newCateData)
            setAvatar(doctorData.data.img)
        }
        fetchDoctor()
    }, [doctorId])

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleDelFile = () => {
        setFile(null)
    }

    const handleBack = () => {
        history.goBack()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (file) {
            console.log("upload file to firebase");
            const storageRef = ref(storage, `images/test/${file.name}`);
            const desertRef = ref(storage, `images/test/${doctor.imgName}`);

            // delete file firebase
            deleteObject(desertRef)
                .then(() => {
                    console.log('deleted successfully');
                })
                .catch((error) => {
                    console.log(error);
                });

            var metaData = {
                contentType: 'image/*'
            };
            await uploadBytes(storageRef, file, metaData)
                .then((snapshot) => {
                    console.log('Uploaded successfully');
                    setAvatar(URL.createObjectURL(file))
                })
                .catch((error) => error);

            await getDownloadURL(ref(storage, `images/test/${file.name}`))
                .then( async (url) => {
                    try {
                        let data = {
                            img: url,
                            imgName: file.name,
                        }
                        console.log(data);
                        const handle = await Api.put(`/doctors/update/${doctorId}`, data)
                        console.log(handle);
                        setIsOpenAvarModal(true)
                    } catch (error) {
                        console.log(error);
                    }
                })
        }
    }

    return (
        <>
        <div className="product">
            <div className="productTitleContainer">
                <div className="productTitleBox">
                    <KeyboardBackspace className="productIconBack" onClick={handleBack}/>
                    <h1 className="productTitle">Bác sĩ</h1>
                </div>
                <Link to="/newDoctor">
                    <button className="productAddButton">Thêm mới</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <SimpleLineChart data={productData} dataKey={["Sales"]} title="Thu nhập" color={["green"]} />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={avatar} alt="" className="productInfoImg" />
                        <span className="productName">{doctor.name}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">Đánh giá trung bình:</span>
                            <span className="productInfoValue">{doctor.starAveraged}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Số lượt đánh giá:</span>
                            <span className="productInfoValue">{doctor.starNum}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Ngày hoạt động:</span>
                            <span className="productInfoValue">
                                <Moment format="DD/MM/YYYY">
                                    {doctor.createdAt}
                                </Moment>
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">Chuyên khoa: </span>
                            <span className="productInfoValue">{category.categoryname}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <div className="productFormLeft">
                    <label>Cập nhật thông tin</label>
                    <FormUpdate 
                        inputs={inputDoctor} 
                        schema={schema} 
                        options={cates} 
                        inputUrl={`/doctors/detail/${doctorId}`}
                        serverUrl={`/doctors/update/${doctorId}`}
                        returnUrl={`/doctors`}
                        openModal={() => setIsOpenInfoModal(true)}
                    />
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm" onSubmit={handleSubmit}>
                    <div className="productFormRight">
                    <label>Cập nhật ảnh đại diện</label>
                        <div className="productUpload">
                            <img src={file ? URL.createObjectURL(file) : avatar} alt="" className="productUploadImg" />
                            {file ? 
                            <label onClick={handleDelFile}>
                                <Cancel />
                            </label>
                            :
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            }
                            <input type="file" id="file" style={{ display: "none" }} onChange={handleFile}/>
                        </div>
                        <button type="submit" className="buttonSubmit">Cập nhật</button>
                    </div>
                </form>
            </div>
        </div>
        <AlertDialog 
            title="Cập nhật"
            isOpen={isOpenInfoModal}
            handleClose={() => setIsOpenInfoModal(false)}
            handleOK={() => setIsOpenInfoModal(false)}
        >
            Cập nhật thông tin bác sĩ thành công
        </AlertDialog>
        <AlertDialog 
            title="Cập nhật"
            isOpen={isOpenAvarModal}
            handleClose={() => setIsOpenAvarModal(false)}
            handleOK={() => setIsOpenAvarModal(false)}
        >
            Cập nhật ảnh đại diện bác sĩ thành công
        </AlertDialog>
        </>
    );
}