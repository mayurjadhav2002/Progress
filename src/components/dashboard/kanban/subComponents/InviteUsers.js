import { Button, Input, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Team from './Team'
import { IoSettings } from 'react-icons/io5'

function InviteUsers(props) {


    return (
        <>
            <Typography variant='h4' className='flex gap-3  items-center'><IoSettings /> Collaborate with Team</Typography>
            <div className='my-5 flex flex-col gap-5'>
                <div className="relative flex w-full max-w-[24rem]">
                    <Input
                        variant='standard'
                        type="email"
                        label="Enter Email Address of Member to Invite"
                        // value={email}
                        // onChange={onChange}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                        value={props.inviteEmail}
                        onChange={(e) => props.setInviteEmail(e.target.value)}
                    />
                    <Button
                        size="sm"
                        onClick={props.HandleinviteNewEditor}
                        // color={email ? "gray" : "blue-gray"}
                        // disabled={!email}
                        className="!absolute right-1 top-1 rounded"
                    >
                        Invite
                    </Button>
                </div>
                <ToastContainer />

                <div className='w-full'>
                    <Typography variant='h6'>Your Team</Typography>
                    {props.collaborators.length > 0 ?

                        <Team team={props.collaborators} isowner={props.owner} />
                        : "No Team created yet"
                    }
                </div>
            </div>
        </>)
}

export default InviteUsers