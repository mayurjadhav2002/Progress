import { Button, Input, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import { Plus, X } from "react-feather";

const Editable2 = (props) => {
    const [show, setShow] = useState(props?.handler || false);
    const [text, setText] = useState(props.defaultValue || "");
    const [description, setDescription] = useState('')
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (text && props.onSubmit) {
            setText("");
            setDescription('')
            props.onSubmit({title: text, description: description});
        }
        setShow(false);
    };

    return (
        <div className={`editable ${props.parentClass} text-lg bg-white rounded-lg gap-2`}>
            {show ? (
                <form onSubmit={handleOnSubmit}>
                    <div className={`editable__input ${props.class} p-5 border-2 `}>
                        <Input
                            label={props.placeholder}
                            autoFocus
                            id={"edit-input"}
                            type={"text"}
                            onChange={(e) => setText(e.target.value)}
                        />
<br/>
                        <Textarea variant="outlined" label="Description" onChange={e=>setDescription(e.target.value)} />

                        <div className="btn__control flex gap-2 items-center mt-5 justify-end">
                            
                            <Button
                                className="close"
                                color="red"
                                onClick={() => {
                                    setShow(false);
                                }}
                            >

                                Cancel
                            </Button>
                            <Button className="add__btn" color="blue" type="submit">
                                {`${props.btnName}` || "Add"}
                            </Button>
                        </div>
                    </div>
                </form>
            ) : (
                <div 
                    onClick={() => {
                        setShow(true);
                    }}
                    className="flex items-center gap-3 w-full -p-2 justify-center cursor-pointer hover:bg-gray-300"
                >
                    {props.defaultValue === undefined ? <Plus /> : <></>}
                    {props?.name || "Add"}
                </div>
            )}
        </div>
    );
};

export default Editable2;