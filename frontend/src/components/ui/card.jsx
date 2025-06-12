import React from "react";

export const Card = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <div ref={ref} className={`rounded-lg bg-white p-4 ${className}`} {...props}>
    {children}
  </div>
));