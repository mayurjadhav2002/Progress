import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { Plus, X } from "react-feather";
import { Button } from "../../../ui/button";

const Editable = (props) => {
  const [show, setShow] = useState(props?.handler || false);
  const [text, setText] = useState(props.defaultValue || "");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (text && props.onSubmit) {
      setText("");
      props.onSubmit(text);
    }
    setShow(false);
  };

  return (
    <div className={`editable ${props.parentClass}`}>
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
              <Button className="add__btn" type="submit">
                {`${props.btnName}` || "Add"}
              </Button>
            
            </div>
          </div>
        </form>
      ) : (
        <Button
          onClick={() => {
            setShow(true);
          }}
          className="flex items-center gap-3 "
        >
          {props.defaultValue === undefined ? <Plus /> : <></>}
          {props?.name || "Add"}
        </Button>
      )}
    </div>
  );
};

export default Editable;