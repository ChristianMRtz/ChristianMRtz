import React, { useState } from "react";

type HoverTextProps = {
    children: string;
    className?: string;
};

export const HoverText: React.FC<HoverTextProps> = ({ children, className = "" }) => {
    const words = children.split(" ");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <span className={className}>
            {words.map((word, index) => (
                <React.Fragment key={index}>
                    <span
                        className={`hover-word ${hoveredIndex === index ? 'hovered' : ''}`}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {word}
                    </span>
                    {index < words.length - 1 && " "}
                </React.Fragment>
            ))}
        </span>
    );
};
