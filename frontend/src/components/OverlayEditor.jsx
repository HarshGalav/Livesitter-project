import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OverlayEditor = ({ fetchOverlays, editingOverlay, onCancelEdit }) => {
    const [type, setType] = useState('text'); // 'text' or 'logo'
    const [content, setContent] = useState('');
    const [position, setPosition] = useState({ x: '10px', y: '10px' });
    const [size, setSize] = useState({ width: '100px', height: '50px' });
    const [color, setColor] = useState('#FFFFFF'); // Only for text
    const [layout, setLayout] = useState('default');

    useEffect(() => {
        if (editingOverlay) {
            setType(editingOverlay.type);
            setContent(editingOverlay.content);
            setPosition(editingOverlay.position);
            setSize(editingOverlay.size);
            setColor(editingOverlay.color || '#FFFFFF');
            setLayout(editingOverlay.layout);
        }
    }, [editingOverlay]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const overlay = { type, content, position, size, layout };
        if (type === 'text') {
            overlay.color = color;
        }

        try {
            if (editingOverlay) {
                await axios.put(`http://localhost:5000/api/overlays/${editingOverlay._id}`, overlay);
            } else {
                await axios.post('http://localhost:5000/api/overlays', overlay);
            }
            fetchOverlays();
            if (onCancelEdit) onCancelEdit();
            setContent('');
        } catch (error) {
            console.error('Error submitting overlay:', error);
        }
    };

    const EditorContainer = styled.div`
        width: 100%;
        max-width: 600px; // Adjust this value as needed
        margin: 0 auto;
        padding: 20px;
    `;

    const StyledForm = styled.form`
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 100%;
        background-color: #ffffff;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        color: #333;
    `;

    const StyledLabel = styled.label`
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-weight: bold;
        color: #333;
    `;

    const StyledInput = styled.input`
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        background-color: #f8f8f8;
        color: #333; // Add this line to set the input text color
        transition: border-color 0.2s, box-shadow 0.2s;

        &::placeholder {
            color: #999; // Add this to style the placeholder text
        }

        &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            outline: none;
        }

        &[type="color"] {
            padding: 2px;
            background-color: transparent;
            cursor: pointer;
            height: 40px;
        }
    `;

    const StyledSelect = styled.select`
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        background-color: #f8f8f8;
        color: #333; // Add this line to set the select text color
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23333' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 10px center;
        padding-right: 30px;
        cursor: pointer;
        transition: border-color 0.2s, box-shadow 0.2s;

        &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
            outline: none;
        }
    `;

    const StyledButton = styled.button`
        padding: 10px 15px;
        background-color: #007bff;
        color: #ffffff; // Add this line to set the button text color
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: background-color 0.2s, transform 0.1s;

        &:hover {
            background-color: #0056b3;
        }

        &:active {
            transform: translateY(1px);
        }
    `;

    const ButtonContainer = styled.div`
        display: flex;
        justify-content: space-between;
        gap: 10px;
    `;

    const CancelButton = styled(StyledButton)`
        background-color: #6c757d;

        &:hover {
            background-color: #5a6268;
        }
    `;

    return (
        <EditorContainer>
            <h3>{editingOverlay ? 'Edit Overlay' : 'Add Overlay'}</h3>
            <StyledForm onSubmit={handleSubmit}>
                <StyledLabel>
                    Type:
                    <StyledSelect value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="text">Text</option>
                        <option value="logo">Logo</option>
                    </StyledSelect>
                </StyledLabel>
                <StyledLabel>
                    Content {type === 'logo' ? '(Image URL)' : '(Text)'}:
                    <StyledInput
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </StyledLabel>
                {type === 'text' && (
                    <StyledLabel>
                        Color:
                        <StyledInput
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </StyledLabel>
                )}
                <StyledLabel>
                    Position X (e.g., 10px, 20%):
                    <StyledInput
                        type="text"
                        value={position.x}
                        onChange={(e) =>
                            setPosition((prev) => ({ ...prev, x: e.target.value }))
                        }
                        required
                    />
                </StyledLabel>
                <StyledLabel>
                    Position Y (e.g., 10px, 20%):
                    <StyledInput
                        type="text"
                        value={position.y}
                        onChange={(e) =>
                            setPosition((prev) => ({ ...prev, y: e.target.value }))
                        }
                        required
                    />
                </StyledLabel>
                <StyledLabel>
                    Width (e.g., 100px, 20%):
                    <StyledInput
                        type="text"
                        value={size.width}
                        onChange={(e) =>
                            setSize((prev) => ({ ...prev, width: e.target.value }))
                        }
                        required
                    />
                </StyledLabel>
                <StyledLabel>
                    Height (e.g., 50px, 20%):
                    <StyledInput
                        type="text"
                        value={size.height}
                        onChange={(e) =>
                            setSize((prev) => ({ ...prev, height: e.target.value }))
                        }
                        required
                    />
                </StyledLabel>
                <StyledLabel>
                    Layout:
                    <StyledSelect value={layout} onChange={(e) => setLayout(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="fullscreen">Fullscreen</option>
                        <option value="picture-in-picture">Picture-in-Picture</option>
                        <option value="side-by-side">Side-by-Side</option>
                    </StyledSelect>
                </StyledLabel>
                <ButtonContainer>
                    <StyledButton type="submit">
                        {editingOverlay ? 'Update Overlay' : 'Add Overlay'}
                    </StyledButton>
                    {editingOverlay && (
                        <CancelButton type="button" onClick={onCancelEdit}>
                            Cancel
                        </CancelButton>
                    )}
                </ButtonContainer>
            </StyledForm>
        </EditorContainer>
    );
};

OverlayEditor.propTypes = {
    fetchOverlays: PropTypes.func.isRequired,
    editingOverlay: PropTypes.object,
    onCancelEdit: PropTypes.func,
};

export default OverlayEditor;
