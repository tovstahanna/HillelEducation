import React from 'react';

export const HeadingComponent = ({text}) => {
    return (
        <h1>{text.toUpperCase()}</h1>
    );
}