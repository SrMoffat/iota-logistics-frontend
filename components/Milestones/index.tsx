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

interface MilestoneProps {
    milestones
    milestone: string | number;
    setMilestone: React.Dispatch<React.SetStateAction<string | number>>
}

const getIcon = (name: string) => {
    switch (true) {
        case name?.includes('Warehousing'):
            return <ShopFilled />;
        case name?.includes('Processing'):
            return <FolderOpenFilled />;
        case name?.includes('Transit'):
            return <CarFilled />;
        case name?.includes('Delivery'):
            return <GiftFilled />;
        case name?.includes('Returned'):
            return <InteractionFilled />;
        case name?.includes('Recovery'):
            return <NodeExpandOutlined />;
        case name?.includes('Termination'):
            return <WalletFilled />;
        default:
            return <ShopFilled />;
    }
};

const MilestoneCards = (props: MilestoneProps) => {
    const options = props.milestones?.map(entry => {
        return {
            label: (
                <div style={{ padding: 4 }}>
                    <Avatar icon={getIcon(entry?.attributes?.name)} />
                    <div>{entry?.attributes?.name}</div>
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
