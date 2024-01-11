import React, { useState } from "react";
import { Button } from "../../../ui/button";
import "./Board.css"
import { PlusCircleIcon } from "lucide-react";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import './Board.css'
import { Card } from "../../../ui/card";
const Editable2 = (props) => {
    const [show, setShow] = useState(props?.handler || false);
    const [text, setText] = useState(props.defaultValue || "");
    const [description, setDescription] = useState('')
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (text && props.onSubmit) {
            setText("");
            setDescription('')
            props.onSubmit({ title: text, description: description });
        }
        setShow(false);
    };

    return (
        <div className={`editable ${props.parentClass}`}>
            {show ? (
                <Card>
                    <form onSubmit={handleOnSubmit}>
                        <div className={`editable__input ${props.class} p-5  `}>

                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="title" className="exo-font"> {props.placeholder}
                                </Label>
                                <Input type="text" id="title" placeholder="Task, e.g. Deploy frontend on vercel" onChange={(e) => setText(e.target.value)}
                                />
                            </div>
                            <br />
                            <Textarea variant="outlined" label="Description"
                                placeholder="some extra description
                         e.g. refer https://shorturl.at/du this repo for documentation"
                                className="hidden-scrollbar"
                                rows="3"
                                onChange={e => setDescription(e.target.value)} />

                            <div className="btn__control flex gap-2 items-center mt-5 justify-end">

                                <Button
                                    className="close"
                                    variant="destructive"
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

                </Card>

            ) : (
                <Button

                    variant="secondary"
                    onClick={() => {
                        setShow(true);
                    }}
                    className="exo-font w-full font-medium flex gap-2 items-center"
                >
                    {props.defaultValue === undefined ? <PlusCircleIcon className="w-6 h-6" /> : <></>}
                    {props?.name || "Add"}
                </Button>
            )}
        </div>
    );
};

export default Editable2;