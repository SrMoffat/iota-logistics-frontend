import React, { useState, useEffect } from 'react';

import { Select, Space } from 'antd';
import { groupBy, get, pick } from 'lodash';
import type { BaseOptionType } from 'antd/es/select';

import { fetchMilestones } from '../../lib/statistics';
import { Status,  Stage, GroupedMilestone, StatusSummary} from '../../lib/types';

interface UpdateItemStatusProps {
    updateStage: React.Dispatch<React.SetStateAction<Stage>>;
    updateStatus: React.Dispatch<React.SetStateAction<Status>>;
}

const UpdateItemStatus = (props: UpdateItemStatusProps) => {
    const { updateStage, updateStatus } = props;
    const [milestoneNames, setMilestoneNames] = useState<BaseOptionType[]>();
    const [statusSummary, setStatusSummary] = useState<StatusSummary[]>();
    const [selectedMilestone, setSelectedMilestone] = useState<Stage>();
    const [selectedStatus, setSelectedStatus] = useState<Status>();
    const [groupedMilestones, setGroupedMilestone] = useState<GroupedMilestone>();
    const handleStageChange = (value: string | number) => {
        const stageData = groupedMilestones[value][0];
        setSelectedMilestone(stageData);
        updateStage(stageData);
    };
    const handleStatusChange = (value: string | number) => {
        const currentStage = groupedMilestones[selectedMilestone?.id];
        const currentSateStatuses = get(currentStage[0], 'statuses');
        const selectedStatusDetails = currentSateStatuses?.filter(entry => `${entry?.id}` === `${value}`);
        const statusData = selectedStatusDetails[0]
        setSelectedStatus(statusData);
        updateStatus(statusData)
    };
    useEffect(() => {
        const getMilestonesData = async () => {
            const res = await fetchMilestones();
            const massgedMilestones = res?.map((entry) => pick(entry, ['id', 'name', 'description', 'statuses']));
            const grouped = groupBy(massgedMilestones, 'id');
            const milestoneNames = massgedMilestones?.map(({
                id,
                name,
                statuses,
                description,
            }) => ({
                label: name,
                value: id,
                description,
                statuses
            }));
            setMilestoneNames(milestoneNames);
            setGroupedMilestone(grouped);
        }
        getMilestonesData();
    }, [])
    useEffect(() => {
        if (selectedMilestone) {
            const milesstoneId = get(selectedMilestone, 'id');
            const selected = groupedMilestones[milesstoneId];
            if (selected) {
                const details = get(selected[0], 'statuses');
                const milestoneNames = details?.map(({ id, name, description }) => ({ label: name, value: id, description }));
                setStatusSummary(milestoneNames)
            }
        }
    }, [selectedMilestone]);
    const renderStageOptions = (milestoneNames) => {
        if (milestoneNames) {
            return (
                <Select
                    style={{ width: "100%" }}
                    
                    placeholder="Select Stage"
                    defaultValue={milestoneNames[0]?.value}
                    onChange={handleStageChange}
                    options={milestoneNames}
                />
            );
        }
    };
    const renderStatusOptions = (statusSummary) => {
        if (statusSummary) {
            return (
                <Select
                    style={{ width: "100%" }}
                    placeholder="Select Status"
                    onChange={handleStatusChange}
                    options={statusSummary}
                />
            );
        }
    };
    return (
        <Space style={{ width: '100%' }} direction="vertical">
            Select Stage
            {renderStageOptions(milestoneNames)}
            {statusSummary && milestoneNames ? 'Select Status' : ''}
            {renderStatusOptions(statusSummary)}
        </Space>
    )
}

export default UpdateItemStatus