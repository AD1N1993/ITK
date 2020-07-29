import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
                <input
                    className={error ? "error" : ""}
                    type={'text'}
                    value={itemName}
                    onChange={onItemNameChanged}
                    onKeyPress={onAddItemKeyPressed}
                />
                <button onClick={addItem}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
        </>
    );
}