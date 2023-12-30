import React, { Component, CSSProperties } from 'react';
import { toAbsoluteUrl } from '../../_metronic/helpers';

interface LoaderProps {
  loading: boolean;
}

class Loader extends Component<LoaderProps> {
  render() {
    const overlayStyle: CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      opacity: 0,
      visibility: 'hidden',
      transition: 'opacity 0.3s, visibility 0.3s',
    };

    const spinnerStyle: CSSProperties = {
      border: '4px solid rgba(255, 255, 255, 0.3)',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      animation: 'spin 1s linear infinite',
    };

    const activeOverlayStyle: CSSProperties = {
      opacity: 1,
      visibility: 'visible',
    };

    const pleaseWaitStyle: CSSProperties = {
      backgroundColor: '#fff', // Background color for highlighting
      padding: '10px', // Adjust padding as needed
      borderRadius: '5px', // Rounded corners for the highlight
      textAlign:'center',
    };

    return (
      <div style={{ ...overlayStyle, ...(this.props.loading && activeOverlayStyle) }}>
        <div style={pleaseWaitStyle}>
          <div style={{alignSelf:'center'}} ></div>
          <img 
            src={toAbsoluteUrl('/media/loading.gif')} />
          <br />
          Please wait....
        </div>
      </div>
    );
  }
}

export default Loader;
