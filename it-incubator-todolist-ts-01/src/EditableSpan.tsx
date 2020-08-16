import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";


type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

export function EditableSpan(props: PropsType) {

    let [editMode, setEditMode] = useState<boolean>(false);

    let [title, setTitle] = useState<string>(props.title);

    function activateEditMode() {
        setEditMode(true);
        setTitle(props.title);
    }

    function deActivateEditMode() {
        setEditMode(false);
        props.saveNewTitle(title);
    }

    function changeTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value);
    }

    function changeTitleOnKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            deActivateEditMode();
        }
    }

    return (
        <>
            {
                editMode
                    ? <TextField value={title}
                                 onBlur={deActivateEditMode}
                                 autoFocus={true}
                                 onChange={changeTitle}
                                 onKeyPress={changeTitleOnKeyPressed}
                                 variant={"outlined"}
                    />

                    : <span onDoubleClick={activateEditMode}>{props.title}</span>
            }
        </>
    );
}