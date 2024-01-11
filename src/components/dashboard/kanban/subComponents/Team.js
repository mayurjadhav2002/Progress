import React from 'react'
import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
    IconButton,
    ListItemSuffix,
  } from "@material-tailwind/react";
import { StarIcon } from '@heroicons/react/24/solid';
import { Delete } from 'react-feather';
import { useProjectContext } from '../../../../utils/ProjectContext/ProjectContext';
   
function Team(props) {
  const {collaborators} = useProjectContext()
  return (
      <div className='max-h-72 overflow-y-scroll custom-scrollbar  '>
        {collaborators.map((i, j) => 
        <ListItem key={j}>
          <ListItemPrefix>
            <Avatar variant="circular" alt="emma" src={i.userId?.avatar} />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" className='dark:text-white'>
              {i.userId?.name}
            </Typography>
            <Typography variant="small" className='dark:text-white font-normal'>
            {i.userId?.organization_name}
            </Typography>
            
          </div>
          {props.isowner &&
          <ListItemSuffix>
            <IconButton variant="text" className='text-red-500'>
              <Delete />
            </IconButton>
          </ListItemSuffix>
          }
        </ListItem>
)}
  
      </div>
   
   
   )
}

export default Team