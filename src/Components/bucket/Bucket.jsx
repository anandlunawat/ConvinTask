import { Button, Card, Space } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
import { useState } from "react";
import BucketModal from "./BucketModal";
import Cards from "../cards/Cards";
import { useSelector } from "react-redux";

export default function Bucket() {

    const [open, setOpen] = useState(false)
    const [tab,setTab] = useState(1)
    
    function clicked() {
        setOpen(!open)
    }

    const arr = useSelector((state) => state.bucket)

    function onTabChange (key) {
        setTab(key)
    }

    return (
        <div>
            <Card
                style={{
                    width: '100%',
                }}
                tabList={arr}
                activeTabKey={tab}
                extra={<Space direction="horizontal" style={{float : "right"}}><Button onClick={clicked} icon={<PlusCircleOutlined />}>Add Bucket</Button><Button>Select</Button></Space>}
                onTabChange={onTabChange}
            >
                <Cards active={tab}/>
            </Card>
            <BucketModal 
                open={open}
                close={clicked}
            />
        </div>
    )
}