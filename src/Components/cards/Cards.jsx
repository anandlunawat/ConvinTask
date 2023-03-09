import { Card, FloatButton, Space, Dropdown, Button, Modal } from 'antd';
import { PlusCircleOutlined, CaretDownOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import CardModal from './CardModal';
import { useSelector, useDispatch } from 'react-redux';

export default function Cards(props) {

    const [open, setOpen] = useState(false)
    const [idToEdit, setIdToEdit] = useState("")
    const [iframe, setIframeOpen] = useState(false)
    const dispatch = useDispatch()
    const arr = useSelector((state) => state.bucket)
    const cards = useSelector((state) => state.card)

    const items = [{ key: '1', label: (<Button style={{ width: "100%" }} onClick={edit}>Edit</Button>) }, { key: '2', label: (<Button style={{ width: "100%" }} onClick={del}>Delete</Button>) }, {
        key: '3', label: (

            <Dropdown
                placement="bottomRight"
                arrow
                trigger={['click']}
            >
                <Button icon={<CaretDownOutlined />}>Move To</Button>
            </Dropdown>)
    }]

    console.log("Items", items)

    function clicked() {
        setOpen(true)
        setIdToEdit("")
    }

    function close() {
        setOpen(false)
    }

    function edit() {
        setOpen(true)
    }

    function del() {
        dispatch({
            type: "DELETE_CARD",
            payload: idToEdit
        })
    }

    function openIframe() {
        setIframeOpen(true)
    }

    function closeFrame() {
        setIframeOpen(false)
    }

    function okFrame(id) {
        closeFrame()
        document.getElementById(id).remove()
    }

    return (
        <div>
            <FloatButton style={{ visibility: arr.length === 1 ? "hidden" : "visible" }} icon={<PlusCircleOutlined />} onClick={clicked} />
            <CardModal
                open={open}
                close={close}
                active={props.active}
                id={idToEdit}
            />

            <Space direction="horizontal" size={16}>
                {
                    cards.filter(card => card.bucketId === props.active).map((card) => (
                        <Card
                            size="small"
                            title={card.cardName}
                            extra={<Space direction="horizontal" style={{ float: "right" }}>
                                <Dropdown
                                    menu={{ items }}
                                    placement="bottomRight"
                                    arrow
                                    trigger={['click']}
                                >
                                    <Button icon={<CaretDownOutlined />} style={{ border: "0" }} onClick={() => { setIdToEdit(card.id) }}></Button>
                                </Dropdown>
                            </Space>}
                            style={{
                                width: 300,
                            }}
                        >
                            <Button icon={<PlayCircleOutlined />} style={{ float: "right", border: "0", marginRight: "5%" }} onClick={openIframe}></Button>
                            <Modal open={iframe} onCancel={closeFrame} onOk={()=> {okFrame(card.cardName)}}>
                                <iframe id={card.cardName} width="100%" src={card.url.search("embed") !== -1 ? card.url + "?autoplay=1" : card.url.replace('watch?v=', 'embed/') + "?autoplay=1"} title={card.name} frameborder="0" allow="autoplay;" allowfullscreen></iframe>
                            </Modal>
                        </Card>
                    ))
                }
            </Space>
        </div>
    )
}