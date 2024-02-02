import { Avatar } from '@material-tailwind/react';
import React from 'react';

function Users(props) {
  const { collab } = props;

  return (
    <div className="flex items-center -space-x-4">
      {collab?.map((user, index) => (
        <Avatar
          key={index}
          variant="circular"
          alt={`user ${index + 1}`}
          title={user?.userId?.name}
          className="border-2 border-white hover:z-10 focus:z-10"
          src={user?.userId?.avatar}
        />
      ))}
    </div>
  );
}

export default Users;
