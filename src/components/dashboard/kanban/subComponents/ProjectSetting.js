import { Typography } from '@material-tailwind/react'
import React from 'react'
import { IoSettings } from 'react-icons/io5'
import { Button } from '../../../ui/button'
import { useProjectContext } from '../../../../utils/ProjectContext/ProjectContext'
import { Input } from '../../../ui/input'
import { Label } from '../../../ui/label'
import { Textarea } from '../../../ui/textarea'

function ProjectSetting() {
    const { saving, id, timeline, title, setTitle, description, setDesc, create_by
        , keyword, setKeyword, setTimeline, HandleUpdateProject, formatDate1, collaborators, setCollaborators
    } = useProjectContext()
    return (
        <div>
            <Typography variant='h4' className='flex gap-3  items-center'><IoSettings /> Project Details</Typography>
            <div className='my-5 flex flex-col gap-5'>
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Project Name</Label>
                    <Input variant="standard" label="Project Name"
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full' value={title} />

                </div>

                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Project Description</Label>
                    <Textarea variant='outlined' label='Description'
                        onChange={(e) => setDesc(e.target.value)}
                        value={description} />

                </div>




                <div class="mb-6 grid grid-cols-1  lg:grid-cols-3 lg:gap-12">

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">
                            Project Deadline
                        </Label>

                        <Input type="date" id="default-input"
                            value={timeline}
                            onChange={e => formatDate1(e.target.value)}
                            placeholder='e.g. refer this for frontend work of chrome'
                        />
                    </div>




                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">
                            Team
                        </Label>

                        <Input type="text" id="default-input"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder='e.g. Marketing, Frontend etc' />                    </div>





                </div>
                <Button onClick={HandleUpdateProject}>Save</Button>
            </div>
        </div>
    )
}

export default ProjectSetting