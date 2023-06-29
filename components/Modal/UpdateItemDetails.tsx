import React from 'react';
import { Space } from 'antd';

import { useItemContext } from '../../contexts/ItemProvider';
import { StepOne, StepTwo, StepThree, StepFour } from './AddItemSteps';

interface UpdateItemDetails {
    // item: ItemDetails
    current: number;
    // categories
    // updateItemDetails
}

const UpdateItemDetails = (props: UpdateItemDetails) => {
    const { current } = props;
    const { item } = useItemContext();
    const renderEditSteps = (current: number) => {
        const stepProps = {
            updateItemDetails: () => { },
            item: {},
            categories: []
        };
        switch (current) {
            case 0:
                return <StepOne {...stepProps} />
            case 1:
                return <StepTwo {...stepProps} />
            case 2:
                return <StepThree {...stepProps} />
            case 3:
                return <StepFour />
        }
    }
    console.log({
        item,
        current
    })
    return (
        <Space style={{ width: '100%' }} direction="vertical">
            {renderEditSteps(current)}
        </Space>
    )
}

export default UpdateItemDetails;
