import React, { useState, useEffect } from 'react';

import { groupBy } from 'lodash';
import { Select, Space, message } from 'antd';
import { useQuery } from '@tanstack/react-query';

import { fetchMilestones } from '../../lib/statistics';
import type { BaseOptionType } from 'antd/es/select';

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
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);
    // const { isLoading: milestonesLoading, data: milestones, error: milestonesError, refetch: refetchMilestones } = useQuery({
    //     queryKey: ['milestones'],
    //     queryFn: async () => {
    //         const res = await fetchMilestones()
    //         return {
    //             milestones: res
    //         }
    //     },
    // })
    const handleProvinceChange = (value: CityName) => {
        setCities(cityData[value]);
        setSecondCity(cityData[value][0]);
    };
    const onSecondCityChange = (value: CityName) => {
        setSecondCity(value);
    };
    // useEffect(() => {
    //     const error = milestonesError as Error
    //     error && message.error(error?.message)
    // }, [milestonesError])




    // console.log(groupedMilestones)
    useEffect(() => {
        const getMilestonesData = async () => {
            const res = await fetchMilestones();
            const massgedMilestones = res?.map(({ id, name, statuses }) => ({
                id,
                name,
                statuses
            }));
            // const groupedMilestones = groupBy(massgedMilestones, 'name');
            // const milestoneNames = Object.keys(groupedMilestones);
            const milestoneNames = massgedMilestones?.map(({ id, name }) => ({ label: name, value: id }));
            setMilestoneNames(milestoneNames);
            console.log("massgedMilestones==>", massgedMilestones);
        }
        getMilestonesData();
    }, [])

    console.log("Data==>", milestoneNames);

    // milestoneNames 

    return (
        <Space style={{ width: '100%' }} direction="vertical">
            Select Stage
            {milestoneNames && (
                <Select
                    style={{ width: "100%" }}
                    defaultValue={milestoneNames[3]?.value}
                    onChange={handleProvinceChange}
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