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

const statisticsCards = [
    {
        title: 'Categories',
        prefix: <BoxPlotFilled />,
        suffix: '',
        value: 10,
        precision: 2,
        valueStyle: {},
        loading: false,
        bordered: true
    },
    {
        title: 'Currencies',
        prefix: <PoundCircleFilled />,
        suffix: '',
        value: 10,
        precision: 2,
        valueStyle: {},
        loading: false,
        bordered: true
    },
    {
        title: 'Events',
        prefix: <SlidersFilled />,
        suffix: '',
        value: 10,
        precision: 2,
        valueStyle: {},
        loading: false,
        bordered: true
    },
    {
        title: 'Items',
        prefix: <DropboxCircleFilled />,
        suffix: '',
        value: 10,
        precision: 2,
        valueStyle: {},
        loading: false,
        bordered: true
    },
    {
        title: 'Milestones',
        prefix: <GoldFilled />,
        suffix: '',
        value: 10,
        precision: 2,
        valueStyle: {},
        loading: false,
        bordered: true
    },
    {
        title: 'Users',
        prefix: <UserOutlined />,
        suffix: '',
        value: 10,
        precision: 2,
        valueStyle: {},
        loading: false,
        bordered: true
    }
]

const StatisticsCards = () => {
    return (
        <Row gutter={16}>
            {
                statisticsCards.map((entry, index) => {
                    const { bordered, loading, title, value, precision, valueStyle, prefix, suffix } = entry;
                    return (
                        <Col span={4} key={`${index}-${title}`}>
                            <Card bordered={bordered} loading={loading}>
                                <Statistic
                                    title={title}
                                    value={value}
                                    prefix={prefix}
                                    suffix={suffix}
                                    precision={precision}
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
