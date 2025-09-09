import React from 'react';

const Link = ({ children, ...props }: { children: React.ReactNode, [key: string]: any }) => {
    return React.createElement('a', props, children);
};

export default Link;
