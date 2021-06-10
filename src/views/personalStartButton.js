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

    record.assignedToUser = aha.user;
    record.workflowStatus = { name: 'In development' };
    record.team = { name: settings.teamName };
    record.teamWorkflowStatus = { name: 'In progress' };

    if (!settings.skipRelease) {
      const projectId = settings.projectId;

      const releases = await aha.models.Release.select('id', 'name').where({ projectId: projectId }).all();
      const release = releases[0];

      record.release = { id: release.id };
    }

    record.save();
  };

  const handleFinish = () => {
    record.workflowStatus = { name: settings.endWorkflowStatus };
    record.teamWorkflowStatus = { name: settings.endTeamWorkflowStatus };
    record.save();
  };

  const handleCodeReview = () => {
    console.log(settings.reviewWorkflowStatus, settings.reviewTeamWorkflowStatus);
    record.workflowStatus = { name: settings.reviewWorkflowStatus };
    record.teamWorkflowStatus = { name: settings.reviewTeamWorkflowStatus };
    record.save();
  };

  return (
    <>
      <Styles />
      <span className='text-class'>
        <aha-button size="mini" type="primary" outline onClick={handleStart}>Start 🚀</aha-button>
      </span>
      <span className='text-class'>
        <aha-button size="mini" type="primary" outline onClick={handleCodeReview}>Code review</aha-button>
      </span>
      <span className='text-class'>
        <aha-button size="mini" type="primary" outline onClick={handleFinish}>Finish</aha-button>
      </span>
    </>
  );
});
