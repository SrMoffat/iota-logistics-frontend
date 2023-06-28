import React, { useEffect, useState } from 'react';
import { Descriptions, Tag } from 'antd';
import { format, parseISO, isDate } from 'date-fns';

import GeneralLayout from '../components/Layout/General';
import { useAuthContext } from '../contexts/AuthProvider';
import { UserData } from '../lib/types';

const Profile = () => {
    const { user } = useAuthContext();
    const [profile, setProfile] = useState<UserData>();
    const date = parseISO(profile?.createdAt);
    useEffect(() => {
        setProfile(user)
    }, [])
    return (
        <GeneralLayout handleShowCreateItemModal={() => { }} hasCta={false}>
            <Descriptions title="My Profile" layout="vertical" bordered>
                <Descriptions.Item label="Username">{profile?.username}</Descriptions.Item>
                <Descriptions.Item label="Block Status"><Tag color={user?.blocked ? 'red' : 'green'}>{profile?.blocked ? 'Blocked' : 'Not Blocked'}</Tag></Descriptions.Item>
                <Descriptions.Item label="Email">{profile?.email}</Descriptions.Item>
                <Descriptions.Item label="Joined On">{'Date Joined'}</Descriptions.Item>
                <Descriptions.Item label="Clearance"><Tag color="green">{profile?.clearance?.toUpperCase()}</Tag></Descriptions.Item>
            </Descriptions>
        </GeneralLayout>
    )

};

export default Profile;
