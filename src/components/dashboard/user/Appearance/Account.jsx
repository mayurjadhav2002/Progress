import React from 'react'
import { Label } from '../../../ui/label'
import { Separator } from '../../../ui/separator'
import { Input } from '../../../ui/input'
import { Button } from '../../../ui/button'

function Account() {
  return (
    <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium">Account</h3>
      <p className="text-sm text-muted-foreground">
      Update your account settings. Delete your Account.


      </p>
    </div>

<Separator/>

<div>
        <Label>Delete Account </Label>
        <Input placeholder={"Enter DELETE to Remove your account permanently"} />
      </div>
      <Button variant="destructive">Delete Account permanently</Button> 
        </div>
  )
}

export default Account