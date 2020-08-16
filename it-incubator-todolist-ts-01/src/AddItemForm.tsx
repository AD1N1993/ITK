import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, TextFields} from "@material-ui/icons";

type PropsType = {
    addItem: (title:string) => void
}


export const AddItemForm = (props:PropsType) => {

    let [itemName, setItemName] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

     function onItemNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setItemName(e.currentTarget.value);
        setError("");
    }

    function onAddItemKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            addItem();
        }
    }

    function addItem ()  {
        if (itemName.trim() !== "") {
            props.addItem(itemName.trim());
            setItemName("");
        } else {
            setError("Title is required")
        }
    }

    return(
        <>
            <div>
                {/*<input*/}
                {/*    className={error ? "error" : ""}*/}
                {/*    type={'text'}*/}
                {/*    value={itemName}*/}
                {/*    onChange={onItemNameChanged}*/}
                {/*    onKeyPress={onAddItemKeyPressed}*/}
                {/*/>*/}
                <TextField variant={"outlined"}
                           value={itemName}
                           onChange={onItemNameChanged}
                           onKeyPress={onAddItemKeyPressed}
                           error={!!error}
                           label={"Title"}
                           helperText={error}
                           size={"small"}
                />
                <IconButton   color={"primary"} onClick={addItem}>
                    <AddBox/>
                </IconButton>

            </div>
        </>
    );
}