import FormCreate from "../../components/inputs/FormCreate";
import "./newProduct.css";
import { inputDoctor, schema } from "../../static/inputDoctor"
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import Api from "../../util/Api"
import { useHistory } from "react-router";
import { KeyboardBackspace } from "@mui/icons-material";

export default function NewProduct() {
  const history = useHistory()
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await Api.get('/categories/all')
      let newCateData = categoriesData.data.map(item => {
        return {
          label: item.categoryname,
          value: item._id
        }
      })
      setCategories(newCateData)
    }
    getCategories()
  }, [])

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleBack = () => {
    history.goBack()
  }

  return (
    <div className="newProduct">
      <div className="productTitleBox">
        <KeyboardBackspace className="productIconBack" onClick={handleBack}/>
        <h2 className="addProductTitle">Thêm bác sĩ</h2>
      </div>
      <div className="avatarUpload">
        <label htmlFor="avatar">
          {file ? 
          (
            <>
            <div>
              <img className="avatarImg" alt="" src={URL.createObjectURL(file)}/>
            </div>
            <button onClick={e => setFile(null)} >Chọn ảnh khác</button>
            </>
          )
          :
          <>
          <Avatar 
            src="https://i.ibb.co/sFZzxjZ/user.png" 
            className="avatarUpload" 
            sx={{ width: 100, height: 100 }}
          />
          Thêm mới ảnh đại diện
          </>
          }
        </label>
        <input type="file" style={{display: "none"}} id="avatar" name="avatar" onChange={handleFile}/>
      </div>
      <FormCreate 
        inputs={inputDoctor}
        options={categories} 
        file={file} 
        schema={schema} 
        firebaseUrl=""
        serverUrl="/doctors/create"
        returnUrl="/doctors"
      />
    </div>
  );
}