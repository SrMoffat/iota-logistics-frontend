import React from 'react';
import {
    Col,
    Row,
    Avatar,
    Segmented,
} from 'antd';
import {
    CarFilled,
    ShopFilled,
    GiftFilled,
    NodeExpandOutlined,
    FolderOpenFilled,
    InteractionFilled,
    WalletFilled,
} from '@ant-design/icons';
import { DataType } from '../../lib/types';

interface MilestoneProps {
    milestones
    itemsData: DataType[]
    milestone: string | number;
    setMilestone: React.Dispatch<React.SetStateAction<string | number>>
}
const getIconAndColor = (name: string) => {
    switch (true) {
        case name?.includes('Warehousing'):
            return {
                icon: <ShopFilled />,
                color: '#8B2AF2'
            };
        case name?.includes('Processing'):
            return {
                icon: <FolderOpenFilled />,
                color: '#2A95F2'
            };
        case name?.includes('Transit'):
            return {
                icon: <CarFilled />,
                color: '#22EEE7'
            };
        case name?.includes('Delivery'):
            return {
                icon: <GiftFilled />,
                color: '#ACE91E'
            };
        case name?.includes('Returned'):
            return {
                icon: <InteractionFilled />,
                color: '#FFE016'
            };
        case name?.includes('Recovery'):
            return {
                icon: <NodeExpandOutlined />,
                color: '#FF9816'
            };
        case name?.includes('Termination'):
            return {
                icon: <WalletFilled />,
                color: '#FF9816'
            };
        default:
            return {
                icon: <ShopFilled />,
                color: '#FF9816'
            };
    }
};
const MilestoneCards = (props: MilestoneProps) => {
    const options = props.milestones?.map(entry => {
        const { icon, color } = getIconAndColor(entry?.attributes?.name);
        // const count = props?.itemsData?.length;
        return {
            label: (
                <div style={{ padding: 4 }}>
                    <Avatar icon={icon} style={{ backgroundColor: color }} />
                    <div>{entry?.attributes?.name}</div>
                    {/* <div style={{ fontSize: "11px" }}>{count ? `${count} entries` : ''}</div> */}
                </div>
            ),
            value: entry?.id,
        }
    })
    return (
        <Row style={{ marginTop: 20 }}>
            <Col span={24}>
                <Segmented
                    block
                    onChange={props.setMilestone}
                    options={options}
                />
            </Col>
        </Row>
    )
}

export default MilestoneCards;
