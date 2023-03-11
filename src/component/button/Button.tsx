import React from 'react';
import FavoriteIcon from "@material-ui/icons/Favorite";
import {useRouter} from "next/router";
import {Button} from "@material-ui/core";

interface ButtonProps{
    onclick:()=>any,
    children:string
}

const ButtonComponent = ({onclick,children}:ButtonProps) => {
    return (
        <Button variant={"contained"} color="inherit" onClick={onclick}>
            {children}
        </Button>
    );
};

export default ButtonComponent;
