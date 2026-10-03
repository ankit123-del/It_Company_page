import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faRocket,
faChartColumn,
faBug,
faComments,
faXmark,
} from "@fortawesome/free-solid-svg-icons";

const Announcements = () => {
const [isOpen, setIsOpen] = useState(false);
const [hasUnread, setHasUnread] = useState(true);

const announcements = [
{
id: 1,
type: "feature",
icon: faRocket,
title: "AI Assistant is here!",
description:
"Meet SMLAG AI - your intelligent business companion. Available to all Pro users.",
date: "2 hours ago",
isNew: true,
},
{
id: 2,
type: "update",
icon: faChartColumn,
title: "New Analytics Dashboard",
description:
"We've redesigned the analytics dashboard with 12 new charts and better performance.",
date: "1 day ago",
isNew: true,
},
{
id: 3,
type: "fix",
icon: faBug,
title: "Bug fixes & improvements",
description:
"Fixed login issues, improved mobile responsiveness, and various performance optimizations.",
date: "3 days ago",
isNew: false,
},
{
id: 4,
type: "feature",
icon: faComments,
title: "Team Chat launched",
description:
"Real-time messaging with channels, threads, and file sharing.",
date: "1 week ago",
isNew: false,
},
];

const typeColors = {
feature: "var(--success)",
update: "var(--info)",
fix: "var(--warning)",
};

return (
<>
<button
className="announcement-btn"
onClick={() => {
setIsOpen(!isOpen);
if (hasUnread) setHasUnread(false);
}}
aria-label="Announcements"
title="Announcements"
> <FontAwesomeIcon icon={faRocket} />

    {hasUnread && <span className="announcement-dot" />}
  </button>

  {isOpen && (
    <>
      <div
        className="announcement-overlay"
        onClick={() => setIsOpen(false)}
      />

      <div className="announcement-panel">
        <div className="announcement-header">
          <div>
            <h3>What's New</h3>
            <p>Latest updates & features</p>
          </div>

          <button
            className="modal-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close announcements"
            title="Close"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="announcement-list">
          {announcements.map((a) => (
            <div
              key={a.id}
              className={`announcement-item ${a.isNew ? "new" : ""}`}
            >
              <div
                className="announcement-icon"
                style={{ background: typeColors[a.type] }}
              >
                <FontAwesomeIcon icon={a.icon} />
              </div>

              <div className="announcement-content">
                <div className="announcement-title-row">
                  <strong>{a.title}</strong>

                  {a.isNew && (
                    <span className="announcement-new">NEW</span>
                  )}
                </div>

                <p>{a.description}</p>

                <span className="announcement-time">{a.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="announcement-footer">
          <button className="btn btn-outline btn-sm btn-block">
            View Full Changelog
          </button>
        </div>
      </div>
    </>
  )}
</>

);
};

export default Announcements;