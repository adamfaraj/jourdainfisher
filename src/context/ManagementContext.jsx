// src/context/ManagementContext.jsx

'use client';

import React, { createContext, useState, useEffect } from 'react';

// Create the ManagementContext
export const ManagementContext = createContext();

// Create the ManagementProvider component
export const ManagementProvider = ({ children }) => {
    const [managementContent, setManagementContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch initial management data from the backend
    const fetchManagementContent = async () => {
        try {
            const res = await fetch('https://api.jourdainfisher.com/management', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch management content.');
            }

            const data = await res.json();
            const parsedBody = JSON.parse(data.body); // Parse the stringified JSON

            // Sorting logic
            const customOrder = ['Management', 'Touring', 'College Agent', 'Film/TV'];
            const orderedContent = Object.keys(parsedBody.content)
            .sort((a, b) => {
                const indexA = customOrder.indexOf(a);
                const indexB = customOrder.indexOf(b);
                return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
            })
            .reduce((acc, key) => {
                acc[key] = parsedBody.content[key];
                return acc;
            }, {});

            setManagementContent(orderedContent); // Set the entire content object
        } catch (err) {
            console.error('Failed to fetch management content:', err);
            setError(err.message || 'Failed to load Management content.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch management content on component mount
    useEffect(() => {
        fetchManagementContent();
    }, []);

    // Function to update management content
    const updateManagementContent = async (updatedContent) => {
        try {
            const res = await fetch('https://api.jourdainfisher.com/management', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedContent),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to update management content.');
            }

            const data = await res.json();
            console.log('Management content updated:', data);
            setManagementContent(updatedContent); // Update local state with the new content
            return { success: true, message: 'Management content updated successfully.' };
        } catch (err) {
            console.error('Failed to update management content:', err);
            return { success: false, message: err.message || 'Failed to update Management content.' };
        }
    };

    return (
        <ManagementContext.Provider
            value={{
                managementContent,
                setManagementContent,
                updateManagementContent,
                loading,
                error,
            }}
        >
            {children}
        </ManagementContext.Provider>
    );
};
