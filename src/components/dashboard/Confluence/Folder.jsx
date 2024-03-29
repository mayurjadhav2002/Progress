import React from 'react'
import { Button, Typography } from '@material-tailwind/react'
import { TbEaseInOutControlPoints } from "react-icons/tb";
import { IoFolderOpen } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import { useConfluenceContext } from '../../../utils/WriteContext/ConfluenceContext';
import { CiCirclePlus } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';
import ListDocs from './ListDocs';
import { Card } from '../../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { FcOpenedFolder } from "react-icons/fc";

function Folder(props) {
  // const { folders } = useConfluenceContext()
  const randomId = uuidv4();
  const navigate = useNavigate();

  const navigateToNewDoc = () => {
    navigate('/dashboard/user/documentation/new/' + randomId);
  };

  return (

    <div className='p-5 w-full overflow-y-auto'>
      <Card className='px-5 py-2  rounded-md'>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1"  className='border-b-0'>
            <AccordionTrigger>Why Write Documentations? </AccordionTrigger>
            <AccordionContent>
              Documentation is the cornerstone of effective collaboration within a team.
              It serves as a shared knowledge base, providing a clear roadmap for understanding processes,
              procedures, and project details. A well-documented project not only captures the 'what' and 'how,'
              but also embodies the collective wisdom and insights of the team. It is a testament to
              the team's commitment to clarity, efficiency, and success.
            </AccordionContent>
          </AccordionItem>
        </Accordion>



      </Card>

      <div className='block py-10'>
        <div>

          <Typography variant='h4' className='text-primary flex item-center gap-2'>
            <FcOpenedFolder />
            Your Folders</Typography>
        </div>
        <div className='grid lg:grid-cols-5 grid-cols-2 gap-2 mt-2 mb-10'>
          {props.folders.length > 0 && props.folders.map((folder, index) => (
            <Link
              key={index}
              to={`/dashboard/user/documentation/folder/${folder}`}
              className={`flex flex-col gap-2 items-center p-2 rounded-lg justify-between text-[${folder.color}]  hover:bg-blue-gray-50 hover:text-black`}
            >
              <IoFolderOpen className={`w-16 h-16 text-[${folder.color}]`} />
              <Typography variant='small'>{folder}</Typography>
            </Link>
          ))}




          <button onClick={navigateToNewDoc} className='flex flex-col gap-2 items-center 
        p-2 rounded-lg bg-gray-200 dark:bg-gray-800
        justify-between 
        hover:bg-blue-gray-50
        '>
            <CiCirclePlus className='w-16 h-16' />
            <Typography variant='small'>Create New</Typography>
          </button>
        </div>
        {/* <Write /> */}
        <div>
          <Typography variant='h4' className='text-black flex gap-2 items-center dark:text-white'>
            <MdOutlineArticle />
            Recently Edited</Typography>
          {props.recentlyEdited && <ListDocs docs={props.recentlyEdited} />
          }

        </div>

      </div>
    </div>
  )
}

export default Folder