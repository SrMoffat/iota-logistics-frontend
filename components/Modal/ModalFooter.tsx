import React from 'react';

import { Button  } from 'antd';

const ModalFooter = (props) => {
    const { current, updateItem, isLastStep, isLoading, createSupplyItem, prev, steps, item, editMode } = props;
    return (
        <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
                <Button type="primary" onClick={updateItem}>
                    Next
                </Button>
            )}
            {isLastStep && (
                <Button loading={isLoading} type="primary" onClick={() => createSupplyItem(item)}>
                    Done
                </Button>
            )}
            {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Previous
                </Button>
            )}
        </div>

    )
}

export default ModalFooter;
