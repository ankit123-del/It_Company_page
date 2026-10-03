import { useVisitorTracking } from "../../hooks/useVisitorTracking";

const VisitorTracker = () => {
  useVisitorTracking();
  return null; // This component renders nothing
};

export default VisitorTracker;
