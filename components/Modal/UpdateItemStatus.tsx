import React, { useState, useEffect } from 'react';

import { groupBy, get } from 'lodash';
import { Select, Space, message } from 'antd';
import { useQuery } from '@tanstack/react-query';

import { fetchMilestones } from '../../lib/statistics';
import type { BaseOptionType } from 'antd/es/select';

interface Status {
    name: string;
    id: string | number;
    description: string;
    createdAt: string;
    updatedAt: string;
}
interface Stage {
    name: string;
    id: string | number;
    statuses: Status[]
}
interface GroupedMilestone {
    [key: number | string]: Stage[]
}

// interface GroupedMilestone {
//     [key: number|string]: {
//         id: string | number;
//         name: string;
//         statuses: Status[]
//     }
// }

const provinceData = ['Warehousing', 'Processing', 'Transit', 'Delivery', 'Returned', 'Recovery', 'Termination'];

const cityData = {
    Warehousing: ['Stocked', 'Out of Stock'],
    Processing: ['Order Received', 'Order Validation', 'Order Picking', 'Order Packing', 'Ready For Dispatch'],
    Transit: ['Pickup', 'In Transit', 'Customs Clearance', 'Delayed', 'En Route'],
    Delivery: ['Out For Delivery', 'Delivery Attempted', 'Delivery Recheduled', 'Delivered'],
    Returned: ['Return Initiated', 'Return Shippment', 'Return Received', 'Refund Issued'],
    Recovery: ['Lost', 'Damaged'],
    Termination: ['Archived', 'Completed'],
};
type CityName = keyof typeof cityData;

const UpdateItemStatus = () => {
    const [milestoneNames, setMilestoneNames] = useState<BaseOptionType[]>();
    const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
    const [selectedMilestone, setSelectedMilestone] = useState<string | number>();
    const [groupedMilestones, setGroupedMilestone] = useState<GroupedMilestone>();
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);
    const handleStageChange = (value: string | number) => {
        setSelectedMilestone(value);
    };
    const onSecondCityChange = (value: CityName) => {
        setSecondCity(value);
    };
    useEffect(() => {
        const getMilestonesData = async () => {
            const res = await fetchMilestones();
            const massgedMilestones = res?.map(({ id, name, statuses }) => ({
                id,
                name,
                statuses
            }));
            const grouped = groupBy(massgedMilestones, 'id');
            const milestoneNames = massgedMilestones?.map(({ id, name }) => ({ label: name, value: id }));
            setMilestoneNames(milestoneNames);
            setGroupedMilestone(grouped);
            console.log("massgedMilestonesmassgedMilestones==>", res);

        }
        getMilestonesData();
    }, [])
    useEffect(() => {
        if (selectedMilestone) {
            const selected = groupedMilestones[selectedMilestone];
            if (selected) {
                const details = get(selected[0], 'statuses');
                // if(groupedMilestones[selectedMilestone]){}
                // console.log("details==>", details);
                // console.log("selectedMilestone==>", selectedMilestone);
                // console.log("groupedMilestones==>", groupedMilestones);
                // console.log("groupedMilestones==>", groupedMilestones[selectedMilestone][0]);
            }
        }
    }, [selectedMilestone]);
    return (
        <Space style={{ width: '100%' }} direction="vertical">
            Select Stage
            {milestoneNames && (
                <Select
                    style={{ width: "100%" }}
                    defaultValue={milestoneNames[0]?.value}
                    onChange={handleStageChange}
                    options={milestoneNames}
                />
            )}
            Select Status
            <Select
                loading
                style={{ width: "100%" }}
                value={secondCity}
                onChange={onSecondCityChange}
                options={cities.map((city) => ({ label: city, value: city }))}
            />
        </Space>
    )
}

export default UpdateItemStatus