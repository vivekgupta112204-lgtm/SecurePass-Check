import React from "react";

interface ActionTipsProps {
  tips: string[];
}

const ActionTips: React.FC<ActionTipsProps> = ({ tips }) => {
  return (
    <div className="grid gap-3 animate-fadeIn">
      {tips.length === 0 ? (
        <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
          Great job! This password is robust.
        </div>
      ) : (
        tips.map((tip, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-orange-50 text-orange-800 rounded-lg text-sm"
          >
            {tip}
          </div>
        ))
      )}
    </div>
  );
};

export default ActionTips;
