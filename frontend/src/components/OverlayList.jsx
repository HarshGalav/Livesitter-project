import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f8f8;
  }
`;

const OverlayInfo = styled.div`
  flex-grow: 1;
  color: #333;
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;

  &:hover {
    background-color: #c82333;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const OverlayList = ({ overlays, fetchOverlays }) => {
    const handleDelete = async (overlay) => {
        console.log('Attempting to delete overlay:', overlay);
        if (!overlay || !overlay._id) {
            console.error('Attempted to delete overlay with undefined id', overlay);
            return;
        }
        try {
            const id = typeof overlay._id === 'object' ? overlay._id.$oid : overlay._id;
            await axios.delete(`http://localhost:5000/api/overlays/${id}`);
            fetchOverlays();
        } catch (error) {
            console.error('Error deleting overlay:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <ListContainer>
            <h3>Existing Overlays</h3>
            <StyledList>
                {overlays.map((overlay) => {
                    const key = typeof overlay._id === 'object' ? overlay._id.$oid : overlay._id;
                    return (
                        <ListItem key={key}>
                            <OverlayInfo>
                                <strong>Type:</strong> {overlay.type} | <strong>Content:</strong> {overlay.content}<br />
                                <strong>Position:</strong> ({overlay.position.x}, {overlay.position.y}) | 
                                <strong>Size:</strong> ({overlay.size.width} x {overlay.size.height})
                            </OverlayInfo>
                            <DeleteButton onClick={() => handleDelete(overlay)}>Delete</DeleteButton>
                        </ListItem>
                    );
                })}
            </StyledList>
        </ListContainer>
    );
}

OverlayList.propTypes = {
    overlays: PropTypes.array.isRequired,
    fetchOverlays: PropTypes.func.isRequired,
};

export default OverlayList;
