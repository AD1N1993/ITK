import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (title:string) => void
}


export const AddItemForm = React.memo( (props:PropsType) => {
   

    let [itemName, setItemName] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

     function onItemNameChanged(e: ChangeEvent<HTMLInputElement>) {
         if(error !==null) setError(null)
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
})