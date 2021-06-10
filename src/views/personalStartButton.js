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
    record.assignedToUser = aha.user;
    record.workflowStatus = { name: 'In development' };
    record.team = { name: settings.teamName };
    record.teamWorkflowStatus = { name: 'In progress' };
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
