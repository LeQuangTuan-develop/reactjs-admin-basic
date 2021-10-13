import "./test.css"
import {test, schema} from '../../static/test'
import Form from "../../components/inputs/Form"

export default function Test() {
    return (
        <div>
            <p>Nhập chuỗi ký tự</p>
            <Form inputs={test} schema={schema} />
        </div>
    )
}
