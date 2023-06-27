import {
    Col,
    Row,
    Card,
    Statistic,
} from 'antd';
import {
    BoxPlotFilled,
    PoundCircleFilled,
    SlidersFilled,
    DropboxCircleFilled,
    GoldFilled,
    UserOutlined
} from '@ant-design/icons';

interface StatsProps {
    mapping: {
        [key: string]: {
            value: string | number;
            loading: boolean;
        }
    }
}

const StatisticsCards = (props: StatsProps) => {
    const { mapping } = props;
    const statisticsCards = [
        {
            title: 'Categories',
            prefix: <BoxPlotFilled />,
            suffix: '',
            valueStyle: {},
            bordered: true,
            ...mapping['Categories']
        },
        {
            title: 'Currencies',
            prefix: <PoundCircleFilled />,
            suffix: '',
            valueStyle: {},
            bordered: true,
            ...mapping['Currencies']
        },
        {
            title: 'Events',
            prefix: <SlidersFilled />,
            suffix: '',
            valueStyle: {},
            bordered: true,
            ...mapping['Events']
        },
        {
            title: 'Items',
            prefix: <DropboxCircleFilled />,
            suffix: '',
            valueStyle: {},
            bordered: true,
            ...mapping['Items']
        },
        {
            title: 'Milestones',
            prefix: <GoldFilled />,
            suffix: '',
            valueStyle: {},
            bordered: true,
            ...mapping['Milestones']
        },
        {
            title: 'Users',
            prefix: <UserOutlined />,
            suffix: '',
            valueStyle: {},
            bordered: true,
            ...mapping['Users']
        }
    ]
    return (
        <Row gutter={16}>
            {
                statisticsCards.map((entry, index) => {
                    const { bordered, loading, title, value, valueStyle, prefix, suffix } = entry;
                    return (
                        <Col span={4} key={`${index}-${title}`}>
                            <Card bordered={bordered} loading={loading}>
                                <Statistic
                                    title={title}
                                    value={value}
                                    prefix={prefix}
                                    suffix={suffix}
                                    valueStyle={valueStyle}
                                />
                            </Card>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

export default StatisticsCards;
