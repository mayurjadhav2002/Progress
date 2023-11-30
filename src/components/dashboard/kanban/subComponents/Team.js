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
   
function Team(props) {
  return (
      <div className='max-h-72 overflow-y-scroll custom-scrollbar  '>
        {props?.team?.map((i, j) => 
        <ListItem key={j}>
          <ListItemPrefix>
            <Avatar variant="circular" alt="emma" src={i.userId.avatar} />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              {i.userId.name}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
            {i.userId.organization_name}
            </Typography>
            
          </div>
          {props.isowner &&
          <ListItemSuffix>
            <IconButton variant="text" color="blue-gray">
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