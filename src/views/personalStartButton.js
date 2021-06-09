import React from "react";

const Styles = () => {
  return (
    <style>
      {`
    .text-class {
      color: var(--aha-black-800);
      margin-right: 5px;
    }
    `}
    </style>
  );
};

aha.on("personalStartButton", ({ record, fields, onUnmounted }, { identifier, settings }) => {
  const handleStart = async () => {
    console.log('personalStartButton: Go', record);

    // Move these to personal settings
    const teamName = 'A Team';
    const projectId = aha.project.id

    // This logic could be improved to select a more appropriate release within the given projectId
    const releases = await aha.models.Release.select('id', 'name').where({ projectId: projectId }).all();
    const release = releases[0];

    console.log('personalStartButton: Assigning to release:', release.id);

    record.assignedToUser = aha.user;
    record.workflowStatus = { name: 'In development' };
    record.team = { name: teamName };
    record.teamWorkflowStatus = { name: 'In progress' };
    record.release = { id: release.id };
    record.save();
  };

  const handleFinish = async () => {
    record.workflowStatus = { name: 'Ready to ship' };
    record.teamWorkflowStatus = { name: 'Done' };
    record.save();
  };

  return (
    <>
      <Styles />
      <span className='text-class'>
        <aha-button size="mini" type="primary" outline onClick={handleStart}>Start 🚀</aha-button>
      </span>
      <span className='text-class'>
        <aha-button size="mini" type="primary" outline onClick={handleFinish}>Finish</aha-button>
      </span>
    </>
  );
});
