import React, { useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import {
  FaBolt,
  FaCodeBranch,
  FaPlay,
  FaClock,
  FaRedo,
  FaBell,
  FaEnvelope,
  FaPhone,
  FaUsers,
  FaComments,
  FaSave,
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const WorkflowBuilder = () => {
  const [workflow, setWorkflow] = useState({
    name: "New Client Onboarding",
    trigger: "form.submitted",
    steps: [
      {
        id: 1,
        type: "condition",
        label: 'If form type = "New Client"',
        icon: <FaCodeBranch />,
      },
      {
        id: 2,
        type: "action",
        label: "Send welcome email",
        icon: <FaEnvelope />,
      },
      {
        id: 3,
        type: "action",
        label: "Create CRM lead",
        icon: <FaPhone />,
      },
      {
        id: 4,
        type: "delay",
        label: "Wait 24 hours",
        icon: <FaClock />,
      },
      {
        id: 5,
        type: "action",
        label: "Assign to sales team",
        icon: <FaUsers />,
      },
      {
        id: 6,
        type: "action",
        label: "Send Slack notification",
        icon: <FaComments />,
      },
    ],
  });

  const [draggedStep, setDraggedStep] = useState(null);

  const availableBlocks = [
    {
      type: "trigger",
      icon: <FaBolt />,
      label: "Trigger",
      color: "yellow",
    },
    {
      type: "condition",
      icon: <FaCodeBranch />,
      label: "Condition",
      color: "blue",
    },
    {
      type: "action",
      icon: <FaPlay />,
      label: "Action",
      color: "green",
    },
    {
      type: "delay",
      icon: <FaClock />,
      label: "Delay",
      color: "purple",
    },
    {
      type: "loop",
      icon: <FaRedo />,
      label: "Loop",
      color: "orange",
    },
    {
      type: "notification",
      icon: <FaBell />,
      label: "Notify",
      color: "red",
    },
  ];

  const addStep = (block) => {
    const newStep = {
      id: Date.now(),
      type: block.type,
      label: `New ${block.label}`,
      icon: block.icon,
    };

    setWorkflow({
      ...workflow,
      steps: [...workflow.steps, newStep],
    });
  };

  const removeStep = (id) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.filter((s) => s.id !== id),
    });
  };

  const moveStep = (index, direction) => {
    const newSteps = [...workflow.steps];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= newSteps.length) {
      return;
    }

    [newSteps[index], newSteps[targetIndex]] = [
      newSteps[targetIndex],
      newSteps[index],
    ];

    setWorkflow({
      ...workflow,
      steps: newSteps,
    });
  };

  return (
    <div className="workflow-page">
      <div className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ label: "Workflow Builder" }]} />

          <h1 className="page-title">Automation Workflows</h1>

          <p className="page-subtitle">Build no-code automations</p>
        </div>
      </div>

      <div className="container">
        <div className="workflow-layout">
          {/* Left: Block Palette */}
          <aside className="workflow-palette">
            <h4>Blocks</h4>

            <p className="workflow-palette-desc">Click to add a block</p>

            {availableBlocks.map((block) => (
              <button
                key={block.type}
                className={`workflow-block workflow-block-${block.color}`}
                onClick={() => addStep(block)}
              >
                <span className="workflow-block-icon">{block.icon}</span>

                <span>{block.label}</span>
              </button>
            ))}
          </aside>

          {/* Center: Canvas */}
          <main className="workflow-canvas">
            <div className="workflow-canvas-header">
              <input
                type="text"
                value={workflow.name}
                onChange={(e) =>
                  setWorkflow({
                    ...workflow,
                    name: e.target.value,
                  })
                }
                className="workflow-name-input"
              />

              <div className="workflow-canvas-actions">
                <button className="btn btn-outline btn-sm">
                  <FaSave />
                  Save
                </button>

                <button className="btn btn-primary btn-sm">
                  <FaPlay />
                  Test Run
                </button>
              </div>
            </div>

            {/* Trigger */}
            <div className="workflow-trigger">
              <span className="workflow-trigger-icon">
                <FaBolt />
              </span>

              <div>
                <strong>Trigger</strong>
                <span>{workflow.trigger}</span>
              </div>
            </div>

            {/* Workflow Steps */}
            <div className="workflow-steps">
              {workflow.steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="workflow-connector" />

                  <div className="workflow-step">
                    <div className="workflow-step-num">{index + 1}</div>

                    <div className="workflow-step-icon">{step.icon}</div>

                    <div className="workflow-step-content">
                      <strong>{step.label}</strong>
                      <span>{step.type}</span>
                    </div>

                    <div className="workflow-step-actions">
                      <button
                        className="icon-btn-sm"
                        onClick={() => moveStep(index, -1)}
                        disabled={index === 0}
                        title="Move up"
                      >
                        <FaArrowUp />
                      </button>

                      <button
                        className="icon-btn-sm"
                        onClick={() => moveStep(index, 1)}
                        disabled={index === workflow.steps.length - 1}
                        title="Move down"
                      >
                        <FaArrowDown />
                      </button>

                      <button
                        className="icon-btn-sm"
                        onClick={() => removeStep(step.id)}
                        title="Delete step"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Add Step */}
            <button
              className="workflow-add-step"
              onClick={() =>
                addStep({
                  type: "action",
                  icon: <FaPlay />,
                  label: "Action",
                })
              }
            >
              <FaPlus />
              Add Step
            </button>
          </main>

          {/* Right: Settings */}
          <aside className="workflow-settings">
            <h4>Settings</h4>

            <div className="workflow-setting">
              <label>Trigger Type</label>

              <select
                value={workflow.trigger}
                onChange={(e) =>
                  setWorkflow({
                    ...workflow,
                    trigger: e.target.value,
                  })
                }
                className="input-field"
              >
                <option value="form.submitted">Form Submitted</option>

                <option value="user.registered">User Registered</option>

                <option value="payment.received">Payment Received</option>

                <option value="ticket.created">Ticket Created</option>

                <option value="schedule.cron">Scheduled (Cron)</option>
              </select>
            </div>

            <div className="workflow-setting">
              <label>Status</label>

              <div className="workflow-toggle">
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>

                <span>Active</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
