import React from "react";

const Styles = () => {
  return (
    <style>
      {`
    .text-class {
      color: var(--aha-black-800);
    }
    `}
    </style>
  );
};

aha.on("personalStartButton", ({ record, fields, onUnmounted }, { identifier, settings }) => {
  const handleStart = async () => {
    console.log('personalStartButton: Go', record);

    const releases = await aha.models.Release.select('id', 'name').where({ projectId: "DEMO" }).all();
    const release = releases[0];

    console.log('personalStartButton: Assigning to release:', release.id);

    record.assignedToUser = { email: 'jonathan@aha.io' };
    record.workflowStatus = { name: 'In development' };
    record.team = { name: "Alpha Team" };
    record.teamWorkflowStatus = { name: 'In progress' };
    record.release = { id: release.id };
    record.save();
  };

  return (
    <>
      <Styles />
      <div className='text-class'>
        <aha-button size="mini" type="primary" outline onClick={handleStart}>Go 🚀</aha-button>
      </div>
    </>
  );
});
