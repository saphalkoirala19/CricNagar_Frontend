
import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader = ({ title, description, className = '' }: PageHeaderProps) => {
  return (
    <div className={`mb-10 text-center ${className}`}>
      <h1 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">{title}</h1>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in animation-delay-200">
          {description}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
