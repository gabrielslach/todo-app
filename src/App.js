import React from 'react';

import GroupPaper from './components/GroupPaper';
import Dialog from './components/Dialog';

function App() {
  return (
    <div className='root'>
      {/* App Bar */}
      <div className='flex flex-row flex-auto items-center py-4 px-7 bg-appBarBlue'>
        <p className='flex-grow self-auto font-bold font-roboto text-white text-xl'>HOT LIST</p>
        <button className='py-2 px-3 rounded bg-btnBlue hover:bg-btnHovBlue text-white font-medium text-sm'>Add Task</button>
      </div>
      {/* App Body */}
      <div className='p-7 flex flex-row gap-10'>
        <GroupPaper/>
        <GroupPaper/>
        <GroupPaper/>
      </div>
      {/* Dialog */}
      <Dialog/>
    </div>
  );
}

export default App;
