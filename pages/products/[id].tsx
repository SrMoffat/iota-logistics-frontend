import React from 'react';
import { Divider, Steps } from 'antd';

import GeneralLayout from '../../components/Layout/General';

const Product = () => {
    return (
        <GeneralLayout handleShowCreateItemModal={() => { }} hasCta={false}>
            <Steps
                progressDot
                current={1}
                items={[
                    {
                        title: 'Finished',
                        description: 'This is a description.',
                    },
                    {
                        title: 'In Progress',
                        description: 'This is a description.',
                    },
                    {
                        title: 'Waiting',
                        description: 'This is a description.',
                    },
                ]}
            />
            <Divider />
            <Steps
                progressDot
                current={1}
                direction="vertical"
                items={[
                    {
                        title: 'Finished',
                        description: 'This is a description. This is a description.',
                    },
                    {
                        title: 'Finished',
                        description: 'This is a description. This is a description.',
                    },
                    {
                        title: 'In Progress',
                        description: 'This is a description. This is a description.',
                    },
                    {
                        title: 'Waiting',
                        description: 'This is a description.',
                    },
                    {
                        title: 'Waiting',
                        description: 'This is a description.',
                    },
                ]}
            />
        </GeneralLayout>
    );
};

export default Product;
