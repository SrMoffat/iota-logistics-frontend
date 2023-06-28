import React from 'react';
import { format, parseISO } from 'date-fns';
import { Badge, Descriptions, Tag } from 'antd';

import GeneralLayout from '../components/Layout/General';
import { useAuthContext } from '../contexts/AuthProvider';

const Profile = () => {
    const { user } = useAuthContext();

    const date = parseISO(user?.createdAt)
    

    return (
        <GeneralLayout handleShowCreateItemModal={() => { }} hasCta={false}>
            <Descriptions title="My Profile" layout="vertical" bordered>
                <Descriptions.Item label="Username">{user?.username}</Descriptions.Item>
                <Descriptions.Item label="Block Status"><Tag color={user?.blocked ? 'red' : 'green'}>{user?.blocked ? 'Blocked' : 'Not Blocked'}</Tag></Descriptions.Item>
                <Descriptions.Item label="Joined On">{format(date, 'LLLL d, yyyy')}</Descriptions.Item>
                <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                <Descriptions.Item label="Clearance"><Tag color="green">{user?.clearance?.toUpperCase()}</Tag></Descriptions.Item>
            </Descriptions>
        </GeneralLayout>
    )
};

export default Profile;
