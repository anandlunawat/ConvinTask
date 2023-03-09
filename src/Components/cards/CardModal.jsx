import { Form, Input, Modal} from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function CardModal(props) {
    const [form] = Form.useForm();
    const [cardName,setCardName] = useState("")
    const [url,setUrl] = useState("")
    const [id,setId] = useState(1)
    const dispatch = useDispatch()

    function onchange(e) {
        if(e.target.id === "cardName") {
            setCardName(e.target.value)
        } else {
            setUrl(e.target.value)
        }
    }

    function createCard() {
        props.close()
        setId(id+1)
        console.log("After Creating Card Id",id)
        dispatch({
            type : "CREATE_CARD",
            bucketId: props.active,
            cardName: cardName,
            url: url,
            id: id
        })
    }

    function editCard() {
        props.close()
        dispatch({
            type: "EDIT_CARD",
            id: props.id,
            name: cardName,
            url: url 
        })
    }

    return (
        <Modal title="Basic Modal" okText={props.id !== "" ? "Save Changes" : "Submit"} onOk={props.id !== "" ? editCard : createCard} open={props.open} onCancel={props.close}>
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item name={"cardName"} label="Card Name" required tooltip="This is a required field">
                    <Input placeholder="input placeholder" onChange={onchange} defaultValue=""/>
                </Form.Item>                
                <Form.Item name={"url"} label="URL" required tooltip="This is a required field">
                    <Input placeholder="input placeholder" onChange={onchange} defaultValue=""/>
                </Form.Item>
            </Form>
        </Modal>
    )
}