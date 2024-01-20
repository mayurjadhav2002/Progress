import React from 'react';
import moment from 'moment';
import {
  Card, CardHeader, CardTitle, CardDescription, CardFooter,
} from '../../../ui/card';
import { RxDotFilled } from 'react-icons/rx';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { FaGithubSquare } from 'react-icons/fa';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from '../../../ui/context-menu';
import { Separator } from '../../../ui/separator';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { FaHistory } from 'react-icons/fa';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

const CardHeaderContent = (props) => (
  
  <div>
    <CardTitle className="text-lg text-semibold">
    <Link to={props.location+'/edit/'+props.id}>
    {props.title}
                    </Link>
     </CardTitle>
    <CardDescription className="text-extralight text-start">{props.description || ''}</CardDescription>
  </div>
);

const UserAvatar = (props) => (
  <p className="hidden sm:block -mr-2 -mt-2 sm:text-xs sm:text-gray-500 lg:flex gap-1 items-center">
    <Link to="#" className="font-medium underline hover:text-gray-700 flex items-center gap-1">
    <Avatar className="w-6 h-6">
  <AvatarImage src={props.userAvatar} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
    </Link>
  </p>
);

const DueDateInfo = (props) => (
  <div className="flex gap-2 items-center">
    <div className="flex items-center gap-1 text-gray-500">
      <HiOutlineCalendarDays className="h-4 w-4" />
      <p className="text-xs"> Due {moment(props.deadline, moment.ISO_8601).fromNow()}</p>
    </div>
    <span className="hidden sm:block" aria-hidden="true">&middot;</span>
    <div className="flex items-center gap-1 text-gray-500">
      <FaGithubSquare />
    </div>
  </div>
);

const DocumentInfo = () => (
  <div className="my-2 flex gap-2 items-start">
    <IoDocumentTextOutline />
    <div className="flex flex-col mr-5">
      <h4 className="text-sm font-medium leading-none flex items-center gap-2">
        Write Documentation
      </h4>
      <p className="text-xs text-muted-foreground">New Doc for this Card</p>
    </div>
  </div>
);

const CardContextMenu = (props) => (
  <ContextMenu>
    <ContextMenuTrigger>
      {/* Card Component */}
      <Card className="relative" onClick={props.openDrawerRight}>
        <RxDotFilled className={`absolute w-6 h-6  
            ${props?.priority === 'low' && 'text-green-500'}
            ${props?.priority === 'medium' && 'text-yellow-500'}
            ${props?.priority === 'high' && 'text-red-500'}`} />
        <CardHeader>
          {/* Card Header Content */}
          <div className="w-full flex justify-between items-start">
            <CardHeaderContent {...props} />
            {/* User Avatar */}
            <UserAvatar userAvatar={props.user_avatar} />
          </div>
        </CardHeader>
        <CardFooter>
          {/* Due Date Info */}
          <DueDateInfo deadline={props.deadline} />
        </CardFooter>
      </Card>
    </ContextMenuTrigger>
    <ContextMenuContent>
      {/* Context Menu Items */}
      <ContextMenuItem>
        <InfoCircledIcon className="mr-2" />
        Card Information
      </ContextMenuItem>
      <Separator />
      <ContextMenuItem>
        <CiEdit className="mr-2" />
        Edit
      </ContextMenuItem>
      <ContextMenuItem>
        <FaHistory className="mr-2" />
        History
      </ContextMenuItem>
      <Separator />
      <ContextMenuItem>
        {/* Document Info */}
        <DocumentInfo />
      </ContextMenuItem>
      <Separator />
      <ContextMenuItem className="mt-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white dark:text-white" onClick={props.HandleRemoveCard}>
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

export const CardforDrag = (props) => (
  
  <CardContextMenu {...props} />
);
