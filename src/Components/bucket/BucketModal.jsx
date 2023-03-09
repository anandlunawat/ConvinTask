import { Form, Input, Modal} from 'antd';
import { useState } from 'react';
import {useDispatch} from 'react-redux'

export default function BucketModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [change,setChange] = useState("")
  const [id,setId] = useState(1)

  function addBucket() {
    props.close()
    // form.submit(() => {})
    setId(id+1)
    dispatch({
      type : "ADD_BUCKET",
      name : change,
      id : id
    }) 
  }

  function onchange(e) {
    setChange(e.target.value)
  }

  return (
    <Modal title="Basic Modal" okText="Submit" open={props.open} onCancel={props.close} onOk={addBucket}>
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item label="Bucket Name" required tooltip="This is a required field">
          <Input placeholder="input placeholder" onChange={onchange} defaultValue=""/>
        </Form.Item>
      </Form>
    </Modal>
  )
}