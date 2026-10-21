import React from 'react';
import SiteHeader from './SiteHeader.jsx';
import Rooms from './Rooms.jsx';

export default function RoomsPage() {
  return <div className="rooms-page"><SiteHeader activePage="rooms" onAction={() => { window.location.href = '/#booking'; }} /><main><Rooms fullPage /></main></div>;
}
