import Icon from '@mdi/react';
import AcceptDelete from './AcceptDelete';
import { mdiDeleteCircle } from '@mdi/js';
import { useState } from 'react';


const StateType = {
    PENDING: 'pending',
    SUCCESS: 'success',
    ERROR: 'error',
    INACTIVE: 'inactive',
};

export default function DeleteRecipe({ recipe, deleteRicipe, onError }) {
    const [deleteRecipeCall, setDeleteRecipeCall] = useState({
        state: StateType.INACTIVE
    });

    const handleDelete = async () => {
        if (deleteRecipeCall.state === StateType.PENDING) return

        setDeleteRecipeCall({ state: StateType.PENDING });

        const res = await fetch(`http://localhost:8000/recipe/delete`, {
            method: "POST", headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ id: recipe.id })
        });

        const data = await res.json();

        if (res.status >= 400) {
            setDeleteRecipeCall({ state: StateType.ERROR, error: data });

            if (typeof onError === 'function') onError(data.errorMessage);

        } else {
            setDeleteRecipeCall({ state: StateType.SUCCESS, data });

            if (typeof deleteRicipe === 'function') {
                deleteRicipe(recipe.id);
            }
        }
    }

    return (
    <AcceptDelete onConfirm={handleDelete}>
        <div>
            <Icon
                path={mdiDeleteCircle}
                style={{ cursor: 'pointer', color: 'orange' }}
                size={1.5}
            ></Icon>
        </div>
    </AcceptDelete>)
}