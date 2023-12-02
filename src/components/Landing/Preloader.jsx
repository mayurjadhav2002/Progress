import React from 'react'

function Preloader() {
  return (
<div className="hidden preloader">
  <div className="loader">
    <div className="ytp-spinner">
      <div className="ytp-spinner-container">
        <div className="ytp-spinner-rotator">
          <div className="ytp-spinner-left">
            <div className="ytp-spinner-circle" />
          </div>
          <div className="ytp-spinner-right">
            <div className="ytp-spinner-circle" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Preloader